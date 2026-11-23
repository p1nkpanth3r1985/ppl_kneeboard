package uk.co.electronetworks.pplkneeboard

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.provider.OpenableColumns
import android.os.Bundle
import android.view.WindowManager
import android.webkit.JavascriptInterface
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.webkit.WebViewAssetLoader
import org.json.JSONObject

/**
 * The whole app is one offline page (app/src/main/assets/index.html, built by web/merge.py)
 * shown full screen. The page is served from a fixed https origin by WebViewAssetLoader so
 * its saved ticks, settings, answers and logbook always land in the same browser storage.
 *
 * AndroidBridge lets the page save a backup file and open one for import, using the
 * system file picker (so the user chooses where the file goes, e.g. Google Drive).
 *
 * Automatic backup: the user picks one file once; we keep permission to it and the page
 * hands us fresh backup text after changes, which we write in the background.
 */
class MainActivity : ComponentActivity() {

    private lateinit var web: WebView
    private var pendingExport: String? = null

    private val createDoc = registerForActivityResult(ActivityResultContracts.CreateDocument("application/json")) { uri: Uri? ->
        val text = pendingExport
        pendingExport = null
        if (uri == null || text == null) {
            callJs("onExportDone", "false")
            return@registerForActivityResult
        }
        val ok = try {
            contentResolver.openOutputStream(uri, "wt")?.use { it.write(text.toByteArray(Charsets.UTF_8)) }
            true
        } catch (e: Exception) {
            false
        }
        callJs("onExportDone", if (ok) "true" else "false")
    }

    private val openDoc = registerForActivityResult(ActivityResultContracts.OpenDocument()) { uri: Uri? ->
        if (uri == null) return@registerForActivityResult
        try {
            val text = contentResolver.openInputStream(uri)?.use { it.readBytes().toString(Charsets.UTF_8) }
            if (text == null) callJs("onImportFailed", "true")
            else callJs("onImportFile", JSONObject.quote(text))
        } catch (e: Exception) {
            callJs("onImportFailed", "true")
        }
    }

    private val prefs by lazy { getSharedPreferences("autobackup", Context.MODE_PRIVATE) }
    @Volatile private var pendingAutoText: String? = null

    private val chooseAuto = registerForActivityResult(ActivityResultContracts.CreateDocument("application/json")) { uri: Uri? ->
        if (uri == null) { callJs("onAutoBackupChosen", "null"); return@registerForActivityResult }
        try {
            contentResolver.takePersistableUriPermission(uri, Intent.FLAG_GRANT_READ_URI_PERMISSION or Intent.FLAG_GRANT_WRITE_URI_PERMISSION)
        } catch (e: Exception) {
            callJs("onAutoBackupChosen", JSONObject.quote("That location can't be written to automatically. Choose Google Drive or a folder on the phone."))
            return@registerForActivityResult
        }
        prefs.getString("uri", null)?.let { old ->
            if (old != uri.toString()) try {
                contentResolver.releasePersistableUriPermission(Uri.parse(old), Intent.FLAG_GRANT_READ_URI_PERMISSION or Intent.FLAG_GRANT_WRITE_URI_PERMISSION)
            } catch (_: Exception) {}
        }
        prefs.edit().putString("uri", uri.toString()).putString("label", labelFor(uri)).apply()
        callJs("onAutoBackupChosen", "\"\"")
        pendingAutoText?.let { writeAuto(it) }
    }

    /** "ppl-kneeboard-autobackup.json in Google Drive", or just the file name elsewhere. */
    private fun labelFor(uri: Uri): String {
        val name = try {
            contentResolver.query(uri, arrayOf(OpenableColumns.DISPLAY_NAME), null, null, null)?.use { c ->
                if (c.moveToFirst()) c.getString(0) else null
            }
        } catch (_: Exception) { null } ?: "your backup file"
        return if (uri.authority?.contains("com.google.android.apps.docs") == true) "$name in Google Drive" else name
    }

    private fun writeAuto(text: String) {
        val target = prefs.getString("uri", null) ?: return
        Thread {
            val err = try {
                contentResolver.openOutputStream(Uri.parse(target), "wt")?.use { it.write(text.toByteArray(Charsets.UTF_8)) }
                    ?: throw IllegalStateException("no stream")
                null
            } catch (e: SecurityException) {
                "Permission to the backup file was lost. Choose the file again."
            } catch (e: Exception) {
                "Couldn't write the backup file (${e.javaClass.simpleName}). It will try again."
            }
            if (err == null) prefs.edit().putLong("last", System.currentTimeMillis()).remove("err").apply()
            else prefs.edit().putString("err", err).apply()
            runOnUiThread { callJs("onAutoBackupDone", if (err == null) "null" else JSONObject.quote(err)) }
        }.start()
    }

    private fun callJs(fn: String, arg: String) {
        web.evaluateJavascript("window.$fn && window.$fn($arg)", null)
    }

    inner class Bridge {
        @JavascriptInterface
        fun exportFile(name: String, text: String) {
            runOnUiThread {
                pendingExport = text
                createDoc.launch(name)
            }
        }

        /** Pick the file automatic backups go to (the save screen, so Drive can be chosen). */
        @JavascriptInterface
        fun chooseAutoBackup(name: String, text: String) {
            runOnUiThread { pendingAutoText = text; chooseAuto.launch(name) }
        }

        /** Overwrite the chosen file with this backup text, in the background. */
        @JavascriptInterface
        fun autoBackup(text: String) {
            pendingAutoText = text
            runOnUiThread { writeAuto(text) }
        }

        /** {"on":bool,"label":..,"last":ms,"err":..} */
        @JavascriptInterface
        fun autoBackupInfo(): String = JSONObject().apply {
            put("on", prefs.getString("uri", null) != null)
            put("label", prefs.getString("label", "") ?: "")
            put("last", prefs.getLong("last", 0L))
            put("err", prefs.getString("err", "") ?: "")
        }.toString()

        @JavascriptInterface
        fun autoBackupOff() {
            prefs.getString("uri", null)?.let { old ->
                try {
                    contentResolver.releasePersistableUriPermission(Uri.parse(old), Intent.FLAG_GRANT_READ_URI_PERMISSION or Intent.FLAG_GRANT_WRITE_URI_PERMISSION)
                } catch (_: Exception) {}
            }
            prefs.edit().clear().apply()
        }

        @JavascriptInterface
        fun importFile() {
            runOnUiThread { openDoc.launch(arrayOf("application/json", "text/plain", "application/octet-stream")) }
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Kneeboard use: keep the screen on while the app is in front.
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)

        val loader = WebViewAssetLoader.Builder()
            .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(this))
            .build()

        web = WebView(this).apply {
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            settings.allowFileAccess = false
            settings.allowContentAccess = false
            addJavascriptInterface(Bridge(), "AndroidBridge")
            webViewClient = object : WebViewClient() {
                override fun shouldInterceptRequest(
                    view: WebView,
                    request: WebResourceRequest
                ): WebResourceResponse? = loader.shouldInterceptRequest(request.url)

                // Nothing in the app links out; refuse anything that is not the bundled page.
                override fun shouldOverrideUrlLoading(
                    view: WebView,
                    request: WebResourceRequest
                ): Boolean = request.url.host != ASSET_HOST
            }
        }
        setContentView(web)
        web.loadUrl("https://$ASSET_HOST/assets/index.html")

        // Hardware back steps back through the page's own history
        // (phase -> home, question -> notes -> topics), then leaves the app.
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (web.canGoBack()) web.goBack() else finish()
            }
        })
    }

    // Leaving the app: write any backup the page is still waiting to send.
    override fun onPause() {
        web.evaluateJavascript("window.pplAutoBackupFlush && window.pplAutoBackupFlush()", null)
        super.onPause()
    }

    override fun onDestroy() {
        web.destroy()
        super.onDestroy()
    }

    private companion object {
        const val ASSET_HOST = "appassets.androidplatform.net"
    }
}

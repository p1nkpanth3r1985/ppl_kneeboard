package uk.co.electronetworks.pplkneeboard

import android.annotation.SuppressLint
import android.net.Uri
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

    override fun onDestroy() {
        web.destroy()
        super.onDestroy()
    }

    private companion object {
        const val ASSET_HOST = "appassets.androidplatform.net"
    }
}

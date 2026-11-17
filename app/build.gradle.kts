plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

val buildNumber = (System.getenv("BUILD_NUMBER") ?: "1").toInt()

android {
    namespace = "uk.co.electronetworks.pplkneeboard"
    compileSdk = 34

    defaultConfig {
        applicationId = "uk.co.electronetworks.pplkneeboard"
        minSdk = 26
        targetSdk = 34
        versionCode = buildNumber
        versionName = "1.0.$buildNumber"
    }

    // Personal sideloaded app: the key lives in this private repo so every
    // build is signed the same way and installs over the previous version.
    signingConfigs {
        create("release") {
            storeFile = rootProject.file("signing/pplkneeboard.jks")
            storePassword = "pplkneeboard-dave"
            keyAlias = "pplkneeboard"
            keyPassword = "pplkneeboard-dave"
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            signingConfig = signingConfigs.getByName("release")
        }
        debug {
            signingConfig = signingConfigs.getByName("release")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.13.1")
    implementation("androidx.activity:activity-ktx:1.9.2")
    implementation("androidx.webkit:webkit:1.11.0")
}

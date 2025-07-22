package com.sendbird.sdk.aiagent.sample.activities

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import com.sendbird.sdk.aiagent.common.extensions.applyAppLocale
import com.sendbird.sdk.aiagent.common.utils.Logger
import java.util.Locale

open class BaseSampleActivity : AppCompatActivity() {
    override fun attachBaseContext(newBase: Context) {
        val languageTag = Locale.getDefault().toLanguageTag()
        Logger.i("attachBaseContext: languageTag=$languageTag")
        if (languageTag.isNotEmpty()) {
            val localizedContext = newBase.applyAppLocale(languageTag)
            super.attachBaseContext(localizedContext)
        }
    }
}

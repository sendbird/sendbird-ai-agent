package com.sendbird.sdk.aiagent.sample.activities

import android.content.Context
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.viewbinding.ViewBinding
import com.sendbird.sdk.aiagent.common.extensions.applyAppLocale
import com.sendbird.sdk.aiagent.common.utils.Logger
import java.util.Locale

abstract class BaseSampleActivity : AppCompatActivity() {
    abstract val binding: ViewBinding
    override fun attachBaseContext(newBase: Context) {
        val languageTag = Locale.getDefault().toLanguageTag()
        Logger.i("attachBaseContext: languageTag=$languageTag")
        if (languageTag.isNotEmpty()) {
            val localizedContext = newBase.applyAppLocale(languageTag)
            super.attachBaseContext(localizedContext)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setupWindowInsets()
    }

    private fun setupWindowInsets() {
        ViewCompat.setOnApplyWindowInsetsListener(binding.root) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
    }
}

package com.sendbird.sdk.aiagent.sample.utils

import android.content.Context
import com.sendbird.sdk.aiagent.sample.model.SampleAppInfo
import com.sendbird.sdk.aiagent.sample.model.ManualUserInfo
import com.sendbird.sdk.aiagent.sample.persists.Preference

internal object PreferenceUtils {
    private const val PREFERENCE_KEY_MANUAL_USER_INFO = "PREFERENCE_KEY_MANUAL_USER_INFO"
    private const val PREFERENCE_KEY_SAMPLE_APP_INFO = "PREFERENCE_KEY_SAMPLE_APP_INFO"

    private lateinit var pref: Preference

    fun init(context: Context) {
        pref = Preference(context, "sendbird-ai-agent-sample")
    }

    var manualUserInfo: ManualUserInfo?
        get() = pref.getString(PREFERENCE_KEY_MANUAL_USER_INFO)?.let { ManualUserInfo(it) }
        set(value) = if (value == null) pref.remove(PREFERENCE_KEY_MANUAL_USER_INFO) else pref.putString(PREFERENCE_KEY_MANUAL_USER_INFO, value.toJson().toString())

    var sampleAppInfo: SampleAppInfo?
        get() = pref.getString(PREFERENCE_KEY_SAMPLE_APP_INFO)?.let { SampleAppInfo(it) }
        set(value) = if (value == null) pref.remove(PREFERENCE_KEY_SAMPLE_APP_INFO) else pref.putString(PREFERENCE_KEY_SAMPLE_APP_INFO, value.toJson().toString())

    fun clearAll() {
        pref.clear()
    }
}

package com.sendbird.sdk.aiagent.sample.persists

import android.content.Context
import android.content.SharedPreferences

internal class Preference(context: Context, fileName: String) {

    fun getString(key: String, defaultValue: String? = null): String? =
        pref.getString(key, defaultValue) ?: defaultValue

    fun putString(key: String, value: String) = pref.edit().putString(key, value).apply()
    fun getInt(key: String, defaultValue: Int = 0): Int = pref.getInt(key, defaultValue)
    fun putInt(key: String, value: Int) = pref.edit().putInt(key, value).apply()
    fun getBoolean(key: String, defaultValue: Boolean = false): Boolean = pref.getBoolean(key, defaultValue)
    fun putBoolean(key: String, value: Boolean) = pref.edit().putBoolean(key, value).apply()
    fun clear() = pref.edit().clear().apply()
    fun remove(key: String) = pref.edit().remove(key).apply()
    fun contains(key: String): Boolean = pref.contains(key)

    private val pref: SharedPreferences by lazy {
        context.getSharedPreferences(
            fileName,
            Context.MODE_PRIVATE
        )
    }
}

package com.sendbird.sdk.aiagent.sample.utils

import android.content.Context
import android.content.res.Configuration
import com.sendbird.android.exception.SendbirdException
import com.sendbird.sdk.aiagent.messenger.AIAgentMessenger
import com.sendbird.sdk.aiagent.messenger.consts.MessengerThemeMode
import com.sendbird.sdk.aiagent.messenger.interfaces.MessengerInitResultHandler
import com.sendbird.sdk.aiagent.messenger.model.MessengerInitParams
import com.sendbird.sdk.aiagent.messenger.model.SessionInfo
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException
import kotlin.coroutines.suspendCoroutine

fun Context.isDarkTheme(): Boolean {
    val currentNightMode = resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK
    return currentNightMode == Configuration.UI_MODE_NIGHT_YES
}

fun Context.getCurrentTheme(): MessengerThemeMode {
    return if (applicationContext.isDarkTheme()) {
        MessengerThemeMode.Dark
    } else {
        MessengerThemeMode.Light
    }
}

suspend fun Context.awaitInitializeMessenger(appId: String, apiHost: String?, wsHost: String?) = suspendCoroutine { cont ->
    AIAgentMessenger.initialize(
        MessengerInitParams(
            context = this,
            appId = appId,
            theme = getCurrentTheme(),
            initResultHandler = object : MessengerInitResultHandler {
                override fun onInitSuccess() {
                    AIAgentMessenger.updateSessionInfo(SessionInfo.AnonymousSessionInfo())
                    cont.resume(Unit)
                }

                override fun onInitFailure(e: SendbirdException) {
                    cont.resumeWithException(e)
                }
                override fun onMigrationStarted() {}
            },
            apiHost = apiHost,
            wsHost = wsHost
        )
    )
}

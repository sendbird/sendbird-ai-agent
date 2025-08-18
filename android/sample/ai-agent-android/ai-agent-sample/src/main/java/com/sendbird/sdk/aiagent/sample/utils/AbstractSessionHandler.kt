package com.sendbird.sdk.aiagent.sample.utils

import com.sendbird.android.handler.SessionTokenRequester
import com.sendbird.sdk.aiagent.messenger.interfaces.AIAgentSessionHandler
import com.sendbird.sdk.aiagent.common.utils.Logger

class AbstractSessionHandler : AIAgentSessionHandler() {
    override fun onSessionClosed() {
        Logger.w("Session closed")
    }

    override fun onSessionTokenRequired(sessionTokenRequester: SessionTokenRequester) {
        Logger.w("Session token required")
    }
}

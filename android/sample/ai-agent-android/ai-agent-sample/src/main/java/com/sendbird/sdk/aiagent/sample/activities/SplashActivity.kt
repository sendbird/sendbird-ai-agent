package com.sendbird.sdk.aiagent.sample.activities

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import androidx.lifecycle.lifecycleScope
import com.sendbird.sdk.aiagent.common.utils.Logger
import com.sendbird.sdk.aiagent.messenger.ui.widget.WaitingDialog
import com.sendbird.sdk.aiagent.sample.AgentApplication
import com.sendbird.sdk.aiagent.sample.consts.InitState
import com.sendbird.sdk.aiagent.sample.databinding.SampleLayoutSplashBinding
import com.sendbird.sdk.aiagent.sample.utils.PreferenceUtils
import kotlinx.coroutines.launch

@SuppressLint("CustomSplashScreen")
class SplashActivity : BaseSampleActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        SampleLayoutSplashBinding.inflate(layoutInflater).apply {
            setContentView(root)
        }

        lifecycleScope.launch {
            AgentApplication.initState.collect {
                Logger.i(">> collected, initState: $it")
                when (it) {
                    InitState.NONE -> {}
                    InitState.MIGRATING -> WaitingDialog.show(this@SplashActivity)
                    InitState.FAILED, InitState.SUCCEED -> {
                        WaitingDialog.dismiss()
                        val appInfo = PreferenceUtils.sampleAppInfo
                        val intent = if (appInfo == null) {
                            Intent(this@SplashActivity, SelectAppInfoActivity::class.java)
                        } else {
                            ViewMainActivity.newIntent(this@SplashActivity, aiAgentId = appInfo.aiAgentId)
                        }
                        startActivity(intent)
                        finish()
                    }
                }
            }
        }
    }
}

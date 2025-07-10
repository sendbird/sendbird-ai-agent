package com.sendbird.sdk.aiagent.sample.activities

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.View.GONE
import android.view.View.VISIBLE
import android.widget.Toast
import androidx.core.content.ContextCompat
import androidx.core.view.WindowCompat
import androidx.lifecycle.lifecycleScope
import com.sendbird.sdk.aiagent.common.extensions.addRipple
import com.sendbird.sdk.aiagent.common.extensions.aiAgentId
import com.sendbird.sdk.aiagent.messenger.AIAgentMessenger
import com.sendbird.sdk.aiagent.messenger.BuildConfig
import com.sendbird.sdk.aiagent.messenger.consts.LaunchMode
import com.sendbird.sdk.aiagent.messenger.consts.MessengerEntryPoint
import com.sendbird.sdk.aiagent.messenger.model.LauncherLayoutParams
import com.sendbird.sdk.aiagent.messenger.model.LauncherLocation
import com.sendbird.sdk.aiagent.messenger.model.LauncherMargin
import com.sendbird.sdk.aiagent.messenger.model.LauncherSettingsParams
import com.sendbird.sdk.aiagent.messenger.ui.MessengerLauncher
import com.sendbird.sdk.aiagent.messenger.ui.activity.MessengerActivity
import com.sendbird.sdk.aiagent.sample.R
import com.sendbird.sdk.aiagent.sample.databinding.ActivityViewMainBinding
import com.sendbird.sdk.aiagent.sample.model.us3
import com.sendbird.sdk.aiagent.sample.utils.PreferenceUtils
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class ViewMainActivity : BaseSampleActivity() {
    private lateinit var binding: ActivityViewMainBinding

    private val aiAgentId: String? by lazy { intent.extras.aiAgentId }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityViewMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        initMessengerLauncher()
        setButtonForFullScreenAiAgent()
        initView()
    }

    override fun onResume() {
        super.onResume()
        initManualUserProfile()
        drawFingerPrint()
    }

    private fun initManualUserProfile() {
        with(binding.ivProfile) {
            visibility = if (PreferenceUtils.manualUserInfo == null) {
                setImageResource(R.drawable.sample_profile_icon)
                setOnClickListener {
                    startActivity(Intent(this@ViewMainActivity, LoginActivity::class.java))
                }
                VISIBLE
            } else {
                GONE
            }
            addRipple()
        }
    }

    private fun initMessengerLauncher() {
        aiAgentId?.let {
            val params = LauncherLayoutParams(
                LaunchMode.ANCHORED,
                LauncherMargin(12, 12, 12, 12),
                LauncherLocation.BOTTOM_END
            )
            MessengerLauncher(this, it, LauncherSettingsParams(layoutParams = params)).attach()
        } ?: run {
            Toast.makeText(this, R.string.aa_text_error_not_found_aiagent_id, Toast.LENGTH_SHORT).show()
            finishAffinity()
        }
    }

    private fun setButtonForFullScreenAiAgent() {
        binding.btnViewDemo.setOnClickListener {
            aiAgentId?.let {
                startActivity(MessengerActivity.newIntentForConversation(this, it))
            }
        }
    }

    private fun initView() {
        lifecycleScope.launch {
            window.statusBarColor = ContextCompat.getColor(this@ViewMainActivity, R.color.black_500)
            WindowCompat.getInsetsController(window, window.decorView).isAppearanceLightStatusBars = false
            binding.btnLogout.setOnClickListener {
                lifecycleScope.launch(Dispatchers.IO) {
                    PreferenceUtils.clearAll()
                    AIAgentMessenger.deauthenticate()
                    withContext(Dispatchers.Main) {
                        finishAffinity()
                        startActivity(Intent(this@ViewMainActivity, SelectAppInfoActivity::class.java))
                    }
                }
            }
        }
    }

    private fun drawFingerPrint() {
        lifecycleScope.launch {
            val fingerPrint = withContext(Dispatchers.IO) {
                val region = (PreferenceUtils.sampleAppInfo ?: us3).region.name
                val fingerPrint = "${BuildConfig.VERSION_NAME} - [$region]"

                PreferenceUtils.manualUserInfo?.let {
                    "${fingerPrint}\n${it.userId}"
                } ?: fingerPrint
            }

            withContext(Dispatchers.Main) {
                binding.tvInformation.text = fingerPrint
            }
        }
    }

    companion object {
        private const val KEY_AI_AGENT_ID = "KEY_AI_AGENT_ID"
        internal fun newIntent(context: Context, aiAgentId: String): Intent {
            return Intent(context, ViewMainActivity::class.java).apply {
                putExtra(KEY_AI_AGENT_ID, aiAgentId)
            }
        }
    }
}

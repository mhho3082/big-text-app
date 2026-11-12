package com.mhho3082.bigtext

import android.os.Bundle
import android.content.Intent
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "Big Text"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    ShareTextModule.handleIntent(intent)
    AppLaunchModule.handleIntent(intent)
    setIntent(sanitizeIntent(intent))
  }

  override fun onNewIntent(intent: android.content.Intent) {
    super.onNewIntent(intent)
    ShareTextModule.handleIntent(intent)
    AppLaunchModule.handleIntent(intent)
    setIntent(sanitizeIntent(intent))
  }

  override fun onWindowFocusChanged(hasFocus: Boolean) {
    super.onWindowFocusChanged(hasFocus)

    if (hasFocus) {
      ImmersiveModeModule.setImmersiveMode(this, ImmersiveModeModule.isEnabled)
      KeepScreenOnModule.setKeepScreenOn(this, KeepScreenOnModule.isEnabled)
    }
  }

  private fun sanitizeIntent(intent: Intent): Intent {
    return Intent(intent).apply {
      if (getBooleanExtra(WidgetProvider.EXTRA_OPEN_WIDGET_OUTPUT, false)) {
        removeExtra(WidgetProvider.EXTRA_OPEN_WIDGET_OUTPUT)
      }
    }
  }
}

package com.mhho3082.bigtext

import android.app.Activity
import android.view.WindowManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class KeepScreenOnModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String = "KeepScreenOn"

  @ReactMethod
  fun setEnabled(enabled: Boolean) {
    isEnabled = enabled
    setKeepScreenOn(reactContext.currentActivity, enabled)
  }

  companion object {
    @Volatile
    var isEnabled: Boolean = false

    fun setKeepScreenOn(activity: Activity?, enabled: Boolean) {
      if (activity == null) {
        return
      }

      activity.runOnUiThread {
        if (enabled) {
          activity.window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        } else {
          activity.window.clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        }
      }
    }
  }
}

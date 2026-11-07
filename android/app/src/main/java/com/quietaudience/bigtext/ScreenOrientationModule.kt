package com.quietaudience.bigtext

import android.app.Activity
import android.content.pm.ActivityInfo
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ScreenOrientationModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String = "ScreenOrientation"

  @ReactMethod
  fun setSensorRotationEnabled(enabled: Boolean) {
    isSensorRotationEnabled = enabled
    setSensorRotation(reactContext.currentActivity, enabled)
  }

  companion object {
    @Volatile
    var isSensorRotationEnabled: Boolean = false

    fun setSensorRotation(activity: Activity?, enabled: Boolean) {
      if (activity == null) {
        return
      }

      activity.runOnUiThread {
        activity.requestedOrientation =
          if (enabled) {
            ActivityInfo.SCREEN_ORIENTATION_FULL_SENSOR
          } else {
            ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED
          }
      }
    }
  }
}

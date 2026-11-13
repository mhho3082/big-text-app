package com.mhho3082.bigtext

import android.app.Activity
import android.content.pm.ActivityInfo
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ScreenOrientationModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String = "ScreenOrientation"

  @ReactMethod
  fun setScreenOrientation(orientation: String) {
    screenOrientation = orientation
    applyScreenOrientation(reactContext.currentActivity, orientation)
  }

  @ReactMethod
  fun resetScreenOrientation() {
    screenOrientation = "automatic"
    applySystemScreenOrientation(reactContext.currentActivity)
  }

  companion object {
    @Volatile
    var screenOrientation: String = "automatic"

    fun applyScreenOrientation(activity: Activity?, orientation: String) {
      if (activity == null) {
        return
      }

      activity.runOnUiThread {
        if (orientation == "automatic") {
          activity.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_FULL_SENSOR
        } else {
          activity.requestedOrientation = when (orientation) {
            "portrait" -> ActivityInfo.SCREEN_ORIENTATION_PORTRAIT
            "landscapeLeft" -> ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE
            "landscapeRight" -> ActivityInfo.SCREEN_ORIENTATION_REVERSE_LANDSCAPE
            "upsideDown" -> ActivityInfo.SCREEN_ORIENTATION_REVERSE_PORTRAIT
            else -> ActivityInfo.SCREEN_ORIENTATION_FULL_SENSOR
          }
        }
      }
    }

    fun applySystemScreenOrientation(activity: Activity?) {
      if (activity == null) {
        return
      }

      activity.runOnUiThread {
        activity.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED
      }
    }
  }
}

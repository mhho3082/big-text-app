package com.quietaudience.bigtext

import android.app.Activity
import android.os.Build
import android.view.View
import android.view.WindowManager
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ImmersiveModeModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String = "ImmersiveMode"

  @ReactMethod
  fun setEnabled(enabled: Boolean) {
    isEnabled = enabled
    setImmersiveMode(reactContext.currentActivity, enabled)
  }

  companion object {
    @Volatile
    var isEnabled: Boolean = false

    fun setImmersiveMode(activity: Activity?, enabled: Boolean) {
      if (activity == null) {
        return
      }

      activity.runOnUiThread {
        if (enabled) {
          activity.window.addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN)
        } else {
          activity.window.clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN)
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
          WindowCompat.setDecorFitsSystemWindows(activity.window, !enabled)

          val controller = WindowCompat.getInsetsController(activity.window, activity.window.decorView)
          if (controller != null) {
            controller.systemBarsBehavior =
              WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
            if (enabled) {
              controller.hide(WindowInsetsCompat.Type.systemBars())
            } else {
              controller.show(WindowInsetsCompat.Type.systemBars())
            }
          }
        } else {
          @Suppress("DEPRECATION")
          val decorView = activity.window.decorView
          @Suppress("DEPRECATION")
          decorView.systemUiVisibility =
            if (enabled) {
              View.SYSTEM_UI_FLAG_LAYOUT_STABLE or
                View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN or
                View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION or
                View.SYSTEM_UI_FLAG_FULLSCREEN or
                View.SYSTEM_UI_FLAG_HIDE_NAVIGATION or
                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
            } else {
              View.SYSTEM_UI_FLAG_VISIBLE
            }
        }
      }
    }
  }
}

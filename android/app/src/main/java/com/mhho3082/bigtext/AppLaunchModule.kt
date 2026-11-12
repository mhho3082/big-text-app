package com.mhho3082.bigtext

import android.content.Intent
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule

class AppLaunchModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String = "AppLaunch"

  override fun initialize() {
    super.initialize()
    registerReactContext(reactContext)
  }

  override fun invalidate() {
    unregisterReactContext(reactContext)
    super.invalidate()
  }

  @ReactMethod
  fun getInitialLaunchTarget(promise: Promise) {
    promise.resolve(consumeInitialLaunchTarget())
  }

  @ReactMethod
  fun addListener(eventName: String) {
    // Required by NativeEventEmitter on Android.
  }

  @ReactMethod
  fun removeListeners(count: Int) {
    // Required by NativeEventEmitter on Android.
  }

  companion object {
    @Volatile
    private var initialLaunchTarget: String? = null

    @Volatile
    private var reactContext: ReactApplicationContext? = null

    private const val EVENT_NAME = "launchTargetReceived"

    fun handleIntent(intent: Intent?) {
      val target = extractLaunchTarget(intent) ?: return
      initialLaunchTarget = target
      emitTarget(target)
    }

    private fun consumeInitialLaunchTarget(): String? {
      val target = initialLaunchTarget
      initialLaunchTarget = null
      return target
    }

    private fun registerReactContext(context: ReactApplicationContext) {
      reactContext = context
    }

    private fun unregisterReactContext(context: ReactApplicationContext) {
      if (reactContext === context) {
        reactContext = null
      }
    }

    private fun emitTarget(target: String) {
      val context = reactContext ?: return
      if (!context.hasActiveCatalystInstance()) {
        return
      }

      context.runOnUiQueueThread {
        if (context.hasActiveCatalystInstance()) {
          context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(EVENT_NAME, target)
        }
      }
    }

    private fun extractLaunchTarget(intent: Intent?): String? {
      return when (intent?.action) {
        WidgetProvider.ACTION_OPEN_WIDGET_OUTPUT -> {
          if (intent.getBooleanExtra(WidgetProvider.EXTRA_OPEN_WIDGET_OUTPUT, false)) {
            "widgetOutput"
          } else {
            null
          }
        }
        Intent.ACTION_MAIN -> "home"
        else -> null
      }
    }
  }
}

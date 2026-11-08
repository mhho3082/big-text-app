package com.mhho3082.bigtext

import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule

class ShareTextModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String = "ShareText"

  override fun initialize() {
    super.initialize()
    registerReactContext(reactContext)
  }

  override fun invalidate() {
    unregisterReactContext(reactContext)
    super.invalidate()
  }

  @ReactMethod
  fun getInitialText(promise: Promise) {
    promise.resolve(consumeInitialText())
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
    private var initialText: String? = null

    @Volatile
    private var reactContext: ReactApplicationContext? = null

    private const val EVENT_NAME = "shareTextReceived"

    fun handleIntent(intent: Intent?) {
      val text = extractSharedText(intent) ?: return
      initialText = text
      emitText(text)
    }

    fun consumeInitialText(): String? {
      val text = initialText
      initialText = null
      return text
    }

    private fun registerReactContext(context: ReactApplicationContext) {
      reactContext = context
    }

    private fun unregisterReactContext(context: ReactApplicationContext) {
      if (reactContext === context) {
        reactContext = null
      }
    }

    private fun emitText(text: String) {
      val context = reactContext ?: return
      if (!context.hasActiveCatalystInstance()) {
        return
      }

      context.runOnUiQueueThread {
        if (context.hasActiveCatalystInstance()) {
          context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(EVENT_NAME, text)
        }
      }
    }

    private fun extractSharedText(intent: Intent?): String? {
      if (intent?.action != Intent.ACTION_SEND) {
        return null
      }

      if (intent.type != "text/plain") {
        return null
      }

      return intent.getCharSequenceExtra(Intent.EXTRA_TEXT)?.toString()
    }
  }
}

package com.mhho3082.bigtext

import android.widget.Toast
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ToastModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String = "Toast"

  @ReactMethod
  fun show(message: String) {
    reactContext.runOnUiQueueThread {
      Toast.makeText(reactContext, message, Toast.LENGTH_SHORT).show()
    }
  }
}

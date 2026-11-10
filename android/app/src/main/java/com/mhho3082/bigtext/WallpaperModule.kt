package com.mhho3082.bigtext

import android.app.WallpaperManager
import android.graphics.BitmapFactory
import android.net.Uri
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class WallpaperModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String = "Wallpaper"

  @ReactMethod
  fun setWallpaper(uri: String, promise: Promise) {
    try {
      val wallpaperManager = WallpaperManager.getInstance(reactContext)
      val inputStream = reactContext.contentResolver.openInputStream(Uri.parse(uri))
        ?: throw IllegalArgumentException("Unable to open image uri")

      inputStream.use { stream ->
        val bitmap = BitmapFactory.decodeStream(stream)
          ?: throw IllegalArgumentException("Unable to decode image uri")
        wallpaperManager.setBitmap(bitmap)
      }

      promise.resolve(null)
    } catch (error: Throwable) {
      promise.reject("WALLPAPER_ERROR", error)
    }
  }
}

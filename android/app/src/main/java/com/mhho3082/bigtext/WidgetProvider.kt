package com.mhho3082.bigtext

import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.os.Bundle
import android.widget.RemoteViews

class WidgetProvider : AppWidgetProvider() {

  override fun onUpdate(
    context: Context,
    appWidgetManager: AppWidgetManager,
    appWidgetIds: IntArray,
  ) {
    appWidgetIds.forEach { appWidgetId ->
      appWidgetManager.updateAppWidget(appWidgetId, buildViews(context, appWidgetId))
    }
  }

  override fun onAppWidgetOptionsChanged(
    context: Context,
    appWidgetManager: AppWidgetManager,
    appWidgetId: Int,
    newOptions: Bundle,
  ) {
    appWidgetManager.updateAppWidget(appWidgetId, buildViews(context, appWidgetId))
  }

  private fun buildViews(context: Context, appWidgetId: Int): RemoteViews {
    val options = AppWidgetManager.getInstance(context).getAppWidgetOptions(appWidgetId)
    val minWidth = options.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH)
    val minHeight = options.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_HEIGHT)
    val imageRes = pickImageResource(minWidth, minHeight)

    return RemoteViews(context.packageName, R.layout.widget_hello).apply {
      setImageViewResource(R.id.widget_icon, imageRes)
    }
  }

  private fun pickImageResource(minWidth: Int, minHeight: Int): Int {
    val size = minOf(minWidth, minHeight)

    return if (size >= 160) R.drawable.widget_icon_1024 else R.drawable.widget_icon_512
  }
}

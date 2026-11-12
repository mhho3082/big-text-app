import SharedGroupPreferences from 'react-native-shared-group-preferences';
import { getDefaultPersistedOptions } from './useAppStore';
import type { WidgetOptions } from './persistedOptions';

const WIDGET_APP_GROUP = 'com.mhho3082.bigtext.widget';
const WIDGET_OPTIONS_KEY = 'widgetOptions';

type WidgetOptionsMap = Record<string, WidgetOptions>;

function normalizeWidgetOptions(options: WidgetOptions): WidgetOptions {
  return {
    ...options,
    widgetName: options.widgetName ?? '',
  };
}

async function loadWidgetOptionsMap(): Promise<WidgetOptionsMap> {
  try {
    const data = await SharedGroupPreferences.getItem<unknown>(
      WIDGET_OPTIONS_KEY,
      WIDGET_APP_GROUP,
      { useAndroidSharedPreferences: true },
    );

    if (typeof data === 'string') {
      const parsed = JSON.parse(data) as unknown;

      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed as WidgetOptionsMap;
      }
    }

    if (data && typeof data === 'object' && !Array.isArray(data)) {
      return data as WidgetOptionsMap;
    }
  } catch {
    return {};
  }

  return {};
}

export async function loadWidgetOptions(
  widgetId: number,
): Promise<WidgetOptions | null> {
  const map = await loadWidgetOptionsMap();
  const options = map[String(widgetId)];

  return options ? normalizeWidgetOptions(options) : null;
}

export async function saveWidgetOptions(
  widgetId: number,
  options: WidgetOptions,
): Promise<void> {
  const map = await loadWidgetOptionsMap();
  map[String(widgetId)] = options;

  await SharedGroupPreferences.setItem(
    WIDGET_OPTIONS_KEY,
    map,
    WIDGET_APP_GROUP,
    { useAndroidSharedPreferences: true },
  );
}

export async function clearWidgetOptions(widgetId: number): Promise<void> {
  const map = await loadWidgetOptionsMap();
  delete map[String(widgetId)];

  await SharedGroupPreferences.setItem(
    WIDGET_OPTIONS_KEY,
    map,
    WIDGET_APP_GROUP,
    { useAndroidSharedPreferences: true },
  );
}

export function mergeWidgetOptions(
  base?: Partial<WidgetOptions>,
  overrides?: Partial<WidgetOptions>,
): WidgetOptions {
  return {
    ...getDefaultPersistedOptions(),
    widgetName: '',
    ...(base ?? {}),
    ...(overrides ?? {}),
  };
}

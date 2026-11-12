import { I18nManager } from 'react-native';

export type AppLanguage = 'en' | 'zh-TW' | 'zh-CN';

type Locale = Record<string, string>;

export const LANGUAGE_BUTTON_LABELS: Record<AppLanguage, string> = {
  en: 'EN',
  'zh-TW': '繁',
  'zh-CN': '简',
};

const LANGUAGE_ORDER: AppLanguage[] = ['zh-TW', 'zh-CN', 'en'];

function getLocaleParts(locale: string): {
  language: string;
  script?: string;
  region?: string;
} {
  const parts = locale.replace(/_/g, '-').split('-');
  const language = parts[0]?.toLowerCase() ?? '';
  let script: string | undefined;
  let region: string | undefined;

  for (const part of parts.slice(1)) {
    if (!script && /^[A-Za-z]{4}$/.test(part)) {
      script = part.toLowerCase();
      continue;
    }

    if (!region && (/^[A-Za-z]{2}$/.test(part) || /^\d{3}$/.test(part))) {
      region = part.toUpperCase();
    }
  }

  return { language, script, region };
}

function resolveLanguageFromLocale(
  locale: string | null | undefined,
): AppLanguage {
  if (!locale) {
    return 'en';
  }

  const { language, script, region } = getLocaleParts(locale);

  if (language === 'en') {
    return 'en';
  }

  if (language !== 'zh') {
    return 'en';
  }

  if (script === 'hant') {
    return 'zh-TW';
  }

  if (script === 'hans') {
    return 'zh-CN';
  }

  if (region === 'TW' || region === 'HK' || region === 'MO') {
    return 'zh-TW';
  }

  if (region === 'CN' || region === 'SG') {
    return 'zh-CN';
  }

  return 'en';
}

function getDeviceLocale(): string | null {
  const intlLocale = Intl.DateTimeFormat().resolvedOptions().locale;

  if (intlLocale) {
    return intlLocale;
  }

  const localeIdentifier = I18nManager.getConstants().localeIdentifier;

  return localeIdentifier ?? null;
}

export function detectSystemLanguage(): AppLanguage {
  return resolveLanguageFromLocale(getDeviceLocale());
}

const locales: Record<AppLanguage, Locale> = {
  en: {
    'app.title': 'Big Text',
    'modal.close': 'Close',
    'home.lightMode': 'Light mode',
    'home.darkMode': 'Dark mode',
    'home.history': 'History',
    'home.textPlaceholder': 'Type your text',
    'home.textColor': 'Text',
    'home.backgroundColor': 'Background',
    'home.font': 'Font',
    'home.fontSize': 'Size',
    'home.labelSeparator': ': ',
    'home.alignmentOrientationSeparator': ', ',
    'home.auto': 'Auto',
    'home.custom': 'Custom',
    'home.share': 'Share',
    'home.shareImage': 'Share as image',
    'home.shareImageLandscape': 'Share as landscape',
    'home.shareImagePortrait': 'Share as portrait',
    'home.shareImageSquare': 'Share as square',
    'home.setAsWallpaper': 'Set as wallpaper',
    'home.wallpaperSet': 'Wallpaper set',
    'home.shareText': 'Share as plain text',
    'home.shareQr': 'Show as QR code',
    'home.animationStyle.label': 'Animation',
    'home.animationStyle.static': 'Static',
    'home.animationStyle.blink': 'Blink',
    'home.animationStyle.pulse': 'Pulse',
    'home.animationStyle.crossBlink': 'Cross Blink',
    'home.animationStyle.crossPulse': 'Cross Pulse',
    'animationPicker.title': 'Animation',
    'animationPicker.interval': 'Interval',
    'animationPicker.intervalNote':
      'Seconds between each change. For target audiences with ADHD, ASD, seizure/photosensitivity risk, or older adults, avoid very short intervals; keep it at least about 0.5s between changes or longer.',
    'home.alignment.label': 'Align',
    'home.alignment.center': 'Center',
    'home.alignment.topLeft': 'Top left',
    'home.alignment.topCenter': 'Top center',
    'home.alignment.topRight': 'Top right',
    'home.alignment.centerLeft': 'Center left',
    'home.alignment.centerRight': 'Center right',
    'home.alignment.bottomLeft': 'Bottom left',
    'home.alignment.bottomCenter': 'Bottom center',
    'home.alignment.bottomRight': 'Bottom right',
    'home.orientation.automatic': 'Auto-rotate',
    'home.orientation.portrait': 'Portrait',
    'home.orientation.landscapeLeft': 'Landscape left',
    'home.orientation.landscapeRight': 'Landscape right',
    'home.orientation.upsideDown': 'Upside down',
    'home.showText': 'Display',
    'home.confirm': 'Confirm',
    'home.exitHint': 'Notes: double-tap to exit the display screen',
    'home.credits':
      'Made by Max Ho (mhho3082). Thanks to Lucide Icons for icon assets.',
    'widgetOutput.missingWidgetId': 'Missing widget ID.',
    'widgetOutput.noSavedOptions':
      'No saved widget options for widget {widgetId}.',
    'history.empty': 'No history yet',
    'history.apply': 'Apply',
    'history.show': 'Show',
    'history.close': 'Close',
    'history.delete': 'Delete',
    'history.reset': 'Delete all data',
    'history.resetTitle': 'Delete all data?',
    'history.resetBody':
      'This will delete all app data and history. This action is not reversible.',
    'history.resetConfirm': 'Reset',
    'history.resetCancel': 'Cancel',
    'fontPicker.title': 'Output font',
    'fontPicker.note':
      'If a character does not render in one font, especially a rare Chinese character, please try other fonts as well.',
    'fontRemark.heavy': 'Heavy',
    'fontRemark.tcVersion': 'TC Version',
    'fontCategory.english': 'English',
    'fontCategory.traditionalChinese': 'Chinese',
    'fontSize.title': 'Font size',
    'fontSize.automatic': 'Automatic',
    'fontSize.automaticNote':
      'Some fonts do not fit well with automatic sizing. If the result looks off, switch to Custom.',
    'fontSize.custom': 'Custom',
    'fontSize.customNote':
      'In Custom, you can pan up or down on the output screen to adjust the size.',
    'fontSize.size': 'Size',
    'widgetConfig.title': 'Configure Widget',
    'widgetConfig.confirm': 'Confirm',
    'widgetConfig.name': 'Widget name',
    'license.ofl11': 'SIL Open Font License 1.1',
    'license.apache20': 'Apache License 2.0',
  },
  'zh-TW': {
    'app.title': '大字顯示',
    'modal.close': '關閉',
    'home.lightMode': '淺色模式',
    'home.darkMode': '深色模式',
    'home.history': '歷史',
    'home.textPlaceholder': '輸入',
    'home.textColor': '文字顏色',
    'home.backgroundColor': '背景顏色',
    'home.font': '字體',
    'home.fontSize': '字體大小',
    'home.labelSeparator': '：',
    'home.alignmentOrientationSeparator': '、',
    'home.auto': '自動',
    'home.custom': '自訂',
    'home.share': '分享',
    'home.shareImage': '分享為圖片',
    'home.shareImageLandscape': '分享為橫向',
    'home.shareImagePortrait': '分享為直向',
    'home.shareImageSquare': '分享為正方形',
    'home.setAsWallpaper': '設為桌布',
    'home.wallpaperSet': '桌布設定好了',
    'home.shareText': '分享為純文字',
    'home.shareQr': '顯示為 QR code',
    'home.animationStyle.label': '動畫',
    'home.animationStyle.static': '靜態',
    'home.animationStyle.blink': '閃爍',
    'home.animationStyle.pulse': '漸變',
    'home.animationStyle.crossBlink': '交叉閃爍',
    'home.animationStyle.crossPulse': '交叉漸變',
    'animationPicker.title': '動畫',
    'animationPicker.interval': '間隔',
    'animationPicker.intervalNote':
      '每次變化之間的間隔秒數。若目標受眾包含過動症、自閉症、癲癇／光敏風險者或年長者，請避免間隔過短，建議至少約 0.5 秒或更長。',
    'home.alignment.label': '對齊',
    'home.alignment.center': '置中',
    'home.alignment.topLeft': '左上',
    'home.alignment.topCenter': '上',
    'home.alignment.topRight': '右上',
    'home.alignment.centerLeft': '左',
    'home.alignment.centerRight': '右',
    'home.alignment.bottomLeft': '左下',
    'home.alignment.bottomCenter': '下',
    'home.alignment.bottomRight': '右下',
    'home.orientation.automatic': '自動旋轉',
    'home.orientation.portrait': '直向',
    'home.orientation.landscapeLeft': '橫向（左）',
    'home.orientation.landscapeRight': '橫向（右）',
    'home.orientation.upsideDown': '倒轉',
    'home.showText': '顯示',
    'home.confirm': '確認',
    'home.exitHint': '提示：在顯示畫面上雙擊即可退出',
    'home.credits':
      '由 Max Ho（mhho3082）製作。感謝 Lucide Icons 提供圖標資源。',
    'widgetOutput.missingWidgetId': '缺少小工具 ID。',
    'widgetOutput.noSavedOptions': '找不到小工具 {widgetId} 的已儲存設定。',
    'history.empty': '尚無歷史記錄',
    'history.apply': '套用',
    'history.show': '顯示',
    'history.close': '關閉',
    'history.delete': '刪除',
    'history.reset': '刪除所有資料',
    'history.resetTitle': '刪除所有資料？',
    'history.resetBody': '這將會刪除所有應用程式資料與紀錄。此操作無法復原。',
    'history.resetConfirm': '刪除',
    'history.resetCancel': '取消',
    'fontPicker.title': '輸出字體',
    'fontPicker.note':
      '若某個字型無法顯示某些字元，尤其是生僻字，建議亦可再試用其他字型。',
    'fontRemark.heavy': '粗體',
    'fontRemark.tcVersion': '繁體中文版',
    'fontCategory.english': '英文',
    'fontCategory.traditionalChinese': '中文',
    'fontSize.title': '字體大小',
    'fontSize.automatic': '自動',
    'fontSize.automaticNote':
      '有些字體與自動調整不一定合拍。如果顯示效果不理想，請改用「自訂」。',
    'fontSize.custom': '自訂',
    'fontSize.customNote': '在自訂模式下，可在顯示畫面裡上下滑動來調整大小。',
    'fontSize.size': '大小',
    'widgetConfig.title': '設定小工具',
    'widgetConfig.confirm': '確認',
    'widgetConfig.name': '小工具名稱',
    'license.ofl11': 'SIL 開源字體授權 1.1版',
    'license.apache20': 'Apache 授權 2.0',
  },
  'zh-CN': {
    'app.title': '大字显示',
    'modal.close': '关闭',
    'home.lightMode': '浅色模式',
    'home.darkMode': '深色模式',
    'home.history': '历史',
    'home.textPlaceholder': '输入',
    'home.textColor': '文字颜色',
    'home.backgroundColor': '背景颜色',
    'home.font': '字体',
    'home.fontSize': '字体大小',
    'home.labelSeparator': '：',
    'home.alignmentOrientationSeparator': '、',
    'home.auto': '自动',
    'home.custom': '自定义',
    'home.share': '分享',
    'home.shareImage': '分享为图片',
    'home.shareImageLandscape': '分享为横向',
    'home.shareImagePortrait': '分享为竖向',
    'home.shareImageSquare': '分享为正方形',
    'home.setAsWallpaper': '设为壁纸',
    'home.wallpaperSet': '壁纸设置好了',
    'home.shareText': '分享为纯文字',
    'home.shareQr': '显示为二维码',
    'home.animationStyle.label': '动画',
    'home.animationStyle.static': '静态',
    'home.animationStyle.blink': '闪烁',
    'home.animationStyle.pulse': '渐变',
    'home.animationStyle.crossBlink': '交叉闪烁',
    'home.animationStyle.crossPulse': '交叉渐变',
    'animationPicker.title': '动画',
    'animationPicker.interval': '间隔',
    'animationPicker.intervalNote':
      '每次变化之间的间隔秒数。如果目标受众包含过动症、自闭症、癫痫／光敏感风险人群或老年人，请避免间隔过短，建议至少约 0.5 秒或更长。',
    'home.alignment.label': '对齐',
    'home.alignment.center': '居中',
    'home.alignment.topLeft': '左上',
    'home.alignment.topCenter': '上',
    'home.alignment.topRight': '右上',
    'home.alignment.centerLeft': '左',
    'home.alignment.centerRight': '右',
    'home.alignment.bottomLeft': '左下',
    'home.alignment.bottomCenter': '下',
    'home.alignment.bottomRight': '右下',
    'home.orientation.automatic': '自动旋转',
    'home.orientation.portrait': '竖向',
    'home.orientation.landscapeLeft': '横向（左）',
    'home.orientation.landscapeRight': '横向（右）',
    'home.orientation.upsideDown': '倒转',
    'home.showText': '显示',
    'home.confirm': '确认',
    'home.exitHint': '提示：在显示画面上双击即可退出',
    'home.credits':
      '由 Max Ho（mhho3082）制作。感谢 Lucide Icons 提供图标资源。',
    'widgetOutput.missingWidgetId': '缺少小组件 ID。',
    'widgetOutput.noSavedOptions': '找不到小组件 {widgetId} 的已保存设置。',
    'history.empty': '暂无历史记录',
    'history.apply': '应用',
    'history.show': '显示',
    'history.close': '关闭',
    'history.delete': '删除',
    'history.reset': '删除所有数据',
    'history.resetTitle': '删除所有数据？',
    'history.resetBody': '这将会删除所有应用数据与记录。此操作无法复原。',
    'history.resetConfirm': '删除',
    'history.resetCancel': '取消',
    'fontPicker.title': '输出字体',
    'fontPicker.note':
      '如某个字体无法显示某些字符，尤其是生僻字，建议也试试其他字体。',
    'fontRemark.heavy': '粗体',
    'fontRemark.tcVersion': '繁体中文版',
    'fontCategory.english': '英文',
    'fontCategory.traditionalChinese': '中文',
    'fontSize.title': '字体大小',
    'fontSize.automatic': '自动',
    'fontSize.automaticNote':
      '有些字体和自动调整不一定合拍。如果显示效果不理想，请改用「自定义」。',
    'fontSize.custom': '自定义',
    'fontSize.customNote': '在自定义模式下，可在显示画面里上下滑动来调整大小。',
    'fontSize.size': '大小',
    'widgetConfig.title': '设置小组件',
    'widgetConfig.confirm': '确认',
    'widgetConfig.name': '小组件名称',
    'license.ofl11': 'SIL 开源字体授权 1.1 版',
    'license.apache20': 'Apache 许可证 2.0',
  },
};

let currentLanguage: AppLanguage = detectSystemLanguage();

export function setLanguage(language: AppLanguage): void {
  currentLanguage = language;
}

export function getLanguage(): AppLanguage {
  return currentLanguage;
}

export function nextLanguage(language: AppLanguage): AppLanguage {
  const index = LANGUAGE_ORDER.indexOf(language);
  return LANGUAGE_ORDER[(index + 1) % LANGUAGE_ORDER.length] ?? 'en';
}

export function t(
  key: string,
  params?: Record<string, string | number>,
  language: AppLanguage = currentLanguage,
): string {
  const dict = locales[language] ?? locales.en;
  let str = dict[key] ?? locales.en[key] ?? key;

  if (params) {
    for (const [paramKey, value] of Object.entries(params)) {
      str = str.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(value));
    }
  }

  return str;
}

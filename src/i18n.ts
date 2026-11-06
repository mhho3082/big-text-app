export type AppLanguage = 'en' | 'zh-TW' | 'zh-CN';

type Locale = Record<string, string>;

export const LANGUAGE_BUTTON_LABELS: Record<AppLanguage, string> = {
  en: 'EN',
  'zh-TW': '繁',
  'zh-CN': '簡',
};

const LANGUAGE_ORDER: AppLanguage[] = ['en', 'zh-TW', 'zh-CN'];

const locales: Record<AppLanguage, Locale> = {
  en: {
    'app.title': 'Big Text',
    'modal.close': 'Close',
    'home.lightMode': 'Light mode',
    'home.darkMode': 'Dark mode',
    'home.textPlaceholder': 'Type your text',
    'home.textColor': 'Text Color',
    'home.backgroundColor': 'Background Color',
    'home.font': 'Font',
    'home.fontSize': 'Size',
    'home.auto': 'Auto',
    'home.custom': 'Custom',
    'home.oneLine': 'One line',
    'home.wordBreak': 'Word break',
    'home.showText': 'Show text',
    'home.exitHint': 'Notes: double-tap to exit the display screen',
    'fontPicker.title': 'Output font',
    'fontCategory.english': 'English',
    'fontCategory.traditionalChinese': 'Traditional Chinese',
    'fontSize.title': 'Font size',
    'fontSize.automatic': 'Automatic',
    'fontSize.custom': 'Custom',
    'fontSize.size': 'Size',
    'license.ofl11': 'SIL Open Font License 1.1',
    'license.apache20': 'Apache License 2.0',
  },
  'zh-TW': {
    'app.title': '大字板',
    'modal.close': '關閉',
    'home.lightMode': '淺色模式',
    'home.darkMode': '深色模式',
    'home.textPlaceholder': '輸入',
    'home.textColor': '文字顏色',
    'home.backgroundColor': '背景顏色',
    'home.font': '字型',
    'home.fontSize': '字型大小',
    'home.auto': '自動',
    'home.custom': '自訂',
    'home.oneLine': '單行',
    'home.wordBreak': '按單詞拆分換行',
    'home.showText': '顯示',
    'home.exitHint': '注意：在顯示畫面上雙擊即可退出',
    'fontPicker.title': '輸出字體',
    'fontCategory.english': '英文',
    'fontCategory.traditionalChinese': '繁體中文',
    'fontSize.title': '字型大小',
    'fontSize.automatic': '自動',
    'fontSize.custom': '自訂',
    'fontSize.size': '大小',
    'license.ofl11': 'SIL 開源字型授權 1.1版',
    'license.apache20': 'Apache 授權 2.0',
  },
  'zh-CN': {
    'app.title': '大字板',
    'modal.close': '关闭',
    'home.lightMode': '浅色模式',
    'home.darkMode': '深色模式',
    'home.textPlaceholder': '输入',
    'home.textColor': '文字颜色',
    'home.backgroundColor': '背景颜色',
    'home.font': '字体',
    'home.fontSize': '字体大小',
    'home.auto': '自动',
    'home.custom': '自定义',
    'home.oneLine': '单行',
    'home.wordBreak': '按单词拆分换行',
    'home.showText': '显示',
    'home.exitHint': '注意：在显示画面上双击即可退出',
    'fontPicker.title': '输出字体',
    'fontCategory.english': '英文',
    'fontCategory.traditionalChinese': '繁体中文',
    'fontSize.title': '字体大小',
    'fontSize.automatic': '自动',
    'fontSize.custom': '自定义',
    'fontSize.size': '大小',
    'license.ofl11': 'SIL 开源字体授权 1.1 版',
    'license.apache20': 'Apache 许可证 2.0',
  },
};

let currentLanguage: AppLanguage = 'en';

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

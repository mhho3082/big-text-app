export type AppLanguage = 'en' | 'zh-TW' | 'zh-CN';

type Locale = Record<string, string>;

export const LANGUAGE_BUTTON_LABELS: Record<AppLanguage, string> = {
  en: 'EN',
  'zh-TW': '繁',
  'zh-CN': '简',
};

const LANGUAGE_ORDER: AppLanguage[] = ['zh-TW', 'zh-CN', 'en'];

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
    'home.auto': 'Auto',
    'home.custom': 'Custom',
    'home.shareImage': 'Share as image',
    'home.displayStyle.label': 'Effect',
    'home.displayStyle.static': 'Static',
    'home.displayStyle.strobe': 'Strobe',
    'home.displayStyle.pulse': 'Pulse',
    'home.displayStyle.crossStrobe': 'Cross Strobe',
    'home.displayStyle.crossPulse': 'Cross Pulse',
    'effectPicker.title': 'Effect',
    'effectPicker.interval': 'Interval',
    'effectPicker.intervalNote': 'Seconds between each change.',
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
    'home.showText': 'Display',
    'home.exitHint': 'Notes: double-tap to exit the display screen',
    'home.credits': 'Made by Max. Thanks to Lucide Icons for icon assets.',
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
    'home.font': '字型',
    'home.fontSize': '字型大小',
    'home.labelSeparator': '：',
    'home.auto': '自動',
    'home.custom': '自訂',
    'home.shareImage': '分享為圖片',
    'home.displayStyle.label': '效果',
    'home.displayStyle.static': '靜態',
    'home.displayStyle.strobe': '閃爍',
    'home.displayStyle.pulse': '脈衝',
    'home.displayStyle.crossStrobe': '交叉閃爍',
    'home.displayStyle.crossPulse': '交叉脈衝',
    'effectPicker.title': '效果',
    'effectPicker.interval': '間隔',
    'effectPicker.intervalNote': '每次變化的間隔秒數。',
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
    'home.showText': '顯示',
    'home.exitHint': '注意：在顯示畫面上雙擊即可退出',
    'home.credits': '由 Max 製作。感謝 Lucide 提供圖標資源。',
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
    'fontCategory.english': '英文',
    'fontCategory.traditionalChinese': '中文',
    'fontSize.title': '字型大小',
    'fontSize.automatic': '自動',
    'fontSize.automaticNote':
      '有些字型與自動調整不一定合拍。如果顯示效果不理想，請改用「自訂」。',
    'fontSize.custom': '自訂',
    'fontSize.customNote': '在自訂模式下，可在顯示畫面裡上下滑動來調整大小。',
    'fontSize.size': '大小',
    'license.ofl11': 'SIL 開源字型授權 1.1版',
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
    'home.auto': '自动',
    'home.custom': '自定义',
    'home.shareImage': '分享为图片',
    'home.displayStyle.label': '效果',
    'home.displayStyle.static': '静态',
    'home.displayStyle.strobe': '闪烁',
    'home.displayStyle.pulse': '脉冲',
    'home.displayStyle.crossStrobe': '交叉闪烁',
    'home.displayStyle.crossPulse': '交叉脉冲',
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
    'home.showText': '显示',
    'home.exitHint': '注意：在显示画面上双击即可退出',
    'home.credits': '由 Max 制作。感谢 Lucide Icons 提供图标资源。',
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
    'fontCategory.english': '英文',
    'fontCategory.traditionalChinese': '中文',
    'fontSize.title': '字体大小',
    'fontSize.automatic': '自动',
    'fontSize.automaticNote':
      '有些字体和自动调整不一定合拍。如果显示效果不理想，请改用「自定义」。',
    'fontSize.custom': '自定义',
    'fontSize.customNote': '在自定义模式下，可在显示画面里上下滑动来调整大小。',
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

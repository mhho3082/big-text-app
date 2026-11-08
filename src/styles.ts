import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  homeScreen: {
    flex: 1,
  },
  homeStatusBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  homeStatusBarPadded: {
    paddingHorizontal: 24,
  },
  homeScrollContent: {
    flexGrow: 1,
    padding: 24,
    gap: 16,
  },
  homeMainContent: {
    gap: 16,
    flexGrow: 1,
    justifyContent: 'center',
  },
  flexOne: {
    flex: 1,
  },
  homeStatusBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 1,
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  historyList: {
    flexGrow: 1,
    padding: 16,
    gap: 12,
  },
  historyRow: {
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    borderRadius: 16,
    padding: 10,
    alignItems: 'flex-start',
  },
  historyCard: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    minWidth: 0,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 4,
    maxWidth: '60%',
    alignSelf: 'flex-start',
  },
  historyCardText: {
    fontSize: 16,
    lineHeight: 21,
    includeFontPadding: false,
  },
  historyCardPreview: {
    fontSize: 16,
    lineHeight: 21,
    includeFontPadding: false,
  },
  historyCardMeta: {
    fontSize: 12,
    lineHeight: 16,
  },
  historyActions: {
    flexDirection: 'row',
    gap: 6,
    flexShrink: 0,
    marginLeft: 'auto',
    alignItems: 'flex-start',
  },
  historyActionButton: {
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 58,
  },
  historyActionText: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  historyEmptyText: {
    fontSize: 14,
  },
  statusBarButton: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  statusBarButtonText: {
    fontSize: 14,
    lineHeight: 18,
    paddingHorizontal: 4,
    fontWeight: '700',
    includeFontPadding: false,
    textAlign: 'center',
  },
  homeTitle: {
    flexGrow: 1,
    fontSize: 22,
    lineHeight: 28,
    includeFontPadding: false,
    flexShrink: 1,
    minWidth: 0,
  },
  homeTitleMaoken: {
    fontWeight: '400',
  },
  homeThemeButton: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  homeThemeButtonText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    paddingHorizontal: 4,
    includeFontPadding: false,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  input: {
    minHeight: 160,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 12,
  },
  optionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  optionButtonPressed: {
    opacity: 0.8,
  },
  optionIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  optionIndicatorOn: {
    backgroundColor: '#2ecc71',
  },
  optionIndicatorOff: {
    backgroundColor: '#e74c3c',
  },
  optionButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  colorButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  colorSwatch: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  colorButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  fontFamilyButtonText: {
    flexShrink: 1,
    minWidth: 0,
  },
  fontSampleBubble: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontSampleText: {
    fontSize: 12,
    includeFontPadding: false,
  },
  button: {
    backgroundColor: '#6750a4',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  buttonHalf: {
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  exitHint: {
    fontSize: 12,
    marginTop: -6,
  },
  homeCredits: {
    fontSize: 12,
    textAlign: 'center',
    paddingBottom: 4,
    marginTop: 'auto',
  },
  outputScreen: { flex: 1 },
  outputHeadlessScreen: {
    position: 'absolute',
    left: -10000,
    top: 0,
    width: '100%',
    height: '100%',
  },
  outputScreenPressable: {
    flex: 1,
  },
  outputShareCanvas: {
    flex: 0,
  },
  outputFill: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outputCaptureLayer: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  outputHiddenMeasurementLayer: {
    opacity: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  outputText: {
    alignSelf: 'stretch',
    textAlign: 'left',
    overflow: 'visible',
    includeFontPadding: false,
  },
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  sheet: {
    borderRadius: 24,
    padding: 20,
    gap: 16,
    maxHeight: '85%',
  },
  sheetTall: {
    height: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalBody: {
    fontSize: 15,
    lineHeight: 21,
  },
  closeButton: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  closeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  picker: {
    gap: 16,
  },
  colorSwatches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    padding: 12,
    borderRadius: 18,
  },
  colorSwatchChip: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 0,
    marginBottom: 0,
    borderWidth: 1,
  },
  fontPickerBody: {
    flex: 1,
    minHeight: 0,
  },
  colorPickerBody: {
    flexShrink: 1,
  },
  fontTabView: {
    flex: 1,
  },
  fontTabScene: {
    paddingHorizontal: 8,
  },
  fontListContent: {
    gap: 12,
    paddingTop: 16,
    paddingBottom: 8,
  },
  fontChoiceColumnWrapper: {
    gap: 12,
  },
  fontTabBar: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
  },
  fontTab: {
    flex: 1,
  },
  fontTabLabel: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'none',
  },
  fontTabIndicator: {
    backgroundColor: '#6750a4',
    height: 3,
  },
  fontChoiceButton: {
    flex: 1,
    minHeight: 96,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 14,
    justifyContent: 'space-between',
  },
  fontChoiceButtonSelected: {
    borderColor: '#6750a4',
  },
  fontChoiceButtonPressed: {
    opacity: 0.8,
  },
  fontChoicePreview: {
    fontSize: 28,
    includeFontPadding: false,
    marginBottom: 4,
  },
  fontChoiceCredit: {
    fontSize: 11,
    lineHeight: 14,
  },
  preview: {
    height: 52,
    borderWidth: 2,
    borderRadius: 16,
  },
  panel: {
    height: 220,
    borderRadius: 18,
  },
  hueSlider: {
    height: 28,
    borderRadius: 999,
  },
  fontSizeModeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  fontSizeModeButton: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  fontSizeModeButtonSelected: {
    borderColor: '#6750a4',
  },
  fontSizeModeButtonPressed: {
    opacity: 0.8,
  },
  fontSizeModeButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  fontSizeSliderBlock: {
    gap: 12,
  },
  fontSizeValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fontSizeLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  fontSizeValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  fontSizeSlider: {
    width: '100%',
  },
  effectOptionList: {
    gap: 8,
  },
  effectOptionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  effectOptionButton: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  oddLastOption: {
    flexGrow: 0,
    flexBasis: '50%',
    maxWidth: '50%',
  },
  effectOptionButtonSelected: {
    borderColor: '#6750a4',
  },
  effectOptionButtonPressed: {
    opacity: 0.8,
  },
  effectOptionButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  shareOptionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  shareOptionButton: {
    flexGrow: 1,
    flexBasis: '48%',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  shareOptionButtonPressed: {
    opacity: 0.8,
  },
  shareOptionButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  colorTextInput: {
    borderWidth: 0,
  },
  colorDivider: {
    height: 1,
  },
});

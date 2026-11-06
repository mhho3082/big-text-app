import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '600',
  },
  input: {
    minHeight: 160,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333333',
    backgroundColor: '#1b1b1b',
    color: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  colorButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333333',
    backgroundColor: '#1b1b1b',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  colorSwatch: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#555555',
  },
  colorButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  fontSampleBubble: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2b2b2b',
  },
  fontSampleText: {
    color: '#ffffff',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#6750a4',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
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
    color: '#9a9a9a',
    fontSize: 12,
    marginTop: -6,
  },
  outputScreen: { flex: 1 },
  outputFill: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outputText: {
    textAlign: 'left',
    overflow: 'visible',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  sheet: {
    backgroundColor: '#111111',
    borderRadius: 24,
    padding: 20,
    gap: 16,
    height: '85%',
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    borderRadius: 16,
    backgroundColor: '#2b2b2b',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  picker: {
    gap: 16,
  },
  fontPickerBody: {
    flex: 1,
    minHeight: 0,
  },
  fontTabView: {
    flex: 1,
  },
  fontListContent: {
    gap: 12,
    paddingTop: 16,
    paddingBottom: 8,
  },
  fontChoiceRow: {
    gap: 12,
  },
  fontTabBar: {
    backgroundColor: '#111111',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#2b2b2b',
  },
  fontTab: {
    width: 'auto',
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
    borderColor: '#333333',
    backgroundColor: '#1b1b1b',
    paddingHorizontal: 12,
    paddingVertical: 14,
    justifyContent: 'space-between',
  },
  fontChoiceButtonSelected: {
    borderColor: '#6750a4',
    backgroundColor: '#221b33',
  },
  fontChoiceButtonPressed: {
    opacity: 0.8,
  },
  fontChoicePreview: {
    color: '#ffffff',
    fontSize: 28,
    includeFontPadding: false,
  },
  fontChoiceLabel: {
    color: '#cfcfcf',
    fontSize: 13,
    fontWeight: '600',
  },
  preview: {
    height: 52,
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
    borderColor: '#333333',
    backgroundColor: '#1b1b1b',
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  fontSizeModeButtonSelected: {
    borderColor: '#6750a4',
    backgroundColor: '#221b33',
  },
  fontSizeModeButtonPressed: {
    opacity: 0.8,
  },
  fontSizeModeButtonText: {
    color: '#ffffff',
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
    color: '#cfcfcf',
    fontSize: 14,
    fontWeight: '600',
  },
  fontSizeValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  fontSizeSlider: {
    width: '100%',
  },
  colorTextInput: {
    color: '#ffffff'
  },
});

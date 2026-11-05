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
  colorRow: {
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
  button: {
    alignSelf: 'flex-start',
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
  outputScreen: { flex: 1 },
  outputFill: {
    flex: 1,
    overflow: 'hidden',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outputText: {
    fontSize: 999,
    fontWeight: '700',
    textAlign: 'center',
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
  colorTextInput: {
    color: '#ffffff'
  },
});

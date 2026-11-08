import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { t } from '../i18n';
import { useAppStore } from '../state/useAppStore';
import { styles } from '../styles';
import { HomeTheme } from '../theme';
import { X } from 'lucide-react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onShareAsImageLandscape: () => void;
  onShareAsImagePortrait: () => void;
  onShareAsImageSquare: () => void;
  onShareAsText: () => void;
  theme: HomeTheme;
};

export function SharePickerModal({
  visible,
  onClose,
  onShareAsImageLandscape,
  onShareAsImagePortrait,
  onShareAsImageSquare,
  onShareAsText,
  theme,
}: Props) {
  const language = useAppStore(state => state.language);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      {visible ? (
        <Pressable style={[styles.backdrop, { backgroundColor: theme.modalBackdrop }]} onPress={onClose}>
          <Pressable style={[styles.sheet, { backgroundColor: theme.modalSheet }]} onPress={() => {}}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.modalText }]}>{t('home.share', undefined, language)}</Text>
              <Pressable onPress={onClose} aria-label={t('modal.close', undefined, language)}>
                <X color={theme.modalButton} />
              </Pressable>
            </View>
            <View style={styles.shareOptionRow}>
              <Pressable
                onPress={onShareAsImageLandscape}
                style={({ pressed }) => [
                  styles.shareOptionButton,
                  {
                    borderColor: theme.border,
                    backgroundColor: theme.surface,
                  },
                  pressed && styles.shareOptionButtonPressed,
                ]}
              >
                <Text style={[styles.shareOptionButtonText, { color: theme.modalText }]}> 
                  {t('home.shareImageLandscape', undefined, language)}
                </Text>
              </Pressable>
              <Pressable
                onPress={onShareAsImagePortrait}
                style={({ pressed }) => [
                  styles.shareOptionButton,
                  {
                    borderColor: theme.border,
                    backgroundColor: theme.surface,
                  },
                  pressed && styles.shareOptionButtonPressed,
                ]}
              >
                <Text style={[styles.shareOptionButtonText, { color: theme.modalText }]}> 
                  {t('home.shareImagePortrait', undefined, language)}
                </Text>
              </Pressable>
              <Pressable
                onPress={onShareAsImageSquare}
                style={({ pressed }) => [
                  styles.shareOptionButton,
                  {
                    borderColor: theme.border,
                    backgroundColor: theme.surface,
                  },
                  pressed && styles.shareOptionButtonPressed,
                ]}
              >
                <Text style={[styles.shareOptionButtonText, { color: theme.modalText }]}> 
                  {t('home.shareImageSquare', undefined, language)}
                </Text>
              </Pressable>
              <Pressable
                onPress={onShareAsText}
                style={({ pressed }) => [
                  styles.shareOptionButton,
                  {
                    borderColor: theme.border,
                    backgroundColor: theme.surface,
                  },
                  pressed && styles.shareOptionButtonPressed,
                ]}
              >
                <Text style={[styles.shareOptionButtonText, { color: theme.modalText }]}>
                  {t('home.shareText', undefined, language)}
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      ) : null}
    </Modal>
  );
}

import React from 'react';
import { Image, Modal, Pressable, Text, View } from 'react-native';
import { X } from 'lucide-react-native';
import { t } from '../i18n';
import { useAppStore } from '../state/useAppStore';
import { styles } from '../styles';
import { HomeTheme } from '../theme';

const PREVIEW_LABEL_KEYS = [
  'stickerPreview.landscape',
  'stickerPreview.portrait',
  'stickerPreview.square',
] as const;

type Props = {
  visible: boolean;
  imageUris: string[];
  onClose: () => void;
  theme: HomeTheme;
};

export function StickerPreviewModal({
  visible,
  imageUris,
  onClose,
  theme,
}: Props) {
  const language = useAppStore(state => state.language);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {visible ? (
        <Pressable
          style={[styles.backdrop, { backgroundColor: theme.modalBackdrop }]}
          onPress={onClose}
        >
          <Pressable
            style={[styles.sheet, { backgroundColor: theme.modalSheet }]}
            onPress={() => undefined}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.modalText }]}>
                {t('home.stickerPreview', undefined, language)}
              </Text>
              <Pressable
                onPress={onClose}
                aria-label={t('modal.close', undefined, language)}
              >
                <X color={theme.modalCloseIcon} strokeWidth={2.5} />
              </Pressable>
            </View>
            <View style={styles.stickerPreviewRow}>
              {imageUris.map((uri, index) => (
                <View key={`${uri}-${index}`} style={styles.stickerPreviewItem}>
                  <Text
                    style={[
                      styles.stickerPreviewLabel,
                      { color: theme.modalText },
                    ]}
                  >
                    {t(
                      PREVIEW_LABEL_KEYS[index] ?? PREVIEW_LABEL_KEYS[0],
                      undefined,
                      language,
                    )}
                  </Text>
                  <Image
                    source={{ uri }}
                    style={[
                      styles.stickerPreviewCard,
                      {
                        borderColor: theme.border,
                        backgroundColor: theme.surface,
                      },
                    ]}
                    resizeMode="cover"
                  />
                </View>
              ))}
            </View>
          </Pressable>
        </Pressable>
      ) : null}
    </Modal>
  );
}

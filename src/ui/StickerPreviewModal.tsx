import React from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
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

const STICKER_PREVIEW_COUNT = 3;

export function StickerPreviewModal({
  visible,
  imageUris,
  onClose,
  theme,
}: Props) {
  const language = useAppStore(state => state.language);
  const [packName, setPackName] = React.useState('');
  const [packAuthor, setPackAuthor] = React.useState('');
  const isComplete = imageUris.length === STICKER_PREVIEW_COUNT;
  const canConfirm =
    isComplete && packName.trim().length > 0 && packAuthor.trim().length > 0;

  React.useEffect(() => {
    if (!visible) {
      setPackName('');
      setPackAuthor('');
    }
  }, [visible]);

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
              {Array.from({ length: STICKER_PREVIEW_COUNT }, (_, index) => {
                const uri = imageUris[index];

                return (
                  <View
                    key={uri ?? `sticker-preview-placeholder-${index}`}
                    style={styles.stickerPreviewItem}
                  >
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
                    <View
                      style={[
                        styles.stickerPreviewCard,
                        {
                          borderColor: theme.border,
                          backgroundColor: theme.surface,
                        },
                      ]}
                    >
                      {uri ? (
                        <Image
                          source={{ uri }}
                          style={styles.stickerPreviewImage}
                          resizeMode="contain"
                        />
                      ) : (
                        <View style={styles.stickerPreviewLoading}>
                          <ActivityIndicator color={theme.modalText} />
                        </View>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
            <View style={styles.stickerPreviewInputs}>
              <TextInput
                placeholder={t('stickerPreview.packName', undefined, language)}
                placeholderTextColor={theme.placeholderText}
                value={packName}
                onChangeText={setPackName}
                style={[
                  styles.input,
                  styles.widgetNameInput,
                  {
                    color: theme.inputText,
                    backgroundColor: theme.inputBackground,
                    borderColor: theme.inputBorder,
                  },
                ]}
              />
              <TextInput
                placeholder={t(
                  'stickerPreview.packAuthor',
                  undefined,
                  language,
                )}
                placeholderTextColor={theme.placeholderText}
                value={packAuthor}
                onChangeText={setPackAuthor}
                style={[
                  styles.input,
                  styles.widgetNameInput,
                  {
                    color: theme.inputText,
                    backgroundColor: theme.inputBackground,
                    borderColor: theme.inputBorder,
                  },
                ]}
              />
            </View>
            <View style={styles.stickerPreviewActions}>
              <Pressable
                style={[
                  styles.button,
                  styles.stickerPreviewActionButton,
                  { backgroundColor: theme.surface },
                ]}
                onPress={onClose}
              >
                <Text style={[styles.buttonText, { color: theme.modalText }]}>
                  {t('modal.cancel', undefined, language)}
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.button,
                  styles.stickerPreviewActionButton,
                  !canConfirm ? styles.buttonDisabled : null,
                ]}
                onPress={onClose}
                disabled={!canConfirm}
              >
                <Text style={styles.buttonText}>
                  {t('home.confirm', undefined, language)}
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      ) : null}
    </Modal>
  );
}

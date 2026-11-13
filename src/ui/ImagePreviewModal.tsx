import React from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  Text,
  View,
} from 'react-native';
import { X } from 'lucide-react-native';
import { t } from '../i18n';
import { useAppStore } from '../state/useAppStore';
import { styles } from '../styles';
import { HomeTheme } from '../theme';

const PREVIEW_CHECKERBOARD = require('../../assets/sticker-checkerboard-512.png');

type Props = {
  visible: boolean;
  titleKey: string;
  imageUris: readonly (string | undefined)[];
  imageCount?: number;
  labelKeys?: readonly string[];
  onClose: () => void;
  onConfirm: () => void;
  confirmLabelKey?: string;
  onSave?: () => void;
  saveLabelKey?: string;
  theme: HomeTheme;
};

export function ImagePreviewModal({
  visible,
  titleKey,
  imageUris,
  imageCount = imageUris.length,
  labelKeys,
  onClose,
  onConfirm,
  confirmLabelKey = 'home.confirm',
  onSave,
  saveLabelKey = 'home.save',
  theme,
}: Props) {
  const language = useAppStore(state => state.language);
  const imagesReady =
    imageUris.length > 0 && imageUris.every(uri => Boolean(uri));
  const canConfirm = imagesReady;

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
                {t(titleKey, undefined, language)}
              </Text>
              <Pressable
                onPress={onClose}
                aria-label={t('modal.close', undefined, language)}
              >
                <X color={theme.modalCloseIcon} strokeWidth={2.5} />
              </Pressable>
            </View>
            <View style={styles.imagePreviewRow}>
              {Array.from({ length: imageCount }, (_, index) => {
                const uri = imageUris[index];
                const labelKey = labelKeys?.[index];

                return (
                  <View
                    key={`image-preview-${index}`}
                    style={styles.imagePreviewItem}
                  >
                    {labelKey ? (
                      <Text
                        style={[
                          styles.imagePreviewLabel,
                          { color: theme.modalText },
                        ]}
                      >
                        {t(labelKey, undefined, language)}
                      </Text>
                    ) : null}
                    <View
                      style={[
                        styles.imagePreviewCard,
                        {
                          borderColor: theme.border,
                          backgroundColor: theme.surface,
                        },
                      ]}
                    >
                      <View style={styles.imagePreviewBackground}>
                        <Image
                          source={PREVIEW_CHECKERBOARD}
                          style={styles.imagePreviewBackgroundImage}
                          resizeMode="repeat"
                        />
                        {uri ? (
                          <Image
                            source={{ uri }}
                            style={styles.imagePreviewImage}
                            resizeMode="contain"
                          />
                        ) : (
                          <View style={styles.imagePreviewLoading}>
                            <ActivityIndicator color={theme.modalText} />
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
            <View style={styles.imagePreviewActions}>
              <Pressable
                style={[
                  styles.button,
                  styles.imagePreviewActionButton,
                  {
                    backgroundColor: theme.surface,
                    borderColor: theme.inputBorder,
                  },
                ]}
                onPress={onClose}
              >
                <Text style={[styles.buttonText, { color: theme.modalText }]}>
                  {t('modal.cancel', undefined, language)}
                </Text>
              </Pressable>
              {onSave ? (
                <Pressable
                  style={[
                    styles.button,
                    styles.imagePreviewActionButton,
                    !canConfirm ? styles.buttonDisabled : null,
                  ]}
                  onPress={onSave}
                  disabled={!canConfirm}
                >
                  <Text style={styles.buttonText}>
                    {t(saveLabelKey, undefined, language)}
                  </Text>
                </Pressable>
              ) : null}
              <Pressable
                style={[
                  styles.button,
                  styles.imagePreviewActionButton,
                  !canConfirm ? styles.buttonDisabled : null,
                ]}
                onPress={onConfirm}
                disabled={!canConfirm}
              >
                <Text style={styles.buttonText}>
                  {t(confirmLabelKey, undefined, language)}
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      ) : null}
    </Modal>
  );
}

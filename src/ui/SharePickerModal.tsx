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
  onSetAsWallpaper: () => void;
  onShareAsText: () => void;
  onShareAsQr: () => void;
  theme: HomeTheme;
};

export function SharePickerModal({
  visible,
  onClose,
  onShareAsImageLandscape,
  onShareAsImagePortrait,
  onShareAsImageSquare,
  onSetAsWallpaper,
  onShareAsText,
  onShareAsQr,
  theme,
}: Props) {
  const language = useAppStore(state => state.language);
  const options = React.useMemo(
    () => [
      {
        key: 'landscape',
        onPress: onShareAsImageLandscape,
        label: t('home.shareImageLandscape', undefined, language),
      },
      {
        key: 'portrait',
        onPress: onShareAsImagePortrait,
        label: t('home.shareImagePortrait', undefined, language),
      },
      {
        key: 'square',
        onPress: onShareAsImageSquare,
        label: t('home.shareImageSquare', undefined, language),
      },
      {
        key: 'wallpaper',
        onPress: onSetAsWallpaper,
        label: t('home.setAsWallpaper', undefined, language),
      },
      {
        key: 'text',
        onPress: onShareAsText,
        label: t('home.shareText', undefined, language),
      },
      {
        key: 'qr',
        onPress: onShareAsQr,
        label: t('home.shareQr', undefined, language),
      },
    ],
    [
      language,
      onSetAsWallpaper,
      onShareAsImageLandscape,
      onShareAsImagePortrait,
      onShareAsImageSquare,
      onShareAsQr,
      onShareAsText,
    ],
  );
  const rows = React.useMemo(() => {
    const result: Array<(typeof options)[number][]> = [];

    for (let index = 0; index < options.length; index += 2) {
      result.push(options.slice(index, index + 2));
    }

    return result;
  }, [options]);

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
            onPress={() => {}}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.modalText }]}>
                {t('home.share', undefined, language)}
              </Text>
              <Pressable
                onPress={onClose}
                aria-label={t('modal.close', undefined, language)}
              >
                <X color={theme.modalCloseIcon} strokeWidth={2.5} />
              </Pressable>
            </View>
            <View style={styles.shareOptionList}>
              {rows.map((row, rowIndex) => (
                <View
                  key={`share-row-${rowIndex}`}
                  style={styles.shareOptionRow}
                >
                  {row.map(option => {
                    const isOddLastOption =
                      rows.length === rowIndex + 1 && row.length === 1;

                    return (
                      <Pressable
                        key={option.key}
                        onPress={option.onPress}
                        style={({ pressed }) => [
                          styles.shareOptionButton,
                          isOddLastOption && styles.shareOddLastOption,
                          {
                            borderColor: theme.border,
                            backgroundColor: theme.surface,
                          },
                          pressed && styles.shareOptionButtonPressed,
                        ]}
                      >
                        <Text
                          style={[
                            styles.shareOptionButtonText,
                            { color: theme.modalText },
                          ]}
                        >
                          {option.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              ))}
            </View>
            <Text style={[styles.modalBody, { color: theme.modalMutedText }]}>
              {t('home.shareNote', undefined, language)}
            </Text>
          </Pressable>
        </Pressable>
      ) : null}
    </Modal>
  );
}

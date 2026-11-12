import React from 'react';
import { Modal, Platform, Pressable, Text, View } from 'react-native';
import { t } from '../i18n';
import type {
  OutputHorizontalAlignment,
  OutputScreenOrientation,
  OutputVerticalAlignment,
} from '../types/output';
import { useAppStore } from '../state/useAppStore';
import { styles } from '../styles';
import { HomeTheme } from '../theme';
import {
  ArrowDown,
  ArrowDownLeft,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpLeft,
  ArrowUpRight,
  LucideProps,
  Margin,
  X,
} from 'lucide-react-native';

type Props = {
  visible: boolean;
  horizontalAlignment: OutputHorizontalAlignment;
  verticalAlignment: OutputVerticalAlignment;
  screenOrientation: OutputScreenOrientation;
  onClose: () => void;
  onHorizontalAlignmentChange: (alignment: OutputHorizontalAlignment) => void;
  onVerticalAlignmentChange: (alignment: OutputVerticalAlignment) => void;
  onScreenOrientationChange: (orientation: OutputScreenOrientation) => void;
  theme: HomeTheme;
};

type AlignmentOption = {
  horizontal: OutputHorizontalAlignment;
  vertical: OutputVerticalAlignment;
  labelKey: string;
};

type OrientationOption = {
  orientation: OutputScreenOrientation;
  labelKey: string;
};

type OrientationRow = OrientationOption[];

const ALIGNMENT_ROWS: AlignmentOption[][] = [
  [
    { horizontal: 'left', vertical: 'top', labelKey: 'home.alignment.topLeft' },
    {
      horizontal: 'center',
      vertical: 'top',
      labelKey: 'home.alignment.topCenter',
    },
    {
      horizontal: 'right',
      vertical: 'top',
      labelKey: 'home.alignment.topRight',
    },
  ],
  [
    {
      horizontal: 'left',
      vertical: 'center',
      labelKey: 'home.alignment.centerLeft',
    },
    {
      horizontal: 'center',
      vertical: 'center',
      labelKey: 'home.alignment.center',
    },
    {
      horizontal: 'right',
      vertical: 'center',
      labelKey: 'home.alignment.centerRight',
    },
  ],
  [
    {
      horizontal: 'left',
      vertical: 'bottom',
      labelKey: 'home.alignment.bottomLeft',
    },
    {
      horizontal: 'center',
      vertical: 'bottom',
      labelKey: 'home.alignment.bottomCenter',
    },
    {
      horizontal: 'right',
      vertical: 'bottom',
      labelKey: 'home.alignment.bottomRight',
    },
  ],
];

const ORIENTATION_OPTIONS: OrientationOption[] = [
  { orientation: 'automatic', labelKey: 'home.orientation.automatic' },
  { orientation: 'portrait', labelKey: 'home.orientation.portrait' },
  {
    orientation: 'landscapeLeft',
    labelKey: 'home.orientation.landscapeLeft',
  },
  {
    orientation: 'landscapeRight',
    labelKey: 'home.orientation.landscapeRight',
  },
  { orientation: 'upsideDown', labelKey: 'home.orientation.upsideDown' },
];

const ORIENTATION_COLUMNS = 2;

export function AlignmentPickerIcon({
  horizontal,
  vertical,
  ...props
}: {
  horizontal: OutputHorizontalAlignment;
  vertical: OutputVerticalAlignment;
} & LucideProps) {
  if (horizontal === 'left' && vertical === 'top') {
    return <ArrowUpLeft {...props} />;
  } else if (horizontal === 'center' && vertical === 'top') {
    return <ArrowUp {...props} />;
  } else if (horizontal === 'right' && vertical === 'top') {
    return <ArrowUpRight {...props} />;
  } else if (horizontal === 'left' && vertical === 'center') {
    return <ArrowLeft {...props} />;
  } else if (horizontal === 'center' && vertical === 'center') {
    return <Margin {...props} />;
  } else if (horizontal === 'right' && vertical === 'center') {
    return <ArrowRight {...props} />;
  } else if (horizontal === 'left' && vertical === 'bottom') {
    return <ArrowDownLeft {...props} />;
  } else if (horizontal === 'center' && vertical === 'bottom') {
    return <ArrowDown {...props} />;
  } else if (horizontal === 'right' && vertical === 'bottom') {
    return <ArrowDownRight {...props} />;
  }
}

export function getAlignmentLabelKey(
  horizontal: OutputHorizontalAlignment,
  vertical: OutputVerticalAlignment,
) {
  const option = ALIGNMENT_ROWS.flat().find(
    row => row.horizontal === horizontal && row.vertical === vertical,
  );

  return option?.labelKey ?? 'home.alignment.center';
}

export function AlignmentPickerModal({
  visible,
  horizontalAlignment,
  verticalAlignment,
  screenOrientation,
  onClose,
  onHorizontalAlignmentChange,
  onVerticalAlignmentChange,
  onScreenOrientationChange,
  theme,
}: Props) {
  const language = useAppStore(state => state.language);
  const isIos = Platform.OS === 'ios';
  const orientationRows = React.useMemo(() => {
    const rows: OrientationRow[] = [];

    for (
      let index = 0;
      index < ORIENTATION_OPTIONS.length;
      index += ORIENTATION_COLUMNS
    ) {
      rows.push(ORIENTATION_OPTIONS.slice(index, index + ORIENTATION_COLUMNS));
    }

    return rows;
  }, []);

  const renderOption = (
    horizontal: OutputHorizontalAlignment,
    vertical: OutputVerticalAlignment,
    labelKey: string,
    selected: boolean,
    onPress: () => void,
  ) => (
    <Pressable
      key={`${horizontal}-${vertical}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.animationOptionButton,
        {
          borderColor: theme.border,
          backgroundColor: theme.surface,
        },
        selected && styles.animationOptionButtonSelected,
        selected && {
          borderColor: theme.modalSelectedCardBorder,
          backgroundColor: theme.modalSelectedCard,
        },
        pressed && styles.animationOptionButtonPressed,
      ]}
      aria-label={t(labelKey, undefined, language)}
    >
      <AlignmentPickerIcon
        horizontal={horizontal}
        vertical={vertical}
        color={theme.modalText}
      />
    </Pressable>
  );

  const renderOrientationOption = (
    orientation: OutputScreenOrientation,
    labelKey: string,
    selected: boolean,
    disabled: boolean,
    oddLastOption: boolean,
    onPress: () => void,
  ) => (
    <Pressable
      key={orientation}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.animationOptionButton,
        oddLastOption && styles.oddLastOption,
        {
          borderColor: theme.border,
          backgroundColor: theme.surface,
        },
        selected && styles.animationOptionButtonSelected,
        selected && {
          borderColor: theme.modalSelectedCardBorder,
          backgroundColor: theme.modalSelectedCard,
        },
        pressed && !disabled && styles.animationOptionButtonPressed,
        disabled && styles.buttonDisabled,
      ]}
      aria-label={t(labelKey, undefined, language)}
      aria-disabled={disabled}
    >
      <Text
        style={[styles.animationOptionButtonText, { color: theme.modalText }]}
      >
        {t(labelKey, undefined, language)}
      </Text>
    </Pressable>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {visible ? (
        <View
          style={[styles.backdrop, { backgroundColor: theme.modalBackdrop }]}
        >
          <View style={[styles.sheet, { backgroundColor: theme.modalSheet }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.modalText }]}>
                {t('home.alignment.label', undefined, language)}
              </Text>
              <Pressable
                onPress={onClose}
                aria-label={t('modal.close', undefined, language)}
              >
                <X color={theme.modalCloseIcon} strokeWidth={2.5} />
              </Pressable>
            </View>
            <View style={styles.animationOptionList}>
              {ALIGNMENT_ROWS.map((row, rowIndex) => (
                <View
                  key={`alignment-row-${rowIndex}`}
                  style={styles.animationOptionRow}
                >
                  {row.map(option =>
                    renderOption(
                      option.horizontal,
                      option.vertical,
                      option.labelKey,
                      option.horizontal === horizontalAlignment &&
                        option.vertical === verticalAlignment,
                      () => {
                        onHorizontalAlignmentChange(option.horizontal);
                        onVerticalAlignmentChange(option.vertical);
                      },
                    ),
                  )}
                </View>
              ))}
            </View>
            <View
              style={[
                styles.colorDivider,
                styles.colorDividerSpacing,
                { backgroundColor: theme.border },
              ]}
            />
            <View style={styles.animationOptionList}>
              {orientationRows.map((row, rowIndex) => (
                <View
                  key={`orientation-row-${rowIndex}`}
                  style={styles.animationOptionRow}
                >
                  {row.map(option => {
                    const disabled =
                      isIos && option.orientation === 'upsideDown';
                    const isOddLastOption =
                      rowIndex === orientationRows.length - 1 &&
                      row.length === 1;

                    return renderOrientationOption(
                      option.orientation,
                      option.labelKey,
                      option.orientation === screenOrientation,
                      disabled,
                      isOddLastOption,
                      () => onScreenOrientationChange(option.orientation),
                    );
                  })}
                </View>
              ))}
            </View>
          </View>
        </View>
      ) : null}
    </Modal>
  );
}

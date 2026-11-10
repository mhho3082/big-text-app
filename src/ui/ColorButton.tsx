import React from 'react';
import { Pressable, Text as RNText, View } from 'react-native';
import { styles } from '../styles';
import { HomeTheme } from '../theme';

type Props = {
  label: string;
  color: string;
  onPress: () => void;
  theme: HomeTheme;
};

export function ColorButton({ label, color, onPress, theme }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.colorButton,
        {
          borderColor: theme.buttonBorder,
          backgroundColor: theme.buttonSurface,
        },
      ]}
    >
      <View
        style={[
          styles.colorSwatch,
          {
            borderColor: theme.swatchBorder,
            backgroundColor: color,
          },
        ]}
      />
      <RNText style={[styles.colorButtonText, { color: theme.buttonText }]}>
        {label}
      </RNText>
    </Pressable>
  );
}

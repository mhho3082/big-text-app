import React from 'react';
import { Pressable, Text as RNText, View } from 'react-native';
import { styles } from '../styles';

type Props = {
  label: string;
  color: string;
  onPress: () => void;
};

export function ColorButton({ label, color, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.colorButton}>
      <View style={[styles.colorSwatch, { backgroundColor: color }]} />
      <RNText style={styles.colorButtonText}>{label}</RNText>
    </Pressable>
  );
}

import React from 'react';
import { FlatList, Modal, Pressable, Text, useWindowDimensions, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import { t } from '../i18n';
import { getFontCategories, getFontOptionsByCategory, getFontFamily } from '../fonts';
import { useAppStore } from '../state/useAppStore';
import { styles } from '../styles';
import { HomeTheme } from '../theme';

type Props = {
  visible: boolean;
  selectedFontFamily: string;
  onClose: () => void;
  onFontChange: (family: string) => void;
  theme: HomeTheme;
};

export function FontPickerModal({ visible, selectedFontFamily, onClose, onFontChange, theme }: Props) {
  const language = useAppStore(state => state.language);
  const layout = useWindowDimensions();
  const [tabIndex, setTabIndex] = React.useState(0);
  const fontColumns = React.useMemo(() => {
    const usableWidth = Math.max(layout.width - 64, 320);
    return Math.max(2, Math.floor(usableWidth / 180));
  }, [layout.width]);

  const fontCategories = React.useMemo(() => getFontCategories(), []);

  const routes = React.useMemo(
    () =>
      fontCategories.map(category => ({
        key: category,
        title: t(`fontCategory.${category}`, undefined, language),
      })),
    [fontCategories, language],
  );

  const fontOptionsByCategory = React.useMemo(
    () =>
      Object.fromEntries(fontCategories.map(category => [category, getFontOptionsByCategory(category)])) as Record<
        string,
        ReturnType<typeof getFontOptionsByCategory>
      >,
    [fontCategories],
  );

  const renderFontList = (options: ReturnType<typeof getFontOptionsByCategory>) => (
    <FlatList
      key={`font-grid-${fontColumns}`}
      contentContainerStyle={styles.fontListContent}
      data={options}
      numColumns={fontColumns}
      columnWrapperStyle={styles.fontChoiceColumnWrapper}
      keyExtractor={option => option.displayName}
      renderItem={({ item: option }) => {
        const family = getFontFamily(option);
        const selected = family === selectedFontFamily;

        return (
          <Pressable
            onPress={() => onFontChange(family)}
            style={({ pressed }) => [
              styles.fontChoiceButton,
              {
                borderColor: theme.border,
                backgroundColor: theme.surface,
              },
              selected && styles.fontChoiceButtonSelected,
              selected && {
                borderColor: theme.modalSelectedCardBorder,
                backgroundColor: theme.modalSelectedCard,
              },
              pressed && styles.fontChoiceButtonPressed,
            ]}
          >
            <Text
              style={[
                styles.fontChoicePreview,
                {
                  fontFamily: family,
                  fontWeight: option.fontWeight,
                  color: theme.modalText,
                },
              ]}
            >
              {option.displayName}
            </Text>
            {option.credit ? (
              <Text style={[styles.fontChoiceCredit, { color: theme.modalMutedText }]}>{option.credit}</Text>
            ) : null}
            <Text style={[styles.fontChoiceCredit, { color: theme.modalMutedText }]}>
              {t(option.licenseKey, undefined, language)}
            </Text>
          </Pressable>
        );
      }}
      showsVerticalScrollIndicator={false}
    />
  );

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      {visible ? (
        <View style={[styles.backdrop, { backgroundColor: theme.modalBackdrop }]}>
          <View style={[styles.sheet, { backgroundColor: theme.modalSheet }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.modalText }]}>{t('fontPicker.title', undefined, language)}</Text>
              <Pressable onPress={onClose} style={[styles.closeButton, { backgroundColor: theme.modalButton }]}>
                <Text style={[styles.closeButtonText, { color: theme.modalButtonText }]}>{t('modal.close', undefined, language)}</Text>
              </Pressable>
            </View>
            <View style={styles.fontPickerBody}>
              <TabView
                style={styles.fontTabView}
                navigationState={{ index: tabIndex, routes }}
                renderScene={({ route }) => {
                  return renderFontList(fontOptionsByCategory[route.key] ?? []);
                }}
                onIndexChange={setTabIndex}
                initialLayout={{ width: layout.width - 40 }}
                renderTabBar={props => (
                  <TabBar
                    {...props}
                    indicatorStyle={[styles.fontTabIndicator, { backgroundColor: theme.modalSelectedCardBorder }]}
                    style={[
                      styles.fontTabBar,
                      {
                        backgroundColor: theme.modalTabBar,
                        borderBottomColor: theme.border,
                      },
                    ]}
                    tabStyle={styles.fontTab}
                    activeColor={theme.modalTabActive}
                    inactiveColor={theme.modalTabInactive}
                  />
                )}
              />
            </View>
          </View>
        </View>
      ) : null}
    </Modal>
  );
}

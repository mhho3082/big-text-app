import React from 'react';
import {FlatList, Modal, Pressable, Text, useWindowDimensions, View} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';
import {
  getFontCategories,
  getFontCategory,
  getFontOptionsByCategory,
  getFontFamily,
} from '../fonts';
import {styles} from '../styles';

type Props = {
  visible: boolean;
  selectedFontFamily: string;
  onClose: () => void;
  onFontChange: (family: string) => void;
};

export function FontPickerModal({
  visible,
  selectedFontFamily,
  onClose,
  onFontChange,
}: Props) {
  const layout = useWindowDimensions();
  const [tabIndex, setTabIndex] = React.useState(0);
  const fontColumns = React.useMemo(() => {
    const usableWidth = Math.max(layout.width - 64, 320);
    return Math.max(2, Math.floor(usableWidth / 180));
  }, [layout.width]);

  const fontCategories = React.useMemo(() => getFontCategories(), []);

  React.useEffect(() => {
    if (visible) {
      const category = getFontCategory(selectedFontFamily);
      const index = fontCategories.indexOf(category ?? fontCategories[0]);
      setTabIndex(index >= 0 ? index : 0);
    }
  }, [fontCategories, selectedFontFamily, visible]);

  const routes = React.useMemo(
    () =>
      fontCategories.map(category => ({
        key: category,
        title: category.charAt(0).toUpperCase() + category.slice(1),
      })),
    [fontCategories],
  );

  const fontOptionsByCategory = React.useMemo(
    () =>
      Object.fromEntries(
        fontCategories.map(category => [category, getFontOptionsByCategory(category)]),
      ) as Record<string, ReturnType<typeof getFontOptionsByCategory>>,
    [fontCategories],
  );

  const renderFontList = (options: ReturnType<typeof getFontOptionsByCategory>) => (
    <FlatList
      key={`font-grid-${fontColumns}`}
      contentContainerStyle={styles.fontListContent}
      data={options}
      numColumns={fontColumns}
      columnWrapperStyle={{gap: 12}}
      keyExtractor={option => option.displayName}
      renderItem={({item: option}) => {
        const family = getFontFamily(option);
        const selected = family === selectedFontFamily;

        return (
          <Pressable
            onPress={() => onFontChange(family)}
            style={({pressed}) => [
              styles.fontChoiceButton,
              selected && styles.fontChoiceButtonSelected,
              pressed && styles.fontChoiceButtonPressed,
            ]}
          >
            <Text
              style={[
                styles.fontChoicePreview,
                {
                  fontFamily: family,
                  fontWeight: option.fontWeight,
                },
              ]}
            >
              {option.sample}
            </Text>
            <Text style={styles.fontChoiceLabel}>{option.displayName}</Text>
          </Pressable>
        );
      }}
      showsVerticalScrollIndicator={false}
    />
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {visible ? (
        <View style={styles.backdrop}>
          <View style={styles.sheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Output font</Text>
              <Pressable onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
            <View style={styles.fontPickerBody}>
              <TabView
                style={styles.fontTabView}
                navigationState={{index: tabIndex, routes}}
                renderScene={({route}) => {
                  return renderFontList(fontOptionsByCategory[route.key] ?? []);
                }}
                onIndexChange={setTabIndex}
                initialLayout={{width: layout.width - 40}}
                renderTabBar={props => (
                  <TabBar
                    {...props}
                    indicatorStyle={styles.fontTabIndicator}
                    style={styles.fontTabBar}
                    tabStyle={styles.fontTab}
                    activeColor="#ffffff"
                    inactiveColor="#a7a7a7"
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

import React from 'react';
import { BackHandler, Modal, Pressable, StatusBar, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { deleteDisplayHistoryEntry, loadDisplayHistory, resetDatabase } from '../db/appOptions';
import { t } from '../i18n';
import { useAppStore } from '../state/useAppStore';
import { getHomeTheme } from '../theme';
import { styles } from '../styles';

type Props = {
  insets: { top: number; right: number; bottom: number; left: number };
};

export function HistoryScreen({ insets }: Props) {
  const homeThemeName = useAppStore(state => state.homeTheme);
  const language = useAppStore(state => state.language);
  const goHome = useAppStore(state => state.goHome);
  const showHistoryEntry = useAppStore(state => state.showHistoryEntry);
  const applyHistoryEntry = useAppStore(state => state.applyHistoryEntry);
  const [entries, setEntries] = React.useState([] as Awaited<ReturnType<typeof loadDisplayHistory>>);
  const [resetModalVisible, setResetModalVisible] = React.useState(false);
  const theme = getHomeTheme(homeThemeName);
  const statusBarStyle = theme.name === 'dark' ? 'light-content' : 'dark-content';

  const translate = (key: string, params?: Record<string, string | number>) => t(key, params, language);

  const refreshHistory = React.useCallback(async () => {
    const nextEntries = await loadDisplayHistory();
    setEntries(nextEntries);
  }, []);

  const handleDeleteEntry = React.useCallback(
    async (id: number) => {
      await deleteDisplayHistoryEntry(id);
      await refreshHistory();
    },
    [refreshHistory],
  );

  const handleResetDatabase = React.useCallback(async () => {
    setResetModalVisible(false);
    await resetDatabase();
    await refreshHistory();
  }, [refreshHistory]);

  React.useEffect(() => {
    let active = true;

    void (async () => {
      const nextEntries = await loadDisplayHistory();

      if (active) {
        setEntries(nextEntries);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  React.useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (resetModalVisible) {
        setResetModalVisible(false);
        return true;
      }

      goHome();
      return true;
    });

    return () => subscription.remove();
  }, [goHome, resetModalVisible]);

  return (
    <View
      style={[
        styles.homeScreen,
        { backgroundColor: theme.screenBackground },
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <View
        style={[
          styles.homeStatusBar,
          { backgroundColor: theme.screenBackground, borderBottomColor: theme.border },
        ]}
      >
        <Text style={[styles.homeTitle, { color: theme.titleText }]}>{translate('home.history')}</Text>
        <View style={styles.homeStatusBarActions}>
          <Pressable
            onPress={() => setResetModalVisible(true)}
            style={[styles.statusBarButton, { backgroundColor: theme.buttonChip }]}
          >
            <Text style={[styles.statusBarButtonText, { color: theme.buttonChipText }]}>
              {translate('history.reset')}
            </Text>
          </Pressable>
          <Pressable
            onPress={goHome}
            style={[styles.homeThemeButton, { backgroundColor: theme.buttonChip }]}
          >
            <Text style={[styles.homeThemeButtonText, { color: theme.buttonChipText }]}> 
              {translate('history.close')}
            </Text>
          </Pressable>
        </View>
      </View>
      <ScrollView contentContainerStyle={[styles.historyList, { padding: 16, gap: 12 }]}> 
        {entries.length === 0 ? (
          <Text style={[styles.historyEmptyText, { color: theme.mutedText }]}>{translate('history.empty')}</Text>
        ) : null}
        {entries.map(entry => {
          const previewText = entry.options.text.length > 40 ? `${entry.options.text.slice(0, 40).trimEnd()}…` : entry.options.text;

          return (
            <View
              key={entry.id}
              style={[
                styles.historyRow,
                {
                  borderColor: theme.historyCardBorder,
                },
              ]}
            >
              <View
                style={[
                  styles.historyCard,
                  {
                    backgroundColor: entry.options.backgroundColor,
                    borderColor: theme.historyCardBorder,
                  },
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    styles.historyCardPreview,
                    {
                      color: entry.options.foregroundColor,
                      fontFamily: entry.options.outputFontFamily,
                    },
                  ]}
                >
                  {previewText || ' '}
                </Text>
              </View>
              <View style={styles.historyActions}>
                <Pressable
                  onPress={() => applyHistoryEntry(entry.options)}
                  style={[
                    styles.historyActionButton,
                    { backgroundColor: theme.historyActionBackground },
                  ]}
                >
                  <Text style={[styles.historyActionText, { color: theme.historyActionText }]}>
                    {translate('history.apply')}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => showHistoryEntry(entry.options)}
                  style={[
                    styles.historyActionButton,
                    { backgroundColor: theme.historyActionBackground },
                  ]}
                >
                  <Text style={[styles.historyActionText, { color: theme.historyActionText }]}>
                    {translate('history.show')}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => void handleDeleteEntry(entry.id)}
                  style={[
                    styles.historyActionButton,
                    { backgroundColor: theme.historyActionBackground },
                  ]}
                >
                  <Text style={[styles.historyActionText, { color: theme.historyActionText }]}>
                    {translate('history.delete')}
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <StatusBar barStyle={statusBarStyle} />
      <Modal transparent visible={resetModalVisible} animationType="fade" onRequestClose={() => setResetModalVisible(false)}>
        <View style={styles.backdrop}>
          <Pressable style={styles.backdrop} onPress={() => setResetModalVisible(false)}>
            <View style={[styles.sheet, { backgroundColor: theme.modalSheet }]}> 
              <Text style={[styles.modalTitle, { color: theme.modalText }]}>{translate('history.resetTitle')}</Text>
              <Text style={[styles.modalBody, { color: theme.modalMutedText }]}>{translate('history.resetBody')}</Text>
              <View style={styles.buttonRow}>
                <Pressable
                  onPress={() => setResetModalVisible(false)}
                  style={[styles.button, { backgroundColor: theme.buttonSurface, flex: 1 }]}
                >
                  <Text style={[styles.buttonText, { color: theme.buttonText }]}>
                    {translate('history.resetCancel')}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => void handleResetDatabase()}
                  style={[styles.button, { backgroundColor: theme.buttonChip, flex: 1 }]}
                >
                  <Text style={[styles.buttonText, { color: theme.buttonChipText }]}>
                    {translate('history.resetConfirm')}
                  </Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

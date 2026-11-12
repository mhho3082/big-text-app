import React from 'react';
import {
  BackHandler,
  Modal,
  Pressable,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { maokenSansFontFamily } from '../fonts';
import { t } from '../i18n';
import { useAppStore } from '../state/useAppStore';
import { getHomeTheme } from '../theme';
import { styles } from '../styles';
import { TrashOff, X } from 'lucide-react-native';
import {
  type HistoryEntry,
  useHistoryEntries,
} from '../hooks/useHistoryEntries';

type Props = {
  insets: { top: number; right: number; bottom: number; left: number };
  onClose: () => void;
  onShowEntry: (options: HistoryEntry['options']) => void;
  onApplyEntry: (options: HistoryEntry['options']) => void;
};

export function HistoryScreen({
  insets,
  onClose,
  onShowEntry,
  onApplyEntry,
}: Props) {
  const homeThemeName = useAppStore(state => state.homeTheme);
  const language = useAppStore(state => state.language);
  const [resetModalVisible, setResetModalVisible] = React.useState(false);
  const { deleteEntry, entries, resetHistory } = useHistoryEntries();
  const theme = getHomeTheme(homeThemeName);
  const statusBarStyle =
    theme.name === 'dark' ? 'light-content' : 'dark-content';

  const translate = (key: string, params?: Record<string, string | number>) =>
    t(key, params, language);

  const handleResetDatabase = React.useCallback(async () => {
    setResetModalVisible(false);
    await resetHistory();
  }, [resetHistory]);

  React.useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (resetModalVisible) {
          setResetModalVisible(false);
          return true;
        }

        onClose();
        return true;
      },
    );

    return () => subscription.remove();
  }, [onClose, resetModalVisible]);

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
          {
            backgroundColor: theme.screenBackground,
            borderBottomColor: theme.border,
          },
        ]}
      >
        <Text
          style={[
            styles.homeTitle,
            styles.homeTitleMaoken,
            { color: theme.titleText, fontFamily: maokenSansFontFamily },
          ]}
        >
          {translate('home.history')}
        </Text>
        <View style={styles.homeStatusBarActions}>
          <Pressable
            onPress={() => setResetModalVisible(true)}
            aria-label={translate('history.reset')}
          >
            <TrashOff color={theme.buttonChip} />
          </Pressable>
          <Pressable onPress={onClose} aria-label={translate('history.close')}>
            <X color={theme.buttonChip} />
          </Pressable>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.historyList}>
        {entries.length === 0 ? (
          <Text style={[styles.historyEmptyText, { color: theme.mutedText }]}>
            {translate('history.empty')}
          </Text>
        ) : null}
        {entries.map(entry => {
          const previewText =
            entry.options.text.length > 40
              ? `${entry.options.text.slice(0, 40).trimEnd()}…`
              : entry.options.text;

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
                  onPress={() => onApplyEntry(entry.options)}
                  style={[
                    styles.historyActionButton,
                    { backgroundColor: theme.historyActionBackground },
                  ]}
                >
                  <Text
                    style={[
                      styles.historyActionText,
                      { color: theme.historyActionText },
                    ]}
                  >
                    {translate('history.apply')}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => onShowEntry(entry.options)}
                  style={[
                    styles.historyActionButton,
                    { backgroundColor: theme.historyActionBackground },
                  ]}
                >
                  <Text
                    style={[
                      styles.historyActionText,
                      { color: theme.historyActionText },
                    ]}
                  >
                    {translate('history.show')}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    deleteEntry(entry.id);
                  }}
                  style={[
                    styles.historyActionButton,
                    { backgroundColor: theme.historyActionBackground },
                  ]}
                >
                  <Text
                    style={[
                      styles.historyActionText,
                      { color: theme.historyActionText },
                    ]}
                  >
                    {translate('history.delete')}
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <StatusBar barStyle={statusBarStyle} />
      <Modal
        transparent
        visible={resetModalVisible}
        animationType="fade"
        onRequestClose={() => setResetModalVisible(false)}
      >
        <Pressable
          style={[styles.backdrop, { backgroundColor: theme.modalBackdrop }]}
          onPress={() => setResetModalVisible(false)}
        >
          <Pressable
            style={[styles.sheet, { backgroundColor: theme.modalSheet }]}
            onPress={() => {}}
          >
            <Text style={[styles.modalTitle, { color: theme.modalText }]}>
              {translate('history.resetTitle')}
            </Text>
            <Text style={[styles.modalBody, { color: theme.modalMutedText }]}>
              {translate('history.resetBody')}
            </Text>
            <View style={styles.buttonRow}>
              <Pressable
                onPress={() => setResetModalVisible(false)}
                style={[
                  styles.button,
                  styles.flexOne,
                  { backgroundColor: theme.buttonSurface },
                ]}
              >
                <Text style={[styles.buttonText, { color: theme.buttonText }]}>
                  {translate('history.resetCancel')}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  handleResetDatabase();
                }}
                style={[
                  styles.button,
                  styles.flexOne,
                  { backgroundColor: theme.buttonChip },
                ]}
              >
                <Text
                  style={[styles.buttonText, { color: theme.buttonChipText }]}
                >
                  {translate('history.resetConfirm')}
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

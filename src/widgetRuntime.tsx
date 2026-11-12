'use no memo';

import React from 'react';
import {
  FlexWidget,
  SvgWidget,
  TextWidget,
  registerWidgetConfigurationScreen,
  registerWidgetTaskHandler,
  type WidgetConfigurationScreenProps,
  type WidgetTaskHandlerProps,
} from 'react-native-android-widget';
import { WidgetConfigScreen } from './screens/WidgetConfigScreen';
import { loadWidgetOptions, saveWidgetOptions } from './state/widgetOptions';
import { NativeModules } from 'react-native';

const WIDGET_NAME = 'WidgetProvider';

const DEFAULT_WIDGET_OPTIONS = {
  homeTheme: 'light' as const,
  language: 'en' as const,
  text: '',
  widgetName: '',
  foregroundColor: '#ffffff',
  backgroundColor: '#000000',
  outputFontFamily: '',
  outputFontSizeMode: 'automatic' as const,
  outputFontSize: 120,
  outputScreenOrientation: 'automatic' as const,
  outputAnimationStyle: 'static' as const,
  outputAnimationInterval: 1,
  outputHorizontalAlignment: 'center' as const,
  outputVerticalAlignment: 'center' as const,
};

function requestWidgetOutput(widgetId: number) {
  NativeModules.AppLaunch?.requestWidgetOutput?.(widgetId);
}

function WidgetPreview({
  widgetName,
  widgetId,
}: {
  widgetName: string;
  widgetId: number;
}) {
  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      clickAction="OPEN_URI"
      clickActionData={{ uri: `bigtext://widget-output?widgetId=${widgetId}` }}
      accessibilityLabel="Big text widget"
    >
      <SvgWidget
        svg={require('../assets/widget-icon.svg')}
        style={{ height: 72, width: 72 }}
      />
      <FlexWidget
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 8,
          borderRadius: 12,
          paddingVertical: 4,
          paddingHorizontal: 8,
          backgroundColor: '#141A24',
        }}
      >
        <TextWidget
          text={widgetName}
          style={{
            color: '#F4E7CF',
          }}
        />
      </FlexWidget>
    </FlexWidget>
  );
}

function WidgetConfigController({
  widgetInfo,
  renderWidget,
  setResult,
}: WidgetConfigurationScreenProps) {
  const [options, setOptions] = React.useState(DEFAULT_WIDGET_OPTIONS);

  React.useEffect(() => {
    let active = true;

    loadWidgetOptions(widgetInfo.widgetId)
      .then(nextOptions => {
        if (active) {
          setOptions(current => nextOptions ?? current);
        }
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, [widgetInfo.widgetId]);

  React.useEffect(() => {
    renderWidget(
      <WidgetPreview
        widgetName={options.widgetName}
        widgetId={widgetInfo.widgetId}
      />,
    );
  }, [options, renderWidget, widgetInfo.widgetId]);

  return (
    <WidgetConfigScreen
      insets={{ top: 0, right: 0, bottom: 0, left: 0 }}
      options={options}
      onWidgetNameChange={name => {
        setOptions(current =>
          current == null ? current : { ...current, widgetName: name },
        );
      }}
      onConfirm={async nextOptions => {
        await saveWidgetOptions(widgetInfo.widgetId, nextOptions);
        setResult('ok');
      }}
    />
  );
}

registerWidgetTaskHandler(async (props: WidgetTaskHandlerProps) => {
  if (props.widgetInfo.widgetName !== WIDGET_NAME) {
    return;
  }

  const options = await loadWidgetOptions(props.widgetInfo.widgetId);

  if (!options) {
    return;
  }

  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
    case 'WIDGET_UPDATE':
    case 'WIDGET_RESIZED':
      props.renderWidget(
        <WidgetPreview
          widgetName={options.widgetName}
          widgetId={props.widgetInfo.widgetId}
        />,
      );
      break;
    case 'WIDGET_CLICK':
      props.renderWidget(
        <WidgetPreview
          widgetName={options.widgetName}
          widgetId={props.widgetInfo.widgetId}
        />,
      );
      requestWidgetOutput(props.widgetInfo.widgetId);
      break;
    case 'WIDGET_DELETED':
      break;
    default:
      break;
  }
});

registerWidgetConfigurationScreen((props: WidgetConfigurationScreenProps) => (
  <WidgetConfigController {...props} />
));

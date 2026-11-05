/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../src/App';

jest.mock('react-native-gesture-handler', () => ({
  GestureHandlerRootView: ({children}: {children: React.ReactNode}) => children,
}));

jest.mock('reanimated-color-picker', () => {
  const React = require('react');
  const {View} = require('react-native');

  return {
    __esModule: true,
    default: ({children, onCompleteJS}: {children: React.ReactNode; onCompleteJS?: (colors: {hex: string}) => void}) => {
      React.useEffect(() => {
        onCompleteJS?.({hex: '#ffffff'});
      }, [onCompleteJS]);

      return <View>{children}</View>;
    },
    HueSlider: () => null,
    Preview: () => null,
    Panel3: () => null,
    Panel5: () => null,
  };
});

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});

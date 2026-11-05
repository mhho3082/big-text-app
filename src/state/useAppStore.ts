import { create } from 'zustand';

export type Screen = 'home' | 'output';

type AppState = {
  screen: Screen;
  text: string;
  foregroundColor: string;
  backgroundColor: string;
  setText: (text: string) => void;
  setForegroundColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  goToOutput: () => void;
  goHome: () => void;
};

export const useAppStore = create<AppState>(set => ({
  screen: 'home',
  text: '',
  foregroundColor: '#ffffff',
  backgroundColor: '#111111',
  setText: text => set({ text }),
  setForegroundColor: foregroundColor => set({ foregroundColor }),
  setBackgroundColor: backgroundColor => set({ backgroundColor }),
  goToOutput: () => set({ screen: 'output' }),
  goHome: () => set({ screen: 'home' }),
}));

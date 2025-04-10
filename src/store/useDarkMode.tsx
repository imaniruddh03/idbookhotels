import { create } from 'zustand';

interface DarkModeState {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const useDarkModeStore = create<DarkModeState>((set) => ({
  darkMode: false,
  toggleDarkMode: () =>
    set((state) => ({ darkMode: !state.darkMode })),
}));

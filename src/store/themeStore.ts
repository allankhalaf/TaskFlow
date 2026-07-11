import { create } from 'zustand'

interface ThemeState {
  darkMode: boolean
  toggleTheme: () => void
  setTheme: (dark: boolean) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  darkMode: false,
  toggleTheme: () => set((state) => {
    const newMode = !state.darkMode
    if (newMode) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    return { darkMode: newMode }
  }),
  setTheme: (dark) => set(() => {
    if (dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    return { darkMode: dark }
  }),
}))

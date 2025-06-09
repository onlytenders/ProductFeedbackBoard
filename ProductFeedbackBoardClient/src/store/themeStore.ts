import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
  isDark: boolean
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  initializeTheme: () => void
}

const applyTheme = (theme: Theme) => {
  const isDark = theme === 'dark' || 
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  
  document.documentElement.classList.toggle('dark', isDark)
  
  document.documentElement.classList.toggle('light', !isDark)
  
  return isDark
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      isDark: false,

      initializeTheme: () => {
        const currentTheme = get().theme
        const isDark = applyTheme(currentTheme)
        set({ isDark })
      },

      setTheme: (theme) => {
        const isDark = applyTheme(theme)
        set({ theme, isDark })
      },

      toggleTheme: () => {
        const currentTheme = get().theme
        const newTheme = currentTheme === 'light' ? 'dark' : 'light'
        const isDark = applyTheme(newTheme)
        set({ theme: newTheme, isDark })
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Apply theme immediately on rehydration
          setTimeout(() => {
            state.initializeTheme()
          }, 0)
        }
      },
    }
  )
) 
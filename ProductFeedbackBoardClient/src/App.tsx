import { useState, useEffect } from "react"
import { useThemeStore } from "./store/themeStore"
import Dashboard from "./components/Dashboard"
import FeedbackForm from "./components/FeedbackForm"
import FeedbackList from "./components/FeedbackList"
import EditFeedbackModal from "./components/EditFeedbackModal"

type View = 'dashboard' | 'list' | 'add'

export default function App() {
  const { isDark, initializeTheme, toggleTheme } = useThemeStore()
  const [currentView, setCurrentView] = useState<View>('dashboard')

  useEffect(() => {
    // Initialize theme on mount
    initializeTheme()
  }, [initializeTheme])

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'list', label: 'Feedback', icon: '💬' },
    { id: 'add', label: 'Add Idea', icon: '➕' },
  ] as const

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="flex flex-col min-h-screen items-center">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 w-full flex justify-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-xl">🚀</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    FeedbackBoard
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                    Share ideas, build together
                  </p>
                </div>
              </div>

              <button
                onClick={toggleTheme}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="sticky top-16 z-30 bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg border-b border-gray-200/30 dark:border-gray-700/30 w-full flex justify-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex justify-center py-4">
              <div className="flex bg-white dark:bg-gray-800 rounded-2xl p-1.5 shadow-lg border border-gray-200 dark:border-gray-700">
                {navigation.map((nav) => (
                  <button
                    key={nav.id}
                    onClick={() => setCurrentView(nav.id as View)}
                    className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${
                      currentView === nav.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-lg">{nav.icon}</span>
                    <span className="hidden sm:inline">{nav.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="space-y-6 sm:space-y-8">
            {currentView === 'dashboard' && <Dashboard />}
            {currentView === 'list' && <FeedbackList />}
            {currentView === 'add' && <FeedbackForm />}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50 w-full flex justify-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Level 3 + Bonus Features
              </p>
            </div>
          </div>
        </footer>
      </div>

      <EditFeedbackModal />
    </div>
  )
}

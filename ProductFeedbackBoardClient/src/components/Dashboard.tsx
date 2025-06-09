import { useFeedbackStore } from '../store/feedbackStore'

export default function Dashboard() {
  const { 
    getTotalFeedback, 
    getTotalUpvotes, 
    getFeedbackByCategory,
    feedback 
  } = useFeedbackStore()

  const stats = [
    {
      label: 'Total Ideas',
      value: getTotalFeedback(),
      icon: '💡',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      darkBgGradient: 'from-purple-900/20 to-pink-900/20',
    },
    {
      label: 'Total Upvotes',
      value: getTotalUpvotes(),
      icon: '🔥',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      darkBgGradient: 'from-orange-900/20 to-red-900/20',
    },
    {
      label: 'Features',
      value: getFeedbackByCategory('feature'),
      icon: '🚀',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      darkBgGradient: 'from-blue-900/20 to-cyan-900/20',
    },
    {
      label: 'UI/UX',
      value: getFeedbackByCategory('ui'),
      icon: '🎨',
      gradient: 'from-violet-500 to-purple-500',
      bgGradient: 'from-violet-50 to-purple-50',
      darkBgGradient: 'from-violet-900/20 to-purple-900/20',
    },
  ]

  const statusStats = feedback.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const statusConfig = {
    suggestion: { color: 'text-gray-600', bg: 'bg-gray-100', darkBg: 'dark:bg-gray-800', emoji: '💭' },
    planned: { color: 'text-blue-600', bg: 'bg-blue-100', darkBg: 'dark:bg-blue-900/30', emoji: '📋' },
    'in-progress': { color: 'text-yellow-600', bg: 'bg-yellow-100', darkBg: 'dark:bg-yellow-900/30', emoji: '⚡' },
    live: { color: 'text-green-600', bg: 'bg-green-100', darkBg: 'dark:bg-green-900/30', emoji: '✅' },
    closed: { color: 'text-red-600', bg: 'bg-red-100', darkBg: 'dark:bg-red-900/30', emoji: '🔒' },
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.bgGradient} dark:${stat.darkBgGradient} p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20 dark:border-gray-700/50`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {stat.label}
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`text-3xl sm:text-4xl ${stat.icon === '🔥' && stat.value > 50 ? 'animate-pulse' : ''}`}>
                {stat.icon}
              </div>
            </div>
            
            {/* Gradient overlay */}
            <div className={`absolute -bottom-2 -right-2 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br ${stat.gradient} rounded-full opacity-10`} />
          </div>
        ))}
      </div>

      {/* Status Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
          📊 Status Overview
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {Object.entries(statusConfig).map(([status, config]) => (
            <div
              key={status}
              className={`${config.bg} ${config.darkBg} rounded-xl p-3 sm:p-4 text-center transition-all hover:scale-105`}
            >
              <div className="text-xl sm:text-2xl mb-2">{config.emoji}</div>
              <div className={`text-lg sm:text-2xl font-bold ${config.color} dark:text-white`}>
                {statusStats[status] || 0}
              </div>
              <div className="text-xs font-medium text-gray-600 dark:text-gray-300 capitalize">
                {status.replace('-', ' ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          ⚡ Recent Activity
        </h3>
        
        <div className="space-y-3">
          {feedback
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            .slice(0, 3)
            .map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="text-lg sm:text-xl flex-shrink-0">
                  {statusConfig[item.status]?.emoji || '💭'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(item.updatedAt).toLocaleDateString()} • {item.upvotes} upvotes
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
} 
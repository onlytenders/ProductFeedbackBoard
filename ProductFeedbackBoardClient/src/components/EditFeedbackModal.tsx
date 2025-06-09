import { useState, useEffect } from 'react'
import { useFeedbackStore, type Feedback } from '../store/feedbackStore'

export default function EditFeedbackModal() {
  const { isEditing, editingFeedback, updateFeedback, stopEditing } = useFeedbackStore()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<Feedback['category']>('feature')
  const [status, setStatus] = useState<Feedback['status']>('suggestion')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (editingFeedback) {
      setTitle(editingFeedback.title)
      setDescription(editingFeedback.description)
      setCategory(editingFeedback.category)
      setStatus(editingFeedback.status)
    }
  }, [editingFeedback])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingFeedback || !title.trim() || !description.trim()) return

    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 500))

    updateFeedback(editingFeedback.id, {
      title: title.trim(),
      description: description.trim(),
      category,
      status,
    })

    setIsSubmitting(false)
    stopEditing()
  }

  const handleClose = () => {
    if (isSubmitting) return
    stopEditing()
  }

  const categories = [
    { value: 'feature', label: 'Feature', icon: '🚀', gradient: 'from-blue-500 to-cyan-500' },
    { value: 'ui', label: 'UI/UX', icon: '🎨', gradient: 'from-purple-500 to-pink-500' },
    { value: 'performance', label: 'Performance', icon: '⚡', gradient: 'from-yellow-500 to-orange-500' },
    { value: 'bug', label: 'Bug Fix', icon: '🐛', gradient: 'from-red-500 to-pink-500' },
  ] as const

  const statuses = [
    { value: 'suggestion', label: 'Suggestion', icon: '💭', color: 'text-gray-600', bg: 'bg-gray-100' },
    { value: 'planned', label: 'Planned', icon: '📋', color: 'text-blue-600', bg: 'bg-blue-100' },
    { value: 'in-progress', label: 'In Progress', icon: '⚡', color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { value: 'live', label: 'Live', icon: '✅', color: 'text-green-600', bg: 'bg-green-100' },
    { value: 'closed', label: 'Closed', icon: '🔒', color: 'text-red-600', bg: 'bg-red-100' },
  ] as const

  if (!isEditing || !editingFeedback) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Edit Feedback ✏️
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
              Make your idea even better!
            </p>
          </div>
          
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="edit-title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Title ✨
            </label>
            <input
              type="text"
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your idea?"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              maxLength={100}
            />
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Keep it catchy and clear!
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500">
                {title.length}/100
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="edit-description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Description 📝
            </label>
            <textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your idea in detail..."
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
              maxLength={500}
            />
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                More details help others understand your vision.
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500">
                {description.length}/500
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Category 🎯
            </label>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                    category === cat.value
                      ? `border-transparent bg-gradient-to-br ${cat.gradient} text-white shadow-lg scale-105`
                      : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{cat.icon}</div>
                    <div className="font-medium text-sm">{cat.label}</div>
                  </div>
                  
                  {category === cat.value && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Status 📊
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {statuses.map((stat) => (
                <button
                  key={stat.value}
                  type="button"
                  onClick={() => setStatus(stat.value)}
                  className={`relative p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                    status === stat.value
                      ? `border-blue-500 ${stat.bg} ${stat.color} shadow-lg scale-105`
                      : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <div className="font-medium text-xs">{stat.label}</div>
                  
                  {status === stat.value && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !description.trim()}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                <>
                  <span>💾</span>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 
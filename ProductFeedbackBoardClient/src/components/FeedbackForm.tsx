import { useState } from 'react'
import { useFeedbackStore, type Feedback } from '../store/feedbackStore'

export default function FeedbackForm() {
  const { addFeedback } = useFeedbackStore()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<Feedback['category']>('feature')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !description.trim()) {
      // Show better error state
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))

    addFeedback({
      title: title.trim(),
      description: description.trim(),
      category,
      status: 'suggestion'
    })

    // Reset form
    setTitle('')
    setDescription('')
    setCategory('feature')
    setIsSubmitting(false)
  }

  const categories = [
    { value: 'feature', label: 'Feature', icon: '🚀', gradient: 'from-blue-500 to-cyan-500' },
    { value: 'ui', label: 'UI/UX', icon: '🎨', gradient: 'from-purple-500 to-pink-500' },
    { value: 'performance', label: 'Performance', icon: '⚡', gradient: 'from-yellow-500 to-orange-500' },
    { value: 'bug', label: 'Bug Fix', icon: '🐛', gradient: 'from-red-500 to-pink-500' },
  ] as const

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center justify-center w-14 sm:w-16 h-14 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
          <span className="text-xl sm:text-2xl">💭</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Share Your Ideas
        </h2>
        <p className="text-gray-600 dark:text-gray-300 px-4">
          Help us build something amazing together! Every idea matters. 🚀
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-8 shadow-xl border border-gray-200 dark:border-gray-700">
          {/* Title Input */}
          <div className="space-y-2 mb-4 sm:mb-6">
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              What's your idea? ✨
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Something awesome..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              maxLength={100}
            />
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Make it catchy! First impressions matter.
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500">
                {title.length}/100
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 mb-4 sm:mb-6">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Tell us more 📝
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your idea in detail. What problem does it solve? How would it work? The more details, the better!"
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
              maxLength={500}
            />
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Paint us a picture with your words.
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500">
                {description.length}/500
              </div>
            </div>
          </div>

          {/* Category Selection */}
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
                  className={`relative p-4 rounded-xl border-2 transition-all duration-200 group ${
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
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !title.trim() || !description.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 sm:py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:cursor-not-allowed disabled:transform-none transform hover:scale-105 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            <>
              <span>🚀</span>
              Submit Feedback
            </>
          )}
        </button>
      </form>
    </div>
  )
} 
import { 
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useFeedbackStore, type SortOption, type FilterOption } from '../store/feedbackStore'
import FeedbackItem from './FeedbackItem'

export default function FeedbackList() {
  const { 
    getFilteredAndSortedFeedback,
    sortBy,
    filterBy,
    setSortBy,
    setFilterBy,
    getTotalFeedback,
    feedback,
    updateFeedback
  } = useFeedbackStore()
  
  const filteredAndSortedFeedback = getFilteredAndSortedFeedback()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = filteredAndSortedFeedback.findIndex(item => item.id === active.id)
      const newIndex = filteredAndSortedFeedback.findIndex(item => item.id === over?.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(filteredAndSortedFeedback, oldIndex, newIndex)
        // Update the order in the feedback store (simple approach - just update timestamps)
        newOrder.forEach((item, index) => {
          const newTimestamp = new Date(Date.now() - index * 1000).toISOString()
          updateFeedback(item.id, { updatedAt: newTimestamp })
        })
      }
    }
  }

  const filterOptions = [
    { value: 'all', label: 'All Categories', icon: '🌟', count: getTotalFeedback() },
    { value: 'feature', label: 'Features', icon: '🚀', count: useFeedbackStore.getState().getFeedbackByCategory('feature') },
    { value: 'ui', label: 'UI/UX', icon: '🎨', count: useFeedbackStore.getState().getFeedbackByCategory('ui') },
    { value: 'performance', label: 'Performance', icon: '⚡', count: useFeedbackStore.getState().getFeedbackByCategory('performance') },
    { value: 'bug', label: 'Bug Fixes', icon: '🐛', count: useFeedbackStore.getState().getFeedbackByCategory('bug') },
  ] as const

  const sortOptions = [
    { value: 'newest', label: 'Newest First', icon: '🆕' },
    { value: 'oldest', label: 'Oldest First', icon: '⏰' },
    { value: 'most-upvoted', label: 'Most Upvoted', icon: '🔥' },
    { value: 'least-upvoted', label: 'Least Upvoted', icon: '📈' },
  ] as const

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Community Feedback 🗣️
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {filteredAndSortedFeedback.length} suggestion{filteredAndSortedFeedback.length !== 1 ? 's' : ''}
          {filterBy !== 'all' && ` in ${filterBy}`}
        </p>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="space-y-4 sm:space-y-6">
          {/* Category Filters */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Filter by Category
            </h3>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilterBy(option.value as FilterOption)}
                  className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl border transition-all duration-200 text-sm ${
                    filterBy === option.value
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-105'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 hover:scale-105'
                  }`}
                >
                  <span>{option.icon}</span>
                  <span className="font-medium hidden xs:inline">{option.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    filterBy === option.value
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}>
                    {option.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Sort by
            </h3>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value as SortOption)}
                  className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl border transition-all duration-200 text-sm ${
                    sortBy === option.value
                      ? 'bg-purple-600 text-white border-purple-600 shadow-lg scale-105'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 hover:scale-105'
                  }`}
                >
                  <span>{option.icon}</span>
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Drag and Drop Info */}
          {filteredAndSortedFeedback.length > 1 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center gap-2">
                <span>✋</span>
                <span>Drag and drop to reorder feedback items!</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Feedback Items */}
      {filteredAndSortedFeedback.length === 0 ? (
        <div className="text-center py-12 sm:py-16">
          <div className="max-w-md mx-auto">
            <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <span className="text-3xl sm:text-4xl">🤷‍♂️</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
              No feedback yet!
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 px-4">
              {filterBy === 'all' 
                ? "Be the first to drop some feedback and start the conversation!" 
                : `No feedback in the ${filterBy} category yet. Maybe you can be the first?`
              }
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setFilterBy('all')}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                {filterBy !== 'all' ? 'Show All Feedback' : 'Add First Feedback'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredAndSortedFeedback.map(item => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid gap-4 sm:gap-6">
              {filteredAndSortedFeedback.map((item) => (
                <FeedbackItem
                  key={item.id}
                  feedback={item}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Footer Stats */}
      {filteredAndSortedFeedback.length > 0 && (
        <div className="text-center py-6 sm:py-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredAndSortedFeedback.length} of {getTotalFeedback()} feedback items
            {filterBy !== 'all' && ` in ${filterBy} category`}
          </p>
        </div>
      )}
    </div>
  )
} 
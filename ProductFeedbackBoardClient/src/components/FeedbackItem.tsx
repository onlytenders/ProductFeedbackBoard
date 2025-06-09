import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useFeedbackStore, type Feedback } from '../store/feedbackStore'

interface FeedbackItemProps {
  feedback: Feedback
}

const getCategoryConfig = (category: string) => {
  switch (category) {
    case 'feature': return { 
      icon: '🚀', 
      gradient: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-700 dark:text-blue-300',
      border: 'border-blue-200 dark:border-blue-700'
    }
    case 'ui': return { 
      icon: '🎨', 
      gradient: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      text: 'text-purple-700 dark:text-purple-300',
      border: 'border-purple-200 dark:border-purple-700'
    }
    case 'performance': return { 
      icon: '⚡', 
      gradient: 'from-yellow-500 to-orange-500',
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      text: 'text-yellow-700 dark:text-yellow-300',
      border: 'border-yellow-200 dark:border-yellow-700'
    }
    case 'bug': return { 
      icon: '🐛', 
      gradient: 'from-red-500 to-pink-500',
      bg: 'bg-red-50 dark:bg-red-900/20',
      text: 'text-red-700 dark:text-red-300',
      border: 'border-red-200 dark:border-red-700'
    }
    default: return { 
      icon: '💡', 
      gradient: 'from-gray-500 to-gray-600',
      bg: 'bg-gray-50 dark:bg-gray-900/20',
      text: 'text-gray-700 dark:text-gray-300',
      border: 'border-gray-200 dark:border-gray-700'
    }
  }
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'suggestion': return { 
      emoji: '💭', 
      label: 'Suggestion',
      bg: 'bg-gray-100 dark:bg-gray-700',
      text: 'text-gray-700 dark:text-gray-300',
      border: 'border-gray-200 dark:border-gray-600'
    }
    case 'planned': return { 
      emoji: '📋', 
      label: 'Planned',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-700 dark:text-blue-300',
      border: 'border-blue-200 dark:border-blue-600'
    }
    case 'in-progress': return { 
      emoji: '⚡', 
      label: 'In Progress',
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      text: 'text-yellow-700 dark:text-yellow-300',
      border: 'border-yellow-200 dark:border-yellow-600'
    }
    case 'live': return { 
      emoji: '✅', 
      label: 'Live',
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-700 dark:text-green-300',
      border: 'border-green-200 dark:border-green-600'
    }
    case 'closed': return { 
      emoji: '🔒', 
      label: 'Closed',
      bg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-700 dark:text-red-300',
      border: 'border-red-200 dark:border-red-600'
    }
    default: return { 
      emoji: '💭', 
      label: 'Unknown',
      bg: 'bg-gray-100 dark:bg-gray-700',
      text: 'text-gray-700 dark:text-gray-300',
      border: 'border-gray-200 dark:border-gray-600'
    }
  }
}

export default function FeedbackItem({ feedback }: FeedbackItemProps) {
  const { upvoteFeedback, deleteFeedback, startEditing } = useFeedbackStore()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpvoting, setIsUpvoting] = useState(false)
  
  const { id, title, description, upvotes, category, status, createdAt } = feedback
  
  const categoryConfig = getCategoryConfig(category)
  const statusConfig = getStatusConfig(status)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: feedback.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleUpvote = async () => {
    if (isUpvoting) return
    setIsUpvoting(true)
    await new Promise(resolve => setTimeout(resolve, 200))
    upvoteFeedback(id)
    setIsUpvoting(false)
  }

  const handleDelete = async () => {
    if (isDeleting) return
    if (!window.confirm('You sure you wanna delete this feedback, bro?')) return
    
    setIsDeleting(true)
    await new Promise(resolve => setTimeout(resolve, 300))
    deleteFeedback(id)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Today'
    if (diffDays === 2) return 'Yesterday'
    if (diffDays <= 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 ${
        isDeleting ? 'opacity-50 scale-95' : isDragging ? 'opacity-50 scale-105 z-50' : 'hover:-translate-y-1'
      }`}
    >
      {/* Drag Handle - Always visible on mobile */}
      <div 
        {...attributes}
        {...listeners}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 cursor-grab active:cursor-grabbing touch-none"
        title="Drag to reorder"
      >
        <div className="flex flex-col gap-1">
          <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-3 pr-8">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Category Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${categoryConfig.bg} ${categoryConfig.text} ${categoryConfig.border} border`}>
            <span className="text-sm">{categoryConfig.icon}</span>
            <span className="hidden xs:inline">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
          </div>
          
          {/* Status Badge */}
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border`}>
            <span>{statusConfig.emoji}</span>
            <span className="hidden xs:inline">{statusConfig.label}</span>
          </div>
        </div>

        {/* Actions - Always visible on mobile */}
        <div className="flex items-center gap-2 sm:opacity-100">
          <button
            onClick={() => startEditing(feedback)}
            className="p-2 text-gray-400 hover:text-blue-500 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 touch-manipulation"
            title="Edit feedback"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 touch-manipulation"
            title="Delete feedback"
          >
            {isDeleting ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight pr-8">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
          {description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        {/* Upvote Button */}
        <button
          onClick={handleUpvote}
          disabled={isUpvoting}
          className={`group/upvote flex items-center justify-center sm:justify-start gap-2 px-4 py-2 rounded-xl transition-all duration-200 touch-manipulation ${
            isUpvoting 
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 scale-95' 
              : 'bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105'
          }`}
        >
          <svg className={`w-4 h-4 transition-transform ${isUpvoting ? 'scale-110' : 'group-hover/upvote:scale-110'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          <span className="font-semibold">{upvotes}</span>
          <span className="text-sm">upvotes</span>
        </button>

        {/* Meta Info */}
        <div className="flex items-center justify-center sm:justify-end gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="hidden xs:inline">{feedback.comments?.length || 0}</span>
          </span>
          
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="hidden xs:inline">{formatDate(createdAt)}</span>
          </span>
        </div>
      </div>

      {/* Subtle gradient overlay */}
      <div className={`absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br ${categoryConfig.gradient} opacity-5 rounded-2xl -m-4 pointer-events-none`} />
    </div>
  )
} 
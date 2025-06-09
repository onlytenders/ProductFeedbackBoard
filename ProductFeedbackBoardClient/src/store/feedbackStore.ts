import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

export type Feedback = {
  id: number
  title: string
  description: string
  upvotes: number
  status: 'suggestion' | 'planned' | 'in-progress' | 'live' | 'closed'
  category: 'feature' | 'ui' | 'performance' | 'bug'
  comments: Comment[]
  createdAt: string
  updatedAt: string
}

export type SortOption = 'newest' | 'oldest' | 'most-upvoted' | 'least-upvoted'
export type FilterOption = 'all' | 'feature' | 'ui' | 'performance' | 'bug'

interface FeedbackState {
  // State
  feedback: Feedback[]
  sortBy: SortOption
  filterBy: FilterOption
  isEditing: boolean
  editingFeedback: Feedback | null
  
  // Actions
  addFeedback: (feedback: Omit<Feedback, 'id' | 'upvotes' | 'comments' | 'createdAt' | 'updatedAt'>) => void
  updateFeedback: (id: number, updates: Partial<Feedback>) => void
  deleteFeedback: (id: number) => void
  upvoteFeedback: (id: number) => void
  setSortBy: (sort: SortOption) => void
  setFilterBy: (filter: FilterOption) => void
  startEditing: (feedback: Feedback) => void
  stopEditing: () => void
  
  // Computed
  getFilteredAndSortedFeedback: () => Feedback[]
  getTotalFeedback: () => number
  getTotalUpvotes: () => number
  getFeedbackByCategory: (category: string) => number
}

export const useFeedbackStore = create<FeedbackState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        feedback: [
          {
            id: 1,
            title: "Dark Mode Please! 🌙",
            description: "Would love to have a dark mode option for those late night coding sessions. My eyes are crying fam!",
            upvotes: 25,
            status: "suggestion",
            category: "ui",
            comments: [],
            createdAt: new Date('2024-01-15').toISOString(),
            updatedAt: new Date('2024-01-15').toISOString(),
          },
          {
            id: 2,
            title: "Faster Loading Times ⚡",
            description: "The app takes forever to load sometimes. Can we optimize this? Speed is everything in 2024!",
            upvotes: 18,
            status: "in-progress",
            category: "performance",
            comments: [],
            createdAt: new Date('2024-01-14').toISOString(),
            updatedAt: new Date('2024-01-16').toISOString(),
          },
          {
            id: 3,
            title: "Export Data Feature 📊",
            description: "Need a way to export all feedback as JSON or CSV. Would be super helpful for reporting.",
            upvotes: 12,
            status: "planned",
            category: "feature",
            comments: [],
            createdAt: new Date('2024-01-13').toISOString(),
            updatedAt: new Date('2024-01-13').toISOString(),
          },
          {
            id: 4,
            title: "Mobile App Please! 📱",
            description: "This web app is dope but we need a mobile version. React Native maybe?",
            upvotes: 31,
            status: "suggestion",
            category: "feature",
            comments: [],
            createdAt: new Date('2024-01-12').toISOString(),
            updatedAt: new Date('2024-01-12').toISOString(),
          }
        ],
        sortBy: 'newest',
        filterBy: 'all',
        isEditing: false,
        editingFeedback: null,

        // Actions
        addFeedback: (newFeedback) => {
          const now = new Date().toISOString()
          const feedback: Feedback = {
            ...newFeedback,
            id: Math.max(...get().feedback.map(f => f.id), 0) + 1,
            upvotes: 0,
            comments: [],
            createdAt: now,
            updatedAt: now,
          }
          set((state) => ({
            feedback: [feedback, ...state.feedback]
          }))
        },

        updateFeedback: (id, updates) => {
          set((state) => ({
            feedback: state.feedback.map(item =>
              item.id === id
                ? { ...item, ...updates, updatedAt: new Date().toISOString() }
                : item
            )
          }))
        },

        deleteFeedback: (id) => {
          set((state) => ({
            feedback: state.feedback.filter(item => item.id !== id)
          }))
        },

        upvoteFeedback: (id) => {
          set((state) => ({
            feedback: state.feedback.map(item =>
              item.id === id
                ? { ...item, upvotes: item.upvotes + 1, updatedAt: new Date().toISOString() }
                : item
            )
          }))
        },

        setSortBy: (sort) => set({ sortBy: sort }),
        setFilterBy: (filter) => set({ filterBy: filter }),
        
        startEditing: (feedback) => set({ 
          isEditing: true, 
          editingFeedback: feedback 
        }),
        
        stopEditing: () => set({ 
          isEditing: false, 
          editingFeedback: null 
        }),

        // Computed
        getFilteredAndSortedFeedback: () => {
          const { feedback, sortBy, filterBy } = get()
          return feedback
            .filter(item => filterBy === 'all' || item.category === filterBy)
            .sort((a, b) => {
              switch (sortBy) {
                case 'newest':
                  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                case 'oldest':
                  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                case 'most-upvoted':
                  return b.upvotes - a.upvotes
                case 'least-upvoted':
                  return a.upvotes - b.upvotes
                default:
                  return 0
              }
            })
        },

        getTotalFeedback: () => get().feedback.length,
        getTotalUpvotes: () => get().feedback.reduce((sum, item) => sum + item.upvotes, 0),
        getFeedbackByCategory: (category) => 
          get().feedback.filter(item => item.category === category).length,
      }),
      {
        name: 'feedback-storage',
        partialize: (state) => ({ 
          feedback: state.feedback,
          sortBy: state.sortBy,
          filterBy: state.filterBy,
        }),
      }
    ),
    { name: 'feedback-store' }
  )
) 
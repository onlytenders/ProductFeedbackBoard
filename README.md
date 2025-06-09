# 🚀 Product Feedback Board

A modern, responsive feedback management application built with React, TypeScript, and Tailwind CSS. Perfect for collecting, organizing, and managing product feedback with style!

## ✨ Features

### 🎯 Core Functionality
- **📝 Create Feedback** - Submit new product ideas and feedback
- **👀 View Feedback** - Browse all feedback in a clean, organized interface
- **✏️ Edit Feedback** - Update existing feedback items
- **🗑️ Delete Feedback** - Remove outdated or irrelevant feedback
- **📊 Dashboard** - Overview of feedback statistics and insights

### 🔥 Advanced Features
- **🌙 Dark/Light Mode** - Toggle between themes with smooth transitions
- **🎨 Modern UI** - Beautiful gradient backgrounds and glass-morphism effects
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **🏷️ Category System** - Organize feedback by categories (Feature, UI, Bug, Enhancement)
- **⭐ Priority Levels** - Set Low, Medium, High, or Critical priority
- **📈 Status Tracking** - Track feedback status (Idea, Planned, In Progress, Live)
- **🎭 Drag & Drop** - Reorder feedback items with smooth animations
- **💾 Persistent Storage** - Local storage keeps your data safe
- **🔍 Smart Filtering** - Filter by category, status, and priority
- **🎪 Smooth Animations** - Polished interactions throughout the app

## 🛠️ Tech Stack

- **Frontend:** React 19 + TypeScript
- **Styling:** Tailwind CSS 4.1 with custom gradients
- **State Management:** Zustand
- **Drag & Drop:** @dnd-kit
- **Build Tool:** Vite 6
- **Package Manager:** npm

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/onlytenders/ProductFeedbackBoard.git
   cd ProduceFeedbackBoard
   ```

2. **Navigate to the client directory**
   ```bash
   cd ProductFeedbackBoardClient
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Start managing feedback like a boss! 🎉

## 📋 Available Scripts

In the `ProductFeedbackBoardClient` directory:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design Highlights

- **Glass-morphism UI** with backdrop blur effects
- **Smooth color transitions** between light and dark modes
- **Responsive navigation** with mobile-friendly design
- **Interactive feedback cards** with hover animations
- **Gradient backgrounds** that adapt to theme
- **Modern typography** and spacing

## 🔧 Project Structure

```
ProductFeedbackBoardClient/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Dashboard.tsx    # Main dashboard view
│   │   ├── FeedbackForm.tsx # Form for creating feedback
│   │   ├── FeedbackList.tsx # List view of all feedback
│   │   ├── FeedbackItem.tsx # Individual feedback card
│   │   └── EditFeedbackModal.tsx # Modal for editing
│   ├── store/              # State management
│   │   ├── feedbackStore.ts # Feedback data & actions
│   │   └── themeStore.ts    # Theme management
│   ├── pages/              # Page components
│   └── assets/             # Static assets
├── public/                 # Public assets
└── package.json           # Dependencies and scripts
```

## 🌟 Features Breakdown

### Dashboard 📊
- Feedback overview and statistics
- Quick access to recent feedback
- Status distribution visualization

### Feedback Management 💬
- Create new feedback with rich details
- Edit existing feedback inline
- Delete unwanted feedback
- Drag and drop to reorder

### Filtering & Organization 🔍
- Filter by category (Feature, UI, Bug, Enhancement)
- Filter by status (Idea, Planned, In Progress, Live)
- Filter by priority (Low, Medium, High, Critical)

### Theme System 🌙
- System preference detection
- Manual light/dark mode toggle
- Smooth transitions between themes
- Persistent theme selection

## 📱 Responsive Design

The app is fully responsive and optimized for:
- **Desktop** - Full featured experience
- **Tablet** - Optimized touch interactions
- **Mobile** - Streamlined mobile interface

## 🎯 Level 3 + Bonus Features

This project implements all Level 3 requirements plus additional bonus features:
- Advanced drag & drop functionality
- Theme switching with system preference detection
- Local storage persistence
- Advanced filtering and categorization
- Responsive design with mobile optimization
- Modern UI with animations and transitions

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ and lots of ☕ by [Your Name]

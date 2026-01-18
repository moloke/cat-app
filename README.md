# Cat App

A React TypeScript application for managing cat images. Built with React, TypeScript, and TailwindCSS, this app integrates with [TheCatAPI](https://thecatapi.com/).

## Features

**Core Functionality**
- Upload cat images with drag-and-drop support
- View all uploaded cats in a responsive grid layout
- Favourite and unfavourite cats
- Vote cats up or down with real-time score calculation
- Display vote scores (upvotes - downvotes)

**Modern User Experience**
- Responsive design (1-4 columns based on screen size)
- Skeleton loading states
- Toast notifications for user feedback
- Image preview before upload
- Optimistic UI updates for instant feedback
- Error boundary for graceful error handling

**Technical Highlights**
- TypeScript for type safety
- TanStack Query for efficient data fetching and caching
- React Router for navigation
- Axios for HTTP requests
- Comprehensive form validation
- Unit tests for critical components

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS 4
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Notifications**: React Hot Toast
- **Testing**: Vitest + React Testing Library

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- A free API key from [TheCatAPI](https://thecatapi.com/)

## Getting Started

### 1. Clone the Repository

```bash
git clone <https://github.com/moloke/cat-app>
cd cat-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file and add your Cat API key:

```env
VITE_CAT_API_KEY=your_actual_api_key_here
```

**How to get an API key:**
1. Visit [https://thecatapi.com/signup](https://thecatapi.com/signup)
2. Sign up with your email
3. Should receive an API key immediately
4. Copy it to your `.env` file

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run lint` - Lint code with ESLint

## Project Structure

```
cat-app/
├── src/
│   ├── components/          # React components
│   │   ├── CatCard.tsx     # Individual cat display card
│   │   ├── Layout.tsx      # App layout with navigation
│   │   ├── EmptyState.tsx  # Empty state message
│   │   ├── SkeletonLoader.tsx  # Loading placeholders
│   │   ├── ErrorBoundary.tsx   # Error boundary component
│   │   └── __tests__/      # Component tests
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Gallery page
│   │   └── Upload.tsx      # Upload page
│   ├── services/           # API integration
│   │   └── catApi.ts       # Cat API service layer
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   └── mergeCatData.ts # Data merging logic
│   ├── test/               # Test setup
│   │   └── setup.ts
│   ├── assets/             # Static assets
│   │   └── react.svg
│   ├── App.tsx             # Root component
│   ├── main.tsx            # App entry point
│   └── index.css           # Global styles
├── .env.example            # Environment variable template
├── tailwind.config.js      # TailwindCSS configuration
├── vite.config.ts          # Vite configuration
├── vitest.config.ts        # Vitest configuration
└── package.json
```

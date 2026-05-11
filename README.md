# PrepFlow - AI Interview Preparation SaaS

A production-quality AI-powered mock interview platform for software engineers. PrepFlow helps you practice realistic interviews, receive detailed AI feedback, and track improvement over time.

## Features

### Core Features
- **Live AI Interviews** - Participate in realistic mock interviews with AI interviewer
- **Multiple Interview Types** - Technical, Behavioral, System Design, Frontend, Backend, DSA
- **Voice & Text Support** - Answer via voice recording or text input
- **Instant AI Feedback** - Detailed performance analysis with scores and recommendations
- **Progress Tracking** - Comprehensive analytics dashboard with growth trends
- **Interview History** - Review past sessions and track your journey

### Platform Capabilities
- Premium dark theme with glassmorphism UI
- Smooth Framer Motion animations
- Recharts-based analytics visualizations
- Responsive mobile-first design
- Command palette for navigation (⌘K)
- Polished loading states and empty states
- Professional authentication flows

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/prepflow.git
cd prepflow

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
prepflow/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Design system tokens
│   ├── (auth)/                     # Authentication routes
│   │   ├── login/
│   │   ├── signup/
│   │   └── forgot-password/
│   └── dashboard/                  # Protected dashboard routes
│       ├── page.tsx                # Dashboard home
│       ├── interview/              # Interview configuration
│       │   ├── page.tsx
│       │   └── [id]/               # Live interview session
│       ├── feedback/[id]/          # AI feedback page
│       ├── analytics/              # Performance analytics
│       ├── history/                # Interview history
│       ├── profile/                # User profile
│       └── settings/               # Account settings
├── components/
│   ├── landing/                    # Landing page sections
│   ├── dashboard/                  # Dashboard components
│   ├── motion.tsx                  # Reusable animations
│   ├── command-palette.tsx         # Navigation command palette
│   ├── empty-state.tsx             # Empty state component
│   └── skeletons.tsx               # Loading skeletons
├── lib/
│   ├── mock-data.ts                # Realistic mock data
│   └── utils.ts                    # Utility functions
└── public/                         # Static assets
```

## Key Pages

### Public Pages
- **Landing Page** (`/`) - Marketing page with features, testimonials, pricing, FAQ
- **Login** (`/login`) - Email and Google authentication
- **Sign Up** (`/signup`) - New user registration
- **Forgot Password** (`/forgot-password`) - Password recovery

### Protected Pages
- **Dashboard** (`/dashboard`) - Main hub with overview and statistics
- **Start Interview** (`/dashboard/interview`) - Configure interview settings
- **Live Interview** (`/dashboard/interview/[id]`) - Active interview session
- **AI Feedback** (`/dashboard/feedback/[id]`) - Detailed performance analysis
- **Analytics** (`/dashboard/analytics`) - Long-term progress tracking
- **History** (`/dashboard/history`) - View all past interviews
- **Profile** (`/dashboard/profile`) - User profile and skills
- **Settings** (`/dashboard/settings`) - Preferences and security

## Design System

### Colors
- **Primary**: `#3b82f6` (Blue)
- **Background**: `#0f172a` (Dark)
- **Accent**: `#1e293b` (Slate)
- **Border**: `#334155` (Slate)
- **Muted**: `#64748b` (Gray)

### Typography
- **Sans**: Geist (via next/font)
- **Mono**: Geist Mono (via next/font)
- **Line Height**: 1.6 for body text

### Components
All components use Tailwind CSS with semantic design tokens. Layouts prioritize flexbox for most cases, CSS Grid for complex 2D layouts.

## Key Features Implemented

### Interview Session
- Real-time timer with visual indicators
- Split-screen layout with progress sidebar
- Voice recording interface with waveform animation
- Question navigation
- Smooth transitions between questions

### AI Feedback
- Overall performance scoring
- Radar charts for skill breakdown
- Performance trends visualization
- Strength and improvement area cards
- AI-generated recommendations
- Export and share options

### Analytics Dashboard
- Score trend line charts
- Skill performance radar
- Interview type comparison
- Weekly activity heatmap
- Statistical cards with trends
- Time range filtering

### Dashboard Home
- Interview streak counter
- Recent sessions list
- Performance analytics cards
- AI recommendations
- Quick start button
- Welcome onboarding for new users

## Command Palette

Press `⌘K` (Mac) or `Ctrl+K` (Windows/Linux) to open the command palette for quick navigation:
- Dashboard
- Start Interview
- Analytics
- History
- Profile
- Settings

## Mock Data

The application includes realistic mock data in `/lib/mock-data.ts`:
- User profiles with statistics
- Interview history with scores
- Performance analytics
- Questions database by category

This enables full UI/UX development without backend dependencies.

## Performance Optimizations

- Framer Motion for smooth 60fps animations
- Recharts optimized for large datasets
- Lazy loading of dashboard components
- Image optimization with Next.js
- CSS-in-JS via Tailwind for minimal bundle

## Accessibility

- Semantic HTML elements
- ARIA labels on interactive components
- Keyboard navigation support
- High contrast dark theme
- Screen reader friendly loading states

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Real AI interview backend integration
- User authentication with Supabase
- Persistent database with PostgreSQL
- Real-time interview recording
- Video feedback playback
- Team/company analytics
- Interview scheduling
- Payment integration for premium features

## Deployment

Ready to deploy on Vercel:

```bash
# Push to GitHub
git push origin main

# Deploy on Vercel
vercel
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@prepflow.app or open an issue on GitHub.

---

Built with passion for interview preparation. Good luck with your interviews! 🚀

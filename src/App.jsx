import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Upload, 
  BarChart3, 
  Map, 
  Users, 
  Target, 
  Calendar,
  TrendingUp,
  Settings,
  FileText,
  Bot
} from 'lucide-react'
import Dashboard from './views/Dashboard'
import ProfileUpload from './views/ProfileUpload'
import Analytics from './views/Analytics'
import JobMarket from './views/JobMarket'
import SimilarProfiles from './views/SimilarProfiles'
import PathPlanner from './views/PathPlanner'
import Timeline from './views/Timeline'
import Agent from './views/Agent'
import Waitlist from './components/Waitlist'

function App() {
  const [showWaitlist, setShowWaitlist] = useState(true)
  const [activeView, setActiveView] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Handle navigation events from child components
  useEffect(() => {
    const handleNavigate = (e) => {
      setActiveView(e.detail)
    }
    window.addEventListener('navigate', handleNavigate)
    return () => window.removeEventListener('navigate', handleNavigate)
  }, [])

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agent', label: 'AI Agent', icon: Bot },
    { id: 'upload', label: 'Upload Profile', icon: Upload },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'job-market', label: 'Job Market', icon: Map },
    { id: 'profiles', label: 'Similar Profiles', icon: Users },
    { id: 'paths', label: 'Path Planner', icon: Target },
    { id: 'timeline', label: 'Timeline', icon: Calendar },
  ]

  const views = {
    dashboard: Dashboard,
    agent: Agent,
    upload: ProfileUpload,
    analytics: Analytics,
    'job-market': JobMarket,
    profiles: SimilarProfiles,
    paths: PathPlanner,
    timeline: Timeline,
  }

  const CurrentView = views[activeView] || Dashboard

  // Show waitlist page by default
  if (showWaitlist) {
    return <Waitlist />
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: sidebarOpen ? 0 : -280 }}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="bg-black/90 backdrop-blur-xl border-r border-white/10 flex flex-col"
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold"
              >
                OutcomesOS
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </button>
            )
          })}
        </nav>

        {/* User section */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 border-t border-white/10"
          >
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-blue-500" />
              <div className="flex-1">
                <div className="text-sm font-semibold">Maya Chen</div>
                <div className="text-xs text-white/60">High School Junior</div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-black/50 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="w-5 h-5 flex flex-col gap-1">
                <div className="h-0.5 bg-white rounded" />
                <div className="h-0.5 bg-white rounded" />
                <div className="h-0.5 bg-white rounded" />
              </div>
            </button>
            <h1 className="text-xl font-semibold">
              {menuItems.find((m) => m.id === activeView)?.label || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <CurrentView />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default App

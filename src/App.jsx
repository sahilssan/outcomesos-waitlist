import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Bot,
} from "lucide-react";
import Dashboard from "./views/Dashboard";
import ProfileUpload from "./views/ProfileUpload";
import Analytics from "./views/Analytics";
import JobMarket from "./views/JobMarket";
import SimilarProfiles from "./views/SimilarProfiles";
import PathPlanner from "./views/PathPlanner";
import Timeline from "./views/Timeline";
import Agent from "./views/Agent";
import Waitlist from "./components/Waitlist";

function App() {
  const [showWaitlist, setShowWaitlist] = useState(true);
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Handle navigation events from child components
  useEffect(() => {
    const handleNavigate = (e) => {
      setActiveView(e.detail);
      setShowWaitlist(false);
    };

    window.addEventListener("navigate", handleNavigate);
    return () => window.removeEventListener("navigate", handleNavigate);
  }, []);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "agent", label: "AI Agent", icon: Bot },
    { id: "upload", label: "Upload Profile", icon: Upload },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "job-market", label: "Job Market", icon: Map },
    { id: "profiles", label: "Similar Profiles", icon: Users },
    { id: "paths", label: "Path Planner", icon: Target },
    { id: "timeline", label: "Timeline", icon: Calendar },
  ];

  const views = {
    dashboard: Dashboard,
    agent: Agent,
    upload: ProfileUpload,
    analytics: Analytics,
    "job-market": JobMarket,
    profiles: SimilarProfiles,
    paths: PathPlanner,
    timeline: Timeline,
  };

  const CurrentView = views[activeView] || Dashboard;

  // Waitlist screen (default)
  if (showWaitlist) {
    return <Waitlist />;
  }

  // Main app shell
  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } border-r border-slate-800 flex flex-col transition-all duration-200`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
          <span className="font-semibold text-sm">OutcomeOS</span>
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="text-xs text-slate-400"
          >
            {sidebarOpen ? "<" : ">"}
          </button>
        </div>
        <nav className="flex-1 py-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm ${
                  active
                    ? "bg-slate-900 text-emerald-400"
                    : "text-slate-300 hover:bg-slate-900/60"
                }`}
              >
                <Icon className="w-4 h-4" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="h-full"
          >
            <CurrentView />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;

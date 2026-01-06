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

import { useForm, ValidationError } from "@formspree/react";

import Dashboard from "./views/Dashboard";
import ProfileUpload from "./views/ProfileUpload";
import Analytics from "./views/Analytics";
import JobMarket from "./views/JobMarket";
import SimilarProfiles from "./views/SimilarProfiles";
import PathPlanner from "./views/PathPlanner";
import Timeline from "./views/Timeline";
import Agent from "./views/Agent";

function WaitlistForm() {
  const [state, handleSubmit] = useForm("mjgkqzwr");

  if (state.succeeded) {
    return (
      <p className="mt-4 text-sm text-emerald-400 text-center">
        You’re on the OutcomeOS waitlist. We’ll email you as we roll out.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 max-w-md w-full mt-6"
    >
      <label htmlFor="email" className="block text-sm font-medium">
        Email
      </label>
      <input
        id="email"
        type="email"
        name="email"
        required
        placeholder="you@school.edu"
        className="w-full rounded-md border border-slate-700 bg-black px-3 py-2 text-sm"
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <label htmlFor="stage" className="block text-xs text-slate-400">
        Where are you in the journey? (optional)
      </label>
      <input
        id="stage"
        type="text"
        name="stage"
        placeholder="HS junior → aiming for Berkeley CS, SWE at big tech"
        className="w-full rounded-md border border-slate-800 bg-black px-3 py-2 text-xs"
      />
      <ValidationError field="stage" errors={state.errors} />

      <button
        type="submit"
        disabled={state.submitting}
        className="mt-2 w-full rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400 disabled:opacity-60"
      >
        Get early access
      </button>
    </form>
  );
}

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
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl md:text-5xl font-semibold mb-3 text-center">
          OutcomeOS is your career operating system.
        </h1>
        <p className="text-sm md:text-base text-slate-300 mb-2 max-w-xl text-center">
          For ambitious students and families making high‑stakes decisions.
        </p>
        <p className="text-xs md:text-sm text-slate-400 max-w-xl text-center">
          Built on real admissions and career outcome data to turn your goals
          into a living plan and concrete actions.
        </p>

        <WaitlistForm />

        <p className="mt-3 text-[11px] text-slate-500 text-center">
          No spam. We’ll only email when the planner and automations are ready
          for your grade and goals.
        </p>

        <button
          onClick={() => setShowWaitlist(false)}
          className="mt-6 text-xs text-slate-500 underline"
        >
          Skip to product preview
        </button>
      </div>
    );
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

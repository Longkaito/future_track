import { Routes, Route, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Moon, SunMedium, Compass, GraduationCap, Menu, User, X, Bot, MessageCircle, MessageSquare } from "lucide-react";
import Home from "./pages/Home.jsx";
import Chatbot from "./pages/Chatbot.jsx";
import Simulation from "./pages/Simulation.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Portfolio from "./pages/Portfolio";
import { motion, AnimatePresence } from "framer-motion";
import RequireAuth from "./components/RequireAuth.jsx";

function ThemeToggle() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "cupcake"
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => {
    setTheme((t) => (t === "dracula" ? "cupcake" : "dracula"));
  };

  return (
    <button className="btn btn-ghost btn-circle" onClick={toggle} aria-label="Toggle theme">
      <SunMedium className="hidden sm:inline-block" />
      <Moon className="sm:hidden" />
    </button>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const linkBase = "text-lg font-semibold py-4 w-full text-center";
  const linkActive = "bg-primary text-primary-content";

  return (
    <div className="navbar bg-gradient-to-b from-primary to-base-100 sticky top-0 z-50">
      <div className="container relative flex items-center justify-between">
        {/* Hamburger icon - mobile only */}
        <button
          className="btn btn-ghost btn-circle"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>
        {/* Logo - luôn căn giữa */}
        <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex-1 flex justify-center">
          <NavLink to="/" className="text-xl font-bold">Future Track</NavLink>
        </div>
        {/* Theme toggle - mobile only */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
      {/* Fullscreen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 bg-gradient-to-b from-primary to-base-100/95 backdrop-blur flex flex-col"
          >
            <div className="flex justify-start p-4">
              <button
                className="btn btn-ghost btn-circle"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>
            <nav className="flex flex-col items-center gap-2 mt-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : "hover:bg-base-200"} rounded-xl`
                }
                onClick={() => setOpen(false)}
              >
                <Compass size={20} className="inline mr-2" />
                Trang chủ
              </NavLink>
              <NavLink
                to="/chatbot"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : "hover:bg-base-200"} rounded-xl`
                }
                onClick={() => setOpen(false)}
              >
                <Bot size={20} className="inline mr-2" />
                Chatbot
              </NavLink>
              <NavLink
                to="/simulation"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : "hover:bg-base-200"} rounded-xl`
                }
                onClick={() => setOpen(false)}
              >
                <GraduationCap size={20} className="inline mr-2" />
                Mô phỏng
              </NavLink>
              <NavLink
                to="/portfolio"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : "hover:bg-base-200"} rounded-xl`
                }
                onClick={() => setOpen(false)}
              >
                <span className="inline mr-2">📁</span>
                Portfolio
              </NavLink>
              
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : "hover:bg-base-200"} rounded-xl`
                }
                onClick={() => setOpen(false)}
              >
                <User size={20} className="inline mr-2" />
                Hồ sơ
              </NavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/chatbot"
            element={
              <RequireAuth>
                <Chatbot />
              </RequireAuth>
            }
          />
          <Route
            path="/simulation"
            element={
              <RequireAuth>
                <Simulation />
              </RequireAuth>
            }
          />
          <Route
            path="/portfolio"
            element={
              <RequireAuth>
                <Portfolio />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
        </Routes>
      </main>
      <footer className="container pb-10 text-sm text-base-content/70">
        <div className="divider"></div>
        <p>© {new Date().getFullYear()} Future Track — Định hướng nghề nghiệp thời 4.0</p>
      </footer>
    </div>
  );
}

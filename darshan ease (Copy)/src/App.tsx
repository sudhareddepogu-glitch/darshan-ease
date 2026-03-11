import { useState, useEffect } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { UserDashboard } from "./components/UserDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { TempleSearchScreen } from "./components/TempleSearchScreen";
import { Toaster } from "./components/ui/sonner";
import { Temple, temples } from "./data/temples";
import { Language } from "./data/translations";
import { motion, AnimatePresence } from "motion/react";

interface AuthState {
  isAuthenticated: boolean;
  role: "user" | "admin" | null;
  userId: string;
  userName: string;
}

export default function App() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    role: null,
    userId: "",
    userName: "",
  });
  const [language, setLanguage] = useState<Language>("en");
  const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null);
  const [showSearchScreen, setShowSearchScreen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Check for saved auth and temple data
  useEffect(() => {
    const savedAuth = localStorage.getItem("darshanease-auth");
    if (savedAuth) {
      const auth = JSON.parse(savedAuth);
      setAuthState(auth);
    }

    const savedTempleId = localStorage.getItem("darshanease-selected-temple");
    if (savedTempleId) {
      const temple = temples.find(t => t.id === savedTempleId);
      if (temple) {
        setSelectedTemple(temple);
      }
    }
  }, []);

  const handleLogin = (role: "user" | "admin", userData: { id: string; name: string }) => {
    const auth: AuthState = {
      isAuthenticated: true,
      role,
      userId: userData.id,
      userName: userData.name,
    };
    setAuthState(auth);
    localStorage.setItem("darshanease-auth", JSON.stringify(auth));

    // For users, show temple search screen
    if (role === "user") {
      setShowSearchScreen(true);
    }
  };

  const handleLogout = () => {
    setAuthState({
      isAuthenticated: false,
      role: null,
      userId: "",
      userName: "",
    });
    setSelectedTemple(null);
    setShowSearchScreen(false);
    localStorage.removeItem("darshanease-auth");
    localStorage.removeItem("darshanease-selected-temple");
  };

  const handleSelectTemple = (temple: Temple) => {
    setIsTransitioning(true);
    if (temple) {
      localStorage.setItem("darshanease-selected-temple", temple.id);
    }
    
    setTimeout(() => {
      setSelectedTemple(temple);
      setShowSearchScreen(false);
      setIsTransitioning(false);
    }, 800);
  };

  // Show login screen if not authenticated
  if (!authState.isAuthenticated) {
    return (
      <>
        <LoginScreen onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  // Show loading transition
  if (isTransitioning) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-6xl mb-4"
          >
            🕉️
          </motion.div>
          <h2 className="mb-2">Loading Temple Dashboard...</h2>
          <p className="text-muted-foreground">Preparing your spiritual journey</p>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard
  if (authState.role === "admin") {
    return (
      <>
        <AdminDashboard
          selectedTemple={selectedTemple}
          onLogout={handleLogout}
          userName={authState.userName}
        />
        <Toaster />
      </>
    );
  }

  // User flow - Show temple search screen if no temple selected
  if (showSearchScreen || !selectedTemple) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TempleSearchScreen onSelectTemple={handleSelectTemple} />
        </motion.div>
      </AnimatePresence>
    );
  }

  // User Dashboard
  return (
    <>
      <UserDashboard
        selectedTemple={selectedTemple}
        onSelectTemple={handleSelectTemple}
        language={language}
        onLanguageChange={setLanguage}
        onLogout={handleLogout}
        userName={authState.userName}
      />
      <Toaster />
    </>
  );
}

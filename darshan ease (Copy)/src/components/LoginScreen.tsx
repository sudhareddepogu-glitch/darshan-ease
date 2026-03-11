import { useState } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface LoginScreenProps {
  onLogin: (role: "user" | "admin", userData: LoginData) => void;
}

interface LoginData {
  id: string;
  name: string;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"user" | "admin">("user");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId || !password) {
      toast.error("Please enter both User ID and Password");
      return;
    }

    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      // Mock authentication logic
      if (selectedRole === "admin") {
        if (userId === "admin" && password === "admin123") {
          toast.success("Welcome, Temple Administrator!");
          onLogin("admin", { id: userId, name: "Temple Administrator" });
        } else {
          toast.error("Invalid admin credentials. Try: admin / admin123");
          setIsLoading(false);
        }
      } else {
        if (password.length >= 6) {
          toast.success(`Welcome, ${userId}!`);
          onLogin("user", { id: userId, name: userId });
        } else {
          toast.error("Invalid credentials. Password must be at least 6 characters.");
          setIsLoading(false);
        }
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1744979324655-520e1be34f4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlyaXR1YWwlMjB0ZW1wbGUlMjBzaWxob3VldHRlfGVufDF8fHx8MTc2MTUzMTQ5M3ww&ixlib=rb-4.1.0&q=80&w=1080')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/90 via-red-900/85 to-purple-900/90 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="text-6xl mb-4"
            >
              🕉️
            </motion.div>
            <h1 className="text-2xl md:text-3xl mb-2 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              DarshanEase Login Portal
            </h1>
            <p className="text-muted-foreground">
              Welcome to your spiritual journey
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm mb-3">Select Your Role</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedRole("user")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedRole === "user"
                    ? "border-orange-500 bg-orange-50 dark:bg-orange-950/30"
                    : "border-gray-200 dark:border-gray-700 hover:border-orange-300"
                }`}
              >
                <div className="text-3xl mb-2">👤</div>
                <div className="text-sm">User</div>
                <div className="text-xs text-muted-foreground">Devotee</div>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole("admin")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedRole === "admin"
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-950/30"
                    : "border-gray-200 dark:border-gray-700 hover:border-purple-300"
                }`}
              >
                <div className="text-3xl mb-2">🛠️</div>
                <div className="text-sm">Admin</div>
                <div className="text-xs text-muted-foreground">Authority</div>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* User ID */}
            <div>
              <label className="block text-sm mb-2">
                {selectedRole === "admin" ? "Admin ID" : "User ID"}
              </label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder={selectedRole === "admin" ? "Enter admin ID" : "Enter your user ID"}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => toast.info("Please contact temple administration for password reset")}
                className="text-sm text-orange-600 dark:text-orange-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg transition-all ${
                selectedRole === "admin"
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                  : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                <span>Login as {selectedRole === "admin" ? "Admin" : "User"}</span>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-dashed">
            <p className="text-xs mb-2">Demo Credentials:</p>
            <p className="text-xs text-muted-foreground mb-1">
              <span className="font-medium">User:</span> Any ID + 6+ char password
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Admin:</span> admin / admin123
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-white/80 text-sm mt-6">
          🙏 May your spiritual journey be blessed
        </p>
      </motion.div>
    </div>
  );
}

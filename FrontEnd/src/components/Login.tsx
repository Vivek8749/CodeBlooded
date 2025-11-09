import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface LoginProps {
  onNavigateBack: () => void;
  onNavigateToSignup: () => void;
  isDark: boolean;
}

export function Login({ onNavigateBack, onNavigateToSignup, isDark }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password });
  };

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 ${isDark ? 'bg-[#020402]' : 'bg-gradient-to-br from-[#A9C5A0] via-[#C5EFCB] to-[#FFD166]'}`} />
        
        {/* Floating Orbs - Subtle */}
        <motion.div
          className={`absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl ${isDark ? 'bg-[#F4B400]/8' : 'bg-[#F4B400]/30'}`}
          animate={{
            y: [0, 40, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className={`absolute bottom-20 left-20 w-80 h-80 rounded-full blur-3xl ${isDark ? 'bg-[#FF7F50]/8' : 'bg-[#FF7F50]/30'}`}
          animate={{
            y: [0, -30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Back Button */}
      <button
        onClick={onNavigateBack}
        className={`absolute top-6 left-6 z-50 p-3 rounded-full backdrop-blur-xl ${
          isDark 
            ? 'bg-[#1A1F1A]/70 hover:bg-[#3A463A]/70 border-[#3A463A]/50' 
            : 'bg-white/40 hover:bg-white/60 border-white/60 shadow-[0_8px_32px_0_rgba(169,197,160,0.2)]'
        } border transition-all duration-300 group relative overflow-hidden`}
      >
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-white/5 to-transparent' 
            : 'bg-gradient-to-br from-white/60 to-transparent'
        }`} />
        <ArrowLeft className={`w-5 h-5 ${isDark ? 'text-[#C5EFCB]' : 'text-[#758173]'} group-hover:translate-x-[-2px] transition-transform relative z-10`} />
      </button>

      {/* Theme toggle removed from this page (moved to Header) */}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`w-full max-w-md p-8 rounded-3xl backdrop-blur-2xl ${
            isDark 
              ? 'bg-[#1A1F1A]/60 border-[#3A463A]/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]' 
              : 'bg-white/30 border-white/60 shadow-[0_8px_32px_0_rgba(169,197,160,0.37)]'
          } border relative overflow-hidden`}
        >
          {/* Glass shine effect */}
          <div className={`absolute inset-0 ${
            isDark 
              ? 'bg-gradient-to-br from-white/5 via-transparent to-transparent' 
              : 'bg-gradient-to-br from-white/80 via-white/40 to-transparent'
          } pointer-events-none`} />
          
          {/* Content wrapper */}
          <div className="relative z-10">
            {/* Logo/Title */}
            <div className="text-center mb-8">
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`text-4xl mb-2 ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}
              >
                Sign In
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}
              >
                Welcome back! Sign in to continue
              </motion.p>
            </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Label htmlFor="email" className={`${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                Email
              </Label>
              <div className="relative mt-2 group">
                <div className={`absolute inset-0 rounded-lg backdrop-blur-md ${
                  isDark 
                    ? 'bg-gradient-to-br from-[#1A1F1A]/60 to-[#020402]/40 border-[#3A463A]/50' 
                    : 'bg-gradient-to-br from-white/50 to-white/30 border-white/60'
                } border transition-all duration-300 group-focus-within:${
                  isDark ? 'border-[#FFD166]/50' : 'border-[#F4B400]'
                }`} />
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-[#758173]' : 'text-[#F4B400]'} z-20`} />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-10 relative z-10 bg-transparent border-transparent ${
                    isDark 
                      ? 'text-[#C5EFCB] placeholder:text-[#758173]' 
                      : 'text-[#020402] placeholder:text-[#758173]/60'
                  } focus:ring-2 ${isDark ? 'focus:ring-[#FFD166]/30' : 'focus:ring-[#F4B400]/30'}`}
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Label htmlFor="password" className={`${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                Password
              </Label>
              <div className="relative mt-2 group">
                <div className={`absolute inset-0 rounded-lg backdrop-blur-md ${
                  isDark 
                    ? 'bg-gradient-to-br from-[#1A1F1A]/60 to-[#020402]/40 border-[#3A463A]/50' 
                    : 'bg-gradient-to-br from-white/50 to-white/30 border-white/60'
                } border transition-all duration-300 group-focus-within:${
                  isDark ? 'border-[#FFD166]/50' : 'border-[#F4B400]'
                }`} />
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-[#758173]' : 'text-[#F4B400]'} z-20`} />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-10 pr-10 relative z-10 bg-transparent border-transparent ${
                    isDark 
                      ? 'text-[#C5EFCB] placeholder:text-[#758173]' 
                      : 'text-[#020402] placeholder:text-[#758173]/60'
                  } focus:ring-2 ${isDark ? 'focus:ring-[#FFD166]/30' : 'focus:ring-[#F4B400]/30'}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-[#758173] hover:text-[#C5EFCB]' : 'text-[#758173] hover:text-[#020402]'} transition-colors z-20`}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center justify-between"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className={`rounded ${
                    isDark 
                      ? 'border-[#3A463A] text-[#F4B400] focus:ring-[#FFD166]/50' 
                      : 'border-[#A9C5A0] text-[#F4B400] focus:ring-[#F4B400]/50'
                  }`}
                />
                <span className={`${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className={`${isDark ? 'text-[#F4B400] hover:text-[#FFD166]' : 'text-[#FF7F50] hover:text-[#F4B400]'} transition-colors`}
              >
                Forgot password?
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                type="submit"
                className={`w-full py-6 rounded-full ${
                  isDark 
                    ? 'bg-[#F4B400] hover:bg-[#FFD166] text-[#020402]' 
                    : 'bg-gradient-to-r from-[#F4B400] to-[#FF7F50] hover:from-[#FFD166] hover:to-[#FF7F50] text-[#020402]'
                } transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group`}
              >
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </motion.div>
          </form>

          {/* Sign Up Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-6 text-center"
          >
            <p className={`${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={onNavigateToSignup}
                className={`${isDark ? 'text-[#F4B400] hover:text-[#FFD166]' : 'text-[#FF7F50] hover:text-[#F4B400]'} transition-colors underline`}
              >
                Sign up
              </button>
            </p>
          </motion.div>

          {/* Social Login */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${isDark ? 'border-[#3A463A]' : 'border-[#A9C5A0]/50'}`} />
              </div>
              <div className="relative flex justify-center">
                <span className={`px-4 backdrop-blur-xl ${
                  isDark 
                    ? 'bg-[#1A1F1A]/60 text-[#758173]' 
                    : 'bg-white/30 text-[#020402]/70'
                }`}>
                  or continue with
                </span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className={`backdrop-blur-xl relative overflow-hidden group ${
                  isDark 
                    ? 'bg-[#1A1F1A]/40 hover:bg-[#1A1F1A]/60 border-[#3A463A]/50 text-[#C5EFCB]' 
                    : 'bg-white/30 hover:bg-white/50 border-white/60 text-[#020402]'
                } transition-all duration-300`}
              >
                <div className={`absolute inset-0 ${
                  isDark 
                    ? 'bg-gradient-to-br from-white/5 to-transparent' 
                    : 'bg-gradient-to-br from-white/60 to-transparent'
                } pointer-events-none`} />
                <span className="relative z-10">Google</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                className={`backdrop-blur-xl relative overflow-hidden group ${
                  isDark 
                    ? 'bg-[#1A1F1A]/40 hover:bg-[#1A1F1A]/60 border-[#3A463A]/50 text-[#C5EFCB]' 
                    : 'bg-white/30 hover:bg-white/50 border-white/60 text-[#020402]'
                } transition-all duration-300`}
              >
                <div className={`absolute inset-0 ${
                  isDark 
                    ? 'bg-gradient-to-br from-white/5 to-transparent' 
                    : 'bg-gradient-to-br from-white/60 to-transparent'
                } pointer-events-none`} />
                <span className="relative z-10">GitHub</span>
              </Button>
            </div>
          </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

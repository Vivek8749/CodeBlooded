import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, Menu, X, User, Bell, Search } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
  isAuthenticated?: boolean;
  onNavigate?: (page: string) => void;
}

export function Header({ isDark, toggleTheme, isAuthenticated = false, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = isAuthenticated 
    ? [
        { label: "Dashboard", value: "dashboard" },
        { label: "Rides", value: "rides" },
        { label: "Food Orders", value: "food" },
        { label: "My Bookings", value: "bookings" },
      ]
    : [
        { label: "Features", value: "features" },
        { label: "How It Works", value: "how-it-works" },
        { label: "About", value: "about" },
      ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4`}
    >
      <div className={`max-w-7xl mx-auto rounded-2xl backdrop-blur-xl ${
        isDark 
          ? 'bg-[#1A1F1A]/60 border-[#3A463A]/50' 
          : 'bg-white/30 border-white/60'
      } border shadow-lg relative overflow-hidden`}>
        {/* Glass shine effect */}
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-white/5 via-transparent to-transparent' 
            : 'bg-gradient-to-br from-white/80 via-white/40 to-transparent'
        } pointer-events-none`} />
        
        <div className="relative z-10 flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate?.("home")}
          >
            <div className={`w-10 h-10 rounded-full ${
              isDark 
                ? 'bg-gradient-to-br from-[#F4B400] to-[#FFD166]' 
                : 'bg-gradient-to-br from-[#F4B400] to-[#FF7F50]'
            } flex items-center justify-center shadow-lg`}>
              <span className="text-[#020402]">R</span>
            </div>
            <span className={`text-xl ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
              RideN'Byte
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onNavigate?.(item.value)}
                className={`${
                  isDark ? 'text-[#C5EFCB] hover:text-[#F4B400]' : 'text-[#020402] hover:text-[#FF7F50]'
                } transition-colors duration-300 relative group`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${
                  isDark ? 'bg-[#F4B400]' : 'bg-[#FF7F50]'
                } transition-all duration-300 group-hover:w-full`} />
              </button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <>
                {/* Search Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`hidden md:flex p-2 rounded-full backdrop-blur-md ${
                    isDark 
                      ? 'bg-[#020402]/40 hover:bg-[#3A463A]/60 border-[#3A463A]/50' 
                      : 'bg-white/40 hover:bg-white/60 border-white/60'
                  } border transition-all duration-300`}
                >
                  <Search className={`w-5 h-5 ${isDark ? 'text-[#C5EFCB]' : 'text-[#758173]'}`} />
                </motion.button>

                {/* Notifications */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`hidden md:flex p-2 rounded-full backdrop-blur-md ${
                    isDark 
                      ? 'bg-[#020402]/40 hover:bg-[#3A463A]/60 border-[#3A463A]/50' 
                      : 'bg-white/40 hover:bg-white/60 border-white/60'
                  } border transition-all duration-300 relative`}
                >
                  <Bell className={`w-5 h-5 ${isDark ? 'text-[#C5EFCB]' : 'text-[#758173]'}`} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF7F50] rounded-full text-white text-xs flex items-center justify-center">
                    3
                  </span>
                </motion.button>

                {/* Profile */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`hidden md:flex p-2 rounded-full backdrop-blur-md ${
                    isDark 
                      ? 'bg-[#020402]/40 hover:bg-[#3A463A]/60 border-[#3A463A]/50' 
                      : 'bg-white/40 hover:bg-white/60 border-white/60'
                  } border transition-all duration-300`}
                >
                  <User className={`w-5 h-5 ${isDark ? 'text-[#C5EFCB]' : 'text-[#758173]'}`} />
                </motion.button>
              </>
            )}

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-2 rounded-full backdrop-blur-md ${
                isDark 
                  ? 'bg-[#020402]/40 hover:bg-[#3A463A]/60 border-[#3A463A]/50' 
                  : 'bg-white/40 hover:bg-white/60 border-white/60'
              } border transition-all duration-300`}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-[#F4B400]" />
              ) : (
                <Moon className="w-5 h-5 text-[#758173]" />
              )}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-full backdrop-blur-md ${
                isDark 
                  ? 'bg-[#020402]/40 hover:bg-[#3A463A]/60 border-[#3A463A]/50' 
                  : 'bg-white/40 hover:bg-white/60 border-white/60'
              } border transition-all duration-300`}
            >
              {isMobileMenuOpen ? (
                <X className={`w-5 h-5 ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`} />
              ) : (
                <Menu className={`w-5 h-5 ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden mt-4 rounded-2xl backdrop-blur-xl ${
              isDark 
                ? 'bg-[#1A1F1A]/90 border-[#3A463A]/50' 
                : 'bg-white/50 border-white/60'
            } border shadow-lg overflow-hidden`}
          >
            <div className="p-4 space-y-3">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    onNavigate?.(item.value);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg ${
                    isDark 
                      ? 'text-[#C5EFCB] hover:bg-[#3A463A]/30' 
                      : 'text-[#020402] hover:bg-white/40'
                  } transition-colors duration-300`}
                >
                  {item.label}
                </motion.button>
              ))}
              
              {isAuthenticated && (
                <div className="pt-3 border-t border-[#3A463A]/30 space-y-3">
                  <button
                    className={`w-full text-left px-4 py-3 rounded-lg ${
                      isDark 
                        ? 'text-[#C5EFCB] hover:bg-[#3A463A]/30' 
                        : 'text-[#020402] hover:bg-white/40'
                    } transition-colors duration-300 flex items-center gap-3`}
                  >
                    <Search className="w-5 h-5" />
                    Search
                  </button>
                  <button
                    className={`w-full text-left px-4 py-3 rounded-lg ${
                      isDark 
                        ? 'text-[#C5EFCB] hover:bg-[#3A463A]/30' 
                        : 'text-[#020402] hover:bg-white/40'
                    } transition-colors duration-300 flex items-center gap-3`}
                  >
                    <Bell className="w-5 h-5" />
                    Notifications
                    <span className="ml-auto w-5 h-5 bg-[#FF7F50] rounded-full text-white text-xs flex items-center justify-center">
                      3
                    </span>
                  </button>
                  <button
                    className={`w-full text-left px-4 py-3 rounded-lg ${
                      isDark 
                        ? 'text-[#C5EFCB] hover:bg-[#3A463A]/30' 
                        : 'text-[#020402] hover:bg-white/40'
                    } transition-colors duration-300 flex items-center gap-3`}
                  >
                    <User className="w-5 h-5" />
                    Profile
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

import { Button } from "./button"
import { motion } from "motion/react"
import { Moon, Sun, Home } from "lucide-react"

interface HeaderProps {
  isDark: boolean
  toggleTheme: () => void
  onSignInClick: () => void
  onHomeClick: () => void
}

export function Header({ isDark, toggleTheme, onSignInClick, onHomeClick }: HeaderProps) {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-6 py-6 ${
      isDark ? 'bg-[#1A1F1A]/80' : 'bg-white/80'
    } backdrop-blur-md border-b ${
      isDark ? 'border-[#3A463A]' : 'border-[#A9C5A0]/50'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={`text-2xl font-semibold ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
            Riden'Byte
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          {/* Home Button */}
          <Button
            variant="ghost"
            onClick={onHomeClick}
            className={`${
              isDark
                ? 'text-[#C5EFCB] hover:bg-[#3A463A]/50'
                : 'text-[#020402] hover:bg-[#A9C5A0]/20'
            } transition-colors`}
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </Button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              isDark 
                ? 'hover:bg-[#3A463A]/70' 
                : 'hover:bg-[#A9C5A0]/20'
            } transition-colors`}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-[#F4B400]" />
            ) : (
              <Moon className="w-5 h-5 text-[#758173]" />
            )}
          </button>

          {/* Sign In Button */}
          <Button
            variant="outline"
            onClick={onSignInClick}
            className={`${
              isDark
                ? 'border-[#3A463A] hover:bg-[#3A463A]/50 text-[#C5EFCB]'
                : 'border-[#A9C5A0] hover:bg-[#A9C5A0]/20 text-[#020402]'
            } transition-colors text-base px-6 py-2`}
          >
            Sign In
          </Button>
        </motion.div>
      </div>
    </header>
  )
}
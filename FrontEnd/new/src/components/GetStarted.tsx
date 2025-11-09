import { motion } from "motion/react";
import { Car, UtensilsCrossed, Users, Sparkles, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

interface GetStartedProps {
  onNavigateToLogin: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export function GetStarted({ onNavigateToLogin, isDark, toggleTheme }: GetStartedProps) {
  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 ${isDark ? 'bg-[#020402]' : 'bg-gradient-to-br from-[#A9C5A0] via-[#C5EFCB] to-[#FFD166]'}`} />
        
        {/* Floating Orbs */}
        <motion.div
          className={`absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl ${isDark ? 'bg-[#F4B400]/10' : 'bg-[#F4B400]/40'}`}
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className={`absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl ${isDark ? 'bg-[#FF7F50]/10' : 'bg-[#FF7F50]/40'}`}
          animate={{
            y: [0, -40, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className={`absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl ${isDark ? 'bg-[#1A1F1A]/50' : 'bg-white/60'}`}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`absolute top-6 right-6 z-50 p-3 rounded-full backdrop-blur-md ${
          isDark ? 'bg-[#1A1F1A] hover:bg-[#3A463A]' : 'bg-white/80 hover:bg-white shadow-lg'
        } border ${isDark ? 'border-[#3A463A]' : 'border-[#A9C5A0]/50'} transition-all duration-300`}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-[#F4B400]" />
        ) : (
          <Moon className="w-5 h-5 text-[#758173]" />
        )}
      </button>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {/* Logo/Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block mb-4"
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md ${
              isDark ? 'bg-[#1A1F1A]' : 'bg-white/90 shadow-lg'
            } border ${isDark ? 'border-[#3A463A]' : 'border-[#FF7F50]/30'}`}>
              <Sparkles className={`w-5 h-5 ${isDark ? 'text-[#F4B400]' : 'text-[#FF7F50]'}`} />
              <span className={`${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>Welcome to the Future</span>
            </div>
          </motion.div>
          
          <h1 className={`text-6xl md:text-8xl mb-4 ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402] drop-shadow-sm'}`}>
            Riden'Byte
          </h1>
          <p className={`text-xl md:text-2xl ${isDark ? 'text-[#758173]' : 'text-[#020402]/80'} max-w-2xl mx-auto`}>
            Share rides, split meals, save money. <br />
            The smart way for students to connect.
          </p>
        </motion.div>

        {/* Features Grid with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mb-12"
        >
          {[
            {
              icon: Car,
              title: "Shared Rides",
              description: "Find or create rides to the same destination",
              delay: 0.3,
            },
            {
              icon: UtensilsCrossed,
              title: "Food Orders",
              description: "Split delivery costs with fellow students",
              delay: 0.4,
            },
            {
              icon: Users,
              title: "Live Chat",
              description: "Stay connected with group messaging",
              delay: 0.5,
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`p-6 rounded-2xl backdrop-blur-lg ${
                isDark 
                  ? 'bg-[#1A1F1A] border-[#3A463A]' 
                  : 'bg-white/80 border-white shadow-2xl'
              } border`}
            >
              <div className={`w-12 h-12 rounded-full ${
                isDark ? 'bg-[#F4B400]/20' : 'bg-gradient-to-br from-[#F4B400] to-[#FF7F50]'
              } flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 ${isDark ? 'text-[#F4B400]' : 'text-white'}`} />
              </div>
              <h3 className={`mb-2 ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                {feature.title}
              </h3>
              <p className={`${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            onClick={onNavigateToLogin}
            className={`px-8 py-6 rounded-full ${
              isDark 
                ? 'bg-[#F4B400] hover:bg-[#FFD166] text-[#020402]' 
                : 'bg-[#F4B400] hover:bg-[#FFD166] text-[#020402]'
            } transition-all duration-300 shadow-lg hover:shadow-2xl`}
          >
            Get Started
          </Button>
          <Button
            onClick={onNavigateToLogin}
            variant="outline"
            className={`px-8 py-6 rounded-full backdrop-blur-md ${
              isDark 
                ? 'bg-[#1A1F1A] hover:bg-[#3A463A] border-[#3A463A] text-[#C5EFCB]' 
                : 'bg-[#C6DEC6] hover:bg-[#A9C5A0] border-[#758173]/40 text-[#020402]'
            } transition-all duration-300`}
          >
            Learn More
          </Button>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className={`mt-16 grid grid-cols-3 gap-8 max-w-3xl w-full p-6 rounded-2xl backdrop-blur-lg ${
            isDark 
              ? 'bg-[#1A1F1A] border-[#3A463A]' 
              : 'bg-white/80 border-white shadow-2xl'
          } border`}
        >
          {[
            { number: "500+", label: "Active Users" },
            { number: "1000+", label: "Rides Shared" },
            { number: "50%", label: "Avg. Savings" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-3xl md:text-4xl mb-1 bg-gradient-to-r ${
                isDark 
                  ? 'from-[#F4B400] to-[#FFD166]' 
                  : 'from-[#F4B400] to-[#FF7F50]'
              } bg-clip-text text-transparent`}>
                {stat.number}
              </div>
              <div className={`${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

import { motion } from "motion/react";
import { UtensilsCrossed, Car, ArrowRight } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DashboardProps {
  isDark: boolean;
  toggleTheme: () => void;
  onNavigateToFood: () => void;
  onNavigateToRide: () => void;
}

export function Dashboard({ isDark, toggleTheme, onNavigateToFood, onNavigateToRide }: DashboardProps) {
  return (
    <div className="min-h-screen w-full overflow-hidden relative flex flex-col">
      {/* Header */}
      <Header isDark={isDark} toggleTheme={toggleTheme} isAuthenticated={true} />
      
      <div className="flex-1 relative">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className={`absolute inset-0 ${isDark ? 'bg-[#020402]' : 'bg-gradient-to-br from-[#A9C5A0] via-[#C5EFCB] to-[#FFD166]'}`} />
          
          {/* Floating Orbs */}
          <motion.div
            className={`absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl ${isDark ? 'bg-[#F4B400]/10' : 'bg-[#F4B400]/30'}`}
            animate={{
              y: [0, 50, 0],
              x: [0, 30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl ${isDark ? 'bg-[#FF7F50]/10' : 'bg-[#FF7F50]/30'}`}
            animate={{
              y: [0, -40, 0],
              x: [0, -25, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 px-6 pt-32 pb-12 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className={`text-5xl md:text-6xl mb-4 ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
              What would you like to share?
            </h1>
            <p className={`text-xl ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
              Choose a category to get started
            </p>
          </motion.div>

          {/* Two Main Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* FOOD SECTION */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -10 }}
              onClick={onNavigateToFood}
              className={`relative rounded-3xl backdrop-blur-xl overflow-hidden cursor-pointer group ${
                isDark 
                  ? 'bg-[#1A1F1A]/60 border-[#3A463A]/50' 
                  : 'bg-white/30 border-white/60'
              } border shadow-2xl`}
            >
              {/* Glass shine effect */}
              <div className={`absolute inset-0 ${
                isDark 
                  ? 'bg-gradient-to-br from-white/5 via-transparent to-transparent' 
                  : 'bg-gradient-to-br from-white/80 via-white/40 to-transparent'
              } pointer-events-none z-10`} />
              
              {/* 3D Food Image */}
              <div className="relative h-80 overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1676620202330-5dc47b4d126a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMGZvb2QlMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzYyNjk1MTgzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="3D Food"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-20 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`p-4 rounded-2xl bg-gradient-to-br from-[#F4B400] to-[#FFD166] shadow-lg`}
                  >
                    <UtensilsCrossed className="w-8 h-8 text-white" />
                  </motion.div>
                  <h2 className={`text-4xl ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                    Food Orders
                  </h2>
                </div>
                
                <p className={`text-lg mb-6 ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                  Split delivery costs with students ordering from the same restaurant. Save money and reduce waste together.
                </p>

                <div className={`flex items-center gap-2 ${isDark ? 'text-[#F4B400]' : 'text-[#FF7F50]'} group-hover:gap-4 transition-all`}>
                  <span className="text-lg">Explore Food Groups</span>
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>

              {/* Hover Glow Effect */}
              <motion.div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  isDark 
                    ? 'bg-gradient-to-t from-[#F4B400]/20 to-transparent' 
                    : 'bg-gradient-to-t from-[#F4B400]/30 to-transparent'
                }`}
                style={{ pointerEvents: 'none' }}
              />
            </motion.div>

            {/* RIDE SECTION */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02, y: -10 }}
              onClick={onNavigateToRide}
              className={`relative rounded-3xl backdrop-blur-xl overflow-hidden cursor-pointer group ${
                isDark 
                  ? 'bg-[#1A1F1A]/60 border-[#3A463A]/50' 
                  : 'bg-white/30 border-white/60'
              } border shadow-2xl`}
            >
              {/* Glass shine effect */}
              <div className={`absolute inset-0 ${
                isDark 
                  ? 'bg-gradient-to-br from-white/5 via-transparent to-transparent' 
                  : 'bg-gradient-to-br from-white/80 via-white/40 to-transparent'
              } pointer-events-none z-10`} />
              
              {/* 3D Car Image */}
              <div className="relative h-80 overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1691884454133-66724c33710e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXIlMjBtb2Rlcm58ZW58MXx8fHwxNzYyNjk1MTg0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="3D Car"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-20 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`p-4 rounded-2xl bg-gradient-to-br from-[#FF7F50] to-[#FFD166] shadow-lg`}
                  >
                    <Car className="w-8 h-8 text-white" />
                  </motion.div>
                  <h2 className={`text-4xl ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                    Shared Rides
                  </h2>
                </div>
                
                <p className={`text-lg mb-6 ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                  Find students traveling to the same destination. Share rides, split costs, and make your commute more affordable.
                </p>

                <div className={`flex items-center gap-2 ${isDark ? 'text-[#FF7F50]' : 'text-[#F4B400]'} group-hover:gap-4 transition-all`}>
                  <span className="text-lg">Explore Ride Groups</span>
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>

              {/* Hover Glow Effect */}
              <motion.div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  isDark 
                    ? 'bg-gradient-to-t from-[#FF7F50]/20 to-transparent' 
                    : 'bg-gradient-to-t from-[#FF7F50]/30 to-transparent'
                }`}
                style={{ pointerEvents: 'none' }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer isDark={isDark} />
    </div>
  );
}

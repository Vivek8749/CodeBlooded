import { motion } from "motion/react";
import { useState } from "react";
import { 
  Search, 
  MapPin, 
  Clock, 
  Users, 
  DollarSign,
  Filter,
  ArrowLeft,
  Car,
  Navigation,
  Star
} from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface RideSearchProps {
  isDark: boolean;
  toggleTheme: () => void;
  onNavigateBack: () => void;
  onNavigateToDetail: () => void;
  onNavigateToCreateRide?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToFoodSearch?: () => void;
}

export function RideSearch({ isDark, toggleTheme, onNavigateBack, onNavigateToDetail, onNavigateToCreateRide, onNavigateToDashboard, onNavigateToFoodSearch }: RideSearchProps) {
  const handleNavigate = (page: string) => {
    if (page === 'dashboard') {
      onNavigateToDashboard?.();
    } else if (page === 'rides') {
      // Already on rides page, do nothing
    } else if (page === 'food') {
      onNavigateToFoodSearch?.();
    }
  };
  const [originQuery, setOriginQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");

  // Mock data for available rides
  const availableRides = [
    {
      id: 1,
      from: "Campus Main Gate",
      to: "Downtown Mall",
      distance: "8.5 km",
      currentPassengers: 2,
      maxPassengers: 4,
      estimatedCost: "$5",
      originalCost: "$12",
      departureTime: "4:30 PM",
      image: "https://images.unsplash.com/photo-1582849960485-69f186a876ea?w=400",
      rating: 4.7,
      carModel: "Honda Civic"
    },
    {
      id: 2,
      from: "North Dorms",
      to: "Airport",
      distance: "25 km",
      currentPassengers: 1,
      maxPassengers: 3,
      estimatedCost: "$15",
      originalCost: "$45",
      departureTime: "6:00 AM",
      image: "https://images.unsplash.com/photo-1691884454133-66724c33710e?w=400",
      rating: 4.9,
      carModel: "Tesla Model 3"
    },
    {
      id: 3,
      from: "Library",
      to: "Train Station",
      distance: "12 km",
      currentPassengers: 1,
      maxPassengers: 3,
      estimatedCost: "$7",
      originalCost: "$18",
      departureTime: "2:15 PM",
      image: "https://images.unsplash.com/photo-1667489011603-79c111e53127?w=400",
      rating: 4.5,
      carModel: "Toyota Camry"
    },
    {
      id: 4,
      from: "Campus Center",
      to: "Beach Area",
      distance: "18 km",
      currentPassengers: 2,
      maxPassengers: 4,
      estimatedCost: "$10",
      originalCost: "$25",
      departureTime: "3:00 PM",
      image: "https://images.unsplash.com/photo-1748463692019-dbfe6dd12612?w=400",
      rating: 4.8,
      carModel: "BMW 3 Series"
    },
  ];

  const filteredRides = availableRides.filter(ride =>
    (originQuery === "" || ride.from.toLowerCase().includes(originQuery.toLowerCase())) &&
    (destinationQuery === "" || ride.to.toLowerCase().includes(destinationQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex flex-col">
      {/* Header */}
      <Header isDark={isDark} toggleTheme={toggleTheme} isAuthenticated={true} onNavigate={handleNavigate} />
      
      <div className="flex-1 relative">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className={`absolute inset-0 ${isDark ? 'bg-[#020402]' : 'bg-gradient-to-br from-[#A9C5A0] via-[#C5EFCB] to-[#FFD166]'}`} />
          
          {/* Floating Orbs */}
          <motion.div
            className={`absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl ${isDark ? 'bg-[#FF7F50]/10' : 'bg-[#FF7F50]/30'}`}
            animate={{
              y: [0, -50, 0],
              x: [0, -30, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 px-6 pt-32 pb-12 max-w-7xl mx-auto">
          {/* Back Button & Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Button
              onClick={onNavigateBack}
              variant="ghost"
              className={`mb-4 ${isDark ? 'text-[#C5EFCB] hover:bg-[#1A1F1A]' : 'text-[#020402] hover:bg-white/30'}`}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>
            
            <div className="flex items-center gap-4 mb-2">
              <div className={`p-3 rounded-2xl bg-gradient-to-br from-[#FF7F50] to-[#FFD166]`}>
                <Car className="w-8 h-8 text-white" />
              </div>
              <h1 className={`text-4xl md:text-5xl ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                Find Shared Rides
              </h1>
            </div>
            <p className={`${isDark ? 'text-[#758173]' : 'text-[#020402]/70'} text-lg`}>
              Join existing rides or offer your own
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`mb-8 p-6 rounded-2xl backdrop-blur-xl ${
              isDark 
                ? 'bg-[#1A1F1A]/60 border-[#3A463A]/50' 
                : 'bg-white/30 border-white/60'
            } border shadow-lg`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Origin Search */}
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <MapPin className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-[#FF7F50]' : 'text-[#F4B400]'}`} />
                <Input
                  type="text"
                  placeholder="Enter origin..."
                  value={originQuery}
                  onChange={(e) => setOriginQuery(e.target.value)}
                  className={`pl-12 h-12 rounded-xl ${
                    isDark 
                      ? 'bg-[#020402]/50 border-[#3A463A] text-[#C5EFCB] placeholder:text-[#758173]' 
                      : 'bg-white/50 border-white text-[#020402] placeholder:text-[#020402]/50'
                  }`}
                />
              </motion.div>

              {/* Destination Search */}
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Navigation className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-[#F4B400]' : 'text-[#FF7F50]'}`} />
                <Input
                  type="text"
                  placeholder="Enter destination..."
                  value={destinationQuery}
                  onChange={(e) => setDestinationQuery(e.target.value)}
                  className={`pl-12 h-12 rounded-xl ${
                    isDark 
                      ? 'bg-[#020402]/50 border-[#3A463A] text-[#C5EFCB] placeholder:text-[#758173]' 
                      : 'bg-white/50 border-white text-[#020402] placeholder:text-[#020402]/50'
                  }`}
                />
              </motion.div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                className={`w-full h-12 rounded-xl ${
                  isDark 
                    ? 'bg-gradient-to-r from-[#FF7F50] to-[#FFD166] hover:from-[#FFD166] hover:to-[#FF7F50] text-white' 
                    : 'bg-gradient-to-r from-[#FF7F50] to-[#F4B400] text-white'
                }`}
              >
                <Search className="w-5 h-5 mr-2" />
                Search Rides
              </Button>
            </motion.div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6"
          >
            <p className={`${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
              {filteredRides.length} available rides
            </p>
          </motion.div>

          {/* Rides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRides.map((ride, index) => (
              <motion.div
                key={ride.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.4 + index * 0.1,
                  type: "spring",
                  stiffness: 100 
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className={`rounded-2xl backdrop-blur-xl ${
                  isDark 
                    ? 'bg-[#1A1F1A]/60 border-[#3A463A]/50' 
                    : 'bg-white/30 border-white/60'
                } border shadow-lg overflow-hidden cursor-pointer group relative`}
              >
                {/* Glass shine effect */}
                <motion.div 
                  className={`absolute inset-0 ${
                    isDark 
                      ? 'bg-gradient-to-br from-white/5 via-transparent to-transparent' 
                      : 'bg-gradient-to-br from-white/80 via-white/40 to-transparent'
                  } pointer-events-none`}
                  initial={{ opacity: 0.5 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 2 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <ImageWithFallback
                      src={ride.image}
                      alt={ride.carModel}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Seats Available Badge */}
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full backdrop-blur-md ${
                      isDark ? 'bg-[#FF7F50]/90' : 'bg-[#FF7F50]'
                    } text-white text-sm shadow-lg`}
                  >
                    {ride.maxPassengers - ride.currentPassengers} seats left
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-5 relative">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className={`text-xl ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                      {ride.carModel}
                    </h3>
                    <motion.div 
                      className="flex items-center gap-1"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Star className="w-4 h-4 fill-[#F4B400] text-[#F4B400]" />
                      <span className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                        {ride.rating}
                      </span>
                    </motion.div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <motion.div 
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <motion.div
                        animate={{ 
                          y: [0, -3, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <MapPin className={`w-4 h-4 mt-1 flex-shrink-0 ${isDark ? 'text-[#F4B400]' : 'text-[#FF7F50]'}`} />
                      </motion.div>
                      <div className="flex-1">
                        <p className={`text-sm ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                          {ride.from}
                        </p>
                        <div className="flex items-center gap-2 my-1">
                          <motion.div 
                            className={`w-full h-px ${isDark ? 'bg-[#3A463A]' : 'bg-[#020402]/20'}`}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                          />
                          <motion.div
                            animate={{ 
                              x: [0, 3, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <Navigation className={`w-3 h-3 flex-shrink-0 ${isDark ? 'text-[#758173]' : 'text-[#020402]/50'}`} />
                          </motion.div>
                        </div>
                        <p className={`text-sm ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                          {ride.to}
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center justify-between pt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Clock className={`w-4 h-4 ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`} />
                        </motion.div>
                        <span className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                          {ride.departureTime}
                        </span>
                      </div>
                      <span className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                        {ride.distance}
                      </span>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <Users className={`w-4 h-4 ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`} />
                      <span className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                        {ride.currentPassengers}/{ride.maxPassengers} passengers
                      </span>
                    </motion.div>
                  </div>

                  <motion.div 
                    className="flex items-center justify-between pt-4 border-t border-opacity-20" 
                    style={{
                      borderColor: isDark ? '#3A463A' : '#020402'
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'} line-through`}>
                        {ride.originalCost}
                      </p>
                      <p className={`text-2xl ${isDark ? 'text-[#FF7F50]' : 'text-[#F4B400]'}`}>
                        {ride.estimatedCost}
                      </p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        onClick={onNavigateToDetail}
                        className={`rounded-full shadow-md ${
                          isDark 
                            ? 'bg-gradient-to-r from-[#FF7F50] to-[#FFD166] hover:from-[#FFD166] hover:to-[#FF7F50] text-white' 
                            : 'bg-gradient-to-r from-[#FF7F50] to-[#F4B400] text-white'
                        }`}
                      >
                        Join Ride
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Create New Ride Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                onClick={onNavigateToCreateRide}
                className={`rounded-full px-8 py-6 text-lg shadow-lg ${
                  isDark 
                    ? 'bg-gradient-to-r from-[#FF7F50] to-[#FFD166] hover:from-[#FFD166] hover:to-[#FF7F50] text-white' 
                    : 'bg-gradient-to-r from-[#FF7F50] to-[#F4B400] text-white'
                }`}
              >
                <Car className="w-5 h-5 mr-2" />
                Create a New Ride
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer isDark={isDark} />
    </div>
  );
}

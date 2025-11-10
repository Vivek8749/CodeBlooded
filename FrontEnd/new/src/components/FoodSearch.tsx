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
  UtensilsCrossed,
  Star
} from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface FoodSearchProps {
  isDark: boolean;
  toggleTheme: () => void;
  onNavigateBack: () => void;
  onNavigateToDetail: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToRideSearch?: () => void;
  onNavigateToCreateFood?: () => void;
}

export function FoodSearch({ isDark, toggleTheme, onNavigateBack, onNavigateToDetail, onNavigateToDashboard, onNavigateToRideSearch, onNavigateToCreateFood }: FoodSearchProps) {
  const handleNavigate = (page: string) => {
    if (page === 'dashboard') {
      onNavigateToDashboard?.();
    } else if (page === 'rides') {
      onNavigateToRideSearch?.();
    } else if (page === 'food') {
      // Already on food page, do nothing
    }
  };
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for available food orders
  const availableFoodOrders = [
    {
      id: 1,
      restaurant: "Pizza Palace",
      cuisine: "Italian",
      destination: "Campus Dorms",
      currentMembers: 3,
      maxMembers: 5,
      estimatedCost: "$8",
      originalCost: "$15",
      deliveryTime: "6:30 PM",
      image: "https://images.unsplash.com/photo-1626842514556-057dbce0379d?w=400",
      rating: 4.5,
      organizer: "Sarah M."
    },
    {
      id: 2,
      restaurant: "Sushi World",
      cuisine: "Japanese",
      destination: "North Campus",
      currentMembers: 2,
      maxMembers: 4,
      estimatedCost: "$12",
      originalCost: "$20",
      deliveryTime: "7:00 PM",
      image: "https://images.unsplash.com/photo-1621871908119-295c8ce5cee4?w=400",
      rating: 4.8,
      organizer: "Mike T."
    },
    {
      id: 3,
      restaurant: "Burger Haven",
      cuisine: "American",
      destination: "Main Building",
      currentMembers: 4,
      maxMembers: 6,
      estimatedCost: "$6",
      originalCost: "$12",
      deliveryTime: "5:45 PM",
      image: "https://images.unsplash.com/photo-1747207323834-fe2faaa0b119?w=400",
      rating: 4.3,
      organizer: "Alex K."
    },
    {
      id: 4,
      restaurant: "Thai Spice",
      cuisine: "Thai",
      destination: "Library Area",
      currentMembers: 1,
      maxMembers: 4,
      estimatedCost: "$10",
      originalCost: "$18",
      deliveryTime: "6:15 PM",
      image: "https://images.unsplash.com/photo-1604967593834-cfd33202d88e?w=400",
      rating: 4.6,
      organizer: "Emma L."
    },
  ];

  const filteredOrders = availableFoodOrders.filter(order =>
    searchQuery === "" ||
    order.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.destination.toLowerCase().includes(searchQuery.toLowerCase())
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
            className={`absolute top-40 left-20 w-96 h-96 rounded-full blur-3xl ${isDark ? 'bg-[#F4B400]/10' : 'bg-[#F4B400]/30'}`}
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
              <div className={`p-3 rounded-2xl bg-gradient-to-br from-[#F4B400] to-[#FFD166]`}>
                <UtensilsCrossed className="w-8 h-8 text-white" />
              </div>
              <h1 className={`text-4xl md:text-5xl ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                Find Food Orders
              </h1>
            </div>
            <p className={`${isDark ? 'text-[#758173]' : 'text-[#020402]/70'} text-lg`}>
              Join existing food orders or create your own
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
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-[#758173]' : 'text-[#020402]/50'}`} />
                <Input
                  type="text"
                  placeholder="Search by restaurant, cuisine, or destination..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-12 h-12 rounded-xl ${
                    isDark 
                      ? 'bg-[#020402]/50 border-[#3A463A] text-[#C5EFCB] placeholder:text-[#758173]' 
                      : 'bg-white/50 border-white text-[#020402] placeholder:text-[#020402]/50'
                  }`}
                />
              </div>
              <Button
                className={`h-12 px-6 rounded-xl ${
                  isDark 
                    ? 'bg-[#3A463A] hover:bg-[#3A463A]/80 text-[#C5EFCB]' 
                    : 'bg-white/60 hover:bg-white/80 text-[#020402]'
                }`}
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6"
          >
            <p className={`${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
              {filteredOrders.length} available food orders
            </p>
          </motion.div>

          {/* Food Orders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
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
                      src={order.image}
                      alt={order.restaurant}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Spots Available Badge */}
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full backdrop-blur-md ${
                      isDark ? 'bg-[#F4B400]/90' : 'bg-[#F4B400]'
                    } text-white text-sm shadow-lg`}
                  >
                    {order.maxMembers - order.currentMembers} spots left
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-5 relative">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className={`text-xl mb-1 ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                        {order.restaurant}
                      </h3>
                      <Badge variant="secondary" className={`${
                        isDark ? 'bg-[#3A463A] text-[#C5EFCB]' : 'bg-white/50 text-[#020402]'
                      }`}>
                        {order.cuisine}
                      </Badge>
                    </div>
                    <motion.div 
                      className="flex items-center gap-1"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Star className="w-4 h-4 fill-[#F4B400] text-[#F4B400]" />
                      <span className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                        {order.rating}
                      </span>
                    </motion.div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className={`w-4 h-4 ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`} />
                      <span className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                        {order.destination}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className={`w-4 h-4 ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`} />
                      <span className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                        Delivery: {order.deliveryTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className={`w-4 h-4 ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`} />
                      <span className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                        {order.currentMembers}/{order.maxMembers} members
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-opacity-20" style={{
                    borderColor: isDark ? '#3A463A' : '#020402'
                  }}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'} line-through`}>
                        {order.originalCost}
                      </p>
                      <p className={`text-2xl ${isDark ? 'text-[#F4B400]' : 'text-[#FF7F50]'}`}>
                        {order.estimatedCost}
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
                            ? 'bg-gradient-to-r from-[#F4B400] to-[#FFD166] hover:from-[#FFD166] hover:to-[#F4B400] text-[#020402]' 
                            : 'bg-gradient-to-r from-[#F4B400] to-[#FF7F50] text-white'
                        }`}
                      >
                        Join Order
                      </Button>
                    </motion.div>
                  </div>

                  <p className={`text-xs mt-3 ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                    Organized by {order.organizer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Create New Order Button */}
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
                onClick={onNavigateToCreateFood}
                className={`rounded-full px-8 py-6 text-lg shadow-lg ${
                  isDark 
                    ? 'bg-gradient-to-r from-[#F4B400] to-[#FFD166] hover:from-[#FFD166] hover:to-[#F4B400] text-[#020402]' 
                    : 'bg-gradient-to-r from-[#F4B400] to-[#FF7F50] text-white'
                }`}
              >
                <UtensilsCrossed className="w-5 h-5 mr-2" />
                Create New Food Order
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

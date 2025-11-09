import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { 
  ArrowLeft,
  Send,
  MapPin,
  Clock,
  Users,
  DollarSign,
  UtensilsCrossed,
  Navigation,
  User,
  Phone,
  Star,
  Package,
  Bike,
  TrendingUp,
  CheckCircle2
} from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface FoodDetailProps {
  isDark: boolean;
  toggleTheme: () => void;
  onNavigateBack: () => void;
  orderDetails?: any;
  onNavigateToDashboard?: () => void;
  onNavigateToRideSearch?: () => void;
  onNavigateToFoodSearch?: () => void;
}

export function FoodDetail({ isDark, toggleTheme, onNavigateBack, orderDetails, onNavigateToDashboard, onNavigateToRideSearch, onNavigateToFoodSearch }: FoodDetailProps) {
  const handleNavigate = (page: string) => {
    if (page === 'dashboard') {
      onNavigateToDashboard?.();
    } else if (page === 'rides') {
      onNavigateToRideSearch?.();
    } else if (page === 'food') {
      onNavigateToFoodSearch?.();
    }
  };
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "Sarah", text: "Hi everyone! I'm organizing this order from Pizza Palace.", time: "11:30 AM", isOwn: false },
    { id: 2, sender: "You", text: "Awesome! What time is the delivery?", time: "11:32 AM", isOwn: true },
    { id: 3, sender: "Sarah", text: "We're ordering at 6:00 PM, delivery should arrive by 6:30 PM.", time: "11:33 AM", isOwn: false },
    { id: 4, sender: "Mike", text: "Perfect timing! Can't wait!", time: "11:35 AM", isOwn: false },
  ]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [deliveryProgress, setDeliveryProgress] = useState(0);
  const [deliveryStage, setDeliveryStage] = useState<'preparing' | 'ready' | 'picked-up' | 'delivering'>('preparing');

  // Simulate delivery tracking progress
  useEffect(() => {
    const interval = setInterval(() => {
      setDeliveryProgress((prev) => {
        const newProgress = prev >= 100 ? 0 : prev + 0.4;
        
        if (newProgress < 25) setDeliveryStage('preparing');
        else if (newProgress < 35) setDeliveryStage('ready');
        else if (newProgress < 45) setDeliveryStage('picked-up');
        else setDeliveryStage('delivering');
        
        return newProgress;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Mock food order details
  const foodDetails = orderDetails || {
    restaurant: "Pizza Palace",
    cuisine: "Italian",
    destination: "Campus Dorms",
    deliveryTime: "6:30 PM",
    estimatedPrep: "30 mins",
    currentMembers: 3,
    maxMembers: 5,
    costPerPerson: "$8",
    originalCost: "$15",
    organizer: "Sarah M.",
    organizerRating: 4.8,
    organizerPhone: "+1 (555) 987-6543",
    items: ["Large Pepperoni Pizza", "Garlic Bread", "Caesar Salad"]
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "You",
          text: message,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: true
        }
      ]);
      setMessage("");
    }
  };

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
        <div className="relative z-10 px-6 pt-32 pb-12 max-w-[1800px] mx-auto h-[calc(100vh-80px)]">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Button
              onClick={onNavigateBack}
              variant="ghost"
              className={`${isDark ? 'text-[#C5EFCB] hover:bg-[#1A1F1A]' : 'text-[#020402] hover:bg-white/30'}`}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Search
            </Button>
          </motion.div>

          {/* Three Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100%-60px)]">
            {/* LEFT SECTION - Group Chat */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`lg:col-span-1 rounded-2xl backdrop-blur-xl ${
                isDark 
                  ? 'bg-[#1A1F1A]/60 border-[#3A463A]/50' 
                  : 'bg-white/30 border-white/60'
              } border shadow-lg overflow-hidden flex flex-col`}
            >
              {/* Chat Header */}
              <div className={`p-4 border-b ${isDark ? 'border-[#3A463A]' : 'border-white/40'}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl bg-gradient-to-br from-[#F4B400] to-[#FFD166]`}>
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-lg ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                      Group Chat
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                      {foodDetails.currentMembers} members
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${msg.isOwn ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                        {!msg.isOwn && (
                          <span className={`text-xs ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                            {msg.sender}
                          </span>
                        )}
                        <div
                          className={`px-4 py-2 rounded-2xl ${
                            msg.isOwn
                              ? isDark
                                ? 'bg-gradient-to-r from-[#F4B400] to-[#FFD166] text-[#020402]'
                                : 'bg-gradient-to-r from-[#F4B400] to-[#FF7F50] text-white'
                              : isDark
                              ? 'bg-[#020402]/50 text-[#C5EFCB]'
                              : 'bg-white/50 text-[#020402]'
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                        </div>
                        <span className={`text-xs ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                          {msg.time}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className={`p-4 border-t ${isDark ? 'border-[#3A463A]' : 'border-white/40'}`}>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className={`flex-1 ${
                      isDark 
                        ? 'bg-[#020402]/50 border-[#3A463A] text-[#C5EFCB] placeholder:text-[#758173]' 
                        : 'bg-white/50 border-white text-[#020402] placeholder:text-[#020402]/50'
                    }`}
                  />
                  <Button
                    onClick={handleSendMessage}
                    className={`${
                      isDark 
                        ? 'bg-gradient-to-r from-[#F4B400] to-[#FFD166] hover:from-[#FFD166] hover:to-[#F4B400] text-[#020402]' 
                        : 'bg-gradient-to-r from-[#F4B400] to-[#FF7F50] text-white'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SECTION - Details and Map */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* UPPER RIGHT - Food Order Details */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`rounded-2xl backdrop-blur-xl ${
                  isDark 
                    ? 'bg-[#1A1F1A]/60 border-[#3A463A]/50' 
                    : 'bg-white/30 border-white/60'
                } border shadow-lg p-6 flex-shrink-0`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br from-[#F4B400] to-[#FFD166]`}>
                    <UtensilsCrossed className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className={`text-2xl ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                      Order Details
                    </h2>
                    <Badge className={`mt-1 ${
                      isDark ? 'bg-[#3A463A] text-[#C5EFCB]' : 'bg-white/50 text-[#020402]'
                    }`}>
                      {foodDetails.cuisine}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Restaurant & Delivery Information */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <UtensilsCrossed className={`w-5 h-5 mt-1 ${isDark ? 'text-[#F4B400]' : 'text-[#FF7F50]'}`} />
                      <div className="flex-1">
                        <p className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>Restaurant</p>
                        <p className={`${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>{foodDetails.restaurant}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className={`w-5 h-5 mt-1 ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`} />
                      <div className="flex-1">
                        <p className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>Delivery To</p>
                        <p className={`${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>{foodDetails.destination}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className={`w-5 h-5 ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`} />
                      <div className="flex-1">
                        <p className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>Delivery Time</p>
                        <p className={`${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>{foodDetails.deliveryTime}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Package className={`w-5 h-5 mt-1 ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`} />
                      <div className="flex-1">
                        <p className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>Items</p>
                        <ul className={`text-sm ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'} space-y-1`}>
                          {foodDetails.items.map((item: string, index: number) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Organizer & Cost Information */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <User className={`w-5 h-5 mt-1 ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`} />
                      <div className="flex-1">
                        <p className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>Organizer</p>
                        <p className={`${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>{foodDetails.organizer}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 fill-[#F4B400] text-[#F4B400]" />
                          <span className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                            {foodDetails.organizerRating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className={`w-5 h-5 mt-1 ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`} />
                      <div className="flex-1">
                        <p className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>Contact</p>
                        <p className={`${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>{foodDetails.organizerPhone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className={`w-5 h-5 mt-1 ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`} />
                      <div className="flex-1">
                        <p className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>Members</p>
                        <p className={`${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                          {foodDetails.currentMembers}/{foodDetails.maxMembers}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <DollarSign className={`w-5 h-5 mt-1 ${isDark ? 'text-[#F4B400]' : 'text-[#FF7F50]'}`} />
                      <div className="flex-1">
                        <p className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>Cost Per Person</p>
                        <div className="flex items-center gap-2">
                          <p className={`text-2xl ${isDark ? 'text-[#F4B400]' : 'text-[#FF7F50]'}`}>
                            {foodDetails.costPerPerson}
                          </p>
                          <p className={`text-sm line-through ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                            {foodDetails.originalCost}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* LOWER RIGHT - Live Tracking Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`rounded-2xl backdrop-blur-xl ${
                  isDark 
                    ? 'bg-[#1A1F1A]/60 border-[#3A463A]/50' 
                    : 'bg-white/30 border-white/60'
                } border shadow-lg overflow-hidden flex-1 min-h-[400px]`}
              >
                <div className={`p-4 border-b ${isDark ? 'border-[#3A463A]' : 'border-white/40'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-gradient-to-br from-[#F4B400] to-[#FFD166]`}>
                      <Navigation className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-lg ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                        Live Tracking
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                        Real-time delivery updates
                      </p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Satellite-Style Map */}
                <div className="relative h-full min-h-[350px] overflow-hidden">
                  {/* Satellite-Style Background */}
                  <div className="absolute inset-0">
                    {/* Base satellite texture */}
                    <div className={`absolute inset-0 ${
                      isDark 
                        ? 'bg-gradient-to-br from-[#1a2420] via-[#0f1810] to-[#1a2420]' 
                        : 'bg-gradient-to-br from-[#b8d4b8] via-[#d0e8d0] to-[#a8c4a8]'
                    }`} />
                    
                    {/* Grid overlay */}
                    <svg className="w-full h-full absolute inset-0 opacity-30" viewBox="0 0 400 400">
                      <defs>
                        <pattern id="food-grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path 
                            d="M 40 0 L 0 0 0 40" 
                            fill="none" 
                            stroke={isDark ? '#C5EFCB' : '#020402'} 
                            strokeWidth="0.5"
                            opacity="0.3"
                          />
                        </pattern>
                        <pattern id="food-major-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                          <path 
                            d="M 80 0 L 0 0 0 80" 
                            fill="none" 
                            stroke={isDark ? '#C5EFCB' : '#020402'} 
                            strokeWidth="1"
                            opacity="0.5"
                          />
                        </pattern>
                      </defs>
                      <rect width="400" height="400" fill="url(#food-grid-pattern)" />
                      <rect width="400" height="400" fill="url(#food-major-grid)" />
                    </svg>

                    {/* Simulated terrain features */}
                    <svg className="w-full h-full absolute inset-0 opacity-40" viewBox="0 0 400 400">
                      {/* Park/green areas */}
                      <rect x="20" y="120" width="70" height="90" 
                        fill={isDark ? '#1a3a1a' : '#90c090'} 
                        rx="4"
                      />
                      <rect x="300" y="160" width="80" height="70" 
                        fill={isDark ? '#1a3a1a' : '#90c090'} 
                        rx="4"
                      />
                      {/* Buildings/blocks */}
                      <rect x="140" y="170" width="35" height="45" 
                        fill={isDark ? '#2a2a2a' : '#d0d0d0'} 
                        rx="2"
                      />
                      <rect x="190" y="165" width="40" height="50" 
                        fill={isDark ? '#2a2a2a' : '#d0d0d0'} 
                        rx="2"
                      />
                      <rect x="250" y="180" width="30" height="40" 
                        fill={isDark ? '#2a2a2a' : '#d0d0d0'} 
                        rx="2"
                      />
                      {/* Roads - subtle */}
                      <path 
                        d="M 0 180 L 100 185 Q 200 190, 300 195 L 400 200"
                        fill="none"
                        stroke={isDark ? '#3a3a3a' : '#b0b0b0'}
                        strokeWidth="10"
                        opacity="0.6"
                      />
                    </svg>

                    {/* Street names overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className={`absolute left-6 top-1/2 text-xs px-2 py-1 rounded ${
                        isDark ? 'bg-[#020402]/60 text-[#758173]' : 'bg-white/60 text-[#020402]/70'
                      }`}>
                        Broadway
                      </div>
                      <div className={`absolute right-12 top-1/3 text-xs px-2 py-1 rounded ${
                        isDark ? 'bg-[#020402]/60 text-[#758173]' : 'bg-white/60 text-[#020402]/70'
                      }`}>
                        Campus Rd
                      </div>
                    </div>
                  </div>

                  {/* Route and Tracking Layer */}
                  <div className="relative h-full">
                    <svg className="w-full h-full absolute inset-0 px-4 py-4" viewBox="0 0 400 350" preserveAspectRatio="xMidYMid meet">
                      {/* Route background (road) */}
                      <motion.path
                        d="M 60 200 L 120 190 Q 200 180, 250 190 L 320 200 L 340 210"
                        fill="none"
                        stroke={isDark ? '#4a4a4a' : '#c0c0c0'}
                        strokeWidth="16"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.8"
                      />
                      
                      {/* Active route line */}
                      <motion.path
                        d="M 60 200 L 120 190 Q 200 180, 250 190 L 320 200 L 340 210"
                        fill="none"
                        stroke={isDark ? '#F4B400' : '#FF7F50'}
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray="6 6"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: deliveryProgress / 100 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Restaurant - Starting Point */}
                      <motion.g>
                        <circle cx="60" cy="200" r="16" fill={isDark ? '#F4B400' : '#FF7F50'} opacity="0.3"/>
                        <circle cx="60" cy="200" r="11" fill={isDark ? '#F4B400' : '#FF7F50'} />
                        <motion.circle
                          cx="60"
                          cy="200"
                          r="11"
                          fill="none"
                          stroke={isDark ? '#F4B400' : '#FF7F50'}
                          strokeWidth="2"
                          animate={{ r: [11, 20], opacity: [1, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <UtensilsCrossed x={60 - 6} y={200 - 6} className="w-3 h-3" stroke="white" strokeWidth={2} />
                      </motion.g>

                      {/* Waypoint - Pickup confirmation */}
                      <motion.g
                        initial={{ scale: 0 }}
                        animate={{ scale: deliveryStage !== 'preparing' ? 1 : 0.5 }}
                        transition={{ duration: 0.5 }}
                      >
                        <circle 
                          cx="200" 
                          cy="180" 
                          r="7" 
                          fill={deliveryStage !== 'preparing' ? (isDark ? '#F4B400' : '#FF7F50') : (isDark ? '#758173' : '#020402')}
                          opacity={deliveryStage !== 'preparing' ? 1 : 0.3}
                        />
                        {(deliveryStage === 'picked-up' || deliveryStage === 'delivering') && (
                          <CheckCircle2 
                            x={200 - 10} 
                            y={180 - 10} 
                            className="w-5 h-5" 
                            stroke={isDark ? '#F4B400' : '#FF7F50'} 
                            fill={isDark ? '#020402' : 'white'}
                            strokeWidth={2}
                          />
                        )}
                      </motion.g>

                      {/* Destination - Campus Dorms */}
                      <motion.g>
                        <circle cx="340" cy="210" r="16" fill={isDark ? '#FF7F50' : '#F4B400'} opacity="0.3"/>
                        <circle cx="340" cy="210" r="11" fill={isDark ? '#FF7F50' : '#F4B400'} />
                        <motion.circle
                          cx="340"
                          cy="210"
                          r="11"
                          fill="none"
                          stroke={isDark ? '#FF7F50' : '#F4B400'}
                          strokeWidth="2"
                          animate={{ r: [11, 20], opacity: [1, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        />
                        <MapPin x={340 - 6} y={210 - 6} className="w-3 h-3" fill="white" stroke="white" />
                      </motion.g>

                      {/* Moving Delivery Person with Bike */}
                      <motion.g
                        initial={{ x: 60, y: 200 }}
                        animate={{
                          x: deliveryProgress < 40 
                            ? 60 + (140 * (deliveryProgress / 40))
                            : deliveryProgress < 80
                            ? 200 + (120 * ((deliveryProgress - 40) / 40))
                            : 320 + (20 * ((deliveryProgress - 80) / 20)),
                          y: deliveryProgress < 40
                            ? 200 - (10 * (deliveryProgress / 40))
                            : deliveryProgress < 80
                            ? 190 + (10 * ((deliveryProgress - 40) / 40))
                            : 200 + (10 * ((deliveryProgress - 80) / 20))
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Bike shadow */}
                        <ellipse rx="13" ry="6" cy="6" fill="#000" opacity="0.2" />
                        
                        {/* Glow effect */}
                        <circle r="24" fill={isDark ? '#FFD166' : '#F4B400'} opacity="0.12">
                          <animate attributeName="r" values="20;28;20" dur="2s" repeatCount="indefinite" />
                        </circle>
                        
                        {/* Delivery person indicator */}
                        <circle r="13" fill={isDark ? '#FFD166' : '#F4B400'} />
                        <circle r="10" fill="white" opacity="0.95" />
                        
                        {/* Bike icon */}
                        <motion.g
                          animate={deliveryStage === 'delivering' ? { rotate: [0, 3, -3, 0] } : {}}
                          transition={{ duration: 0.5, repeat: deliveryStage === 'delivering' ? Infinity : 0 }}
                        >
                          <Bike 
                            className="w-5 h-5" 
                            style={{ x: -10, y: -10 }} 
                            stroke={isDark ? '#020402' : '#F4B400'} 
                            fill="white"
                            strokeWidth={1.5}
                          />
                        </motion.g>
                      </motion.g>
                    </svg>



                    {/* Location Labels */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between z-20">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`px-3 py-2 rounded-lg backdrop-blur-xl ${
                          isDark ? 'bg-[#F4B400]/30 border-[#F4B400]/40' : 'bg-[#FF7F50]/30 border-[#FF7F50]/40'
                        } border shadow-xl`}
                      >
                        <p className={`text-xs ${isDark ? 'text-[#F4B400]' : 'text-[#FF7F50]'} flex items-center gap-1`}>
                          <UtensilsCrossed className="w-3 h-3" />
                          Restaurant
                        </p>
                        <p className={`text-sm ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                          {foodDetails.restaurant}
                        </p>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`px-3 py-2 rounded-lg backdrop-blur-xl ${
                          isDark ? 'bg-[#FF7F50]/30 border-[#FF7F50]/40' : 'bg-[#F4B400]/30 border-[#F4B400]/40'
                        } border text-right shadow-xl`}
                      >
                        <p className={`text-xs ${isDark ? 'text-[#FF7F50]' : 'text-[#F4B400]'} flex items-center gap-1 justify-end`}>
                          <MapPin className="w-3 h-3" />
                          Delivery
                        </p>
                        <p className={`text-sm ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                          {foodDetails.destination}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer isDark={isDark} />
    </div>
  );
}

import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { 
  ArrowLeft,
  Send,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Car,
  Navigation,
  User,
  Phone,
  Star,
  Gauge,
  TrendingUp
} from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface RideDetailProps {
  isDark: boolean;
  toggleTheme: () => void;
  onNavigateBack: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToRideSearch?: () => void;
  onNavigateToFoodSearch?: () => void;
}

export function RideDetail({ isDark, toggleTheme, onNavigateBack, onNavigateToDashboard, onNavigateToRideSearch, onNavigateToFoodSearch }: RideDetailProps) {
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
    { id: 1, sender: "Jessica", text: "Hey everyone! I'm the driver for today's ride.", time: "10:30 AM", isOwn: false },
    { id: 2, sender: "You", text: "Great! What time are we leaving?", time: "10:32 AM", isOwn: true },
    { id: 3, sender: "Jessica", text: "We'll leave at 4:30 PM sharp from the Campus Main Gate.", time: "10:33 AM", isOwn: false },
    { id: 4, sender: "Mike", text: "Perfect! I'll be there on time.", time: "10:35 AM", isOwn: false },
  ]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(45);

  // Simulate live tracking progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      setCurrentSpeed(40 + Math.random() * 20);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Mock ride details
  const rideDetails = {
    from: "Campus Main Gate",
    to: "Downtown Mall",
    distance: "8.5 km",
    departureTime: "4:30 PM",
    estimatedArrival: "5:00 PM",
    currentPassengers: 2,
    maxPassengers: 4,
    costPerPerson: "$5",
    carModel: "Honda Civic",
    carPlate: "ABC-1234",
    organizer: "Jessica P.",
    organizerRating: 4.7,
    organizerPhone: "+91 98765 43210"
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
        </div>

        {/* Main Content */}
        <div className="relative z-10 px-6 pt-32 pb-20 max-w-[1800px] mx-auto">
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
                  <div className={`p-2 rounded-xl bg-gradient-to-br from-[#FF7F50] to-[#FFD166]`}>
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-lg ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                      Group Chat
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                      {rideDetails.currentPassengers} members
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
                                ? 'bg-gradient-to-r from-[#FF7F50] to-[#FFD166] text-white'
                                : 'bg-gradient-to-r from-[#FF7F50] to-[#F4B400] text-white'
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
                        ? 'bg-gradient-to-r from-[#FF7F50] to-[#FFD166] hover:from-[#FFD166] hover:to-[#FF7F50] text-white' 
                        : 'bg-gradient-to-r from-[#FF7F50] to-[#F4B400] text-white'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SECTION - Details and Map */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* UPPER RIGHT - Ride Details */}
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
                  <div className={`p-3 rounded-2xl bg-gradient-to-br from-[#FF7F50] to-[#FFD166]`}>
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className={`text-2xl ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                      Ride Details
                    </h2>
                    <Badge className={`mt-1 ${
                      isDark ? 'bg-[#3A463A] text-[#C5EFCB]' : 'bg-white/50 text-[#020402]'
                    }`}>
                      {rideDetails.carModel}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Route Information */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className={`w-5 h-5 mt-1 ${isDark ? 'text-[#F4B400]' : 'text-[#FF7F50]'}`} />
                      <div className="flex-1">
                        <p className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>From</p>
                        <p className={`${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>{rideDetails.from}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pl-8">
                      <div className={`w-full h-px ${isDark ? 'bg-[#3A463A]' : 'bg-[#020402]/20'}`} />
                      <Navigation className={`w-4 h-4 ${isDark ? 'text-[#758173]' : 'text-[#020402]/50'}`} />
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className={`w-5 h-5 mt-1 ${isDark ? 'text-[#FF7F50]' : 'text-[#F4B400]'}`} />
                      <div className="flex-1">
                        <p className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>To</p>
                        <p className={`${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>{rideDetails.to}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <Clock className={`w-5 h-5 ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`} />
                      <div className="flex-1">
                        <p className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>Departure</p>
                        <p className={`${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>{rideDetails.departureTime}</p>
                      </div>
                    </div>
                  </div>

                  {/* Organizer & Cost Information */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <User className={`w-5 h-5 mt-1 ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`} />
                      <div className="flex-1">
                        <p className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>Organizer</p>
                        <p className={`${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>{rideDetails.organizer}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 fill-[#F4B400] text-[#F4B400]" />
                          <span className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                            {rideDetails.organizerRating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className={`w-5 h-5 mt-1 ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`} />
                      <div className="flex-1">
                        <p className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>Contact</p>
                        <p className={`${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>{rideDetails.organizerPhone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className={`w-5 h-5 mt-1 ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`} />
                      <div className="flex-1">
                        <p className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>Passengers</p>
                        <p className={`${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                          {rideDetails.currentPassengers}/{rideDetails.maxPassengers}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <DollarSign className={`w-5 h-5 mt-1 ${isDark ? 'text-[#F4B400]' : 'text-[#FF7F50]'}`} />
                      <div className="flex-1">
                        <p className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>Cost Per Person</p>
                        <p className={`text-2xl ${isDark ? 'text-[#FF7F50]' : 'text-[#F4B400]'}`}>
                          {rideDetails.costPerPerson}
                        </p>
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
                        Real-time location updates
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
                        <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path 
                            d="M 40 0 L 0 0 0 40" 
                            fill="none" 
                            stroke={isDark ? '#C5EFCB' : '#020402'} 
                            strokeWidth="0.5"
                            opacity="0.3"
                          />
                        </pattern>
                        <pattern id="major-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                          <path 
                            d="M 80 0 L 0 0 0 80" 
                            fill="none" 
                            stroke={isDark ? '#C5EFCB' : '#020402'} 
                            strokeWidth="1"
                            opacity="0.5"
                          />
                        </pattern>
                      </defs>
                      <rect width="400" height="400" fill="url(#grid-pattern)" />
                      <rect width="400" height="400" fill="url(#major-grid)" />
                    </svg>

                    {/* Simulated terrain features */}
                    <svg className="w-full h-full absolute inset-0 opacity-40" viewBox="0 0 400 400">
                      {/* Park/green areas */}
                      <rect x="30" y="220" width="60" height="80" 
                        fill={isDark ? '#1a3a1a' : '#90c090'} 
                        rx="4"
                      />
                      <rect x="280" y="40" width="80" height="60" 
                        fill={isDark ? '#1a3a1a' : '#90c090'} 
                        rx="4"
                      />
                      {/* Buildings/blocks */}
                      <rect x="150" y="160" width="40" height="50" 
                        fill={isDark ? '#2a2a2a' : '#d0d0d0'} 
                        rx="2"
                      />
                      <rect x="200" y="140" width="30" height="35" 
                        fill={isDark ? '#2a2a2a' : '#d0d0d0'} 
                        rx="2"
                      />
                      <rect x="240" y="150" width="35" height="45" 
                        fill={isDark ? '#2a2a2a' : '#d0d0d0'} 
                        rx="2"
                      />
                      {/* Roads - subtle */}
                      <path 
                        d="M 0 280 Q 80 270, 150 250 L 250 200 Q 320 160, 400 130"
                        fill="none"
                        stroke={isDark ? '#3a3a3a' : '#b0b0b0'}
                        strokeWidth="8"
                        opacity="0.6"
                      />
                    </svg>

                    {/* Street names overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className={`absolute left-4 top-1/3 text-xs px-2 py-1 rounded ${
                        isDark ? 'bg-[#020402]/60 text-[#758173]' : 'bg-white/60 text-[#020402]/70'
                      }`}>
                        Main St
                      </div>
                      <div className={`absolute right-8 top-1/4 text-xs px-2 py-1 rounded ${
                        isDark ? 'bg-[#020402]/60 text-[#758173]' : 'bg-white/60 text-[#020402]/70'
                      }`}>
                        Oak Ave
                      </div>
                    </div>
                  </div>

                  {/* Route and Tracking Layer */}
                  <div className="relative h-full">
                    <svg className="w-full h-full absolute inset-0 px-4 py-4" viewBox="0 0 400 350" preserveAspectRatio="xMidYMid meet">
                      {/* Route background (road) */}
                      <motion.path
                        d="M 60 280 L 100 260 Q 150 240, 180 200 L 220 160 Q 260 120, 300 100 L 340 80"
                        fill="none"
                        stroke={isDark ? '#4a4a4a' : '#c0c0c0'}
                        strokeWidth="18"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.8"
                      />
                      
                      {/* Active route line */}
                      <motion.path
                        d="M 60 280 L 100 260 Q 150 240, 180 200 L 220 160 Q 260 120, 300 100 L 340 80"
                        fill="none"
                        stroke={isDark ? '#FF7F50' : '#F4B400'}
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray="8 8"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: progress / 100 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Start Point Marker */}
                      <motion.g>
                        <circle cx="60" cy="280" r="16" fill={isDark ? '#F4B400' : '#FF7F50'} opacity="0.3"/>
                        <circle cx="60" cy="280" r="11" fill={isDark ? '#F4B400' : '#FF7F50'} />
                        <motion.circle
                          cx="60"
                          cy="280"
                          r="11"
                          fill="none"
                          stroke={isDark ? '#F4B400' : '#FF7F50'}
                          strokeWidth="2"
                          animate={{ r: [11, 20], opacity: [1, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <MapPin x={60 - 6} y={280 - 6} className="w-3 h-3" fill="white" stroke="white" />
                      </motion.g>

                      {/* Waypoints */}
                      <motion.circle
                        cx="180"
                        cy="200"
                        r="5"
                        fill={isDark ? '#758173' : '#020402'}
                        opacity={progress > 30 ? 0.9 : 0.4}
                        animate={progress > 30 ? { scale: [1, 1.5, 1] } : {}}
                        transition={{ duration: 1 }}
                      />
                      <motion.circle
                        cx="260"
                        cy="120"
                        r="5"
                        fill={isDark ? '#758173' : '#020402'}
                        opacity={progress > 60 ? 0.9 : 0.4}
                        animate={progress > 60 ? { scale: [1, 1.5, 1] } : {}}
                        transition={{ duration: 1 }}
                      />

                      {/* End Point Marker */}
                      <motion.g>
                        <circle cx="340" cy="80" r="16" fill={isDark ? '#FF7F50' : '#F4B400'} opacity="0.3"/>
                        <circle cx="340" cy="80" r="11" fill={isDark ? '#FF7F50' : '#F4B400'} />
                        <motion.circle
                          cx="340"
                          cy="80"
                          r="11"
                          fill="none"
                          stroke={isDark ? '#FF7F50' : '#F4B400'}
                          strokeWidth="2"
                          animate={{ r: [11, 20], opacity: [1, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        />
                        <MapPin x={340 - 6} y={80 - 6} className="w-3 h-3" fill="white" stroke="white" />
                      </motion.g>

                      {/* Moving Car with Shadow */}
                      <motion.g
                        initial={{ x: 60, y: 280 }}
                        animate={{
                          x: progress < 30 
                            ? 60 + (120 * (progress / 30))
                            : progress < 70
                            ? 180 + (80 * ((progress - 30) / 40))
                            : 260 + (80 * ((progress - 70) / 30)),
                          y: progress < 30
                            ? 280 - (80 * (progress / 30))
                            : progress < 70
                            ? 200 - (40 * ((progress - 30) / 40))
                            : 160 - (80 * ((progress - 70) / 30))
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Car shadow */}
                        <ellipse rx="12" ry="6" cy="5" fill="#000" opacity="0.2" />
                        
                        {/* Glow effect */}
                        <circle r="22" fill={isDark ? '#FFD166' : '#FF7F50'} opacity="0.15">
                          <animate attributeName="r" values="18;26;18" dur="2s" repeatCount="indefinite" />
                        </circle>
                        
                        {/* Car body */}
                        <circle r="12" fill={isDark ? '#FFD166' : '#FF7F50'} />
                        <circle r="9" fill="white" opacity="0.95" />
                        <Car className="w-5 h-5" style={{ x: -10, y: -10 }} fill={isDark ? '#020402' : '#FFD166'} stroke="white" strokeWidth={1} />
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
                        <p className={`text-xs ${isDark ? 'text-[#F4B400]' : 'text-[#FF7F50]'}`}>
                          Start
                        </p>
                        <p className={`text-sm ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                          {rideDetails.from}
                        </p>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`px-3 py-2 rounded-lg backdrop-blur-xl ${
                          isDark ? 'bg-[#FF7F50]/30 border-[#FF7F50]/40' : 'bg-[#F4B400]/30 border-[#F4B400]/40'
                        } border text-right shadow-xl`}
                      >
                        <p className={`text-xs ${isDark ? 'text-[#FF7F50]' : 'text-[#F4B400]'}`}>
                          Destination
                        </p>
                        <p className={`text-sm ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                          {rideDetails.to}
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
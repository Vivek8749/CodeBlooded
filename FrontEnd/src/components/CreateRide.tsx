import { motion } from "motion/react";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Car,
  Navigation,
  Calendar,
  Bike,
  TrendingUp,
  User,
  Phone,
} from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { createRide } from "../api/ridesApi";

interface CreateRideProps {
  isDark: boolean;
  toggleTheme: () => void;
  onNavigateBack: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToRideSearch?: () => void;
  onNavigateToFoodSearch?: () => void;
}

const vehicleTypes = [
  { value: "bike", label: "Bike", icon: "🏍️", pricePerKm: 3, capacity: 1 },
  {
    value: "auto",
    label: "Auto Rickshaw",
    icon: "🛺",
    pricePerKm: 5,
    capacity: 3,
  },
  {
    value: "car-sedan",
    label: "Car (Sedan)",
    icon: "🚗",
    pricePerKm: 8,
    capacity: 4,
  },
  {
    value: "car-suv",
    label: "Car (SUV)",
    icon: "🚙",
    pricePerKm: 10,
    capacity: 6,
  },
  { value: "van", label: "Van", icon: "🚐", pricePerKm: 12, capacity: 8 },
];

export function CreateRide({
  isDark,
  toggleTheme,
  onNavigateBack,
  onNavigateToDashboard,
  onNavigateToRideSearch,
  onNavigateToFoodSearch,
}: CreateRideProps) {
  const handleNavigate = (page: string) => {
    if (page === "dashboard") {
      onNavigateToDashboard?.();
    } else if (page === "rides") {
      onNavigateToRideSearch?.();
    } else if (page === "food") {
      onNavigateToFoodSearch?.();
    }
  };
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [distance, setDistance] = useState(0);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  // Calculate distance when origin and destination change
  useEffect(() => {
    if (origin && destination) {
      // Simulated distance calculation (in real app, use Google Maps API or similar)
      const randomDistance = Math.random() * 20 + 5; // 5-25 km
      setDistance(parseFloat(randomDistance.toFixed(1)));
    } else {
      setDistance(0);
    }
  }, [origin, destination]);

  // Calculate price when distance or vehicle type changes
  useEffect(() => {
    if (distance > 0 && vehicleType) {
      const selectedVehicle = vehicleTypes.find((v) => v.value === vehicleType);
      if (selectedVehicle) {
        const price = distance * selectedVehicle.pricePerKm;
        setEstimatedPrice(parseFloat(price.toFixed(2)));
      }
    } else {
      setEstimatedPrice(0);
    }
  }, [distance, vehicleType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const selectedVehicle = vehicleTypes.find((v) => v.value === vehicleType);
      if (!selectedVehicle) {
        throw new Error("Please select a vehicle type");
      }

      // Combine date and time into ISO format for expiryTime
      const expiryTime = new Date(
        `${departureDate}T${departureTime}`
      ).toISOString();

      // Create ride data
      const rideData = {
        from: origin,
        to: destination,
        expiryTime: expiryTime,
        maxSeats: selectedVehicle.capacity,
        totalPrice: estimatedPrice,
        vehicleDetails: `${selectedVehicle.label} - ${selectedVehicle.icon}`,
        notes:
          notes ||
          `Organized by ${organizerName}. Contact: ${contactNumber}. Estimated distance: ${distance}km`,
      };

      console.log("Creating ride with data:", rideData);

      // Call the API
      const response = await createRide(rideData);

      console.log("Ride created successfully:", response);

      // Navigate to the ride details page or back to search
      alert("Ride created successfully!");
      onNavigateToRideSearch?.();
    } catch (err: any) {
      console.error("Failed to create ride:", err);
      setError(err.message || "Failed to create ride. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const selectedVehicleData = vehicleTypes.find((v) => v.value === vehicleType);

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex flex-col">
      {/* Header */}
      <Header
        isDark={isDark}
        toggleTheme={toggleTheme}
        isAuthenticated={true}
        onNavigate={handleNavigate}
      />

      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[#020402]"
              : "bg-gradient-to-br from-[#A9C5A0] via-[#C5EFCB] to-[#FFD166]"
          }`}
        />

        {/* Floating Orbs */}
        <motion.div
          className={`absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl ${
            isDark ? "bg-[#F4B400]/10" : "bg-[#F4B400]/30"
          }`}
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
          className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl ${
            isDark ? "bg-[#FF7F50]/10" : "bg-[#FF7F50]/30"
          }`}
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
      <div className="relative z-10 flex-1 px-6 pt-32 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onNavigateBack}
            className={`flex items-center gap-2 mb-8 px-4 py-2 rounded-xl backdrop-blur-xl ${
              isDark
                ? "bg-[#1A1F1A]/60 border-[#3A463A]/50 text-[#C5EFCB] hover:bg-[#1A1F1A]/80"
                : "bg-white/30 border-white/60 text-[#020402] hover:bg-white/50"
            } border transition-all`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Ride Search</span>
          </motion.button>

          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1
              className={`text-4xl md:text-5xl mb-4 ${
                isDark ? "text-[#C5EFCB]" : "text-[#020402]"
              }`}
            >
              Create New Ride
            </h1>
            <p
              className={`text-xl ${
                isDark ? "text-[#758173]" : "text-[#020402]/70"
              }`}
            >
              Share your ride and split costs with other students
            </p>
          </motion.div>

          {/* Form and Map Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`rounded-3xl backdrop-blur-xl p-8 ${
                isDark
                  ? "bg-[#1A1F1A]/60 border-[#3A463A]/50"
                  : "bg-white/30 border-white/60"
              } border shadow-2xl`}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#F4B400] to-[#FFD166]">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <h2
                  className={`text-2xl ${
                    isDark ? "text-[#C5EFCB]" : "text-[#020402]"
                  }`}
                >
                  Ride Details
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Origin */}
                <div className="space-y-2">
                  <Label
                    htmlFor="origin"
                    className={isDark ? "text-[#C5EFCB]" : "text-[#020402]"}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#F4B400]" />
                      Origin
                    </div>
                  </Label>
                  <Input
                    id="origin"
                    type="text"
                    placeholder="e.g., Campus Main Gate"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className={`${
                      isDark
                        ? "bg-[#020402]/40 border-[#3A463A] text-[#C5EFCB] placeholder:text-[#758173]"
                        : "bg-white/50 border-white/60 text-[#020402] placeholder:text-[#020402]/50"
                    } backdrop-blur-sm`}
                    required
                  />
                </div>

                {/* Destination */}
                <div className="space-y-2">
                  <Label
                    htmlFor="destination"
                    className={isDark ? "text-[#C5EFCB]" : "text-[#020402]"}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#FF7F50]" />
                      Destination
                    </div>
                  </Label>
                  <Input
                    id="destination"
                    type="text"
                    placeholder="e.g., Downtown Mall"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className={`${
                      isDark
                        ? "bg-[#020402]/40 border-[#3A463A] text-[#C5EFCB] placeholder:text-[#758173]"
                        : "bg-white/50 border-white/60 text-[#020402] placeholder:text-[#020402]/50"
                    } backdrop-blur-sm`}
                    required
                  />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="date"
                      className={isDark ? "text-[#C5EFCB]" : "text-[#020402]"}
                    >
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#F4B400]" />
                        Date
                      </div>
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className={`${
                        isDark
                          ? "bg-[#020402]/40 border-[#3A463A] text-[#C5EFCB]"
                          : "bg-white/50 border-white/60 text-[#020402]"
                      } backdrop-blur-sm`}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="time"
                      className={isDark ? "text-[#C5EFCB]" : "text-[#020402]"}
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#F4B400]" />
                        Time
                      </div>
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={departureTime}
                      onChange={(e) => setDepartureTime(e.target.value)}
                      className={`${
                        isDark
                          ? "bg-[#020402]/40 border-[#3A463A] text-[#C5EFCB]"
                          : "bg-white/50 border-white/60 text-[#020402]"
                      } backdrop-blur-sm`}
                      required
                    />
                  </div>
                </div>

                {/* Vehicle Type */}
                <div className="space-y-2">
                  <Label
                    htmlFor="vehicle"
                    className={isDark ? "text-[#C5EFCB]" : "text-[#020402]"}
                  >
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-[#F4B400]" />
                      Vehicle Type
                    </div>
                  </Label>
                  <Select
                    value={vehicleType}
                    onValueChange={setVehicleType}
                    required
                  >
                    <SelectTrigger
                      className={`${
                        isDark
                          ? "bg-[#020402]/40 border-[#3A463A] text-[#C5EFCB]"
                          : "bg-white/50 border-white/60 text-[#020402]"
                      } backdrop-blur-sm`}
                    >
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent
                      className={
                        isDark
                          ? "bg-[#1A1F1A] border-[#3A463A]"
                          : "bg-white border-gray-200"
                      }
                    >
                      {vehicleTypes.map((vehicle) => (
                        <SelectItem
                          key={vehicle.value}
                          value={vehicle.value}
                          className={
                            isDark
                              ? "text-[#C5EFCB] focus:bg-[#3A463A] focus:text-[#C5EFCB]"
                              : "text-[#020402]"
                          }
                        >
                          <div className="flex items-center gap-2">
                            <span>{vehicle.icon}</span>
                            <span>{vehicle.label}</span>
                            <span
                              className={`text-xs ${
                                isDark ? "text-[#758173]" : "text-[#020402]/60"
                              }`}
                            >
                              (${vehicle.pricePerKm}/km, {vehicle.capacity}{" "}
                              seats)
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Organizer Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="organizer-name"
                    className={isDark ? "text-[#C5EFCB]" : "text-[#020402]"}
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#F4B400]" />
                      Organizer Name
                    </div>
                  </Label>
                  <Input
                    id="organizer-name"
                    type="text"
                    placeholder="e.g., John Doe"
                    value={organizerName}
                    onChange={(e) => setOrganizerName(e.target.value)}
                    className={`${
                      isDark
                        ? "bg-[#020402]/40 border-[#3A463A] text-[#C5EFCB] placeholder:text-[#758173]"
                        : "bg-white/50 border-white/60 text-[#020402] placeholder:text-[#020402]/50"
                    } backdrop-blur-sm`}
                    required
                  />
                </div>

                {/* Contact Number */}
                <div className="space-y-2">
                  <Label
                    htmlFor="contact-number"
                    className={isDark ? "text-[#C5EFCB]" : "text-[#020402]"}
                  >
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#F4B400]" />
                      Contact Number
                    </div>
                  </Label>
                  <Input
                    id="contact-number"
                    type="tel"
                    placeholder="e.g., +91 98765 43210"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className={`${
                      isDark
                        ? "bg-[#020402]/40 border-[#3A463A] text-[#C5EFCB] placeholder:text-[#758173]"
                        : "bg-white/50 border-white/60 text-[#020402] placeholder:text-[#020402]/50"
                    } backdrop-blur-sm`}
                    required
                  />
                </div>

                {/* Additional Notes (Optional) */}
                <div className="space-y-2">
                  <Label
                    htmlFor="notes"
                    className={isDark ? "text-[#C5EFCB]" : "text-[#020402]"}
                  >
                    <div className="flex items-center gap-2">
                      <span>📝</span>
                      Additional Notes (Optional)
                    </div>
                  </Label>
                  <textarea
                    id="notes"
                    placeholder="Any special instructions or details about the ride..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className={`w-full px-3 py-2 rounded-lg ${
                      isDark
                        ? "bg-[#020402]/40 border-[#3A463A] text-[#C5EFCB] placeholder:text-[#758173]"
                        : "bg-white/50 border-white/60 text-[#020402] placeholder:text-[#020402]/50"
                    } backdrop-blur-sm border resize-none focus:outline-none focus:ring-2 focus:ring-[#F4B400]`}
                  />
                </div>

                {/* Distance and Price Display */}
                {distance > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl ${
                      isDark
                        ? "bg-[#F4B400]/10 border-[#F4B400]/30"
                        : "bg-[#F4B400]/20 border-[#F4B400]/40"
                    } border space-y-3`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Navigation className="w-5 h-5 text-[#F4B400]" />
                        <span
                          className={
                            isDark ? "text-[#C5EFCB]" : "text-[#020402]"
                          }
                        >
                          Estimated Distance
                        </span>
                      </div>
                      <span
                        className={`text-lg ${
                          isDark ? "text-[#F4B400]" : "text-[#FF7F50]"
                        }`}
                      >
                        {distance} km
                      </span>
                    </div>

                    {estimatedPrice > 0 && (
                      <div className="flex items-center justify-between pt-2 border-t border-current/20">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-[#F4B400]" />
                          <span
                            className={
                              isDark ? "text-[#C5EFCB]" : "text-[#020402]"
                            }
                          >
                            Estimated Total Cost
                          </span>
                        </div>
                        <span
                          className={`text-xl ${
                            isDark ? "text-[#F4B400]" : "text-[#FF7F50]"
                          }`}
                        >
                          ${estimatedPrice}
                        </span>
                      </div>
                    )}

                    {selectedVehicleData && estimatedPrice > 0 && (
                      <div
                        className={`text-sm ${
                          isDark ? "text-[#758173]" : "text-[#020402]/70"
                        } pt-2`}
                      >
                        💡 Split between {selectedVehicleData.capacity}{" "}
                        passengers = $
                        {(
                          estimatedPrice / selectedVehicleData.capacity
                        ).toFixed(2)}{" "}
                        per person
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Error Display */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl ${
                      isDark
                        ? "bg-red-500/10 border-red-500/30 text-red-400"
                        : "bg-red-100 border-red-300 text-red-700"
                    } border`}
                  >
                    <p className="text-sm">{error}</p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-6 text-lg bg-gradient-to-r from-[#F4B400] to-[#FFD166] hover:from-[#FFD166] hover:to-[#F4B400] text-white shadow-lg hover:shadow-xl transition-all ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <Car className="w-5 h-5 mr-2" />
                  {isLoading ? "Creating Ride..." : "Create Ride Offer"}
                </Button>
              </form>
            </motion.div>

            {/* Right: Map Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`rounded-3xl backdrop-blur-xl overflow-hidden ${
                isDark
                  ? "bg-[#1A1F1A]/60 border-[#3A463A]/50"
                  : "bg-white/30 border-white/60"
              } border shadow-2xl`}
            >
              <div
                className={`p-6 border-b ${
                  isDark ? "border-[#3A463A]" : "border-white/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#FF7F50] to-[#F4B400]">
                    <Navigation className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3
                      className={`text-xl ${
                        isDark ? "text-[#C5EFCB]" : "text-[#020402]"
                      }`}
                    >
                      Route Preview
                    </h3>
                    <p
                      className={`text-sm ${
                        isDark ? "text-[#758173]" : "text-[#020402]/70"
                      }`}
                    >
                      {origin && destination
                        ? `${origin} → ${destination}`
                        : "Enter locations to see route"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced Satellite-Style Map */}
              <div className="relative h-[600px] overflow-hidden">
                {/* Satellite-Style Background */}
                <div className="absolute inset-0">
                  {/* Base satellite texture */}
                  <div
                    className={`absolute inset-0 ${
                      isDark
                        ? "bg-gradient-to-br from-[#1a2420] via-[#0f1810] to-[#1a2420]"
                        : "bg-gradient-to-br from-[#b8d4b8] via-[#d0e8d0] to-[#a8c4a8]"
                    }`}
                  />

                  {/* Grid overlay */}
                  <svg
                    className="w-full h-full absolute inset-0 opacity-30"
                    viewBox="0 0 400 400"
                  >
                    <defs>
                      <pattern
                        id="grid-create"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 40 0 L 0 0 0 40"
                          fill="none"
                          stroke={isDark ? "#C5EFCB" : "#020402"}
                          strokeWidth="0.5"
                          opacity="0.3"
                        />
                      </pattern>
                      <pattern
                        id="major-grid-create"
                        width="80"
                        height="80"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 80 0 L 0 0 0 80"
                          fill="none"
                          stroke={isDark ? "#C5EFCB" : "#020402"}
                          strokeWidth="1"
                          opacity="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="400" height="400" fill="url(#grid-create)" />
                    <rect
                      width="400"
                      height="400"
                      fill="url(#major-grid-create)"
                    />
                  </svg>

                  {/* Simulated terrain features */}
                  <svg
                    className="w-full h-full absolute inset-0 opacity-40"
                    viewBox="0 0 400 400"
                  >
                    {/* Park/green areas */}
                    <rect
                      x="30"
                      y="220"
                      width="60"
                      height="80"
                      fill={isDark ? "#1a3a1a" : "#90c090"}
                      rx="4"
                    />
                    <rect
                      x="280"
                      y="40"
                      width="80"
                      height="60"
                      fill={isDark ? "#1a3a1a" : "#90c090"}
                      rx="4"
                    />
                    {/* Buildings/blocks */}
                    <rect
                      x="150"
                      y="160"
                      width="40"
                      height="50"
                      fill={isDark ? "#2a2a2a" : "#d0d0d0"}
                      rx="2"
                    />
                    <rect
                      x="200"
                      y="140"
                      width="30"
                      height="35"
                      fill={isDark ? "#2a2a2a" : "#d0d0d0"}
                      rx="2"
                    />
                    <rect
                      x="240"
                      y="150"
                      width="35"
                      height="45"
                      fill={isDark ? "#2a2a2a" : "#d0d0d0"}
                      rx="2"
                    />
                  </svg>

                  {/* Street names overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div
                      className={`absolute left-4 top-1/3 text-xs px-2 py-1 rounded ${
                        isDark
                          ? "bg-[#020402]/60 text-[#758173]"
                          : "bg-white/60 text-[#020402]/70"
                      }`}
                    >
                      Main St
                    </div>
                    <div
                      className={`absolute right-8 top-1/4 text-xs px-2 py-1 rounded ${
                        isDark
                          ? "bg-[#020402]/60 text-[#758173]"
                          : "bg-white/60 text-[#020402]/70"
                      }`}
                    >
                      College Ave
                    </div>
                  </div>
                </div>

                {/* Route and Markers */}
                {origin && destination ? (
                  <div className="relative h-full">
                    <svg
                      className="w-full h-full absolute inset-0"
                      viewBox="0 0 400 600"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      {/* Route background (road) */}
                      <motion.path
                        d="M 60 480 L 100 440 Q 150 400, 180 340 L 220 280 Q 260 220, 300 180 L 340 140"
                        fill="none"
                        stroke={isDark ? "#4a4a4a" : "#c0c0c0"}
                        strokeWidth="18"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.8"
                      />

                      {/* Active route line */}
                      <motion.path
                        d="M 60 480 L 100 440 Q 150 400, 180 340 L 220 280 Q 260 220, 300 180 L 340 140"
                        fill="none"
                        stroke={isDark ? "#FF7F50" : "#F4B400"}
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray="8 8"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />

                      {/* Origin Marker */}
                      <motion.g>
                        <circle
                          cx="60"
                          cy="480"
                          r="20"
                          fill={isDark ? "#F4B400" : "#FF7F50"}
                          opacity="0.3"
                        />
                        <circle
                          cx="60"
                          cy="480"
                          r="14"
                          fill={isDark ? "#F4B400" : "#FF7F50"}
                        />
                        <motion.circle
                          cx="60"
                          cy="480"
                          r="14"
                          fill="none"
                          stroke={isDark ? "#F4B400" : "#FF7F50"}
                          strokeWidth="2"
                          animate={{ r: [14, 24], opacity: [1, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <text
                          x="60"
                          y="487"
                          textAnchor="middle"
                          fontSize="18"
                          fill="white"
                        >
                          📍
                        </text>
                      </motion.g>

                      {/* Destination Marker */}
                      <motion.g>
                        <circle
                          cx="340"
                          cy="140"
                          r="20"
                          fill={isDark ? "#FF7F50" : "#F4B400"}
                          opacity="0.3"
                        />
                        <circle
                          cx="340"
                          cy="140"
                          r="14"
                          fill={isDark ? "#FF7F50" : "#F4B400"}
                        />
                        <motion.circle
                          cx="340"
                          cy="140"
                          r="14"
                          fill="none"
                          stroke={isDark ? "#FF7F50" : "#F4B400"}
                          strokeWidth="2"
                          animate={{ r: [14, 24], opacity: [1, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 1,
                          }}
                        />
                        <text
                          x="340"
                          y="147"
                          textAnchor="middle"
                          fontSize="18"
                          fill="white"
                        >
                          🎯
                        </text>
                      </motion.g>

                      {/* Moving Vehicle Icon */}
                      <motion.g
                        initial={{ x: 60, y: 480 }}
                        animate={{
                          x: [60, 100, 180, 220, 300, 340],
                          y: [480, 440, 340, 280, 180, 140],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <ellipse
                          rx="12"
                          ry="6"
                          cy="5"
                          fill="#000"
                          opacity="0.2"
                        />
                        <circle
                          r="22"
                          fill={isDark ? "#FFD166" : "#FF7F50"}
                          opacity="0.15"
                        >
                          <animate
                            attributeName="r"
                            values="18;26;18"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </circle>
                        <circle r="12" fill={isDark ? "#FFD166" : "#FF7F50"} />
                        <circle r="9" fill="white" opacity="0.95" />
                        <text y="4" textAnchor="middle" fontSize="14">
                          🚗
                        </text>
                      </motion.g>
                    </svg>

                    {/* Location Labels */}
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between z-20">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`px-4 py-3 rounded-lg backdrop-blur-xl max-w-[45%] ${
                          isDark
                            ? "bg-[#F4B400]/30 border-[#F4B400]/40"
                            : "bg-[#FF7F50]/30 border-[#FF7F50]/40"
                        } border shadow-xl`}
                      >
                        <p
                          className={`text-xs ${
                            isDark ? "text-[#F4B400]" : "text-[#FF7F50]"
                          }`}
                        >
                          Origin
                        </p>
                        <p
                          className={`text-sm ${
                            isDark ? "text-[#C5EFCB]" : "text-[#020402]"
                          } truncate`}
                        >
                          {origin}
                        </p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`px-4 py-3 rounded-lg backdrop-blur-xl max-w-[45%] ${
                          isDark
                            ? "bg-[#FF7F50]/30 border-[#FF7F50]/40"
                            : "bg-[#F4B400]/30 border-[#F4B400]/40"
                        } border text-right shadow-xl`}
                      >
                        <p
                          className={`text-xs ${
                            isDark ? "text-[#FF7F50]" : "text-[#F4B400]"
                          }`}
                        >
                          Destination
                        </p>
                        <p
                          className={`text-sm ${
                            isDark ? "text-[#C5EFCB]" : "text-[#020402]"
                          } truncate`}
                        >
                          {destination}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <MapPin
                          className={`w-16 h-16 mx-auto mb-4 ${
                            isDark ? "text-[#758173]" : "text-[#020402]/40"
                          }`}
                        />
                      </motion.div>
                      <p
                        className={`text-lg ${
                          isDark ? "text-[#758173]" : "text-[#020402]/70"
                        }`}
                      >
                        Enter origin and destination
                      </p>
                      <p
                        className={`text-sm ${
                          isDark ? "text-[#758173]" : "text-[#020402]/50"
                        }`}
                      >
                        to preview the route
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer isDark={isDark} />
    </div>
  );
}

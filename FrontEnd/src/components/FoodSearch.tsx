import { motion } from "motion/react";
import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Clock,
  Users,
  ArrowLeft,
  UtensilsCrossed,
  Star,
  Loader2,
  AlertCircle,
  Plus,
} from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { searchFoodOrders, type FoodOrder } from "../api/foodApi";

interface FoodSearchProps {
  isDark: boolean;
  toggleTheme: () => void;
  onNavigateBack: () => void;
  onNavigateToDetail: (foodOrderId?: string) => void;
  onNavigateToDashboard?: () => void;
  onNavigateToRideSearch?: () => void;
  onNavigateToCreateFood?: () => void;
}

export function FoodSearch({
  isDark,
  toggleTheme,
  onNavigateBack,
  onNavigateToDetail,
  onNavigateToDashboard,
  onNavigateToRideSearch,
  onNavigateToCreateFood,
}: FoodSearchProps) {
  const handleNavigate = (page: string) => {
    if (page === "dashboard") {
      onNavigateToDashboard?.();
    } else if (page === "rides") {
      onNavigateToRideSearch?.();
    } else if (page === "food") {
      // Already on food page, do nothing
    }
  };

  const [restaurantQuery, setRestaurantQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [allFoodOrders, setAllFoodOrders] = useState<FoodOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showRestaurantSuggestions, setShowRestaurantSuggestions] =
    useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [restaurantSuggestions, setRestaurantSuggestions] = useState<string[]>(
    []
  );
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  // Fetch location suggestions from database
  const fetchLocationSuggestions = async (
    query: string,
    type: "restaurant" | "location"
  ) => {
    if (!query.trim() || query.length < 2) {
      if (type === "restaurant") setRestaurantSuggestions([]);
      else setLocationSuggestions([]);
      return;
    }

    setLoadingSuggestions(true);
    try {
      // Search food orders to get suggestions
      const orders = await searchFoodOrders({
        restaurant: type === "restaurant" ? query : undefined,
        location: type === "location" ? query : undefined,
        includeExpired: false,
      });

      const locations = new Set<string>();

      orders.forEach((order) => {
        if (type === "restaurant" && order.restaurant) {
          locations.add(order.restaurant);
        } else if (type === "location" && order.deliveryLocation) {
          locations.add(order.deliveryLocation);
        }
      });

      const uniqueLocations = Array.from(locations).slice(0, 8);

      if (type === "restaurant") {
        setRestaurantSuggestions(uniqueLocations);
      } else {
        setLocationSuggestions(uniqueLocations);
      }
    } catch (err) {
      console.error("Error fetching location suggestions:", err);
      if (type === "restaurant") setRestaurantSuggestions([]);
      else setLocationSuggestions([]);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  // Fetch restaurant suggestions when user types
  useEffect(() => {
    const timer = setTimeout(() => {
      if (restaurantQuery.trim().length >= 2) {
        fetchLocationSuggestions(restaurantQuery, "restaurant");
      } else {
        setRestaurantSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [restaurantQuery]);

  // Fetch location suggestions when user types
  useEffect(() => {
    const timer = setTimeout(() => {
      if (locationQuery.trim().length >= 2) {
        fetchLocationSuggestions(locationQuery, "location");
      } else {
        setLocationSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [locationQuery]);

  // Fetch initial food orders on component mount
  useEffect(() => {
    const fetchInitialOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        // Search for popular restaurants to show initial orders
        const popularRestaurants = ["Pizza", "Burger", "Sushi", "Thai"];
        const fetchedOrders: FoodOrder[] = [];

        for (const restaurant of popularRestaurants) {
          try {
            const result = await searchFoodOrders({
              restaurant,
              includeExpired: false,
            });
            fetchedOrders.push(...result);
          } catch (err) {
            console.log(`No orders found for ${restaurant}`);
          }
        }

        // Remove duplicates based on _id
        const uniqueOrders = Array.from(
          new Map(fetchedOrders.map((order) => [order._id, order])).values()
        );

        setAllFoodOrders(uniqueOrders.slice(0, 12));
      } catch (err: any) {
        console.error("Error fetching initial orders:", err);
        setAllFoodOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialOrders();
  }, []);

  // Smart search: Fetch orders based on queries
  useEffect(() => {
    const fetchOrdersByQuery = async () => {
      const trimmedRestaurant = restaurantQuery.trim();
      const trimmedLocation = locationQuery.trim();

      if (!trimmedRestaurant && !trimmedLocation) {
        setHasSearched(false);
        return;
      }

      if (
        (trimmedRestaurant && trimmedRestaurant.length < 2) ||
        (trimmedLocation && trimmedLocation.length < 2)
      ) {
        return;
      }

      setLoading(true);
      setError(null);
      setHasSearched(true);

      try {
        const result = await searchFoodOrders({
          restaurant: trimmedRestaurant || undefined,
          location: trimmedLocation || undefined,
          includeExpired: false,
        });
        setAllFoodOrders(result);
      } catch (err: any) {
        setError(err.message || "Failed to fetch food orders");
        setAllFoodOrders([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchOrdersByQuery();
    }, 400);

    return () => clearTimeout(timer);
  }, [restaurantQuery, locationQuery]);

  // Calculate split cost per person
  const calculateSplitCost = (
    totalPrice: number,
    currentParticipants: number
  ) => {
    return (totalPrice / currentParticipants).toFixed(2);
  };

  // Format date/time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex flex-col">
      {/* Header */}
      <Header
        isDark={isDark}
        toggleTheme={toggleTheme}
        isAuthenticated={true}
        onNavigate={handleNavigate}
      />

      <div className="flex-1 relative">
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
            className={`absolute top-40 left-20 w-96 h-96 rounded-full blur-3xl ${
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
              className={`mb-4 ${
                isDark
                  ? "text-[#C5EFCB] hover:bg-[#1A1F1A]"
                  : "text-[#020402] hover:bg-white/30"
              }`}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-2xl bg-gradient-to-br from-[#F4B400] to-[#FFD166]`}
                >
                  <UtensilsCrossed className="w-8 h-8 text-white" />
                </div>
                <h1
                  className={`text-4xl md:text-5xl ${
                    isDark ? "text-[#C5EFCB]" : "text-[#020402]"
                  }`}
                >
                  Find Food Orders
                </h1>
              </div>

              {onNavigateToCreateFood && (
                <Button
                  onClick={onNavigateToCreateFood}
                  className={`px-6 py-3 rounded-xl ${
                    isDark
                      ? "bg-gradient-to-r from-[#F4B400] to-[#FFD166] hover:from-[#FFD166] hover:to-[#F4B400] text-[#020402]"
                      : "bg-gradient-to-r from-[#F4B400] to-[#FF7F50] text-white hover:from-[#FF7F50] hover:to-[#F4B400]"
                  } shadow-lg hover:shadow-xl transition-all flex items-center gap-2`}
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden md:inline">Create Order</span>
                </Button>
              )}
            </div>
            <p
              className={`${
                isDark ? "text-[#758173]" : "text-[#020402]/70"
              } text-lg`}
            >
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
                ? "bg-[#1A1F1A]/60 border-[#3A463A]/50"
                : "bg-white/30 border-white/60"
            } border shadow-lg`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Restaurant Search */}
              <motion.div className="relative" whileHover={{ scale: 1.02 }}>
                <UtensilsCrossed
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10 ${
                    isDark ? "text-[#F4B400]" : "text-[#FF7F50]"
                  }`}
                />
                <Input
                  type="text"
                  placeholder="Enter restaurant name..."
                  value={restaurantQuery}
                  onChange={(e) => setRestaurantQuery(e.target.value)}
                  onFocus={() => setShowRestaurantSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowRestaurantSuggestions(false), 200)
                  }
                  className={`pl-12 h-12 rounded-xl ${
                    isDark
                      ? "bg-[#020402]/50 border-[#3A463A] text-[#C5EFCB] placeholder:text-[#758173]"
                      : "bg-white/50 border-white text-[#020402] placeholder:text-[#020402]/50"
                  }`}
                />
                {/* Restaurant Suggestions */}
                {showRestaurantSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute top-full left-0 right-0 mt-2 rounded-xl backdrop-blur-lg z-20 max-h-60 overflow-y-auto ${
                      isDark
                        ? "bg-[#1A1F1A] border-[#3A463A]"
                        : "bg-white border-gray-300"
                    } border-2 shadow-xl`}
                  >
                    {loadingSuggestions && restaurantQuery.length >= 2 ? (
                      <div className="px-4 py-3 flex items-center gap-2">
                        <Loader2
                          className={`w-4 h-4 animate-spin ${
                            isDark ? "text-[#F4B400]" : "text-[#FF7F50]"
                          }`}
                        />
                        <span
                          className={
                            isDark ? "text-[#758173]" : "text-[#020402]/70"
                          }
                        >
                          Searching restaurants...
                        </span>
                      </div>
                    ) : restaurantSuggestions.length > 0 ? (
                      restaurantSuggestions.map((location, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{
                            backgroundColor: isDark
                              ? "rgba(244, 180, 0, 0.1)"
                              : "rgba(255, 127, 80, 0.05)",
                          }}
                          onClick={() => {
                            setRestaurantQuery(location);
                            setShowRestaurantSuggestions(false);
                          }}
                          className={`w-full text-left px-4 py-3 flex items-center gap-3 ${
                            isDark
                              ? "text-[#C5EFCB] hover:text-[#F4B400]"
                              : "text-[#020402] hover:text-[#FF7F50]"
                          } transition-colors`}
                        >
                          <UtensilsCrossed className="w-4 h-4 shrink-0" />
                          <span>{location}</span>
                        </motion.button>
                      ))
                    ) : restaurantQuery.length >= 2 ? (
                      <div className="px-4 py-3">
                        <span
                          className={
                            isDark ? "text-[#758173]" : "text-[#020402]/70"
                          }
                        >
                          No restaurants found
                        </span>
                      </div>
                    ) : null}
                  </motion.div>
                )}
              </motion.div>

              {/* Location Search */}
              <motion.div className="relative" whileHover={{ scale: 1.02 }}>
                <MapPin
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10 ${
                    isDark ? "text-[#FFD166]" : "text-[#F4B400]"
                  }`}
                />
                <Input
                  type="text"
                  placeholder="Enter delivery location..."
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  onFocus={() => setShowLocationSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowLocationSuggestions(false), 200)
                  }
                  className={`pl-12 h-12 rounded-xl ${
                    isDark
                      ? "bg-[#020402]/50 border-[#3A463A] text-[#C5EFCB] placeholder:text-[#758173]"
                      : "bg-white/50 border-white text-[#020402] placeholder:text-[#020402]/50"
                  }`}
                />
                {/* Location Suggestions */}
                {showLocationSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute top-full left-0 right-0 mt-2 rounded-xl backdrop-blur-sm z-20 max-h-60 overflow-y-auto ${
                      isDark
                        ? "bg-[#1A1F1A] border-[#3A463A]"
                        : "bg-white border-gray-300"
                    } border-2 shadow-xl`}
                  >
                    {loadingSuggestions && locationQuery.length >= 2 ? (
                      <div className="px-4 py-3 flex items-center gap-2">
                        <Loader2
                          className={`w-4 h-4 animate-spin ${
                            isDark ? "text-[#FFD166]" : "text-[#F4B400]"
                          }`}
                        />
                        <span
                          className={
                            isDark ? "text-[#758173]" : "text-[#020402]/70"
                          }
                        >
                          Searching locations...
                        </span>
                      </div>
                    ) : locationSuggestions.length > 0 ? (
                      locationSuggestions.map((location, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{
                            backgroundColor: isDark
                              ? "rgba(255, 209, 102, 0.1)"
                              : "rgba(244, 180, 0, 0.05)",
                          }}
                          onClick={() => {
                            setLocationQuery(location);
                            setShowLocationSuggestions(false);
                          }}
                          className={`w-full text-left px-4 py-3 flex items-center gap-3 ${
                            isDark
                              ? "text-[#C5EFCB] hover:text-[#FFD166]"
                              : "text-[#020402] hover:text-[#F4B400]"
                          } transition-colors`}
                        >
                          <MapPin className="w-4 h-4 shrink-0" />
                          <span>{location}</span>
                        </motion.button>
                      ))
                    ) : locationQuery.length >= 2 ? (
                      <div className="px-4 py-3">
                        <span
                          className={
                            isDark ? "text-[#758173]" : "text-[#020402]/70"
                          }
                        >
                          No locations found
                        </span>
                      </div>
                    ) : null}
                  </motion.div>
                )}
              </motion.div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <Button
                className={`w-full h-12 rounded-xl ${
                  isDark
                    ? "bg-gradient-to-r from-[#F4B400] to-[#FFD166] hover:from-[#FFD166] hover:to-[#F4B400] text-white"
                    : "bg-gradient-to-r from-[#F4B400] to-[#FF7F50] text-white"
                }`}
              >
                <Search className="w-5 h-5 mr-2" />
                Search Orders
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
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2
                  className={`w-5 h-5 animate-spin ${
                    isDark ? "text-[#F4B400]" : "text-[#FF7F50]"
                  }`}
                />
                <p
                  className={`${
                    isDark ? "text-[#758173]" : "text-[#020402]/70"
                  }`}
                >
                  {restaurantQuery && locationQuery
                    ? `Searching for "${restaurantQuery}" at "${locationQuery}"...`
                    : restaurantQuery
                    ? `Finding orders from "${restaurantQuery}"...`
                    : locationQuery
                    ? `Searching orders to "${locationQuery}"...`
                    : "Loading available orders..."}
                </p>
              </div>
            ) : error ? (
              <div className="flex items-center gap-2 text-red-500">
                <AlertCircle className="w-5 h-5" />
                <p>{error}</p>
              </div>
            ) : (
              <p
                className={`${isDark ? "text-[#758173]" : "text-[#020402]/70"}`}
              >
                {hasSearched || restaurantQuery || locationQuery ? (
                  <>
                    {allFoodOrders.length > 0 ? (
                      <>
                        Found{" "}
                        <span
                          className={`font-semibold ${
                            isDark ? "text-[#FFD166]" : "text-[#F4B400]"
                          }`}
                        >
                          {allFoodOrders.length}
                        </span>{" "}
                        {allFoodOrders.length === 1 ? "order" : "orders"}
                      </>
                    ) : (
                      <>
                        No orders found. Try different search terms or{" "}
                        <button
                          onClick={onNavigateToCreateFood}
                          className={`underline ${
                            isDark
                              ? "text-[#FFD166] hover:text-[#F4B400]"
                              : "text-[#F4B400] hover:text-[#FF7F50]"
                          } transition-colors`}
                        >
                          create a new order
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {allFoodOrders.length > 0
                      ? `Showing ${allFoodOrders.length} available order${
                          allFoodOrders.length > 1 ? "s" : ""
                        }. Search to find specific restaurants or locations.`
                      : "No orders available. Be the first to create one!"}
                  </>
                )}
              </p>
            )}
          </motion.div>

          {/* Food Orders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allFoodOrders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                onClick={() => onNavigateToDetail(order._id)}
                className={`rounded-2xl backdrop-blur-xl ${
                  isDark
                    ? "bg-[#1A1F1A]/60 border-[#3A463A]/50"
                    : "bg-white/30 border-white/60"
                } border shadow-lg overflow-hidden cursor-pointer group relative`}
              >
                {/* Glass shine effect */}
                <motion.div
                  className={`absolute inset-0 ${
                    isDark
                      ? "bg-gradient-to-br from-white/5 via-transparent to-transparent"
                      : "bg-gradient-to-br from-white/80 via-white/40 to-transparent"
                  } pointer-events-none`}
                  initial={{ opacity: 0.5 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Restaurant Icon Header */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className={`w-full h-full flex items-center justify-center ${
                      isDark
                        ? "bg-gradient-to-br from-[#2A3A2A] to-[#1A2A1A]"
                        : "bg-gradient-to-br from-[#A9C5A0] to-[#C5EFCB]"
                    }`}
                  >
                    <UtensilsCrossed
                      className={`w-20 h-20 ${
                        isDark ? "text-[#A9C5A0]" : "text-[#2A5A2A]"
                      }`}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Offer Badge */}
                  {order.Offer && order.Offer.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      className="absolute top-4 left-4"
                    >
                      <Badge className="bg-[#F4B400] text-white px-3 py-1 text-sm font-semibold shadow-lg">
                        <Star className="w-4 h-4 mr-1 inline" />
                        {order.Offer[0].isPercentage
                          ? `${order.Offer[0].amount}% OFF`
                          : `$${order.Offer[0].amount} OFF`}
                      </Badge>
                    </motion.div>
                  )}

                  {/* Spots Available Badge */}
                  {order.maxParticipants && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full backdrop-blur-md ${
                        isDark ? "bg-[#F4B400]/90" : "bg-[#F4B400]"
                      } text-white text-sm shadow-lg`}
                    >
                      {order.maxParticipants - order.currentParticipants} spots
                      left
                    </motion.div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 relative">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3
                        className={`text-xl mb-1 ${
                          isDark ? "text-[#C5EFCB]" : "text-[#020402]"
                        }`}
                      >
                        {order.restaurant}
                      </h3>
                      <Badge
                        variant="secondary"
                        className={`${
                          isDark
                            ? "bg-[#3A463A] text-[#C5EFCB]"
                            : "bg-white/50 text-[#020402]"
                        }`}
                      >
                        {order.cuisine || "Various"}
                      </Badge>
                    </div>
                    <motion.div
                      className="flex items-center gap-1"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Star className="w-4 h-4 fill-[#F4B400] text-[#F4B400]" />
                      <span
                        className={`text-sm ${
                          isDark ? "text-[#758173]" : "text-[#020402]/70"
                        }`}
                      >
                        Min ₹{order.MinSpent}
                      </span>
                    </motion.div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin
                        className={`w-4 h-4 ${
                          isDark ? "text-[#758173]" : "text-[#020402]/70"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          isDark ? "text-[#758173]" : "text-[#020402]/70"
                        }`}
                      >
                        {order.deliveryLocation || "To be decided"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock
                        className={`w-4 h-4 ${
                          isDark ? "text-[#758173]" : "text-[#020402]/70"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          isDark ? "text-[#758173]" : "text-[#020402]/70"
                        }`}
                      >
                        Order by: {formatDateTime(order.expiryTime)}
                      </span>
                    </div>
                    {order.maxParticipants && (
                      <div className="flex items-center gap-2">
                        <Users
                          className={`w-4 h-4 ${
                            isDark ? "text-[#758173]" : "text-[#020402]/70"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            isDark ? "text-[#758173]" : "text-[#020402]/70"
                          }`}
                        >
                          {order.currentParticipants}/{order.maxParticipants}{" "}
                          members
                        </span>
                      </div>
                    )}
                  </div>

                  <div
                    className={`flex items-center justify-between pt-4 border-t ${
                      isDark ? "border-[#3A463A]/20" : "border-[#020402]/20"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p
                        className={`text-sm ${
                          isDark ? "text-[#758173]" : "text-[#020402]/70"
                        }`}
                      >
                        Total: ₹{order.totalPrice}
                      </p>
                      <p
                        className={`text-2xl ${
                          isDark ? "text-[#F4B400]" : "text-[#FF7F50]"
                        }`}
                      >
                        ₹
                        {calculateSplitCost(
                          order.totalPrice,
                          order.currentParticipants
                        )}
                        /person
                      </p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          onNavigateToDetail(order._id);
                        }}
                        className={`rounded-full shadow-md ${
                          isDark
                            ? "bg-gradient-to-r from-[#F4B400] to-[#FFD166] hover:from-[#FFD166] hover:to-[#F4B400] text-[#020402]"
                            : "bg-gradient-to-r from-[#F4B400] to-[#FF7F50] text-white"
                        }`}
                      >
                        View Details
                      </Button>
                    </motion.div>
                  </div>

                  {order.createdBy && (
                    <p
                      className={`text-xs mt-3 ${
                        isDark ? "text-[#758173]" : "text-[#020402]/70"
                      }`}
                    >
                      Organized by {order.createdBy.name}
                    </p>
                  )}
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
                    ? "bg-gradient-to-r from-[#F4B400] to-[#FFD166] hover:from-[#FFD166] hover:to-[#F4B400] text-[#020402]"
                    : "bg-gradient-to-r from-[#F4B400] to-[#FF7F50] text-white"
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

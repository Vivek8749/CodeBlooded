import { motion } from "motion/react";
import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Clock,
  Users,
  ArrowLeft,
  Car,
  Navigation,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Header } from "./header";
import { Footer } from "./footer";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { searchRides } from "../api/ridesApi";

interface RideSearchProps {
  isDark: boolean;
  toggleTheme: () => void;
  onNavigateBack: () => void;
  onNavigateToDetail: (rideId?: string) => void;
  onNavigateToCreateRide?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToFoodSearch?: () => void;
}

interface Ride {
  _id: string;
  createdBy?: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    profilePicture?: string;
  } | null;
  from: string;
  to: string;
  vehicleDetails?: string;
  maxSeats: number;
  currentSeats: number;
  totalPrice: number;
  expiryTime: string;
  expired: boolean;
  notes?: string;
}

export function RideSearch({
  isDark,
  toggleTheme,
  onNavigateBack,
  onNavigateToDetail,
  onNavigateToCreateRide,
  onNavigateToDashboard,
  onNavigateToFoodSearch,
}: RideSearchProps) {
  const handleNavigate = (page: string) => {
    if (page === "dashboard") {
      onNavigateToDashboard?.();
    } else if (page === "rides") {
      // Already on rides page, do nothing
    } else if (page === "food") {
      onNavigateToFoodSearch?.();
    }
  };
  const [originQuery, setOriginQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");
  const [allRides, setAllRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] =
    useState(false);
  const [originSuggestions, setOriginSuggestions] = useState<string[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<
    string[]
  >([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  // Fetch location suggestions from database
  const fetchLocationSuggestions = async (
    query: string,
    type: "origin" | "destination"
  ) => {
    if (!query.trim() || query.length < 2) {
      if (type === "origin") setOriginSuggestions([]);
      else setDestinationSuggestions([]);
      return;
    }

    setLoadingSuggestions(true);
    try {
      // Search rides with partial query to get real locations from database
      // For destination, search directly
      // For origin, we'll search destinations and extract origins from results
      const searchQuery = type === "destination" ? query : "a"; // Use 'a' to get broad results for origin search

      const rides = await searchRides({
        to: searchQuery,
        includeExpired: false,
      });

      // Extract unique locations based on type
      const locations = new Set<string>();

      rides.forEach((ride) => {
        if (type === "destination") {
          // Add destinations that match the query
          if (ride.to.toLowerCase().includes(query.toLowerCase())) {
            locations.add(ride.to);
          }
        } else {
          // Add origins that match the query
          if (ride.from.toLowerCase().includes(query.toLowerCase())) {
            locations.add(ride.from);
          }
        }
      });

      // If we don't have enough suggestions for origin, try searching with the query as destination
      // This will give us rides going TO that location, and we can see other origins
      if (type === "origin" && locations.size < 5) {
        try {
          const additionalRides = await searchRides({
            to: query,
            includeExpired: false,
          });

          additionalRides.forEach((ride) => {
            locations.add(ride.from);
          });
        } catch (err) {
          // Continue with what we have
        }
      }

      const uniqueLocations = Array.from(locations).slice(0, 8);

      if (type === "origin") {
        setOriginSuggestions(uniqueLocations);
      } else {
        setDestinationSuggestions(uniqueLocations);
      }
    } catch (err) {
      console.error("Error fetching location suggestions:", err);
      if (type === "origin") setOriginSuggestions([]);
      else setDestinationSuggestions([]);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  // Fetch origin suggestions when user types
  useEffect(() => {
    const timer = setTimeout(() => {
      if (originQuery.trim().length >= 2) {
        fetchLocationSuggestions(originQuery, "origin");
      } else {
        setOriginSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [originQuery]);

  // Fetch destination suggestions when user types
  useEffect(() => {
    const timer = setTimeout(() => {
      if (destinationQuery.trim().length >= 2) {
        fetchLocationSuggestions(destinationQuery, "destination");
      } else {
        setDestinationSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [destinationQuery]);

  // Fetch initial rides on component mount
  useEffect(() => {
    const fetchInitialRides = async () => {
      setLoading(true);
      setError(null);

      try {
        // Search for popular destinations to show some initial rides
        const popularDestinations = ["Downtown", "Airport", "Mall", "Station"];
        const fetchedRides: Ride[] = [];

        for (const destination of popularDestinations) {
          try {
            const result = await searchRides({
              to: destination,
              includeExpired: false,
            });
            fetchedRides.push(...result);
          } catch (err) {
            // Continue if one destination fails
            console.log(`No rides found for ${destination}`);
          }
        }

        // Remove duplicates based on _id
        const uniqueRides = Array.from(
          new Map(fetchedRides.map((ride) => [ride._id, ride])).values()
        );

        setAllRides(uniqueRides.slice(0, 12)); // Show max 12 initial rides
      } catch (err: any) {
        console.error("Error fetching initial rides:", err);
        setAllRides([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialRides();
  }, []);

  // Smart search: Fetch rides based on destination query
  useEffect(() => {
    const fetchRidesByDestination = async () => {
      const trimmedQuery = destinationQuery.trim();

      if (!trimmedQuery) {
        setHasSearched(false);
        return;
      }

      // Only search if user typed at least 2 characters
      if (trimmedQuery.length < 2) {
        return;
      }

      setLoading(true);
      setError(null);
      setHasSearched(true);

      try {
        const result = await searchRides({
          to: trimmedQuery,
          includeExpired: false,
        });
        setAllRides(result);
      } catch (err: any) {
        setError(err.message || "Failed to fetch rides");
        setAllRides([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search - wait for user to stop typing
    const timer = setTimeout(() => {
      fetchRidesByDestination();
    }, 400); // Reduced from 500ms to 400ms for faster response

    return () => clearTimeout(timer);
  }, [destinationQuery]);

  // Smart origin search: Fetch more rides when origin is entered
  useEffect(() => {
    const expandSearchWithOrigin = async () => {
      const trimmedOrigin = originQuery.trim();
      const trimmedDestination = destinationQuery.trim();

      // If user entered origin but no destination, search common destinations
      if (trimmedOrigin && trimmedOrigin.length >= 2 && !trimmedDestination) {
        setLoading(true);
        setError(null);
        setHasSearched(true);

        try {
          // Search multiple popular destinations to find rides from this origin
          const searchTerms = [
            "Downtown",
            "Airport",
            "Mall",
            "Station",
            "Campus",
            "University",
          ];

          const fetchedRides: Ride[] = [];

          for (const destination of searchTerms) {
            try {
              const result = await searchRides({
                to: destination,
                includeExpired: false,
              });
              fetchedRides.push(...result);
            } catch (err) {
              // Continue if one destination fails
              console.log(`No rides found for ${destination}`);
            }
          }

          // Remove duplicates
          const uniqueRides = Array.from(
            new Map(fetchedRides.map((ride) => [ride._id, ride])).values()
          );

          setAllRides(uniqueRides);
        } catch (err: any) {
          console.error("Error expanding search:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    // Debounce search
    const timer = setTimeout(() => {
      expandSearchWithOrigin();
    }, 400);

    return () => clearTimeout(timer);
  }, [originQuery, destinationQuery]);

  // Filter rides by both origin and destination locally
  const filteredRides = allRides.filter((ride) => {
    const matchesOrigin =
      !originQuery.trim() ||
      ride.from.toLowerCase().includes(originQuery.toLowerCase());

    const matchesDestination =
      !destinationQuery.trim() ||
      ride.to.toLowerCase().includes(destinationQuery.toLowerCase());

    return matchesOrigin && matchesDestination;
  });

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

  // Calculate split cost per person
  const calculateSplitCost = (totalPrice: number, maxSeats: number) => {
    return (totalPrice / maxSeats).toFixed(2);
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
                ? "bg-[#020402] opacity-[.97]"
                : "bg-gradient-to-br from-[#A9C5A0] via-[#C5EFCB] to-[#FFD166] opacity-[.97]"
            }`}
          />

          {/* Floating Orbs */}
          <motion.div
            className={`absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl ${
              isDark ? "bg-[#FF7F50]/10" : "bg-[#FF7F50]/30"
            }`}
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
              className={`mb-4 ${
                isDark
                  ? "text-[#C5EFCB] hover:bg-[#1A1F1A]"
                  : "text-[#020402] hover:bg-white/30"
              }`}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Button>

            <div className="flex items-center gap-4 mb-2">
              <div
                className={`p-3 rounded-2xl bg-gradient-to-br from-[#FF7F50] to-[#FFD166]`}
              >
                <Car className="w-8 h-8 text-white" />
              </div>
              <h1
                className={`text-4xl md:text-5xl ${
                  isDark ? "text-[#C5EFCB]" : "text-[#020402]"
                }`}
              >
                Find Shared Rides
              </h1>
            </div>
            <p
              className={`${
                isDark ? "text-[#758173]" : "text-[#020402]/70"
              } text-lg`}
            >
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
                ? "bg-[#1A1F1A]/60 border-[#3A463A]/50"
                : "bg-white/30 border-white/60"
            } border shadow-lg`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Origin Search */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <MapPin
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10 ${
                    isDark ? "text-[#FF7F50]" : "text-[#F4B400]"
                  }`}
                />
                <Input
                  type="text"
                  placeholder="Enter origin..."
                  value={originQuery}
                  onChange={(e) => setOriginQuery(e.target.value)}
                  onFocus={() => setShowOriginSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowOriginSuggestions(false), 200)
                  }
                  className={`pl-12 h-12 rounded-xl ${
                    isDark
                      ? "bg-[#020402]/50 border-[#3A463A] text-[#C5EFCB] placeholder:text-[#758173]"
                      : "bg-white/50 border-white text-[#020402] placeholder:text-[#020402]/50"
                  }`}
                />
                {/* Origin Suggestions Dropdown */}
                {showOriginSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute top-full left-0 right-0 mt-2 rounded-xl backdrop-blur-sm z-20 max-h-60 overflow-y-auto ${
                      isDark
                        ? "bg-[#1A1F1A] border-[#3A463A]"
                        : "bg-white border-gray-300"
                    } border-2 shadow-xl`}
                  >
                    {loadingSuggestions && originQuery.length >= 2 ? (
                      <div className="px-4 py-3 flex items-center gap-2">
                        <Loader2
                          className={`w-4 h-4 animate-spin ${
                            isDark ? "text-[#FF7F50]" : "text-[#F4B400]"
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
                    ) : originSuggestions.length > 0 ? (
                      originSuggestions.map((location, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{
                            backgroundColor: isDark
                              ? "rgba(255, 127, 80, 0.1)"
                              : "rgba(255, 127, 80, 0.05)",
                          }}
                          onClick={() => {
                            setOriginQuery(location);
                            setShowOriginSuggestions(false);
                          }}
                          className={`w-full text-left px-4 py-3 flex items-center gap-3 ${
                            isDark
                              ? "text-[#C5EFCB] hover:text-[#FF7F50]"
                              : "text-[#020402] hover:text-[#FF7F50]"
                          } transition-colors`}
                        >
                          <MapPin className="w-4 h-4 shrink-0" />
                          <span>{location}</span>
                        </motion.button>
                      ))
                    ) : originQuery.length >= 2 ? (
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

              {/* Destination Search */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Navigation
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10 ${
                    isDark ? "text-[#FFD166]" : "text-[#FF7F50]"
                  }`}
                />
                <Input
                  type="text"
                  placeholder="Enter destination..."
                  value={destinationQuery}
                  onChange={(e) => setDestinationQuery(e.target.value)}
                  onFocus={() => setShowDestinationSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowDestinationSuggestions(false), 200)
                  }
                  className={`pl-12 h-12 rounded-xl ${
                    isDark
                      ? "bg-[#020402]/50 border-[#3A463A] text-[#C5EFCB] placeholder:text-[#758173]"
                      : "bg-white/50 border-white text-[#020402] placeholder:text-[#020402]/50"
                  }`}
                />
                {/* Destination Suggestions Dropdown */}
                {showDestinationSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute top-full left-0 right-0 mt-2 rounded-xl backdrop-blur-sm z-20 max-h-60 overflow-y-auto ${
                      isDark
                        ? "bg-[#1A1F1A] border-[#3A463A]"
                        : "bg-white border-gray-300"
                    } border-2 shadow-xl`}
                  >
                    {loadingSuggestions && destinationQuery.length >= 2 ? (
                      <div className="px-4 py-3 flex items-center gap-2">
                        <Loader2
                          className={`w-4 h-4 animate-spin ${
                            isDark ? "text-[#FFD166]" : "text-[#FF7F50]"
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
                    ) : destinationSuggestions.length > 0 ? (
                      destinationSuggestions.map((location, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{
                            backgroundColor: isDark
                              ? "rgba(255, 209, 102, 0.1)"
                              : "rgba(255, 127, 80, 0.05)",
                          }}
                          onClick={() => {
                            setDestinationQuery(location);
                            setShowDestinationSuggestions(false);
                          }}
                          className={`w-full text-left px-4 py-3 flex items-center gap-3 ${
                            isDark
                              ? "text-[#C5EFCB] hover:text-[#FFD166]"
                              : "text-[#020402] hover:text-[#FF7F50]"
                          } transition-colors`}
                        >
                          <Navigation className="w-4 h-4 shrink-0" />
                          <span>{location}</span>
                        </motion.button>
                      ))
                    ) : destinationQuery.length >= 2 ? (
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

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                className={`w-full h-12 rounded-xl ${
                  isDark
                    ? "bg-gradient-to-r from-[#FF7F50] to-[#FFD166] hover:from-[#FFD166] hover:to-[#FF7F50] text-white"
                    : "bg-gradient-to-r from-[#FF7F50] to-[#F4B400] text-white"
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
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2
                  className={`w-5 h-5 animate-spin ${
                    isDark ? "text-[#FF7F50]" : "text-[#F4B400]"
                  }`}
                />
                <p
                  className={`${
                    isDark ? "text-[#758173]" : "text-[#020402]/70"
                  }`}
                >
                  {originQuery && destinationQuery
                    ? `Searching rides from "${originQuery}" to "${destinationQuery}"...`
                    : originQuery
                    ? `Finding rides from "${originQuery}"...`
                    : destinationQuery
                    ? `Searching rides to "${destinationQuery}"...`
                    : "Loading available rides..."}
                </p>
              </div>
            ) : error ? (
              <div className="flex items-center gap-2 text-red-500">
                <AlertCircle className="w-5 h-5" />
                <p>{error}</p>
              </div>
            ) : (
              <div>
                <p
                  className={`${
                    isDark ? "text-[#758173]" : "text-[#020402]/70"
                  }`}
                >
                  {hasSearched || originQuery || destinationQuery ? (
                    <>
                      {filteredRides.length > 0 ? (
                        <>
                          Found{" "}
                          <span
                            className={`font-semibold ${
                              isDark ? "text-[#FFD166]" : "text-[#FF7F50]"
                            }`}
                          >
                            {filteredRides.length}
                          </span>{" "}
                          {filteredRides.length === 1 ? "ride" : "rides"}
                          {originQuery && destinationQuery && (
                            <>
                              {" "}
                              from{" "}
                              <span
                                className={`font-medium ${
                                  isDark ? "text-[#C5EFCB]" : "text-[#020402]"
                                }`}
                              >
                                {originQuery}
                              </span>{" "}
                              to{" "}
                              <span
                                className={`font-medium ${
                                  isDark ? "text-[#C5EFCB]" : "text-[#020402]"
                                }`}
                              >
                                {destinationQuery}
                              </span>
                            </>
                          )}
                          {originQuery && !destinationQuery && (
                            <>
                              {" "}
                              from{" "}
                              <span
                                className={`font-medium ${
                                  isDark ? "text-[#C5EFCB]" : "text-[#020402]"
                                }`}
                              >
                                {originQuery}
                              </span>
                            </>
                          )}
                          {!originQuery && destinationQuery && (
                            <>
                              {" "}
                              to{" "}
                              <span
                                className={`font-medium ${
                                  isDark ? "text-[#C5EFCB]" : "text-[#020402]"
                                }`}
                              >
                                {destinationQuery}
                              </span>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          No rides found for your search. Try different
                          locations or{" "}
                          <button
                            onClick={onNavigateToCreateRide}
                            className={`underline ${
                              isDark
                                ? "text-[#FFD166] hover:text-[#FF7F50]"
                                : "text-[#FF7F50] hover:text-[#F4B400]"
                            } transition-colors`}
                          >
                            create a new ride
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {filteredRides.length > 0
                        ? `Showing ${filteredRides.length} available ride${
                            filteredRides.length > 1 ? "s" : ""
                          }. Search to find specific routes.`
                        : "No rides available at the moment. Be the first to create one!"}
                    </>
                  )}
                </p>
              </div>
            )}
          </motion.div>

          {/* Rides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRides.map((ride, index) => (
              <motion.div
                key={ride._id}
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
                onClick={() => onNavigateToDetail(ride._id)}
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

                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#FF7F50] to-[#FFD166]">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 2 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    {ride.createdBy?.profilePicture ? (
                      <img
                        src={ride.createdBy.profilePicture}
                        alt={ride.createdBy.name || "Driver"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Car className="w-24 h-24 text-white/70" />
                    )}
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Seats Available Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full backdrop-blur-md ${
                      isDark ? "bg-[#FF7F50]/90" : "bg-[#FF7F50]"
                    } text-white text-sm shadow-lg`}
                  >
                    {ride.maxSeats - ride.currentSeats} seats left
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-5 relative">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3
                        className={`text-xl ${
                          isDark ? "text-[#C5EFCB]" : "text-[#020402]"
                        }`}
                      >
                        {ride.createdBy?.name || "Unknown Driver"}
                      </h3>
                      {ride.vehicleDetails && (
                        <p
                          className={`text-sm ${
                            isDark ? "text-[#758173]" : "text-[#020402]/70"
                          }`}
                        >
                          {ride.vehicleDetails}
                        </p>
                      )}
                    </div>
                    <motion.div
                      className="flex items-center gap-1"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Users
                        className={`w-4 h-4 ${
                          isDark ? "text-[#F4B400]" : "text-[#FF7F50]"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          isDark ? "text-[#758173]" : "text-[#020402]/70"
                        }`}
                      >
                        {ride.currentSeats}/{ride.maxSeats}
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
                        <MapPin
                          className={`w-4 h-4 mt-1 shrink-0 ${
                            isDark ? "text-[#F4B400]" : "text-[#FF7F50]"
                          }`}
                        />
                      </motion.div>
                      <div className="flex-1">
                        <p
                          className={`text-sm ${
                            isDark ? "text-[#C5EFCB]" : "text-[#020402]"
                          }`}
                        >
                          {ride.from}
                        </p>
                        <div className="flex items-center gap-2 my-1">
                          <motion.div
                            className={`w-full h-px ${
                              isDark ? "bg-[#3A463A]" : "bg-[#020402]/20"
                            }`}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                              delay: 0.6 + index * 0.1,
                              duration: 0.5,
                            }}
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
                            <Navigation
                              className={`w-3 h-3 shrink-0 ${
                                isDark ? "text-[#758173]" : "text-[#020402]/50"
                              }`}
                            />
                          </motion.div>
                        </div>
                        <p
                          className={`text-sm ${
                            isDark ? "text-[#C5EFCB]" : "text-[#020402]"
                          }`}
                        >
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
                          <Clock
                            className={`w-4 h-4 ${
                              isDark ? "text-[#758173]" : "text-[#020402]/70"
                            }`}
                          />
                        </motion.div>
                        <span
                          className={`text-sm ${
                            isDark ? "text-[#758173]" : "text-[#020402]/70"
                          }`}
                        >
                          {formatDateTime(ride.expiryTime)}
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="flex items-center justify-between pt-4 border-t border-opacity-20"
                    style={{
                      borderColor: isDark ? "#3A463A" : "#020402",
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
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
                        Total: ${ride.totalPrice.toFixed(2)}
                      </p>
                      <motion.p
                        className={`text-2xl ${
                          isDark ? "text-[#FFD166]" : "text-[#FF7F50]"
                        }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        ${calculateSplitCost(ride.totalPrice, ride.maxSeats)}
                      </motion.p>
                      <p
                        className={`text-xs ${
                          isDark ? "text-[#758173]" : "text-[#020402]/70"
                        }`}
                      >
                        per person
                      </p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        className={`rounded-full shadow-md ${
                          isDark
                            ? "bg-gradient-to-r from-[#FF7F50] to-[#FFD166] hover:from-[#FFD166] hover:to-[#FF7F50] text-white"
                            : "bg-gradient-to-r from-[#FF7F50] to-[#F4B400] text-white"
                        }`}
                      >
                        View Details
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
                    ? "bg-gradient-to-r from-[#FF7F50] to-[#FFD166] hover:from-[#FFD166] hover:to-[#FF7F50] text-white"
                    : "bg-gradient-to-r from-[#FF7F50] to-[#F4B400] text-white"
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

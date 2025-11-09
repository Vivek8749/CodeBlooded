import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { 
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  UtensilsCrossed,
  Calendar,
  Plus,
  Trash2,
  ShoppingBag,
  Package,
  User,
  Phone
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

interface CreateFoodOrderProps {
  isDark: boolean;
  toggleTheme: () => void;
  onNavigateBack: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToRideSearch?: () => void;
  onNavigateToFoodSearch?: () => void;
}

interface FoodItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

const restaurants = [
  { 
    value: "pizza-palace", 
    label: "Pizza Palace", 
    icon: "🍕",
    cuisine: "Italian",
    menu: [
      { name: "Margherita Pizza", price: 12.99 },
      { name: "Pepperoni Pizza", price: 14.99 },
      { name: "Hawaiian Pizza", price: 13.99 },
      { name: "Veggie Supreme", price: 15.99 },
      { name: "Garlic Bread", price: 5.99 },
      { name: "Caesar Salad", price: 7.99 },
    ]
  },
  { 
    value: "burger-barn", 
    label: "Burger Barn", 
    icon: "🍔",
    cuisine: "American",
    menu: [
      { name: "Classic Burger", price: 9.99 },
      { name: "Cheeseburger", price: 10.99 },
      { name: "Bacon Burger", price: 12.99 },
      { name: "Veggie Burger", price: 9.99 },
      { name: "Fries", price: 4.99 },
      { name: "Onion Rings", price: 5.99 },
    ]
  },
  { 
    value: "sushi-spot", 
    label: "Sushi Spot", 
    icon: "🍱",
    cuisine: "Japanese",
    menu: [
      { name: "California Roll", price: 11.99 },
      { name: "Salmon Nigiri", price: 13.99 },
      { name: "Tuna Roll", price: 12.99 },
      { name: "Vegetable Tempura", price: 8.99 },
      { name: "Miso Soup", price: 4.99 },
      { name: "Edamame", price: 5.99 },
    ]
  },
  { 
    value: "taco-town", 
    label: "Taco Town", 
    icon: "🌮",
    cuisine: "Mexican",
    menu: [
      { name: "Beef Tacos (3)", price: 9.99 },
      { name: "Chicken Burrito", price: 11.99 },
      { name: "Vegetable Quesadilla", price: 8.99 },
      { name: "Nachos Supreme", price: 10.99 },
      { name: "Guacamole & Chips", price: 6.99 },
      { name: "Churros", price: 5.99 },
    ]
  },
  { 
    value: "noodle-house", 
    label: "Noodle House", 
    icon: "🍜",
    cuisine: "Asian",
    menu: [
      { name: "Pad Thai", price: 12.99 },
      { name: "Ramen Bowl", price: 13.99 },
      { name: "Lo Mein", price: 11.99 },
      { name: "Spring Rolls (6)", price: 7.99 },
      { name: "Fried Rice", price: 9.99 },
      { name: "Dumplings (8)", price: 8.99 },
    ]
  },
];

export function CreateFoodOrder({ isDark, toggleTheme, onNavigateBack, onNavigateToDashboard, onNavigateToRideSearch, onNavigateToFoodSearch }: CreateFoodOrderProps) {
  const handleNavigate = (page: string) => {
    if (page === 'dashboard') {
      onNavigateToDashboard?.();
    } else if (page === 'rides') {
      onNavigateToRideSearch?.();
    } else if (page === 'food') {
      onNavigateToFoodSearch?.();
    }
  };

  const [restaurant, setRestaurant] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [items, setItems] = useState<FoodItem[]>([
    { id: 1, name: "", quantity: 1, price: 0 }
  ]);
  const [totalCost, setTotalCost] = useState(0);

  const selectedRestaurant = restaurants.find(r => r.value === restaurant);

  // Calculate total cost when items change
  useEffect(() => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalCost(total);
  }, [items]);

  const addItem = () => {
    const newId = Math.max(...items.map(i => i.id), 0) + 1;
    setItems([...items, { id: newId, name: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: number, field: keyof FoodItem, value: any) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const updateItemFromMenu = (id: number, menuItemName: string) => {
    if (selectedRestaurant) {
      const menuItem = selectedRestaurant.menu.find(m => m.name === menuItemName);
      if (menuItem) {
        updateItem(id, "name", menuItem.name);
        updateItem(id, "price", menuItem.price);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      restaurant,
      deliveryLocation,
      deliveryDate,
      deliveryTime,
      organizerName,
      contactNumber,
      items,
      totalCost
    });
  };

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex flex-col">
      {/* Header */}
      <Header isDark={isDark} toggleTheme={toggleTheme} isAuthenticated={true} onNavigate={handleNavigate} />
      
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
      <div className="relative z-10 flex-1 px-6 pt-32 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onNavigateBack}
            className={`flex items-center gap-2 mb-8 px-4 py-2 rounded-xl backdrop-blur-xl ${
              isDark 
                ? 'bg-[#1A1F1A]/60 border-[#3A463A]/50 text-[#C5EFCB] hover:bg-[#1A1F1A]/80' 
                : 'bg-white/30 border-white/60 text-[#020402] hover:bg-white/50'
            } border transition-all`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Food Orders</span>
          </motion.button>

          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className={`text-4xl md:text-5xl mb-4 ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
              Create New Food Order
            </h1>
            <p className={`text-xl ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
              Order together and split delivery costs with other students
            </p>
          </motion.div>

          {/* Form and Preview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`rounded-3xl backdrop-blur-xl p-8 ${
                isDark 
                  ? 'bg-[#1A1F1A]/60 border-[#3A463A]/50' 
                  : 'bg-white/30 border-white/60'
              } border shadow-2xl`}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#F4B400] to-[#FFD166]">
                  <UtensilsCrossed className="w-6 h-6 text-white" />
                </div>
                <h2 className={`text-2xl ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                  Order Details
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Restaurant */}
                <div className="space-y-2">
                  <Label htmlFor="restaurant" className={isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}>
                    <div className="flex items-center gap-2">
                      <UtensilsCrossed className="w-4 h-4 text-[#F4B400]" />
                      Restaurant
                    </div>
                  </Label>
                  <Select value={restaurant} onValueChange={setRestaurant} required>
                    <SelectTrigger className={`${
                      isDark 
                        ? 'bg-[#020402]/40 border-[#3A463A] text-[#C5EFCB]' 
                        : 'bg-white/50 border-white/60 text-[#020402]'
                    } backdrop-blur-sm`}>
                      <SelectValue placeholder="Select restaurant" />
                    </SelectTrigger>
                    <SelectContent className={isDark ? 'bg-[#1A1F1A] border-[#3A463A]' : 'bg-white border-gray-200'}>
                      {restaurants.map((rest) => (
                        <SelectItem 
                          key={rest.value} 
                          value={rest.value}
                          className={isDark ? 'text-[#C5EFCB] focus:bg-[#3A463A] focus:text-[#C5EFCB]' : 'text-[#020402]'}
                        >
                          <div className="flex items-center gap-2">
                            <span>{rest.icon}</span>
                            <span>{rest.label}</span>
                            <span className={`text-xs ${isDark ? 'text-[#758173]' : 'text-[#020402]/60'}`}>
                              ({rest.cuisine})
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Delivery Location */}
                <div className="space-y-2">
                  <Label htmlFor="delivery-location" className={isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#FF7F50]" />
                      Delivery To
                    </div>
                  </Label>
                  <Input
                    id="delivery-location"
                    type="text"
                    placeholder="e.g., Student Dormitory Block A"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    className={`${
                      isDark 
                        ? 'bg-[#020402]/40 border-[#3A463A] text-[#C5EFCB] placeholder:text-[#758173]' 
                        : 'bg-white/50 border-white/60 text-[#020402] placeholder:text-[#020402]/50'
                    } backdrop-blur-sm`}
                    required
                  />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className={isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#F4B400]" />
                        Delivery Date
                      </div>
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className={`${
                        isDark 
                          ? 'bg-[#020402]/40 border-[#3A463A] text-[#C5EFCB]' 
                          : 'bg-white/50 border-white/60 text-[#020402]'
                      } backdrop-blur-sm`}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time" className={isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#F4B400]" />
                        Delivery Time
                      </div>
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      className={`${
                        isDark 
                          ? 'bg-[#020402]/40 border-[#3A463A] text-[#C5EFCB]' 
                          : 'bg-white/50 border-white/60 text-[#020402]'
                      } backdrop-blur-sm`}
                      required
                    />
                  </div>
                </div>

                {/* Organizer Name */}
                <div className="space-y-2">
                  <Label htmlFor="organizer-name" className={isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}>
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
                        ? 'bg-[#020402]/40 border-[#3A463A] text-[#C5EFCB] placeholder:text-[#758173]' 
                        : 'bg-white/50 border-white/60 text-[#020402] placeholder:text-[#020402]/50'
                    } backdrop-blur-sm`}
                    required
                  />
                </div>

                {/* Contact Number */}
                <div className="space-y-2">
                  <Label htmlFor="contact-number" className={isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}>
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
                        ? 'bg-[#020402]/40 border-[#3A463A] text-[#C5EFCB] placeholder:text-[#758173]' 
                        : 'bg-white/50 border-white/60 text-[#020402] placeholder:text-[#020402]/50'
                    } backdrop-blur-sm`}
                    required
                  />
                </div>

                {/* Items Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className={isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}>
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-[#F4B400]" />
                        Items
                      </div>
                    </Label>
                    <Button
                      type="button"
                      onClick={addItem}
                      size="sm"
                      variant="outline"
                      className={`${
                        isDark 
                          ? 'bg-[#F4B400]/20 border-[#F4B400] text-[#C5EFCB] hover:bg-[#F4B400]/30' 
                          : 'bg-[#F4B400]/20 border-[#F4B400] text-[#020402] hover:bg-[#F4B400]/30'
                      }`}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Item
                    </Button>
                  </div>

                  {/* Item List */}
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`p-4 rounded-xl ${
                          isDark 
                            ? 'bg-[#020402]/40 border-[#3A463A]' 
                            : 'bg-white/50 border-white/60'
                        } border space-y-3`}
                      >
                        <div className="flex items-start justify-between">
                          <span className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                            Item {index + 1}
                          </span>
                          {items.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              size="sm"
                              variant="ghost"
                              className={`h-6 w-6 p-0 ${
                                isDark 
                                  ? 'text-[#FF7F50] hover:bg-[#FF7F50]/20' 
                                  : 'text-[#FF7F50] hover:bg-[#FF7F50]/20'
                              }`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>

                        {/* Item Name */}
                        <div className="space-y-1">
                          <Label htmlFor={`item-name-${item.id}`} className={`text-xs ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                            Food Item
                          </Label>
                          {restaurant ? (
                            <Select 
                              value={item.name} 
                              onValueChange={(value) => updateItemFromMenu(item.id, value)}
                              required
                            >
                              <SelectTrigger className={`${
                                isDark 
                                  ? 'bg-[#1A1F1A]/40 border-[#3A463A] text-[#C5EFCB]' 
                                  : 'bg-white/70 border-white/80 text-[#020402]'
                              } h-9 text-sm`}>
                                <SelectValue placeholder="Select item" />
                              </SelectTrigger>
                              <SelectContent className={isDark ? 'bg-[#1A1F1A] border-[#3A463A]' : 'bg-white border-gray-200'}>
                                {selectedRestaurant?.menu.map((menuItem) => (
                                  <SelectItem 
                                    key={menuItem.name} 
                                    value={menuItem.name}
                                    className={isDark ? 'text-[#C5EFCB] focus:bg-[#3A463A] focus:text-[#C5EFCB]' : 'text-[#020402]'}
                                  >
                                    {menuItem.name} - ${menuItem.price}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input
                              id={`item-name-${item.id}`}
                              type="text"
                              placeholder="Select a restaurant first"
                              disabled
                              className={`${
                                isDark 
                                  ? 'bg-[#1A1F1A]/40 border-[#3A463A] text-[#758173]' 
                                  : 'bg-white/70 border-white/80 text-[#020402]/50'
                              } h-9 text-sm`}
                            />
                          )}
                        </div>

                        {/* Quantity and Price */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label htmlFor={`item-qty-${item.id}`} className={`text-xs ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                              Quantity
                            </Label>
                            <Input
                              id={`item-qty-${item.id}`}
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 1)}
                              className={`${
                                isDark 
                                  ? 'bg-[#1A1F1A]/40 border-[#3A463A] text-[#C5EFCB]' 
                                  : 'bg-white/70 border-white/80 text-[#020402]'
                              } h-9 text-sm`}
                              required
                            />
                          </div>

                          <div className="space-y-1">
                            <Label className={`text-xs ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                              Subtotal
                            </Label>
                            <div className={`h-9 flex items-center px-3 rounded-md ${
                              isDark 
                                ? 'bg-[#1A1F1A]/40 border border-[#3A463A] text-[#F4B400]' 
                                : 'bg-white/70 border border-white/80 text-[#FF7F50]'
                            } text-sm`}>
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Total Cost Display */}
                {totalCost > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl ${
                      isDark 
                        ? 'bg-[#F4B400]/10 border-[#F4B400]/30' 
                        : 'bg-[#F4B400]/20 border-[#F4B400]/40'
                    } border space-y-3`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-[#F4B400]" />
                        <span className={isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}>
                          Total Food Cost
                        </span>
                      </div>
                      <span className={`text-xl ${isDark ? 'text-[#F4B400]' : 'text-[#FF7F50]'}`}>
                        ${totalCost.toFixed(2)}
                      </span>
                    </div>

                    <div className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'} pt-2 border-t border-current/20`}>
                      💡 Delivery fee will be split among all participants
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className={`w-full py-6 text-lg bg-gradient-to-r from-[#F4B400] to-[#FFD166] hover:from-[#FFD166] hover:to-[#F4B400] text-white shadow-lg hover:shadow-xl transition-all`}
                >
                  <UtensilsCrossed className="w-5 h-5 mr-2" />
                  Create Food Order
                </Button>
              </form>
            </motion.div>

            {/* Right: Order Summary Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`rounded-3xl backdrop-blur-xl overflow-hidden ${
                isDark 
                  ? 'bg-[#1A1F1A]/60 border-[#3A463A]/50' 
                  : 'bg-white/30 border-white/60'
              } border shadow-2xl h-fit lg:sticky lg:top-32`}
            >
              <div className={`p-6 border-b ${isDark ? 'border-[#3A463A]' : 'border-white/40'}`}>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#FF7F50] to-[#F4B400]">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-xl ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                      Order Summary
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                      {selectedRestaurant ? selectedRestaurant.label : 'Select a restaurant'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Restaurant Info */}
                {selectedRestaurant && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl ${
                      isDark 
                        ? 'bg-[#020402]/40 border-[#3A463A]' 
                        : 'bg-white/50 border-white/60'
                    } border`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{selectedRestaurant.icon}</span>
                      <div>
                        <h4 className={`${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                          {selectedRestaurant.label}
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                          {selectedRestaurant.cuisine} Cuisine
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Delivery Info */}
                {deliveryLocation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className={`w-5 h-5 mt-0.5 ${isDark ? 'text-[#FF7F50]' : 'text-[#F4B400]'}`} />
                      <div>
                        <p className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                          Delivering to
                        </p>
                        <p className={isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}>
                          {deliveryLocation}
                        </p>
                      </div>
                    </div>

                    {deliveryDate && deliveryTime && (
                      <div className="flex items-start gap-3">
                        <Clock className={`w-5 h-5 mt-0.5 ${isDark ? 'text-[#F4B400]' : 'text-[#FF7F50]'}`} />
                        <div>
                          <p className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                            Delivery time
                          </p>
                          <p className={isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}>
                            {new Date(deliveryDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })} at {deliveryTime}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Items List */}
                {items.some(item => item.name) && (
                  <div className="space-y-3">
                    <h4 className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                      Order Items
                    </h4>
                    <div className="space-y-2">
                      {items.filter(item => item.name).map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            isDark 
                              ? 'bg-[#020402]/30' 
                              : 'bg-white/40'
                          }`}
                        >
                          <div className="flex-1">
                            <p className={`text-sm ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                              {item.name}
                            </p>
                            <p className={`text-xs ${isDark ? 'text-[#758173]' : 'text-[#020402]/60'}`}>
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <span className={`${isDark ? 'text-[#F4B400]' : 'text-[#FF7F50]'}`}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Visual Separator */}
                {items.some(item => item.name) && totalCost > 0 && (
                  <div className={`border-t ${isDark ? 'border-[#3A463A]' : 'border-white/40'}`} />
                )}

                {/* Total */}
                {totalCost > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between pt-2"
                  >
                    <span className={`text-lg ${isDark ? 'text-[#C5EFCB]' : 'text-[#020402]'}`}>
                      Total
                    </span>
                    <span className={`text-2xl ${isDark ? 'text-[#F4B400]' : 'text-[#FF7F50]'}`}>
                      ${totalCost.toFixed(2)}
                    </span>
                  </motion.div>
                )}

                {/* Empty State */}
                {!selectedRestaurant && !deliveryLocation && items.every(item => !item.name) && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🍽️</div>
                    <p className={`text-sm ${isDark ? 'text-[#758173]' : 'text-[#020402]/70'}`}>
                      Fill out the form to see your order summary
                    </p>
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

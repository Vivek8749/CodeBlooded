import { privateAxios } from "./AxiosInstance";

export interface FoodOrder {
  _id: string;
  createdBy?: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    profilePicture?: string;
  } | null;
  restaurant: string;
  MinSpent: number;
  Offer?: {
    isPercentage: boolean;
    amount: number;
  }[];
  currentParticipants: number;
  maxParticipants?: number;
  participants?: {
    user: {
      _id: string;
      name: string;
      profilePicture?: string;
    };
    joinedAt: Date;
  }[];
  totalPrice: number;
  expiryTime: string;
  expired: boolean;
  notes?: string;
  deliveryLocation?: string;
  cuisine?: string;
  items?: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

export interface SearchFoodParams {
  restaurant?: string;
  cuisine?: string;
  location?: string;
  includeExpired?: boolean;
}

export interface CreateFoodOrderData {
  restaurant: string;
  minSpent: number;
  offer?: {
    isPercentage: boolean;
    amount: number;
  }[];
  totalPrice: number;
  expiryTime: string;
  deliveryLocation?: string;
  cuisine?: string;
  notes?: string;
  maxParticipants?: number;
  items?: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

// Create a new food order
export const createFoodOrder = async (data: CreateFoodOrderData): Promise<FoodOrder> => {
  const response = await privateAxios.post("/api/v1/food", data);
  return response.data.data.foodOrder;
};

// Search food orders
export const searchFoodOrders = async (params: SearchFoodParams): Promise<FoodOrder[]> => {
  const response = await privateAxios.get("/api/v1/food/search", { params });
  return response.data.data.foodOrders;
};

// Get specific food order details
export const getFoodOrderDetails = async (foodOrderId: string): Promise<FoodOrder> => {
  const response = await privateAxios.get(`/api/v1/food/${foodOrderId}`);
  return response.data.data.foodOrder;
};

// Join a food order
export const joinFoodOrder = async (foodOrderId: string): Promise<FoodOrder> => {
  const response = await privateAxios.post(`/api/v1/food/${foodOrderId}/join`);
  return response.data.data.foodOrder;
};

// Leave a food order
export const leaveFoodOrder = async (foodOrderId: string): Promise<FoodOrder> => {
  const response = await privateAxios.post(`/api/v1/food/${foodOrderId}/leave`);
  return response.data.data.foodOrder;
};

// Get user's food orders (created and joined)
export const getUserFoodOrders = async (): Promise<{
  createdOrders: FoodOrder[];
  joinedOrders: FoodOrder[];
}> => {
  const response = await privateAxios.get("/api/v1/food/my-orders");
  return response.data.data;
};

// Delete a food order (creator only)
export const deleteFoodOrder = async (foodOrderId: string): Promise<void> => {
  await privateAxios.delete(`/api/v1/food/${foodOrderId}`);
};

import { privateAxios } from "./AxiosInstance";

// Define response types
interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  profilePicture?: string;
  studentId?: string;
}

interface Participant {
  user: User;
  joinedAt: string;
}

interface Ride {
  _id: string;
  createdBy: User;
  from: string;
  to: string;
  vehicleDetails?: string;
  maxSeats: number;
  currentSeats: number;
  participants: Participant[];
  totalPrice: number;
  expiryTime: string;
  expired: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface RideResponse {
  ride: Ride;
}

interface RidesResponse {
  rides: Ride[];
}

interface RideDetailsResponse {
  ride: Ride;
  payment: {
    splitAmount: number;
    totalParticipants: number;
    isExpired: boolean;
    userAmount: number | null;
  };
}

interface CreateRideData {
  from: string;
  to: string;
  expiryTime: string;
  maxSeats: number;
  totalPrice: number;
  vehicleDetails?: string;
  notes?: string;
}

interface SearchRidesParams {
  to: string;
  date?: string;
  includeExpired?: boolean;
}

// Create a new ride
export const createRide = async (
  rideData: CreateRideData
): Promise<RideResponse> => {
  try {
    const response = await privateAxios.post<{ data: RideResponse }>(
      "/api/v1/rides",
      rideData
    );
    return response.data.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Failed to create ride";
    throw new Error(errorMessage);
  }
};

// Search for rides
export const searchRides = async (
  params: SearchRidesParams
): Promise<Ride[]> => {
  try {
    const response = await privateAxios.get<{ data: RidesResponse }>(
      "/api/v1/rides/search",
      { params }
    );
    return response.data.data.rides;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Failed to search rides";
    throw new Error(errorMessage);
  }
};

// Get ride details
export const getRideDetails = async (
  rideId: string
): Promise<RideDetailsResponse> => {
  try {
    const response = await privateAxios.get<{ data: RideDetailsResponse }>(
      `/api/v1/rides/${rideId}`
    );
    return response.data.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Failed to get ride details";
    throw new Error(errorMessage);
  }
};

// Get user's rides (created and joined)
export const getUserRides = async (): Promise<{ created: Ride[]; joined: Ride[] }> => {
  try {
    const response = await privateAxios.get<{ data: { created: Ride[]; joined: Ride[] } }>(
      "/api/v1/rides/my-rides"
    );
    return response.data.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Failed to get user rides";
    throw new Error(errorMessage);
  }
};

// Join a ride
export const joinRide = async (rideId: string): Promise<RideResponse> => {
  try {
    const response = await privateAxios.post<{ data: RideResponse }>(
      `/api/v1/rides/${rideId}/join`
    );
    return response.data.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Failed to join ride";
    throw new Error(errorMessage);
  }
};

// Leave a ride
export const leaveRide = async (rideId: string): Promise<RideResponse> => {
  try {
    const response = await privateAxios.post<{ data: RideResponse }>(
      `/api/v1/rides/${rideId}/leave`
    );
    return response.data.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Failed to leave ride";
    throw new Error(errorMessage);
  }
};

// Delete a ride (creator only)
export const deleteRide = async (rideId: string): Promise<void> => {
  try {
    await privateAxios.delete(`/api/v1/rides/${rideId}`);
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || "Failed to delete ride";
    throw new Error(errorMessage);
  }
};

// Export types for use in components
export type {
  Ride,
  User,
  Participant,
  RideResponse,
  RidesResponse,
  RideDetailsResponse,
  CreateRideData,
  SearchRidesParams,
};

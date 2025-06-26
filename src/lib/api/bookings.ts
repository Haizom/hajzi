import { Booking } from '@/types/booking';

const API_URL = '/api';

export const createBooking = async (token: string, bookingData: Partial<Booking>): Promise<Booking> => {
  const response = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create booking');
  }

  const result = await response.json();
  return result.data;
};

export const getUserBookings = async (token: string): Promise<Booking[]> => {
  const response = await fetch(`${API_URL}/bookings/user`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch user bookings');
  }

  const result = await response.json();
  return result.data;
};

export const getOwnerBookings = async (token: string): Promise<Booking[]> => {
  const response = await fetch(`${API_URL}/bookings/owner`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch owner bookings');
  }

  const result = await response.json();
  return result.data;
};

export const updateBookingStatus = async (token: string, id: string, status: string): Promise<Booking> => {
  const response = await fetch(`${API_URL}/bookings/status/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update booking status');
  }

  const result = await response.json();
  return result.data;
};

export const cancelBooking = async (token: string, id: string): Promise<Booking> => {
  const response = await fetch(`${API_URL}/bookings/cancel/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to cancel booking');
  }

  const result = await response.json();
  return result.data;
};
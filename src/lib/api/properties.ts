import { Property } from '@/types/property';

const API_URL = '/api';

export const getAllProperties = async (): Promise<Property[]> => {
  const response = await fetch(`${API_URL}/properties`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch properties');
  }

  const result = await response.json();
  return result.data;
};

export const getPropertyById = async (id: string): Promise<Property> => {
  const response = await fetch(`${API_URL}/properties/${id}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch property');
  }

  const result = await response.json();
  return result.data;
};

export const createProperty = async (token: string, propertyData: Partial<Property>): Promise<Property> => {
  const response = await fetch(`${API_URL}/properties`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(propertyData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create property');
  }

  const result = await response.json();
  return result.data;
};

export const updateProperty = async (token: string, id: string, propertyData: Partial<Property>): Promise<Property> => {
  const response = await fetch(`${API_URL}/properties/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(propertyData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update property');
  }

  const result = await response.json();
  return result.data;
};

export const deleteProperty = async (token: string, id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/properties/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete property');
  }
};

export const getOwnerProperties = async (token: string): Promise<Property[]> => {
  const response = await fetch(`${API_URL}/properties/owner/properties`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch owner properties');
  }

  const result = await response.json();
  return result.data;
};
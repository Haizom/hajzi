import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'owner' | 'user';

export type User = {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  isVerified: boolean;
  propertyId?: string; // For property owners
};

// Mock users for demo
export const MOCK_USERS = {
  owner: {
    id: '1',
    email: 'crown.plaza@example.com',
    fullName: 'Crown Plaza Hotel',
    role: 'owner' as UserRole,
    isVerified: true,
    propertyId: '3' // ID of Crown Plaza Hotel from HOTELS_DATA
  },
  user: {
    id: '2',
    email: 'user@example.com',
    fullName: 'Ahmed Mohammed',
    role: 'user' as UserRole,
    isVerified: true
  }
};

type AuthStore = {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  signOut: () => void;
  signIn: (email: string, password: string) => Promise<User>;
};

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ isLoading: loading }),
      signOut: () => set({ user: null }),
      signIn: async (email: string, password: string) => {
        // Mock authentication
        // In a real app, this would be an API call
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // Mock passwords
            const mockPasswords = {
              'crown.plaza@example.com': 'owner123',
              'user@example.com': 'user123'
            };

            if (mockPasswords[email as keyof typeof mockPasswords] === password) {
              const user = email === 'crown.plaza@example.com' ? MOCK_USERS.owner : MOCK_USERS.user;
              set({ user });
              resolve(user);
            } else {
              reject(new Error('Invalid credentials'));
            }
          }, 1000);
        });
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);
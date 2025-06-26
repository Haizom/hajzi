import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser, registerUser, getCurrentUser } from '@/lib/api/auth';

export type UserRole = 'owner' | 'user' | 'admin';

export type User = {
  _id: string;
  email: string;
  fullName: string;
  role: UserRole;
  isVerified: boolean;
  phone?: string;
  country?: string;
  state?: string;
  createdAt: string;
};

type AuthStore = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  signOut: () => void;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (userData: {
    fullName: string;
    email: string;
    password: string;
    phone: string;
    country: string;
    state: string;
  }) => Promise<User>;
  loadUser: () => Promise<User | null>;
};

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      signOut: () => set({ user: null, token: null }),
      signIn: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { token, user } = await loginUser({ email, password });
          set({ user, token, isLoading: false });
          return user;
        } catch (error) {
          set({ isLoading: false, error: error instanceof Error ? error.message : 'Login failed' });
          throw error;
        }
      },
      signUp: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const { token, user } = await registerUser(userData);
          set({ user, token, isLoading: false });
          return user;
        } catch (error) {
          set({ isLoading: false, error: error instanceof Error ? error.message : 'Registration failed' });
          throw error;
        }
      },
      loadUser: async () => {
        const { token } = get();
        if (!token) return null;
        
        set({ isLoading: true, error: null });
        try {
          const { user } = await getCurrentUser(token);
          set({ user, isLoading: false });
          return user;
        } catch (error) {
          set({ isLoading: false, error: error instanceof Error ? error.message : 'Failed to load user', token: null, user: null });
          return null;
        }
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);
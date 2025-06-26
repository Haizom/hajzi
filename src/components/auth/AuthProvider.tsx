import { useEffect } from 'react';
import { useAuth } from '@/lib/store/useAuth';

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const { loadUser } = useAuth();

  useEffect(() => {
    // Load user on initial mount
    loadUser();
  }, [loadUser]);

  return <>{children}</>;
}
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/lib/store/useAuth';

type AuthGuardProps = {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireUnauth?: boolean;
  requireRole?: UserRole;
};

export function AuthGuard({ children, requireAuth, requireUnauth, requireRole }: AuthGuardProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (requireAuth && !user) {
      navigate('/sign-in');
    } else if (requireUnauth && user) {
      navigate('/');
    } else if (requireRole && user && user.role !== requireRole) {
      navigate('/');
    }
  }, [user, requireAuth, requireUnauth, requireRole, navigate]);

  if ((requireAuth && !user) || (requireUnauth && user) || (requireRole && user?.role !== requireRole)) {
    return null;
  }

  return <>{children}</>;
}
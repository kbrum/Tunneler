import {Spinner} from '@/components/ui/spinner';
import {useSession} from '@/hooks/use-session';
import {Navigate, Outlet, useLocation} from 'react-router-dom';

export function RequireAuth() {
  const {isAuthenticated, isLoading, user, isError} = useSession();
  const location = useLocation();

  console.log('RequireAuth State:', {isLoading, isAuthenticated, user});

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#09090b] text-white">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  if (!isAuthenticated || isError) {
    return <Navigate to="/login" state={{from: location}} replace />;
  }

  return <Outlet />;
}

import {getSessionAction, logoutUserAction} from '@/actions/auth.actions';
import {useMutation, useQuery} from '@tanstack/react-query';

export function useSession() {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['session'],
    queryFn: getSessionAction,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return {
    user,
    isLoading,
    isError,
    isAuthenticated: !!user,
  };
}

export function useLogout() {
  const logout = useMutation({
    mutationFn: () => logoutUserAction(),
  });

  return {
    logout: logout.mutateAsync,
    isLoadingLogout: logout.isPending,
    error: logout.error,
  };
}

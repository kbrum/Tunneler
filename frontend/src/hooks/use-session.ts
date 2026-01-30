import {getSessionAction, logoutUserAction} from '@/actions/auth.actions';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

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
  const queryClient = useQueryClient();

  const logout = useMutation({
    mutationFn: () => logoutUserAction(),
    onSuccess: async () => {
      await queryClient.setQueryData(['session'], null);
      await queryClient.resetQueries({queryKey: ['session']});
    },
  });

  return {
    logout: logout.mutateAsync,
    isLoadingLogout: logout.isPending,
    error: logout.error,
  };
}

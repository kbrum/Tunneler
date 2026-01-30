import {createUserAction, loginUserAction} from '@/actions/auth.actions';
import {useMutation, useQueryClient} from '@tanstack/react-query';

export function useLogin() {
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: (props: {email: string; password: string}) =>
      loginUserAction(props.email, props.password),
    onSuccess: async () => {
      await queryClient.resetQueries({queryKey: ['session']});
    },
  });

  return {
    login: login.mutateAsync,
    isLoadingLogin: login.isPending,
    error: login.error,
  };
}

export function useRegister() {
  const queryClient = useQueryClient();

  const register = useMutation({
    mutationFn: (props: {email: string; password: string; name: string}) =>
      createUserAction(props.email, props.password, props.name),
    onSuccess: async () => {
      await queryClient.resetQueries({queryKey: ['session']});
    },
  });

  return {
    register: register.mutateAsync,
    isLoadingRegister: register.isPending,
    error: register.error,
  };
}

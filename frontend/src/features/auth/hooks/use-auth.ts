import {createUserAction, loginUserAction} from '@/actions/auth.actions';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {dto} from '../../../../wailsjs/go/models';

export function useLogin() {
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: (props: {email: string; password: string}) =>
      loginUserAction(new dto.LoginRequestDTO(props)),
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
      createUserAction(new dto.CreateUserRequestDTO(props)),
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

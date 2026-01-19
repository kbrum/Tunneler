import {
  createUserAction,
  loginUserAction,
  logoutUserAction,
} from '@/actions/auth.actions';
import {useMutation} from '@tanstack/react-query';

export function useLogin() {
  const login = useMutation({
    mutationFn: (props: {email: string; password: string}) =>
      loginUserAction(props.email, props.password),
  });

  return {
    login: login.mutateAsync,
    isLoadingLogin: login.isPending,
    error: login.error,
  };
}

export function useRegister() {
  const register = useMutation({
    mutationFn: (props: {email: string; password: string; name: string}) =>
      createUserAction(props.email, props.password, props.name),
  });

  return {
    register: register.mutateAsync,
    isLoadingRegister: register.isPending,
    error: register.error,
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

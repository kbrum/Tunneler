import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {dto} from '../../../../wailsjs/go/models';
import {createSessionAction, getSessionsAction} from '@/actions/ssh.actions';

export function useGetSSHSessions() {
  const {
    data: sshSessions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['sshSession'],
    queryFn: getSessionsAction,
  });

  return {
    sshSessions,
    isLoading,
    isError,
  };
}

export function useCreateSSHSession() {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (props: {
      ssh_session_name: string;
      ssh_session_ip: string;
      ssh_session_port: number;
      ssh_session_user: string;
      folder_id: string;
      key_id: string;
      ssh_session_auth_type: string;
    }) => createSessionAction(new dto.CreateSSHSessionRequestDTO(props)),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['sshSession']});
    },
  });

  return {
    createSSHSession: create.mutateAsync,
    isLoadingCreate: create.isPending,
    isErrorCreate: create.isError,
  };
}

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {dto} from '../../../../wailsjs/go/models';
import {
  createSessionAction,
  deleteSessionAction,
  getSessionByIDAction,
  getSessionsAction,
  updateSessionAction,
} from '@/actions/ssh.actions';

export function useGetSSHSessions() {
  const queryClient = useQueryClient();

  const {
    data: sshSessions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['sshSession'],
    queryFn: getSessionsAction,
  });

  const getSessionByID = useMutation({
    mutationFn: (id: string) =>
      getSessionByIDAction(new dto.GetSessionRequestDTO(id)),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['sshSession']});
    },
  });

  const createMutation = useMutation({
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

  const updateMutation = useMutation({
    mutationFn: (props: {
      ssh_session_id: string;
      ssh_session_name: string;
      ssh_session_ip: string;
      ssh_session_port: number;
      ssh_session_user: string;
      folder_id: string;
      key_id: string;
      ssh_session_auth_type: string;
    }) => updateSessionAction(new dto.UpdateSessionRequestDTO(props)),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['sshSession']});
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteSessionAction(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['sshSession']});
    },
  });

  return {
    sshSessions,
    isLoading,
    isError,
    getSessionByID: getSessionByID.mutateAsync,
    isLoadingGetByID: getSessionByID.isPending,
    isErrorGetByID: getSessionByID.isError,
    createSSHSession: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isErrorCreate: createMutation.isError,
    updateSSHSession: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    isErrorUpdate: updateMutation.isError,
    deleteSSHSession: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    isErrorDelete: deleteMutation.isError,
  };
}

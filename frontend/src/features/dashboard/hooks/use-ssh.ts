import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {dto} from '../../../../wailsjs/go/models';
import {
  createSessionAction,
  deleteSessionAction,
  getSessionByIDAction,
  getSessionsAction,
  updateSessionAction,
} from '@/actions/ssh.actions';

export function useSSHSessions() {
  const queryClient = useQueryClient();

  const {
    data: sshSessions,
    isLoading,
    isError,
    refetch,
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
      name: string;
      ip: string;
      port: number;
      user: string;
      password: string;
      folder_id: string;
      key_id: string;
      auth_type: string;
    }) => createSessionAction(new dto.CreateSessionRequestDTO(props)),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['sshSession']});
    },
  });

  const updateMutation = useMutation({
    mutationFn: (props: {
      id: string;
      name: string;
      ip: string;
      port: number;
      user: string;
      status: string;
      auth_type: string;
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
    refetch,
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

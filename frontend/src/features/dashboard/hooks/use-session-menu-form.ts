import {zodResolver} from '@hookform/resolvers/zod';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {
  sessionUpdateSchema,
  type SessionUpdateSchema,
} from '@/features/dashboard/types/session.schema';
import {useSessionStore} from '@/features/dashboard/stores/session.store';

export function useSessionMenuForm() {
  const {isSessionMenuDialogOpen, ip, port, user, label} = useSessionStore();

  const form = useForm<SessionUpdateSchema>({
    resolver: zodResolver(sessionUpdateSchema),
    defaultValues: {
      name: '',
      ip: '',
      port: '22',
      user: '',
      password: '',
    },
  });

  useEffect(() => {
    if (!isSessionMenuDialogOpen) {
      return;
    }

    form.reset({
      name: label ?? '',
      ip: ip ?? '',
      port: port ? String(port) : '22',
      user: user ?? '',
      password: '',
    });
  }, [form, isSessionMenuDialogOpen, ip, label, port, user]);

  return form;
}

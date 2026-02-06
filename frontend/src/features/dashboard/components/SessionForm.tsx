import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {
  sessionCreateSchema,
  type SessionCreateSchema,
} from '@/features/dashboard/types/session.schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {useSSHSessions} from '../hooks/use-ssh';
import {Spinner} from '@/components/ui/spinner';
import {toast} from 'sonner';
import {useSessionStore} from '@/features/dashboard/store/session.store';

export function SessionForm() {
  const {createSSHSession, isCreating, isUpdating} = useSSHSessions();
  const {setIsDialogOpen} = useSessionStore();

  const form = useForm<SessionCreateSchema>({
    resolver: zodResolver(sessionCreateSchema),
    defaultValues: {
      name: '',
      user: '',
      password: '',
      ip: '',
      port: '22',
    },
  });

  const handleCreate = async (data: SessionCreateSchema) => {
    console.log('Submitting form data:', data);
    try {
      await createSSHSession({
        name: data.name ?? '',
        ip: data.ip,
        user: data.user,
        password: data.password,
        port: Number(data.port),
        auth_type: 'password',
        folder_id: '',
        key_id: '',
      });
      console.log('Session created successfully');
      toast.success('Session created successfully');
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error creating session:', error);
      toast.error('Error creating session');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreate)}
        className="flex h-full w-full flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="ip"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter the IP of the server" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="user"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter the remote user" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter the password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="port"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter the port" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter the label of the session (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full items-center justify-end">
          <Button
            type="submit"
            className="bg-[#2f3191] font-semibold text-[#ffffff] hover:bg-[#2f3191]/60"
          >
            {isCreating || isUpdating ? <Spinner /> : 'Create Session'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

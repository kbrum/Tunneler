import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {
  sessionCreateSchema,
  type SessionCreateSchema,
} from '@/features/dashboard/types/session.schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {useSSHSessions} from '../hooks/use-ssh';
import {Spinner} from '@/components/ui/spinner';

export function CreateSessionForm() {
  const {createSSHSession, isCreating, isUpdating} = useSSHSessions();

  const form = useForm<SessionCreateSchema>({
    resolver: zodResolver(sessionCreateSchema),
    defaultValues: {
      name: '',
      user: '',
      ip: '',
      port: 22,
    },
  });

  const handleCreate = async (data: SessionCreateSchema) => {
    try {
      await createSSHSession({
        name: data.name,
        ip: data.ip,
        user: data.user,
        port: data.port,
        auth_type: 'password',
        folder_id: '',
        key_id: '',
      });
      form.reset();
    } catch (error) {
      console.error(error);
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
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="port"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter the port"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
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
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-[#2f3191] font-semibold text-[#ffffff] hover:bg-[#2f3191]/60"
        >
          {isCreating || isUpdating ? <Spinner /> : 'Create Session'}
        </Button>
      </form>
    </Form>
  );
}

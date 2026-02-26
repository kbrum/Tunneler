import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Separator} from '@/components/ui/separator';
import {
  sessionCreateSchema,
  type SessionCreateSchema,
} from '@/features/dashboard/types/session.schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {useSSHSessions} from '../hooks/use-ssh';
import {Spinner} from '@/components/ui/spinner';
import {toast} from 'sonner';
import {useSessionStore} from '@/features/dashboard/stores/session.store';
import {LockKeyhole, User, Wifi} from 'lucide-react';

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
    const sanitizedName = data.name?.trim() ?? '';
    const sanitizedIP = data.ip.trim();
    const sanitizedUser = data.user.trim();
    const parsedPort = Number.parseInt(data.port, 10);

    try {
      await createSSHSession({
        name: sanitizedName,
        ip: sanitizedIP,
        user: sanitizedUser,
        password: data.password,
        port: parsedPort,
        auth_type: 'password',
        folder_id: '',
        key_id: '',
      });
      toast.success('Session created successfully');
      form.reset({
        name: '',
        user: '',
        password: '',
        ip: '',
        port: '22',
      });
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
        className="space-y-0"
        noValidate
      >
        <div className="space-y-5 p-6">
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel className="text-muted-foreground text-xs uppercase">
                  Session Name (Optional)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Example: Production API"
                    className="h-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="ip"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground flex items-center gap-2 text-xs uppercase">
                    <Wifi className="size-3.5" />
                    IP Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="192.168.0.10"
                      className="h-10"
                      {...field}
                    />
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
                  <FormLabel className="text-muted-foreground text-xs uppercase">
                    Port
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="22"
                      inputMode="numeric"
                      className="h-10"
                      {...field}
                      onChange={(event) => {
                        const onlyNumbers = event.target.value.replace(
                          /\D/g,
                          '',
                        );
                        field.onChange(onlyNumbers);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="user"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground flex items-center gap-2 text-xs uppercase">
                    <User className="size-3.5" />
                    Remote User
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="root"
                      autoComplete="off"
                      className="h-10"
                      {...field}
                    />
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
                  <FormLabel className="text-muted-foreground flex items-center gap-2 text-xs uppercase">
                    <LockKeyhole className="size-3.5" />
                    Remote Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      autoComplete="new-password"
                      className="h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-end p-6 pt-4">
          <Button
            type="submit"
            className="min-w-36 bg-[#2f3191] font-semibold text-[#ffffff] hover:bg-[#2f3191]/60"
            disabled={isCreating || isUpdating}
          >
            {isCreating || isUpdating ? (
              <>
                <Spinner />
                Creating...
              </>
            ) : (
              'Create Session'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

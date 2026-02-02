import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {
  sessionCreateSchema,
  type SessionCreateSchema,
} from '@/features/dashboard/types/session.schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

export function CreateSessionForm() {
  const form = useForm<SessionCreateSchema>({
    resolver: zodResolver(sessionCreateSchema),
    defaultValues: {
      name: '',
      user: '',
      ip: '',
      port: 22,
    },
  });

  return (
    <Form {...form}>
      <form className="flex h-full w-full flex-col gap-4">
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
                <Input placeholder="Enter the port" {...field} />
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
          Create Session
        </Button>
      </form>
    </Form>
  );
}

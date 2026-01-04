import {useForm} from 'react-hook-form';
import {
  registerSchema,
  type RegisterSchema,
} from '@/features/auth/utils/auth-schemas';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem} from '@/components/ui/form';
import {toast} from 'sonner';
import {NameInput} from '@/components/NameInput';
import {EmailInput} from '@/components/EmailInput';
import {PasswordInput} from '@/components/PasswordInput';
import {Button} from '@/components/ui/button';

export function RegisterForm() {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleRegister = async (data: RegisterSchema) => {
    console.log('name', data.name);
    console.log('email', data.email);
    console.log('password', data.password);
    console.log('confirmPassword', data.confirmPassword);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleRegister, () => {
          toast.error('Invalid Email or Password');
        })}
      >
        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <NameInput {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <EmailInput {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <PasswordInput
                  tooltip={true}
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <PasswordInput placeholder="Enter your password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="w-full bg-[#ffffff] font-semibold text-[#09090b] hover:bg-[#e4e4e7]">
          Sign In
        </Button>
      </form>
    </Form>
  );
}

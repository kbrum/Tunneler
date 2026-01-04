import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem} from '@/components/ui/form';
import {EmailInput} from '@/components/EmailInput';
import {PasswordInput} from '@/components/PasswordInput';
import {emailSchema} from '@/features/auth/utils/auth-schemas';
import type {EmailSchema} from '@/features/auth/utils/auth-schemas';
import {Button} from '@/components/ui/button';
import {Link} from 'react-router-dom';
import {toast} from 'sonner';

export function LoginForm() {
  const form = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function handleLogin(data: EmailSchema) {
    console.log('Enviando:', data.email);
    console.log('Enviando:', data.password);
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleLogin, () => {
          toast.error('Invalid Email or Password');
        })}
      >
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
                <PasswordInput placeholder="Enter your password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex w-full justify-end">
          <Link
            className="justify-start text-sm font-normal text-[#fafafa] hover:text-[#ffffff] hover:underline"
            to="/forgot-password"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#ffffff] font-semibold text-[#09090b] hover:bg-[#e4e4e7]"
        >
          Sign In
        </Button>
      </form>
    </Form>
  );
}

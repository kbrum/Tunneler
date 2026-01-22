import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {useForm} from 'react-hook-form';
import {FaGithub} from 'react-icons/fa';
import {FcGoogle} from 'react-icons/fc';
import {Link, useNavigate} from 'react-router-dom';
import {
  registerSchema,
  type RegisterSchema,
} from '@/features/auth/types/auth-schemas';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem} from '@/components/ui/form';
import {NameInput} from '@/components/NameInput';
import {EmailInput} from '@/components/EmailInput';
import {PasswordInput} from '@/components/PasswordInput';
import {useRegister} from '@/features/auth/hooks/use-auth';
import {toast} from 'sonner';
import {Spinner} from '@/components/ui/spinner';

export function SignUp() {
  const {register, isLoadingRegister} = useRegister();
  const navigate = useNavigate();

  const handleRegister = async (data: RegisterSchema) => {
    try {
      await register(data);
      navigate('/login');
      toast.success('Registration successful!');
    } catch (error) {
      console.log(error);
      toast.error(`Error on register`);
    }
  };

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <div className="flex h-screen items-center justify-center bg-[#09090b]">
      <Card className="flex h-fit max-w-100 flex-col border-[#27272a] bg-[#18181b]">
        <CardHeader className="flex items-center justify-center">
          <CardTitle className="flex text-3xl font-bold text-[#fafafa]">
            Register
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center gap-4 pt-0 pb-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleRegister)}
              className="flex h-full w-full flex-col gap-4"
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
                      <PasswordInput
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-[#ffffff] font-semibold text-[#09090b] hover:bg-[#e4e4e7]"
                disabled={isLoadingRegister}
              >
                {isLoadingRegister ? <Spinner /> : <span>Sign Up</span>}
              </Button>
            </form>
          </Form>

          <p className="my-2 flex items-center justify-center text-sm font-medium text-[#a1a1aa]">
            or continue with
          </p>

          <div className="flex w-full justify-center space-x-4">
            <Button className="w-full bg-[#27272a] text-[#ffffff] hover:bg-[#3f3f46]">
              <FcGoogle />
            </Button>
            <Button className="w-full bg-[#27272a] text-[#ffffff] hover:bg-[#3f3f46]">
              <FaGithub />
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-center pt-6 pb-3">
          <p className="text-sm font-normal text-[#71717a]">
            Already have an account?{' '}
            <Link
              className="text-sm font-semibold text-[#fafafa] hover:font-semibold hover:text-[#ffffff] hover:underline"
              to="/login"
            >
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Form, useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from '@/features/auth/types/auth.schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {EmailInput} from '@/components/EmailInput';
import {FormControl, FormField, FormItem} from '@/components/ui/form';
import {Button} from '@/components/ui/button';

export function ForgotPassword() {
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  return (
    <div className="flex h-screen items-center justify-center bg-[#09090b]">
      <Card className="flex h-fit max-w-100 flex-col border-[#27272a] bg-[#18181b]">
        <CardHeader className="flex items-center justify-center pb-6">
          <CardTitle className="text-3xl font-bold text-[#fafafa]">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-center text-sm font-medium text-[#a1a1aa]">
            Please enter your email address and we&apos;ll send you a link to
            reset your password.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center gap-4 pb-3">
          <Form {...form}>
            <form className="flex h-full w-full flex-col gap-4">
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
              <Button
                className="w-full bg-[#ffffff] font-semibold text-[#09090b] hover:bg-[#e4e4e7]"
                type="submit"
              >
                Reset Password
              </Button>
            </form>
          </Form>

          <Link
            className="text-sm font-medium text-[#fafafa] hover:font-semibold hover:text-[#ffffff] hover:underline"
            to="/login"
          >
            Back to Login
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

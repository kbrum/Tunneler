import { EmailInput } from '@/components/EmailInput';
import { GithubProviderLogin } from '@/components/GithubProviderLogin';
import { GoogleProviderLogin } from '@/components/GoogleProviderLogin';
import { SubmitButton } from '@/components/SubmitButton';
import { PasswordInput } from '@/components/PasswordInput';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from 'react-router-dom';

export function SignIn() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#09090b]">
      <Card className="flex h-fit max-w-100 flex-col border-[#27272a] bg-[#18181b]">
        <CardHeader className="flex items-center justify-center">
          <CardTitle className="text-3xl font-bold text-[#fafafa]">
            Login
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center gap-4 pt-0 pb-3">
          <EmailInput />
          <PasswordInput placeholder="Enter your password" />

          <div className="flex w-full justify-end">
            <Link
              className="justify-start text-sm font-normal text-[#fafafa] hover:text-[#ffffff] hover:underline"
              to="/signup"
            >
              Forgot password?
            </Link>
          </div>

          <SubmitButton text="Sign In" />

          <p className="my-2 flex items-center justify-center font-medium text-[#a1a1aa]">
            or continue with
          </p>

          <div className="flex w-full justify-center space-x-4">
            <GoogleProviderLogin />
            <GithubProviderLogin />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-center pt-3 pb-3">
          <p className="text-sm font-normal text-[#71717a]">
            Don&apos;t have an account?{' '}
            <Link
              className="text-sm font-semibold text-[#fafafa] hover:font-semibold hover:text-[#ffffff] hover:underline"
              to="/signup"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

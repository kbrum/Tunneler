import { EmailInput } from '@/components/EmailInput';
import { GithubProviderLogin } from '@/components/GithubProviderLogin';
import { GoogleProviderLogin } from '@/components/GoogleProviderLogin';
import { LoginButton } from '@/components/SignInButton';
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
      <Card className="flex h-110 w-107.5 flex-col gap-2 border-[#27272a] bg-[#18181b]">
        <CardHeader className="flex items-center justify-center">
          <CardTitle className="text-5xl font-bold text-[#fafafa]">
            Login
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 pb-3">
          <EmailInput />
          <PasswordInput placeholder="Enter your password" />
        </CardContent>

        <CardContent className="flex flex-col items-center justify-center gap-7 p-2 pt-0">
          <LoginButton />
        </CardContent>

        <p className="flex items-center justify-center font-medium text-[#a1a1aa]">
          or
        </p>

        <CardContent className="flex flex-row items-center justify-between pt-2 pb-3">
          <GoogleProviderLogin />
          <GithubProviderLogin />
        </CardContent>

        <CardFooter className="flex flex-col items-center">
          <p className="font-normal text-[#71717a]">
            <br />
            Don&apos;t have an account?{' '}
            <Link
              className="font-semibold text-[#fafafa] hover:font-semibold hover:text-[#ffffff] hover:underline"
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

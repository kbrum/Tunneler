import { EmailInput } from '@/components/EmailInput';
import { FullNameInput } from '@/components/FullNameInput';
import { PasswordInput } from '@/components/PasswordInput';
import { Button } from '@/components/ui/button';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

export function SignUp() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#09090b]">
      <Card className="flex h-fit max-w-100 flex-col border-[#27272a] bg-[#18181b]">
        <CardHeader className="flex items-center justify-center">
          <CardTitle className="flex text-3xl font-bold text-[#fafafa]">
            Register
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center gap-4 pt-0 pb-0">
          <FullNameInput />
          <EmailInput />
          <PasswordInput placeholder="Enter your password" tooltip={true} />
          <PasswordInput placeholder="Confirm your password" />

          <Button className="w-full bg-[#ffffff] font-semibold text-[#09090b] hover:bg-[#e4e4e7]">
            Sign In
          </Button>
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
              to="/"
            >
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

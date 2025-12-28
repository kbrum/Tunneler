import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';

export function GoogleProviderLogin() {
  return (
    <Button className="w-45 bg-[#ffffff] text-[#1f1f1f] hover:bg-[#e4e4e7]">
      <FcGoogle /> Continue with Google
    </Button>
  );
}

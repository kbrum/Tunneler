import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';

export function GoogleProviderLogin() {
  return (
    <Button className="w-full bg-[#27272a] text-[#ffffff] hover:bg-[#3f3f46]">
      <FcGoogle />
    </Button>
  );
}

import { Button } from '@/components/ui/button';
import { GithubIcon } from 'lucide-react';

export function GithubProviderLogin() {
  return (
    <Button className="w-45 bg-[#27272a] text-[#ffffff] hover:bg-[#3f3f46]">
      <GithubIcon /> Continue with Github
    </Button>
  );
}

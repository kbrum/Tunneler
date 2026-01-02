import { Button } from '@/components/ui/button';
import { FaGithub } from 'react-icons/fa';

export function GithubProviderLogin() {
  return (
    <Button className="w-full bg-[#27272a] text-[#ffffff] hover:bg-[#3f3f46]">
      <FaGithub />
    </Button>
  );
}

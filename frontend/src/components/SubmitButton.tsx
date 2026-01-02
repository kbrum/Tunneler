import { Button } from '@/components/ui/button';
import type { ButtonProps } from '@/types/button-types';

export function SubmitButton({ text }: ButtonProps) {
  return (
    <Button className="w-full bg-[#ffffff] font-semibold text-[#09090b] hover:bg-[#e4e4e7]">
      {text}
    </Button>
  );
}

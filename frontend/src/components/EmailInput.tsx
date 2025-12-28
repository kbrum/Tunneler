import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { MailIcon } from 'lucide-react';

export function EmailInput() {
  return (
    <InputGroup>
      <InputGroupInput
        className="font-medium text-[#a1a1aa]"
        type="email"
        placeholder="Enter your email"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            // Handle login logic here
          }
        }}
      />
      <InputGroupAddon>
        <MailIcon />
      </InputGroupAddon>
    </InputGroup>
  );
}

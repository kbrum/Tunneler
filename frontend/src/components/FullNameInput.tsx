import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import {User} from 'lucide-react';

export function FullNameInput(props: React.ComponentProps<'input'>) {
  return (
    <InputGroup>
      <InputGroupInput
        className="font-medium text-[#a1a1aa]"
        type="text"
        placeholder="Enter your full name"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            // Handle login logic here
          }
        }}
        {...props}
      />
      <InputGroupAddon>
        <User />
      </InputGroupAddon>
    </InputGroup>
  );
}

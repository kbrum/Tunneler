import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import {User} from 'lucide-react';

export function NameInput(props: React.ComponentProps<'input'>) {
  return (
    <InputGroup>
      <InputGroupInput
        className="font-medium text-[#a1a1aa]"
        type="text"
        placeholder="Enter your name"
        {...props}
      />
      <InputGroupAddon>
        <User />
      </InputGroupAddon>
    </InputGroup>
  );
}

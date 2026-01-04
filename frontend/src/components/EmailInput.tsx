import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import {cn} from '@/lib/utils';
import {MailIcon} from 'lucide-react';
import type * as React from 'react';

export function EmailInput({
  className,
  ...props
}: React.ComponentProps<'input'>) {
  return (
    <InputGroup>
      <InputGroupInput
        type="text"
        placeholder="Enter your email"
        {...props}
        className={cn('font-medium text-[#a1a1aa]', className)}
      />
      <InputGroupAddon>
        <MailIcon />
      </InputGroupAddon>
    </InputGroup>
  );
}

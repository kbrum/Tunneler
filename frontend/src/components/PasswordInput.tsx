import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { EyeIcon, EyeOffIcon, InfoIcon, LockIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useState } from 'react';

export function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup>
      <InputGroupInput
        className="font-medium text-[#a1a1aa]"
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter your password"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            // Handle login logic here
          }
        }}
      />
      <InputGroupAddon align="inline-start">
        <LockIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <button
          type="button"
          className="cursor-pointer focus:outline-none"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOffIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
        <Tooltip>
          <TooltipTrigger asChild>
            <InfoIcon className="cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Password must be at least 8 characters, 1 uppercase, 1 lowercase,
              1 number, and 1 special character
            </p>
          </TooltipContent>
        </Tooltip>
      </InputGroupAddon>
    </InputGroup>
  );
}

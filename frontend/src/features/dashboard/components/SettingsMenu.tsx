import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Settings} from 'lucide-react';
import {LogoutAlertDialog} from '@/features/dashboard/components/LogoutAlertDialog';
import {ProfileDialog} from '@/features/dashboard/components/ProfileDialog';

export function SettingsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-start group-data-[collapsible=icon]:hidden">
        <Button variant="ghost" size="icon">
          <Settings className="h-10 w-10" />
          <span className="sr-only">Settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-20">
        <div className="flex w-full items-center justify-center">
          <ProfileDialog />
        </div>
        <div className="flex w-full items-center justify-center">
          <LogoutAlertDialog />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

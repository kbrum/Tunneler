import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Spinner} from '@/components/ui/spinner';
import {useLogout} from '@/hooks/use-session';
import {LogOut, Settings, User} from 'lucide-react';
import {useNavigate} from 'react-router-dom';

export function SettingsMenu() {
  const {logout, isLoadingLogout} = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-start group-data-[collapsible=icon]:hidden">
        <Button variant="ghost" size="icon">
          <Settings className="h-10 w-10" />
          <span className="sr-only">Settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLogout()}>
          <LogOut className="mr-2 h-4 w-4" />
          {isLoadingLogout ? (
            <Spinner className="h-2 w-2" />
          ) : (
            <span>Log out</span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

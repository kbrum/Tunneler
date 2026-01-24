import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {Button} from '@/components/ui/button';
import {Spinner} from '@/components/ui/spinner';
import {useLogout} from '@/hooks/use-session';
import {LogOut} from 'lucide-react';
import {useNavigate} from 'react-router-dom';

export function LogoutAlertDialog() {
  const {logout, isLoadingLogout} = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="ghost" className="h-8 w-30 p-0">
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-fit">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
          <div className="flex flex-row justify-end gap-3 pt-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="hover:bg-red-600 hover:text-white"
              disabled={isLoadingLogout}
              onClick={handleLogout}
            >
              {isLoadingLogout ? <Spinner /> : 'Logout'}
            </AlertDialogAction>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

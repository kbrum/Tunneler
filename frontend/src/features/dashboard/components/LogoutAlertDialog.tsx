import {
  AlertDialog,
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
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export function LogoutAlertDialog() {
  const {logout, isLoadingLogout} = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logout();
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="h-8 w-30 p-0">
          <LogOut className="h-4 w-4" />
          <span className="font-semibold">Log out</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-fit">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-bold">
            Are you sure you want to log out?
          </AlertDialogTitle>
          <div className="flex flex-row justify-end gap-3 pt-4">
            <AlertDialogCancel disabled={isLoadingLogout}>
              Cancel
            </AlertDialogCancel>
            <Button
              className="font-semibold hover:bg-red-600 hover:text-white"
              disabled={isLoadingLogout}
              onClick={handleLogout}
            >
              {isLoadingLogout ? <Spinner /> : 'Logout'}
            </Button>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

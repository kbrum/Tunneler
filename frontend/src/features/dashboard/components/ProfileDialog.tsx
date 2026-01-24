import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {User} from 'lucide-react';

export function ProfileDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost" className="h-8 w-30 p-0">
          <User className="h-4 w-4" />
          <span>Profile</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription>Manage your profile settings.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

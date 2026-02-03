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
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-8 w-30 p-0">
          <User className="h-4 w-4" />
          <span className="font-semibold">Profile</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle className="text-2xl font-bold">Profile</DialogTitle>
          <DialogDescription className="font-medium">
            Manage your profile settings.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

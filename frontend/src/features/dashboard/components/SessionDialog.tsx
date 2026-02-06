import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {SessionForm} from '@/features/dashboard/components/SessionForm';
import {useSessionStore} from '../store/session.store';

export function CreateSessionDialog() {
  const {isDialogOpen, setIsDialogOpen} = useSessionStore();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#2f3191] font-semibold text-[#ffffff] hover:bg-[#2f3191]/60">
          Create Session
        </Button>
      </DialogTrigger>
      <DialogContent className="flex w-96 flex-col gap-4">
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle className="text-2xl font-bold">
            Session Create
          </DialogTitle>
        </DialogHeader>
        <SessionForm />
      </DialogContent>
    </Dialog>
  );
}

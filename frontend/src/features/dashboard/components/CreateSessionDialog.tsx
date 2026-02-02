import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {CreateSessionForm} from '@/features/dashboard/components/CreateSessionForm';

export function CreateSessionDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#2f3191] font-semibold text-[#ffffff] hover:bg-[#2f3191]/60">
          Create Session
        </Button>
      </DialogTrigger>
      <DialogContent className="flex w-85 flex-col gap-4">
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle className="text-2xl font-bold">
            Session Create
          </DialogTitle>
        </DialogHeader>
        <CreateSessionForm />
      </DialogContent>
    </Dialog>
  );
}

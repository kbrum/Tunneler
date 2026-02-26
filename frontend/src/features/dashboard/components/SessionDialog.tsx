import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {SessionForm} from '@/features/dashboard/components/SessionForm';
import {Plus, Server} from 'lucide-react';
import {useSessionStore} from '../stores/session.store';

export function CreateSessionDialog() {
  const {isDialogOpen, setIsDialogOpen} = useSessionStore();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="h-9 bg-[#2f3191] font-semibold text-[#ffffff] hover:bg-[#2f3191]/60">
          <Plus className="size-4" />
          Create Session
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-[560px]">
        <DialogHeader className="bg-sidebar/95 text-sidebar-foreground space-y-2 border-b p-6">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Server className="size-5 text-[#2f3191]" />
            Create Session
          </DialogTitle>
          <DialogDescription className="text-sidebar-foreground/70">
            Add a new server using password authentication.
          </DialogDescription>
        </DialogHeader>
        <SessionForm />
      </DialogContent>
    </Dialog>
  );
}

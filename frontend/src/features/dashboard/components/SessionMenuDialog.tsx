import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {useSessionStore} from '@/features/dashboard/stores/session.store';

export function SessionMenuDialog() {
  const {
    isSessionMenuDialogOpen,
    setIsSessionMenuDialogOpen,
    ip,
    setIP,
    isEditing,
    setIsEditing,
  } = useSessionStore();

  return (
    <Dialog
      open={isSessionMenuDialogOpen}
      onOpenChange={setIsSessionMenuDialogOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Session Menu</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-4">
            <span>IP ADDRESS</span>
            <Card>
              <CardContent>
                {isEditing ? (
                  <input
                    type="text"
                    value={ip}
                    onChange={(e) => setIP(e.target.value)}
                    className="rounded-md border border-gray-300 px-2 py-1"
                  />
                ) : (
                  ip
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-end gap-3">
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Editar
          </Button>
          <Button
            className="bg-[#2f3191] font-semibold text-[#ffffff] hover:bg-[#2f3191]/60"
            variant="outline"
          >
            Conectar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {useSessionStore} from '@/features/dashboard/stores/session.store';
import {useState} from 'react';
import {useSSHSessions} from '@/features/dashboard/hooks/use-ssh';
import {Spinner} from '@/components/ui/spinner';

export function SessionMenuDialog() {
  const {
    isSessionMenuDialogOpen,
    setIsSessionMenuDialogOpen,
    id,
    ip,
    setIP,
    port,
    setPort,
    user,
    setUser,
    label,
    setLabel,
    isEditing,
    setIsEditing,
    status,
    auth_type,
  } = useSessionStore();
  const {updateSSHSession, isUpdating} = useSSHSessions();

  const [password, setPassword] = useState('');

  const handleUpdate = () => {
    updateSSHSession({
      id,
      name: label,
      ip: ip,
      port: port,
      user: user,
      password: password,
      status,
      auth_type,
    });
  };

  return (
    <Dialog
      open={isSessionMenuDialogOpen}
      onOpenChange={(e) => {
        setIsSessionMenuDialogOpen(e);

        if (!e) {
          setIsEditing(false);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? (
              <input
                type="text"
                placeholder="Session"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="placeholder:text-muted-foreground/50 w-full border-none bg-transparent text-lg font-semibold outline-none"
              />
            ) : (
              label || 'Session'
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-row gap-4">
            <div className="flex w-full flex-col gap-1">
              <span className="text-muted-foreground ml-1 text-sm font-medium">
                Ip Address
              </span>
              <Card>
                <CardContent className="flex items-center justify-center p-3">
                  {isEditing ? (
                    <input
                      type="text"
                      value={ip}
                      onChange={(e) => setIP(e.target.value)}
                      className="w-full border-none bg-transparent text-center outline-none"
                    />
                  ) : (
                    <span className="text-center">{ip}</span>
                  )}
                </CardContent>
              </Card>
            </div>
            <div className="flex w-full flex-col gap-1">
              <span className="text-muted-foreground ml-1 text-sm font-medium">
                Port
              </span>
              <Card>
                <CardContent className="flex items-center justify-center p-3">
                  {isEditing ? (
                    <input
                      type="text"
                      value={port}
                      onChange={(e) => setPort(Number(e.target.value))}
                      className="w-full border-none bg-transparent text-center outline-none"
                    />
                  ) : (
                    <span className="text-center">{port}</span>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex w-full flex-row gap-4">
            <div className="flex w-full flex-col gap-1">
              <span className="text-muted-foreground ml-1 text-sm font-medium">
                Remote User
              </span>
              <Card>
                <CardContent className="flex items-center justify-center p-3">
                  {isEditing ? (
                    <input
                      type="text"
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                      className="w-full border-none bg-transparent text-center outline-none"
                    />
                  ) : (
                    <span className="text-center">{user}</span>
                  )}
                </CardContent>
              </Card>
            </div>
            <div className="flex w-full flex-col gap-1">
              <span className="text-muted-foreground ml-1 text-sm font-medium">
                Remote Password
              </span>
              <Card>
                <CardContent className="flex min-h-12.5 items-center justify-center p-3">
                  {isEditing ? (
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border-none bg-transparent text-center outline-none"
                    />
                  ) : (
                    <span className="text-center">{password}</span>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-end gap-3">
          {isEditing ? (
            <Button variant="outline" onClick={handleUpdate}>
              {isUpdating ? (
                <span>
                  <Spinner />
                </span>
              ) : (
                <span>Save</span>
              )}
            </Button>
          ) : (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
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

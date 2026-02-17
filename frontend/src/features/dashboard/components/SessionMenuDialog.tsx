import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {Textarea} from '@/components/ui/textarea';
import {useSessionStore} from '@/features/dashboard/stores/session.store';
import {useState} from 'react';

export function SessionMenuDialog() {
  const {
    isSessionMenuDialogOpen,
    setIsSessionMenuDialogOpen,
    ip,
    setIP,
    port,
    setPort,
    user,
    setUser,
    label,
    setLabel,
    privateKey,
    setPrivateKey,
    isEditing,
    setIsEditing,
  } = useSessionStore();

  const [password, setPassword] = useState('');

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
                      onChange={(e) => setPort(e.target.value)}
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
                <CardContent className="flex min-h-[50px] items-center justify-center p-3">
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
          <div className="flex w-full flex-col gap-1">
            <span className="text-muted-foreground ml-1 text-sm font-medium">
              Private Key
            </span>
            <Card className="min-h-30">
              <CardContent className="flex h-full p-3">
                {isEditing ? (
                  <Textarea
                    value={privateKey}
                    onChange={(e) => setPrivateKey(e.target.value)}
                    className="min-h-25 w-full resize-none border-none bg-transparent focus-visible:ring-0"
                  />
                ) : (
                  <span className="w-full break-all">{privateKey}</span>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-end gap-3">
          {isEditing ? (
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Salvar
            </Button>
          ) : (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Editar
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

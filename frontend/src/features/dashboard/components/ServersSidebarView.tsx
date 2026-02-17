import {RefreshCcw, Server} from 'lucide-react';

import {Badge} from '@/components/ui/badge';
import {Card} from '@/components/ui/card';
import {Spinner} from '@/components/ui/spinner';
import {useSSHSessions} from '@/features/dashboard/hooks/use-ssh';
import {useSessionStore} from '@/features/dashboard/stores/session.store';
import {Button} from '@/components/ui/button';

export function ServersSidebarView() {
  const {
    setIsSessionMenuDialogOpen,
    setID,
    setUser,
    setLabel,
    setPort,
    setIP,
    setStatus,
    setAuthType,
  } = useSessionStore();
  const {sshSessions, isLoading, isError, refetch} = useSSHSessions();

  return (
    <div className="flex w-full flex-col gap-2 px-2">
      {isError ? (
        <span className="text-destructive px-2 text-sm">
          Error loading sessions
          <Button
            onClick={() => refetch()}
            className="bg-[#2f3191] font-semibold text-[#ffffff] hover:bg-[#2f3191]/60"
          >
            <RefreshCcw />
          </Button>
        </span>
      ) : isLoading ? (
        <div className="flex justify-center p-4">
          <Spinner />
        </div>
      ) : (
        sshSessions?.map((session) => (
          <Card
            onClick={() => {
              setID(session.id);
              setUser(session.user);
              setLabel(session.name);
              setPort(session.port);
              setIP(session.ip);
              setStatus(session.status);
              setAuthType(session.auth_type);
              return setIsSessionMenuDialogOpen(true);
            }}
            key={session.id}
            className="group bg-sidebar-accent/50 hover:bg-sidebar-accent flex cursor-pointer flex-row items-center gap-3 rounded-lg border-transparent p-2.5 shadow-none transition-all"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#2f3191] text-white">
              <Server className="size-4" />
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              <span className="text-sidebar-foreground truncate text-sm font-medium">
                {session.name || session.ip}
              </span>
            </div>

            <Badge
              variant="outline"
              className="border-sidebar-border/50 text-muted-foreground shrink-0 text-[10px] font-normal uppercase"
            >
              {session.status || 'Offline'}
            </Badge>
          </Card>
        ))
      )}
    </div>
  );
}

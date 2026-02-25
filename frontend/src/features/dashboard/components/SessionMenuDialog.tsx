import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Separator} from '@/components/ui/separator';
import {Spinner} from '@/components/ui/spinner';
import {useSessionMenuForm} from '@/features/dashboard/hooks/use-session-menu-form';
import {useSSHSessions} from '@/features/dashboard/hooks/use-ssh';
import {useSessionStore} from '@/features/dashboard/stores/session.store';
import type {SessionUpdateSchema} from '@/features/dashboard/types/session.schema';
import {Pencil, Save, Server, Shield, Wifi} from 'lucide-react';
import {toast} from 'sonner';

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

  const form = useSessionMenuForm();
  const {updateSSHSession, isUpdating} = useSSHSessions();

  const handleDialogOpenChange = (isOpen: boolean) => {
    setIsSessionMenuDialogOpen(isOpen);

    if (!isOpen) {
      setIsEditing(false);
      form.reset({
        name: label ?? '',
        ip: ip ?? '',
        port: port ? String(port) : '22',
        user: user ?? '',
        password: '',
      });
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    form.reset({
      name: label ?? '',
      ip: ip ?? '',
      port: port ? String(port) : '22',
      user: user ?? '',
      password: '',
    });
  };

  const handleStartEdit = () => {
    setIsEditing(true);
    form.reset({
      name: label ?? '',
      ip: ip ?? '',
      port: port ? String(port) : '22',
      user: user ?? '',
      password: '',
    });
  };

  const handleUpdate = async (data: SessionUpdateSchema) => {
    const sanitizedName = data.name.trim();
    const sanitizedIP = data.ip.trim();
    const sanitizedUser = data.user.trim();
    const sanitizedPassword = data.password?.trim() ?? '';
    const parsedPort = Number.parseInt(data.port, 10);

    try {
      await updateSSHSession({
        id,
        name: sanitizedName,
        ip: sanitizedIP,
        port: parsedPort,
        user: sanitizedUser,
        password: sanitizedPassword,
        status: status || 'offline',
        auth_type: auth_type || 'password',
      });

      setLabel(sanitizedName);
      setIP(sanitizedIP);
      setUser(sanitizedUser);
      setPort(parsedPort);
      setIsEditing(false);

      form.reset({
        name: sanitizedName,
        ip: sanitizedIP,
        port: String(parsedPort),
        user: sanitizedUser,
        password: '',
      });

      toast.success('Session updated successfully');
    } catch (error) {
      console.error('Error updating session:', error);
      toast.error('Failed to update session');
    }
  };

  const readOnlyName = label || 'Untitled session';
  const readOnlyIP = ip || '-';
  const readOnlyPort = port || '-';
  const readOnlyUser = user || '-';

  return (
    <Dialog
      open={isSessionMenuDialogOpen}
      onOpenChange={handleDialogOpenChange}
    >
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-140">
        <DialogHeader className="bg-sidebar/95 text-sidebar-foreground space-y-3 border-b p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Server className="size-5 text-[#2f3191]" />
                Session Details
              </DialogTitle>
              <DialogDescription className="text-sidebar-foreground/70">
                Review and update server access details.
              </DialogDescription>
            </div>
            <Badge
              variant="outline"
              className="border-sidebar-border bg-sidebar-accent/60 px-2.5 py-1 text-[10px] uppercase"
            >
              {status || 'offline'}
            </Badge>
          </div>

          <div>
            {isEditing ? (
              <Input
                type="text"
                placeholder="Session name"
                className="border-sidebar-border/60 bg-sidebar-accent/50 text-sidebar-foreground placeholder:text-sidebar-foreground/45 h-10 font-semibold"
                {...form.register('name')}
              />
            ) : (
              <h3 className="text-sidebar-foreground truncate text-2xl leading-tight font-semibold tracking-tight">
                {readOnlyName}
              </h3>
            )}
            {isEditing && form.formState.errors.name?.message ? (
              <p className="mt-1 text-xs text-red-300">
                {form.formState.errors.name.message}
              </p>
            ) : null}
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="space-y-0"
            noValidate
          >
            <div className="space-y-5 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-muted-foreground flex items-center gap-2 text-xs uppercase">
                    <Wifi className="size-3.5" />
                    IP Address
                  </Label>
                  {isEditing ? (
                    <FormField
                      control={form.control}
                      name="ip"
                      render={({field}) => (
                        <FormItem>
                          <FormControl>
                            <Input type="text" className="h-10" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <div className="bg-muted/40 text-foreground h-10 rounded-md border px-3 text-sm leading-10">
                      {readOnlyIP}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-muted-foreground text-xs uppercase">
                    Port
                  </Label>
                  {isEditing ? (
                    <FormField
                      control={form.control}
                      name="port"
                      render={({field}) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              inputMode="numeric"
                              className="h-10"
                              {...field}
                              onChange={(event) => {
                                const onlyNumbers = event.target.value.replace(
                                  /\D/g,
                                  '',
                                );
                                field.onChange(onlyNumbers);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <div className="bg-muted/40 text-foreground h-10 rounded-md border px-3 text-sm leading-10">
                      {readOnlyPort}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-muted-foreground text-xs uppercase">
                    Remote User
                  </Label>
                  {isEditing ? (
                    <FormField
                      control={form.control}
                      name="user"
                      render={({field}) => (
                        <FormItem>
                          <FormControl>
                            <Input type="text" className="h-10" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <div className="bg-muted/40 text-foreground h-10 rounded-md border px-3 text-sm leading-10">
                      {readOnlyUser}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-muted-foreground flex items-center gap-2 text-xs uppercase">
                    <Shield className="size-3.5" />
                    Remote Password
                  </Label>
                  {isEditing ? (
                    <FormField
                      control={form.control}
                      name="password"
                      render={({field}) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Leave empty to keep unchanged"
                              className="h-10"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <div className="bg-muted/40 text-muted-foreground h-10 rounded-md border px-3 text-sm leading-10">
                      ********
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex flex-wrap items-center justify-end gap-3 p-6 pt-4">
              {isEditing ? (
                <>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="min-w-32"
                    variant="outline"
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <>
                        <Spinner />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="size-4" />
                        Save changes
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleStartEdit}
                >
                  <Pencil className="size-4" />
                  Edit
                </Button>
              )}

              <Button
                type="button"
                className="min-w-32 bg-[#2f3191] font-semibold text-[#ffffff] hover:bg-[#2f3191]/60"
                onClick={() =>
                  toast.info('Connection flow will be available here soon.')
                }
              >
                Connect
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

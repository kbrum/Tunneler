import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {SettingsMenu} from '@/features/dashboard/components/SettingsMenu';

export function TunnelerSidebar() {
  return (
    <Sidebar className="bg-sidebar p-0" collapsible="icon">
      <SidebarHeader className="flex flex-row items-center justify-between">
        <span className="text-2xl font-bold text-white group-data-[collapsible=icon]:hidden">
          Tunneler
        </span>
        <SidebarTrigger className="text-white" />
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <div className="flex flex-row items-center justify-between">
          <SettingsMenu />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

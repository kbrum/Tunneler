import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import {SettingsMenu} from '@/features/dashboard/components/SettingsMenu';
import Logo from '@/assets/Logo_horizontal.svg';

export function TunnelerSidebar() {
  return (
    <Sidebar className="bg-sidebar p-0" collapsible="icon">
      <SidebarHeader className="flex flex-row items-center justify-between">
        <div className="flex w-full items-center justify-center">
          <img
            src={Logo}
            alt="Tunneler Logo"
            className="h-8 w-auto group-data-[collapsible=icon]:hidden"
          />
        </div>
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

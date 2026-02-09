import {SidebarInset, SidebarProvider} from '@/components/ui/sidebar';
import {Outlet} from 'react-router-dom';
import {TunnelerSidebar} from './Sidebar';
import {SessionMenuDialog} from './SessionMenuDialog';

export function DashboardLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <TunnelerSidebar />
      <SessionMenuDialog />
      <SidebarInset className="bg-[#09090b]">
        <div className="flex flex-1 flex-col">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {Outlet} from 'react-router-dom';
import {TunnelerSidebar} from './Sidebar';

export function DashboardLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <TunnelerSidebar />
      <SidebarInset className="bg-[#09090b]">
        <div className="p-2">
          <SidebarTrigger className="text-white" />
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

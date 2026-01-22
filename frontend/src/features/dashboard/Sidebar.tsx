import {Button} from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import {Settings} from 'lucide-react';

export function TunnelerSidebar() {
  return (
    <div>
      <Sidebar className="bg-[#18181b]">
        <SidebarHeader>
          <span>Tunneler</span>
        </SidebarHeader>
        <SidebarContent></SidebarContent>
        <SidebarFooter>
          <div className="w-full">
            <Button size="icon">
              <Settings />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}

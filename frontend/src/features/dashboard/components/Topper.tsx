import {Card, CardContent} from '@/components/ui/card';
import {CreateSessionDialog} from './SessionDialog';

export function Topper() {
  return (
    <Card className="flex h-15 w-full flex-row items-center justify-start rounded-none border-l-0 bg-[#18181B] p-0">
      <CardContent className="flex h-full items-center p-0 px-4">
        <CreateSessionDialog />
      </CardContent>
    </Card>
  );
}

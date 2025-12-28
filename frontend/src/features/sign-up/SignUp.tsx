import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SignUp() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#09090b]">
      <Card className="flex h-150 w-107.5 flex-col gap-2 border-[#27272a] bg-[#18181b]">
        <CardHeader className="flex items-center justify-center">
          <CardTitle className="text-5xl font-bold text-[#fafafa]">
            Register
          </CardTitle>

          <CardContent></CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}

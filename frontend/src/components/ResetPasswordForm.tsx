import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from '@/features/auth/utils/auth-schemas';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {Form, FormControl, FormField, FormItem} from '@/components/ui/form';
import {Button} from '@/components/ui/button';
import {EmailInput} from '@/components/EmailInput';

export function ResetPasswordForm() {
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  return (
    <Form {...form}>
      <form className="flex h-full w-full flex-col gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <EmailInput {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          className="w-full bg-[#ffffff] font-semibold text-[#09090b] hover:bg-[#e4e4e7]"
          type="submit"
        >
          Reset Password
        </Button>
      </form>
    </Form>
  );
}

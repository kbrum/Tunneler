import {z} from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(3, {
      message: 'The name must have at least 3 characters',
    }),
    email: z.string().email({
      message: 'Invalid email',
    }),
    password: z
      .string()
      .min(8, 'The password must have at least 8 characters')
      .regex(/[A-Z]/, 'The password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'The password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'The password must contain at least one number')
      .regex(
        /[\W_]/,
        'The password must contain at least one special character (!@#$...)',
      ),
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const emailSchema = z.object({
  email: z.string().email({
    message: 'Invalid email',
  }),
  password: z.string().min(1, 'A senha é obrigatória'),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type EmailSchema = z.infer<typeof emailSchema>;

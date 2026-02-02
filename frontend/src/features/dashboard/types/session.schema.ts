import z from 'zod';

export const sessionCreateSchema = z.object({
  name: z.string().min(2).max(100),
  user: z.string().min(2).max(100),
  ip: z
    .string()
    .min(7)
    .max(15)
    .regex(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/),
  port: z.int().min(1).max(65535),
});

export type SessionCreateSchema = z.infer<typeof sessionCreateSchema>;

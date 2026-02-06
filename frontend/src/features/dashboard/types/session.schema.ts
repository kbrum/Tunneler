import z from 'zod';

export const sessionCreateSchema = z.object({
  name: z
    .string()
    .max(100, 'O nome deve ter no máximo 100 caracteres')
    .optional(),
  user: z
    .string()
    .min(2, 'O usuário deve ter pelo menos 2 caracteres')
    .max(100, 'O usuário deve ter no máximo 100 caracteres'),
  password: z.string().min(1, 'A senha é obrigatória'),
  ip: z
    .string()
    .min(7, 'Endereço IP muito curto')
    .max(15, 'Endereço IP muito longo')
    .regex(
      /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
      'Formato de endereço IP inválido',
    ),
  port: z
    .string()
    .min(1, 'A porta é obrigatória')
    .regex(/^\d+$/, 'A porta deve conter apenas números')
    .refine((val) => {
      const port = parseInt(val, 10);
      return port >= 1 && port <= 65535;
    }, 'A porta deve estar entre 1 e 65535'),
});

export type SessionCreateSchema = z.infer<typeof sessionCreateSchema>;

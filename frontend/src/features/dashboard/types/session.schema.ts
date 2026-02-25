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

export const sessionUpdateSchema = z.object({
  name: z.string().max(100, 'Session name must have at most 100 characters'),
  user: z
    .string()
    .min(2, 'Remote user must have at least 2 characters')
    .max(100, 'Remote user must have at most 100 characters'),
  password: z
    .string()
    .max(200, 'Password must have at most 200 characters')
    .optional()
    .or(z.literal('')),
  ip: z
    .string()
    .min(7, 'IP address is too short')
    .max(15, 'IP address is too long')
    .regex(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/, 'Invalid IP address format'),
  port: z
    .string()
    .min(1, 'Port is required')
    .regex(/^\d+$/, 'Port must contain only numbers')
    .refine((value) => {
      const parsedPort = Number.parseInt(value, 10);
      return parsedPort >= 1 && parsedPort <= 65535;
    }, 'Port must be between 1 and 65535'),
});

export type SessionCreateSchema = z.infer<typeof sessionCreateSchema>;
export type SessionUpdateSchema = z.infer<typeof sessionUpdateSchema>;

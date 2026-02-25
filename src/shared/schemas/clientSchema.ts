import { z } from 'zod';

export const createClientSchema = z.object({
    name: z.string().min(2, "Le nom doit faire au moins 2 caractères"),
    phone: z.string().optional(),
    email: z.string().email("Email invalide").optional().or(z.literal('')),
    address: z.string().optional(),
    insuranceProvider: z.string().optional(),
    insuranceNumber: z.string().optional(),
});

export const updateClientSchema = createClientSchema.partial().extend({
    id: z.string().uuid(),
});

export type CreateClientSchema = z.infer<typeof createClientSchema>;
export type UpdateClientSchema = z.infer<typeof updateClientSchema>;

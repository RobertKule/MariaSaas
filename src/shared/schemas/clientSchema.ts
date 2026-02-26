import { z } from 'zod'
import { LoyaltyStatus } from '../types'

export const createClientSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  phone: z.string().optional().nullable(),
  email: z.string().email('Email invalide').optional().nullable().or(z.literal('')),
  address: z.string().optional().nullable(),
  creditLimit: z.number().min(0).default(0),
  loyaltyStatus: z.nativeEnum(LoyaltyStatus).default(LoyaltyStatus.NONE),
  insuranceProvider: z.string().optional().nullable(),
  insuranceNumber: z.string().optional().nullable()
})

export const updateClientSchema = createClientSchema.partial().extend({
  id: z.string().uuid()
})

export type CreateClientInput = z.infer<typeof createClientSchema>
export type UpdateClientInput = z.infer<typeof updateClientSchema>

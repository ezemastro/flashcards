import { z } from 'zod'

export const usernameSchema = z.string().min(3).max(20)
export const emailSchema = z.string().email()
export const passwordSchema = z.string().min(6).max(20)

import { z } from 'zod'

export const companySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  website_url: z.string().url('URL inválida').optional().or(z.literal('')),
})

export const serviceAccountSchema = z.object({
  company_id: z.number().min(1, 'Selecciona una empresa'),
  account_identifier: z.string().min(1, 'El identificador es requerido'),
  alias: z.string().optional(),
})

export const periodSchema = z.object({
  month_number: z.number().min(1).max(12, 'Mes inválido'),
  year_number: z.number().min(2000).max(2100, 'Año inválido'),
})

export const categorySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
})

export const expenseSchema = z.object({
  description: z.string().min(1, 'La descripción es requerida'),
  category_id: z.number().min(1, 'Selecciona una categoría'),
  period_id: z.number().min(1, 'Selecciona un período'),
  current_amount: z.number().positive('El monto debe ser mayor a 0'),
  account_id: z.number().optional().nullable(),
  due_date: z.string().optional(),
  is_recurring: z.boolean(),
  installment_current: z.number().optional().nullable(),
  installment_total: z.number().optional().nullable(),
})

export const payExpenseSchema = z.object({
  amount_paid: z.number().positive('El monto debe ser mayor a 0'),
})

export type CompanyFormValues = z.infer<typeof companySchema>
export type ServiceAccountFormValues = z.infer<typeof serviceAccountSchema>
export type PeriodFormValues = z.infer<typeof periodSchema>
export type CategoryFormValues = z.infer<typeof categorySchema>
export type ExpenseFormValues = z.infer<typeof expenseSchema>
export type PayExpenseFormValues = z.infer<typeof payExpenseSchema>

// Entidades del dominio

export interface Company {
  id: number
  name: string
  website_url?: string
  created_at: string
}

export interface ServiceAccount {
  id: number
  company_id: number
  company?: Company
  account_identifier: string
  alias?: string
  created_at: string
}

export interface Period {
  id: number
  month_number: number
  year_number: number
  created_at: string
}

export interface Category {
  id: number
  name: string
  created_at: string
}

export interface Expense {
  id: number
  description: string
  category_id: number
  category?: Category
  period_id: number
  period?: Period
  account_id?: number
  service_account?: ServiceAccount
  current_amount: number
  amount_paid?: number
  due_date?: string
  is_recurring: boolean
  installment_current?: number
  installment_total?: number
  payment_status: 'pending' | 'paid'
  paid_at?: string
  created_at: string
}

// Payloads de API

export type CreateCompanyPayload = {
  name: string
  website_url?: string
}

export type UpdateCompanyPayload = Partial<CreateCompanyPayload>

export type CreateServiceAccountPayload = {
  company_id: number
  account_identifier: string
  alias?: string
}

export type UpdateServiceAccountPayload = Partial<CreateServiceAccountPayload>

export type CreatePeriodPayload = {
  month_number: number
  year_number: number
}

export type CreateCategoryPayload = {
  name: string
}

export type CreateExpensePayload = {
  description: string
  category_id: number
  period_id: number
  current_amount: number
  account_id?: number
  due_date?: string
  is_recurring?: boolean
  installment_current?: number
  installment_total?: number
}

export type UpdateExpensePayload = Partial<CreateExpensePayload>

export type PayExpensePayload = {
  amount_paid: number
}

// Filtros para gastos

export type ExpenseFilters = {
  period_id?: number
  category_id?: number
  account_id?: number
  payment_status?: 'pending' | 'paid'
}

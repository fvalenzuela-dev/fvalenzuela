import type {
  Company,
  ServiceAccount,
  Period,
  Category,
  Expense,
  CreateCompanyPayload,
  UpdateCompanyPayload,
  CreateServiceAccountPayload,
  UpdateServiceAccountPayload,
  CreatePeriodPayload,
  CreateCategoryPayload,
  CreateExpensePayload,
  UpdateExpensePayload,
  PayExpensePayload,
  ExpenseFilters,
} from '@/app/cuentas/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

async function apiRequest<T>(
  token: string,
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  })

  if (!res.ok) {
    let message = `Error ${res.status}`
    try {
      const body = await res.json()
      message = body.message ?? body.error ?? message
    } catch {
      // respuesta sin body JSON
    }
    throw new Error(message)
  }

  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

// --- Companies ---

export const getCompanies = (token: string): Promise<Company[]> =>
  apiRequest<Company[]>(token, '/api/companies')

export const createCompany = (token: string, payload: CreateCompanyPayload): Promise<Company> =>
  apiRequest<Company>(token, '/api/companies', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

export const updateCompany = (token: string, id: number, payload: UpdateCompanyPayload): Promise<Company> =>
  apiRequest<Company>(token, `/api/companies/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

export const deleteCompany = (token: string, id: number): Promise<void> =>
  apiRequest<void>(token, `/api/companies/${id}`, { method: 'DELETE' })

// --- Service Accounts ---

export const getServiceAccounts = (token: string): Promise<ServiceAccount[]> =>
  apiRequest<ServiceAccount[]>(token, '/api/service-accounts')

export const createServiceAccount = (token: string, payload: CreateServiceAccountPayload): Promise<ServiceAccount> =>
  apiRequest<ServiceAccount>(token, '/api/service-accounts', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

export const updateServiceAccount = (token: string, id: number, payload: UpdateServiceAccountPayload): Promise<ServiceAccount> =>
  apiRequest<ServiceAccount>(token, `/api/service-accounts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

export const deleteServiceAccount = (token: string, id: number): Promise<void> =>
  apiRequest<void>(token, `/api/service-accounts/${id}`, { method: 'DELETE' })

// --- Periods ---

export const getPeriods = (token: string): Promise<Period[]> =>
  apiRequest<Period[]>(token, '/api/periods')

export const createPeriod = (token: string, payload: CreatePeriodPayload): Promise<Period> =>
  apiRequest<Period>(token, '/api/periods', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

export const deletePeriod = (token: string, id: number): Promise<void> =>
  apiRequest<void>(token, `/api/periods/${id}`, { method: 'DELETE' })

// --- Categories ---

export const getCategories = (token: string): Promise<Category[]> =>
  apiRequest<Category[]>(token, '/api/categories')

export const createCategory = (token: string, payload: CreateCategoryPayload): Promise<Category> =>
  apiRequest<Category>(token, '/api/categories', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

export const deleteCategory = (token: string, id: number): Promise<void> =>
  apiRequest<void>(token, `/api/categories/${id}`, { method: 'DELETE' })

// --- Expenses ---

export const getExpenses = (token: string, filters: ExpenseFilters = {}): Promise<Expense[]> => {
  const params = new URLSearchParams()
  if (filters.period_id) params.set('period_id', String(filters.period_id))
  if (filters.category_id) params.set('category_id', String(filters.category_id))
  if (filters.account_id) params.set('account_id', String(filters.account_id))
  if (filters.payment_status) params.set('payment_status', filters.payment_status)
  const qs = params.toString()
  return apiRequest<Expense[]>(token, `/api/expenses${qs ? `?${qs}` : ''}`)
}

export const createExpense = (token: string, payload: CreateExpensePayload): Promise<Expense> =>
  apiRequest<Expense>(token, '/api/expenses', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

export const updateExpense = (token: string, id: number, payload: UpdateExpensePayload): Promise<Expense> =>
  apiRequest<Expense>(token, `/api/expenses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })

export const deleteExpense = (token: string, id: number): Promise<void> =>
  apiRequest<void>(token, `/api/expenses/${id}`, { method: 'DELETE' })

export const payExpense = (token: string, id: number, payload: PayExpensePayload): Promise<Expense> =>
  apiRequest<Expense>(token, `/api/expenses/${id}/pay`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })

// --- Pending Expenses ---

export const getPendingExpenses = (token: string, days_ahead = 7): Promise<Expense[]> =>
  apiRequest<Expense[]>(token, `/api/expenses/pending?days_ahead=${days_ahead}`)

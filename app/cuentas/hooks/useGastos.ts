'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useApi } from '@/app/cuentas/hooks/useApi'
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  payExpense,
  getPendingExpenses,
} from '@/app/cuentas/lib/api'
import type {
  Expense,
  CreateExpensePayload,
  UpdateExpensePayload,
  PayExpensePayload,
  ExpenseFilters,
} from '@/app/cuentas/types'

export function useGastos(filters: ExpenseFilters = {}): {
  gastos: Expense[]
  pendientes: Expense[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  refreshPendientes: (daysAhead?: number) => Promise<void>
  create: (payload: CreateExpensePayload) => Promise<Expense>
  update: (id: number, payload: UpdateExpensePayload) => Promise<Expense>
  remove: (id: number) => Promise<void>
  pay: (id: number, payload: PayExpensePayload) => Promise<Expense>
} {
  const { fetchWithAuth } = useApi()
  const [gastos, setGastos] = useState<Expense[]>([])
  const [pendientes, setPendientes] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const filtersRef = useRef(filters)
  filtersRef.current = filters

  const refresh = useCallback(async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchWithAuth((token) => getExpenses(token, filtersRef.current))
      setGastos(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al cargar gastos')
    } finally {
      setLoading(false)
    }
  }, [fetchWithAuth])

  const refreshPendientes = useCallback(
    async (daysAhead = 7): Promise<void> => {
      try {
        const data = await fetchWithAuth((token) => getPendingExpenses(token, daysAhead))
        setPendientes(data)
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Error al cargar pendientes')
      }
    },
    [fetchWithAuth]
  )

  useEffect(() => {
    void refresh()
  }, [refresh])

  const create = async (payload: CreateExpensePayload): Promise<Expense> => {
    try {
      const newGasto = await fetchWithAuth((token) => createExpense(token, payload))
      setGastos((prev) => [newGasto, ...prev])
      return newGasto
    } catch (e: unknown) {
      throw new Error(e instanceof Error ? e.message : 'Error al crear gasto')
    }
  }

  const update = async (id: number, payload: UpdateExpensePayload): Promise<Expense> => {
    try {
      const updated = await fetchWithAuth((token) => updateExpense(token, id, payload))
      setGastos((prev) => prev.map((g) => (g.id === id ? updated : g)))
      return updated
    } catch (e: unknown) {
      throw new Error(e instanceof Error ? e.message : 'Error al actualizar gasto')
    }
  }

  const remove = async (id: number): Promise<void> => {
    setGastos((prev) => prev.filter((g) => g.id !== id))
    try {
      await fetchWithAuth((token) => deleteExpense(token, id))
    } catch (e: unknown) {
      await refresh()
      throw new Error(e instanceof Error ? e.message : 'Error al eliminar gasto')
    }
  }

  const pay = async (id: number, payload: PayExpensePayload): Promise<Expense> => {
    setGastos((prev) =>
      prev.map((g) =>
        g.id === id
          ? { ...g, payment_status: 'paid' as const, amount_paid: payload.amount_paid }
          : g
      )
    )
    try {
      const updated = await fetchWithAuth((token) => payExpense(token, id, payload))
      setGastos((prev) => prev.map((g) => (g.id === id ? updated : g)))
      return updated
    } catch (e: unknown) {
      await refresh()
      throw new Error(e instanceof Error ? e.message : 'Error al registrar pago')
    }
  }

  return {
    gastos,
    pendientes,
    loading,
    error,
    refresh,
    refreshPendientes,
    create,
    update,
    remove,
    pay,
  }
}

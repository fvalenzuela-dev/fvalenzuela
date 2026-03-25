'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useApi } from '@/app/cuentas/hooks/useApi'
import { getPeriods, createPeriod, deletePeriod } from '@/app/cuentas/lib/api'
import type { Period, CreatePeriodPayload } from '@/app/cuentas/types'

export function usePeriodos(): {
  periodos: Period[]
  loading: boolean
  error: string | null
  activePeriodId: number | null
  setActivePeriodId: (id: number) => void
  refresh: () => Promise<void>
  create: (payload: CreatePeriodPayload) => Promise<Period>
  remove: (id: number) => Promise<void>
} {
  const { fetchWithAuth } = useApi()
  const [periodos, setPeriodos] = useState<Period[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activePeriodId, setActivePeriodId] = useState<number | null>(null)
  const initialized = useRef(false)

  const refresh = useCallback(async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchWithAuth(getPeriods)
      setPeriodos(data)
      if (!initialized.current && data.length > 0) {
        initialized.current = true
        const now = new Date()
        const current = data.find(
          (p) => p.month_number === now.getMonth() + 1 && p.year_number === now.getFullYear()
        )
        setActivePeriodId(current ? current.id : data[data.length - 1].id)
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al cargar períodos')
    } finally {
      setLoading(false)
    }
  }, [fetchWithAuth])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const create = async (payload: CreatePeriodPayload): Promise<Period> => {
    try {
      const newPeriodo = await fetchWithAuth((token) => createPeriod(token, payload))
      setPeriodos((prev) => [...prev, newPeriodo])
      return newPeriodo
    } catch (e: unknown) {
      throw new Error(e instanceof Error ? e.message : 'Error al crear período')
    }
  }

  const remove = async (id: number): Promise<void> => {
    setPeriodos((prev) => prev.filter((p) => p.id !== id))
    try {
      await fetchWithAuth((token) => deletePeriod(token, id))
    } catch (e: unknown) {
      await refresh()
      throw new Error(e instanceof Error ? e.message : 'Error al eliminar período')
    }
  }

  return { periodos, loading, error, activePeriodId, setActivePeriodId, refresh, create, remove }
}

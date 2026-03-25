'use client'

import { useState, useEffect, useCallback } from 'react'
import { useApi } from '@/app/cuentas/hooks/useApi'
import {
  getServiceAccounts,
  createServiceAccount,
  updateServiceAccount,
  deleteServiceAccount,
} from '@/app/cuentas/lib/api'
import type {
  ServiceAccount,
  CreateServiceAccountPayload,
  UpdateServiceAccountPayload,
} from '@/app/cuentas/types'

export function useCuentas(): {
  cuentas: ServiceAccount[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  create: (payload: CreateServiceAccountPayload) => Promise<ServiceAccount>
  update: (id: number, payload: UpdateServiceAccountPayload) => Promise<ServiceAccount>
  remove: (id: number) => Promise<void>
} {
  const { fetchWithAuth } = useApi()
  const [cuentas, setCuentas] = useState<ServiceAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchWithAuth(getServiceAccounts)
      setCuentas(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al cargar cuentas')
    } finally {
      setLoading(false)
    }
  }, [fetchWithAuth])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const create = async (payload: CreateServiceAccountPayload): Promise<ServiceAccount> => {
    try {
      const newCuenta = await fetchWithAuth((token) => createServiceAccount(token, payload))
      setCuentas((prev) => [...prev, newCuenta])
      return newCuenta
    } catch (e: unknown) {
      throw new Error(e instanceof Error ? e.message : 'Error al crear cuenta')
    }
  }

  const update = async (id: number, payload: UpdateServiceAccountPayload): Promise<ServiceAccount> => {
    try {
      const updated = await fetchWithAuth((token) => updateServiceAccount(token, id, payload))
      setCuentas((prev) => prev.map((c) => (c.id === id ? updated : c)))
      return updated
    } catch (e: unknown) {
      throw new Error(e instanceof Error ? e.message : 'Error al actualizar cuenta')
    }
  }

  const remove = async (id: number): Promise<void> => {
    setCuentas((prev) => prev.filter((c) => c.id !== id))
    try {
      await fetchWithAuth((token) => deleteServiceAccount(token, id))
    } catch (e: unknown) {
      await refresh()
      throw new Error(e instanceof Error ? e.message : 'Error al eliminar cuenta')
    }
  }

  return { cuentas, loading, error, refresh, create, update, remove }
}

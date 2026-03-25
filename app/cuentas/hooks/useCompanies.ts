'use client'

import { useState, useEffect, useCallback } from 'react'
import { useApi } from '@/app/cuentas/hooks/useApi'
import {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from '@/app/cuentas/lib/api'
import type { Company, CreateCompanyPayload, UpdateCompanyPayload } from '@/app/cuentas/types'

export function useCompanies(): {
  companies: Company[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  create: (payload: CreateCompanyPayload) => Promise<Company>
  update: (id: number, payload: UpdateCompanyPayload) => Promise<Company>
  remove: (id: number) => Promise<void>
} {
  const { fetchWithAuth } = useApi()
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchWithAuth(getCompanies)
      setCompanies(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al cargar empresas')
    } finally {
      setLoading(false)
    }
  }, [fetchWithAuth])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const create = async (payload: CreateCompanyPayload): Promise<Company> => {
    try {
      const newCompany = await fetchWithAuth((token) => createCompany(token, payload))
      setCompanies((prev) => [...prev, newCompany])
      return newCompany
    } catch (e: unknown) {
      throw new Error(e instanceof Error ? e.message : 'Error al crear empresa')
    }
  }

  const update = async (id: number, payload: UpdateCompanyPayload): Promise<Company> => {
    try {
      const updated = await fetchWithAuth((token) => updateCompany(token, id, payload))
      setCompanies((prev) => prev.map((c) => (c.id === id ? updated : c)))
      return updated
    } catch (e: unknown) {
      throw new Error(e instanceof Error ? e.message : 'Error al actualizar empresa')
    }
  }

  const remove = async (id: number): Promise<void> => {
    setCompanies((prev) => prev.filter((c) => c.id !== id))
    try {
      await fetchWithAuth((token) => deleteCompany(token, id))
    } catch (e: unknown) {
      await refresh()
      throw new Error(e instanceof Error ? e.message : 'Error al eliminar empresa')
    }
  }

  return { companies, loading, error, refresh, create, update, remove }
}

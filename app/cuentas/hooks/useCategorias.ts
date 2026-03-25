'use client'

import { useState, useEffect, useCallback } from 'react'
import { useApi } from '@/app/cuentas/hooks/useApi'
import { getCategories, createCategory, deleteCategory } from '@/app/cuentas/lib/api'
import type { Category, CreateCategoryPayload } from '@/app/cuentas/types'

export function useCategorias(): {
  categorias: Category[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  create: (payload: CreateCategoryPayload) => Promise<Category>
  remove: (id: number) => Promise<void>
} {
  const { fetchWithAuth } = useApi()
  const [categorias, setCategorias] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async (): Promise<void> => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchWithAuth(getCategories)
      setCategorias(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error al cargar categorías')
    } finally {
      setLoading(false)
    }
  }, [fetchWithAuth])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const create = async (payload: CreateCategoryPayload): Promise<Category> => {
    try {
      const newCategoria = await fetchWithAuth((token) => createCategory(token, payload))
      setCategorias((prev) => [...prev, newCategoria])
      return newCategoria
    } catch (e: unknown) {
      throw new Error(e instanceof Error ? e.message : 'Error al crear categoría')
    }
  }

  const remove = async (id: number): Promise<void> => {
    setCategorias((prev) => prev.filter((c) => c.id !== id))
    try {
      await fetchWithAuth((token) => deleteCategory(token, id))
    } catch (e: unknown) {
      await refresh()
      throw new Error(e instanceof Error ? e.message : 'Error al eliminar categoría')
    }
  }

  return { categorias, loading, error, refresh, create, remove }
}

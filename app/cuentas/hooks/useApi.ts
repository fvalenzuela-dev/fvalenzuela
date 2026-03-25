'use client'

import { useCallback } from 'react'
import { useAuth } from '@clerk/nextjs'

interface UseApiReturn {
  fetchWithAuth: <T>(fn: (token: string) => Promise<T>) => Promise<T>
}

export function useApi(): UseApiReturn {
  const { getToken } = useAuth()

  const fetchWithAuth = useCallback(async <T>(
    fn: (token: string) => Promise<T>
  ): Promise<T> => {
    try {
      const token = await getToken()
      if (!token) throw new Error('No autenticado')
      return await fn(token)
    } catch (e: unknown) {
      throw new Error(e instanceof Error ? e.message : 'Error de autenticación')
    }
  }, [getToken])

  return { fetchWithAuth }
}

'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import { companySchema, type CompanyFormValues } from '@/app/cuentas/lib/schemas'
import type { Company } from '@/app/cuentas/types'

interface Props {
  companies: Company[]
  loading: boolean
  onCreate: (data: CompanyFormValues) => Promise<unknown>
  onUpdate: (id: number, data: CompanyFormValues) => Promise<unknown>
  onDelete: (id: number) => Promise<void>
}

const INPUT_CLASS =
  'w-full bg-white dark:bg-dark border border-border dark:border-darkborder text-dark dark:text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary'

function EmpresasList({ companies, loading, onCreate, onUpdate, onDelete }: Readonly<Props>): React.JSX.Element {
  const [editing, setEditing] = useState<Company | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CompanyFormValues>({ resolver: zodResolver(companySchema) })

  const openCreate = (): void => {
    setEditing(null)
    reset({ name: '', website_url: '' })
    setShowForm(true)
  }

  const openEdit = (company: Company): void => {
    setEditing(company)
    reset({ name: company.name, website_url: company.website_url ?? '' })
    setShowForm(true)
  }

  const onSubmit = async (data: CompanyFormValues): Promise<void> => {
    setSubmitError(null)
    try {
      if (editing) {
        await onUpdate(editing.id, data)
      } else {
        await onCreate(data)
      }
      setShowForm(false)
      reset()
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : 'Error al guardar empresa')
    }
  }

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await onDelete(id)
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : 'Error al eliminar empresa')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-dark dark:text-white">Empresas</h2>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          <Icon icon="solar:add-circle-bold" width={16} />
          Agregar empresa
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-dark border border-border dark:border-darkborder rounded-xl p-4">
          <h3 className="font-semibold text-dark dark:text-white mb-3">
            {editing ? 'Editar empresa' : 'Nueva empresa'}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <input type="text" {...register('name')} placeholder="Nombre *" className={INPUT_CLASS} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <input type="text" {...register('website_url')} placeholder="Sitio web (opcional)" className={INPUT_CLASS} />
              {errors.website_url && <p className="text-red-500 text-xs mt-1">{errors.website_url.message}</p>}
            </div>
            {submitError && <p className="text-red-500 text-xs">{submitError}</p>}
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-3 py-1.5 text-sm text-dark dark:text-white border border-border dark:border-darkborder rounded-md hover:bg-gray-50 dark:hover:bg-white/5"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-3 py-1.5 text-sm bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-60"
              >
                {editing ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 bg-gray-100 dark:bg-white/5 animate-pulse rounded-xl" />
          ))}
        </div>
      ) : companies.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">No hay empresas registradas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border dark:border-darkborder text-left text-gray-500 dark:text-gray-400">
                <th className="pb-2 font-medium">Nombre</th>
                <th className="pb-2 font-medium">Sitio web</th>
                <th className="pb-2 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border dark:divide-darkborder">
              {companies.map((company) => (
                <tr key={company.id}>
                  <td className="py-3 font-medium text-dark dark:text-white">{company.name}</td>
                  <td className="py-3 text-gray-500 dark:text-gray-400">
                    {company.website_url ? (
                      <a href={company.website_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {company.website_url}
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="py-3 text-right">
                    <button onClick={() => openEdit(company)} className="p-1 text-gray-400 hover:text-primary transition-colors" aria-label="Editar empresa">
                      <Icon icon="solar:pen-bold" width={16} />
                    </button>
                    <button onClick={() => void handleDelete(company.id)} className="p-1 text-gray-400 hover:text-red-500 transition-colors ml-1" aria-label="Eliminar empresa">
                      <Icon icon="solar:trash-bin-trash-bold" width={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default EmpresasList

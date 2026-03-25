'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import { serviceAccountSchema, type ServiceAccountFormValues } from '@/app/cuentas/lib/schemas'
import type { ServiceAccount, Company } from '@/app/cuentas/types'

interface Props {
  cuentas: ServiceAccount[]
  companies: Company[]
  loading: boolean
  onCreate: (data: ServiceAccountFormValues) => Promise<unknown>
  onUpdate: (id: number, data: ServiceAccountFormValues) => Promise<unknown>
  onDelete: (id: number) => Promise<void>
}

const INPUT_CLASS =
  'w-full bg-white dark:bg-dark border border-border dark:border-darkborder text-dark dark:text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary'

function CuentasList({ cuentas, companies, loading, onCreate, onUpdate, onDelete }: Readonly<Props>): React.JSX.Element {
  const [editing, setEditing] = useState<ServiceAccount | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ServiceAccountFormValues>({ resolver: zodResolver(serviceAccountSchema) })

  const openCreate = (): void => {
    setEditing(null)
    reset({ company_id: 0, account_identifier: '', alias: '' })
    setShowForm(true)
  }

  const openEdit = (cuenta: ServiceAccount): void => {
    setEditing(cuenta)
    reset({
      company_id: cuenta.company_id,
      account_identifier: cuenta.account_identifier,
      alias: cuenta.alias ?? '',
    })
    setShowForm(true)
  }

  const onSubmit = async (data: ServiceAccountFormValues): Promise<void> => {
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
      setSubmitError(e instanceof Error ? e.message : 'Error al guardar cuenta')
    }
  }

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await onDelete(id)
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : 'Error al eliminar cuenta')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-dark dark:text-white">Cuentas de servicio</h2>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          disabled={companies.length === 0}
          title={companies.length === 0 ? 'Agrega una empresa primero' : undefined}
        >
          <Icon icon="solar:add-circle-bold" width={16} />
          Agregar cuenta
        </button>
      </div>

      {companies.length === 0 && (
        <div className="p-3 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/20 rounded-lg text-sm text-yellow-700 dark:text-yellow-400">
          <Icon icon="solar:info-circle-bold" className="inline mr-1" width={16} />
          Primero debes agregar una empresa.
        </div>
      )}

      {showForm && (
        <div className="bg-white dark:bg-dark border border-border dark:border-darkborder rounded-xl p-4">
          <h3 className="font-semibold text-dark dark:text-white mb-3">
            {editing ? 'Editar cuenta' : 'Nueva cuenta de servicio'}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <select {...register('company_id', { valueAsNumber: true })} className={INPUT_CLASS}>
                <option value="">Empresa *</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              {errors.company_id && <p className="text-red-500 text-xs mt-1">{errors.company_id.message}</p>}
            </div>
            <div>
              <input type="text" {...register('account_identifier')} placeholder="Número de cuenta *" className={INPUT_CLASS} />
              {errors.account_identifier && <p className="text-red-500 text-xs mt-1">{errors.account_identifier.message}</p>}
            </div>
            <div>
              <input type="text" {...register('alias')} placeholder="Alias (opcional, ej: Luz - Casa)" className={INPUT_CLASS} />
            </div>
            {submitError && <p className="text-red-500 text-xs">{submitError}</p>}
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setShowForm(false)} className="px-3 py-1.5 text-sm text-dark dark:text-white border border-border dark:border-darkborder rounded-md hover:bg-gray-50 dark:hover:bg-white/5">
                Cancelar
              </button>
              <button type="submit" disabled={isSubmitting} className="px-3 py-1.5 text-sm bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-60">
                {editing ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-100 dark:bg-white/5 animate-pulse rounded-xl" />
          ))}
        </div>
      ) : cuentas.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">No hay cuentas registradas.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {cuentas.map((cuenta) => (
            <div
              key={cuenta.id}
              className="bg-white dark:bg-dark border border-border dark:border-darkborder rounded-xl p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-dark dark:text-white">
                    {cuenta.alias ?? cuenta.account_identifier}
                  </p>
                  {cuenta.alias && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{cuenta.account_identifier}</p>
                  )}
                  <p className="text-xs text-primary mt-1">
                    {cuenta.company?.name ?? `Empresa #${cuenta.company_id}`}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(cuenta)} className="p-1 text-gray-400 hover:text-primary transition-colors" aria-label="Editar cuenta">
                    <Icon icon="solar:pen-bold" width={15} />
                  </button>
                  <button onClick={() => void handleDelete(cuenta.id)} className="p-1 text-gray-400 hover:text-red-500 transition-colors" aria-label="Eliminar cuenta">
                    <Icon icon="solar:trash-bin-trash-bold" width={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CuentasList

'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import { expenseSchema, type ExpenseFormValues } from '@/app/cuentas/lib/schemas'
import type { Expense, Category, Period, ServiceAccount } from '@/app/cuentas/types'

interface Props {
  expense?: Expense | null
  categories: Category[]
  periods: Period[]
  accounts: ServiceAccount[]
  defaultPeriodId?: number | null
  onSubmit: (data: ExpenseFormValues) => Promise<void>
  onCancel: () => void
}

const INPUT_CLASS =
  'w-full bg-white dark:bg-dark border border-border dark:border-darkborder text-dark dark:text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary'

const LABEL_CLASS = 'block text-sm font-medium text-dark dark:text-white mb-1'

function GastoForm({
  expense,
  categories,
  periods,
  accounts,
  defaultPeriodId,
  onSubmit,
  onCancel,
}: Readonly<Props>): React.JSX.Element {
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      is_recurring: false,
      due_date: '',
    },
  })

  useEffect(() => {
    if (expense) {
      reset({
        description: expense.description,
        category_id: expense.category_id,
        period_id: expense.period_id,
        current_amount: expense.current_amount,
        account_id: expense.account_id ?? null,
        due_date: expense.due_date ?? '',
        is_recurring: expense.is_recurring,
        installment_current: expense.installment_current ?? null,
        installment_total: expense.installment_total ?? null,
      })
    } else if (defaultPeriodId) {
      reset((prev) => ({ ...prev, period_id: defaultPeriodId }))
    }
  }, [expense, defaultPeriodId, reset])

  const handleFormSubmit = async (data: ExpenseFormValues): Promise<void> => {
    setSubmitError(null)
    try {
      await onSubmit(data)
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : 'Error al guardar gasto')
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className={LABEL_CLASS}>Descripción *</label>
        <input type="text" {...register('description')} className={INPUT_CLASS} placeholder="Ej: Electricidad - Casa" />
        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={LABEL_CLASS}>Categoría *</label>
          <select {...register('category_id', { valueAsNumber: true })} className={INPUT_CLASS}>
            <option value="">Seleccionar...</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id.message}</p>}
        </div>

        <div>
          <label className={LABEL_CLASS}>Período *</label>
          <select {...register('period_id', { valueAsNumber: true })} className={INPUT_CLASS}>
            <option value="">Seleccionar...</option>
            {periods.map((p) => (
              <option key={p.id} value={p.id}>
                {p.month_number.toString().padStart(2, '0')}/{p.year_number}
              </option>
            ))}
          </select>
          {errors.period_id && <p className="text-red-500 text-xs mt-1">{errors.period_id.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={LABEL_CLASS}>Monto *</label>
          <input type="number" step="1" {...register('current_amount', { valueAsNumber: true })} className={INPUT_CLASS} />
          {errors.current_amount && <p className="text-red-500 text-xs mt-1">{errors.current_amount.message}</p>}
        </div>

        <div>
          <label className={LABEL_CLASS}>Fecha vencimiento</label>
          <input type="date" {...register('due_date')} className={INPUT_CLASS} />
        </div>
      </div>

      <div>
        <label className={LABEL_CLASS}>Cuenta de servicio</label>
        <select {...register('account_id', { valueAsNumber: true })} className={INPUT_CLASS}>
          <option value="">Sin cuenta asociada</option>
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>{a.alias ?? a.account_identifier}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="is_recurring"
          {...register('is_recurring')}
          className="w-4 h-4 accent-primary"
        />
        <label htmlFor="is_recurring" className="text-sm text-dark dark:text-white">
          Gasto recurrente (mensual)
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={LABEL_CLASS}>Cuota actual</label>
          <input type="number" min="1" {...register('installment_current', { valueAsNumber: true })} className={INPUT_CLASS} placeholder="Ej: 2" />
        </div>
        <div>
          <label className={LABEL_CLASS}>Total cuotas</label>
          <input type="number" min="1" {...register('installment_total', { valueAsNumber: true })} className={INPUT_CLASS} placeholder="Ej: 12" />
        </div>
      </div>

      {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
      <div className="flex gap-3 justify-end pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-dark dark:text-white border border-border dark:border-darkborder rounded-md hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          {isSubmitting ? (
            <Icon icon="solar:refresh-bold" className="animate-spin" width={16} />
          ) : (
            <Icon icon="solar:diskette-bold" width={16} />
          )}
          {expense ? 'Actualizar' : 'Crear gasto'}
        </button>
      </div>
    </form>
  )
}

export default GastoForm

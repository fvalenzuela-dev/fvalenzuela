'use client'

import React, { useEffect } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import { payExpenseSchema, type PayExpenseFormValues } from '@/app/cuentas/lib/schemas'
import type { Expense } from '@/app/cuentas/types'

interface Props {
  gasto: Expense | null
  onClose: () => void
  onConfirm: (id: number, amountPaid: number) => Promise<void>
}

function formatMonto(amount: number): string {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount)
}

function PagarModal({ gasto, onClose, onConfirm }: Readonly<Props>): React.JSX.Element {
  const [submitError, setSubmitError] = React.useState<string | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PayExpenseFormValues>({
    resolver: zodResolver(payExpenseSchema),
  })

  useEffect(() => {
    if (gasto) {
      reset({ amount_paid: gasto.current_amount })
    }
  }, [gasto, reset])

  const onSubmit = async (data: PayExpenseFormValues): Promise<void> => {
    if (!gasto) return
    setSubmitError(null)
    try {
      await onConfirm(gasto.id, data.amount_paid)
      onClose()
    } catch (e: unknown) {
      setSubmitError(e instanceof Error ? e.message : 'Error al registrar pago')
    }
  }

  return (
    <Dialog open={gasto !== null} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white dark:bg-dark border border-border dark:border-darkborder rounded-xl p-6 w-full max-w-md shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <DialogTitle className="text-lg font-bold text-dark dark:text-white">
              Registrar pago
            </DialogTitle>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="Cerrar modal"
            >
              <Icon icon="solar:close-circle-bold" width={24} />
            </button>
          </div>

          {gasto && (
            <div className="mb-4 p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
              <p className="font-medium text-dark dark:text-white">{gasto.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Monto pendiente: <span className="font-semibold">{formatMonto(gasto.current_amount)}</span>
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white mb-1">
                Monto pagado
              </label>
              <input
                type="number"
                step="1"
                {...register('amount_paid', { valueAsNumber: true })}
                className="w-full bg-white dark:bg-dark border border-border dark:border-darkborder text-dark dark:text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.amount_paid && (
                <p className="text-red-500 text-xs mt-1">{errors.amount_paid.message}</p>
              )}
            </div>

            {submitError && (
              <p className="text-red-500 text-sm">{submitError}</p>
            )}
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={onClose}
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
                  <Icon icon="solar:card-bold" width={16} />
                )}
                Confirmar pago
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default PagarModal

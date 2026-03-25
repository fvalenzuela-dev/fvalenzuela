'use client'

import React from 'react'
import { Icon } from '@iconify/react'
import type { Expense } from '@/app/cuentas/types'

interface Props {
  gasto: Expense
  onPagar: (gasto: Expense) => void
  onEditar: (gasto: Expense) => void
  onEliminar: (id: number) => void
}

function formatMonto(amount: number): string {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount)
}

function formatFecha(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit' })
}

function getDueDateStatus(dueDateStr?: string): 'overdue' | 'soon' | 'normal' {
  if (!dueDateStr) return 'normal'
  const due = new Date(dueDateStr)
  const now = new Date()
  const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays < 0) return 'overdue'
  if (diffDays <= 7) return 'soon'
  return 'normal'
}

function GastoCard({ gasto, onPagar, onEditar, onEliminar }: Readonly<Props>): React.JSX.Element {
  const isPaid = gasto.payment_status === 'paid'
  const dueDateStatus = getDueDateStatus(gasto.due_date)

  return (
    <div className="bg-white dark:bg-dark border border-border dark:border-darkborder rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-dark dark:text-white truncate">
            {gasto.description}
          </span>
          {gasto.category && (
            <span className="text-xs bg-lightprimary text-primary dark:bg-primary/20 px-2 py-0.5 rounded-full">
              {gasto.category.name}
            </span>
          )}
          {gasto.is_recurring && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              <Icon icon="solar:refresh-bold" className="inline" width={12} /> Mensual
            </span>
          )}
          {gasto.installment_total && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Cuota {gasto.installment_current}/{gasto.installment_total}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500 dark:text-gray-400">
          {gasto.service_account && (
            <span>{gasto.service_account.alias ?? gasto.service_account.account_identifier}</span>
          )}
          {gasto.due_date && (
            <span
              className={
                dueDateStatus === 'overdue'
                  ? 'text-red-500 font-medium'
                  : dueDateStatus === 'soon'
                  ? 'text-yellow-500 font-medium'
                  : ''
              }
            >
              <Icon icon="solar:calendar-bold" className="inline mr-1" width={14} />
              Vence {formatFecha(gasto.due_date)}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="text-right">
          <p className="font-bold text-dark dark:text-white">{formatMonto(gasto.current_amount)}</p>
          {isPaid && gasto.amount_paid && gasto.amount_paid !== gasto.current_amount && (
            <p className="text-xs text-gray-500">Pagado: {formatMonto(gasto.amount_paid)}</p>
          )}
        </div>

        {isPaid ? (
          <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
            <Icon icon="solar:check-circle-bold" width={16} />
            Pagado
          </span>
        ) : (
          <span
            className={`flex items-center gap-1 text-xs font-medium ${
              dueDateStatus === 'overdue'
                ? 'text-red-500'
                : dueDateStatus === 'soon'
                ? 'text-yellow-500'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <Icon
              icon={
                dueDateStatus === 'overdue'
                  ? 'solar:danger-bold'
                  : dueDateStatus === 'soon'
                  ? 'solar:clock-bold'
                  : 'solar:hourglass-bold'
              }
              width={16}
            />
            {dueDateStatus === 'overdue' ? 'Vencido' : 'Pendiente'}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {!isPaid && (
          <button
            onClick={() => onPagar(gasto)}
            className="flex items-center gap-1 bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors"
            aria-label="Pagar gasto"
          >
            <Icon icon="solar:card-bold" width={14} />
            Pagar
          </button>
        )}
        <button
          onClick={() => onEditar(gasto)}
          className="p-1.5 text-gray-400 hover:text-primary transition-colors"
          aria-label="Editar gasto"
        >
          <Icon icon="solar:pen-bold" width={16} />
        </button>
        <button
          onClick={() => onEliminar(gasto.id)}
          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Eliminar gasto"
        >
          <Icon icon="solar:trash-bin-trash-bold" width={16} />
        </button>
      </div>
    </div>
  )
}

export default GastoCard

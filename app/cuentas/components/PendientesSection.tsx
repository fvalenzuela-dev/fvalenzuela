'use client'

import React from 'react'
import { Icon } from '@iconify/react'
import type { Expense } from '@/app/cuentas/types'

interface Props {
  pendientes: Expense[]
  onPagar: (gasto: Expense) => void
}

interface PendienteRowProps {
  gasto: Expense
  onPagar: (g: Expense) => void
  overdue: boolean
}

function formatMonto(amount: number): string {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount)
}

function formatFecha(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function isOverdue(dueDateStr?: string): boolean {
  if (!dueDateStr) return false
  return new Date(dueDateStr) < new Date()
}

function PendienteRow({ gasto, onPagar, overdue }: Readonly<PendienteRowProps>): React.JSX.Element {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg border ${
        overdue
          ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20'
          : 'bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20'
      }`}
    >
      <div>
        <p className={`font-medium text-sm ${overdue ? 'text-red-700 dark:text-red-400' : 'text-yellow-700 dark:text-yellow-400'}`}>
          {gasto.description}
        </p>
        {gasto.due_date && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Vence: {formatFecha(gasto.due_date)}
          </p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <span className="font-bold text-sm text-dark dark:text-white">
          {formatMonto(gasto.current_amount)}
        </span>
        <button
          onClick={() => onPagar(gasto)}
          className="flex items-center gap-1 bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors"
          aria-label="Pagar gasto pendiente"
        >
          <Icon icon="solar:card-bold" width={14} />
          Pagar
        </button>
      </div>
    </div>
  )
}

function PendientesSection({ pendientes, onPagar }: Readonly<Props>): React.JSX.Element {
  if (pendientes.length === 0) {
    return (
      <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-lg text-sm text-green-700 dark:text-green-400">
        <Icon icon="solar:check-circle-bold" width={18} />
        No hay pagos próximos a vencer.
      </div>
    )
  }

  const vencidos = pendientes.filter((g) => isOverdue(g.due_date))
  const proximos = pendientes.filter((g) => !isOverdue(g.due_date))

  return (
    <div className="space-y-3">
      {vencidos.length > 0 && (
        <div className="space-y-2">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-red-500">
            <Icon icon="solar:danger-bold" width={16} />
            Vencidos ({vencidos.length})
          </h3>
          {vencidos.map((g) => (
            <PendienteRow key={g.id} gasto={g} onPagar={onPagar} overdue />
          ))}
        </div>
      )}

      {proximos.length > 0 && (
        <div className="space-y-2">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-yellow-600 dark:text-yellow-400">
            <Icon icon="solar:clock-bold" width={16} />
            Próximos a vencer ({proximos.length})
          </h3>
          {proximos.map((g) => (
            <PendienteRow key={g.id} gasto={g} onPagar={onPagar} overdue={false} />
          ))}
        </div>
      )}
    </div>
  )
}

export default PendientesSection

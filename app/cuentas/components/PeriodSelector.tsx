'use client'

import React from 'react'
import { Icon } from '@iconify/react'
import type { Period } from '@/app/cuentas/types'

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

interface Props {
  periodos: Period[]
  activePeriodId: number | null
  onChange: (id: number) => void
  loading?: boolean
}

function PeriodSelector({ periodos, activePeriodId, onChange, loading }: Readonly<Props>): React.JSX.Element {
  if (loading) {
    return <div className="h-9 w-48 bg-gray-200 dark:bg-darkborder animate-pulse rounded-md" />
  }

  return (
    <div className="relative inline-flex items-center gap-2">
      <Icon icon="solar:calendar-bold-duotone" className="text-primary" width={20} />
      <select
        value={activePeriodId ?? ''}
        onChange={(e) => onChange(Number(e.target.value))}
        className="appearance-none bg-white dark:bg-dark border border-border dark:border-darkborder text-dark dark:text-white text-sm rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="" disabled>Seleccionar período</option>
        {periodos.map((p) => (
          <option key={p.id} value={p.id}>
            {MONTHS[p.month_number - 1]} {p.year_number}
          </option>
        ))}
      </select>
      <Icon
        icon="solar:alt-arrow-down-bold"
        className="absolute right-2 pointer-events-none text-gray-400"
        width={16}
      />
    </div>
  )
}

export default PeriodSelector

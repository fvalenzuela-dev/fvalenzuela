'use client'

import React from 'react'
import type { Category, ServiceAccount } from '@/app/cuentas/types'

interface Props {
  categories: Category[]
  accounts: ServiceAccount[]
  selectedCategoryId: number | null
  selectedAccountId: number | null
  selectedStatus: 'all' | 'pending' | 'paid'
  onCategoryChange: (id: number | null) => void
  onAccountChange: (id: number | null) => void
  onStatusChange: (status: 'all' | 'pending' | 'paid') => void
}

const SELECT_CLASS =
  'bg-white dark:bg-dark border border-border dark:border-darkborder text-dark dark:text-white text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary'

function FilterBar({
  categories,
  accounts,
  selectedCategoryId,
  selectedAccountId,
  selectedStatus,
  onCategoryChange,
  onAccountChange,
  onStatusChange,
}: Readonly<Props>): React.JSX.Element {
  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value as 'all' | 'pending' | 'paid')}
        className={SELECT_CLASS}
      >
        <option value="all">Todos los estados</option>
        <option value="pending">Pendientes</option>
        <option value="paid">Pagados</option>
      </select>

      <select
        value={selectedCategoryId ?? ''}
        onChange={(e) => onCategoryChange(e.target.value ? Number(e.target.value) : null)}
        className={SELECT_CLASS}
      >
        <option value="">Todas las categorías</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <select
        value={selectedAccountId ?? ''}
        onChange={(e) => onAccountChange(e.target.value ? Number(e.target.value) : null)}
        className={SELECT_CLASS}
      >
        <option value="">Todas las cuentas</option>
        {accounts.map((a) => (
          <option key={a.id} value={a.id}>{a.alias ?? a.account_identifier}</option>
        ))}
      </select>
    </div>
  )
}

export default FilterBar

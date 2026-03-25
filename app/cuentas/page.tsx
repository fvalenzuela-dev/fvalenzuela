'use client'

import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import GastosList from '@/app/cuentas/components/GastosList'
import EmpresasList from '@/app/cuentas/components/EmpresasList'
import CuentasList from '@/app/cuentas/components/CuentasList'
import PeriodSelector from '@/app/cuentas/components/PeriodSelector'
import FilterBar from '@/app/cuentas/components/FilterBar'
import PendientesSection from '@/app/cuentas/components/PendientesSection'
import { useGastos } from '@/app/cuentas/hooks/useGastos'
import { useCompanies } from '@/app/cuentas/hooks/useCompanies'
import { useCuentas } from '@/app/cuentas/hooks/useCuentas'
import { usePeriodos } from '@/app/cuentas/hooks/usePeriodos'
import { useCategorias } from '@/app/cuentas/hooks/useCategorias'
import type { ExpenseFormValues } from '@/app/cuentas/lib/schemas'

type Tab = 'gastos' | 'cuentas' | 'empresas'

interface TabConfig {
  id: Tab
  label: string
  icon: string
}

const TABS: TabConfig[] = [
  { id: 'gastos', label: 'Gastos', icon: 'solar:wallet-bold-duotone' },
  { id: 'cuentas', label: 'Cuentas', icon: 'solar:card-bold-duotone' },
  { id: 'empresas', label: 'Empresas', icon: 'solar:buildings-bold-duotone' },
]

export default function CuentasPage(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<Tab>('gastos')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'paid'>('all')
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null)
  const [accountFilter, setAccountFilter] = useState<number | null>(null)
  const [pendientePayError, setPendientePayError] = useState<string | null>(null)

  const { periodos, loading: loadingPeriodos, error: errorPeriodos, activePeriodId, setActivePeriodId } = usePeriodos()
  const { categorias, error: errorCategorias } = useCategorias()
  const { companies, loading: loadingEmpresas, error: errorEmpresas, create: createEmpresa, update: updateEmpresa, remove: removeEmpresa } = useCompanies()
  const { cuentas, loading: loadingCuentas, error: errorCuentas, create: createCuenta, update: updateCuenta, remove: removeCuenta } = useCuentas()

  const gastoFilters = {
    ...(activePeriodId ? { period_id: activePeriodId } : {}),
    ...(categoryFilter ? { category_id: categoryFilter } : {}),
    ...(accountFilter ? { account_id: accountFilter } : {}),
    ...(statusFilter !== 'all' ? { payment_status: statusFilter as 'pending' | 'paid' } : {}),
  }

  const { gastos, pendientes, loading: loadingGastos, error: errorGastos, refreshPendientes, create: createGasto, update: updateGasto, remove: removeGasto, pay: payGasto } = useGastos(gastoFilters)

  const globalError = errorPeriodos ?? errorCategorias ?? errorEmpresas ?? errorCuentas ?? errorGastos ?? pendientePayError

  useEffect(() => {
    void refreshPendientes(7)
  }, [refreshPendientes])

  const handleCreateGasto = async (data: ExpenseFormValues): Promise<void> => {
    try {
      await createGasto({
        description: data.description,
        category_id: data.category_id,
        period_id: data.period_id,
        current_amount: data.current_amount,
        ...(data.account_id ? { account_id: data.account_id } : {}),
        ...(data.due_date ? { due_date: data.due_date } : {}),
        is_recurring: data.is_recurring,
        ...(data.installment_current ? { installment_current: data.installment_current } : {}),
        ...(data.installment_total ? { installment_total: data.installment_total } : {}),
      })
      void refreshPendientes(7)
    } catch (e: unknown) {
      throw new Error(e instanceof Error ? e.message : 'Error al crear gasto')
    }
  }

  const handleUpdateGasto = async (id: number, data: ExpenseFormValues): Promise<void> => {
    try {
      await updateGasto(id, {
        description: data.description,
        category_id: data.category_id,
        period_id: data.period_id,
        current_amount: data.current_amount,
        account_id: data.account_id ?? undefined,
        due_date: data.due_date ?? undefined,
        is_recurring: data.is_recurring,
        installment_current: data.installment_current ?? undefined,
        installment_total: data.installment_total ?? undefined,
      })
      void refreshPendientes(7)
    } catch (e: unknown) {
      throw new Error(e instanceof Error ? e.message : 'Error al actualizar gasto')
    }
  }

  const handlePayPendiente = async (g: { id: number; current_amount: number }): Promise<void> => {
    setPendientePayError(null)
    try {
      await handlePay(g.id, g.current_amount)
    } catch (e: unknown) {
      setPendientePayError(e instanceof Error ? e.message : 'Error al registrar pago')
    }
  }

  const handlePay = async (id: number, amountPaid: number): Promise<void> => {
    try {
      await payGasto(id, { amount_paid: amountPaid })
      void refreshPendientes(7)
    } catch (e: unknown) {
      throw new Error(e instanceof Error ? e.message : 'Error al registrar pago')
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Error global */}
      {globalError && (
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg text-sm text-red-700 dark:text-red-400">
          <Icon icon="solar:danger-circle-bold" width={18} />
          {globalError}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Mis Cuentas</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Gestiona tus gastos y pagos de servicios
          </p>
        </div>
        <PeriodSelector
          periodos={periodos}
          activePeriodId={activePeriodId}
          onChange={setActivePeriodId}
          loading={loadingPeriodos}
        />
      </div>

      {/* Sección pendientes destacada */}
      {activeTab === 'gastos' && pendientes.length > 0 && (
        <div className="bg-white dark:bg-dark border border-border dark:border-darkborder rounded-xl p-4">
          <h2 className="flex items-center gap-2 text-sm font-bold text-dark dark:text-white mb-3">
            <Icon icon="solar:bell-bing-bold-duotone" className="text-primary" width={18} />
            Próximos pagos
          </h2>
          <PendientesSection
            pendientes={pendientes}
            onPagar={(g) => void handlePayPendiente(g)}
          />
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border dark:border-darkborder">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors relative ${
              activeTab === tab.id
                ? 'text-primary'
                : 'text-gray-500 dark:text-gray-400 hover:text-dark dark:hover:text-white'
            }`}
          >
            <Icon icon={tab.icon} width={16} />
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Contenido por tab */}
      {activeTab === 'gastos' && (
        <div className="space-y-4">
          <FilterBar
            categories={categorias}
            accounts={cuentas}
            selectedCategoryId={categoryFilter}
            selectedAccountId={accountFilter}
            selectedStatus={statusFilter}
            onCategoryChange={setCategoryFilter}
            onAccountChange={setAccountFilter}
            onStatusChange={setStatusFilter}
          />
          <GastosList
            gastos={gastos}
            loading={loadingGastos}
            categories={categorias}
            periods={periodos}
            accounts={cuentas}
            activePeriodId={activePeriodId}
            onCreate={handleCreateGasto}
            onUpdate={handleUpdateGasto}
            onDelete={removeGasto}
            onPay={handlePay}
          />
        </div>
      )}

      {activeTab === 'cuentas' && (
        <CuentasList
          cuentas={cuentas}
          companies={companies}
          loading={loadingCuentas}
          onCreate={createCuenta}
          onUpdate={updateCuenta}
          onDelete={removeCuenta}
        />
      )}

      {activeTab === 'empresas' && (
        <EmpresasList
          companies={companies}
          loading={loadingEmpresas}
          onCreate={createEmpresa}
          onUpdate={updateEmpresa}
          onDelete={removeEmpresa}
        />
      )}
    </div>
  )
}

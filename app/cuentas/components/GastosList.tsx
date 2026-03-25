'use client'

import React, { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Icon } from '@iconify/react'
import GastoCard from '@/app/cuentas/components/GastoCard'
import GastoForm from '@/app/cuentas/components/GastoForm'
import PagarModal from '@/app/cuentas/components/PagarModal'
import type { Expense, Category, Period, ServiceAccount } from '@/app/cuentas/types'
import type { ExpenseFormValues } from '@/app/cuentas/lib/schemas'

interface Props {
  gastos: Expense[]
  loading: boolean
  categories: Category[]
  periods: Period[]
  accounts: ServiceAccount[]
  activePeriodId: number | null
  onCreate: (data: ExpenseFormValues) => Promise<void>
  onUpdate: (id: number, data: ExpenseFormValues) => Promise<void>
  onDelete: (id: number) => Promise<void>
  onPay: (id: number, amountPaid: number) => Promise<void>
}

function GastosList({
  gastos,
  loading,
  categories,
  periods,
  accounts,
  activePeriodId,
  onCreate,
  onUpdate,
  onDelete,
  onPay,
}: Readonly<Props>): React.JSX.Element {
  const [showForm, setShowForm] = useState(false)
  const [editingGasto, setEditingGasto] = useState<Expense | null>(null)
  const [pagandoGasto, setPagandoGasto] = useState<Expense | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const pendientes = gastos.filter((g) => g.payment_status === 'pending')
  const pagados = gastos.filter((g) => g.payment_status === 'paid')

  const handleSubmitForm = async (data: ExpenseFormValues): Promise<void> => {
    try {
      if (editingGasto) {
        await onUpdate(editingGasto.id, data)
      } else {
        await onCreate(data)
      }
      setShowForm(false)
      setEditingGasto(null)
    } catch (e: unknown) {
      throw new Error(e instanceof Error ? e.message : 'Error al guardar gasto')
    }
  }

  const handleEditar = (gasto: Expense): void => {
    setEditingGasto(gasto)
    setShowForm(true)
  }

  const handleEliminar = async (id: number): Promise<void> => {
    setDeleteError(null)
    try {
      await onDelete(id)
      setDeleteConfirmId(null)
    } catch (e: unknown) {
      setDeleteError(e instanceof Error ? e.message : 'Error al eliminar gasto')
    }
  }

  const handleCloseForm = (): void => {
    setShowForm(false)
    setEditingGasto(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-dark dark:text-white">Gastos</h2>
        <button
          onClick={() => { setEditingGasto(null); setShowForm(true) }}
          className="flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          <Icon icon="solar:add-circle-bold" width={16} />
          Agregar gasto
        </button>
      </div>

      {/* Modal formulario */}
      <Dialog open={showForm} onClose={handleCloseForm} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white dark:bg-dark border border-border dark:border-darkborder rounded-xl p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <DialogTitle className="text-lg font-bold text-dark dark:text-white">
                {editingGasto ? 'Editar gasto' : 'Nuevo gasto'}
              </DialogTitle>
              <button onClick={handleCloseForm} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" aria-label="Cerrar modal">
                <Icon icon="solar:close-circle-bold" width={24} />
              </button>
            </div>
            <GastoForm
              expense={editingGasto}
              categories={categories}
              periods={periods}
              accounts={accounts}
              defaultPeriodId={activePeriodId}
              onSubmit={handleSubmitForm}
              onCancel={handleCloseForm}
            />
          </DialogPanel>
        </div>
      </Dialog>

      {/* Modal pagar */}
      <PagarModal
        gasto={pagandoGasto}
        onClose={() => setPagandoGasto(null)}
        onConfirm={onPay}
      />

      {/* Confirm delete */}
      <Dialog open={deleteConfirmId !== null} onClose={() => { setDeleteConfirmId(null); setDeleteError(null) }} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white dark:bg-dark border border-border dark:border-darkborder rounded-xl p-6 w-full max-w-sm shadow-xl">
            <DialogTitle className="text-lg font-bold text-dark dark:text-white mb-2">¿Eliminar gasto?</DialogTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Esta acción no se puede deshacer.</p>
            {deleteError && <p className="text-red-500 text-sm mb-3">{deleteError}</p>}
            <div className="flex gap-3 justify-end">
              <button onClick={() => { setDeleteConfirmId(null); setDeleteError(null) }} className="px-4 py-2 text-sm border border-border dark:border-darkborder rounded-md text-dark dark:text-white hover:bg-gray-50 dark:hover:bg-white/5">
                Cancelar
              </button>
              <button
                onClick={() => { if (deleteConfirmId !== null) void handleEliminar(deleteConfirmId) }}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-gray-100 dark:bg-white/5 animate-pulse rounded-xl" />
          ))}
        </div>
      ) : gastos.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          No hay gastos para este período.
        </p>
      ) : (
        <div className="space-y-4">
          {pendientes.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Pendientes ({pendientes.length})
              </h3>
              {pendientes.map((g) => (
                <GastoCard
                  key={g.id}
                  gasto={g}
                  onPagar={setPagandoGasto}
                  onEditar={handleEditar}
                  onEliminar={setDeleteConfirmId}
                />
              ))}
            </div>
          )}

          {pagados.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Pagados ({pagados.length})
              </h3>
              {pagados.map((g) => (
                <GastoCard
                  key={g.id}
                  gasto={g}
                  onPagar={setPagandoGasto}
                  onEditar={handleEditar}
                  onEliminar={setDeleteConfirmId}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default GastosList

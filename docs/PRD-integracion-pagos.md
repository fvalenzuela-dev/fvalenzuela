# PRD: Integración de Gestión de Pagos de Cuentas

## 1. Overview del Proyecto

### Descripción
Nueva sección en el sitio web para administrar pagos de cuentas de servicios (luz, agua, internet, etc.) integrada con API REST propia (`http://localhost:8080`).

### Usuario Objetivo
Usuario autenticado del sitio (vía Clerk) que necesita registrar y gestionar sus pagos de servicios mensuales.

###Scope (Fase 1)
- [x] CRUD de Empresas (Companies)
- [x] CRUD de Cuentas de Servicio (Service Accounts)
- [x] CRUD de Gastos (Expenses) con soporte de cuotas
- [x] Registrar pagos (marcar como pagado, monto editable)
- [x] Lista de gastos pendientes
- [ ] Dashboard con resumen financiero (pendiente para fase 2)

---

## 2. Endpoints de la API

### Autenticación
- Todos los endpoints requieren `Authorization: Bearer <token_jwt>`
- El token se obtiene de Clerk
- **Requisito**: Refrescar token antes de caducar antes de cada request a la API

### Entidades

| Recurso | Endpoints | Descripción |
|---------|-----------|-------------|
| **Companies** | GET, POST `/api/companies` | Proveedores de servicios |
| | GET, PUT, DELETE `/api/companies/{id}` | |
| **Service Accounts** | GET, POST `/api/service-accounts` | Cuentas de servicio (ej: "Luz - Casa") |
| | GET, PUT, DELETE `/api/service-accounts/{id}` | |
| **Expenses** | GET `/api/expenses` | Listar gastos con filtros |
| | POST `/api/expenses` | Crear gasto |
| | GET `/api/expenses/pending` | Gastos pendientes |
| | GET, PUT, DELETE `/api/expenses/{id}` | |
| | PATCH `/api/expenses/{id}/pay` | Marcar como pagado |
| **Periods** | GET, POST `/api/periods` | Mes/Año para organizar finanzas |
| **Categories** | GET, POST `/api/categories` | Categorías de gastos |

---

## 3. Requisitos Funcionales

### 3.1 Gestión de Empresas (Companies)

| Req | Descripción |
|-----|-------------|
| F-01 | Listar todas las empresas del usuario autenticado |
| F-02 | Crear nueva empresa (name, website_url opcional) |
| F-03 | Ver detalle de una empresa |
| F-04 | Editar empresa |
| F-05 | Eliminar empresa |

**UI**: Tabla con columnas: Nombre, Web, Acciones (editar/eliminar). Botón "Agregar Empresa" arriba.

### 3.2 Gestión de Cuentas de Servicio

| Req | Descripción |
|-----|-------------|
| F-06 | Listar cuentas de servicio con filtro opcional por empresa |
| F-07 | Crear cuenta de servicio (company_id, account_identifier, alias opcional) |
| F-08 | Ver detalle de cuenta |
| F-09 | Editar cuenta |
| F-10 | Eliminar cuenta |

**UI**: Cards o tabla. Cada cuenta muestra: Empresa asociada, Identificador (número de cuenta), Alias.

### 3.3 Gestión de Gastos (Expenses)

| Req | Descripción |
|-----|-------------|
| F-11 | Listar gastos con filtros: period_id, category_id, account_id, payment_status |
| F-12 | Crear gasto (required: description, category_id, period_id, current_amount) |
| F-13 | Opcionales: account_id, due_date, is_recurring, installment (current/total) |
| F-14 | Ver detalle de gasto |
| F-15 | Editar gasto |
| F-16 | Eliminar gasto |

**UI**: Lista filtrable por período. Columnas: Descripción, Categoría, Monto, Fecha Vencimiento, Estado (pendiente/pagado), Cuotas.

### 3.4 Gestión de Pagos

| Req | Descripción |
|-----|-------------|
| F-17 | Marcar gasto como pagado (PATCH /api/expenses/{id}/pay) |
| F-18 | Permitir modificar monto pagado (distinto al monto actual) |
| F-19 | Ver historial de pagos realizados |

**UI**: Modal o inline edit para pagar. Mostrar monto pagado vs monto pendiente.

### 3.5 Gastos Pendientes

| Req | Descripción |
|-----|-------------|
| F-20 | Ver gastos próximos a vencer (próximos 7 días por defecto) |
| F-21 | Ver gastos vencidos (overdue) |
| F-22 | Parámetro days_ahead configurable |

**UI**: Sección destacada "Próximos pagos" con alertas visuales para vencidos.

### 3.6 Periodos y Categorías

| Req | Descripción |
|-----|-------------|
| F-23 | CRUD de períodos (month_number, year_number) |
| F-24 | CRUD de categorías de gastos |
| F-25 | Selector de período activo para filtrar vistas |

---

## 4. Requisitos No Funcionales

### 4.1 UX/UI
- Seguimiento de la estructura visual del proyecto:
  - Colores: `bg-white dark:bg-dark`, `text-dark dark:text-white`, `border border-border dark:border-darkborder`
  - Botones: estilo del proyecto (`bg-primary`, `text-white`)
  - Iconos: usar Iconify (@iconify/react)
- Dark mode siempre soportado
- Responsive (mobile first)
- Skeleton loaders mientras cargan datos

### 4.2 Performance
- Carga inicial < 2s
- Lazy loading para listas grandes
- Optimistic UI para acciones (actualizar UI antes de confirmar API)

### 4.3 Seguridad
- Todos los requests autenticados (token Clerk válido)
- Manejo de errores: mostrar mensajes claros al usuario
- Validación de datos antes de enviar a API

### 4.4 Mantenibilidad
- Componentes reutilizables
- Hooks para lógica de negocio (useCompanies, useExpenses, etc.)
- Tipos TypeScript explícitos

---

## 5. Arquitectura de Componentes

```
app/
├── gastos/                          # Nueva ruta
│   ├── page.tsx                     # Page principal (use client)
│   ├── layout.tsx                   # Layout específico (opcional)
│   ├── components/
│   │   ├── GastosList.tsx          # Lista principal de gastos
│   │   ├── GastoCard.tsx           # Card de gasto individual
│   │   ├── GastoForm.tsx           # Form crear/editar gasto
│   │   ├── PagarModal.tsx          # Modal para pagar
│   │   ├── EmpresasList.tsx        # CRUD Empresas
│   │   ├── CuentasList.tsx         # CRUD Cuentas de servicio
│   │   ├── PendientesSection.tsx   # Gastos pendientes/próximos
│   │   ├── PeriodSelector.tsx      # Selector de período
│   │   └── FilterBar.tsx           # Filtros de lista
│   ├── hooks/
│   │   ├── useApi.ts               # Hook base con refresh token
│   │   ├── useCompanies.ts         # Hook empresas
│   │   ├── useCuentas.ts           # Hook cuentas servicio
│   │   ├── useGastos.ts            # Hook gastos
│   │   └── usePeriodos.ts          # Hook períodos
│   ├── types/
│   │   └── index.ts                # Tipos TypeScript
│   └── lib/
│       └── api.ts                  # Funciones API wrapper
```

---

## 6. Flujos de Usuario

### 6.1 Crear Gasto
1. Usuario hace clic en "Agregar Gasto"
2. Se abre formulario modal/inline
3. Usuario ingresa: descripción, categoría (dropdown), monto actual, período (dropdown)
4. Opcional: cuenta de servicio, fecha vencimiento, es recurrente, cuotas
5. Click en "Guardar" → POST a API → actualizar lista

### 6.2 Pagar Gasto
1. Usuario ve gasto pendiente
2. Click en botón "Pagar"
3. Modal muestra: monto actual, campo editable "Monto Pagado"
4. Usuario ajusta (ej: incluye intereses) y confirma
5. PATCH a API → actualizar estado a "pagado"

### 6.3Gestión de Cuentas
1. Sección separada "Cuentas de Servicio"
2. Agregar empresa primero (sino existe)
3. Crear cuenta vinculada a empresa
4. Al crear gasto, asignar cuenta

---

## 7. Diseño de Interfaces (Wireframes texto)

### 7.1 Página Principal: Gastos

```
┌─────────────────────────────────────────────────────────────┐
│ [Selector Período: Marzo 2026 ▼]  [+ Agregar Gasto]         │
├─────────────────────────────────────────────────────────────┤
│ [Filtros: Todos ▼] [Estado: Todos ▼] [Cuenta: Todas ▼]      │
├─────────────────────────────────────────────────────────────┤
│ ⚠️ PENDIENTE (3)                                            │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 🔌 Electricidad - Casa     $45.000    🔴 Vence 25/03    │ │
│ │ 📅 Cuota 2/3               💳 Pagar                     │ │
│ └─────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 📶 Internet - Casa         $30.000    🟡 Vence 28/03   │ │
│ │ 📅 Mensual                 💳 Pagar                     │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ ✅ PAGADOS (5)                                              │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 💧 Agua - Casa             $25.000    ✅ 10/03          │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 Navegación
Agregar al menú (Navigation.tsx):
- **"Mis Cuentas"** → `/gastos` (o `/cuentas`)
- Opcional:分开 secciones - "Gastos", "Cuentas", "Empresas"

---

## 8. Consideraciones Técnicas

### 8.1 Refresh Token Clerk
```typescript
// Pseudo-código para implementar
const getValidToken = async (): Promise<string> => {
  const token = await getToken();
  if (isExpiringSoon(token)) {
    // Forzar refresh antes de expirado
    return await getToken({ refresh: true });
  }
  return token;
};
```

### 8.2 Manejo de Períodos
- Por defecto, filtrar por período actual (mes/año en curso)
- Permitir cambiar período para ver histórico
- Crear período automáticamente si no existe

### 8.3 Estados de Pago
- `pending`: `amount_paid === null || amount_paid === 0`
- `paid`: `amount_paid > 0`

---

## 9. Exclusiones (Fase 1)

- Dashboard con gráficos y resumen financiero
- Sincronización automática de saldos
- Notificaciones push/email
- Exportación a PDF/Excel
- Integración con pasarela de pago real

---

## 10. Milestones

| # | Milestone | Entregable |
|---|-----------|------------|
| 1 | Setup | Hooks base + tipos + estructura de carpetas |
| 2 | Empresas + Cuentas | CRUD completo de empresas y cuentas |
| 3 | Gastos | CRUD gastos + filtros + lista |
| 4 | Pagos | Marcar como pagado + monto editable |
| 5 | Pendientes | Vista de próximos y vencidos |
| 6 | Testing | Tests unitarios + e2e básico |

---

## 11. Dependencias a Instalar

```bash
# Verificar si ya existen
npm list @iconify/react

# Posibles necesidades adicionales:
# - @headlessui/react (ya usado en proyecto)
# - react-hook-form (para forms)
# - zod (validación)
```

---

## 12. Preguntas Abiertas (para siguientes iteraciones)

1. ¿Cómo manejas la creación de períodos? ¿手动 o automático al crear gasto?
2. ¿Necesitas categorías predefinidas o el usuario crea las suyas?
3. ¿Qué información adicional quieres en las notificaciones de vencido?
4. ¿Para fase 2, qué gráficos/resumen necesitas en el dashboard?

---

*Documento generado para revisión. Actualizar según feedback.*
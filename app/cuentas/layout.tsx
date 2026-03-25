import React from 'react'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function CuentasLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): Promise<React.JSX.Element> {
  try {
    const { userId } = await auth()
    if (!userId) redirect('/sign-in')
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') throw error
    redirect('/sign-in')
  }

  return <>{children}</>
}

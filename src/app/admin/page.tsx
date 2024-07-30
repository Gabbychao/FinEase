import { UsersTable } from '@/components/admin/table'
import React from 'react'

export default function AdminHome() {
  return (
    <>
    <h1 className="text-lg font-semibold md:text-2xl">Admin Dashboard</h1>
    <main>
      <UsersTable/>
    </main>
    </>
  )
}

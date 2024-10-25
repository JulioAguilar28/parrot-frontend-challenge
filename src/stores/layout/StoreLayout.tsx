import { Outlet } from 'react-router-dom'

export const StoreLayout = () => {
  return (
    <main className="min-h-dvh flex flex-col">
      <header className="bg-primary shadow-md shadow-slate-300 text-white h-16 flex items-center px-4">
        <h2 className="text-2xl">My Stores</h2>
      </header>

      <Outlet />
    </main>
  )
}

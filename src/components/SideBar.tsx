"use client"
import { Home, Users } from "lucide-react"
import Link from "next/link"

export const SideBar = () => {
  return (
     <aside className="w-64 bg-white shadow-md h-screen">
        <div className="pt-10 px-5">
          <h1 className="text-2xl font-bold text-gray-800 text-center">Talen Campus</h1>
          <nav className="mt-4">
            <Link
              href="/dashboard"
              className="w-full flex items-center py-3 px-2"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
            <Link
              href="#"
              className="w-full flex items-center py-3 px-2"
            >
              <Users className="mr-2 h-4 w-4" />
              Activar Cuentas
            </Link>
          </nav>
        </div>
      </aside>
  )
}

import { Input } from "./ui/input"

export const HeaderNav = () => {
  return (
    <header className="bg-white border-b fixed w-full top-0 left-0 right-0 z-50 ">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          {/* <Linkedin className="text-[#0a66c2] w-8 h-8" /> */}
          <Input className="max-w-xs" placeholder="Search" type="search" />
          <nav className="flex space-x-6 text-sm text-gray-600">
            <a href="#">Inicio</a>
            <a href="#">Mi perfil</a>
            <a href="#">Publicar proyectos</a>
            <a href="#">Salir</a>
          </nav>
        </div>
      </header>
  )
}

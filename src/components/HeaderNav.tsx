import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export const HeaderNav = () => {
  return (
    <header className="bg-white border-b fixed w-full top-0 left-0 right-0 ">
        <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
          {/* <Linkedin className="text-[#0a66c2] w-8 h-8" /> */}
          <div className="flex items-center gap-2">
            <Input className="max-w-xs" placeholder="@oliver-gr" type="text" />
            <Button  size='icon' className="p-2">
              <Search className="text-white" />
            </Button>  
          </div>
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

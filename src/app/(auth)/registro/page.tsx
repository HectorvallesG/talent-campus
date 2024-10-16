"use client"

import { Select, SelectContent,  SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Role } from "@/model/Role";
import { useEffect, useState } from "react";

type CreateAccountRole = Role.Recruiter | Role.Student
const rolesAccount = {
  [Role.Student]: 'Estudiante',
  [Role.Recruiter]: 'Reclutador'
}

export default function ReggiterAccount () {

  const [role, setRole] = useState<CreateAccountRole>(Role.Student)

  const handleRoleChange = (role: CreateAccountRole) => setRole(role)
  
  useEffect(() => {
    console.log(role)
  }, [role])
  
  return (
    <main className="min-h-screen flex flex-col justify-center p-8">
      <h1 className="text-2xl font-semibold">
        Crea una cuenta en Talent Campus
      </h1>

      <h2>
        Seleciona el tipo de cuenta que deseas crear
      </h2>
      
      <Select onValueChange={handleRoleChange}>
        <SelectTrigger  className="mt-4">
          <SelectValue placeholder="Selecciona el tipo de cuenta" />
        </SelectTrigger>
        <SelectContent>
            {
              Object.entries(rolesAccount).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              ))
            }
        </SelectContent>
      </Select>
    </main>
  )
}

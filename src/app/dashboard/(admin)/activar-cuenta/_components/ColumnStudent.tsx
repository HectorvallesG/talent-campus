import { ColumnDef } from "@tanstack/react-table";
import { SwitchActivUser } from "./SwitchActivUser";


export interface StudentDataColumn {
  name: string;
  lastName: string;
  faculty: string;
  specialty: string;
  idUser: string;
  isActivated: boolean;
  email: string;
}

export const ColumnStudent: ColumnDef<StudentDataColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre del alumno',
    cell: ({ row }) => {
      return (
        <span>{row.original.name} {row.original.lastName}</span>
      );
    }
  },
  {
    accessorKey:'faculty',
    header: 'Facultad',
  },
  {
    accessorKey: 'email',
    header: 'Correo',
  },
  {
    accessorKey: 'specialty',
    header: 'Especialidad del estudiante',
  },
  {
    accessorKey: 'Acciones',
    header: 'Activacion de cuenta',
    cell: ({ row }) => {
      return (
        <SwitchActivUser
          idUser={row.original.idUser}
          isActivated={row.original.isActivated}
        />
      );
    }
    
  }
];
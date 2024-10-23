import { ColumnDef } from "@tanstack/react-table";
import { SwitchActivUser } from "./SwitchActivUser";


export interface RecruiterDataColumn {
  name: string;
  company: string;
  isActivated: boolean;
  email: string;
  userName : string;
  idUser: string;

}

export const ColumnRecruiter: ColumnDef<RecruiterDataColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre del Reclutador',
  },
  {
    accessorKey:'company',
    header: 'Institucion/Compañia',
  },
  {
    accessorKey: 'email',
    header: 'Correo',
  },
  {
    accessorKey: 'userName',
    header: 'Nombre de Usuario',
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
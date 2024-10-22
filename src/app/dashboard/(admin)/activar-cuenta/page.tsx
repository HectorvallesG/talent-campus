"use client";

import PageContainer from "@/components/layouts/PageContainer";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { ColumnRecruiter, RecruiterDataColumn } from "./_components/ColumnRecruiter";
import { RecruiterResponse } from "@/model/Recruiter";
import { DataTable } from "@/components/DataTable";
import { useToast } from "@/hooks/use-toast";

export default function ActiveAccount() {

  const [recruiters, setRecruiters] = useState<RecruiterDataColumn[]>([]);
  
  useEffect(() => {
    fetch('/api/recruiter')
    .then(res => res.json())
    .then((data) => {
      const recruitersData = data.data as RecruiterResponse[];

      const recruiters = recruitersData.map(recruiter => {
        return {
          name: recruiter.name,
          company: recruiter.company,
          email: recruiter.user.email,
          userName: recruiter.user.userName,
          isActivated: recruiter.user.isActivated === 'true',
          idUser: recruiter.user.id
        }
      })

      setRecruiters(recruiters);
    })

  }, []);

  return(
    <PageContainer scrollable>
      <h1 className="text-2xl font-medium">Activar cuenta</h1>
      <span className="text-sm text-gray-500">
        Activa las cuentas de los perfiles que se han registrado en la plataforma.
      </span>
        <section className="my-2">
          <h2 className="text-xl font-semibold">
            Cuentas de reclutadores
          </h2>
        </section>
       <DataTable  columns={ColumnRecruiter} data={recruiters} />    
    </PageContainer>
  )
}


interface SwitchActivUserProps {
  idUser: string;
  isActivated: boolean;
}
export const SwitchActivUser = ({
  idUser,
  isActivated = false
}:SwitchActivUserProps) => {

  
  const [activ, setActiv] = useState(isActivated);
  const { toast } = useToast()

  const setActivAccount = async () => {
    fetch(`/api/admin/active-account?idUser=${idUser}`, {
      method: 'PATCH',
      body: JSON.stringify({isActivated: activ}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if(!res.ok) throw new Error('Error al actualizar el estado de la cuenta');
      return res.json()
    })
    .then(() => {
     setActiv(!activ);
    })
    .catch((error) => {
      if(error instanceof Error) {
        toast({
          title: 'Error',
          description: error.message,
        })
      }
    })

  }

  return(
    <Switch
      checked={activ}
      onCheckedChange={() => setActivAccount()}
    />
  )
}
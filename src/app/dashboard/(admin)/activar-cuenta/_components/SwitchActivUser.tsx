"use client"

import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

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
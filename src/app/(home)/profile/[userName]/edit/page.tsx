"use client" 

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ProfileSchema, ProfileSchemaModel } from "@/modules/account/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EditProfile() {
  const params = useParams(); 

  const [loading, setLoading] = useState(false);
  const { toast } = useToast()

  const form = useForm<ProfileSchemaModel>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      email: '',
      userName: '',
      bio: '',
      city: '',
      faculty: '',
      career: ''
    }
  });

  const onSubmit = async (data: ProfileSchemaModel) => {
    try {
      setLoading(true)
      const req = await fetch(`/api/student/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!req.ok) {
        throw new Error('Error al actualizar el perfil')
      }


    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Error',
          description: error.message,
        })
      }
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetch(`/api/student/profile?userName=${params.userName}`)
      .then(res => res.json())
      .then(({data}) => {
        console.log(data)

        form.reset({
          email: data.user.email || '',
          userName: data.user.userName || '',
          bio: data.profile ? data.profile.bio || '' : '',
          city: data.profile ? data.profile.city || '' : '',
          faculty: data.faculty || '',
          career: data.profile ? data.profile.career || '' : '',
        });
      })

  }, [params, form])

  return(
     <main className="max-w-3xl mx-auto space-y-6">
      <header className="border-b-2 pb-4">
        <h1 className="font-semibold text-xl">
          Mi perfil - {params.userName}
        </h1>
        <span className="text-sm text-gray-500">Agrega informacion extra a tu perfil</span>
      </header>


      <section>
        <h2 className="text-xl font-bold">
          Informacion personal
        </h2>

        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            >
          <div className="flex  gap-2">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Nombre de usuario</FormLabel>
                    <FormControl>
                      <Input placeholder="jhon12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Correo</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="example@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>
            <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Ciudad de origen</FormLabel>
                    <FormControl>
                      <Input placeholder="México" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          <div className="flex gap-2">
              <FormField
                  control={form.control}
                  name="career"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Carrera</FormLabel>
                      <FormControl>
                        <Input placeholder="Lic. Administracion" {...field} />
                      </FormControl>
                      <FormDescription>Ingresa tu carrera profesional</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                  control={form.control}
                  name="faculty"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <FormLabel>Facultad de la universidad</FormLabel>
                      <FormControl>
                        <Input placeholder="Lic. Administracion" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
          </div>
            <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Biografía</FormLabel>
                    <FormControl>
                      <Textarea className=" resize-none h-[200px]" placeholder="..." {...field} />
                    </FormControl>
                    <FormDescription>Cuentanos un poco sobre ti</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <Button disabled={loading} className="w-full bg-black hover:bg-gray-800 text-white mt-4">
              {loading ? 'Actualizando...' : 'Actualizar perfil'}
            </Button>
          </form>
        </Form>
      </section>
     </main>
  )
}
"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { StudentSchema, StudentSchemaModel } from "@/modules/account/account.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"


export const StudentForm = () => {
  const form = useForm<StudentSchemaModel>({
    resolver: zodResolver(StudentSchema),
    defaultValues:{
      email: '',
      password: '',
      name: '',
      lastName: '',
      userName: '',
      faculty: '',
      specialty: ''
    }
  })


  const { toast } =  useToast()
  const [loading, setLoading] = useState(false)
  const router =  useRouter()
  


  const onSubmit = async (data:StudentSchemaModel) => {
    try {
      setLoading(true)
      const req = await fetch('/api/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if(!req.ok){
        throw new Error('Error al crear la cuenta')
      }


      const loginStatus = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password
      })

      if(loginStatus?.ok){
        router.push('/nuevo-proyecto')
      }else{
        throw new Error('Error al iniciar sesión')
      }




      console.log(data);
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
  };



  return (
     <>
       <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            >
              <legend className="text-xl font-semibold border-b-2 pb-2 my-2 border-gray-200">
                Una cuenta para Estudiante
              </legend>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input placeholder="example@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input placeholder="Apellido" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre de usuario</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre de usuario" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <FormField
                    control={form.control}
                    name="faculty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facultad</FormLabel>
                        <FormControl>
                          <Input placeholder="Facultad" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <FormField
                    control={form.control}
                    name="specialty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Especialidad</FormLabel>
                        <FormControl>
                          <Input placeholder="Especialidad" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
           <Button className="w-full bg-black hover:bg-gray-800 text-white mt-4">
            {
              loading ? 'Creando cuenta...' : 'Crear cuenta'
            }
           </Button>
  
  
          </form>
  
        </Form>

        <footer className="border-t-2 mt-4 pt-4">
          <p>
            ¿Ya tienes una cuenta? <Link className="text-blue-400" href="/iniciar">Inicia sesión</Link>
          </p>
        </footer>
     </>
  )
}

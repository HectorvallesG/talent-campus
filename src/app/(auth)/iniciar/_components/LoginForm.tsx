"use client";

import { loginSchema, LoginSchemaModel } from "@/modules/account/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { Role } from "@/model/Role";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<LoginSchemaModel>({
    resolver: zodResolver(loginSchema),
    defaultValues:{
      email: '',
      password: '',
    }
  })

  const checkRoleAndRedirect = async () => {
    const getSessionRole = await fetch('/api/auth/session')
    const sessionRole = await getSessionRole.json()

    if (getSessionRole.status !== 200) {
      throw new Error('Error al obtener la sesión')
    }

    if (!sessionRole.user.rol) {
      throw new Error('No se pudo comprobar la sesión')
    }

    if (sessionRole.user.rol === Role.Admin || sessionRole === Role.Recruiter) {
      router.push('/dashboard')
    }

    if (sessionRole.user.rol === Role.Student) {
      router.push('/nuevo-proyecto')
    }
  }

  const onSubmit = async (data: LoginSchemaModel) => {
    try {
      setLoading(true)
      const loginStatus = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password
      })


      if(loginStatus?.error){
        throw new Error(loginStatus.error)
      }


      if(loginStatus?.ok){
         checkRoleAndRedirect()
      }
    } catch (error) {

      if(error instanceof Error){
        toast({
          title: 'Error al iniciar sesión',
          description: error.message,
        })
      }
      
    }finally{
      setLoading(false)
    }
  }
  return (
    <>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          >
        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="example@example.com" {...field} />
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
                  <Input type="password" placeholder="example@example.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button disabled={loading} className="w-full bg-black hover:bg-gray-800 text-white mt-4">
            {loading ? 'Iniciando...' : 'Iniciar sesión'}
          </Button>
        </form>
      </Form>
      <footer className="border-t-2 mt-4 pt-4">
          <p>
            ¿Aún no tienes una cuenta?  <Link className="text-blue-400" href="/crear-cuenta">Crear cuenta</Link>
          </p>
      </footer></>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AuthCredentials, authCredentialsSchema } from "@/modules/auth/credentials.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"



export default function Iniciar () {

  const form = useForm<AuthCredentials>({
    resolver: zodResolver(authCredentialsSchema),
    defaultValues:{
      email: '',
      password: ''
    }
  })

  const onSubmit = (data:AuthCredentials) => {
    console.log(data);
  };



  return (
    <main className="min-h-screen flex flex-col justify-center p-8">
          <h1 className="text-2xl font-semibold">
            ¡Inicia sesión y unete!
          </h1>
          <p  className="mt-2 border-b-2 pb-2 mb-2 border-gray-200">
            Miles de oportunidades te esperan, inicia sesión y comienza a disfrutar de todos los beneficios que Talent Campus tiene para ti.
          </p>
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
                      <Input placeholder="*******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full bg-black hover:bg-gray-800 text-white mt-4">Iniciar</Button>
            </form>
          </Form>

          <footer>
            <p className="mt-4 text-sm text-center text-gray-600 flex gap-2">
              ¿No tienes una cuenta?
              <Link href="/registro" className="text-blue-600 hover:underline">
                Registrate
              </Link>
            </p>
          </footer>
    </main>
  )
}

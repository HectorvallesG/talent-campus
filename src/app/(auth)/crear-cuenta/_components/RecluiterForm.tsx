import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RecruiterSchemaModel } from "@/modules/account/account.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { RecruiterSchema } from '../../../../modules/account/account.schema';


export const RecluiterForm = () => {
  
  const form = useForm<RecruiterSchemaModel>({
    resolver: zodResolver(RecruiterSchema),
    defaultValues:{
      email: '',
      password: '',
      name: '',
      company: '',
      tel: '',
      userName: ''
    }
  })


  const onSubmit = (data:RecruiterSchemaModel) => {
    console.log("llego");
    console.log(data);
  };



  return(
     <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          >
            <legend className="text-xl font-semibold border-b-2 pb-2 my-2 border-gray-200">
              Una cuenta para Reclutador
            </legend>
         
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de la organización</FormLabel>
                <FormControl>
                  <Input placeholder="Organización" {...field} />
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
                <FormLabel>Nombre al que debemos dirigirnos</FormLabel>
                <FormControl>
                  <Input placeholder="Jhon" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de contacto</FormLabel>
                <FormControl>
                  <Input placeholder="Tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
             <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
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
              name="userName"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel>Nombre del usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="Jhon872" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
          </div>
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
         <Button className="w-full bg-black hover:bg-gray-800 text-white mt-4">
          Crear cuenta
         </Button>
        </form>
      </Form>
  )
}

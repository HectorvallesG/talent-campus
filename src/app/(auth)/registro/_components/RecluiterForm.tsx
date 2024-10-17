import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { BasicAccountSchema, BasicAccountSchemaModel } from "@/modules/account/account.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


export const RecluiterForm = () => {
  
  const form = useForm<BasicAccountSchemaModel>({
    resolver: zodResolver(BasicAccountSchema),
    defaultValues:{
      email: '',
      password: '',
    }
  })


  const onSubmit = (data:BasicAccountSchemaModel) => {
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
         <Button className="w-full bg-black hover:bg-gray-800 text-white mt-4">
          Crear cuenta
         </Button>
        </form>
      </Form>
  )
}

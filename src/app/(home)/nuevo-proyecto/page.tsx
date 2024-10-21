"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { projectModelData, ProjectSchema } from "@/modules/projects/project.scema";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { ClockIcon } from "lucide-react";

export default function PostProject() {

  const form = useForm<projectModelData>({
    resolver: zodResolver(ProjectSchema),
    defaultValues:{
      title: '',
      description: '',
      url: ''
    }
  })


  const onSubmit = (data:projectModelData) => {
    console.log(data);
  };


  return (
    <main className="flex gap-10 justify-center">

      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="
            flex flex-col gap-3  flex-1 h-min
            max-w-3xl bg-white p-6 rounded-lg shadow-sm
          ">
          <h1 className="text-xl font-semibold">
            Publica tu proyecto
          </h1>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titulo del proyecto</FormLabel>
                <FormControl>
                  <Input placeholder="Titulo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Describe de que trata tu proyecto</FormLabel>
                <FormControl>
                  <Textarea className="resize-none" placeholder="Descripcion" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ingresa la url donde tienes mas información hacera de tu trabajo</FormLabel>
                <FormControl>
                  <Input placeholder="url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <aside className="bg-white shadow-sm rounded-lg p-6 w-80 h-[600px] overflow-hidden">
        <h2 className="font-semibold mb-4 flex gap-2 items-center">
          Proyectos recientes
          <ClockIcon className="w-4 h-4 ml-2" />
        </h2>

        <ScrollArea className="h-full">
            <Link href="#" className="block p-2 border-b border-gray-300 rounded-sm shadow-sm">
              <h3 >Proyecto 1</h3>
            </Link>
            <Link href="#" className="block p-2 border-b border-gray-300 rounded-sm shadow-sm">
              <h3 >Proyecto 1</h3>
            </Link>
            <Link href="#" className="block p-2 border-b border-gray-300 rounded-sm shadow-sm">
              <h3 >Proyecto 1</h3>
            </Link>
            <Link href="#" className="block p-2 border-b border-gray-300 rounded-sm shadow-sm">
              <h3 >Proyecto 1</h3>
            </Link>
            <Link href="#" className="block p-2 border-b border-gray-300 rounded-sm shadow-sm">
              <h3 >Proyecto 1</h3>
            </Link>
            <Link href="#" className="block p-2 border-b border-gray-300 rounded-sm shadow-sm">
              <h3 >Proyecto 1</h3>
            </Link>
            <Link href="#" className="block p-2 border-b border-gray-300 rounded-sm shadow-sm">
              <h3 >Proyecto 1</h3>
            </Link>
            
        </ScrollArea>
      </aside>
    </main>
  )
}

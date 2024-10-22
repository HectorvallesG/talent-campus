"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, Mail, School } from "lucide-react"
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from 'react';


export default function Profile() {
  const params = useParams()

  useEffect(() => {
    fetch(`/api/student/profile?userName=${params.userName}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
  }, [params])
  return (
      <main className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardContent className="p-0">
            <div className="h-32 bg-gradient-to-r from-orange-500 to-orange-400" />
            <div className="px-6 pb-6">
              <header className="flex justify-between items-end -mt-16">
                <Avatar className="w-32 h-32 border-4 border-white">
                  <AvatarImage alt="Phoenix Baker" src="/placeholder.svg?height=128&width=128" />
                  <AvatarFallback>PB</AvatarFallback>
                </Avatar>
                <div className="flex gap-2">
                  <Button variant="outline">
                      Enviar correo
                      <Mail className="w-4 h-4 ml-2" />
                  </Button>
                  <Link href='#' className={buttonVariants({
                    variant: 'default'
                  })}>
                    Editar perfil
                  </Link>
                </div>
              </header>
              <section className="mt-4 space-y-2">
                <h1 className="text-2xl font-bold">Phoenix Baker</h1>
                <p className="text-gray-600">
                  Product Design, Research, Partnerships at Notion 
                </p>
                <div className="flex items-center text-sm text-gray-500 space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>México, Cd. Victoria</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 space-x-2">
                  <School className="w-4 h-4" />
                  <span className="text-sm text-gray-500">
                    Instituto Tecnológico de Ciudad Victoria
                  </span>
                </div>
              </section>
              <div className="mt-6 flex space-x-2">
                <Link href='#' className={buttonVariants({
                  variant: 'default'
                })}>
                  Ver proyectos
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">
              Acerca de mi
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Product leader with 10+ yrs experience building and launching products that hundreds of millions of people love
              worldwide. Ive been part of exceptional teams that have built industry-leading mobile, web, media and VR
              products, leading various functions including product management, UX/UI, marketing and design.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Proyectos destacados</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex">
              <Avatar className="w-12 h-12 mr-4">
                <AvatarImage alt="Notion logo" src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">Chief Product Officer</h3>
                <p className="text-sm text-gray-600">Notion · Full-time</p>
                <p className="text-sm text-gray-600">Jun 2020 - Present · 3 years</p>
              </div>
            </div>
            <div className="flex">
              <Avatar className="w-12 h-12 mr-4">
                <AvatarImage alt="Sketch logo" src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">VP, Product Management</h3>
                <p className="text-sm text-gray-600">Sketch · Full-time</p>
                <p className="text-sm text-gray-600">Feb 2016 - May 2020 · 4 years</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
  )
}

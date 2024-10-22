"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SearchProfileStudentResponse } from "@/model/Student";
import { MapPin, Mail, School } from "lucide-react"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from 'react';


export default function Profile() {
  const params = useParams()

  const [userProfile, setUserProfile] = useState<SearchProfileStudentResponse>()
  const session = useSession()
  useEffect(() => {
    fetch(`/api/student/profile?userName=${params.userName}`)
      .then(res => res.json())
      .then(data => {
        setUserProfile(data.data)
        console.log(data)
      })
  }, [params])


  const isMyProfile = () => {
    if(session.status === 'authenticated'){
      return session.data.user.id === userProfile?.user.id
    }
  }


  return (
      <main className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardContent className="p-0">
            <div className="h-32 from-blue-100 via-blue-50 to-purple-100" />
            <div className="px-6 pb-6">
              <header className="flex justify-between items-end -mt-16">
                <Avatar className="w-32 h-32 border-4 border-white">
                  <AvatarImage alt="Phoenix Baker" src="/placeholder.svg?height=128&width=128" />
                  <AvatarFallback className="font-bold text-2xl">
                    {userProfile?.user.userName[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex gap-2">
                  <Button variant="outline">
                      Enviar correo
                      <Mail className="w-4 h-4 ml-2" />
                  </Button>
                 {isMyProfile() && <Link href={`/profile/${userProfile?.user.userName}/edit`} className={buttonVariants({
                    variant: 'default'
                  })}>
                    Editar perfil
                  </Link>}
                </div>
              </header>
              <section className="mt-4 space-y-2">
                <h1 className="text-2xl font-bold">
                  {userProfile?.name} {userProfile?.lastName}
                </h1>
                <p className="text-gray-600">
                  {userProfile?.specialty}
                </p>
                <div className="flex items-center text-sm text-gray-500 space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{userProfile?.profile?.city}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 space-x-2">
                  <School className="w-4 h-4" />
                  <span className="text-sm text-gray-500">
                    {userProfile?.faculty}
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
        {userProfile?.profile?.bio && <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">
              Acerca de mi
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              {userProfile?.profile?.bio}
            </p>
          </CardContent>
        </Card>}
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

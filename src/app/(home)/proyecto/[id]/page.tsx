"use client"

import { GirdProjects } from "@/components/GirdProjects";
import { JobCard } from "@/components/JobCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectResponse } from "@/model/Projects";
import { StudentResponse } from "@/model/Student";
import { BookMarked, Home, Info, Mail } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function Project() {

  const params = useParams()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [project, setProject] = useState<ProjectResponse>()
  const [fullUrl, setFullUrl] = useState('')
  const [user, setUser] = useState<StudentResponse>()
  
  const [loadingUser, setLoadingUser] = useState(false)

  useEffect(() => {
    setLoading(true)
    const idProject = params.id
    setFullUrl(window.location.href)
    fetch(`/api/student/projects/${idProject}`)
      .then(res => res.json())
      .then(data => {
        setProject(data.data)
      })
      .finally(() => setLoading(false))

  }, [params])


  useEffect(() => {
    setLoadingUser(true)
    fetch(`/api/student/${project?.studentId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data.data)
      })
      .finally(() => setLoadingUser(false))


  }, [project?.studentId])

  // array split sin espacio y con coma ambas formas
  const arrayTags = project?.tags ? project.tags.split(', ') : []

  const sendMail = (mail:string) => {
    window.location.href = `mailto:${mail}`
  }

  if(!project && !loading){
    return(
      <main className="flex justify-center items-center flex-col">
        <h1 className="text-center font-semibold text-3xl">
          Proyecto no encontrado
        </h1>

        <Link href="/" className={buttonVariants({
          variant: "outline",
          className: "mt-4 flex items-center gap-1"
        })}>
          Regresar al inicio
          <Home className="w-4 h-4 ml-2" />
        </Link>
      </main>
    )
  }

  return project && !loading && (
    <>
      <main className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center bg-white py-3 px-6 shadow-md rounded-md">
          <div  className="flex gap-4 items-center">
            <Avatar className="w-16 h-16 border-4 border-white">
              <AvatarFallback>
                {
                  user?.name && user?.name.split(' ').map((name) => name[0])
                }
              </AvatarFallback>
            </Avatar>
  
            {!loadingUser ? <div>
              <h2 className="font-semibold text-2xl">
                {user?.name}
              </h2>
  
              <p className="flex gap-1 items-center font-semibold">
                <BookMarked className="w-4 h-4 mr-2" />
               {user?.specialty}
              </p>
            </div> : <Skeleton className="w-[200px] h-4" />}
          </div>

          <div className="flex gap-2 items-center">
            {!loadingUser ? <Button onClick={() => sendMail(user?.user.email ?? '')}>
              Enviar correo
              <Mail className="w-4 h-4 ml-2" />
            </Button> : <Skeleton className="w-[200px] h-4" />}
  
            <Link href={`/profile/${user?.user.userName}`} className={buttonVariants({
              variant: "outline",
            })}>
              Ver perfil
            </Link>
          </div>
        </header>

        <section className="px-6 py-3 mt-4 rounded-md">
          <h4 className="text-blue-950 font-semibold text-2xl">
            Comparte el perfil de Phoenix Baker
          </h4>

          <div className="flex items-center gap-2 my-4">
            <div className="bg-white py-2 px-4 rounded-lg flex-1">
              {loading ? <Skeleton className="w-[200px] h-4" /> :
                fullUrl
              }
            </div>
            <Button variant="outline" onClick={() => {
              navigator.clipboard.writeText(window.location.href)
            }}>
              Copiar enlace
            </Button>
          </div>

          <p className="text-blue-900">
            Comparte el perfil de Phoenix Baker con otros reclutadores para que puedan conocer más sobre su experiencia y habilidades.
          </p>
        </section>

        
        <section className="mt-10 shadow-md rounded-md">
          <article className="bg-white py-3 px-6">
            <div className="flex gap-4 items-center mb-4">
              <h1 className="font-semibold text-3xl">
                {loading ? <Skeleton className="w-[200px] h-4" /> : project?.title}
              </h1>
              <div className="flex flex-wrap gap-1">
                {arrayTags.map((tag) => (
                  <span key={tag} className="text-xs text-white bg-blue-500 px-2 py-1 rounded-full mr-2">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {!loading ? <div className="flex flex-col">
              <span className="text-gray-500 font-bold">
                Enero 8, 2024 a las 10:00 am
              </span>
              <a target="_blank" href={project?.url} className={buttonVariants({
                variant: "outline",
                className: "cursor-pointer mt-2"
              })}>
                <Info className="w-4 h-4 mr-2" />
                  Más información sobre el proyecto
              </a>
            </div> : <Skeleton className="w-[200px] h-4" />}

            <p className="mt-4">
               {
                 loading ? <div className="flex gap-2 flex-col">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-full h-4" />

                  </div> : project?.description
                }
            </p>
          </article>
        </section>
        <section className="mt-8">
            <h3 className="font-semibold text-2xl mb-4">
              Más proyectos
            </h3>

            <GirdProjects>
              <JobCard
                title="Frontend Developer"
                tags="Developer, design, frontend"
                description="We are looking for a frontend developer to join our team"
                url="/proyecto/1"
                idProject="as"
                createdAt="2 days ago"
                id="s"
              />
              <JobCard
                title="Frontend Developer"
                tags="Developer, design, frontend"
                description="We are looking for a frontend developer to join our team"
                url="/proyecto/1"
                idProject="as"
                createdAt="2 days ago"
                id="s2"
              />
              <JobCard
                title="Frontend Developer"
                tags="Developer, design, frontend"
                description="We are looking for a frontend developer to join our team"
                url="/proyecto/1"
                idProject="as"
                createdAt="2 days ago"
                id="s22"
              />
            
            </GirdProjects>
        </section>
      </main> 
    </>
  )
}

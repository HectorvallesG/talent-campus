"use client"

import { JobCard } from "@/components/JobCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info, Mail } from "lucide-react";

const TAGS = [
  "Next.js",
  "React",
  "TailwindCSS",
  "e-Commerce",
  "Web Development",
];

export default function Project() {

  return (
    <>
      <main className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center bg-white py-3 px-6 shadow-md rounded-md">
          <div  className="flex gap-4 items-center">
            <Avatar className="w-16 h-16 border-4 border-white">
              <AvatarImage alt="Phoenix Baker" src="/placeholder.svg?height=128&width=128" />
              <AvatarFallback>PB</AvatarFallback>
            </Avatar>
  
            <h2 className="font-semibold text-2xl">
              Phoenix Baker
            </h2>
          </div>

          <Button>
            Enviar correo
            <Mail className="w-4 h-4 ml-2" />
          </Button>
        </header>

        <section className="px-6 py-3 mt-4 rounded-md">
          <h4 className="text-blue-950 font-semibold text-2xl">
            Comparte el perfil de Phoenix Baker
          </h4>

          <div className="flex items-center gap-2 my-4">
            <div className="bg-white py-2 px-4 rounded-lg flex-1">
              {
                window.location.href
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
                Desarrolo de e-Commerse con Next.js
              </h1>
              <div className="flex flex-wrap gap-1">
                {TAGS.map((tag) => (
                  <span key={tag} className="text-xs text-white bg-blue-500 px-2 py-1 rounded-full mr-2">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 font-bold">
                Enero 8, 2024 a las 10:00 am
              </span>
              <a className={buttonVariants({
                variant: "outline",
                className: "cursor-pointer mt-2"
              })}>
                <Info className="w-4 h-4 mr-2" />
                  Más información sobre el proyecto
              </a>
            </div>

            <p className="mt-4">
               Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil rem voluptatum porro unde quam cum, nemo excepturi facilis. Porro eaque exercitationem maiores, mollitia blanditiis accusamus necessitatibus laboriosam doloribus quibusdam quos magni temporibus, error quis ipsam. Praesentium harum sed voluptas, explicabo in dolores esse. Nostrum doloremque molestiae harum fugiat laudantium aliquam quae magni reiciendis aut, delectus eos odit eum hic rem. Adipisci delectus facilis autem! Repellendus sint accusantium eligendi delectus at, velit sit tenetur facere, nobis omnis id fugiat asperiores quo ratione autem aspernatur accusamus ab eius et? A dicta distinctio nulla. Cum fuga omnis minima incidunt eligendi, at nemo reiciendis necessitatibus aspernatur explicabo, nisi nostrum eum error aliquid mollitia numquam, vero ut aliquam et expedita? Dolor sint atque id? Quasi aliquid accusamus laudantium ratione delectus unde earum commodi, dolore porro officia, dolores corporis quisquam doloremque. Eum, sequi? Quo cumque, porro non enim ratione quod et laboriosam itaque eveniet! Quas, quidem alias repudiandae eligendi illum.
            </p>
          </article>
        </section>
        <section className="mt-8">
            <h3 className="font-semibold text-2xl mb-4">
              Más proyectos
            </h3>

            <article className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 ">
              <JobCard
                title="Frontend Developer"
                experience="Developer, design, frontend"
                description="We are looking for a frontend developer to join our team"
                timePosted="2 days ago"
              />
              <JobCard
                title="Frontend Developer"
                experience="Developer, design, frontend"
                description="We are looking for a frontend developer to join our team"
                timePosted="2 days ago"
              />
              <JobCard
                title="Frontend Developer"
                experience="Developer, design, frontend"
                description="We are looking for a frontend developer to join our team"
                timePosted="2 days ago"
              />

            </article>
        </section>
      </main> 
    </>
  )
}

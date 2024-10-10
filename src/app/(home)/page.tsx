import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Bookmark, Search } from "lucide-react"

export default function Home() {
  return (
      <main>
        <section className="p-6 bg-gradient-to-br from-blue-100 via-blue-50 to-purple-100 rounded-lg max-w-4xl mx-auto shadow-lg">
          <h1 className="font-semibold text-2xl">
            ¡Hey reclutador, encuentra el siguiente talento para tu equipo!    
          </h1>
          <div className="mt-10 max-w-[90%] flex flex-col gap-2 ">
    
            <p>
              Sabemos que encontrar el talento adecuado puede ser un reto, por eso Talent Campus es la solución perfecta para ti.
            </p>
    
            <p>
              Talent Campus es una plataforma que te permite encontrar a los mejores talentos egresados del campus, con habilidades en diferentes áreas como: diseño, programación, marketing, contabilidad, entre otros.
            </p>
          </div>
        </section>

       <div className="max-w-5xl mx-auto">
          <section className="flex items-center my-8 ">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Encuentra un talento"
                className="pl-10 pr-4 py-2 w-full rounded-l-full rounded-r-none border-r-0 outline-none bg-white"
              />
            </div>
            <Button className="rounded-l-none rounded-r-full bg-blue-600 hover:bg-blue-700">
              Buscar
            </Button>
          </section>
  
          <section className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 ">
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
           
     
          </section>
       </div>
      </main>
  );
}



interface JobCardProps {
  title: string
  experience: string
  description: string
  timePosted: string
}
function JobCard({
  title,
  experience,
  description,
  timePosted,
}:JobCardProps) {

  const experienceArray = experience.split(', ')

  return (
     <article>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center space-x-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </div>
            <Button variant="ghost" size="icon">
              <Bookmark className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            
          <p className="text-sm mb-2">{description}</p>
  
          <div>
            {experienceArray.map((item, index) => (
              <span key={index} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full mr-2">{item}</span>
            ))}
          </div>
            
          </CardContent>
          <CardFooter className="flex justify-between">
          
            <p className="text-xs text-muted-foreground">Posted {timePosted}</p>
          </CardFooter>
      </Card>
     </article>
  )
}
import { Bookmark } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import Link from "next/link"
import { Skeleton } from "./ui/skeleton"


interface JobCardProps {
  id: string
  title: string
  tags: string
  description: string
  createdAt: string
  idProject: string
  url: string
}
export function JobCard({
  id,
  title,
  tags,
  description,
  createdAt,
  url,
  idProject
}:JobCardProps) {

  const experienceArray = tags.split(', ')

  return (
     <Link href={`/proyecto/${id}`}>
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
            
          <p className="text-sm mb-2 overflow-hidden truncate">{description}</p>
  
          <div>
            {experienceArray.map((item, index) => (
              <span key={index} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full mr-2">{item}</span>
            ))}
          </div>
            
          </CardContent>
          <CardFooter className="flex justify-between">
          
            <p className="text-xs text-muted-foreground">Posted {createdAt}</p>
          </CardFooter>
      </Card>
     </Link>
  )
}

export const JobCardSkeleton = () => (
  <Skeleton className="overflow-hidden h-[200px] p-7 flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="w-[200px] h-4"/>
            <Skeleton>
              <Skeleton className="h-6 w-6" />
            </Skeleton>
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="px-2 py-1 rounded-full mr-2"/>
            <Skeleton className="px-2 py-1 rounded-full mr-2"/>
            <Skeleton className="px-2 py-1 rounded-full mr-2"/>
          </div>
            
          <div className="flex gap-2">
          
            <Skeleton className="rounded-md w-[25px] h-[15px]"/>
            <Skeleton className="rounded-md w-[25px] h-[15px]"/>
            <Skeleton className="rounded-md w-[25px] h-[15px]"/>
          </div>

          <Skeleton className="w-[200px] h-4 "/>
  </Skeleton>
)
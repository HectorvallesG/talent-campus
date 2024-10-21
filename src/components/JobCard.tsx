import { Bookmark } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import Link from "next/link"


interface JobCardProps {
  title: string
  experience: string
  description: string
  timePosted: string
}
export function JobCard({
  title,
  experience,
  description,
  timePosted,
}:JobCardProps) {

  const experienceArray = experience.split(', ')

  return (
     <Link href="#">
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
     </Link>
  )
}
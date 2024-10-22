"use client"

import PageContainer from "@/components/layouts/PageContainer";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentSearchResponse } from "@/model/Student";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react";
export default function SearchPage() {

  const searchParams = useSearchParams()
  const userName = searchParams.get('userName')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState([])

  const [users, setUsers] = useState<StudentSearchResponse[]>([])

  useEffect(() => {
    setLoading(true)
    fetch(`/api/search-profile?userName=${userName}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Usuario no encontrado')
        }
        return res.json()
      })
      .then(data => {
        console.log(data)
        setUsers(data.data)
      })
      .catch(err => {
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [userName])

  return (
      <main className="max-w-6xl mx-auto">
         
            <h1 className="text-xl font-semibold">
              Usuarios relacionados con {userName}
            </h1>
            <PageContainer scrollable>
              <div className=" flex flex-col gap-2">
                {loading && <p>Cargando...</p>}
                {error && <p>{error}</p>}
                {users && users.map((user) => (
                    <Link key={user.id} href={`/profile/hector73`}>
                    <Card className="overflow-hidden">
                        <CardHeader className="flex flex-row items-center ">
                          
                          <div className="flex flex-col space-y-0 pb-2">
                            <div className="flex items-center space-x-2">
                                <CardTitle className="text-sm font-medium">{user.name}</CardTitle>
                            </div>
                            <span>
                              @{user.user.userName}
                            </span>
                          </div>
                        </CardHeader>
                    </Card>
                  </Link>
                ))} 
              </div>
            </PageContainer>
      </main>
  )
}
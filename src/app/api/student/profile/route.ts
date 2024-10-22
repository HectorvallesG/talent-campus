import { getServerSession } from "next-auth";
import db from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";
import { ProfileSchema } from "@/modules/account/account.schema";
import { Role } from "@/model/Role";


export async function GET(request: NextRequest) {
    
    try {
        
        const userName = request.nextUrl.searchParams.get('userName')
        

        if(!userName) return NextResponse.json({message: 'Ingrese un nombre'}, {status: 400})
       
        const student = await db.student.findFirst({
            where: {
                user: {
                    userName: {
                        contains: userName
                    }
                }
            },
            select: {
                id: true,
                name: true,
                lastName: true,
                faculty: true,
                specialty: true,
                user:{
                    select:{
                        email: true,
                        userName: true,
                        id: true
                    },
                },
                profile:{
                    select:{
                        bio: true,
                        city: true,
                        career: true,
                        id: true
                    }
                }
                
            },
        })

       
        

        return NextResponse.json({data: student}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: 'Error en el servidor'}, {status: 500})
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const session = await getServerSession(options)

        if(!session || session.user.rol !== Role.Student) return NextResponse.json({message: 'No autorizado'}, {status: 401})

        const currentUser = await db.user.findUnique({
            where: {
                id: session.user.id
            },
            select: {
                id: true,
                student: {
                    select: {
                        id: true,
                        profile: {
                            select: {
                                id: true
                            }
                        }
                    }
                }
            }
        })

        if(!currentUser) return NextResponse.json({message: 'La sesión del usuario a sido eliminada'}, {status: 401})
        
        const data = await request.json()

        const safeData = ProfileSchema.safeParse(data)
      
        if(!safeData.success) return NextResponse.json({message: safeData.error.errors[0].message}, {status: 400})

        await db.$transaction(async (db) => {

            console.log(currentUser)
            await db.profileStudent.upsert({
                where: {
                    studentId: currentUser.student?.id
                },
                create: {
                    bio: safeData.data.bio,
                    city: safeData.data.city,
                    career: safeData.data.career,
                    student: {
                        connect: {
                            id: currentUser.student?.id
                        }
                    }
                },
                update: {
                    bio: safeData.data.bio,
                    city: safeData.data.city,
                    career: safeData.data.career,
                },
            })

            console.log(session.user.id)

            await db.user.update({
                where: {
                    id: session.user.id
                },
                data: {
                    userName: safeData.data.userName,
                    email: safeData.data.email
                }
            })

            await db.student.update({
                where: {
                    id: currentUser.student?.id
                },
                data: {
                    faculty: safeData.data.faculty,
                    
                }
            })


        })

        return NextResponse.json({message: "ok"}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'Error en el servidor'}, {status: 500})
    }
}
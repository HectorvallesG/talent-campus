import db from "../../../../db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    
    try {
        
        const userName = request.nextUrl.searchParams.get('userName')
        

        if(!userName) return NextResponse.json({message: 'Ingrese un nombre'}, {status: 400})
       
        const student = await db.student.findFirst({
            where: {
                user: {
                    userName: userName
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
                        id: true
                    },
                },
                profile:{
                    select:{
                        bio: true,
                        city: true,
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
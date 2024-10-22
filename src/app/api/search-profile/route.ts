import db from "../../../db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    
    try {
        
        const userName = request.nextUrl.searchParams.get('userName')

        if(!userName) return NextResponse.json({message: 'Ingrese un nombre'}, {status: 400})
       
        const student = await db.student.findMany({
            where: {
                user: {
                    userName: {
                        contains: userName
                    },
                    isActivated: 'true'
                }
            },
            select: {
                id: true,
                name: true,

                user: {
                    select: {
                        email: true,
                        userName: true,
                    }
                }
            }
        })

        if(student.length === 0) return NextResponse.json({message: 'Usuario no encontrado'}, {status: 404})
        

        return NextResponse.json({data: student}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: 'Error en el servidor'}, {status: 500})
    }
}
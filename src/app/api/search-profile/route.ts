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
                    }
                }
            }, 
            
        })
        
        return NextResponse.json({data: "ok"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: 'Error en el servidor'}, {status: 500})
    }
}
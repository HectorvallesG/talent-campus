import { title } from "process";
import db from "../../../../db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, {params:{search}}:{params:{search:string}}) {
    
    try {
        
        

        if(!search) return NextResponse.json({message: 'Ingrese un nombre'}, {status: 400})
       
        const projects = await db.projects.findMany({
            where: {
                tags: {
                    contains: search
                },
            }
        })

        if(projects.length === 0) return NextResponse.json({message: 'Proyecto no encontrado'}, {status: 404})
        

        return NextResponse.json({data: projects}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: 'Error en el servidor'}, {status: 500})
    }
}
import { NextRequest, NextResponse } from 'next/server';
import db from '../../../db';
import { AuthCredentials } from '../../../modules/auth/credentials.schema';
import { projectModelData } from '../../../modules/projects/project.scema';

export async function GET(req: NextRequest) {
    try {

        const queryIdProjects = req.nextUrl.searchParams.get('id');

        if(queryIdProjects) {
            const students = await db.student.findFirst({
                where: {
                    projects:{
                        some:{
                            id: queryIdProjects
                        }
                    }
                },
                include: {
                    user: true
                }
            })

            if(!students) return NextResponse.json({message: 'Estudiante no encontrado'}, {status: 404}) 

            return NextResponse.json({data: students}, {status: 200})
        }

        const allStudents = await db.student.findMany({
            include: {
                user: true
            }
        })


        return NextResponse.json({data: allStudents}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: 'Error en el servidor'}, {status: 500})
    }
}


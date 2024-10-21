import { NextResponse } from 'next/server';
import db from '@/db';
import { options } from '../../auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { ProjectSchema } from '@/modules/projects/project.scema';

export async function GET() {
    try {
      const projects = await db.projects.findMany();
  
      
      return NextResponse.json({data: projects},{ status: 200 })
    } catch (error) {
      return NextResponse.json({ status: 500 })
    }
} 


export async function POST(request: Request) {
  try {
    const session = await getServerSession(options);

    console.log(session?.user.id)

    if (!session) {
      return NextResponse.json({message: 'No autorizado'}, {status: 401})
    }

    const student = await db.student.findUnique({
      where: {
        userId: session.user.id
      }
    })

    if (!student) {
      return NextResponse.json({message: 'El usuario ya no existe'}, {status: 404})
    }

    const data = await request.json();

    const safeData = ProjectSchema.safeParse(data);
    if (!safeData.success) {
      return NextResponse.json({message: safeData.error.errors[0].message}, {status: 400})
    }

    console.log(safeData.data)

    await db.projects.create({
      data: {
        title: safeData.data.title,
        description: safeData.data.description,
        url: safeData.data.url,
        tags: safeData.data.tags,
        student: {
          connect: {
            id: student.id
          }
        }
      }
    })
     

    return NextResponse.json({message: 'ok'}, {status: 201})
  } catch (error) {
    console.log(error)
    return NextResponse.json({message: 'Error en el servidor'}, {status: 500})
  }
}
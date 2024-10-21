import { NextResponse } from 'next/server';
import db from '../../../db';

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
    const data = await request.json();

     
    await db.projects.create({
      data: {
        title: data.title,
        description: data.description,
        url: data.url,
        tags: data.tags,
        student: {
          connect: {
            id: "aa0bcb1f-59ee-4d42-985e-1f5eda09d1ab"
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
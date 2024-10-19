import { NextResponse } from 'next/server';
import db from '../../../../db';

export async function GET() {
    try {
      const projects = await db.projects.findMany({
        select: {
          title: true,
          description: true,
          tags: true,
          id: true,
          student: {
            select: {
              userName: true,
              faculty: true,
              specialty: true,
            },
          },
        },
        distinct: ['studentId']
      });
  
      const mapProjects = projects.map((projects) => {
        return {
          id: projects.id,
          title: projects.title,
          description: projects.description,
          tags: projects.tags,
          userName: projects.student.userName,
          faculty: projects.student.faculty,
          specialty: projects.student.specialty,
        };
      });
  
  
      return NextResponse.json({data: mapProjects},{ status: 200 })
    } catch (error) {
      return NextResponse.json({ status: 500 })
    }
  } 

import db from '../../../../db';
import { NextResponse } from 'next/server';


interface Params {
  params: { id: string};
}

export async function GET(req:Request, {params}:Params) {
    try {
        const { id } = params;

      const student = await db.student.findUnique({
        where: {
          id
        }
      });


      return NextResponse.json({data: student},{ status: 200 })
    } catch (error) {
      return NextResponse.json({ status: 500 })
    }
  }

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


    //   NextResponse.json({data: student},{ status: 200 })
    } catch (error) {
      NextResponse.json({ status: 500 })
    }
  }
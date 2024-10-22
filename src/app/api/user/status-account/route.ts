import { NextRequest, NextResponse } from "next/server";
import db from '@/db';

export async function GET(req:NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email')

    if(!email) return NextResponse.json({message: 'Ingrese un correo de usuario'}, {status: 400})


    const statusAccount = await db.user.findUnique({
      where: {
        email
      },
      select:{
        email: true,
        isActivated: true,
      }
    });


    if (!statusAccount) return NextResponse.json({message: 'El usuario no existe'}, {status: 400})

    return NextResponse.json({message: 'Informacion de la cuenta', data: statusAccount}, {status: 200})
  } catch (error) {
    return NextResponse.json({message: 'Error en el servidor'}, {status: 500})
  }
}
import { NextRequest, NextResponse } from 'next/server';
import db from '../../../db';
import { StudentSchema } from '@/modules/account/account.schema';
import { Role } from '@/model/Role';

export async function GET(req: NextRequest) {
    try {

        const students = await db.student.findMany()

        return NextResponse.json({data: students}, {status: 200})

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'Error en el servidor'}, {status: 500})
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const safeData = StudentSchema.safeParse(data);

        if(!safeData.success) return NextResponse.json({message: safeData.error.errors[0].message}, {status: 400})

        const userExist = await db.user.findUnique({
            where: {
                email: safeData.data.email
            },
        })

        if(userExist) return NextResponse.json({message: 'El usuario o el correo ya EXISTE'}, {status: 400})

        await db.$transaction(async (db) => {

            const user = await db.user.create({
                data: {
                    email: safeData.data.email,
                    password: safeData.data.password,
                    userName: safeData.data.userName,
                    rol: Role.Student
                }
            })

            await db.student.create({
                data: {
                    user: {
                        connect: {
                            id: user.id
                        }
                    },
                    name: safeData.data.name,
                    lastName: safeData.data.lastName,
                    faculty: safeData.data.faculty,
                    specialty: safeData.data.specialty,

                },
            })
        })

        return NextResponse.json({message: 'ok'}, {status: 201})
    } catch (error) {
        console.log(error)
       return NextResponse.json({message: 'Error en el servidor'}, {status: 500})   
    }
}


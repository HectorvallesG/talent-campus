import { NextRequest, NextResponse } from "next/server";
import db from "../../../db";

import { Role } from "@/model/Role";


export async function GET(req: NextRequest) {
    try {
        const recruiters = await db.recruiter.findMany({
            select: {
                id: true,
                name: true,
                company: true,
                user: {
                    select: {
                        id: true,
                        isActivated: true,
                        email: true,
                        userName: true,
                    }
                }
            }
        })

        return NextResponse.json({data: recruiters}, {status: 200})

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'Error en el servidor'}, {status: 500})
    }
    
}


export async function POST(request: Request) {
    try {
        const data = await request.json();

        const recruiterExist = await db.user.findUnique({
            where: {
                email: data.email
            },
        })

        if (recruiterExist) return NextResponse.json({message: 'El usuario o el correo ya EXISTE'}, {status: 400})

        await db.$transaction(async (db) => {
            const user = await db.user.create({
                data: {
                    email: data.email,
                    password: data.password,
                    userName: data.userName,
                    rol: Role.Recruiter
                }
            })

            await db.recruiter.create({
                data: {
                    user: {
                        connect: {
                            id: user.id
                        }
                    },
                    name: data.name,
                    company: data.company,
                    tel: data.tel
                },
            })
        })

        return NextResponse.json({message: 'ok'}, {status: 201})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'Error en el servidor'}, {status: 500})
    }
} 


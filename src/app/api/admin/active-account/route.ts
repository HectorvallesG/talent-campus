import { NextRequest, NextResponse } from "next/server";
import db from "../../../../db";

export async function PATCH(request: NextRequest) {
    try {

        const iduser = request.nextUrl.searchParams.get('idUser')

        if(!iduser) return NextResponse.json({message: 'Ingrese un id'}, {status: 400})
        

        const user = await db.user.findUnique({
            where: {
                id: iduser
            },
        })

        if (!user) return NextResponse.json({message: 'El usuario no existe'}, {status: 400})
        
        const activeAccount =await db.user.update({
            where: {
                id: iduser
            },
            data: {
                isActivated: user.isActivated === 'false' ? 'true' : 'false'
            }
        })



        return NextResponse.json({message: 'Activado con exito', user: activeAccount}, {status: 200})

    } catch (error) {
        return NextResponse.json({message: 'Error en el servidor'}, {status: 500})
    }
}


import leadsService from '@/app/services/leads';
import UsersAdmin from '@/app/services/users_admin';
import { NextResponse } from 'next/server';



export async function PUT(req: Request) {
    const body = await req.json();
    const { id,name, telefone, group, username, password } = body

    const { updateUser } = UsersAdmin
    const updateUserData = await updateUser({
        id, name, telefone, group, username, password
    })

    if(updateUserData.error) {
        return NextResponse.json({error: updateUserData.message}, { status: 400 });
    }

    return NextResponse.json(updateUserData);
}

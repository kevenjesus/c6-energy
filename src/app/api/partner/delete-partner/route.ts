import leadsService from '@/app/services/leads';
import UsersAdmin from '@/app/services/users_admin';
import { NextResponse } from 'next/server';



export async function DELETE(req: Request) {
    const body = await req.json();
    const { id } = body

    const { deleteUser } = UsersAdmin
    const deleteUserData = await deleteUser(id)

    if(deleteUserData.error) {
        return NextResponse.json({error: deleteUserData.message}, { status: 400 });
    }

    return NextResponse.json(deleteUserData);
}

import leadsService from '@/app/services/leads';
import UsersAdmin from '@/app/services/users_admin';
import { NextResponse } from 'next/server';



export async function POST(req: Request) {
    const body = await req.json();
    const { name, telefone, group, username, password } = body

    const { postUser } = UsersAdmin
    const postUserData = await postUser({
        name, telefone, group, username, password
    })

    if(postUserData.error) {
        return NextResponse.json({error: postUserData.message}, { status: 400 });
    }

    return NextResponse.json(postUserData);
}

import leadsService from '@/app/services/leads';
import UsersAdmin from '@/app/services/users_admin';
import { NextResponse } from 'next/server';



export async function POST(req: Request) {
    const body = await req.json();
    const { username } = body

    const { checkUsername } = UsersAdmin
    const postUserData = await checkUsername(username)

    if(postUserData.error) {
        return NextResponse.json({error: postUserData.message}, { status: 400 });
    }

    return NextResponse.json(postUserData);
}

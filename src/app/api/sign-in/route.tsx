import UsersAdmin from '@/app/services/users_admin';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
    const body = await req.json();
    const { username, password } = body

    const { authUser } = UsersAdmin

    const authResponse = await authUser({username, password})
    

    if(!authResponse.data.length) {
        return NextResponse.json({error: 'Usuário e/ou senha inválidos!', data: authResponse}, { status: 404 });
    }

    if(authResponse.error) {
        return NextResponse.json({error: authResponse.message}, { status: 400 });
    }

    return NextResponse.json(authResponse);
}
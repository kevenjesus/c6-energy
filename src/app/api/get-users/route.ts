import UsersAdmin from '@/app/services/users_admin';
import { NextResponse } from 'next/server';



export async function GET() {

    const { getAllUsers } = UsersAdmin
    const users = await getAllUsers()

    if(users.error) {
        return NextResponse.json({error: users.message}, { status: 404 });
    }

    return NextResponse.json(users);
}

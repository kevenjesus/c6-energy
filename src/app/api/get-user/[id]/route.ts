import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/app/config/supabase';
import UsersAdmin from '@/app/services/users_admin';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    const { getUser } = UsersAdmin
    const user = await getUser(id)

    if(user.error) {
        return NextResponse.json({error: user.message}, {status: 404 })
    }
  
    return NextResponse.json(user);
}


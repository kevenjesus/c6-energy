import leadsService from '@/app/services/leads';
import { NextResponse } from 'next/server';



export async function GET() {
    const { getLeads } = leadsService
    const users = await getLeads()

    if(users.error) {
        return NextResponse.json({error: users.message}, { status: 404 });
    }

    return NextResponse.json(users);
}

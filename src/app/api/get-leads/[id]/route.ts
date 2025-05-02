import leadsService from '@/app/services/leads';
import { NextResponse } from 'next/server';



export async function GET(
    req: Request,
    context: any
  ) {
    const { id } = context.params;
    const headers = req.headers
    const auth = headers.get('Authorization')
    const { getLeads } = leadsService
    const users = await getLeads(auth === 'admin', id)

    if(users.error) {
        return NextResponse.json({error: users.message}, { status: 404 });
    }

    return NextResponse.json(users);
}

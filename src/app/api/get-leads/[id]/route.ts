import leadsService from '@/app/services/leads';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: any
) {
  const { id } = params;
  const auth = req.headers.get('Authorization');

  const { getLeads } = leadsService;
  const users = await getLeads(auth === 'admin', id);

  if (users.error) {
    return NextResponse.json({ error: users.message }, { status: 404 });
  }

  return NextResponse.json(users);
}

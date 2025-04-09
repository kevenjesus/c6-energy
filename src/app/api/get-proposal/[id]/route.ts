import { NextRequest, NextResponse } from 'next/server';
import leadsService from '@/app/services/leads';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    const { getLead } = leadsService
    const proposal = await getLead(id)

    if(proposal.error) {
        return NextResponse.json({error: proposal.message}, {status: 404 })
    }
  
    return NextResponse.json(proposal);
}


import leadsService from '@/app/services/leads';
import { NextResponse } from 'next/server';



export async function POST(req: Request) {
    const body = await req.json();
    const { nome, email, whatsapp, state, city, value, discount, distribuidora, ref } = body

    const { postLead, insertProposal } = leadsService
    const postLeadResponse = await postLead({
        nome, email, whatsapp, cidade: city, estado: state, valor: value, desconto: discount,
        distribuidora, ref
    })
    const proposalResponse = await insertProposal({user: postLeadResponse.data.id})
    

    if(proposalResponse.error) {
        return NextResponse.json({error: proposalResponse.message}, { status: 400 });
    }

    return NextResponse.json(proposalResponse);
}

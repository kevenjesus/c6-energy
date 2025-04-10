import leadsService from '@/app/services/leads';
import { NextResponse } from 'next/server';



export async function POST(req: Request) {
    const body = await req.json();
    const { nome, email, whatsapp, state, city, value, discount, distribuidora } = body

    const { postLead } = leadsService
    const postLeadResponse = await postLead({
        nome, email, whatsapp, cidade: city, estado: state, valor: value, desconto: discount,
        distribuidora
    })

    if(postLeadResponse.error) {
        return NextResponse.json({error: postLeadResponse.message}, { status: 400 });
    }

    return NextResponse.json(postLeadResponse);
}

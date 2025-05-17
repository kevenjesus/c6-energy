import leadsService from '@/app/services/leads';
import { NextResponse } from 'next/server';



export async function PUT(req: Request) {
    const body = await req.json();
    const { 
        id,
        name, 
        whatsapp, 
        email, 
        document,
        marital_status,
        profession,
        is_company,
        responsable_name,
        responsable_phone,
        responsable_document,
        responsable_marital_status,
        responsable_professional,
        uc,
        zipcode,
        address,
        number,
        neighborhood,
        state,
        city,
        complement  
    } = body

    const { updateLead } = leadsService
    const updateLeadResponse = await updateLead({
        id,
        name, 
        whatsapp, 
        email, 
        document, 
        marital_status: marital_status ? marital_status : null, 
        profession: profession ? profession : null, 
        is_company: is_company === 'pj',
        responsable_name: responsable_name ? responsable_name : null,
        responsable_document: responsable_document ? responsable_document : null,
        responsable_phone: responsable_phone ? responsable_phone : null,
        responsable_marital_status: responsable_marital_status ? responsable_marital_status : null,
        responsable_professional: responsable_professional ? responsable_professional : null,
        uc,
        zipcode,
        address,
        number,
        neighborhood,
        state,
        city,
        complement 
    })

    if(updateLeadResponse.error) {
        return NextResponse.json({error: updateLeadResponse.message}, { status: 400 });
    }

    return NextResponse.json(updateLeadResponse);
}

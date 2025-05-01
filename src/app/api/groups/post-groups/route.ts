import groupsService from '@/app/services/groups';
import leadsService from '@/app/services/leads';
import { NextResponse } from 'next/server';



export async function POST(req: Request) {
    const body = await req.json();
    const { name } = body

    const { postGroup } = groupsService
    const postGroupData = await postGroup({
        name
    })

    if(postGroupData.error) {
        return NextResponse.json({error: postGroupData.message}, { status: 400 });
    }

    return NextResponse.json(postGroupData);
}

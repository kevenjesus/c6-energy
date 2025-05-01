import groupsService from '@/app/services/groups';
import leadsService from '@/app/services/leads';
import { NextResponse } from 'next/server';



export async function PUT(req: Request) {
    const body = await req.json();
    const { id, name } = body

    const { updateGroup } = groupsService
    const updateGroupData = await updateGroup({
        id, name
    })

    if(updateGroupData.error) {
        return NextResponse.json({error: updateGroupData.message}, { status: 400 });
    }

    return NextResponse.json(updateGroupData);
}

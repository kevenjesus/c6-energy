import groupsService from '@/app/services/groups';
import leadsService from '@/app/services/leads';
import { NextResponse } from 'next/server';



export async function DELETE(req: Request) {
    const body = await req.json();
    const { id } = body

    const { deleteGroup } = groupsService
    const deleteGroupData = await deleteGroup(id)

    if(deleteGroupData.error) {
        return NextResponse.json({error: deleteGroupData.message}, { status: 400 });
    }

    return NextResponse.json(deleteGroupData);
}

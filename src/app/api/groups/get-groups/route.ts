import groupsService from '@/app/services/groups';
import leadsService from '@/app/services/leads';
import { NextResponse } from 'next/server';



export async function GET() {
    const { getAllGroups } = groupsService
    const groups = await getAllGroups()

    if(groups.error) {
        return NextResponse.json({error: groups.message}, { status: 404 });
    }

    return NextResponse.json(groups);
}

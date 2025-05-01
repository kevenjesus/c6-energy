
import supabase from "../config/supabase"
import { ResponseSupbase, UserAdmin, UserAuthTypes } from "./types"

export interface GroupData {
    name: string
}

export interface GroupDataUpdate extends GroupData {
    id: string
}


const groupsService = {
    getAllGroups: async (): Promise<ResponseSupbase> => {
        let { data, error } = await supabase
        .from('partner_groups')
        .select('id, name')
        if(error) {
            return {
                error: true,
                message: `Error ao buscar grupos: ${error.message}`
            }
        }

        return {
            data,
            message: 'ok'
        }
    },
    getGroup: async (id: string): Promise<ResponseSupbase> => {
        let { data, error } = await supabase
        .from('partner_groups')
        .update('id, name')
        .eq('id', id)
        if(error) {
            return {
                error: true,
                message: `Error ao buscar grupo: ${error.message}`
            }
        }
        return {
            data: data?.[0],
            message: 'ok'
        }
    },
    deleteGroup: async (id: string): Promise<ResponseSupbase> => {
        let { data, error } = await supabase
        .from('partner_groups')
        .delete()
        .eq('id', id)
        if(error) {
            return {
                error: true,
                message: `Error ao deletar grupo: ${error.message}`
            }
        }
        return {
            data: null,
            message: 'ok'
        }
    },
    postGroup: async (groupData: GroupData): Promise<ResponseSupbase> => {
        let { data, error } = await supabase
        .from('partner_groups')
        .insert({name: groupData.name})
        .select()
        if(error) {
            return {
                error: true,
                message: `Error ao cadastrar grupo: ${error.message}`
            }
        }
        return {
            data,
            message: 'ok'
        }
    },
    updateGroup: async (groupData: GroupDataUpdate): Promise<ResponseSupbase> => {
        let { data, error } = await supabase
        .from('partner_groups')
        .update({name: groupData.name})
        .eq('id', groupData.id)
        .select()
        if(error) {
            return {
                error: true,
                message: `Error ao atualizar grupo: ${error.message}`
            }
        }
        return {
            data,
            message: 'ok'
        }
    },
}

export default groupsService

import supabase from "../config/supabase"
import { ResponseSupbase, UserAdmin, userAdminData, UserAdminRecive, UserAuthTypes } from "./types"

const partnerGuid = '9dbbfada-76b4-4267-844a-8912dae0df60'


const UsersAdmin = {
    getAllUsers: async (): Promise<ResponseSupbase> => {
        let { data, error } = await supabase
        .from('users_admin')
        .select('id, name, role_admin: role(name), username, partner_group: group(id, name), telefone') as unknown as { data: UserAdmin[]; error: any };
        if(error) {
            return {
                error: true,
                message: `Error ao buscar users admin: ${error.message}`
            }
        }
        const filtered = data?.filter(user => user.role_admin.name === 'partner')

        return {
            data: filtered,
            message: 'ok'
        }
    },
    postUser: async (dataUser: userAdminData): Promise<ResponseSupbase> => {
        let { data, error } = await supabase
        .from('users_admin')
        .insert({...dataUser, role: partnerGuid})
        .select('id, name, role_admin: role(name), username, partner_group: group(id, name), telefone')
        if(error) {
            return {
                error: true,
                message: `Error ao criar users admin: ${error.message}`
            }
        }

        return {
            data: data,
            message: 'ok'
        }
    },
    getUser: async (id: string): Promise<ResponseSupbase> => {
        let { data, error } = await supabase
        .from('users_admin')
        .select('id, name, role_admin: role(name), username, partner_group: group(id, name), telefone')
        .eq('id', id) as unknown as { data: UserAdmin[]; error: any };
        if(error) {
            return {
                error: true,
                message: `Error ao buscar usuario admin: ${error.message}`
            }
        }

        return {
            data: data?.[0],
            message: 'ok'
        }
    },
    checkUsername: async (username: string): Promise<ResponseSupbase> => {
        let { data, error } = await supabase
        .from('users_admin')
        .select('id, name, role_admin: role(name), username, partner_group: group(id, name), telefone')
        .eq('username', username) 
        if(error) {
            return {
                error: true,
                message: `Error ao buscar usuario admin: ${error.message}`
            }
        }
       
        return {
            data: data && data.length > 0,
            message: 'ok'
        }
    },
    deleteUser: async (id: string): Promise<ResponseSupbase> => {
        let { data, error } = await supabase
        .from('users_admin')
        .delete()
        .eq('id', id)
        if(error) {
            return {
                error: true,
                message: `Error ao deletar usuario admin: ${error.message}`
            }
        }

        return {
            data: null,
            message: 'ok'
        }
    },
    updateUser: async (dataUser: UserAdminRecive): Promise<ResponseSupbase> => {
        let dataUpdate: userAdminData = {
            name: dataUser.name,
            username: dataUser.username,
            group: dataUser.group,
            telefone: dataUser.telefone,
        }
        
        if(dataUser.password) {
            dataUpdate.password = dataUser.password
        }

        let { data, error } = await supabase
        .from('users_admin')
        .update(dataUpdate)
        .eq('id', dataUser.id) 
        .select('id, name, role_admin: role(name), username, partner_group: group(id, name), telefone')
        if(error) {
            return {
                error: true,
                message: `Error ao atualizar usuario admin: ${error.message}`
            }
        }

        return {
            data: data,
            message: 'ok'
        }
    },
    authUser: async ({username, password}: UserAuthTypes): Promise<ResponseSupbase> => {
        let { data, error } = await supabase
        .from('users_admin')
        .select("id, name, username, role_admin: role(id, name)")
        .eq('username', username)
        .eq('password', password)
        if(error) {
            return {
                error: true,
                message: `Error ao autentificar usuario admin: ${error.message}`
            }
        }
        return {
            data,
            message: 'ok'
        }
    }
}

export default UsersAdmin

import supabase from "../config/supabase"
import { ResponseSupbase, UserAuthTypes } from "./types"


const UsersAdmin = {
    getAllUsers: async (): Promise<ResponseSupbase> => {
        let { data, error } = await supabase
        .from('users_admin')
        .select('id, name, created_at')
        if(error) {
            return {
                error: true,
                message: `Error ao buscar users admin: ${error.message}`
            }
        }
        return {
            data,
            message: 'ok'
        }
    },
    getUser: async (id: string): Promise<ResponseSupbase> => {
        let { data, error } = await supabase
        .from('users_admin')
        .select('id, name, created_at')
        .eq('id', id)
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

    authUser: async ({username, password}: UserAuthTypes): Promise<ResponseSupbase> => {
    
        let { data, error } = await supabase
        .from('users_admin')
        .select("id, name, role_admin(name)")
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
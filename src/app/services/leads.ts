
import supabase from "../config/supabase"
import { ResponseSupbase, UserAuthTypes } from "./types"


const leadsService = {
    getLeads: async (): Promise<ResponseSupbase> => {
        const { data, error } = await supabase
        .from('proposal')
        .select(`
          *,
          user:user (*)
        `);

        if(error) {
            return {
                error: true,
                message: `Error ao buscar users admin: ${error.message}`
            }
        }

        const proposalsWithUrls = data.map((proposal) => ({
            ...proposal,
            invoice_energy: proposal.invoice_energy ? getPublicFileUrl(proposal.invoice_energy) : null,
            social_contract: proposal.social_contract ? getPublicFileUrl(proposal.social_contract) : null,
            document: proposal.document ? getPublicFileUrl(proposal.document) : null,
        }));

        return {
            data: proposalsWithUrls,
            message: 'ok'
        }
        
    },

    getLead: async (id: string):Promise<ResponseSupbase> => {
        const { data, error } = await supabase
        .from('proposal')
        .select(`
          *,
          user:user (*)
        `)
        .eq('id', id)

        if(error) {
            return {
                error: true,
                message: `Error ao buscar proposta: ${error.message}`
            }
        }

        return {
            data: data[0],
            message: 'ok'
        }
    }

}

function getPublicFileUrl(filePath: string | null) {
    if (!filePath) return null;
    return supabase.storage.from('documents').getPublicUrl(filePath).data.publicUrl;
}



export default leadsService
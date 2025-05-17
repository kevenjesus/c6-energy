
import supabase from "../config/supabase"
import { ProposalData } from "../hooks/useAdmin";
import { DataLead, FormData, ResponseSupbase } from "./types"


const leadsService = {
    updateLead: async ({
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
    }: DataLead) => {
        const { data: result, error } = await supabase
        .from('leads')
        .update({
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
        })
        .eq('id', id)
        .select();

         if (error) {
            return {
                error: true,
                message: `Erro ao atualizar lead: ${error.message}`
            };
        }

        return {
            data: result?.[0],
            message: 'Lead atualizado com sucesso'
        };
    },
    insertProposal: async (data: {
        user: string;
        invoice_energy?: string;
        document?: string;
        social_contract?: string;
    }): Promise<ResponseSupbase> => {
        const { data: result, error } = await supabase
        .from('proposal')
        .insert([data])
        .select();
    
        if (error) {
            return {
                error: true,
                message: `Erro ao criar proposta: ${error.message}`
            };
        }
    
        return {
            data: result?.[0],
            message: 'Proposta criada com sucesso'
        };
    },
    postLead: async (dataForm: FormData): Promise<ResponseSupbase> => {
        const { data, error } = await supabase
        .from('leads')
        .insert([
            {
                name: dataForm.nome,
                email: dataForm.email,
                whatsapp: dataForm.whatsapp,
                state: dataForm.estado,
                city: dataForm.cidade,
                energy_value: dataForm.valor,
                energy_company: dataForm.distribuidora,
                discount: dataForm.desconto,
                ref: dataForm.ref
            }
        ])
        .select()

        if(error) {
            return {
                error: true,
                message: `Error ao cadastrar um lead: ${error.message}`
            }
        }

        return {
            data: data[0],
            message: 'ok'
        }
    },
    getLeads: async (isAdmin: boolean, username: string): Promise<ResponseSupbase> => {
        if(!isAdmin) {
            const { data, error } = await supabase
            .from('leads')
            .select(`
              *,
              proposal:proposal(*)
            `)
            .eq('ref', username)
            .order('created_at', { ascending: false });
            if(error) {
                return {
                    error: true,
                    message: `Error ao buscar users admin: ${error.message}`
                }
            }
    
            const leadsWithProposalsAndUrls = data.map((lead) => ({
                ...lead,
                proposal: Array.isArray(lead.proposal)
                  ? lead.proposal.map((p: ProposalData) => ({
                      ...p,
                      invoice_energy: p.invoice_energy ? getPublicFileUrl(p.invoice_energy) : null,
                      social_contract: p.social_contract ? getPublicFileUrl(p.social_contract) : null,
                      document: p.document ? getPublicFileUrl(p.document) : null,
                    }))
                  : [],
              }));
              
    
            return {
                data: leadsWithProposalsAndUrls,
                message: 'ok'
            }
        }else {
            const { data, error } = await supabase
            .from('leads')
            .select(`
              *,
              proposal:proposal(*)
            `)
            .order('created_at', { ascending: false });
    
            if(error) {
                return {
                    error: true,
                    message: `Error ao buscar users admin: ${error.message}`
                }
            }
    
            const leadsWithProposalsAndUrls = data.map((lead) => ({
                ...lead,
                proposal: Array.isArray(lead.proposal)
                  ? lead.proposal.map((p: ProposalData) => ({
                      ...p,
                      invoice_energy: p.invoice_energy ? getPublicFileUrl(p.invoice_energy) : null,
                      social_contract: p.social_contract ? getPublicFileUrl(p.social_contract) : null,
                      document: p.document ? getPublicFileUrl(p.document) : null,
                    }))
                  : [],
              }));
              
    
            return {
                data: leadsWithProposalsAndUrls,
                message: 'ok'
            }
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
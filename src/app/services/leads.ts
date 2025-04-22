
import supabase from "../config/supabase"
import { ProposalData } from "../hooks/useAdmin";
import { Form2Data, Form2DataUser, FormData } from "../page";
import { ResponseSupbase } from "./types"


const leadsService = {
    upload: async (file: File | Blob, path: string): Promise<ResponseSupbase> => {
        const { data, error } = await supabase
            .storage
            .from('documents')
            .upload(path, file, {
            cacheControl: '3600',
            upsert: true,
            });

        if (error) {
            return {
            error: true,
            message: `Erro no upload: ${error.message}`
            };
        }

        return {
            data: data.path,
            message: 'Upload feito com sucesso'
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
    updateLead: async (dataForm: Form2DataUser): Promise<ResponseSupbase> => {
        const { data, error } = await supabase
        .from('leads')
        .update({ 
            document: dataForm.document,
            is_company: dataForm.is_company === 'true',
            zipcode: dataForm.zipcode, 
            address: dataForm.address,
            number: dataForm.number,
            complement: dataForm.complement,
            neighborhood: dataForm.neighborhood,
        })
        .eq('id', dataForm.id)
        .select();

        if(error) {
            return {
                error: true,
                message: `Error ao cadastrar um lead: ${error.message}`
            }
        }

        return {
            data: data,
            message: 'ok'
        }
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
                discount: dataForm.desconto
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
    getLeads: async (): Promise<ResponseSupbase> => {
        const { data, error } = await supabase
        .from('leads')
        .select(`
          *,
          proposal:proposal(*)
        `);

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
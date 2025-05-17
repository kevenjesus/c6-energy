import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ProposalData } from "./useAdmin"
import { toast } from "react-toastify"
import { Inputs } from "../contract/[id]/page"

export default function useContract() {
    const [proposal, setProposal] = useState<ProposalData | null>(null)
    const [loading, setLoading] = useState(true)
    const params = useParams()

    const updateLead = ({
        name,
        email,
        whatsapp,
        is_company,
        marital_status,
        profession,
        document,
        responsable_document,
        responsable_marital_status,
        responsable_name,
        responsable_phone,
        responsable_professional,
        uc,
        zipcode,
        address,
        city,
        complement,
        neighborhood,
        number,
        state
    }: Inputs) => {
        setLoading(true)
        try {
            setTimeout(async () => {
                await fetch('/api/update-lead', {
                    method: 'PUT',
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify({
                        id: proposal?.user.id,
                        name,
                        email,
                        whatsapp,
                        is_company,
                        marital_status: marital_status ? marital_status : null,
                        profession: profession ? profession : null,
                        document,
                        responsable_document: responsable_document ? responsable_document : null,
                        responsable_marital_status: responsable_marital_status ? responsable_marital_status : null,
                        responsable_name: responsable_name ? responsable_name : null,
                        responsable_phone: responsable_phone ? responsable_phone : null,
                        responsable_professional: responsable_professional ? responsable_professional : null,
                        uc,
                        zipcode,
                        address,
                        city,
                        complement,
                        neighborhood,
                        number,
                        state
                    })
                })

                toast('Proposta atualizada com sucesso', {type: 'success'})
            }, 1000)
        } catch (err) {
            toast('Erro inesperado. Tente novamente', {type: 'error'})
        } finally {
            setLoading(false)
        }
        
    }
   

    const getProposal = async (id: string) => {
        setTimeout(async () => {
            try {
                const request = await fetch(`/api/get-proposal/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const response = await request.json()
                setProposal(response.data)
            } catch (err) {
                toast('Error ao tentar carregar Proposta', {type: 'error'})

            } finally {
                setLoading(false)
            }
        }, 500)
    }

    useEffect(() => {
        if(params?.id) {
            const id = params.id as string
            getProposal(id)
        }
    }, [params])

    return {
        proposal,
        loading,
        updateLead
    }
}
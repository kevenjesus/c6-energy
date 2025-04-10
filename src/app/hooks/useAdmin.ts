import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export interface leadData {
    id: string;
    name: string;
    whatsapp: string;
    email: string;
    state: string;
    city: string;
    address: string;
    number: string;
    zipcode: string;
    complement: string;
    neighborhood: string;
    energy_company: string;
    energy_value: string
    discount: string
    document: string
    is_company: boolean
    proposal: ProposalData[]
}

export interface ProposalData {
    user: leadData;
    id: string;
    social_contract: string;
    document: string;
    invoice_energy: string;
    created_at: string
}

export default function useAdmin() {
    const [loading, setLoading] = useState(false)
    const [leads, setLeads] = useState<leadData[]>([])

    const getLeads = async () => {
        setLoading(true)
        try {
            const request = await fetch('/api/get-leads', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const response = await request.json()
            if(response.error) {
                toast(response.error, {type: 'error', position: 'bottom-right'})
                return;
            }
            const dataResponse = response.data
            setLeads(dataResponse)
            
        } catch (err) {
            toast('Erro ao tentar carregar a lista de leads', {type: 'error'})
        } finally {
            setLoading(false)
        }   
    } 

    useEffect(() => {
        getLeads()
    }, [])

    return {
        leads,
        loading
    }
}
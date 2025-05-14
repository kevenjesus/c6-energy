import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ProposalData } from "./useAdmin"
import { toast } from "react-toastify"

export default function useContract() {
    const [proposal, setProposal] = useState<ProposalData | null>(null)
    const [loading, setLoading] = useState(true)
    const params = useParams()
   

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
        loading
    }
}
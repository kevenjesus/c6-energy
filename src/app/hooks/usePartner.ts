import { useEffect, useState } from "react"
import { PartnerGroup, userAdminfrontData } from "../services/types"

type ModPartnerType = 'Novo vendedor' | 'Alterar vendedor'

export default function usePartner() {
    const [openModalGrupos, setModalGrupos] = useState(false)
    const [openModalPartners, setModalPartners] = useState(false)
    const [modParther, setModPartner] = useState<ModPartnerType>('Novo vendedor')
    const [partners, setPartners] = useState<userAdminfrontData[]>([])
    const [groups, setGroups] = useState<PartnerGroup[]>([])

    const onCloseModalGroups = () => {
        setModalGrupos(false)
    }

    const onOpenModalGroups = () => {
        setModalGrupos(true)
    }

    const onCloseModalPartner = () => {
        setModalPartners(false)
    }

    const onOpenModalPartner = () => {
        setModalPartners(true)
    }

    const onChangeModPartner = (mod: ModPartnerType) => {
        setModPartner(mod)
    }

    const getPartnersandGroups = async () => {
        const requestParters = await fetch('/api/partner/get-partners')
        const requestGroups = await fetch('/api/groups/get-groups')
        const responsePartners = await requestParters.json()
        const responseGroups = await requestGroups.json()
        setPartners(responsePartners.data)
        setGroups(responseGroups.data)
    }

    useEffect(() => {
        async function getPartnersandGroupsData() {
            await getPartnersandGroups()
        }
        getPartnersandGroupsData()
    }, [])

    return {
        partners,
        groups,
        openModalGrupos,
        openModalPartners,
        modParther,
        onCloseModalGroups,
        onCloseModalPartner,
        onOpenModalPartner,
        onOpenModalGroups,
        onChangeModPartner
    }
}
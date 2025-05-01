import { useEffect, useState } from "react"
import { PartnerGroup } from "../services/types"

export default function useGroups() {
    const [openModalGrupos, setModalGrupos] = useState(false)
    const [groups, setGroups] = useState<PartnerGroup[]>([])

    const onCloseModalGroups = () => {
        setModalGrupos(false)
    }

    const onOpenModalGroups = () => {
        setModalGrupos(true)
    }


    const getGroups = async () => {
        const requestGroups = await fetch('/api/groups/get-groups')
        const responseGroups = await requestGroups.json()
        setGroups(responseGroups.data)
    }

    useEffect(() => {
        async function getGroupsData() {
            await getGroups()
        }
        getGroupsData()
    }, [])

    return {
        groups,
        openModalGrupos,
        onCloseModalGroups,
        onOpenModalGroups,
    }
}
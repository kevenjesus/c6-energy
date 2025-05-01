import { useState } from "react"

type ModPartnerType = 'Novo vendedor' | 'Alterar vendedor'

export default function usePartner() {
    const [openModalGrupos, setModalGrupos] = useState(false)
    const [openModalPartners, setModalPartners] = useState(false)
    const [modParther, setModPartner] = useState<ModPartnerType>('Novo vendedor')

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

    return {
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
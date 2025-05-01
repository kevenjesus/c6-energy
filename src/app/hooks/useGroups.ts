import { useEffect, useState } from "react"
import { PartnerGroup } from "../services/types"
import { toast } from "react-toastify"

export default function useGroups() {
    const [openModalGrupos, setModalGrupos] = useState(false)
    const [groups, setGroups] = useState<PartnerGroup[]>([])
    const [group, setGroup] = useState<PartnerGroup | null>(null)
    const [groupField, setGroupField] = useState('')

    const onCloseModalGroups = () => {
        setModalGrupos(false)
    }

    const onOpenModalGroups = () => {
        setModalGrupos(true)
    }

    const onChangeGroupField = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGroupField(event.target.value)
    }

    const clearGroup = () => {
        setGroup(null)
        setGroupField('')
    }

    const updateGroupData = async () => {
        const request = await fetch('/api/groups/update-groups', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: group?.id, name: groupField})
        })
        const response = await request.json()
        if(response.error) {
            toast('Erro ao atualizar grupo. tente novamente', {type: 'error'})
        }else {
            const dataItem = response.data[0] as PartnerGroup
            const updatedPartner = groups.map(p => {
                if(p.id === dataItem.id) {
                    return dataItem
                }
                return p;
            })
            setGroups(updatedPartner)
            clearGroup()
            toast(`Grupo ${group?.name} atualizado com sucesso`, {type: 'success'})
        }
    }

    const postGroupData = async () => {
        try {
            const request = await fetch('/api/groups/post-groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: groupField})
            })
            const response = await request.json()
            setGroups(prevState => [...prevState, response.data[0]])
            clearGroup()
            toast('Novo grupo criado com sucesso', {type: 'success'})
        } catch (err) {
            toast('Erro ao criar grupo). tente novamente', {type: 'error'})
        }
    }

    const deleteGroupData = async (groupItem: PartnerGroup) => {
        const request = await fetch('/api/groups/delete-groups', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: groupItem.id})
        })
        const response = await request.json()
        if(response.error) {
            toast('Erro ao deletar grupo. tente novamente', {type: 'error'})
        }else {
            await getGroups()
            toast(`Grupo ${groupItem.name} deletado com sucesso`, {type: 'success'})
        }   
    }

    const onDeleteGroup = async (group: PartnerGroup) => {
        if(confirm('Tem certeza que deseja deletar o grupo?')) {
            await deleteGroupData(group)
        }
    }

    const onSubmitGroup = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        if(!groupField.length) {
            toast('Preencha o campo grupo', {type: 'warning'})
            return;
        }
        
        if(group) {
            await updateGroupData()
        }else {
            await postGroupData()
        }
    }

     const onEditGroup = (group: PartnerGroup) => {
        setGroup(group)
        setGroupField(group.name)
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

    console.log('group', group, groupField)

    return {
        groups,
        openModalGrupos,
        group,
        groupField,
        onChangeGroupField,
        onEditGroup,
        onSubmitGroup,
        onDeleteGroup,
        onCloseModalGroups,
        onOpenModalGroups,
    }
}
import { useEffect, useState } from "react"
import { PartnerGroup, userAdminData, userAdminFormData, userAdminfrontData } from "../services/types"
import { toast } from "react-toastify"
import { group } from "console"
import { formatPhoneNumber } from "../utils"

type ModPartnerType = 'Novo vendedor(a)' | 'Alterar vendedor(a)'
const formDataPartnerDefault: userAdminFormData = {
    name: '',
    telefone: '',
    group: '',
    username: '',
    password: '',
    repassword: ''
}

export default function usePartner() {
    const [openModalPartners, setModalPartners] = useState(false)
    const [modParther, setModPartner] = useState<ModPartnerType>('Novo vendedor(a)')
    const [partners, setPartners] = useState<userAdminfrontData[]>([])
    const [partner, setPartner] = useState<userAdminfrontData | null>(null)
    const [formDataPartner, setFormDataPartner] = useState<userAdminFormData>(formDataPartnerDefault)

    const handleChangePartner = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        let  valueFormat = value

        if(name === 'telefone') {
            valueFormat = formatPhoneNumber(value)
        }

        if(name === 'username') {
            valueFormat = valueFormat.replace(/\s/g, '')
        }

        setFormDataPartner((prev) => ({ ...prev, [name]: valueFormat }));
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

    const onSelectPartner = (data: userAdminfrontData) => {
        setPartner(data)
    }

    const postUserData = async () => {
        const data: any = {
            name: formDataPartner.name,
            telefone: formDataPartner.telefone,
            group: formDataPartner.group,
            username: formDataPartner.username,
            password: formDataPartner.password
        }
        try {
            const request = await fetch('/api/partner/post-partner', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const response = await request.json()
            setPartners(prevState => [...prevState, response.data[0]])
            onCloseModalPartner()
            toast('Novo parceiro(a) criado com sucesso', {type: 'success'})
        } catch (err) {
            toast('Erro ao criar parceiro(a). tente novamente', {type: 'error'})
        }
    }

    const updateUserData = async () => {
        const data: any = {
            id: partner?.id,
            name: formDataPartner.name,
            telefone: formDataPartner.telefone,
            group: formDataPartner.group,
            username: formDataPartner.username,
        }
        if(formDataPartner.password) {
            data.password = formDataPartner.password
        }
        
            const request = await fetch('/api/partner/update-partner', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const response = await request.json()
            if(response.error) {
                toast('Erro ao atualizar parceiro(a). tente novamente', {type: 'error'})
            }else {
                const dataItem = response.data[0] as userAdminfrontData
                const updatedPartner = partners.map(p => {
                    if(p.id === dataItem.id) {
                        return dataItem
                    }
                    return p;
                })
                setPartners(updatedPartner)
                onCloseModalPartner()
                toast(`Parceiro(a) ${formDataPartner.name} atualizado(a) com sucesso`, {type: 'success'})
            }
    }

    const deleteUserData = async (user: userAdminfrontData) => {
        const request = await fetch('/api/partner/delete-partner', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: user.id})
        })
        const response = await request.json()
        if(response.error) {
            toast('Erro ao deletar parceiro(a). tente novamente', {type: 'error'})
        }else {
            await getPartners()
            toast(`Parceiro(a) ${user.name} deletado(a) com sucesso`, {type: 'success'})
        }   
    }

    const onSubmitPartner = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()

        if(!formDataPartner.name.length) {
            toast('Preencha o campo nome', {type: 'warning'})
            return;
        }
        if(!formDataPartner.group.length) {
            toast('Selecione um grupo', {type: 'warning'})
            return;
        }
        if(!formDataPartner.telefone.length) {
            toast('Preencha o campo telefone', {type: 'warning'})
            return;
        }
       
            
        if(partner) {
            await updateUserData()
        }else {
            if(!formDataPartner.password.length) {
                toast('Preencha o campo senha', {type: 'warning'})
                return;
            }
        
            if(formDataPartner.password !== formDataPartner.repassword) {
                toast('Confirmação de senha deve ser igual a senha', {type: 'warning'})
                return;
            }
            await postUserData()
        }
    }

    const onDeleteUser = async (user: userAdminfrontData) => {
        if(confirm('Tem certeza que deseja deletar o parceiro(a)?')) {
            await deleteUserData(user)
        }
    }

    const onAddUser = () => {
        setPartner(null)
        setModPartner('Novo vendedor(a)')
        setFormDataPartner(formDataPartnerDefault)
        onOpenModalPartner()
    }

    const onEditUser = (user: userAdminfrontData) => {
        onSelectPartner(user)
        onChangeModPartner('Alterar vendedor(a)')
        setFormDataPartner({
            name: user.name, 
            telefone: user.telefone, 
            group: user.partner_group.id,
            username: user.username,
            password: '',
            repassword: '' 
        })
        onOpenModalPartner()
    }

    const getPartners = async () => {
        const requestParters = await fetch('/api/partner/get-partners')
        const responsePartners = await requestParters.json()
        setPartners(responsePartners.data)
    }

    const handleCopy = async (user: userAdminfrontData) => {
        const link =`${window.location.origin}?ref=${user.username}`
        try {
            await navigator.clipboard.writeText(link);
            toast('Link copiado com sucesso', {type: 'success'})
        } catch (err) {
           toast('Error ao tentar copiar link de vendedor(a)', {type: 'error'})
        }
    };

    useEffect(() => {
        async function getPartnersData() {
            await getPartners()
        }
        getPartnersData()
    }, [])

    return {
        formDataPartner,
        partner,
        partners,
        openModalPartners,
        modParther,
        handleCopy,
        onSubmitPartner,
        onCloseModalPartner,
        onOpenModalPartner,
        onChangeModPartner,
        onSelectPartner,
        handleChangePartner,
        onEditUser,
        onDeleteUser,
        onAddUser
    }
}
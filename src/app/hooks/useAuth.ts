'use client'

import { useEffect, useMemo, useState } from "react"
import { useAdminContext } from "../context/adminContext"
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


interface DataFetchSignIn {
    username: string;
    password: string
}


export default function useAuth() {
    const { user, handleUser } = useAdminContext()
    const [loading, setLoading] = useState(false)
    const [loadingCheckUser, setLoadingCheckUser] = useState(true)
    const [formData, setFormData] = useState<DataFetchSignIn>({ username: "", password: "" })
    const route = useRouter()

    const isAuthed = useMemo(() => {
        return user && user
    }, [user])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const signIn = () => {
        const { username, password } = formData
        setLoading(true)
        setTimeout(async () => {
            try {
                const request = await fetch('/api/sign-in', {
                    method: 'POST',
                    body: JSON.stringify({username, password}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const response = await request.json()
                if(response.error) {
                    toast(response.error, {type: 'error', position: 'bottom-right'})
                    return;
                }
                toast('Usuário autenticado com sucesso', {type: 'success', position: 'bottom-right'})
                const dataResponse = response.data[0]
                handleUser(dataResponse)
                localStorage.setItem("authted", JSON.stringify(dataResponse))
                route.push('/admin')
                
            } catch (err) {
                toast('Erro ao tentar realizar login e senha', {type: 'error'})
            } finally {
                setLoading(false)
            }
        }, 1000)
    } 

    const signOut = () => {
        handleUser(null)
        localStorage.removeItem("authted")
        route.push('/admin/login')
    }
    
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        signIn()
    }

    useEffect(() => {
        const auth = localStorage.getItem('authted')
        if(auth) {
            setTimeout(() => {
                try {
                    handleUser(JSON.parse(auth))
                } catch (err) {
                    
                } finally {
                    setLoadingCheckUser(false)
                }
            }, 1000)
        }else {
            setLoadingCheckUser(false)
        }

        document.body.style.background = ' #6800F5'
        
        
    }, [])

    return {
        user,
        isAuthed,
        loading,
        loadingCheckUser,
        formData,
        signIn,
        signOut,
        handleChange,
        onSubmit
    }
}
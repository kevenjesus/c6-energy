'use client'

import LoginPage from "@/app/admin/login/page";
import useAuth from "@/app/hooks/useAuth";
import Loading from "../Loading";
import { usePathname } from "next/navigation";

export default function PageProtect({children}: {children: React.ReactNode}) {
    const { isAuthed, loadingCheckUser, user } = useAuth()
    const pathname = usePathname()

    if(loadingCheckUser) {
        return <Loading />
    }

    if (pathname?.startsWith('/admin/partner') && user && user.role_admin.name !== 'admin') {
       return <h1>Acesso negado</h1>
    }

    if(isAuthed) {
        return children
    }
    return <LoginPage />
} 
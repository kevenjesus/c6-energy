import LoginPage from "@/app/admin/login/page";
import useAuth from "@/app/hooks/useAuth";
import Loading from "../Loading";

export default function PageProtect({children}: {children: React.ReactNode}) {
    const { isAuthed, loadingCheckUser } = useAuth()

    if(loadingCheckUser) {
        return <Loading />
    }

    if(isAuthed) {
        return children
    }
    return <LoginPage />
} 
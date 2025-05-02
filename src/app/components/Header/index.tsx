import { UserData } from '@/app/context/adminContext'
import * as S from './style'
import { useRouter } from 'next/navigation'
import useAuth from '@/app/hooks/useAuth'


export default function Header() {
    const router = useRouter()
    const { user, signOut} = useAuth()
    
    return (
         <S.Header isAdmin={user?.role_admin.name === 'admin'}>
            <img  style={{width: '200px', cursor: 'pointer'}} onClick={() => router.push('/admin')} src="https://c6energy.com.br/wp-content/uploads/2024/08/logo-c6-energy-colorido2-copiar.webp" alt="" />
            
                    <S.Menu>
                        {user && <S.MenuItem onClick={() => router.push('/admin')}>Leads</S.MenuItem>}
                        {user?.role_admin.name === 'admin' &&<S.MenuItem onClick={() => router.push('/admin/partner')}>Vendedores</S.MenuItem>}
                        {user && <S.MenuItem onClick={() => signOut()}>Sair</S.MenuItem>}
                    </S.Menu>
                
            
        </S.Header>
    )
}
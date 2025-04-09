'use client'
import * as S from './style'
import * as SG from '../../styles/global'
import useAuth from '@/app/hooks/useAuth'
import Header from '@/app/components/Header'

export default function LoginPage() {
    const { isAuthed, formData, loading, handleChange, onSubmit } = useAuth()
    const textButton = loading ? 'Aguarde...' : 'Entrar'
    return (
        <>
            <Header />
            <S.Container>
                <form action="#" method='post' onSubmit={onSubmit}>
                    <SG.Input type="text" name="username" placeholder="Nome de usuário" value={formData.username} onChange={handleChange} />
                    <SG.Input type="password" name="password" placeholder="Senha de acesso" value={formData.password} onChange={handleChange} />
                    <SG.Button type="submit" disabled={loading} className="btn">{textButton}</SG.Button>
                </form>
            </S.Container>
        </>
    )
}
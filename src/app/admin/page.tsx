'use client'

import Link from "next/link"
import PageProtect from "../components/PageProtect"
import * as S from './style'
import * as SG from '../styles/global'
import Header from "../components/Header"
import { useAdminContext } from "../context/adminContext"
import useAdmin from "../hooks/useAdmin"
import { useEffect } from "react"
import useAuth from "../hooks/useAuth"


export default function AdminPage() {
    const { user } = useAdminContext()
    const { leads } = useAdmin()
    const { signOut} = useAuth()

 

    return (
        <PageProtect>
            <Header />
            <S.Container>
                <S.Headline>
                    Olá, {user?.name}
                    <SG.Button onClick={signOut}>Sair</SG.Button>
                </S.Headline>
               
                <S.Table>
                    <thead>
                        <tr>
                            <S.Th>Nome</S.Th>
                            <S.Th>WhatsApp</S.Th>
                            <S.Th>Email</S.Th>
                            <S.Th>Localização</S.Th>
                            <S.Th>Proposta</S.Th>
                            <S.Th>Documentos</S.Th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            leads.length === 0 ? (
                            <tr>
                                <S.Td colSpan={6} align="center">Nenhum lead cadastrado</S.Td>
                            </tr>
                            ) : (
                                leads.map(lead => (
                                <tr key={lead.id}>
                                    <S.Td>{lead.user.name}</S.Td>
                                    <S.Td>
                                        <Link href={`https://wa.me/+55${lead.user.whatsapp}`}>{lead.user.whatsapp}</Link>
                                    </S.Td>
                                    <S.Td>
                                        <Link href={`mailto:${lead.user.email}`}>{lead.user.email}</Link>
                                    </S.Td>
                                    <S.Td align="center">{`${lead.user.city}/${lead.user.state}`}</S.Td>
                                    <S.Td align="center"><Link href={`/proposal/${lead.id}`}>ver proposta</Link></S.Td>
                                    <S.Td align="center">
                                        <Link href={lead.document}>{lead.user.is_company ? 'Contrato social' : 'RG'}</Link> | <Link href={lead.invoice_energy}>Conta de energia</Link>
                                    </S.Td>
                                </tr>
                                ))
                            
                            )
                        }
                       
                        
                    </tbody>
                </S.Table>
            </S.Container>
        </PageProtect>
    )
}
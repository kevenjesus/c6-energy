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
                            <S.Th>Desconto</S.Th>
                            <S.Th>Proposta</S.Th>
                            <S.Th>Documentos</S.Th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            leads.length === 0 ? (
                            <tr>
                                <S.Td colSpan={7} align="center">Nenhum lead cadastrado</S.Td>
                            </tr>
                            ) : (
                                leads.map(lead => (
                                <tr key={lead.id}>
                                    <S.Td>{lead.name}</S.Td>
                                    <S.Td>
                                        <Link href={`https://wa.me/+55${lead.whatsapp}`}>{lead.whatsapp}</Link>
                                    </S.Td>
                                    <S.Td>
                                        <Link href={`mailto:${lead.email}`}>{lead.email}</Link>
                                    </S.Td>
                                    <S.Td align="center">{`${lead.city}/${lead.state}`}</S.Td>
                                    <S.Td align="center">{lead.discount}</S.Td>
                                    <S.Td align="center">
                                        {
                                            lead.proposal.length === 0 ? '--' : (
                                                <Link target="_blank" href={`/proposal/${lead.proposal[0].id}`}>Ver proposta</Link>
                                            )
                                        }
                                        
                                        </S.Td>
                                    <S.Td align="center">
                                        {
                                           lead.proposal.length === 0 ? '--' : (
                                            <>
                                                <Link href={lead.is_company ? lead.proposal[0].social_contract : lead.proposal[0].document}>{lead.is_company ? 'Contrato social' : 'RG/CNH'}</Link> | <Link href={lead.proposal[0].invoice_energy}>Conta de energia</Link>
                                            </>
                                           ) 
                                        }
                                        
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
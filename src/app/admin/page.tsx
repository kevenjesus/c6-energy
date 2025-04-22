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

interface FilesLinksProps {
    isCompany: boolean;
    social_contract?: string;
    document?: string
}


function FilesLinks({isCompany, social_contract, document}:FilesLinksProps) {
    if(isCompany && social_contract) {
        return (
            <Link href={social_contract}>Contrato Social</Link>
        )
    }else if(!isCompany && document) {
        <Link href={document}>RG/CNH</Link>
    }
    return ''
}

function FileEnergyInvoice({energiy_invoice}:{energiy_invoice?: string}) {
    if(energiy_invoice) {
        return (
            <Link href={energiy_invoice}>Conta de energia</Link>
        )
    }
    return ''
}

function capitalizeWords(text: string): string {
    return text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function telwords(tel: string): string {
    return tel
            .replace("(", "")
            .replace(")", "")
            .replace("-", "")
            .replace(" ", "")
}


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
                            <S.Th>Ref</S.Th>
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
                                leads.map(lead => {
                                    
                                const isProposal = lead.proposal.length > 0
                                const proposal = lead.proposal[0]
                                const isCompany = lead.is_company
                                

                                return <tr key={lead.id}>
                                    <S.Td>{capitalizeWords(lead.name)}</S.Td>
                                    <S.Td>
                                        <Link target="_blank" href={`https://wa.me/+55${telwords(lead.whatsapp)}`}>{lead.whatsapp}</Link>
                                    </S.Td>
                                    <S.Td>
                                        <Link target="_blank" href={`mailto:${lead.email.toLowerCase()}`}>{lead.email.toLowerCase()}</Link>
                                    </S.Td>
                                    <S.Td align="center">{`${lead.city}/${lead.state}`}</S.Td>
                                    <S.Td align="center">{lead.discount}</S.Td>
                                    <S.Td align="center">
                                        {
                                            !isProposal ? '--' : (
                                                <Link target="_blank" href={`/proposal/${proposal.id}`}>Ver proposta</Link>
                                            )
                                        }
                                        
                                        </S.Td>
                                    <S.Td>nada</S.Td>
                                    <S.Td align="center">
                                        {
                                           !isProposal ? '--' : (
                                            <>
                                                <FilesLinks 
                                                    isCompany={isCompany} 
                                                    social_contract={proposal.social_contract}
                                                    document={proposal.document}
                                                />{' '}
                                                <FileEnergyInvoice energiy_invoice={proposal.invoice_energy} />
                                            </>
                                           ) 
                                        }
                                        
                                    </S.Td>
                                </tr>
})
                            
                            )
                        }
                       
                        
                    </tbody>
                </S.Table>
            </S.Container>
        </PageProtect>
    )
}
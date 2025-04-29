'use client'

import PageProtect from '@/app/components/PageProtect'
import * as S from '../style'
import * as SG from '@/app/styles/global'
import Header from '@/app/components/Header'

export default function PartnerPage() {
    return (
        <PageProtect>
            <Header />
            <S.Container>
                <S.Headline>
                     Parceiros
                     <S.HeadlineActions>
                        <SG.Button onClick={() => undefined}>Novo parceiro</SG.Button>
                        <SG.Button type='secondary' onClick={() => undefined}>Grupos</SG.Button>
                    </S.HeadlineActions>
                </S.Headline>
                <S.Table>
                <thead>
                    <tr>
                        <S.Th>Nome</S.Th>
                        <S.Th>Grupo</S.Th>
                        <S.Th>Username</S.Th>
                        <S.Th>Ações</S.Th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <S.Td colSpan={4} align='center'>Nenhum registro</S.Td>
                    </tr>
                </tbody>
                </S.Table>
            </S.Container>
        </PageProtect>
    )
}
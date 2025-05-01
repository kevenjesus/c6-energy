'use client'

import PageProtect from '@/app/components/PageProtect'
import * as S from '../style'
import * as SG from '@/app/styles/global'
import Header from '@/app/components/Header'
import Modal from '@/app/components/Modal'
import { useState } from 'react'
import usePartner from '@/app/hooks/usePartner'
import useGroups from '@/app/hooks/useGroups'

export default function PartnerPage() {
    const { 
        partners,
        openModalPartners, 
        modParther,
        onOpenModalPartner,
        onCloseModalPartner 
    } = usePartner()
    const {  
        groups, 
        openModalGrupos,  
        onOpenModalGroups, 
        onCloseModalGroups
    } = useGroups()
    return (
        <PageProtect>
            <Header />
            <Modal open={openModalGrupos} title="Grupos" onClose={onCloseModalGroups} onAction={() => undefined}>
                <S.FormGroup id='form-grupo'>
                    <S.Input type='text' required name='name' placeholder='Nome do grupo' />
                    <SG.Button type='submit'>Salvar</SG.Button>
                </S.FormGroup>
                <S.Table>
                    <thead>
                        <tr>
                            <S.Th>Grupo</S.Th>
                            <S.Th>Ações</S.Th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            groups.map(group => {
                                return (
                                    <tr key={group.id}>
                                        <S.Td>{group.name}</S.Td>
                                        <S.Td align='center' style={{display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center'}}>
                                            <SG.Button size='small' theme='secondary'>
                                                <img width={16} src='/icon-edit.png' alt='' />
                                            </SG.Button>
                                            <SG.Button size='small' theme='secondary'>
                                                <img width={16} src='/icon-trash.png' alt='' />
                                            </SG.Button>
                                        </S.Td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </S.Table>    
            </Modal>

            <Modal open={openModalPartners} idAction='form-patner' title={modParther} onClose={onCloseModalPartner} onAction={() => undefined}>
                <form method='post' action="#" id='form-patner'>
                    <S.Input type='text' required name='name' placeholder='Nome do vendedor *' />
                    <S.Input type='text' required name='telefone' placeholder='(00) 00000-0000 *' />
                    <S.Select>
                        <option>Selecione um grupo</option>
                    </S.Select>
                    <S.Input type='text' required name='username' placeholder='Username *' />
                    <S.Input type='password' required name='password' placeholder='senha *' />
                    <S.Input type='password' required name='repassword' placeholder='Confirmar senha *' />
                </form> 
            </Modal>
            <S.Container>
                <S.Headline>
                     Vendedores
                     <S.HeadlineActions>
                        <SG.Button onClick={onOpenModalPartner}>Novo parceiro</SG.Button>
                        <SG.Button theme='secondary' onClick={onOpenModalGroups}>Grupos</SG.Button>
                    </S.HeadlineActions>
                </S.Headline>
                <S.Table>
                <thead>
                    <tr>
                        <S.Th>Nome</S.Th>
                        <S.Th>Telefone</S.Th>
                        <S.Th>Grupo</S.Th>
                        <S.Th>Username</S.Th>
                        <S.Th>Ações</S.Th>
                    </tr>
                </thead>
                <tbody>
                    {
                        partners.map(partner => {
                            return (
                                <tr key={partner.id}>
                                    <S.Td>{partner.name}</S.Td>
                                    <S.Td align='center'>{partner.telefone}</S.Td>
                                    <S.Td>{partner.partner_group.name}</S.Td>
                                    <S.Td>{partner.username}</S.Td>
                                    <S.Td align='center' style={{display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center'}}>
                                        <SG.Button size='small' theme='secondary'>
                                            <img width={16} src='/icon-edit.png' alt='' />
                                        </SG.Button>
                                        <SG.Button size='small' theme='secondary'>
                                            <img width={16} src='/icon-trash.png' alt='' />
                                        </SG.Button>
                                    </S.Td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                </S.Table>
            </S.Container>
        </PageProtect>
    )
}
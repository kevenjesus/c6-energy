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
        formDataPartner,
        partner,
        partners,
        openModalPartners, 
        modParther,
        onAddUser,
        onSubmitPartner,
        onEditUser,
        onDeleteUser,
        handleChangePartner,
        onCloseModalPartner,
        handleCopy
    } = usePartner()
    const {  
        groups, 
        group,
        groupField,
        openModalGrupos,
        onChangeGroupField,
        onDeleteGroup,
        onSubmitGroup,
        onEditGroup,
        onOpenModalGroups, 
        onCloseModalGroups
    } = useGroups()
    return (
        <PageProtect>
            <Header />
            <Modal open={openModalGrupos} title="Grupos" onClose={onCloseModalGroups} onAction={() => undefined}>
                <S.FormGroup onSubmit={onSubmitGroup} id='form-grupo'>
                    <S.Input type='text' required value={groupField} onChange={onChangeGroupField} name='name' placeholder='Nome do grupo' />
                    <SG.Button type='submit'>Salvar</SG.Button>
                </S.FormGroup>
                <S.ListModal>
                    <S.TableWrapper>
                        <S.Table>
                            <thead>
                                <tr>
                                    <S.Th>Grupo</S.Th>
                                    <S.Th>Ações</S.Th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                groups.length === 0 && <tr><S.Td colSpan={2}>Nenhum grupo cadastrado</S.Td></tr>
                            }
                                {
                                    groups.map(group => {
                                        return (
                                            <tr key={group.id}>
                                                <S.Td>{group.name}</S.Td>
                                                <S.Td align='center' style={{display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center'}}>
                                                    <SG.Button onClick={() => onEditGroup(group)} size='small' theme='secondary'>
                                                        <img width={16} src='/icon-edit.png' alt='' />
                                                    </SG.Button>
                                                    <SG.Button onClick={() => onDeleteGroup(group)} size='small' theme='secondary'>
                                                        <img width={16} src='/icon-trash.png' alt='' />
                                                    </SG.Button>
                                                </S.Td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </S.Table>    
                    </S.TableWrapper>
                </S.ListModal>
            </Modal>

            <Modal open={openModalPartners} idAction='form-patner' title={modParther} onClose={onCloseModalPartner} onAction={() => undefined}>
                <form method='post' onSubmit={onSubmitPartner} action="#" id='form-patner'>
                    <S.Input type='text' value={formDataPartner.name} onChange={handleChangePartner} required name='name' placeholder='Nome do vendedor *' />
                    <S.Input type='text' value={formDataPartner.telefone} onChange={handleChangePartner} required name='telefone' placeholder='(00) 00000-0000 *' />
                    <S.Select name='group' required value={formDataPartner.group} onChange={handleChangePartner}>
                        <option>selecione um grupo *</option>
                        {
                            groups.map(group => {
                                return (
                                    <option key={group.id} value={group.id}>{group.name}</option>
                                )
                            })
                        }
                    </S.Select>
                    <S.Input type='text' value={formDataPartner.username} onChange={handleChangePartner} required name='username' placeholder='Username *' />
                    <S.Input type='password' value={formDataPartner.password} onChange={handleChangePartner} required={partner === null} name='password' placeholder='senha *' />
                    <S.Input type='password' value={formDataPartner.repassword} onChange={handleChangePartner} required={partner === null} name='repassword' placeholder='Confirmar senha *' />
                </form> 
            </Modal>
            <S.Container>
                <S.Headline>
                     Vendedores
                     <S.HeadlineActions>
                        <SG.Button onClick={onAddUser}>Novo parceiro</SG.Button>
                        <SG.Button theme='secondary' onClick={onOpenModalGroups}>Grupos</SG.Button>
                    </S.HeadlineActions>
                </S.Headline>
                <S.TableWrapper>
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
                            partners.length === 0 && <tr><S.Td colSpan={5}>Nenhum vendedor(a) cadastrado</S.Td></tr>
                        }
                        {
                            partners.map(partner => {
                                return (
                                    <tr key={partner.id}>
                                        <S.Td>{partner.name}</S.Td>
                                        <S.Td align='center'>{partner.telefone}</S.Td>
                                        <S.Td>{partner.partner_group.name}</S.Td>
                                        <S.Td>{partner.username}</S.Td>
                                        <S.Td align='center' style={{display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center'}}>
                                        <   SG.Button title='Copiar link do vendedor' onClick={() => handleCopy(partner)} size='small' theme='secondary'>
                                                <img width={16} src='/icon-link.png' alt='' />
                                            </SG.Button>
                                            <SG.Button onClick={() => onEditUser(partner)} size='small' theme='secondary'>
                                                <img width={16} src='/icon-edit.png' alt='' />
                                            </SG.Button>
                                            <SG.Button onClick={() => onDeleteUser(partner)} size='small' theme='secondary'>
                                                <img width={16} src='/icon-trash.png' alt='' />
                                            </SG.Button>
                                        </S.Td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    </S.Table>
                </S.TableWrapper>
            </S.Container>
        </PageProtect>
    )
}
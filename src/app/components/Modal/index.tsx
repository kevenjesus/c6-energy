import { MouseEvent, ReactNode } from 'react'
import * as S from './style'
import * as SG from '@/app/styles/global'

interface ModalProps {
    open: boolean,
    title: string
    children: ReactNode
    onClose: () => void
    onAction?: () => void
    actionText?: string
    idAction?: string
}

export default function Modal({open, title, children, actionText = 'salvar', idAction, onClose, onAction}: ModalProps) {

    const closeModal = (e: MouseEvent<HTMLDivElement>) => {
        if(e.target === e.currentTarget) {
            onClose()
        }  
    }

    if(!open) {
        return <></>
    }
    return (
        <S.Modal onClick={closeModal} data-type="container">
            <S.ModalContent>
                <S.ModalHeader>
                    <S.ModalTitle>{title}</S.ModalTitle>
                    <S.ModalClose onClick={onClose}>&times;</S.ModalClose>
                </S.ModalHeader>
                <S.ModalBody>{children}</S.ModalBody>
                <S.ModalFooter>
                    {onAction && <SG.Button type='submit' onClick={onAction} form={idAction}>{actionText}</SG.Button>}
                    <SG.Button theme='secondary' onClick={() => onClose()}>Fechar</SG.Button>
                </S.ModalFooter>
            </S.ModalContent>
        </S.Modal>
    )
}
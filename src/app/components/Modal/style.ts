import styled from 'styled-components'

export const Modal = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 100px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.6);
    z-index: 3;
`

export const ModalContent = styled.div`
    width: 700px;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
`

export const ModalHeader = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const ModalTitle = styled.h2`
    font-size: 20px;
    font-weight: bold;
    font-family: 'Manrope', sans-serif;
    color: #000;
`

export const ModalClose = styled.button`
    font-size: 30px;
    font-weight: bold;
    font-family: 'Manrope', sans-serif;
    color: #000;
    background-color: transparent;
    border: 0;
    cursor: pointer;
`

export const ModalBody = styled.div`
    margin: 30px 0;
`

export const ModalFooter = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 15px;
`
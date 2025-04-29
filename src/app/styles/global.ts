import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    :root {
    --font-ibm-plex-sans: 'IBM Plex Sans', sans-serif;
    --font-manrope: 'Manrope', sans-serif;
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }


    img {
        max-width: 100%;
    }
`

export const Input = styled.input`
    width: 100%;
    background-color: #5600C3;
    border-width: 0px 0px 0px 0px;
    border-radius: 15px 15px 15px 15px;
    font-size: 20px;
    font-weight: 400;
    color: #fff;
    padding: 16px 23px 16px 23px;
    outline: none;
    margin-bottom: 15px;
    &::placeholder {
        color: #d0cece;
    }
`

interface ButtonProps {
    style?: 'primary' | 'secondary'
}

export const Button = styled.button<ButtonProps>`
    border: 0;
    font-size: 16px;
    text-transform: uppercase;
    padding: 15px 33px 15px 33px;
    border-radius: 6px;
    background-color:${({style}) => style === 'secondary' ? '#5600C3' : '#FF5E00'};
    color: #fff;
    min-height: 40px;
    cursor: pointer;
    letter-spacing: -0.5px;
    font-weight: 700;
    font-family: var(--font-manrope);
    transition: all ease-in-out .3s;
    display: flex;
    gap: 12px;
    &:hover,
    &:disabled {
        background-color:${({style}) => style === 'secondary' ? '#FF5E00' : '#5600C3'};
    }
    &:disabled {
        cursor: auto;
    }
`
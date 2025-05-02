import styled from 'styled-components'

interface HeaderProps {
    isAdmin?: boolean
}

export const Header = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isAdmin',
  })<HeaderProps>`
    width: 100%;
    height: 150px;
    background-color: #FF5E00;
    padding: 50px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
`

export const Menu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    @media (min-width: 1200px) {
        flex-direction: row;
    }
`

export const MenuItem = styled.div`
    padding: 10px;
    color: #fff;
    font-weight: bold;
    font-family: "Manrope", sans-serif;
    font-size: 18px;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    &:hover {
        border-color: #fff;
    }
`
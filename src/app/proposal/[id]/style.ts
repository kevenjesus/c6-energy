import styled from 'styled-components'

interface ContainerGeralProps {
    pdf?: string
}

export const ContainerGeral = styled.div<ContainerGeralProps>`
    width: ${({pdf}) => pdf === 'true' ? '1200px' : '100%'};
`

export const Header = styled.div`
    width: 100%;
    height: auto;
    background-color: #6900F7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;
    padding-bottom: 30px;
    img {
        width: 300px;
    }
   
    @media (min-width: 800px) {
        height: 150px;
        flex-direction: row;
        gap: 50px;
        padding-bottom: 0;
    }
`

export const Branding = styled.div`
    display: flex;
    flex-direction: column;
`

export const BrandingText = styled.p`
    font-size: 12px;
    color: #fff;
    margin-top: -10px;
    margin-left: 5px;
    font-family: "Manrope", sans-serif;
`

export const HeadingContact = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: #fff;
    font-size: 12px;
    gap: 5px;
    p::first-line {
      font-size: 14px;  
    }
    p {
        font-family: "Manrope", sans-serif;
    }
`

export const SubHeading = styled.h2`
    padding: 10px;
    background-color: #FC4505;
    color: #fff;
    font-weight: bold;
    font-size: 25px;
    font-family: "IBM Plex Sans", sans-serif;
    border-radius: 10px;
    width: 300px;
    margin: -20px auto;
`

export const Container = styled.div`
    width: 100%;
    padding: 50px 15px;
    margin: 0 auto;

    @media (min-width: 900px) {
        width: 900px;
        padding: 50px 0;
    }
`

export const Features = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: column;
    align-items: center;
    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
    }
`
export const FeatureItem = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: bold;
    img {
        width: 20px;
    }
`

export const CardsContainer = styled.div`
    width: 100%;
    margin: 30px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    @media (min-width: 768px) {
        justify-content: space-between;
        flex-direction: row;
        align-items: normal;
        gap: 0;
    }
    @media (min-width: 900px) {
        width: 800px;
    }
`

export const Card = styled.div`
    width: 350px;
    padding: 20px;
    border-radius: 10px;
    background-color: #FC4505;
    color: #fff;
    font-family: "Manrope", sans-serif;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`

interface MiniCardProps {
    color?: string
    width?: string
}

export const MiniCardsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin: 30px auto 15px auto;
    @media (min-width: 768px) {
        flex-direction: row;
    }
    @media (min-width: 900px) {
        justify-content: space-between;
        align-items: normal;
    }
`

export const MiniCard = styled.div<MiniCardProps>`
    width: ${({width}) => width ? width : '200px'};;
    padding: 20px;
    border-radius: 10px;
    background-color: ${({color}) => color ? color : '#FC4505'};
    color: #fff;
    font-family: "Manrope", sans-serif;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 10px;
    > img {
        width: 35px;
    }
`

export const TitleCard = styled.h3`
    font-size: 20px;
    font-weight: bold;
`

export const Headline = styled.h2`
    padding: 10px;
    background-color: #6900F7;
    color: #fff;
    font-weight: bold;
    font-size: 25px;
    font-family: "IBM Plex Sans", sans-serif;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 300px;
    margin: 0 auto;
`

export const BenefitsContainer = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: column;
    margin: 30px auto;
    @media (min-width: 768px) {
        flex-direction: row;
    }
    @media (min-width: 900px) {
        justify-content: space-between;
        align-items: normal;
    }
`
export const BenefitsCardsContainer = styled.div`
    display: flex;
    gap: 20px;
`

export const ListBenefits = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
`

export const ListBenefitsItem = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 15px;
    font-family: "Manrope", sans-serif;
    font-weight: bold;
    img {
        width: 20px;
    }
`

export const Footer = styled.footer`
    width: 100%;
    background-color: #6900F7;
    > div {
        display: flex;
        align-items: flex-start;
        padding: 20px 0;
    }
`

export const FooterBottomContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`

export const FooterTop = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    width: 450px;
    @media (min-width: 1200px) {
        flex-direction: row;
        justify-content: flex-start;
    }
`

export const FooterTopTitle = styled.h3<ContainerGeralProps>`
    font-family: "Manrope", sans-serif;
    color: #fff;
    font-size: 25px;
    font-weight: bold;
    text-transform: uppercase;
    strong {
        background-color: ${({pdf}) => pdf === 'true' ? 'transparent' : '#FC4505'};
    }

`

export const Footerimg = styled.img`
    width: 60px;
`

export const FooterBottom = styled.div`
    display: flex;
    gap: 40px;
    align-items: center;
    flex-direction: column;
    @media (min-width: 1200px) {
        flex-direction: row;
    }
`

export const FooterBottomTitle = styled.h3`
    font-family: "Manrope", sans-serif;
    color: #fff;
    font-size: 14px;
    font-weight: normal;
    text-align: center;
`

export const FooterBottomNumber = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: normal;
    justify-content: center;
    img {
        width: 36px;
    }
`

export const boxMapa = styled.div`
    background: url('/camada.png') no-repeat;
    width: 350px;
    background-size: 100%;
    margin-top: -80px;
    position: relative;
    display: none;
    > img {
        width: 250px;
        margin-left: 67px;
    }
    @media (min-width: 1200px) {
        display: block;
    } 
`

export const BoxText = styled.span`
    font-family: "Manrope", sans-serif;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    position: absolute;
    left: 20px;
    bottom: 30px;
    > strong {
        background-color: #6900F7;
        padding: 5px;
        border-radius: 10px;
    }
`

export const LogosRenovaveis = styled.img`
    width: 300px;
    @media (min-width: 1200px) {
        align-self: flex-end;
        margin-left: -30px;
    }
`

export const SeloContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
    margin-left: auto;
    width: 340px;
`

export const SeloTitle = styled.h3`
    font-size: 15px;
    font-family: "Manrope", sans-serif;
    font-weight: bold;
`

export const Selo = styled.img`
    width: 100px;
`

export const COntainerBtn = styled.div<ContainerGeralProps>`
    display: none;
    @media (min-width: 1200px) {
        display: ${({pdf}) => pdf === 'true' ? 'none' : 'flex'};
        justify-content: center;
        width: 100%;
        margin: 30px auto;
    }
`
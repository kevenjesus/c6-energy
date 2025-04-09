import styled from 'styled-components'

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
        align-items: flex-start;
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
import styled, { keyframes } from 'styled-components';

// Keyframes
export const selecionar = keyframes`
  0% {
    background-position: 0;
  }
  20% {
    background-position: -100%;
  }
  100% {
    background-position: -100%;
  }
`;

// Inputs
export const Input = styled.input`
  background-color: #5600C3;
  border: none;
  border-radius: 15px;
  font-size: 20px;
  font-weight: 400;
  color: #fff;
  padding: 16px 23px;

  &::placeholder {
    color: #d0cece;
  }
`;

export const Select = styled.select`
  background-color: #5600C3;
  border: none;
  border-radius: 15px;
  font-size: 20px;
  font-weight: 400;
  color: #fff;
  padding: 16px 23px;

  &::placeholder {
    color: #d0cece;
  }
`

// Images
export const Image = styled.img`
  max-width: 100%;
  
`;

export const ImageWrapper = styled.div`
  height: 100%;
  width: 460px;
  transition: background .3s, border .3s, border-radius .3s, box-shadow .3s, transform var(--e-transform-transition-duration, .4s);

  img {
    width: 100%;
    height: auto;
    border-radius: 50px;
  }
`;

// Container
export const Container = styled.div`
  display: flex;
  max-width: 1360px;
  margin: 0 auto;
  min-height: 640px;
  gap: 40px;
  align-items: center;
  padding: 50px 0;
`;

// Selecionado
export const Selecionado = styled.span`
  background: linear-gradient(to right, transparent 50%, #FF5E00 50%);
  background-size: 200%;
  background-position: 0;
  transition: background-position 1.5s;
  animation: ${selecionar} 10s infinite;
`;

// Typography
export const Titulo = styled.h1`
  font-size: 55px;
  font-weight: bold;
  line-height: 125%;
  color: #F4F4F4;
  font-family: 'IBM Plex Sans', sans-serif;
`;

// Forms
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 700px;
  gap: 12px;
`;

export const FormFields = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 20px;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Col6 = styled(Col)`
  flex-basis: calc(50% - 20px);
`;

export const Col12 = styled(Col)`
  flex-basis: calc(100% - 20px);
`;

export const Label = styled.label`
  font-size: 25px;
  color: #fff;
  font-weight: bold;
  font-family: 'Manrope', sans-serif;
`;


export const Button = styled.button`
  border: 0;
  font-size: 18px;
  text-transform: uppercase;
  padding: 15px 33px;
  border-radius: 6px;
  background-color: #FF5E00;
  color: #fff;
  min-height: 40px;
  cursor: pointer;
  letter-spacing: -0.5px;
  font-weight: 600;
  font-family: var(--font-manrope);
  transition: all ease-in-out .3s;
  display: flex;
  gap: 12px;

  &:hover,
  &:disabled {
    background-color: #39008E;
  }

  &:disabled {
    cursor: auto;
  }
`;

export const Small = styled.small`
  color: #ffffff;
  font-family: var(--font-manrope);
  font-size: 14px;
  line-height: 130%;
  letter-spacing: -0.04em;
  font-weight: 500;
  text-align: left;
`;

export const LinkStyled = styled.a`
  color: #fff;
`;

// Footer
export const Footer = styled.footer`
  width: 100%;
  background-color: #ff5e00;
  padding-top: 50px;
`;

export const FooterContainer = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
`;

export const Company = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 26px;
  padding-right: 80px;
`;

export const CompanyDescription = styled.p`
  font-size: 18px;
  color: #fff;
  font-family: var(--font-manrope);
  line-height: 125%;
`;

export const Logo = styled.img`
  width: 260px;
`;

export const Social = styled.div`
  display: flex;
  gap: 12px;

  a {
    display: inline-block;
    transition: transform .3s ease-out;

    &:hover {
      transform: translateY(-8px);
    }
  }
`;

export const Contact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ContactItem = styled.a`
  display: flex;
  gap: 12px;
  align-items: center;
  color: #fff;
`;

export const FooterCopy = styled.div`
  background-color: #5600c3;
  padding: 20px;
  text-align: center;
  color: #fff;
  font-size: 18px;
  margin-top: 50px;
`;

export const WhatsappButton = styled.button`
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 50px;
  right: 20px;
  background-color: #25d366;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
`;

// Containers auxiliares
export const ContainerResponse = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
`;

export const ContainerLogin = styled.div`
  max-width: 350px;
  margin: 100px auto;

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    button {
      text-align: center;
      justify-content: center;
    }
  }
`;

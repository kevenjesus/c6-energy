'use client'
  
import useProposal from "@/app/hooks/useProposal"
import * as S from './style'
import * as SG from '@/app/styles/global'
import Loading from "@/app/components/Loading";
import { useState } from "react";
import { usePDF } from 'react-to-pdf';
import { useRouter } from "next/navigation";


function calcularImpactoAmbiental(valorContaMensal: number) {
    const precoPorKWh = 0.89; // R$/kWh
    const emissaoCO2PorKWh = 0.40; // kg de CO₂ por kWh
    const kgCO2PorArvore = 20;
  
    const kwhMes = valorContaMensal / precoPorKWh;
    const co2AnualKg = kwhMes * 12 * emissaoCO2PorKWh;
    const pegadaCarbono = co2AnualKg / 1000; // em toneladas
    const arvoresPlantadas = co2AnualKg / kgCO2PorArvore;
  
    return {
      kwhMes: kwhMes.toFixed(2),
      pegadaCarbono: pegadaCarbono.toFixed(2) + " t",
      arvoresPlantadas: Math.round(arvoresPlantadas)
    };
  }

  function parseCurrencyToNumber(valor: string): number {
    const sanitized = valor
      .replace("R$", "")
      .replace(/\s/g, "")
      .replace(/\./g, "")
      .replace(",", ".");
  
    const parsed = Number(sanitized);
    return isNaN(parsed) ? 0 : parsed;
  }
  function calcularEconomiaEstimativa(
    valorMensal: number,
    percentualDesconto: string,
    meses: number
  ): string {
    const percentual = parseFloat(percentualDesconto.replace("%", "")) / 100;
  
    if (isNaN(percentual) || isNaN(valorMensal) || isNaN(meses)) return "R$ 0,00";
  
    const economiaMensal = valorMensal * percentual;
    const economiaTotal = economiaMensal * meses;
  
    return economiaTotal.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }

export default function ProposalPage() {
    const { loading, proposal } = useProposal()
    const { toPDF, targetRef } = usePDF();
    const [renderPdf, setRenderPdf] = useState(false)
    const router = useRouter()

    if(loading) {
        return <Loading headline="Carregando proposta..." />
    }

    if(!proposal) {
        return <h1>Proposta nao existente</h1>
    }

    const data = new Date(proposal.created_at)
    const emissao = data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        })
    const dataComPrazo = new Date(proposal.created_at)
    dataComPrazo.setDate(data.getDate() + 10)
    const prazo = dataComPrazo.toLocaleDateString('pt-BR')

    const valorConta = parseCurrencyToNumber(proposal.user.energy_value)

    const impactoAmbiental = calcularImpactoAmbiental(valorConta)
    const economia1Ano = calcularEconomiaEstimativa(valorConta, proposal.user.discount, 12)
    const economia5Anos = calcularEconomiaEstimativa(valorConta, proposal.user.discount, 60)

    const handlePdf = () => {
        setRenderPdf(true)
        setTimeout(() => {
            toPDF({filename: `proposta-${proposal.user.name}.pdf`})
            setRenderPdf(false)
        }, 1000) 
    }

    const goToContract = (proposalId: string) => {
        router.push(`/contract/${proposalId}`)
    }
    
    return (
        <>
            {renderPdf && <Loading headline="Gerando PDF da proposta..." />}
        
        <S.ContainerGeral ref={targetRef} pdf={renderPdf.toString()}>
            <S.Header>
                <S.Branding>
                    <img src="/logotipo.png" alt="C6 ENERGY" />
                    <S.BrandingText>A Maior inteligencia de energia do Brasil </S.BrandingText>
                </S.Branding>
                <S.HeadingContact>
                    <p>C6 ENERGY | 45.506.222/0001-19</p>
                    <p>ENDEREÇO: R. Dr. Bráulio Gomes, 107 - 01047-020</p>
                    <p>São Paulo, SP</p>
                </S.HeadingContact>
            </S.Header>
            <S.SubHeading>Simulação de economia</S.SubHeading>
            <S.Container>
                <S.Features>
                    <S.FeatureItem>
                        <img src="/check.png" alt="" />
                        Zero oscilação de tarifa
                    </S.FeatureItem>
                    <S.FeatureItem>
                        <img src="/check.png" alt="" />
                        Zero investimento
                    </S.FeatureItem>
                    <S.FeatureItem>
                        <img src="/check.png" alt="" />
                        Zero custo de instalação
                    </S.FeatureItem>
                    <S.FeatureItem>
                        <img src="/check.png" alt="" />
                        Previsibilidade de custo
                    </S.FeatureItem>
                </S.Features>
                <S.CardsContainer>
                    <S.Card>
                        <p>SIMULAÇÃO: PROPOSTA {proposal.id.slice(0, 7).toUpperCase()}</p>
                        <p>NOME: {proposal.user.name}</p>
                        <p>CPF/CNPJ: {proposal.user.document}</p>
                        <p>ENDEREÇO: {`${proposal.user.address}, ${proposal.user.number}, ${proposal.user.complement} - ${proposal.user.city}/${proposal.user.state} CEP ${proposal.user.zipcode}`}</p>
                    </S.Card>
                    <S.Card>
                        <p>UNIDADE DISTRIBUIDORA:</p>
                        <p>DISTRIBUIDORA: {proposal.user.energy_company}</p>
                        <p>EMISSÃO: {emissao}</p>
                        <p>PRAZO DA PROPOSTA: {prazo}</p>
                    </S.Card>
                </S.CardsContainer>
                <S.Headline>Resultado da economia</S.Headline>
                <S.MiniCardsContainer>
                    <S.MiniCard>
                        <img src="/dinheiro.png" alt="" />
                        <S.TitleCard>{proposal.user.energy_value}</S.TitleCard>
                        <p>Voce paga atualmente em media sem a c6</p>
                    </S.MiniCard>
                    <S.MiniCard color="#6900F7">
                        <img src="/medidor.png" alt="" />
                        <S.TitleCard>{impactoAmbiental.kwhMes} KWH</S.TitleCard>
                        <p>Sua participação em cota da usina</p>
                    </S.MiniCard>
                    <S.MiniCard color="#107B49">
                        <img src="/pegada_carbono.png" alt="" />
                        <S.TitleCard>{impactoAmbiental.pegadaCarbono} </S.TitleCard>
                        <p>Redução na pegada de carbono</p>
                    </S.MiniCard>
                    <S.MiniCard color="#107B49">
                        <img src="/arvore.png" alt="" />
                        <S.TitleCard>{impactoAmbiental.arvoresPlantadas}</S.TitleCard>
                        <p>Arvores plantadas</p>
                    </S.MiniCard>
                </S.MiniCardsContainer>
                <p style={{textAlign: 'right'}}><i>Voce economiza energia e ainda ajuda a preservar as questões ambientais.</i></p>
                <S.BenefitsContainer>
                    <S.ListBenefits>
                        <S.ListBenefitsItem>
                            <img src="/check.png" alt="" />
                            Garantimos seu desconto todos os meses
                        </S.ListBenefitsItem>
                        <S.ListBenefitsItem>
                            <img src="/check.png" alt="" />
                            Energia limpa, renovavel e acessivel
                        </S.ListBenefitsItem>
                        <S.ListBenefitsItem>
                            <img src="/check.png" alt="" />
                            Contratação digital rápida e segura
                        </S.ListBenefitsItem>
                    </S.ListBenefits>
                    <S.BenefitsCardsContainer>
                        <S.MiniCard width="240px" color="#6900F7">
                            <S.TitleCard>{economia1Ano} </S.TitleCard>
                            <p>Economia estimada em 1 ano</p>
                        </S.MiniCard>
                        <S.MiniCard width="240px">
                            <S.TitleCard>{economia5Anos}</S.TitleCard>
                            <p>Economia estimada em 5 anos</p>
                        </S.MiniCard>
                    </S.BenefitsCardsContainer>
                </S.BenefitsContainer>
                <S.SeloContainer>
                    <S.SeloTitle>
                        Cliente empresa C6 Energy<br /> recebe Selo e Certificado<br/> de energia limpa e renovável
                    </S.SeloTitle>
                    <S.Selo src="/logo_esg.png" alt="" />
                </S.SeloContainer>
                <S.COntainerBtn pdf={renderPdf.toString()}>
                    <SG.Button onClick={handlePdf}>Baixar em PDF</SG.Button>
                    {/* <SG.Button theme='secondary' onClick={() => goToContract(proposal.id)}>Gerar contrato</SG.Button> */}
                </S.COntainerBtn>
            </S.Container>
            <S.Footer>
                <S.Container>
                    <S.boxMapa>
                        <img src="/mapa.png" alt="" />
                        <S.BoxText>atendemos<br/> todo o <br/>territorio<br/> <strong>nacional</strong></S.BoxText>
                    </S.boxMapa>
                    <S.FooterBottomContainer>
                        <S.FooterTop>
                            <S.Footerimg src="/energia_limpa.png" alt="" />
                            <S.FooterTopTitle pdf={renderPdf.toString()}>
                                Sua parceria em <strong>energia limpa</strong> economica
                            </S.FooterTopTitle>
                        </S.FooterTop>
                        <S.FooterBottom>
                            <S.LogosRenovaveis src="/logos_renovaveis.png" alt="" />
                            <S.FooterBottomTitle>
                                <S.FooterBottomNumber>
                                    <img src="/icon-whatsapp.png" alt="" /> (11) 93908-0968
                                </S.FooterBottomNumber>
                                contato@c6energy.com.br
                                www.c6energy.com.br
                            </S.FooterBottomTitle>
                        </S.FooterBottom>
                    </S.FooterBottomContainer>
                    
                    
                </S.Container>
            </S.Footer>
        </S.ContainerGeral>
        </>
    )
}
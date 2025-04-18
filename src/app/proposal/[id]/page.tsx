'use client'
  
import useProposal from "@/app/hooks/useProposal"
import * as S from './style'
import Loading from "@/app/components/Loading";

function calcularImpactoAmbiental(valorContaMensal: number) {
    const precoPorKWh = 0.90; // R$/kWh
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
    console.log('valor', valor)
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
    
    return (
        <>
            <S.Header>
                <S.Branding>
                    <img src="https://c6energy.com.br/wp-content/uploads/2024/08/logo-c6-energy-colorido2-copiar.webp" alt="" />
                    <S.BrandingText>A Maior inteligencia de energia do Brasil </S.BrandingText>
                </S.Branding>
                <S.HeadingContact>
                    <p>C6 ENERGY | 45.506.222/0001-19</p>
                    <p>ENDEREÇO: Rua Brás Cuba, 107 SALA A 22</p>
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
                        <S.TitleCard>{proposal.user.energy_value}</S.TitleCard>
                        <p>Voce pagaa atualmente em media sem a c6</p>
                    </S.MiniCard>
                    <S.MiniCard color="#6900F7">
                        <S.TitleCard>{impactoAmbiental.kwhMes} KWH</S.TitleCard>
                        <p>Sua participação em cota da usina</p>
                    </S.MiniCard>
                    <S.MiniCard color="#107B49">
                        <S.TitleCard>{impactoAmbiental.pegadaCarbono} </S.TitleCard>
                        <p>Redução na pegada de carbono</p>
                    </S.MiniCard>
                    <S.MiniCard color="#107B49">
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
            </S.Container>
        </>
    )
}
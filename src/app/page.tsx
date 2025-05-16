'use client'

import { useEffect, useState } from "react";
import * as S from './style'
import { useRouter } from "next/navigation";
import { converterParaFloat, formatCpfCnpj, formatCurrency, formatPhoneNumber } from "./utils";
const estados = [
  { sigla: 'AC', 
    distribuidoras: [
      { nome: "Energisa AC", desconto: "5%", cdt: 'AX152' }
    ]
   },
  { sigla: 'AL', 
    distribuidoras: [
      { nome: "Equatorial AL", desconto: "10%", cdt: 'MX60' }
    ]
   },
  { sigla: 'AM', 
    distribuidoras: [
      { nome: "Amazonas Energia", desconto: "15%", cdt: 'GD159' }
    ]
   },
  { sigla: 'AP', 
    distribuidoras: [
      { nome: "CEA Equatorial", desconto: "5%", cdt: 'AX152' }
    ]
   },
  { sigla: 'BA', 
    distribuidoras: [
      { nome: "Neoenergia Coelba", desconto: "15%", cdt: 'OR153' }
    ]
   },
  { sigla: 'CE', 
    distribuidoras: [
      { nome: "Enel CE", desconto: "15%", cdt: 'OR153' }
    ]
   },
  { sigla: 'DF', 
    distribuidoras: [
      { nome: "Neoenergia Brasília", desconto: "15%", cdt: 'GD159' }
    ]
   },
  { sigla: 'ES', 
    distribuidoras: [
      { nome: "EDP ES", desconto: "15%", cdt: 'GD159' },
      { nome: "ELFSM", desconto: "5%", cdt: 'AX152' }
    ]
   },
  { sigla: 'GO', 
    distribuidoras: [
      { nome: "Enel GO (Equatorial)", desconto: "15%", cdt: 'OR153' },
      { nome: "Chesp", desconto: "5%", cdt: 'AX152' }
    ]
   },
  { sigla: 'MA', 
    distribuidoras: [
      { nome: "Equatorial MA", desconto: "10%", cdt: 'OR153' },
    ]
   },
  { sigla: 'MG', 
    distribuidoras: [
      { nome: "Cemig-D", desconto: "18%", cdt: 'OR153' },
      { nome: "DMED", desconto: "5%", cdt: 'AX152' },
      { nome: "Energisa MG", desconto: "5%", cdt: 'AX152' }
    ]
   },
  { sigla: 'MS', 
    distribuidoras: [
      { nome: "Energisa MS", desconto: "15%", cdt: 'OR153' }
    ]
   },
  { sigla: 'MT', 
    distribuidoras: [
      { nome: "Energisa MT", desconto: "15%", cdt: 'OR153' }
    ]
   },
  { sigla: 'PA', 
    distribuidoras: [
      { nome: "Equatorial PA", desconto: "15%", cdt: 'OR153' }
    ]
   },
  { sigla: 'PB', 
    distribuidoras: [
      { nome: "Energisa Borborema", desconto: "5%", cdt: 'AX152' },
      { nome: "Energisa PB", desconto: "15%", cdt: 'GD159' }
    ]
   },
  { sigla: 'PE', 
    distribuidoras: [
      { nome: "Neoenergia Pernambuco", desconto: "15%", cdt: 'OR153' }
    ]
   },
  { sigla: 'PI', 
    distribuidoras: [
      { nome: "Equatorial PI", desconto: "15%", cdt: 'GD159' }
    ]
   },
  { sigla: 'PR', 
    distribuidoras: [
      { nome: "Castro - DIS", desconto: "10%", cdt: 'AX152' },
      { nome: "Ceral DIS", desconto: "10%", cdt: 'AX152'  },
      { nome: "Cocel", desconto: "10%", cdt: 'AX152'  },
      { nome: "Copel-DIS", desconto: "15%", cdt: 'GD159' },
      { nome: "Forcel", desconto: "10%", cdt: 'AX152' }
    ]
   },
  { sigla: 'RJ',
    distribuidoras: [
      { nome: "CERCI", desconto: "12%", cdt: 'AX152' },
      { nome: "Ceral Araruama", desconto: "12%", cdt: 'AX152' },
      { nome: "Ceres", desconto: "12%", cdt: 'AX152' },
      { nome: "Enel RJ", desconto: "15%", cdt: 'GD159' },
      { nome: "Energisa Nova Friburgo", desconto: "5%", cdt: 'AX152' },
      { nome: "Light", desconto: "5%", cdt: 'AX152' }
    ]
   },
  { sigla: 'RN', 
    distribuidoras: [
      { nome: "Neoenergia Cosern", desconto: "15%", cdt: 'OR153' }
    ]
   },
  { sigla: 'RO', 
    distribuidoras: [
      { nome: "Energisa RO", desconto: "15%", cdt: 'GD159' }
    ]
   },
  { sigla: 'RR', 
    distribuidoras: [
      { nome: "Roraima Energia", desconto: "5%", cdt: 'AX152' }
    ]
   },
  {
    sigla: 'RS',
    distribuidoras: [
      { nome: 'CEEE Equatorial', desconto: '15%', cdt: 'GD159' },
      { nome: 'CELETRO', desconto: '10%', cdt: 'AX152' },
      { nome: 'CERFOX', desconto: '10%', cdt: 'AX152' },
      { nome: 'CERTHIL', desconto: '10%', cdt: 'AX152' },
      { nome: 'COOPERNORTE', desconto: '10%', cdt: 'AX152' },
      { nome: 'COOPERSUL', desconto: '10%', cdt: 'AX152' },
      { nome: 'COPREL', desconto: '10%', cdt: 'AX152' },
      { nome: 'Ceriluz', desconto: '10%', cdt: 'AX152' },
      { nome: 'Cermissões', desconto: '10%', cdt: 'AX152' },
      { nome: 'Certaja', desconto: '10%', cdt: 'AX152' },
      { nome: 'Certel', desconto: '10%', cdt: 'AX152' },
      { nome: 'Cooperluz', desconto: '10%', cdt: 'AX152' },
      { nome: 'Creluz-D', desconto: '10%', cdt: 'AX152' },
      { nome: 'Creral', desconto: '10%', cdt: 'AX152' },
      { nome: 'Demei', desconto: '10%', cdt: 'AX152' },
      { nome: 'Eletrocar', desconto: '15%', cdt: 'GD159' },
      { nome: 'Hidropan', desconto: '10%', cdt: 'AX152' },
      { nome: 'MuxEnergia', desconto: '10%', cdt: 'AX152' },
      { nome: 'Nova Palma', desconto: '10%', cdt: 'AX152' },
      { nome: 'RGE', desconto: '15%', cdt: 'GD159' }
    ]
  },
  {
    sigla: 'SC',
    distribuidoras: [
      { nome: 'CEGERO', desconto: '10%', cdt: 'AX152' },
      { nome: 'COOPERZEM', desconto: '10%', cdt: 'AX152' },
      { nome: 'Cejama', desconto: '10%', cdt: 'AX152' },
      { nome: 'Celesc-DIS', desconto: '15%', cdt: 'GD159' },
      { nome: 'Ceprag', desconto: '10%', cdt: 'AX152' },
      { nome: 'Ceral Anitápolis', desconto: '10%', cdt: 'AX152' },
      { nome: 'Ceraça', desconto: '10%', cdt: 'AX152' },
      { nome: 'Cerbranorte', desconto: '10%', cdt: 'AX152' },
      { nome: 'Cerej', desconto: '10%', cdt: 'AX152' },
      { nome: 'Cergal', desconto: '10%', cdt: 'AX152' },
      { nome: 'Cergapa', desconto: '10%', cdt: 'AX152' },
      { nome: 'Cergral', desconto: '10%', cdt: 'AX152' },
      { nome: 'Cermoful', desconto: '10%', cdt: 'AX152' },
      { nome: 'Cerpalo', desconto: '10%', cdt: 'AX152' },
      { nome: 'Cersad', desconto: '10%', cdt: 'AX152' },
      { nome: 'Cersul', desconto: '10%', cdt: 'AX152' },
      { nome: 'Certrel', desconto: '10%', cdt: 'AX152' },
      { nome: 'Codesam', desconto: '10%', cdt: 'AX152' },
      { nome: 'Coopera', desconto: '10%', cdt: 'AX152' },
      { nome: 'Cooperaliança', desconto: '10%', cdt: 'AX152' },
      { nome: 'Coopercocal', desconto: '10%', cdt: 'AX152' },
      { nome: 'Coopermila', desconto: '10%', cdt: 'AX152' },
      { nome: 'Coorsel', desconto: '10%', cdt: 'AX152' },
      { nome: 'Dcelt', desconto: '15%', cdt: 'GD159' },
      { nome: 'EFLJC', desconto: '10%', cdt: 'AX152' },
      { nome: 'Eflul', desconto: '10%', cdt: 'AX152' }
    ]
  },
  {
    sigla: 'SE',
    distribuidoras: [
      { nome: 'Cercos', desconto: '5%', cdt: 'AX152' },
      { nome: 'Energisa SE', desconto: '15%', cdt: 'GD159' },
      { nome: 'Sulgipe', desconto: '5%', cdt: 'AX152' }
    ]
  },
  { sigla: 'SP',
    distribuidoras: [
      { nome: "CERVAM", desconto: "15%", cdt: 'AX152' },
      { nome: "Cedrap", desconto: "15%", cdt: 'AX152' },
      { nome: "Cedri", desconto: "15%", cdt: 'AX152' },
      { nome: "Cemirim", desconto: "15%", cdt: 'AX152' },
      { nome: "Neoenergia Elektro", desconto: "15%", cdt: 'SM155' },
      { nome: "CERMC", desconto: "10%", cdt: 'AX152' },
      { nome: "CERRP", desconto: "10%", cdt: 'AX152' },
      { nome: "CPFL Paulista", desconto: "15%", cdt: 'OR153' },
      { nome: "CPFL Piratininga", desconto: "14%", cdt: 'IN154' },
      { nome: "Cerim", desconto: "10%", cdt: 'AX152' },
      { nome: "Cerpro", desconto: "10%", cdt: 'AX152' },
      { nome: "Cetril", desconto: "10%", cdt: 'AX152' },
      { nome: "EDP SP", desconto: "10%", cdt: 'AX152' },
      { nome: "CPFL Santa Cruz", desconto: "15%", cdt: 'GD159' },
      { nome: "Ceripa", desconto: "5%", cdt: 'AX152' },
      { nome: "Ceris", desconto: "5%", cdt: 'AX152' },
      { nome: "Cernhe", desconto: "5%", cdt: 'AX152' },
      { nome: "ESS", desconto: "15%", cdt: 'GD159' },
      // { nome: "Enel SP", desconto: "5%" }
    ] 
  },
  { sigla: 'TO', distribuidoras: [
      { nome: 'Energisa TO', desconto: '15%', cdt: 'OR153' }
    ] 
  }
];

interface FaixaDesconto {
  limite: number; 
  descontos: Record<string, string>;
}

const tabelaDescontos: FaixaDesconto[] = [
  {
    limite: 2000,
    descontos: {
      "Neoenergia Coelba": "15%",
      "Enel CE": "15%",
      "Enel GO (Equatorial)": "15%",
      "Equatorial MA": "10%",
      "Cemig-D": "18%",
      "Energisa MS": "15%",
      "Energisa MT": "15%",
    },
  },
  {
    limite: 3000,
    descontos: {
      "Neoenergia Coelba": "18%",
      "Enel CE": "18%",
      "Enel GO (Equatorial)": "18%",
      "Equatorial MA": "10%",
      "Cemig-D": "20%",
      "Energisa MS": "18%",
      "Energisa MT": "18%",
    },
  },
  {
    limite: 5000,
    descontos: {
      "Neoenergia Coelba": "18%",
      "Enel CE": "18%",
      "Enel GO (Equatorial)": "18%",
      "Equatorial MA": "15%",
      "Cemig-D": "22%",
      "Energisa MS": "18%",
      "Energisa MT": "18%",
    },
  },
  {
    limite: 10000,
    descontos: {
      "Neoenergia Coelba": "25%",
      "Enel CE": "25%",
      "Enel GO (Equatorial)": "25%",
      "Equatorial MA": "15%",
      "Cemig-D": "25%",
      "Energisa MS": "25%",
      "Energisa MT": "25%",
    },
  },
  {
    limite: 15000,
    descontos: {
      "Neoenergia Coelba": "25%",
      "Enel CE": "25%",
      "Enel GO (Equatorial)": "25%",
      "Equatorial MA": "15%",
      "Cemig-D": "25%",
      "Energisa MS": "25%",
      "Energisa MT": "25%",
    },
  },
  {
    limite: 25000,
    descontos: {
      "Cemig-D": "25%",
      "Energisa MS": "25%",
      "Energisa MT": "25%",
    },
  },
  {
    limite: 30000,
    descontos: {
      "Neoenergia Coelba": "25%",
      "Enel CE": "25%",
      "Enel GO (Equatorial)": "25%",
      "Equatorial MA": "15%",
      "Cemig-D": "25%",
      "Energisa MS": "25%",
      "Energisa MT": "25%",
    },
  },
  {
    limite: 50000,
    descontos: {
      "Neoenergia Coelba": "25%",
      "Enel CE": "25%",
      "Enel GO (Equatorial)": "25%",
      "Equatorial MA": "15%",
      "Cemig-D": "25%",
      "Energisa MS": "25%",
      "Energisa MT": "25%",
    },
  },
  {
    limite: 100000,
    descontos: {
      "Neoenergia Coelba": "25%",
      "Enel CE": "25%",
      "Enel GO (Equatorial)": "25%",
      "Equatorial MA": "15%",
      "Cemig-D": "25%",
      "Energisa MS": "25%",
      "Energisa MT": "25%",
    },
  },
];

function buscarDesconto(nome: string, valor: number, descontoPadrao: string): string {
  for (let i = tabelaDescontos.length - 1; i >= 0; i--) {
    if (valor >= tabelaDescontos[i].limite) {
      const desconto = tabelaDescontos[i].descontos[nome];
      return desconto || descontoPadrao;
    }
  }

  return descontoPadrao;
}



export interface FormData {
  nome: string;
  whatsapp: string;
  email?: string;
  estado: string;
  cidade?: string;
  distribuidora: string;
  valor: string;
  desconto?: string
  ref?: string
}



interface FormProps {
  formData: FormData
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  loading: boolean;
  descontoText: string
}

interface ResponseProps {
  desconto: number
  valorDesconto: string | number
  valorDescontoMes: string | number
  goToProposal: () => void
  goToContract: () => void
}

const Response = ({desconto, valorDesconto, valorDescontoMes, goToProposal, goToContract}: ResponseProps) => {

  return (
    <S.ContainerResponse>
      <S.Titulo style={{fontSize: '43px'}}>
        Você <S.Selecionado>economizará {desconto}% </S.Selecionado> ao mês, no valor de <S.Selecionado>{valorDescontoMes}</S.Selecionado>, totalizando <S.Selecionado>{valorDesconto}</S.Selecionado> ao ano de desconto.
      </S.Titulo>
      <S.CompanyDescription>O valor estimado é baseado na Geração Distribuída. Para o mercado livre de energia (alta tensão), o desconto pode chegar a 35%.</S.CompanyDescription>
      <div style={{display: 'flex', width: '100%', gap: 20}}>
        <S.Button type="button" onClick={goToProposal} style={{border: '2px solid #FF5E00', background: 'transparent'}}>
          Simulação em PDF
        </S.Button>
        {/* <S.Button type="button" onClick={goToContract}>
          Preencher Proposta
        </S.Button> */}
      </div>
    </S.ContainerResponse>
  )
}

const Form = ({formData, handleChange, loading, descontoText}: FormProps) => {
  const [estadoSelected, setEstado] = useState<string | null>(null)

  const handle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEstado(event.target.value)
    handleChange(event)
  }

  const estadoSelectedIndex = estados.findIndex(e => e.sigla === estadoSelected)
  return (
    <>
      <S.Titulo><S.Selecionado>Simule agora</S.Selecionado> e veja quanto você pode economizar</S.Titulo>
      <S.FormFields>

        <S.Col6>
          <S.Input type="text" name="nome" required placeholder="Digite seu nome" value={formData.nome} onChange={handleChange} />
        </S.Col6>

        <S.Col6>
          <S.Input type="text" name="whatsapp" required placeholder="Digite seu whatsapp" maxLength={15} value={formData.whatsapp} onChange={handleChange} />
        </S.Col6>

        {/* <S.Col12>
          <S.Input type="email" name="email" required placeholder="Digite seu melhor email" value={formData.email} onChange={handleChange} />
        </S.Col12> */}

        <S.Col6>
          <S.Select name="estado" id="estado" required value={formData.estado} onChange={handle}>
            <option value="">Selecione seu estado</option>
            {
              estados.map(estado => (
                <option key={estado.sigla}>{estado.sigla}</option>
              ))
            }
          </S.Select>
        </S.Col6>

        {/* <S.Col6>
          <S.Input type="text" name="cidade" required placeholder="Sua cidade" value={formData.cidade} onChange={handleChange} />
        </S.Col6> */}

        <S.Col6>
        <S.Select name="distribuidora" id="distribuidora" required value={formData.distribuidora} onChange={handleChange}>
            <option value="">Selecione a distribuidora</option>
            {
              estadoSelectedIndex >= 0 && estados[estadoSelectedIndex].distribuidoras.map(dis => (
                <option key={dis.nome}>{dis.nome}</option>
              ))
            }
          </S.Select>
        </S.Col6>
        
        <S.Col12 style={{marginTop: 20}}>
          <S.Label>Qual o valor médio da sua conta de luz por mês?</S.Label>
          <S.Input type="text" name="valor" required placeholder="Digite o valor R$ 0,00" value={formData.valor} onChange={handleChange} />
          <S.Small>Ao continuar você concorda em receber contato da C6 Energy e com os <S.LinkStyled href="https://c6energy.com.br/politica-de-privacidade/" target="_blank">Termos e Condições.</S.LinkStyled></S.Small>
        </S.Col12>
          <S.Button type="submit" disabled={loading}>
            {descontoText}
            <img src="/icon.svg" alt="" />
          </S.Button>
        
      </S.FormFields>
    </>
  )
}


interface RenderFormsProps {
  desconto: number
  valorDesconto: string | number
  valorDescontoMes: string | number
  loading: boolean
  formData: FormData
  descontoText: string
  goToProposal: () => void
  goToContract: () => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

function RenderForms({
    valorDesconto, 
    valorDescontoMes, 
    goToProposal, 
    goToContract,
    handleChange, 
    loading, 
    formData, 
    descontoText,
  }: RenderFormsProps) {
  if(valorDesconto && valorDescontoMes) {
      const estadoValue = document.querySelector("#estado") as HTMLInputElement
      const distribuidoraValue = document.querySelector("#distribuidora") as HTMLInputElement
      const estado = estados.findIndex(e => e.sigla === estadoValue.value)
      const distribuidora = estados[estado].distribuidoras.findIndex(d => d.nome === distribuidoraValue.value)
      const distribuidoraData = estados[estado].distribuidoras[distribuidora]
      const valorForNumber = converterParaFloat(formData.valor)
      const descontoAplicado = buscarDesconto(distribuidoraData.nome, valorForNumber, distribuidoraData.desconto)
      const descontoFormat = Number(descontoAplicado.replace("%", ""))
    return <Response goToProposal={goToProposal} goToContract={goToContract} desconto={descontoFormat} valorDesconto={valorDesconto} valorDescontoMes={valorDescontoMes} />
  }
  
  return <Form descontoText={descontoText} loading={loading} handleChange={handleChange} formData={formData} />
}


export default function Home() {
  const [desconto, setDesconto] = useState(0)
  const [ref, setRef] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    whatsapp: "",
    email: "",
    estado: "",
    cidade: "",
    distribuidora: "",
    valor: "",
  });

  const [valorDesconto, setValorDesconto] = useState<string | number>(0)
  const [valorDescontoMes, setValorDescontoMes] = useState<string | number>(0)
  const [proposal, setProposal] = useState<string | null>(null)

  const route = useRouter()

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    let  valueFormat = value

    if(name === 'whatsapp') {
      valueFormat = formatPhoneNumber(value)
    }

    if(name === 'valor') {
      valueFormat = formatCurrency(value)
    }
    if(name === 'distribuidora') {
      const estado = estados.findIndex(e => e.sigla === formData.estado)
      const distribuidora = estados[estado].distribuidoras.findIndex(d => d.nome === value)
      const distribuidoraData = estados[estado].distribuidoras[distribuidora]
      const desconto = distribuidoraData.desconto.replace("%", "")
     
      setDesconto(Number(desconto))
    }
    setFormData((prev) => ({ ...prev, [name]: valueFormat }));
  }

  async function send() {
    await fetch("/api/post-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: formData.nome,
        whatsapp: formData.whatsapp,
        state: formData.estado,
        value: formData.valor,
        distribuidora: formData.distribuidora,
        discount: `${desconto}%`,
        ref: ref
      })
      
    })
    .then(response => {
      return response.json()
    })
    .then((response) => {
      const valorForNumber = converterParaFloat(formData.valor);

      const distribuidoraValue = document.querySelector("#distribuidora") as HTMLInputElement
      const estado = estados.findIndex(e => e.sigla === formData.estado)
      const distribuidora = estados[estado].distribuidoras.findIndex(d => d.nome === distribuidoraValue.value)
      const distribuidoraData = estados[estado].distribuidoras[distribuidora]
      const descontoAplicado = buscarDesconto(distribuidoraData.nome, valorForNumber, distribuidoraData.desconto)
      const descontoFormat = Number(descontoAplicado.replace("%", ""))
      
      const percent = descontoFormat / 100; 
      const descontoMensal = valorForNumber * percent; 
      const descontoArredondado = parseFloat(descontoMensal.toFixed(2)); 

      const descontoAnual = descontoArredondado * 12; 

      const totalAplicado = formatCurrency(descontoAnual.toFixed(2).replace(".", ","));
      const totalAplicadoMes = formatCurrency(descontoArredondado.toFixed(2).replace(".", ","));
      setValorDescontoMes(totalAplicadoMes);
      setValorDesconto(totalAplicado); 
      setProposal(response.data.id)
    })
    .finally(() => {
      setLoading(false)
    });
  }


  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true)
    
    setTimeout(async () => {
      await send()
    }, 500)
    
  }

  const goToWhatsApp = () => {
    const numero = "5511939080968";
    const mensagem =  `Olá! Vim do site da C6 Energy e gostaria de saber mais sobre como economizar até ${desconto === 0 ? '35%' : desconto}% na minha conta de energia. Poderia me ajudar? 😊`;
    const mensagemCodificada = encodeURIComponent(mensagem);
    const linkWhatsApp = `https://wa.me/${numero}?text=${mensagemCodificada}`;
    window.location.href = linkWhatsApp
  }


  const goToProposal = () => {
    if(proposal) {
      route.push(`/proposal/${proposal}`)
    }
  }

  const goToContract = () => {
    if(proposal) {
      route.push(`/contract/${proposal}`)
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    if(ref) {
      setRef(ref)
    }
    document.body.style.background = '#6800F5'
    return () => {
        document.body.style.background = '';
    }
  }, [])

  const descontoText = loading ? 'Simulando...' : 'Ver meu desconto agora'

  return (
    <>
    <S.Container>
      <S.ImageWrapper>
        <S.Image src="/image.jpeg" alt="" />
      </S.ImageWrapper>
      
    <S.Form onSubmit={handleSubmit}>
       <RenderForms 
          desconto={desconto} 
          descontoText={descontoText} 
          formData={formData} 
          goToProposal={goToProposal}
          goToContract={goToContract}
          handleChange={handleChange} 
          loading={loading}
          valorDesconto={valorDesconto}
          valorDescontoMes={valorDescontoMes}
        />

    </S.Form>
    </S.Container>
    <S.Footer>
      <S.FooterContainer>
      <S.Company>
        <S.LinkStyled href="https://c6energy.com.br/" target="_blank">
          <S.Logo src="https://c6energy.com.br/wp-content/uploads/2024/08/logo-c6-energy-colorido2-copiar.webp" alt="" />
        </S.LinkStyled>
        <S.CompanyDescription>Aqui na C6 Energy proporcionamos economia e previsibilidade na sua conta de energia, sem burocracia ou necessidade de obras e manutenção.</S.CompanyDescription>
        <S.Social>
          <S.LinkStyled href="https://www.instagram.com/c6_energy/" target="_blank">
            <img src="/instagram.svg" alt="" />
          </S.LinkStyled>
          <S.LinkStyled href="https://www.linkedin.com/company/c6-energy-br/about/?viewAsMember=true" target="_blank">
            <img src="/linkedin.svg" alt="" />
          </S.LinkStyled>
          <S.LinkStyled href="https://www.facebook.com/c6energyfb" target="_blank">
            <img src="/facebook.svg" alt="" />
          </S.LinkStyled>
          <S.LinkStyled href="https://www.google.com/search?q=C6+Energy&stick=H4sIAAAAAAAA_-NgU1I1qLA0SU41tbS0SE4xNLFMtkyxMqhItLC0SLKwsEw1MDUxMDc0WsTK6Wym4JqXWpReCQCPTM0hNQAAAA&hl=pt-BR&mat=CcR1DiCIe8IeElYBEKoLaUv3m2bPQh-hQyCrTjSLg5cmCxvKUqIEOUKjuAo-1t_7L-rpB4wEv4hfw39zpTMt-RO8WB9cukz_9jfaVfQ-pNUUxodzKLbIuzN94mDpeXcIfw&authuser=0" target="_blank">
            <img src="/google.svg" alt="" />
          </S.LinkStyled>
        </S.Social>
      </S.Company>
      <S.Contact>
        <S.Label>Fale consoco</S.Label>

        <S.ContactItem onClick={goToWhatsApp}>
          <img src="/whatsapp.svg" alt="" />
            (11) 9 3908-0968
        </S.ContactItem>

        <S.ContactItem href="mailto:contato@c6energy.com.br">
          <img src="/email.svg" alt="" />
          contato@c6energy.com.br
        </S.ContactItem>

        <S.ContactItem>
          <img src="/horario.svg" alt="" />
          Atendimento a partir das 09h até as 22h
        </S.ContactItem>

        <S.ContactItem href="https://www.google.com/search?q=C6+Energy&stick=H4sIAAAAAAAA_-NgU1I1qLA0SU41tbS0SE4xNLFMtkyxMqhItLC0SLKwsEw1MDUxMDc0WsTK6Wym4JqXWpReCQCPTM0hNQAAAA&hl=pt-BR&mat=CcR1DiCIe8IeElYBEKoLaUv3m2bPQh-hQyCrTjSLg5cmCxvKUqIEOUKjuAo-1t_7L-rpB4wEv4hfw39zpTMt-RO8WB9cukz_9jfaVfQ-pNUUxodzKLbIuzN94mDpeXcIfw&authuser=0" target="_blank">
          <img src="/email.svg" alt="" />
          R. Dr. Bráulio Gomes, 107 - 01047-020, São Paulo, SP
        </S.ContactItem>
      </S.Contact>
      </S.FooterContainer>
      <S.FooterCopy>
      Todos os Direitos Reservados | Copyright © 2025| C6 ENERGY LTDA - CNPJ 45.506.222/0001-19
      <S.LinkStyled href="https://wa.me/?text=Confira%20este%20PDF:%20https://localhost:5173/conta-pdf.pdf" target="_blank">
    Compartilhar no WhatsApp
</S.LinkStyled>

    </S.FooterCopy>
    </S.Footer>
   
    <S.WhatsappButton onClick={goToWhatsApp}>
      <img src="/whatsapp.svg" alt="" />
    </S.WhatsappButton>
    </>
  );
}

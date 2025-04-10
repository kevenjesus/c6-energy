'use client'

import { useEffect, useState } from "react";
import * as S from './style'
import { useRouter } from "next/navigation";
const estados = [
  { sigla: 'AC', 
    distribuidoras: [
      { nome: "Energisa AC", desconto: "5%" }
    ]
   },
  { sigla: 'AL', 
    distribuidoras: [
      { nome: "Equatorial AL", desconto: "10%" }
    ]
   },
  { sigla: 'AM', 
    distribuidoras: [
      { nome: "Amazonas Energia", desconto: "5%" }
    ]
   },
  { sigla: 'AP', 
    distribuidoras: [
      { nome: "CEA Equatorial", desconto: "5%" }
    ]
   },
  { sigla: 'BA', 
    distribuidoras: [
      { nome: "Neoenergia Coelba", desconto: "10%" }
    ]
   },
  { sigla: 'CE', 
    distribuidoras: [
      { nome: "Enel CE", desconto: "10%" }
    ]
   },
  { sigla: 'DF', 
    distribuidoras: [
      { nome: "Neoenergia Brasília", desconto: "10%" }
    ]
   },
  { sigla: 'ES', 
    distribuidoras: [
      { nome: "EDP ES", desconto: "10%" },
      { nome: "ELFSM", desconto: "5%" }
    ]
   },
  { sigla: 'GO', 
    distribuidoras: [
      { nome: "Enel GO (Equatorial)", desconto: "10%" },
      { nome: "Chesp", desconto: "5%" }
    ]
   },
  { sigla: 'MA', 
    distribuidoras: [
      { nome: "Energisa MS", desconto: "10%" }
    ]
   },
  { sigla: 'MG', 
    distribuidoras: [
      { nome: "Cemig-D", desconto: "20%" },
      { nome: "DMED", desconto: "5%" },
      { nome: "Energisa MG", desconto: "5%" }
    ]
   },
  { sigla: 'MS', 
    distribuidoras: [
      { nome: "Energisa MS", desconto: "10%" }
    ]
   },
  { sigla: 'MT', 
    distribuidoras: [
      { nome: "Energisa MT", desconto: "10%" }
    ]
   },
  { sigla: 'PA', 
    distribuidoras: [
      { nome: "Equatorial PA", desconto: "10%" }
    ]
   },
  { sigla: 'PB', 
    distribuidoras: [
      { nome: "Energisa Borborema", desconto: "5%" },
      { nome: "Energisa PB", desconto: "5%" }
    ]
   },
  { sigla: 'PE', 
    distribuidoras: [
      { nome: "Neoenergia Pernambuco", desconto: "10%" }
    ]
   },
  { sigla: 'PI', 
    distribuidoras: [
      { nome: "Equatorial PI", desconto: "10%" }
    ]
   },
  { sigla: 'PR', 
    distribuidoras: [
      { nome: "Castro - DIS", desconto: "10%" },
      { nome: "Ceral DIS", desconto: "10%" },
      { nome: "Cocel", desconto: "10%" },
      { nome: "Copel-DIS", desconto: "10%" },
      { nome: "Forcel", desconto: "10%" }
    ]
   },
  { sigla: 'RJ',
    distribuidoras: [
      { nome: "CERCI", desconto: "12%" },
      { nome: "Ceral Araruama", desconto: "12%" },
      { nome: "Ceres", desconto: "12%" },
      { nome: "Enel RJ", desconto: "12%" },
      { nome: "Energisa Nova Friburgo", desconto: "5%" },
      { nome: "Light", desconto: "5%" }
    ]
   },
  { sigla: 'RN', 
    distribuidoras: [
      { nome: "Neoenergia Cosern", desconto: "10%" }
    ]
   },
  { sigla: 'RO', 
    distribuidoras: [
      { nome: "Energisa RO", desconto: "5%" }
    ]
   },
  { sigla: 'RR', 
    distribuidoras: [
      { nome: "Roraima Energia", desconto: "5%" }
    ]
   },
  {
    sigla: 'RS',
    distribuidoras: [
      { nome: 'CEEE Equatorial', desconto: '10%' },
      { nome: 'CELETRO', desconto: '10%' },
      { nome: 'CERFOX', desconto: '10%' },
      { nome: 'CERTHIL', desconto: '10%' },
      { nome: 'COOPERNORTE', desconto: '10%' },
      { nome: 'COOPERSUL', desconto: '10%' },
      { nome: 'COPREL', desconto: '10%' },
      { nome: 'Ceriluz', desconto: '10%' },
      { nome: 'Cermissões', desconto: '10%' },
      { nome: 'Certaja', desconto: '10%' },
      { nome: 'Certel', desconto: '10%' },
      { nome: 'Cooperluz', desconto: '10%' },
      { nome: 'Creluz-D', desconto: '10%' },
      { nome: 'Creral', desconto: '10%' },
      { nome: 'Demei', desconto: '10%' },
      { nome: 'Eletrocar', desconto: '10%' },
      { nome: 'Hidropan', desconto: '10%' },
      { nome: 'MuxEnergia', desconto: '10%' },
      { nome: 'Nova Palma', desconto: '10%' },
      { nome: 'RGE', desconto: '10%' }
    ]
  },
  {
    sigla: 'SC',
    distribuidoras: [
      { nome: 'CEGERO', desconto: '10%' },
      { nome: 'COOPERZEM', desconto: '10%' },
      { nome: 'Cejama', desconto: '10%' },
      { nome: 'Celesc-DIS', desconto: '10%' },
      { nome: 'Ceprag', desconto: '10%' },
      { nome: 'Ceral Anitápolis', desconto: '10%' },
      { nome: 'Ceraça', desconto: '10%' },
      { nome: 'Cerbranorte', desconto: '10%' },
      { nome: 'Cerej', desconto: '10%' },
      { nome: 'Cergal', desconto: '10%' },
      { nome: 'Cergapa', desconto: '10%' },
      { nome: 'Cergral', desconto: '10%' },
      { nome: 'Cermoful', desconto: '10%' },
      { nome: 'Cerpalo', desconto: '10%' },
      { nome: 'Cersad', desconto: '10%' },
      { nome: 'Cersul', desconto: '10%' },
      { nome: 'Certrel', desconto: '10%' },
      { nome: 'Codesam', desconto: '10%' },
      { nome: 'Coopera', desconto: '10%' },
      { nome: 'Cooperaliança', desconto: '10%' },
      { nome: 'Coopercocal', desconto: '10%' },
      { nome: 'Coopermila', desconto: '10%' },
      { nome: 'Coorsel', desconto: '10%' },
      { nome: 'Dcelt', desconto: '10%' },
      { nome: 'EFLJC', desconto: '10%' },
      { nome: 'Eflul', desconto: '10%' }
    ]
  },
  {
    sigla: 'SE',
    distribuidoras: [
      { nome: 'Cercos', desconto: '5%' },
      { nome: 'Energisa SE', desconto: '5%' },
      { nome: 'Sulgipe', desconto: '5%' }
    ]
  },
  { sigla: 'SP',
    distribuidoras: [
      { nome: "CERVAM", desconto: "15%" },
      { nome: "Cedrap", desconto: "15%" },
      { nome: "Cedri", desconto: "15%" },
      { nome: "Cemirim", desconto: "15%" },
      { nome: "Neoenergia Elektro", desconto: "15%" },
      { nome: "CERMC", desconto: "10%" },
      { nome: "CERRP", desconto: "10%" },
      { nome: "CPFL Paulista", desconto: "10%" },
      { nome: "CPFL Piratininga", desconto: "10%" },
      { nome: "Cerim", desconto: "10%" },
      { nome: "Cerpro", desconto: "10%" },
      { nome: "Cetril", desconto: "10%" },
      { nome: "EDP SP", desconto: "10%" },
      { nome: "CPFL Santa Cruz", desconto: "5%" },
      { nome: "Ceripa", desconto: "5%" },
      { nome: "Ceris", desconto: "5%" },
      { nome: "Cernhe", desconto: "5%" },
      { nome: "ESS", desconto: "5%" },
      { nome: "Enel SP", desconto: "5%" }
    ] 
  },
  { sigla: 'TO', distribuidoras: [] }
];

function formatCpfCnpj(value: string): string {
  // Remove tudo que não for número
  const numeric = value.replace(/\D/g, '');

  if (numeric.length <= 11) {
    // Formata como CPF: 000.000.000-00
    return numeric
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2}).*/, '$1.$2.$3-$4');
  } else {
    // Formata como CNPJ: 00.000.000/0000-00
    return numeric
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d{1,2}).*/, '$1.$2.$3/$4-$5');
  }
}


export interface FormData {
  nome: string;
  whatsapp: string;
  email: string;
  estado: string;
  cidade: string;
  distribuidora: string;
  valor: string;
  desconto?: string
}


export interface Form2DataUser {
  id: string;
  zipcode: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  is_company: string;
  document: string;
}
export interface Form2Data {
  id?: string;
  zipcode: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  is_company: string;
  document: string;
  invoice_energy: File | null;
  social_contract: File | null;
  document_file: File | null;
}

interface FormProps {
  formData: FormData
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  loading: boolean;
  descontoText: string
}

interface Form2Props {
  formData: Form2Data
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  loading: boolean;
}

interface ResponseProps {
  desconto: number
  valorDesconto: string | number
  goToWhatsApp: () => void
  goToPdf: () => void
}

const Response = ({desconto, valorDesconto, goToWhatsApp, goToPdf}: ResponseProps) => {
  return (
    <S.ContainerResponse>
      <S.Titulo>
        Você <S.Selecionado>economizará {desconto}% </S.Selecionado> em um ano, totalizando <br/> <S.Selecionado>{valorDesconto}</S.Selecionado> de desconto!
      </S.Titulo>
      <S.CompanyDescription>O valor estimado é baseado na Geração Distribuída. Para o mercado livre de energia (alta tensão), o desconto pode chegar a 35%.</S.CompanyDescription>
      <S.Label>Recebemos sua mensagem, um de nossos consultores entrará em contato com você o mais rápido possível.</S.Label>
      <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
      <S.Button type="button" onClick={goToWhatsApp} style={{border: '2px solid #FF5E00', background: 'transparent'}}>
        <img src="/whatsapp.svg" alt="" />
         entrar em contato agora
      </S.Button>
      <S.Button type="button" onClick={goToPdf}>
         Continuar simulação em PDF
      </S.Button>
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

        <S.Col12>
          <S.Input type="email" name="email" required placeholder="Digite seu melhor email" value={formData.email} onChange={handleChange} />
        </S.Col12>

        <S.Col6>
          <S.Select name="estado" required value={formData.estado} onChange={handle}>
            <option>Selecione seu estado</option>
            {
              estados.map(estado => (
                <option key={estado.sigla}>{estado.sigla}</option>
              ))
            }
          </S.Select>
        </S.Col6>

        <S.Col6>
          <S.Input type="text" name="cidade" required placeholder="Sua cidade" value={formData.cidade} onChange={handleChange} />
        </S.Col6>

        <S.Col12>
        <S.Select name="distribuidora" required value={formData.distribuidora} onChange={handleChange}>
            <option>Selecione a distribuidora</option>
            {
              estadoSelectedIndex >= 0 && estados[estadoSelectedIndex].distribuidoras.map(dis => (
                <option key={dis.nome}>{dis.nome}</option>
              ))
            }
          </S.Select>
        </S.Col12>
        
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

const Form2 = ({formData, handleChange, loading}: Form2Props) => {

  const checkCEP = async () => {
    await fetch(`https://viacep.com.br/ws/${formData.zipcode}/json/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      return response.json()
    })
    .then(response => {
      const fakeEventAddress = {
        target: {
          name: 'address',
          value: response.logradouro,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      const fakeEventNeighborhood = {
        target: {
          name: 'neighborhood',
          value: response.bairro,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      
      handleChange(fakeEventAddress)
      handleChange(fakeEventNeighborhood)
    })
  }

  useEffect(() => {
    if(formData.zipcode.length === 8) {
      checkCEP()
    }
  }, [formData.zipcode])

  const textBtn = loading ? 'Aguarde...' : 'Ver proposta'


  return (
    <>
      <S.Titulo><S.Selecionado>Simule agora</S.Selecionado> e veja quanto você pode economizar</S.Titulo>
      <br />
      <S.FormFields>
        <S.Col12>
          <div style={{display: 'flex', gap: 20}}>
          <S.Label style={{fontSize: 16}}>
            <input type="radio" name="is_company" checked={formData.is_company === 'is_personal'} value={"is_personal"} onChange={handleChange} /> Pessoa fisica
          </S.Label>
          <S.Label style={{fontSize: 16}}>
            <input type="radio" name="is_company" checked={formData.is_company === 'is_company'} value={"is_company"} onChange={handleChange} /> Pessoa juridica
          </S.Label>
          </div>
        </S.Col12>
        <S.Col12>
          <S.Input type="text" name="document" required value={formData.document} placeholder={formData.is_company === 'is_personal' ? 'Digite seu CPF' : 'Digite seu CNPJ'} onChange={handleChange} />
        </S.Col12>
        <S.Col6>
          <S.Input type="number" name="zipcode" required placeholder="Digite seu CEP" value={formData.zipcode} onChange={handleChange} />
        </S.Col6>

        <S.Col6>
          <S.Input type="text" readOnly name="address" placeholder="Logradouro" value={formData.address} />
        </S.Col6>

        <S.Col6>
          <S.Input type="text" name="number" placeholder="Digite o numero" value={formData.number} onChange={handleChange} />
        </S.Col6>

        <S.Col6>
          <S.Input type="text" name="complement" placeholder="Complemento" value={formData.complement} onChange={handleChange} />
        </S.Col6>
        <S.Col12>
          <S.Input type="text" name="neighborhood" readOnly placeholder="Bairro" value={formData.neighborhood} />
        </S.Col12>
        
        <S.Col6>
          <S.Label style={{fontSize: 16}}>Anexar conta de energia</S.Label>
          <S.Input type="file" name="invoice_energy" required style={{width: '100%'}} onChange={handleChange} />
        </S.Col6>
        <S.Col6>
          <S.Label style={{fontSize: 16}}>Anexar {formData.is_company === 'is_personal' ? 'RG ou CNH' : 'Contrato Social'}</S.Label>
          <S.Input type="file" name="document_file" required style={{width: '100%'}} onChange={handleChange} />
        </S.Col6>

        <S.Col12>
          <S.Button type="submit" style={{width: '230px'}}>
            {textBtn}
            <img src="/icon.svg" alt="" />
          </S.Button>
          </S.Col12>
      </S.FormFields>
    </>
  )
}

interface RenderFormsProps {
  desconto: number
  valorDesconto: string | number
  loading: boolean
  formData: FormData
  form2Data: Form2Data
  descontoText: string
  goToWhatsApp: () => void
  goToPdf: () => void
  withPdf: boolean
  handleChange2: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

function RenderForms({valorDesconto, goToWhatsApp, goToPdf, desconto, withPdf, handleChange2, handleChange, loading, formData, form2Data, descontoText}: RenderFormsProps) {
  if(withPdf) {
    return <Form2 formData={form2Data} handleChange={handleChange2} loading={loading} />
  }
  if(valorDesconto) {
    return <Response goToWhatsApp={goToWhatsApp} goToPdf={goToPdf} desconto={desconto} valorDesconto={valorDesconto} />
  }
  
  return <Form descontoText={descontoText} loading={loading} handleChange={handleChange} formData={formData} />
}

export default function Home() {
  const [desconto, setDesconto] = useState(0)
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
  const [form2Data, setForm2Data] = useState<Form2Data>({
    zipcode: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    document: "",
    is_company: 'is_personal',
    social_contract: null,
    invoice_energy: null,
    document_file: null
  });
  const [valorDesconto, setValorDesconto] = useState<string | number>(0)
  const [isOfebas, setOfebas] = useState<boolean | string>(false)
  const [withPdf, setWithPdf] = useState(false)
  const [lead, setLead] = useState(null)

  const route = useRouter()

  function converterParaFloat(valorFormatado: string): number {
    const valorSemSimbolo = valorFormatado.replace("R$", "").trim();
    
   const valorComPonto = valorSemSimbolo.replace(/\./g, "").replace(",", ".");
    
    const valorFloat = parseFloat(valorComPonto);
    
    if (isNaN(valorFloat)) {
        throw new Error("Formato de valor inválido. Esperado: R$ X.XXX,XX");
    }
    
    return valorFloat;
}
 
  const formatPhoneNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 2) {
      return `(${cleaned}`;
    }
    if (cleaned.length <= 7) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    }
    if (cleaned.length <= 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  };

  const formatCurrency = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    const numberValue = Number(cleaned) / 100;
    return numberValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

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
      const desconto = estados[estado].distribuidoras[distribuidora].desconto.replace("%", "")
      setDesconto(Number(desconto))
    }
    setFormData((prev) => ({ ...prev, [name]: valueFormat }));
  }

  function handleChange2(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target as HTMLInputElement
    let valueFormat: string | File | null = value;

    if(name === 'is_company' && form2Data.is_company !== valueFormat) {
      setForm2Data((prev) => ({ ...prev, document: '' }));
    }
    
    if(name === 'document') {
      valueFormat = formatCpfCnpj(value)
    }
    if(name === 'invoice_energy' || name == 'document_file') {
      const file = files?.[0] || null;
      valueFormat = file;
    }
  
    setForm2Data((prev) => ({ ...prev, [name]: valueFormat }));
  }

  async function send() {
    await fetch("/api/post-lead", {
    // await fetch("https://script.google.com/macros/s/AKfycbw1-zsouBUbrHW7h_ihqNiXH4gFb-Da-mE-C6elAikXT3hEs4NeSgvF7YPFiYqI_pxGpA/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: formData.nome,
        whatsapp: formData.whatsapp,
        email: formData.email,
        state: formData.estado,
        city: formData.cidade,
        value: formData.valor,
        distribuidora: formData.distribuidora,
        discount: `${desconto}%`,
        // isOfebas: isOfebas ? isOfebas : ""
      })
      
    })
    .then(response => {
      return response.json()
    })
    .then(response => {
      setLead(response.data.id)
    })
    .finally(() => {
      const valorForNumber = converterParaFloat(formData.valor); 
      const percent = desconto / 100; 
      const descontoMensal = valorForNumber * percent; 
      const descontoArredondado = parseFloat(descontoMensal.toFixed(2)); 

      const descontoAnual = descontoArredondado * 12; 

      const totalAplicado = formatCurrency(descontoAnual.toFixed(2).replace(".", ","));
      setValorDesconto(totalAplicado); // Define o valor formatado
      setLoading(false)
    });
  }

  async function sendPDf() {
    const formDataPost = new FormData()

    formDataPost.append('id', lead || '')
    formDataPost.append('document', form2Data.document)
    formDataPost.append('zipcode', form2Data.zipcode)
    formDataPost.append('address', form2Data.address)
    formDataPost.append('number', form2Data.number)
    formDataPost.append('complement', form2Data.complement)
    formDataPost.append('neighborhood', form2Data.neighborhood)
    formDataPost.append('is_company', form2Data.is_company !== 'is_personal' ? 'true' : 'false')
    
    if(form2Data.invoice_energy) formDataPost.append('invoice_energy', form2Data.invoice_energy);
  
    if(form2Data.document_file) formDataPost.append('document_file', form2Data.document_file);

    await fetch("/api/lead-complete", {
        method: "POST",
        body: formDataPost
      })
      .then(response => {
        return response.json()
      })
      .then(response => {
        console.log(response)
        route.push(`/proposal/${response.data.id}`)
      })
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true)
    
    setTimeout(async () => {
      if(withPdf) {
        await sendPDf()
      }else {
        await send()
      }
      
    }, 500)
    
  }

  const goToWhatsApp = () => {
    const numero = "5511939080968";
    const mensagem =  `Olá! Vim do site da C6 Energy e gostaria de saber mais sobre como economizar até ${desconto}% na minha conta de energia. Poderia me ajudar? 😊`;
    const mensagemCodificada = encodeURIComponent(mensagem);
    const linkWhatsApp = `https://wa.me/${numero}?text=${mensagemCodificada}`;
    window.location.href = linkWhatsApp
  }

  const goToPdf = () => {
    setWithPdf(true)
  }

  const getDesconto = (value: string | null) => {
    const valueNumber = Number(value)
    const descontos = [5,10,13,15,17,18,20,22,24,12.84]
    const descontoPadrao = 24
    const isDescontoOfebas = valueNumber === 12.84
    const isDescontoEnel = valueNumber === 5
    
    if(isDescontoEnel) {
      setOfebas('Enel')
    }

    if(isDescontoOfebas) {
      setOfebas('ofebas')
    }
    
    if(descontos.includes(valueNumber)) {
      return valueNumber
    }
    return descontoPadrao
  }

  useEffect(() => {
    // const urlParams = new URLSearchParams(window.location.search);
    // const promo = urlParams.get('promo');
    // const promodesconto = getDesconto(promo)
    // setDesconto(promodesconto)
    document.body.style = 'background: #6800F5'
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
          form2Data={form2Data} 
          formData={formData} 
          goToPdf={goToPdf} 
          goToWhatsApp={goToWhatsApp} 
          handleChange={handleChange} 
          handleChange2={handleChange2}
          loading={loading}
          valorDesconto={valorDesconto}
          withPdf={withPdf} 
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
          R. Maj. Quedinho, 111 - CJ. 110 - Centro Histórico de São Paulo | SP
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

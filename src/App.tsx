import { useEffect, useState } from "react";
import './app.css'

interface FormData {
  nome: string;
  whatsapp: string;
  email: string;
  estado: string;
  cidade: string;
  valor: string;
}

interface FormProps {
  formData: FormData
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  loading: boolean;
  descontoText: string
}

interface ResponseProps {
  desconto: string
  valorDesconto: string | number
  goToWhatsApp: () => void
}

const Response = ({desconto, valorDesconto, goToWhatsApp}: ResponseProps) => {
  return (
    <div className="container-response">
      <h1 className="titulo">
        Você <span className="selecionado">economizará {desconto}</span> em um ano, totalizando <br/> <span className="selecionado">{valorDesconto}</span> de desconto!
      </h1>
      <p className="company-description">O valor estimado é baseado na Geração Distribuída. Para o mercado livre de energia (alta tensão), o desconto pode chegar a 35%.</p>
      <p className="label">Recebemos sua mensagem, um de nossos consultores entrará em contato com você o mais rápido possível.</p>

      <button className="btn" onClick={goToWhatsApp}>
        <img src="/whatsapp.svg" alt="" />
         entrar em contato agora
      </button>
    </div>
  )
}

const Form = ({formData, handleChange, loading, descontoText}: FormProps) => {
  return (
    <>
      <h1 className="titulo"><span className="selecionado">Simule agora</span> e veja quanto você pode economizar</h1>
      <div className="form-fields">

        <div className="col col-6">
          <input type="text" name="nome" required placeholder="Digite seu nome" value={formData.nome} onChange={handleChange} />
        </div>

        <div className="col col-6">
          <input type="text" name="whatsapp" required placeholder="Digite seu whatsapp" maxLength={15} value={formData.whatsapp} onChange={handleChange} />
        </div>

        <div className="col col-12">
          <input type="email" name="email" required placeholder="Digite seu melhor email" value={formData.email} onChange={handleChange} />
        </div>

        <div className="col col-6">
          <input type="text" name="estado" required placeholder="Seu estado" value={formData.estado} onChange={handleChange} />
        </div>

        <div className="col col-6">
          <input type="text" name="cidade" required placeholder="Sua cidade" value={formData.cidade} onChange={handleChange} />
        </div>
        
        <div className="col col-12" style={{marginTop: 20}}>
          <span className="label">Qual o valor médio da sua conta de luz por mês?</span>
          <input type="text" name="valor" required placeholder="Digite o valor R$ 0,00" value={formData.valor} onChange={handleChange} />
          <small>Ao continuar você concorda em receber contato da C6 Energy e com os <a href="https://c6energy.com.br/politica-de-privacidade/" target="_blank">Termos e Condições.</a></small>
        </div>
          <button className="btn" type="submit" disabled={loading}>
            {descontoText}
            <img src="/icon.svg" alt="" />
          </button>
        
      </div>
    </>
  )
}


export default function App() {
  const [desconto, setDesconto] = useState(24)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    whatsapp: "",
    email: "",
    estado: "",
    cidade: "",
    valor: "",
  });
  const [valorDesconto, setValorDesconto] = useState<string | number>(0)

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
    setFormData((prev) => ({ ...prev, [name]: valueFormat }));
  }

  async function send() {
    await fetch("https://script.google.com/macros/s/AKfycbwwrf6bEzd2iGImjLIAprym19wjpLFgKqOXEChMWHbc--vlvnacCOz7e0TNET-FiZBc9w/exec", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: formData.nome,
        whatsapp: formData.whatsapp,
        email: formData.email,
        state: formData.estado,
        city: formData.cidade,
        value: formData.valor,
        discount: `${desconto}%`
      })
    }).finally(() => {
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

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true)
    
    setTimeout(async () => {
      await send()
    }, 500)
    
  }

  const goToWhatsApp = () => {
    const numero = "5511939080968";
    const mensagem =  `Olá! Vim do site da C6 Energy e gostaria de saber mais sobre como economizar até ${desconto}% na minha conta de energia. Poderia me ajudar? 😊`;
    const mensagemCodificada = encodeURIComponent(mensagem);
    const linkWhatsApp = `https://wa.me/${numero}?text=${mensagemCodificada}`;
    window.location.href = linkWhatsApp
  }

  const getDesconto = (value: string | null) => {
    const valueNumber = Number(value)
    const descontos = [10,13,15,17,18,20,22,24]
    const descontoPadrao = 24
    if(descontos.includes(valueNumber)) {
      return valueNumber
    }
    return descontoPadrao
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const promo = urlParams.get('promo');
    const promodesconto = getDesconto(promo)
    setDesconto(promodesconto)
    
  }, [])

  const descontoText = loading ? 'Simulando...' : 'Ver meu desconto agora'


  return (
    <>
    <div className="container">
      <div className="image">
        <img src="/image.jpeg" alt="" />
      </div>
      
    <form onSubmit={handleSubmit} className="form">
      {
        valorDesconto ? <Response goToWhatsApp={goToWhatsApp} desconto={`${desconto}%`} valorDesconto={valorDesconto} /> : <Form descontoText={descontoText} loading={loading} handleChange={handleChange} formData={formData} />
      }

    </form>
    </div>
    <footer>
      <div className="footer-container">
      <div className="company">
        <a href="https://c6energy.com.br/" target="_blank">
          <img className="logo" src="https://c6energy.com.br/wp-content/uploads/2024/08/logo-c6-energy-colorido2-copiar.webp" alt="" />
        </a>
        <p className="company-description">Aqui na C6 Energy proporcionamos economia e previsibilidade na sua conta de energia, sem burocracia ou necessidade de obras e manutenção.</p>
        <div className="social">
          <a href="https://www.instagram.com/c6_energy/" target="_blank">
            <img src="/instagram.svg" alt="" />
          </a>
          <a href="https://www.linkedin.com/company/c6-energy-br/about/?viewAsMember=true" target="_blank">
            <img src="/linkedin.svg" alt="" />
          </a>
          <a href="https://www.facebook.com/c6energyfb" target="_blank">
            <img src="/facebook.svg" alt="" />
          </a>
          <a href="https://www.google.com/search?q=C6+Energy&stick=H4sIAAAAAAAA_-NgU1I1qLA0SU41tbS0SE4xNLFMtkyxMqhItLC0SLKwsEw1MDUxMDc0WsTK6Wym4JqXWpReCQCPTM0hNQAAAA&hl=pt-BR&mat=CcR1DiCIe8IeElYBEKoLaUv3m2bPQh-hQyCrTjSLg5cmCxvKUqIEOUKjuAo-1t_7L-rpB4wEv4hfw39zpTMt-RO8WB9cukz_9jfaVfQ-pNUUxodzKLbIuzN94mDpeXcIfw&authuser=0" target="_blank">
            <img src="/google.svg" alt="" />
          </a>
        </div>
      </div>
      <div className="contact">
        <h2 className="label">Fale consoco</h2>

        <a href="#" onClick={goToWhatsApp} className="contact-item">
          <img src="/whatsapp.svg" alt="" />
            (11) 9 3908-0968
        </a>

        <a href="mailto:contato@c6energy.com.br" className="contact-item">
          <img src="/email.svg" alt="" />
          contato@c6energy.com.br
        </a>

        <div  className="contact-item">
          <img src="/horario.svg" alt="" />
          Atendimento a partir das 09h até as 22h
        </div>

        <a href="https://www.google.com/search?q=C6+Energy&stick=H4sIAAAAAAAA_-NgU1I1qLA0SU41tbS0SE4xNLFMtkyxMqhItLC0SLKwsEw1MDUxMDc0WsTK6Wym4JqXWpReCQCPTM0hNQAAAA&hl=pt-BR&mat=CcR1DiCIe8IeElYBEKoLaUv3m2bPQh-hQyCrTjSLg5cmCxvKUqIEOUKjuAo-1t_7L-rpB4wEv4hfw39zpTMt-RO8WB9cukz_9jfaVfQ-pNUUxodzKLbIuzN94mDpeXcIfw&authuser=0" target="_blank" className="contact-item">
          <img src="/email.svg" alt="" />
          R. Maj. Quedinho, 111 - CJ. 110 - Centro Histórico de São Paulo | SP
        </a>
      </div>
      </div>
      <span className="footer-copy">
      Todos os Direitos Reservados | Copyright © 2025| C6 ENERGY LTDA - CNPJ 45.506.222/0001-19
    </span>
    </footer>
   
    <button onClick={goToWhatsApp} className="whatsapp">
      <img src="/whatsapp.svg" alt="" />
    </button>
    </>
  );
}

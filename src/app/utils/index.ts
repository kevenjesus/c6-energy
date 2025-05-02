export function formatCpfCnpj(value: string): string {
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
  
  export function converterParaFloat(valorFormatado: string): number {
    const valorSemSimbolo = valorFormatado.replace("R$", "").trim();
    
   const valorComPonto = valorSemSimbolo.replace(/\./g, "").replace(",", ".");
    
    const valorFloat = parseFloat(valorComPonto);
    
    if (isNaN(valorFloat)) {
        throw new Error("Formato de valor inválido. Esperado: R$ X.XXX,XX");
    }
    
    return valorFloat;
  }

  export const formatPhoneNumber = (value: string): string => {
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

  export const formatCurrency = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    const numberValue = Number(cleaned) / 100;
    return numberValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

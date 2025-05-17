
export interface ResponseSupbase {
    error?: boolean
    data?: any;
    message?: string
}


export type DataLead = {
  id: string,
  name: string,
  whatsapp: string,
  email: string,
  document: string,
  marital_status?: string,
  profession?: string,
  is_company: Boolean,
  responsable_name?: string,
  responsable_phone?: string,
  responsable_document?: string,
  responsable_marital_status?: string,
  responsable_professional?: string,
  uc: string,
  zipcode: string,
  address: string,
  number: string,
  neighborhood: string,
  state: string,
  city: string,
  complement: string
}


export interface UserAuthTypes {
    username: string
    password: string
}

export interface UserAdminTypes {
    id: string
    name: string
    created_at: string
}

export type RoleAdmin = {
    name: string;
  };
  
export type PartnerGroup = {
    // defina os campos reais da tabela partner_group se souber
    id: string;
    name: string;
  };
  
  export type UserAdmin = {
    id: string;
    name: string;
    username: string;
    password?: string;
    telefone: string;
    role_admin: RoleAdmin;
    partner_group: PartnerGroup | null;
  };

  export type UserAdminRecive = {
    id: string;
    name: string;
    username: string;
    password?: string;
    telefone: string;
    group: string
  };

  export type userAdminData = {
    name: string;
    username: string;
    password?: string;
    telefone: string;
    group: string;
  };

  export type userAdminFormData = {
    name: string;
    username: string;
    password: string;
    repassword: string;
    telefone: string;
    group: string;
  };

  export type userAdminfrontData = {
    id: string;
    name: string;
    username: string;
    password?: string;
    telefone: string;
    partner_group: {
      id: string,
      name: string
    };
  };
  
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
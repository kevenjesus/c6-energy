
export interface ResponseSupbase {
    error?: boolean
    data?: any;
    message?: string
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
    telefone: string | null;
    role_admin: RoleAdmin;
    partner_group: PartnerGroup | null;
  };

  export type UserAdminRecive = {
    id: string;
    name: string;
    username: string;
    password?: string;
    telefone: string | null;
    group: string
  };

  export type userAdminData = {
    name: string;
    username: string;
    password?: string;
    telefone: string | null;
    group: string;
  };
  
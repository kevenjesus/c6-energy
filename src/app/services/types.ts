
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
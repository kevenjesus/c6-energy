"use client"; // O contexto precisa ser um Client Component

import { createContext, useContext, useState, ReactNode } from "react";

interface UserData {
    id: string
    name: string
    role: string
}

interface AdminContexttType {
  user: UserData | null;
  handleUser: (user: UserData) => void;
}

const AdminContextt = createContext<AdminContexttType | undefined>(undefined);

export function AdminContextProvider({ children }: { children: ReactNode }) {
  const [user, handleUser] = useState<UserData | null>(null);

  return (
    <AdminContextt.Provider value={{ user, handleUser }}>
      {children}
    </AdminContextt.Provider>
  );
}

export function useAdminContext() {
  const context = useContext(AdminContextt);
  if (!context) {
    throw new Error("useAdminContextt deve ser usado dentro de um Provider");
  }
  return context;
}

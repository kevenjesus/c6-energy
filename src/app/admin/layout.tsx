import type { Metadata } from "next";
import { IBM_Plex_Sans, Manrope } from "next/font/google";
import { AdminContextProvider } from "../context/adminContext";
import { ToastContainer } from "react-toastify";


const getIbm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600","700"],
  variable: "--font-ibm-plex-sans",
});

const getManrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

export const metadata: Metadata = {
  title: "Admin | C6 Energy",
  description: "Simule agora e veja quanto você pode economizar Seu desconto em um ano será de: Valor economia O valor estimado é baseado na Geração Distribuída. Para o mercado livre de energia (alta tensão), o desconto pode chegar a 35%. Recebemos sua mensagem, um de nossos consultores entrará em contato com você o mais rápido possível. ENTRAR [&hellip;]",
  openGraph: {
    title: 'Admin | C6 Energy',
    description: "Simule agora e veja quanto você pode economizar Seu desconto em um ano será de: Valor economia O valor estimado é baseado na Geração Distribuída. Para o mercado livre de energia (alta tensão), o desconto pode chegar a 35%. Recebemos sua mensagem, um de nossos consultores entrará em contato com você o mais rápido possível. ENTRAR [&hellip;]",
    type: 'website',
    url: 'https://simulador.c6energy.com.br',
    images: [
      {
        url: 'https://simulador.c6energy.com.br/image.jpeg',
        width: 1200,
        height: 630,
        alt: "simule agora"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${getIbm.variable} ${getManrope.variable}`} style={{background: '#6800F5'}}>
        <AdminContextProvider>
            {children}
            <ToastContainer theme="colored" />
        </AdminContextProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Nunito, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-title",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-number",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roteiro Fácil",
  description: "Crie seu roteiro de viagem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.variable} ${nunito.variable} ${robotoMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { authOptions } from "@/lib/auth-options";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Careofy — Seni tanıyan kariyer mentörü",
  description:
    "Bilimsel testler ve yapay zeka ile kişisel kariyer ve eğitim yol haritanı keşfet.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="tr" className={`${bricolage.variable} ${jakarta.variable}`}>
      <body className="font-body antialiased">
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}

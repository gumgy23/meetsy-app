import type { Metadata } from "next";
import {  Outfit, Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import HeaderWrapper from "@/components/common/header-wrapper";
import Footer from "@/components/common/footer";
import type { ReactNode } from "react";
import { QueryProvider } from "@/components/providers/query-provider";
const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100","200", "300", "400", "500","600","700","800","900"],

});

export const metadata: Metadata = {
  title: "Meetsy",
  description: "Meetsy is a ai learning platform to connect with other learners in the community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en">
        <body className="{'${outfitFont.className}
        antialiased'}">
          <QueryProvider>
            <HeaderWrapper/>
            {children}
            <Footer />
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
    
  );
}

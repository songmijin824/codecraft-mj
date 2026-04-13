import type { Metadata } from "next";

import React from "react";
import "@/styles/globals.scss";
import "@/styles/globals.css";
import { Comfortaa, IBM_Plex_Sans_KR } from 'next/font/google'

const comfortaa = Comfortaa({
  subsets: ['latin'],
  weight: ['300', '700'],
  variable: '--font-comfortaa',
})

const ibm = IBM_Plex_Sans_KR({
  subsets: ['latin'],
  weight: ['300'],
  variable: '--font-ibm',
})

export const metadata: Metadata = {
  title: '송미진 | 디자이너 포트폴리오',
  description: "모든 창작의 근본에는 구조와 설계가 있습니다.저는 그 구조를 디자인하고, 설계로 장르의 경계를 넘는 경험을 만듭니다. 정성껏 준비한 작업들을 편하게 살펴봐 주세요 :)",
  keywords: ["포트폴리오", "프론트엔드", "개발자", "디자이너", "프로젝트", "경험"],
  
  openGraph: {
    title: '송미진 포트폴리오',
    description:
      '구조를 디자인하고, 설계로 장르의 경계를 넘는 경험을 만듭니다.',
    url: '',
    siteName: 'song mi jin portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${comfortaa.variable} ${ibm.variable}`}> 
      <body>
        {children}
      </body>
    </html>
  );
}

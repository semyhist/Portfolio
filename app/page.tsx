import { Metadata } from 'next'
import HomePage from './components/HomePage'

export const metadata: Metadata = {
  title: 'Semih Aydın | Motor Sporları & Web Developer Portfolio',
  description: 'Trabzon Üniversitesi Bilgisayar Mühendisliği öğrencisi. Motor sporları tutkunu, web developer ve Arka Kanat kurucusu. React, JavaScript, C, Java teknolojilerinde deneyimli. 56K+ takipçi, 18M+ aylık erişim.',
  keywords: [
    'Semih Aydın',
    'Web Developer',
    'Motor Sporları',
    'Formula 1',
    'React Developer',
    'Next.js',
    'JavaScript',
    'Arka Kanat',
    'Bilgisayar Mühendisliği',
    'Trabzon Üniversitesi',
    'Portfolio',
    'Full Stack Developer',
    'Frontend Developer',
    'Telemetri Sistemleri',
    'Otomotiv Yazılımı'
  ],
  authors: [{ name: 'Semih Aydın', url: 'https://semihaydin.dev' }],
  creator: 'Semih Aydın',
  publisher: 'Semih Aydın',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    alternateLocale: ['en_US'],
    url: 'https://semihaydin.dev',
    title: 'Semih Aydın | Motor Sporları & Web Developer',
    description: 'Trabzon Üniversitesi Bilgisayar Mühendisliği öğrencisi. Motor sporları tutkunu ve web developer. Arka Kanat kurucusu - 56K+ takipçi, 18M+ aylık erişim.',
    siteName: 'Semih Aydın Portfolio',
    images: [
      {
        url: 'https://semihaydin.dev/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Semih Aydın - Motor Sporları & Web Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Semih Aydın | Motor Sporları & Web Developer',
    description: 'Bilgisayar Mühendisliği öğrencisi, web developer ve Arka Kanat kurucusu',
    creator: '@semyhist',
    images: ['https://semihaydin.dev/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://semihaydin.dev',
    languages: {
      'tr-TR': 'https://semihaydin.dev',
      'en-US': 'https://semihaydin.dev/en',
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function Home() {
  return <HomePage />
}

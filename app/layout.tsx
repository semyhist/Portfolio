import type { Metadata } from 'next'
import './globals.css'
import StructuredData from './components/StructuredData'

export const metadata: Metadata = {
  title: {
    default: 'Semih Aydın | Software Engineer & Motorsports Data Analyst',
    template: '%s | Semih Aydın'
  },
  description: 'Building scalable systems, processing telemetry data, and developing high-performance web applications using React, Next.js, C, and Python. Founder of Arka Kanat motorsports platform with 56K+ followers.',
  keywords: [
    'Semih Aydın',
    'Software Engineer',
    'React Developer',
    'Next.js Developer',
    'C Programming',
    'Python Developer',
    'Data Analysis',
    'Motorsports Telemetry',
    'Formula 1',
    'Web Development',
    'Full Stack Developer',
    'Trabzon University',
    'Computer Engineering',
    'Arka Kanat',
    'JavaScript Developer'
  ],
  authors: [{ name: 'Semih Aydın', url: 'https://semihaydin.dev' }],
  creator: 'Semih Aydın',
  publisher: 'Semih Aydın',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://semihaydin.dev',
    title: 'Semih Aydın | Software Engineer & Motorsports Data Analyst',
    description: 'Building scalable systems and processing telemetry data. Founder of Arka Kanat with 56K+ followers and 18M monthly reach.',
    siteName: 'Semih Aydın Portfolio',
    images: [
      {
        url: 'https://semihaydin.dev/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Semih Aydın - Software Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@semyhist',
    creator: '@semyhist',
    title: 'Semih Aydın | Software Engineer',
    description: 'Building scalable systems and processing telemetry data',
    images: ['https://semihaydin.dev/og-image.png'],
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
  },
  verification: {
    google: 'your-google-verification-code',
  },
  other: {
    'google-site-verification': 'your-google-verification-code',
    'referrer': 'origin-when-cross-origin',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <head>
        <StructuredData />
      </head>
      <body>{children}</body>
    </html>
  )
}

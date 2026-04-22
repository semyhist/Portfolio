import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-montserrat',
})

const BASE_URL = 'https://semihaydin.dev'

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Semih Aydın | Software Developer',
    template: '%s | Semih Aydın',
  },
  description:
    'Semih Aydın — Trabzon Üniversitesi Bilgisayar Mühendisliği öğrencisi. React, Next.js ve JavaScript uzmanı web geliştirici. 56K+ takipçili Arka Kanat motorsporları topluluğunun kurucusu.',
  keywords: [
    'Semih Aydın', 'semihaydin', 'semihaydin.dev',
    'Web Developer', 'Frontend Developer', 'React Developer',
    'Next.js Developer', 'JavaScript Developer',
    'Bilgisayar Mühendisliği', 'Trabzon Üniversitesi',
    'Software Developer Turkey', 'Arka Kanat', 'Portfolio',
    'Yazılım Geliştirici', 'Web Geliştirici',
  ],
  authors: [{ name: 'Semih Aydın', url: BASE_URL }],
  creator: 'Semih Aydın',
  publisher: 'Semih Aydın',
  category: 'technology',
  alternates: {
    canonical: BASE_URL,
    languages: { 'tr-TR': BASE_URL, 'en-US': BASE_URL },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    alternateLocale: ['en_US'],
    url: BASE_URL,
    title: 'Semih Aydın | Software Developer',
    description: 'Trabzon Üniversitesi Bilgisayar Mühendisliği öğrencisi. React & Next.js geliştirici. Arka Kanat kurucusu.',
    siteName: 'Semih Aydın',
    images: [{
      url: '/images/og-image.png',
      width: 1200, height: 630,
      alt: 'Semih Aydın - Software Developer',
      type: 'image/png',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@semyhist',
    creator: '@semyhist',
    title: 'Semih Aydın | Software Developer',
    description: 'Trabzon Üniversitesi Bilgisayar Mühendisliği öğrencisi. React & Next.js geliştirici.',
    images: [{ url: '/images/og-image.png', alt: 'Semih Aydın - Software Developer' }],
  },
  robots: {
    index: true, follow: true, nocache: false,
    googleBot: {
      index: true, follow: true, noimageindex: false,
      'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      { rel: 'mask-icon', url: '/logowhitetrans.png', color: '#000000' },
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'msapplication-TileColor': '#000000',
    'msapplication-TileImage': '/mstile-150x150.png',
    'msapplication-config': 'none',
  },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Semih Aydın',
  url: BASE_URL,
  email: 'semih@semihaydin.dev',
  jobTitle: 'Software Developer',
  description: 'Trabzon Üniversitesi Bilgisayar Mühendisliği öğrencisi. React, Next.js ve JavaScript uzmanı.',
  image: `${BASE_URL}/images/og-image.png`,
  sameAs: [
    'https://github.com/semyhist',
    'https://www.linkedin.com/in/aydinsemih61',
    'https://instagram.com/semjhaydin',
    'https://twitter.com/semyhist',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Trabzon University',
    url: 'https://www.trabzon.edu.tr',
  },
  knowsAbout: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'C', 'Web Development'],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Semih Aydın',
  url: BASE_URL,
  description: 'Semih Aydın kişisel portföy sitesi',
  author: { '@type': 'Person', name: 'Semih Aydın' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/mstile-150x150.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}

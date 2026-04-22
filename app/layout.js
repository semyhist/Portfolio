import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata = {
  title: 'Semih Aydın | Software Developer',
  description: 'Computer Engineering student at Trabzon University. Web Developer specializing in React, JavaScript, and modern web technologies. Founder of Arka Kanat motorsports community with 56K+ followers.',
  keywords: ['Semih Aydın', 'Web Developer', 'React Developer', 'Computer Engineering', 'Trabzon University', 'Software Developer Turkey', 'Arka Kanat'],
  authors: [{ name: 'Semih Aydın' }],
  creator: 'Semih Aydın',
  publisher: 'Semih Aydın',
  metadataBase: new URL('https://semihaydin.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'tr_TR',
    url: 'https://semihaydin.dev',
    title: 'Semih Aydın | Software Developer',
    description: 'Computer Engineering student at Trabzon University. Web Developer & Community Builder.',
    siteName: 'Semih Aydın Portfolio',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Semih Aydın - Software Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Semih Aydın | Software Developer',
    description: 'Computer Engineering student at Trabzon University. Web Developer & Community Builder.',
    creator: '@semyhist',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}

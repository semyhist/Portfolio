import type { Metadata } from 'next'
import './globals.css'
import StructuredData from './components/StructuredData'

export const metadata: Metadata = {
  title: 'Semih Aydın - Portfolio',
  description: 'Motor Sporları Tutkunu & Web Developer | Dijital Deneyimler Yaratıyorum',
  keywords: ['Semih Aydın', 'Web Developer', 'Motor Sporları', 'React', 'Next.js', 'Portfolio'],
  authors: [{ name: 'Semih Aydın' }],
  openGraph: {
    title: 'Semih Aydın - Portfolio',
    description: 'Motor Sporları Tutkunu & Web Developer',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <StructuredData />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}

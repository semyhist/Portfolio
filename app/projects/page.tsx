import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { projeler } from '../lib/projectsData'
import ProjectsClient from '../components/ProjectsClient'

const BASE_URL = 'https://semihaydin.dev'

export const metadata: Metadata = {
  title: 'Projeler',
  description:
    'Semih Aydın\'ın tüm projeleri — React, Next.js, JavaScript ile geliştirilmiş web uygulamaları, C programlama projeleri ve 13+ GitHub reposu.',
  keywords: [
    'Semih Aydın Projeler',
    'React Projeleri',
    'Next.js Portfolio',
    'JavaScript Projeleri',
    'C Programlama',
    'Web Geliştirme Projeleri',
    'GitHub Projeleri',
    'TOGG Konsept',
    'Batı Yıldırım Web Sitesi',
    'Fidan Sigorta',
    'CAN Bus Simulator',
  ],
  alternates: {
    canonical: `${BASE_URL}/projects`,
    languages: {
      'tr-TR': `${BASE_URL}/projects`,
      'en-US': `${BASE_URL}/projects`,
    },
  },
  openGraph: {
    title: 'Projeler | Semih Aydın',
    description:
      'React, Next.js, JavaScript ile geliştirilmiş web uygulamaları, C projeleri ve 13+ GitHub reposu.',
    url: `${BASE_URL}/projects`,
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Semih Aydın - Projeler',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projeler | Semih Aydın',
    description: 'React, Next.js, C ve JavaScript projeleri.',
    images: ['/images/og-image.png'],
  },
}

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Semih Aydın — Projeler',
  description: 'Web uygulamaları, C projeleri ve GitHub repoları',
  url: `${BASE_URL}/projects`,
  author: {
    '@type': 'Person',
    name: 'Semih Aydın',
    url: BASE_URL,
  },
  hasPart: [
    { '@type': 'SoftwareSourceCode', name: 'TOGG Konsept', programmingLanguage: 'JavaScript', codeRepository: 'https://github.com/semyhist/togg-konsept' },
    { '@type': 'SoftwareSourceCode', name: 'Batı Yıldırım', programmingLanguage: 'JavaScript', codeRepository: 'https://github.com/semyhist/batiyildirim' },
    { '@type': 'SoftwareSourceCode', name: 'CAN Bus Simulator', programmingLanguage: 'C', codeRepository: 'https://github.com/semyhist/CANBusSimulator' },
    { '@type': 'SoftwareSourceCode', name: 'EasyGit', programmingLanguage: 'JavaScript', codeRepository: 'https://github.com/semyhist/EasyGit' },
  ],
}

export default function ProjectsPage() {
  return (
    <div className="projects-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <nav className="navbar" role="navigation" aria-label="Ana navigasyon">
        <div className="navbar-content">
          <Link href="/#hero" className="navbar-logo" aria-label="Semih Aydın - Ana Sayfa">
            <Image
              src="/logowhitetrans.png"
              alt="Semih Aydın"
              width={120}
              height={40}
              style={{ height: '40px', width: 'auto' }}
              priority
            />
          </Link>
          <div className="navbar-links">
            <Link href="/#about" className="navbar-link">Hakkımda</Link>
            <Link href="/#skills" className="navbar-link">Yetenekler</Link>
            <Link href="/#projects" className="navbar-link">Projeler</Link>
            <Link href="/#certificates" className="navbar-link">Sertifikalar</Link>
            <Link href="/#contact" className="navbar-link">İletişim</Link>
          </div>
        </div>
      </nav>
      <div className="projects-page-header">
        <h1>Projelerim</h1>
        <p>Web · C · GitHub</p>
      </div>
      <ProjectsClient projeler={projeler} />
    </div>
  )
}

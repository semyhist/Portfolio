import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { projeler } from '../lib/projectsData'
import ProjectsClient from '../components/ProjectsClient'

export const metadata: Metadata = {
  title: 'Projeler | Semih Aydın',
  description: 'Web projeleri, C programlama projeleri ve diğer yazılım geliştirme çalışmalarım. Python, JavaScript, React.js, Next.js, HTML/CSS ile geliştirilen projeler.',
  alternates: {
    canonical: 'https://semihaydin.dev/projects',
  },
  openGraph: {
    title: 'Projeler | Semih Aydın',
    description: 'Web projeleri, C programlama projeleri ve diğer yazılım geliştirme çalışmalarım.',
    url: 'https://semihaydin.dev/projects',
    type: 'website',
  }
}

export default function ProjectsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Semih Aydın - Projeler',
    description: 'Web projeleri, C programlama projeleri ve diğer yazılım geliştirme çalışmaları',
    url: 'https://semihaydin.dev/projects',
    author: {
      '@type': 'Person',
      name: 'Semih Aydın',
      url: 'https://semihaydin.dev'
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="projects-page">
        <Link href="/">
          <button className="back-button">
            <ArrowLeft size={20} />
            Ana Sayfa
          </button>
        </Link>

        <div className="container">
          <h1 className="projects-page-title">Projelerim</h1>
          
          <section>
            <h2>Web Projeleri</h2>
            {projeler.webProjeler?.map((proje) => (
              <article key={proje.id} className="project-detail-card">
                <h3>{proje.baslik.tr}</h3>
                <p>{proje.kisa.tr}</p>
                <p>{proje.aciklama.tr}</p>
                <div className="tech-badges">
                  {proje.teknolojiler.map((tech: string) => (
                    <span key={tech} className="tech-badge">{tech}</span>
                  ))}
                </div>
                <ul>
                  {proje.ozellikler.tr.map((ozellik: string, idx: number) => (
                    <li key={idx}>{ozellik}</li>
                  ))}
                </ul>
              </article>
            ))}
          </section>

          <section>
            <h2>C Projeleri</h2>
            {projeler.cProjeler?.map((proje) => (
              <article key={proje.id} className="project-detail-card">
                <h3>{proje.baslik.tr}</h3>
                <p>{proje.kisa.tr}</p>
                <p>{proje.aciklama.tr}</p>
                <div className="tech-badges">
                  {proje.teknolojiler.map((tech: string) => (
                    <span key={tech} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </article>
            ))}
          </section>

          <section>
            <h2>Diğer Projeler</h2>
            {projeler.digerProjeler?.map((proje) => (
              <article key={proje.id} className="project-detail-card">
                <h3>{proje.baslik.tr}</h3>
                <p>{proje.kisa.tr}</p>
                <p>{proje.aciklama.tr}</p>
              </article>
            ))}
          </section>
        </div>

        <ProjectsClient projeler={projeler} />
      </div>
    </>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Code, Lightbulb, Wrench, CheckCircle, Terminal } from 'lucide-react'

interface ProjectsClientProps {
  projeler: any
}

export default function ProjectsClient({ projeler }: ProjectsClientProps) {
  const [dil, setDil] = useState('tr')
  const [aktifKategori, setAktifKategori] = useState('web')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const metinler = dil === 'tr' ? {
    title: "Projelerim",
    webTitle: "Web Projeleri",
    cTitle: "C Projeleri",
    otherTitle: "Diğer Projeler",
    github: "GitHub",
    demo: "Demo",
    about: "Proje Hakkında",
    why: "Neden Yaptım?",
    tech: "Teknolojiler",
    features: "Özellikler",
    code: "Kod Dağılımı"
  } : {
    title: "My Projects",
    webTitle: "Web Projects",
    cTitle: "C Projects",
    otherTitle: "Other Projects",
    github: "GitHub",
    demo: "Demo",
    about: "About",
    why: "Why",
    tech: "Technologies",
    features: "Features",
    code: "Code Distribution"
  }

  const tumProjeler = aktifKategori === 'web' ? (projeler.webProjeler || []) : aktifKategori === 'c' ? (projeler.cProjeler || []) : (projeler.digerProjeler || [])

  return (
    <>
      <div className="lang-toggle">
        <button className={`lang-btn ${dil === 'tr' ? 'active' : ''}`} onClick={() => setDil('tr')}>TR</button>
        <button className={`lang-btn ${dil === 'en' ? 'active' : ''}`} onClick={() => setDil('en')}>EN</button>
      </div>

      <div className="project-categories">
        <button className={`category-btn ${aktifKategori === 'web' ? 'active' : ''}`} onClick={() => setAktifKategori('web')}>
          <Code size={20} />
          {metinler.webTitle}
        </button>
        <button className={`category-btn ${aktifKategori === 'c' ? 'active' : ''}`} onClick={() => setAktifKategori('c')}>
          <Terminal size={20} />
          {metinler.cTitle}
        </button>
        <button className={`category-btn ${aktifKategori === 'other' ? 'active' : ''}`} onClick={() => setAktifKategori('other')}>
          <Wrench size={20} />
          {metinler.otherTitle}
        </button>
      </div>

      <div className="projects-list">
        {tumProjeler.map((proje: any, index: number) => (
          <motion.div key={proje.id} className="project-detail-card" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.2, duration: 0.6 }}>
            <div className="project-detail-header">
              <h2>{proje.baslik[dil]}</h2>
              <p>{proje.kisa[dil]}</p>
              <div className="project-links">
                <a href={proje.github} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                  <Github size={18} />
                  {metinler.github}
                </a>
                {proje.demo && proje.demo !== '#' && (
                  <a href={proje.demo} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                    <ExternalLink size={18} />
                    {metinler.demo}
                  </a>
                )}
              </div>
            </div>
            <div className="project-detail-body">
              <div className="detail-section">
                <h3><Code size={20} />{metinler.about}</h3>
                <p>{proje.aciklama[dil]}</p>
              </div>
              <div className="detail-section">
                <h3><Lightbulb size={20} />{metinler.why}</h3>
                <p>{proje.neden[dil]}</p>
              </div>
              <div className="detail-section">
                <h3><Wrench size={20} />{metinler.tech}</h3>
                <div className="tech-badges">
                  {proje.teknolojiler.map((tech: string) => (
                    <span key={tech} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="detail-section">
                <h3><CheckCircle size={20} />{metinler.features}</h3>
                <ul className="features-list">
                  {proje.ozellikler[dil].map((ozellik: string, idx: number) => (
                    <li key={idx}>{ozellik}</li>
                  ))}
                </ul>
              </div>
              {proje.kodDagilimi && (
                <div className="detail-section">
                  <h3>{metinler.code}</h3>
                  <div className="code-stats">
                    {proje.kodDagilimi.html && (
                      <div className="stat-bar">
                        <div className="stat-fill" style={{ width: proje.kodDagilimi.html }}>
                          <span>HTML {proje.kodDagilimi.html}</span>
                        </div>
                      </div>
                    )}
                    {proje.kodDagilimi.css && (
                      <div className="stat-bar">
                        <div className="stat-fill" style={{ width: proje.kodDagilimi.css }}>
                          <span>CSS {proje.kodDagilimi.css}</span>
                        </div>
                      </div>
                    )}
                    {proje.kodDagilimi.js && (
                      <div className="stat-bar">
                        <div className="stat-fill" style={{ width: proje.kodDagilimi.js }}>
                          <span>JS {proje.kodDagilimi.js}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  )
}

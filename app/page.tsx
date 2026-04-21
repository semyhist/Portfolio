import { Metadata } from 'next'
import Link from 'next/link'
import { translations } from './lib/translations'
import ClientAnimations from './components/ClientAnimations'
import InteractiveForm from './components/InteractiveForm'
import { Github, Linkedin, Instagram, Twitter, Youtube, Code, Palette, Brain, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Semih Aydın | Software Engineer & Motorsports Data Analyst',
  description: 'Computer Engineering student at Trabzon University. Building scalable systems, processing telemetry data, and developing high-performance web applications. Founder of Arka Kanat with 56K+ followers.',
  alternates: {
    canonical: 'https://semihaydin.dev',
  },
}

export default function Home() {
  const tr = translations.tr
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Semih Aydın',
    url: 'https://semihaydin.dev',
    jobTitle: 'Software Engineer',
    alumniOf: 'Trabzon University',
    sameAs: [
      'https://github.com/semyhist',
      'https://www.linkedin.com/in/aydinsemih61',
      'https://twitter.com/semyhist',
      'https://instagram.com/semjhaydin'
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="App">
        <nav className="navbar">
          <div className="navbar-content">
            <a href="#hero" className="navbar-logo">SA</a>
            <div className="navbar-links">
              <a href="#about" className="navbar-link">Hakkımda</a>
              <a href="#skills" className="navbar-link">Yetenekler</a>
              <a href="#projects" className="navbar-link">Projeler</a>
              <a href="#certificates" className="navbar-link">Sertifikalar</a>
              <a href="#contact" className="navbar-link">İletişim</a>
            </div>
          </div>
        </nav>

        <ClientAnimations />

        <header className="hero" id="hero">
          <div className="hero-bg">
            <div className="hero-grid"></div>
          </div>
          <div className="hero-content">
            <h1>{tr.hero.title}</h1>
            <p>{tr.hero.subtitle}</p>
            <p className="university">{tr.hero.university}</p>

            <div className="social-links">
              <a href="https://www.linkedin.com/in/aydinsemih61" className="social-link" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} />
                LinkedIn
              </a>
              <a href="https://github.com/semyhist" className="social-link" target="_blank" rel="noopener noreferrer">
                <Github size={20} />
                GitHub
              </a>
              <a href="https://instagram.com/semjhaydin" className="social-link" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
                Instagram
              </a>
              <a href="https://twitter.com/semyhist" className="social-link" target="_blank" rel="noopener noreferrer">
                <Twitter size={20} />
                Twitter
              </a>
              <a href="https://youtube.com/@semjhaydin" className="social-link" target="_blank" rel="noopener noreferrer">
                <Youtube size={20} />
                YouTube
              </a>
            </div>
          </div>
        </header>

        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <article className="stat-card">
                <span className="stat-number">40+</span>
                <span className="stat-label">{tr.stats.commits}</span>
              </article>
              <article className="stat-card">
                <span className="stat-number">11</span>
                <span className="stat-label">{tr.stats.projects}</span>
              </article>
              <article className="stat-card">
                <span className="stat-number">18M</span>
                <span className="stat-label">{tr.stats.reach}</span>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container">
            <h2>{tr.about.title}</h2>
            <div className="about-content">
              <p>{tr.about.p1}</p>
              <p>{tr.about.p2}</p>
              <p>{tr.about.p3}</p>
            </div>
          </div>
        </section>

        <section className="section" id="skills">
          <div className="container">
            <h2>{tr.skills.title}</h2>
            <div className="skills-grid">
              <article className="skill-card">
                <div className="skill-icon">
                  <Code size={40} />
                </div>
                <h3>{tr.skills.software.title}</h3>
                <p>{tr.skills.software.desc}</p>
              </article>
              <article className="skill-card">
                <div className="skill-icon">
                  <Palette size={40} />
                </div>
                <h3>{tr.skills.design.title}</h3>
                <p>{tr.skills.design.desc}</p>
              </article>
              <article className="skill-card">
                <div className="skill-icon">
                  <Brain size={40} />
                </div>
                <h3>{tr.skills.problem.title}</h3>
                <p>{tr.skills.problem.desc}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="container">
            <h2>{tr.projects.title}</h2>
            <div className="projects-grid">
              <article className="project-card">
                <div className="project-content">
                  <h3 className="project-title">{tr.projects.web.title}</h3>
                  <p className="project-description">{tr.projects.web.desc}</p>
                  <div className="project-tech">
                    <span className="tech-tag">Python</span>
                    <span className="tech-tag">JavaScript</span>
                    <span className="tech-tag">React.js</span>
                    <span className="tech-tag">HTML/CSS</span>
                  </div>
                  <Link href="/projects">
                    <button className="view-details-btn">Projeleri Gör</button>
                  </Link>
                </div>
              </article>
              <article className="project-card">
                <div className="project-content">
                  <h3 className="project-title">{tr.projects.mobile.title}</h3>
                  <p className="project-description">{tr.projects.mobile.desc}</p>
                  <div className="project-tech">
                    <span className="tech-tag">React Native</span>
                    <span className="tech-tag">JavaScript</span>
                    <span className="tech-tag">Mobile UI</span>
                    <span className="tech-tag">Cross-platform</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section certificates" id="certificates">
          <div className="container">
            <h2>{tr.certificates.title}</h2>
            <p className="section-desc">{tr.certificates.desc}</p>
            <div className="certificates-slider">
              <article className="certificate-card">
                <div className="certificate-icon">
                  <Award size={40} />
                </div>
                <h3>EF SET C1 İleri Seviye İngilizce</h3>
                <div className="certificate-info">
                  <span className="certificate-issuer">EF SET</span>
                  <span className="certificate-date">Nisan 2026</span>
                </div>
                <a href="https://cert.efset.org/tr/VJ9bJN" target="_blank" rel="noopener noreferrer" className="certificate-link">
                  Görüntüle
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="container">
            <h2>{tr.contact.title}</h2>
            <p className="section-desc">{tr.contact.desc}</p>
            <div className="contact-content">
              <InteractiveForm />
              <div className="social-links">
                <a href="https://www.linkedin.com/in/aydinsemih61" className="social-link" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={20} />
                  LinkedIn
                </a>
                <a href="https://github.com/semyhist" className="social-link" target="_blank" rel="noopener noreferrer">
                  <Github size={20} />
                  GitHub
                </a>
                <a href="https://instagram.com/semjhaydin" className="social-link" target="_blank" rel="noopener noreferrer">
                  <Instagram size={20} />
                  Instagram
                </a>
                <a href="https://twitter.com/semyhist" className="social-link" target="_blank" rel="noopener noreferrer">
                  <Twitter size={20} />
                  Twitter
                </a>
                <a href="https://youtube.com/@semjhaydin" className="social-link" target="_blank" rel="noopener noreferrer">
                  <Youtube size={20} />
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <p>© {new Date().getFullYear()} Semih Aydın. {tr.footer.rights}</p>
              <p className="footer-made">{tr.footer.made}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

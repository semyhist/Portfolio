import { Metadata } from 'next'
import HomeClient from './components/HomeClient'
import { translations } from './lib/translations'

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
  const tr = translations.tr
  
  return (
    <>
      {/* SEO için server-side rendered içerik */}
      <noscript>
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

          <section className="hero" id="hero">
            <div className="hero-bg">
              <div className="hero-grid"></div>
            </div>
            <div className="hero-content">
              <h1>{tr.hero.title}</h1>
              <p>{tr.hero.subtitle}</p>
              <p className="university">{tr.hero.university}</p>
            </div>
          </section>

          <section className="stats-section">
            <div className="container">
              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-number">40+</span>
                  <span className="stat-label">{tr.stats.commits}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">11</span>
                  <span className="stat-label">{tr.stats.projects}</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">18M</span>
                  <span className="stat-label">{tr.stats.reach}</span>
                </div>
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
                <div className="skill-card">
                  <h3>{tr.skills.software.title}</h3>
                  <p>{tr.skills.software.desc}</p>
                </div>
                <div className="skill-card">
                  <h3>{tr.skills.design.title}</h3>
                  <p>{tr.skills.design.desc}</p>
                </div>
                <div className="skill-card">
                  <h3>{tr.skills.problem.title}</h3>
                  <p>{tr.skills.problem.desc}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="contact">
            <div className="container">
              <h2>{tr.contact.title}</h2>
              <p className="section-desc">{tr.contact.desc}</p>
            </div>
          </section>

          <footer className="footer">
            <div className="container">
              <div className="footer-content">
                <p>© 2025 Semih Aydın. {tr.footer.rights}</p>
                <p className="footer-made">{tr.footer.made}</p>
              </div>
            </div>
          </footer>
        </div>
      </noscript>
      
      {/* JavaScript aktif kullanıcılar için */}
      <HomeClient />
    </>
  )
}

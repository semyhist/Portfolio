'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { Github, Linkedin, Instagram, Twitter, Youtube, Code, Palette, Brain, ArrowUp, Mail, User, MessageSquare, Send, Award, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { translations } from '../lib/translations'

export default function HomePage() {
  const [dil, setDil] = useState('tr')
  const [yukleniyor, setYukleniyor] = useState(true)
  const [yazilanMetin, setYazilanMetin] = useState('')
  const [istatistikler, setIstatistikler] = useState({ commit: 0, proje: 0, erisim: 0 })
  const [yukariGoster, setYukariGoster] = useState(false)
  const [sliderIndeks, setSliderIndeks] = useState(0)
  const [formVerisi, setFormVerisi] = useState({ name: '', email: '', subject: '', message: '' })
  const [formDurum, setFormDurum] = useState('')
  const [gonderiliyor, setGonderiliyor] = useState(false)
  
  const { scrollYProgress } = useScroll()
  const ceviriler = translations[dil]
  const tamMetin = ceviriler.hero.subtitle
  
  const sertifikaListesi = [
    { title: { tr: 'EF SET C1 İleri Seviye İngilizce', en: 'EF SET C1 Advanced English' }, issuer: 'EF SET', date: 'Nisan 2026', file: 'https://cert.efset.org/tr/VJ9bJN' },
    { title: { tr: 'B2 Seviye İngilizce', en: 'B2 Level English' }, issuer: 'BTK Akademi', date: 'Mart 2026', file: '/sertificates/B2_Seviye_İngilizce_Sertifika.pdf' },
    { title: { tr: 'Perplexity AI', en: 'Perplexity AI' }, issuer: 'BTK Akademi', date: 'Şubat 2026', file: '/sertificates/Perplexity_Sertifika.pdf' },
    { title: { tr: 'Anthropic Claude AI', en: 'Anthropic Claude AI' }, issuer: 'BTK Akademi', date: 'Şubat 2026', file: '/sertificates/Anthropic_Claude_Sertifika.pdf' },
    { title: { tr: 'C Programlama Dili', en: 'C Programming Language' }, issuer: 'BTK Akademi', date: 'Ocak 2026', file: '/sertificates/C_Programlama_Dili_Sertifika.pdf' },
    { title: { tr: 'Fibabanka Staj Programı', en: 'Fibabanka Internship Program' }, issuer: 'Fibabanka', date: 'Ocak 2026', file: '/sertificates/Fibabanka_Staj_Sertifika.pdf' }
  ]

  useEffect(() => {
    setTimeout(() => setYukleniyor(false), 1500)
    const sayfaKaydir = () => {
      setYukariGoster(window.scrollY > 500)
    }
    window.addEventListener('scroll', sayfaKaydir)
    return () => {
      window.removeEventListener('scroll', sayfaKaydir)
    }
  }, [])

  useEffect(() => {
    let sayac = 0
    setYazilanMetin('')
    const yazmaZamanlayici = setInterval(() => {
      if (sayac < tamMetin.length) {
        setYazilanMetin(tamMetin.slice(0, sayac + 1))
        sayac++
      } else {
        clearInterval(yazmaZamanlayici)
      }
    }, 100)
    return () => clearInterval(yazmaZamanlayici)
  }, [tamMetin])

  useEffect(() => {
    let adim = 0
    const zamanlayici = setInterval(() => {
      adim++
      const ilerleme = adim / 60
      setIstatistikler({
        commit: Math.floor(40 * ilerleme),
        proje: Math.floor(11 * ilerleme),
        erisim: Math.floor(18 * ilerleme)
      })
      if (adim >= 60) clearInterval(zamanlayici)
    }, 2000 / 60)
    return () => clearInterval(zamanlayici)
  }, [])

  if (yukleniyor) {
    return (
      <motion.div className="loading-screen" initial={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} style={{ width: '60px', height: '60px', border: '2px solid #262626', borderTop: '2px solid white', borderRadius: '50%' }} />
      </motion.div>
    )
  }

  const yukariCik = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const sonrakiSlide = () => {
    setSliderIndeks((prev) => (prev + 1) % sertifikaListesi.length)
  }

  const oncekiSlide = () => {
    setSliderIndeks((prev) => (prev - 1 + sertifikaListesi.length) % sertifikaListesi.length)
  }

  const formDegistir = (e: any) => {
    setFormVerisi({ ...formVerisi, [e.target.name]: e.target.value })
  }

  const formGonder = async (e: any) => {
    e.preventDefault()
    setGonderiliyor(true)
    setFormDurum('')
    try {
      const mailtoLink = `mailto:aydnsemih61@gmail.com?subject=${encodeURIComponent(formVerisi.subject)}&body=${encodeURIComponent(`İsim: ${formVerisi.name}\\nEmail: ${formVerisi.email}\\n\\nMesaj:\\n${formVerisi.message}`)}`
      window.location.href = mailtoLink
      setFormDurum('success')
      setFormVerisi({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error(err)
      setFormDurum('error')
    } finally {
      setGonderiliyor(false)
    }
  }

  return (
    <AnimatePresence>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-content">
            <a href="#hero" className="navbar-logo">SA</a>
            <div className="navbar-links">
              <a href="#about" className="navbar-link">{dil === 'tr' ? 'Hakkımda' : 'About'}</a>
              <a href="#skills" className="navbar-link">{dil === 'tr' ? 'Yetenekler' : 'Skills'}</a>
              <a href="#projects" className="navbar-link">{dil === 'tr' ? 'Projeler' : 'Projects'}</a>
              <a href="#certificates" className="navbar-link">{dil === 'tr' ? 'Sertifikalar' : 'Certificates'}</a>
              <a href="#contact" className="navbar-link">{dil === 'tr' ? 'İletişim' : 'Contact'}</a>
            </div>
          </div>
        </nav>

        <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
        
        {yukariGoster && (
          <motion.button className="scroll-to-top" onClick={yukariCik} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ArrowUp size={20} />
          </motion.button>
        )}

        <div className="lang-toggle">
          <button className={`lang-btn ${dil === 'tr' ? 'active' : ''}`} onClick={() => setDil('tr')}>TR</button>
          <button className={`lang-btn ${dil === 'en' ? 'active' : ''}`} onClick={() => setDil('en')}>EN</button>
        </div>

        <section className="hero" id="hero">
          <div className="hero-bg">
            <div className="hero-grid"></div>
          </div>
          <motion.div className="hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              {ceviriler.hero.title}
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              {yazilanMetin}
            </motion.p>
            <motion.p className="university" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              {ceviriler.hero.university}
            </motion.p>

            <motion.div className="social-links" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
              {[
                { href: 'https://www.linkedin.com/in/aydinsemih61', icon: Linkedin, label: 'LinkedIn' },
                { href: 'https://github.com/semyhist', icon: Github, label: 'GitHub' },
                { href: 'https://instagram.com/semjhaydin', icon: Instagram, label: 'Instagram' },
                { href: 'https://twitter.com/semyhist', icon: Twitter, label: 'Twitter' },
                { href: 'https://youtube.com/@semjhaydin', icon: Youtube, label: 'YouTube' },
              ].map((social) => {
                const Icon = social.icon
                return (
                  <a key={social.label} href={social.href} className="social-link" target="_blank" rel="noopener noreferrer">
                    <Icon size={20} />
                    {social.label}
                  </a>
                )
              })}
            </motion.div>
          </motion.div>
        </section>

        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <motion.div className="stat-card" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                <span className="stat-number">{istatistikler.commit}+</span>
                <span className="stat-label">{ceviriler.stats.commits}</span>
              </motion.div>
              <motion.div className="stat-card" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
                <span className="stat-number">{istatistikler.proje}</span>
                <span className="stat-label">{ceviriler.stats.projects}</span>
              </motion.div>
              <motion.div className="stat-card" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
                <span className="stat-number">{istatistikler.erisim}M</span>
                <span className="stat-label">{ceviriler.stats.reach}</span>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container">
            <motion.h2 initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              {ceviriler.about.title}
            </motion.h2>
            <div className="about-content">
              <motion.p initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>
                {ceviriler.about.p1}
              </motion.p>
              <motion.p initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }}>
                {ceviriler.about.p2}
              </motion.p>
              <motion.p initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }} viewport={{ once: true }}>
                {ceviriler.about.p3}
              </motion.p>
            </div>
          </div>
        </section>

        <section className="section" id="skills">
          <div className="container">
            <motion.h2 initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              {ceviriler.skills.title}
            </motion.h2>
            <div className="skills-grid">
              {[
                { icon: Code, title: ceviriler.skills.software.title, description: ceviriler.skills.software.desc },
                { icon: Palette, title: ceviriler.skills.design.title, description: ceviriler.skills.design.desc },
                { icon: Brain, title: ceviriler.skills.problem.title, description: ceviriler.skills.problem.desc },
              ].map((skill, index) => {
                const Icon = skill.icon
                return (
                  <motion.div key={skill.title} className="skill-card" initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                    <div className="skill-icon">
                      <Icon size={40} />
                    </div>
                    <h3>{skill.title}</h3>
                    <p>{skill.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="container">
            <motion.h2 initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              {ceviriler.projects.title}
            </motion.h2>
            <div className="projects-grid">
              {[
                { id: 'web', title: ceviriler.projects.web.title, description: ceviriler.projects.web.desc, tags: ['Python', 'JavaScript', 'React.js', 'HTML/CSS'], hasDetails: true },
                { id: 'mobile', title: ceviriler.projects.mobile.title, description: ceviriler.projects.mobile.desc, tags: ['React Native', 'JavaScript', 'Mobile UI', 'Cross-platform'], hasDetails: false },
              ].map((project, index) => (
                <motion.div key={project.title} className="project-card" initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tech">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tech-tag">{tag}</span>
                      ))}
                    </div>
                    {project.hasDetails && (
                      <Link href="/projects">
                        <button className="view-details-btn">
                          {dil === 'tr' ? 'Projeleri Gör' : 'View Projects'}
                        </button>
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section certificates" id="certificates">
          <div className="container">
            <motion.h2 initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              {ceviriler.certificates.title}
            </motion.h2>
            <motion.p className="section-desc" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
              {ceviriler.certificates.desc}
            </motion.p>
            <div className="certificates-slider">
              <div className="certificates-track" style={{ transform: `translateX(-${sliderIndeks * 100}%)` }}>
                {sertifikaListesi.map((cert, index) => (
                  <div key={index} className="certificate-card">
                    <div className="certificate-icon">
                      <Award size={40} />
                    </div>
                    <h3>{cert.title[dil]}</h3>
                    <div className="certificate-info">
                      <span className="certificate-issuer">{cert.issuer}</span>
                      <span className="certificate-date">{cert.date}</span>
                    </div>
                    <a href={cert.file} target="_blank" rel="noopener noreferrer" className="certificate-link">
                      {dil === 'tr' ? 'Görüntüle' : 'View'}
                    </a>
                  </div>
                ))}
              </div>
              <div className="slider-controls">
                <button className="slider-btn" onClick={oncekiSlide} disabled={sliderIndeks === 0}>
                  <ChevronLeft size={24} />
                </button>
                <button className="slider-btn" onClick={sonrakiSlide} disabled={sliderIndeks === sertifikaListesi.length - 1}>
                  <ChevronRight size={24} />
                </button>
              </div>
              <div className="slider-dots">
                {sertifikaListesi.map((_, index) => (
                  <button key={index} className={`slider-dot ${sliderIndeks === index ? 'active' : ''}`} onClick={() => setSliderIndeks(index)} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section testimonials">
          <div className="container">
            <motion.h2 initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              {ceviriler.testimonials.title}
            </motion.h2>
            <motion.p className="section-desc" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
              {ceviriler.testimonials.desc}
            </motion.p>
            <motion.div className="testimonials-grid" initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
              <div className="empty-state">
                <Star size={48} />
                <p>{ceviriler.testimonials.empty}</p>
                <p className="contact-text">{ceviriler.testimonials.contact}</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="container">
            <motion.h2 initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              {ceviriler.contact.title}
            </motion.h2>
            <motion.p className="section-desc" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
              {ceviriler.contact.desc}
            </motion.p>

            <div className="contact-content">
              <motion.form className="contact-form" onSubmit={formGonder} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
                <div className="form-group">
                  <User size={20} />
                  <input type="text" name="name" placeholder={ceviriler.contact.form.name} value={formVerisi.name} onChange={formDegistir} required />
                </div>
                <div className="form-group">
                  <Mail size={20} />
                  <input type="email" name="email" placeholder={ceviriler.contact.form.email} value={formVerisi.email} onChange={formDegistir} required />
                </div>
                <div className="form-group">
                  <MessageSquare size={20} />
                  <input type="text" name="subject" placeholder={ceviriler.contact.form.subject} value={formVerisi.subject} onChange={formDegistir} required />
                </div>
                <div className="form-group">
                  <MessageSquare size={20} />
                  <textarea name="message" placeholder={ceviriler.contact.form.message} value={formVerisi.message} onChange={formDegistir} rows={5} required />
                </div>
                <button type="submit" className="submit-btn" disabled={gonderiliyor}>
                  <Send size={20} />
                  {gonderiliyor ? ceviriler.contact.form.sending : ceviriler.contact.form.send}
                </button>
                {formDurum === 'success' && (<p className="form-message success">{ceviriler.contact.form.success}</p>)}
                {formDurum === 'error' && (<p className="form-message error">{ceviriler.contact.form.error}</p>)}
              </motion.form>

              <motion.div className="social-links" initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }}>
                {[
                  { href: 'https://www.linkedin.com/in/aydinsemih61', icon: Linkedin, label: 'LinkedIn' },
                  { href: 'https://github.com/semyhist', icon: Github, label: 'GitHub' },
                  { href: 'https://instagram.com/semjhaydin', icon: Instagram, label: 'Instagram' },
                  { href: 'https://twitter.com/semyhist', icon: Twitter, label: 'Twitter' },
                  { href: 'https://youtube.com/@semjhaydin', icon: Youtube, label: 'YouTube' },
                ].map((social) => {
                  const Icon = social.icon
                  return (
                    <a key={social.label} href={social.href} className="social-link" target="_blank" rel="noopener noreferrer">
                      <Icon size={20} />
                      {social.label}
                    </a>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <p>© {new Date().getFullYear()} Semih Aydın. {ceviriler.footer.rights}</p>
              <p className="footer-made">{ceviriler.footer.made}</p>
            </div>
          </div>
        </footer>
      </div>
    </AnimatePresence>
  )
}

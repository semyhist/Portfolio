'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import {
  Github, Linkedin, Instagram, Twitter, Mail,
  ArrowUp, Code, Database, Users, ExternalLink,
  Award, ChevronLeft, ChevronRight, User, MessageSquare, Send,
} from 'lucide-react';
import { translations } from '../translations';

export default function HomeClient() {
  const [lang, setLang] = useState('tr');
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [stats, setStats] = useState({ followers: 0, commits: 0, projects: 0, experience: 0 });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { scrollYProgress } = useScroll();
  const t = translations[lang];

  const certificates = [
    { title: { tr: 'EF SET C1 İngilizce', en: 'EF SET C1 English' }, issuer: 'EF SET', date: '2026', file: '/sertificates/B2_Seviye_İngilizce_Sertifika.pdf' },
    { title: { tr: 'C Programlama Dili', en: 'C Programming Language' }, issuer: 'BTK Akademi', date: '2026', file: '/sertificates/C_Programlama_Dili_Sertifika.pdf' },
    { title: { tr: 'Anthropic Claude', en: 'Anthropic Claude' }, issuer: 'Anthropic', date: '2026', file: '/sertificates/Anthropic_Claude_Sertifika.pdf' },
    { title: { tr: 'Perplexity AI', en: 'Perplexity AI' }, issuer: 'Perplexity', date: '2026', file: '/sertificates/Perplexity_Sertifika.pdf' },
  ];

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let counter = 0;
    setTypedText('');
    const fullText = t.hero.subtitle;
    const timer = setInterval(() => {
      if (counter < fullText.length) {
        setTypedText(fullText.slice(0, counter + 1));
        counter++;
      } else clearInterval(timer);
    }, 60);
    return () => clearInterval(timer);
  }, [t.hero.subtitle]);

  useEffect(() => {
    const targets = { followers: 56, commits: 50, projects: 4, experience: 3 };
    const duration = 2400;
    const startTime = performance.now();
    const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    let raf;
    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const e = easeOutExpo(progress);
      setStats({
        followers: Math.floor(targets.followers * e),
        commits: Math.floor(targets.commits * e),
        projects: Math.floor(targets.projects * e),
        experience: Math.floor(targets.experience * e),
      });
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          subject: `[Portfolio] ${formData.subject}`,
          message: formData.message,
          from_name: 'semihaydin.dev',
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error();
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
    viewport: { once: true, margin: '-60px' },
  });

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar" role="navigation" aria-label="Ana navigasyon">
        <div className="navbar-content">
          <a href="#hero" className="navbar-logo" aria-label="Semih Aydın - Ana Sayfa">
            <picture>
              <source srcSet="/logowhitetrans.webp" type="image/webp" />
              <img src="/logowhitetrans-small.png" alt="Semih Aydın logo" width="40" height="40" fetchPriority="low" />
            </picture>
          </a>
          <div className="navbar-right">
            <div className="navbar-links">
              <a href="#about" className="navbar-link" onClick={() => setMenuOpen(false)}>{lang === 'tr' ? 'Hakkımda' : 'About'}</a>
              <a href="#skills" className="navbar-link" onClick={() => setMenuOpen(false)}>{lang === 'tr' ? 'Yetenekler' : 'Skills'}</a>
              <a href="#projects" className="navbar-link" onClick={() => setMenuOpen(false)}>{lang === 'tr' ? 'Projeler' : 'Projects'}</a>
              <a href="#certificates" className="navbar-link" onClick={() => setMenuOpen(false)}>{lang === 'tr' ? 'Sertifikalar' : 'Certificates'}</a>
              <a href="#contact" className="navbar-link" onClick={() => setMenuOpen(false)}>{lang === 'tr' ? 'İletişim' : 'Contact'}</a>
              <a href="/blog" className="navbar-link" onClick={() => setMenuOpen(false)}>Blog</a>
            </div>
            <div className="lang-toggle" role="group" aria-label="Dil seçimi">
              <button className={`lang-btn ${lang === 'tr' ? 'active' : ''}`} onClick={() => setLang('tr')} aria-pressed={lang === 'tr'}>TR</button>
              <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')} aria-pressed={lang === 'en'}>EN</button>
            </div>
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(p => !p)}
              aria-label="Menüyü aç/kapat"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-menu" role="menu">
            <a href="#about" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>{lang === 'tr' ? 'Hakkımda' : 'About'}</a>
            <a href="#skills" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>{lang === 'tr' ? 'Yetenekler' : 'Skills'}</a>
            <a href="#projects" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>{lang === 'tr' ? 'Projeler' : 'Projects'}</a>
            <a href="#certificates" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>{lang === 'tr' ? 'Sertifikalar' : 'Certificates'}</a>
            <a href="#contact" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>{lang === 'tr' ? 'İletişim' : 'Contact'}</a>
            <a href="/blog" className="mobile-menu-link" onClick={() => setMenuOpen(false)}>Blog</a>
            <div className="mobile-lang" role="group" aria-label="Dil seçimi">
              <button className={`lang-btn ${lang === 'tr' ? 'active' : ''}`} onClick={() => setLang('tr')}>TR</button>
              <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
            </div>
          </div>
        )}
      </nav>

      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />

      {showScrollTop && (
        <motion.button
          className="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          aria-label="Yukarı çık"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}

      {/* Hero */}
      <section className="hero" id="hero" aria-label="Hero">
        <div className="hero-bg"><div className="hero-grid" aria-hidden="true" /></div>
        <div className="hero-content">
          <h1>{t.hero.title}</h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            aria-live="polite"
          >
            {typedText}
          </motion.p>
          <motion.p
            className="university"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {t.hero.university}
          </motion.p>
          <motion.div
            className="social-links"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {[
              { href: 'https://www.linkedin.com/in/aydinsemih61', icon: Linkedin, label: 'LinkedIn' },
              { href: 'https://github.com/semyhist', icon: Github, label: 'GitHub' },
              { href: 'https://instagram.com/semjhaydin', icon: Instagram, label: 'Instagram' },
              { href: 'https://twitter.com/semyhist', icon: Twitter, label: 'Twitter' },
            ].map(({ href, icon: Icon, label }) => (
              <a key={label} href={href} className="social-link" target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon size={20} aria-hidden="true" />
                {label}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section" aria-label="İstatistikler">
        <div className="container">
          <div className="stats-grid">
            {[
              { value: `${stats.followers}K+`, label: t.stats.followers },
              { value: `${stats.commits}+`, label: t.stats.commits },
              { value: stats.projects, label: t.stats.projects },
              { value: `${stats.experience}+`, label: t.stats.experience },
            ].map(({ value, label }, i) => (
              <motion.div key={label} className="stat-card" {...fade(i * 0.08)}>
                <span className="stat-number">{value}</span>
                <span className="stat-label">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section" id="about" aria-labelledby="about-heading">
        <div className="container">
          <motion.h2 id="about-heading" {...fade()}>{t.about.title}</motion.h2>
          <div className="about-content">
            <motion.p {...fade(0.1)}>{t.about.p1}</motion.p>
            <motion.p {...fade(0.2)}>{t.about.p2}</motion.p>
            <motion.p {...fade(0.3)}>{t.about.p3}</motion.p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section" id="skills" aria-labelledby="skills-heading">
        <div className="container">
          <motion.h2 id="skills-heading" {...fade()}>{t.skills.title}</motion.h2>
          <div className="skills-grid">
            {[
              { icon: Code, title: t.skills.web.title, desc: t.skills.web.desc },
              { icon: Database, title: t.skills.data.title, desc: t.skills.data.desc },
              { icon: Users, title: t.skills.community.title, desc: t.skills.community.desc },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} className="skill-card" {...fade(i * 0.1)}>
                <div className="skill-icon"><Icon size={40} aria-hidden="true" /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section projects-section" id="projects" aria-labelledby="projects-heading">
        <div className="container">
          <motion.h2 id="projects-heading" {...fade()}>{t.projects.title}</motion.h2>
          <div className="projects-grid">
            <motion.article className="project-card project-featured" {...fade(0.05)}>
              <div className="project-content">
                <div className="project-label">{t.projects.featured}</div>
                <h3 className="project-title">{t.projects.arkakanat.title}</h3>
                <p className="project-description">{t.projects.arkakanat.desc}</p>
                <div className="project-tech">
                  {t.projects.arkakanat.tech.map((tech) => <span key={tech} className="tech-tag">{tech}</span>)}
                </div>
                <div className="project-links">
                  <a href="https://instagram.com/arkakanat" target="_blank" rel="noopener noreferrer" className="project-link">
                    <Instagram size={18} aria-hidden="true" />{t.projects.viewProject}
                  </a>
                </div>
              </div>
            </motion.article>

            {[
              { title: t.projects.easygit.title, desc: t.projects.easygit.desc, tech: t.projects.easygit.tech, github: 'https://github.com/semyhist/EasyGit', demo: null },
              { title: t.projects.batiyildirim.title, desc: t.projects.batiyildirim.desc, tech: t.projects.batiyildirim.tech, github: 'https://github.com/semyhist/batiyildirim', demo: 'https://batiyildirim.netlify.app' },
              { title: t.projects.togg.title, desc: t.projects.togg.desc, tech: t.projects.togg.tech, github: 'https://github.com/semyhist/togg-konsept', demo: 'https://toggkonsept.netlify.app' },
            ].map((project, i) => (
              <motion.article key={project.title} className="project-card" {...fade(0.1 + i * 0.08)}>
                <div className="project-content">
                  <div className="project-label">{t.projects.web}</div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.desc}</p>
                  <div className="project-tech">
                    {project.tech.map((tech) => <span key={tech} className="tech-tag">{tech}</span>)}
                  </div>
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link secondary">
                      <Github size={18} aria-hidden="true" />{t.projects.viewGithub}
                    </a>
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                        <ExternalLink size={18} aria-hidden="true" />{t.projects.viewProject}
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}

            <motion.a href="/projects" className="project-card project-view-all" {...fade(0.3)}>
              <div className="project-content view-all-content">
                <div className="view-all-icon"><ExternalLink size={40} aria-hidden="true" /></div>
                <h3 className="project-title">{t.projects.viewAll}</h3>
                <p className="project-description">
                  {lang === 'tr' ? '13 GitHub reposu, C projeleri, web uygulamaları ve daha fazlası.' : '13 GitHub repos, C projects, web apps and more.'}
                </p>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="section certificates" id="certificates" aria-labelledby="cert-heading">
        <div className="container">
          <motion.h2 id="cert-heading" {...fade()}>{t.certificates.title}</motion.h2>
          <motion.p className="section-desc" {...fade(0.1)}>{t.certificates.desc}</motion.p>
          <div className="certificates-slider">
            <div className="certificates-track" style={{ transform: `translateX(-${sliderIndex * 100}%)` }}>
              {certificates.map((cert, i) => (
                <article key={i} className="certificate-card">
                  <div className="certificate-icon"><Award size={40} aria-hidden="true" /></div>
                  <h3>{cert.title[lang]}</h3>
                  <div className="certificate-info">
                    <span className="certificate-issuer">{cert.issuer}</span>
                    <span className="certificate-date">{cert.date}</span>
                  </div>
                  <a href={cert.file} target="_blank" rel="noopener noreferrer" className="certificate-link">
                    {t.certificates.view}
                  </a>
                </article>
              ))}
            </div>
            <div className="slider-controls">
              <button className="slider-btn" onClick={() => setSliderIndex(p => Math.max(0, p - 1))} disabled={sliderIndex === 0} aria-label="Önceki">
                <ChevronLeft size={24} />
              </button>
              <button className="slider-btn" onClick={() => setSliderIndex(p => Math.min(certificates.length - 1, p + 1))} disabled={sliderIndex === certificates.length - 1} aria-label="Sonraki">
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="slider-dots" role="tablist">
              {certificates.map((_, i) => (
                <button key={i} className={`slider-dot ${sliderIndex === i ? 'active' : ''}`} onClick={() => setSliderIndex(i)} aria-label={`Sertifika ${i + 1}`} role="tab" aria-selected={sliderIndex === i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section contact" id="contact" aria-labelledby="contact-heading">
        <div className="container">
          <motion.h2 id="contact-heading" {...fade()}>{t.contact.title}</motion.h2>
          <motion.p className="section-desc" {...fade(0.1)}>{t.contact.desc}</motion.p>
          <div className="contact-content">
            <motion.form className="contact-form" onSubmit={handleFormSubmit} {...fade(0.15)} noValidate>
              <div className="form-group">
                <User size={20} aria-hidden="true" />
                <input type="text" name="name" placeholder={t.contact.form.name} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required aria-label={t.contact.form.name} />
              </div>
              <div className="form-group">
                <Mail size={20} aria-hidden="true" />
                <input type="email" name="email" placeholder={t.contact.form.email} value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required aria-label={t.contact.form.email} />
              </div>
              <div className="form-group">
                <MessageSquare size={20} aria-hidden="true" />
                <input type="text" name="subject" placeholder={t.contact.form.subject} value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} required aria-label={t.contact.form.subject} />
              </div>
              <div className="form-group">
                <MessageSquare size={20} aria-hidden="true" style={{ top: '20px', transform: 'none' }} />
                <textarea name="message" placeholder={t.contact.form.message} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={5} required aria-label={t.contact.form.message} />
              </div>
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                <Send size={20} aria-hidden="true" />
                {isSubmitting ? t.contact.form.sending : t.contact.form.send}
              </button>
              {formStatus === 'success' && (
                <div className="form-message success" role="alert">
                  <span className="form-message-icon">✓</span>
                  <span>{t.contact.form.success}</span>
                </div>
              )}
              {formStatus === 'error' && (
                <div className="form-message error" role="alert">
                  <span className="form-message-icon">✕</span>
                  <span>{t.contact.form.error}</span>
                </div>
              )}
            </motion.form>

            <motion.div className="social-links" {...fade(0.25)}>
              {[
                { href: 'https://www.linkedin.com/in/aydinsemih61', icon: Linkedin, label: 'LinkedIn' },
                { href: 'https://github.com/semyhist', icon: Github, label: 'GitHub' },
                { href: 'https://instagram.com/semjhaydin', icon: Instagram, label: 'Instagram' },
                { href: 'https://twitter.com/semyhist', icon: Twitter, label: 'Twitter' },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} className="social-link" target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon size={20} aria-hidden="true" />{label}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer-content">
            <p>© {new Date().getFullYear()} Semih Aydın. {t.footer.rights}</p>
            <p className="footer-made">{t.footer.made}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

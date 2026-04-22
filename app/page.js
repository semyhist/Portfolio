'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Mail,
  ArrowUp,
  Code,
  Database,
  Users,
  ExternalLink,
  Award,
  ChevronLeft,
  ChevronRight,
  User,
  MessageSquare,
  Send,
} from 'lucide-react';
import { translations } from './translations';

export default function Home() {
  const [lang, setLang] = useState('en');
  const [loading, setLoading] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [stats, setStats] = useState({
    followers: 0,
    commits: 0,
    projects: 0,
    experience: 0
  });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { scrollYProgress } = useScroll();
  const t = translations[lang];
  const fullText = t.hero.subtitle;

  const certificates = [
    {
      title: { tr: 'EF SET C1 İngilizce', en: 'EF SET C1 English' },
      issuer: 'EF SET',
      date: '2026',
      file: '/sertificates/B2_Seviye_İngilizce_Sertifika.pdf'
    },
    {
      title: { tr: 'C Programlama Dili', en: 'C Programming Language' },
      issuer: 'BTK Akademi',
      date: '2026',
      file: '/sertificates/C_Programlama_Dili_Sertifika.pdf'
    },
    {
      title: { tr: 'Anthropic Claude', en: 'Anthropic Claude' },
      issuer: 'Anthropic',
      date: '2026',
      file: '/sertificates/Anthropic_Claude_Sertifika.pdf'
    },
    {
      title: { tr: 'Perplexity AI', en: 'Perplexity AI' },
      issuer: 'Perplexity',
      date: '2026',
      file: '/sertificates/Perplexity_Sertifika.pdf'
    }
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let counter = 0;
    setTypedText('');
    const typingTimer = setInterval(() => {
      if (counter < fullText.length) {
        setTypedText(fullText.slice(0, counter + 1));
        counter++;
      } else {
        clearInterval(typingTimer);
      }
    }, 100);

    return () => clearInterval(typingTimer);
  }, [fullText]);

  useEffect(() => {
    const targets = { followers: 56, commits: 50, projects: 4, experience: 3 };
    const duration = 2400;
    const startTime = performance.now();

    // easeOutExpo — hızlı başlar, sona doğru yavaşlar
    const easeOutExpo = (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    let raf;
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      setStats({
        followers: Math.floor(targets.followers * eased),
        commits: Math.floor(targets.commits * eased),
        projects: Math.floor(targets.projects * eased),
        experience: Math.floor(targets.experience * eased),
      });
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          style={{
            width: '60px',
            height: '60px',
            border: '2px solid #262626',
            borderTop: '2px solid white',
            borderRadius: '50%',
          }}
        />
      </motion.div>
    );
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextSlide = () => {
    setSliderIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevSlide = () => {
    setSliderIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-content">
          <a href="#hero" className="navbar-logo">
            <img 
              src="/logowhitetrans.png" 
              alt="Semih Aydın"
            />
          </a>
          <div className="navbar-links">
            <a href="#about" className="navbar-link">{lang === 'tr' ? 'Hakkımda' : 'About'}</a>
            <a href="#skills" className="navbar-link">{lang === 'tr' ? 'Yetenekler' : 'Skills'}</a>
            <a href="#projects" className="navbar-link">{lang === 'tr' ? 'Projeler' : 'Projects'}</a>
            <a href="#certificates" className="navbar-link">{lang === 'tr' ? 'Sertifikalar' : 'Certificates'}</a>
            <a href="#contact" className="navbar-link">{lang === 'tr' ? 'İletişim' : 'Contact'}</a>
          </div>
        </div>
      </nav>

      <motion.div 
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />
      
      {showScrollTop && (
        <motion.button
          className="scroll-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ArrowUp size={20} />
        </motion.button>
      )}

      <div className="lang-toggle">
        <button 
          className={`lang-btn ${lang === 'tr' ? 'active' : ''}`}
          onClick={() => setLang('tr')}
        >
          TR
        </button>
        <button 
          className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
          onClick={() => setLang('en')}
        >
          EN
        </button>
      </div>

      <section className="hero" id="hero">
        <div className="hero-bg">
          <div className="hero-grid"></div>
        </div>
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {typedText}
          </motion.p>
          <motion.p
            className="university"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {t.hero.university}
          </motion.p>

          <motion.div
            className="social-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {[
              { href: 'https://www.linkedin.com/in/aydinsemih61', icon: Linkedin, label: 'LinkedIn' },
              { href: 'https://github.com/semyhist', icon: Github, label: 'GitHub' },
              { href: 'https://instagram.com/semjhaydin', icon: Instagram, label: 'Instagram' },
              { href: 'https://twitter.com/semyhist', icon: Twitter, label: 'Twitter' },
            ].map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={20} />
                  {social.label}
                </a>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <motion.div
              className="stat-card"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="stat-number">{stats.followers}K+</span>
              <span className="stat-label">{t.stats.followers}</span>
            </motion.div>
            <motion.div
              className="stat-card"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <span className="stat-number">{stats.commits}+</span>
              <span className="stat-label">{t.stats.commits}</span>
            </motion.div>
            <motion.div
              className="stat-card"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="stat-number">{stats.projects}</span>
              <span className="stat-label">{t.stats.projects}</span>
            </motion.div>
            <motion.div
              className="stat-card"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <span className="stat-number">{stats.experience}+</span>
              <span className="stat-label">{t.stats.experience}</span>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t.about.title}
          </motion.h2>
          <div className="about-content">
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {t.about.p1}
            </motion.p>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {t.about.p2}
            </motion.p>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {t.about.p3}
            </motion.p>
          </div>
        </div>
      </section>

      <section className="section" id="skills">
        <div className="container">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t.skills.title}
          </motion.h2>
          <div className="skills-grid">
            {[
              { icon: Code, title: t.skills.web.title, description: t.skills.web.desc },
              { icon: Database, title: t.skills.data.title, description: t.skills.data.desc },
              { icon: Users, title: t.skills.community.title, description: t.skills.community.desc },
            ].map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.title}
                  className="skill-card"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="skill-icon">
                    <Icon size={40} />
                  </div>
                  <h3>{skill.title}</h3>
                  <p>{skill.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section projects-section" id="projects">
        <div className="container">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t.projects.title}
          </motion.h2>
          <div className="projects-grid">
            <motion.div
              className="project-card project-featured"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="project-content">
                <div className="project-label">{t.projects.featured}</div>
                <h3 className="project-title">{t.projects.arkakanat.title}</h3>
                <p className="project-description">{t.projects.arkakanat.desc}</p>
                <div className="project-tech">
                  {t.projects.arkakanat.tech.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a 
                    href="https://instagram.com/arkakanat" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <Instagram size={18} />
                    {t.projects.viewProject}
                  </a>
                </div>
              </div>
            </motion.div>

            {[
              {
                title: t.projects.easygit.title,
                desc: t.projects.easygit.desc,
                tech: t.projects.easygit.tech,
                github: 'https://github.com/semyhist/EasyGit',
                demo: null
              },
              {
                title: t.projects.batiyildirim.title,
                desc: t.projects.batiyildirim.desc,
                tech: t.projects.batiyildirim.tech,
                github: 'https://github.com/semyhist/bati-yildirim',
                demo: 'https://batiyildirim.netlify.app'
              },
              {
                title: t.projects.togg.title,
                desc: t.projects.togg.desc,
                tech: t.projects.togg.tech,
                github: 'https://github.com/semyhist/togg-konsept',
                demo: 'https://toggkonsept.netlify.app'
              }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                className="project-card"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="project-content">
                  <div className="project-label">{t.projects.web}</div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.desc}</p>
                  <div className="project-tech">
                    {project.tech.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link secondary"
                    >
                      <Github size={18} />
                      {t.projects.viewGithub}
                    </a>
                    {project.demo && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <ExternalLink size={18} />
                        {t.projects.viewProject}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.a
              href="/projects"
              className="project-card project-view-all"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="project-content view-all-content">
                <div className="view-all-icon">
                  <ExternalLink size={40} />
                </div>
                <h3 className="project-title">{t.projects.viewAll}</h3>
                <p className="project-description">
                  {lang === 'tr'
                    ? '13 GitHub reposu, C projeleri, web uygulamaları ve daha fazlası.'
                    : '13 GitHub repos, C projects, web apps and more.'}
                </p>
                <div className="project-links">
                  <span className="project-link">
                    <ExternalLink size={18} />
                    {t.projects.viewAll}
                  </span>
                </div>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      <section className="section certificates" id="certificates">
        <div className="container">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t.certificates.title}
          </motion.h2>
          <motion.p
            className="section-desc"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {t.certificates.desc}
          </motion.p>
          <div className="certificates-slider">
            <div className="certificates-track" style={{ transform: `translateX(-${sliderIndex * 100}%)` }}>
              {certificates.map((cert, index) => (
                <div key={index} className="certificate-card">
                  <div className="certificate-icon">
                    <Award size={40} />
                  </div>
                  <h3>{cert.title[lang]}</h3>
                  <div className="certificate-info">
                    <span className="certificate-issuer">{cert.issuer}</span>
                    <span className="certificate-date">{cert.date}</span>
                  </div>
                  <a 
                    href={cert.file}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="certificate-link"
                  >
                    {t.certificates.view}
                  </a>
                </div>
              ))}
            </div>
            <div className="slider-controls">
              <button className="slider-btn" onClick={prevSlide} disabled={sliderIndex === 0}>
                <ChevronLeft size={24} />
              </button>
              <button className="slider-btn" onClick={nextSlide} disabled={sliderIndex === certificates.length - 1}>
                <ChevronRight size={24} />
              </button>
            </div>
            <div className="slider-dots">
              {certificates.map((_, index) => (
                <button
                  key={index}
                  className={`slider-dot ${sliderIndex === index ? 'active' : ''}`}
                  onClick={() => setSliderIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="container">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t.contact.title}
          </motion.h2>
          <motion.p
            className="section-desc"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {t.contact.desc}
          </motion.p>

          <div className="contact-content">
            <motion.form
              className="contact-form"
              onSubmit={handleFormSubmit}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="form-group">
                <User size={20} />
                <input
                  type="text"
                  name="name"
                  placeholder={t.contact.form.name}
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <Mail size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder={t.contact.form.email}
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <MessageSquare size={20} />
                <input
                  type="text"
                  name="subject"
                  placeholder={t.contact.form.subject}
                  value={formData.subject}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="form-group">
                <MessageSquare size={20} />
                <textarea
                  name="message"
                  placeholder={t.contact.form.message}
                  value={formData.message}
                  onChange={handleFormChange}
                  rows="5"
                  required
                />
              </div>
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                <Send size={20} />
                {isSubmitting ? t.contact.form.sending : t.contact.form.send}
              </button>
              {formStatus === 'success' && (
                <div className="form-message success">
                  <span className="form-message-icon">✓</span>
                  <span>{t.contact.form.success}</span>
                </div>
              )}
              {formStatus === 'error' && (
                <div className="form-message error">
                  <span className="form-message-icon">✕</span>
                  <span>{t.contact.form.error}</span>
                </div>
              )}
            </motion.form>

            <motion.div
              className="social-links"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {[
                { href: 'https://www.linkedin.com/in/aydinsemih61', icon: Linkedin, label: 'LinkedIn' },
                { href: 'https://github.com/semyhist', icon: Github, label: 'GitHub' },
                { href: 'https://instagram.com/semjhaydin', icon: Instagram, label: 'Instagram' },
                { href: 'https://twitter.com/semyhist', icon: Twitter, label: 'Twitter' },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={20} />
                    {social.label}
                  </a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="footer">
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

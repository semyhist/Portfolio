import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Youtube,
  Code,
  Palette,
  Video,
  Users,
  ArrowUp,
} from "lucide-react";
import { translations } from "../translations";

function AnaSayfa({ dil, setDil }) {
  const sayfaGec = useNavigate();
  const [yukleniyor, setYukleniyor] = useState(true);
  const [yazilanMetin, setYazilanMetin] = useState("");
  const [istatistikler, setIstatistikler] = useState({
    takipci: 0,
    proje: 0,
    deneyim: 0
  });
  const [fareKonum, setFareKonum] = useState({ x: 0, y: 0 });
  const [yukariGoster, setYukariGoster] = useState(false);
  const [aktifBolum, setAktifBolum] = useState(0);

  const { scrollY, scrollYProgress } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const ceviriler = translations[dil];
  const tamMetin = ceviriler.hero.subtitle;

  useEffect(() => {
    setTimeout(() => setYukleniyor(false), 2000);

    const fareHareket = (e) => {
      setFareKonum({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    const sayfaKaydir = () => {
      setYukariGoster(window.scrollY > 500);
      
      const bolumler = document.querySelectorAll('section');
      const kaydirmaPozisyon = window.scrollY + window.innerHeight / 2;
      
      bolumler.forEach((bolum, sira) => {
        const ust = bolum.offsetTop;
        const alt = ust + bolum.offsetHeight;
        if (kaydirmaPozisyon >= ust && kaydirmaPozisyon <= alt) {
          setAktifBolum(sira);
        }
      });
    };

    window.addEventListener('mousemove', fareHareket);
    window.addEventListener('scroll', sayfaKaydir);

    return () => {
      window.removeEventListener('mousemove', fareHareket);
      window.removeEventListener('scroll', sayfaKaydir);
    };
  }, []);

  useEffect(() => {
    let sayac = 0;
    setYazilanMetin("");
    const yazmaZamanlayici = setInterval(() => {
      if (sayac < tamMetin.length) {
        setYazilanMetin(tamMetin.slice(0, sayac + 1));
        sayac++;
      } else {
        clearInterval(yazmaZamanlayici);
      }
    }, 100);

    return () => clearInterval(yazmaZamanlayici);
  }, [tamMetin]);

  useEffect(() => {
    const hedefler = { takipci: 50000, proje: 3, deneyim: 3 };
    const sure = 2000;
    const adimlar = 60;
    const aralik = sure / adimlar;

    let adim = 0;
    const zamanlayici = setInterval(() => {
      adim++;
      const ilerleme = adim / adimlar;
      setIstatistikler({
        takipci: Math.floor(hedefler.takipci * ilerleme),
        proje: Math.floor(hedefler.proje * ilerleme),
        deneyim: Math.floor(hedefler.deneyim * ilerleme)
      });
      if (adim >= adimlar) clearInterval(zamanlayici);
    }, aralik);

    return () => clearInterval(zamanlayici);
  }, []);

  if (yukleniyor) {
    return (
      <motion.div
        className="loading-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(45deg, #ff006e, #8338ec, #3a86ff)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{
            width: "100px",
            height: "100px",
            border: "4px solid rgba(255, 255, 255, 0.3)",
            borderTop: "4px solid white",
            borderRadius: "50%",
          }}
        />
      </motion.div>
    );
  }

  const yukariCik = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bolumGit = (sira) => {
    const bolumler = document.querySelectorAll('section');
    bolumler[sira]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      <div className="App">
        <motion.div 
          className="scroll-progress"
          style={{ scaleX: scrollYProgress }}
        />
        {yukariGoster && (
          <motion.button
            className="scroll-to-top"
            onClick={yukariCik}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={24} />
          </motion.button>
        )}

        <div className="scroll-indicator">
          {[0, 1, 2, 3, 4, 5].map((sira) => (
            <button
              key={sira}
              className={`scroll-dot ${aktifBolum === sira ? 'active' : ''}`}
              onClick={() => bolumGit(sira)}
              aria-label={`Bölüm ${sira + 1}'e git`}
            />
          ))}
        </div>

        <div className="lang-toggle">
          <button 
            className={`lang-btn ${dil === 'tr' ? 'active' : ''}`}
            onClick={() => setDil('tr')}
          >
            TR
          </button>
          <button 
            className={`lang-btn ${dil === 'en' ? 'active' : ''}`}
            onClick={() => setDil('en')}
          >
            EN
          </button>
        </div>

        <motion.section
          className="hero parallax-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="container parallax-layer"
            style={{
              x: fareKonum.x,
              y: fareKonum.y
            }}
          >
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ y: y1, opacity }}
            >
              {ceviriler.hero.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {yazilanMetin}
            </motion.p>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5 }}
              style={{ y: y2 }}
            >
              {ceviriler.hero.university}
            </motion.p>

            <motion.div
              className="social-links"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2, staggerChildren: 0.1 }}
            >
              {[
                {
                  href: "https://www.linkedin.com/in/aydinsemih61",
                  icon: Linkedin,
                  label: "LinkedIn",
                },
                {
                  href: "https://github.com/semyhist",
                  icon: Github,
                  label: "GitHub",
                },
                {
                  href: "https://instagram.com/semyhist",
                  icon: Instagram,
                  label: "Instagram",
                },
                {
                  href: "https://twitter.com/semyhist",
                  icon: Twitter,
                  label: "Twitter",
                },
                {
                  href: "https://youtube.com/@semyhist",
                  icon: Youtube,
                  label: "YouTube",
                },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2.2 + index * 0.1 }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={24} />
                    {social.label}
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section
          className="stats-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container">
            <div className="stats-grid">
              <motion.div
                className="stat-card"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="stat-number">{istatistikler.takipci.toLocaleString()}+</span>
                <span className="stat-label">{ceviriler.stats.followers}</span>
              </motion.div>
              <motion.div
                className="stat-card"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <span className="stat-number">{istatistikler.proje}</span>
                <span className="stat-label">{ceviriler.stats.projects}</span>
              </motion.div>
              <motion.div
                className="stat-card"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <span className="stat-number">{istatistikler.deneyim}+</span>
                <span className="stat-label">{ceviriler.stats.experience}</span>
              </motion.div>

            </div>
          </div>
        </motion.section>

        <motion.section
          className="section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container">
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {ceviriler.about.title}
            </motion.h2>
            <div className="about-content">
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                {ceviriler.about.p1}
              </motion.p>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {ceviriler.about.p2.split('@arkakanat')[0]}
                <a 
                  href="https://instagram.com/arkakanat" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    color: '#ff006e',
                    textDecoration: 'none',
                    fontWeight: '600',
                    borderBottom: '1px solid rgba(255, 0, 110, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderBottomColor = '#ff006e';
                    e.target.style.color = '#8338ec';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderBottomColor = 'rgba(255, 0, 110, 0.3)';
                    e.target.style.color = '#ff006e';
                  }}
                >
                  @arkakanat
                </a>
                {ceviriler.about.p2.split('@arkakanat')[1]}
              </motion.p>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                {ceviriler.about.p3}
              </motion.p>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {ceviriler.skills.title}
            </motion.h2>
            <div className="skills-grid">
              {[
                {
                  icon: Code,
                  title: ceviriler.skills.software.title,
                  description: ceviriler.skills.software.desc,
                },
                {
                  icon: Palette,
                  title: ceviriler.skills.design.title,
                  description: ceviriler.skills.design.desc,
                },
                {
                  icon: Video,
                  title: ceviriler.skills.video.title,
                  description: ceviriler.skills.video.desc,
                },
                {
                  icon: Users,
                  title: ceviriler.skills.community.title,
                  description: ceviriler.skills.community.desc,
                },
              ].map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.title}
                    className="skill-card"
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                    whileHover={{
                      y: -5,
                      transition: { duration: 0.2 },
                    }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="skill-icon"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon size={40} />
                    </motion.div>
                    <h3>{skill.title}</h3>
                    <p>{skill.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        <motion.section
          className="section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {ceviriler.projects.title}
            </motion.h2>
            <div className="projects-grid">
              {[
                {
                  id: 'arkakanat',
                  title: ceviriler.projects.arkakanat.title,
                  description: ceviriler.projects.arkakanat.desc,
                  tags: [
                    "Social Media",
                    "Content Creation",
                    "Viral Designs",
                    "Community Leader",
                  ],
                  hasDetails: false,
                },
                {
                  id: 'web',
                  title: ceviriler.projects.web.title,
                  description: ceviriler.projects.web.desc,
                  tags: ["Python", "JavaScript", "React.js", "HTML/CSS"],
                  hasDetails: true,
                },
                {
                  id: 'design',
                  title: ceviriler.projects.design.title,
                  description: ceviriler.projects.design.desc,
                  tags: [
                    "Photoshop",
                    "Illustrator",
                    "After Effects",
                    "Premiere Pro",
                  ],
                  hasDetails: false,
                },
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  className="project-card"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                  viewport={{ once: true }}
                >
                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tech">
                      {project.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tag}
                          className="tech-tag"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
                          viewport={{ once: true }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                    {project.hasDetails && (
                      <button
                        className="view-details-btn"
                        onClick={() => sayfaGec('/projects')}
                      >
                        {dil === 'tr' ? 'Projeleri Gör' : 'View Projects'}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          className="section contact"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {ceviriler.contact.title}
            </motion.h2>
            <div className="contact-info">
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {ceviriler.contact.desc}
              </motion.p>

              <motion.div
                className="social-links"
                style={{ marginTop: "40px" }}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {[
                  {
                    href: "https://www.linkedin.com/in/aydinsemih61",
                    icon: Linkedin,
                    label: "LinkedIn",
                  },
                  {
                    href: "https://github.com/semyhist",
                    icon: Github,
                    label: "GitHub",
                  },
                  {
                    href: "https://instagram.com/semyhist",
                    icon: Instagram,
                    label: "Instagram",
                  },
                  {
                    href: "https://twitter.com/semyhist",
                    icon: Twitter,
                    label: "Twitter",
                  },
                  {
                    href: "https://youtube.com/@semyhist",
                    icon: Youtube,
                    label: "YouTube",
                  },
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className="social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      viewport={{ once: true }}
                    >
                      <Icon size={24} />
                      {social.label}
                    </motion.a>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </AnimatePresence>
  );
}

export default AnaSayfa;

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
import { translations } from "./translations";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [lang, setLang] = useState("tr");
  const [visitors, setVisitors] = useState(0);
  const [stats, setStats] = useState({
    followers: 0,
    projects: 0,
    experience: 0,
    visitors: 0
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const { scrollY, scrollYProgress } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const t = translations[lang];
  const fullText = t.hero.subtitle;

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);

    const count = parseInt(localStorage.getItem('visitorCount') || '0');
    const newCount = count + 1;
    localStorage.setItem('visitorCount', newCount.toString());
    setVisitors(newCount);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
      
      const sections = document.querySelectorAll('section');
      const scrollPos = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((section, index) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (scrollPos >= top && scrollPos <= bottom) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    let i = 0;
    setTypedText("");
    const typeTimer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeTimer);
      }
    }, 100);

    return () => clearInterval(typeTimer);
  }, [fullText]);

  useEffect(() => {
    const targets = { followers: 50000, projects: 15, experience: 3, visitors };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setStats({
        followers: Math.floor(targets.followers * progress),
        projects: Math.floor(targets.projects * progress),
        experience: Math.floor(targets.experience * progress),
        visitors: Math.floor(targets.visitors * progress)
      });
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [visitors]);

  if (isLoading) {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (index) => {
    const sections = document.querySelectorAll('section');
    sections[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      <div className="App">
        <motion.div 
          className="scroll-progress"
          style={{ scaleX: scrollYProgress }}
        />
        {showScrollTop && (
          <motion.button
            className="scroll-to-top"
            onClick={scrollToTop}
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
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <button
              key={index}
              className={`scroll-dot ${activeSection === index ? 'active' : ''}`}
              onClick={() => scrollToSection(index)}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>

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

        <motion.section
          className="hero parallax-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="container parallax-layer"
            style={{
              x: mousePosition.x,
              y: mousePosition.y
            }}
          >
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ y: y1, opacity }}
            >
              {t.hero.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {typedText}
            </motion.p>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5 }}
              style={{ y: y2 }}
            >
              {t.hero.university}
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
                <span className="stat-number">{stats.followers.toLocaleString()}+</span>
                <span className="stat-label">{t.stats.followers}</span>
              </motion.div>
              <motion.div
                className="stat-card"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <span className="stat-number">{stats.projects}</span>
                <span className="stat-label">{t.stats.projects}</span>
              </motion.div>
              <motion.div
                className="stat-card"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <span className="stat-number">{stats.experience}+</span>
                <span className="stat-label">{t.stats.experience}</span>
              </motion.div>
              <motion.div
                className="stat-card"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <span className="stat-number">{stats.visitors.toLocaleString()}</span>
                <span className="stat-label">{t.stats.visitors}</span>
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
                {t.about.p2.split('@arkakanat')[0]}
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
                {t.about.p2.split('@arkakanat')[1]}
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
              {t.skills.title}
            </motion.h2>
            <div className="skills-grid">
              {[
                {
                  icon: Code,
                  title: t.skills.software.title,
                  description: t.skills.software.desc,
                },
                {
                  icon: Palette,
                  title: t.skills.design.title,
                  description: t.skills.design.desc,
                },
                {
                  icon: Video,
                  title: t.skills.video.title,
                  description: t.skills.video.desc,
                },
                {
                  icon: Users,
                  title: t.skills.community.title,
                  description: t.skills.community.desc,
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
              {t.projects.title}
            </motion.h2>
            <div className="projects-grid">
              {[
                {
                  title: t.projects.arkakanat.title,
                  description: t.projects.arkakanat.desc,
                  tags: [
                    "Social Media",
                    "Content Creation",
                    "Viral Designs",
                    "Community Leader",
                  ],
                },
                {
                  title: t.projects.web.title,
                  description: t.projects.web.desc,
                  tags: ["Python", "JavaScript", "React.js", "HTML/CSS"],
                },
                {
                  title: t.projects.design.title,
                  description: t.projects.design.desc,
                  tags: [
                    "Photoshop",
                    "Illustrator",
                    "After Effects",
                    "Premiere Pro",
                  ],
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
              {t.contact.title}
            </motion.h2>
            <div className="contact-info">
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {t.contact.desc}
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

export default App;

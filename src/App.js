import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [typedText, setTypedText] = useState("");

  const fullText = "Bilgisayar Mühendisliği Öğrencisi, Tasarımcı, Editör";

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);

    let i = 0;
    const typeTimer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeTimer);
      }
    }, 100);

    return () => {
      clearInterval(typeTimer);
    };
  }, []);

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

  return (
    <AnimatePresence>
      <div className="App">
        {/* Hero Section */}
        <motion.section
          className="hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="container">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Semih Aydın
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
            >
              Trabzon Üniversitesi - 1. Sınıf
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
          </div>
        </motion.section>

        {/* About Section */}
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
              Hakkımda
            </motion.h2>
            <div className="about-content">
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Merhaba! Ben Semih, Trabzon Üniversitesi Bilgisayar Mühendisliği
                1. sınıf öğrencisiyim. Küçük yaşlardan beri bilgisayar, tasarım
                ve video editlemeye olan ilgimi yıllar içinde geliştirerek ileri
                seviyeye taşıdım.
              </motion.p>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                16 yaşımda kurduğum Formula 1 sosyal medya sayfası (
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
                ) bugün 50.000'i aşkın takipçiye ulaştı. Bu deneyim
                bana içerik üretimi ve topluluk yönetimi konusunda değerli
                tecrübeler kazandırdı.
              </motion.p>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Üniversiteye başlamadan önce Python, JavaScript ve React.js ile
                projeler geliştirerek yazılım alanına adım attım. Şimdi bu
                alandaki bilgilerimi daha da ilerletmeyi hedefliyorum.
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
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
              Yeteneklerim ✨
            </motion.h2>
            <div className="skills-grid">
              {[
                {
                  icon: Code,
                  title: "Yazılım",
                  description:
                    "Python, JavaScript, React.js ile web uygulamaları yapabiliyorum.",
                },
                {
                  icon: Palette,
                  title: "Tasarım",
                  description:
                    "Grafik tasarım ve görsel içerik üretiminde Adobe programlarını (Photoshop, Illustrator) kullanabiliyorum.",
                },
                {
                  icon: Video,
                  title: "Video Editlme",
                  description:
                    "Profesyonel video editlme konusunda Adobe After Effects ve Premiere Pro kullanabiliyorum.",
                },
                {
                  icon: Users,
                  title: "Topluluk Yönetimi",
                  description:
                    "50K+ takipçili Formula 1 sayfamla topluluk yönetimi yapabiliyorum. Birlikte ortak projeler yapabiliyorum.",
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

        {/* Projects Section */}
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
              Projelerim
            </motion.h2>
            <div className="projects-grid">
              {[
                {
                  title: "@arkakanat - Motorsporları",
                  description:
                    "16 yaşımda kurduğum ve 50.000+ takipçiye ulaşan Formula 1 sosyal medya sayfası. Günlük on binlerce kişiye ulaşan içerikler üretiyoruz.",
                  tags: [
                    "Sosyal Medya",
                    "İçerik Üretimi",
                    "Viral Tasarımlar",
                    "Topluluk Lideri",
                  ],
                },
                {
                  title: "Web Geliştirme",
                  description:
                    "Python, JavaScript ve React.js ile geliştirdiğim çeşitli web uygulamaları. Her proje bir deneyim, her kod satırı bir öğrenme. Sürekli kendimi geliştiriyorum!",
                  tags: ["Python", "JavaScript", "React.js", "HTML/CSS"],
                },
                {
                  title: "Tasarım & Video",
                  description:
                    "Yıllar içinde geliştirdiğim grafik tasarım ve video editlme projelerimi var. Kendimi geliştirme ve yaratıcı olma konusunda da calışıyorum.",
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

        {/* Contact Section */}
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
              Sosyal Medya Bağlantılarım
            </motion.h2>
            <div className="contact-info">
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Projeler, işbirlikleri veya herhangi bir konu için benimle
                aşağıdaki bağlantıları kullanarak iletişime geçebilirsiniz.
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

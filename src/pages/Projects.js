import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowLeft, Code, Lightbulb, Wrench, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { projeler } from "../projectsData";

function Projeler({ dil }) {
  const geriDon = useNavigate();
  const metinler = dil === 'tr' ? {
    title: "Web Projelerim",
    back: "Ana Sayfaya Dön",
    github: "GitHub",
    demo: "Canlı Demo",
    about: "Proje Hakkında",
    why: "Neden Yaptım?",
    tech: "Kullanılan Teknolojiler",
    features: "Özellikler",
    code: "Kod Dağılımı"
  } : {
    title: "My Web Projects",
    back: "Back to Home",
    github: "GitHub",
    demo: "Live Demo",
    about: "About Project",
    why: "Why I Built This",
    tech: "Technologies Used",
    features: "Features",
    code: "Code Distribution"
  };

  return (
    <div className="projects-page">
      <motion.button
        className="back-button"
        onClick={() => geriDon('/')}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -5 }}
      >
        <ArrowLeft size={20} />
        {metinler.back}
      </motion.button>

      <div className="container">
        <motion.h1
          className="projects-page-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {metinler.title}
        </motion.h1>
        <motion.p
          className="projects-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {dil === 'tr' ? 'Geliştirdiğim web projeleri ve detayları' : 'Web projects I developed and their details'}
        </motion.p>

        <div className="projects-list">
          {projeler.webProjeler.map((proje, index) => (
            <motion.div
              key={proje.id}
              className="project-detail-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="project-detail-header">
                <h2>{proje.baslik[dil]}</h2>
                <p>{proje.kisa[dil]}</p>
                <div className="project-links">
                  <a href={proje.github} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                    <Github size={18} />
                    {metinler.github}
                  </a>
                  <a href={proje.demo} target="_blank" rel="noopener noreferrer" className="project-link-btn demo">
                    <ExternalLink size={18} />
                    {metinler.demo}
                  </a>
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
                    {proje.teknolojiler.map((tech) => (
                      <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <h3><CheckCircle size={20} />{metinler.features}</h3>
                  <ul className="features-list">
                    {proje.ozellikler[dil].map((ozellik, idx) => (
                      <li key={idx}>{ozellik}</li>
                    ))}
                  </ul>
                </div>

                {proje.kodDagilimi && (
                  <div className="detail-section">
                    <h3>{metinler.code}</h3>
                    <div className="code-stats">
                      <div className="stat-bar">
                        <div className="stat-fill html" style={{ width: proje.kodDagilimi.html }}>
                          <span>HTML {proje.kodDagilimi.html}</span>
                        </div>
                      </div>
                      <div className="stat-bar">
                        <div className="stat-fill css" style={{ width: proje.kodDagilimi.css }}>
                          <span>CSS {proje.kodDagilimi.css}</span>
                        </div>
                      </div>
                      <div className="stat-bar">
                        <div className="stat-fill js" style={{ width: proje.kodDagilimi.js }}>
                          <span>JS {proje.kodDagilimi.js}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projeler;

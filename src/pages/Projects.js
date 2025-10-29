import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowLeft, Code, Lightbulb, Wrench, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { projectsData } from "../projectsData";

function Projects({ lang }) {
  const navigate = useNavigate();
  const t = lang === 'tr' ? {
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
        onClick={() => navigate('/')}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -5 }}
      >
        <ArrowLeft size={20} />
        {t.back}
      </motion.button>

      <div className="container">
        <motion.h1
          className="projects-page-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t.title}
        </motion.h1>
        <motion.p
          className="projects-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {lang === 'tr' ? 'Geliştirdiğim web projeleri ve detayları' : 'Web projects I developed and their details'}
        </motion.p>

        <div className="projects-list">
          {projectsData.web.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-detail-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="project-detail-header">
                <h2>{project.name}</h2>
                <p>{project.shortDesc}</p>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                    <Github size={18} />
                    {t.github}
                  </a>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link-btn demo">
                    <ExternalLink size={18} />
                    {t.demo}
                  </a>
                </div>
              </div>

              <div className="project-detail-body">
                <div className="detail-section">
                  <h3><Code size={20} />{t.about}</h3>
                  <p>{project.fullDesc}</p>
                </div>

                <div className="detail-section">
                  <h3><Lightbulb size={20} />{t.why}</h3>
                  <p>{project.why}</p>
                </div>

                <div className="detail-section">
                  <h3><Wrench size={20} />{t.tech}</h3>
                  <div className="tech-badges">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <h3><CheckCircle size={20} />{t.features}</h3>
                  <ul className="features-list">
                    {project.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {project.stats && (
                  <div className="detail-section">
                    <h3>{t.code}</h3>
                    <div className="code-stats">
                      <div className="stat-bar">
                        <div className="stat-fill html" style={{ width: project.stats.html }}>
                          <span>HTML {project.stats.html}</span>
                        </div>
                      </div>
                      <div className="stat-bar">
                        <div className="stat-fill css" style={{ width: project.stats.css }}>
                          <span>CSS {project.stats.css}</span>
                        </div>
                      </div>
                      <div className="stat-bar">
                        <div className="stat-fill js" style={{ width: project.stats.js }}>
                          <span>JS {project.stats.js}</span>
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

export default Projects;

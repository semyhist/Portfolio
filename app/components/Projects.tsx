'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const featuredProjects = [
    {
      title: 'Arka Kanat Platform',
      desc: 'Motorsports media platform with 56K+ followers and 18M monthly reach. React + Vite powered.',
      tags: ['React', 'Vite', 'Social Media'],
      github: 'https://github.com/semyhist/arkakanat',
      demo: 'https://arkakanat.netlify.app',
      featured: true,
    },
    {
      title: 'Batı Yıldırım Racing',
      desc: 'Official website for professional Porsche Carrera Cup driver. Bilingual platform with career timeline.',
      tags: ['React', 'Framer Motion', 'Bilingual'],
      github: 'https://github.com/semyhist/batiyildirim',
      demo: 'https://batiyildirim.netlify.app',
      featured: true,
    },
    {
      title: 'CAN Bus Simulator',
      desc: 'Automotive protocol simulator for testing and development. Real-time data communication.',
      tags: ['C', 'Embedded', 'Automotive'],
      github: 'https://github.com/semyhist/CANBusSimulator',
      featured: false,
    },
    {
      title: 'Telemetry Simulator',
      desc: 'Racing telemetry data simulation and analysis tool for motorsports applications.',
      tags: ['C', 'Data Analysis', 'Real-time'],
      github: 'https://github.com/semyhist/telemetrysim',
      featured: false,
    },
  ]

  return (
    <section ref={ref} className="relative py-32 bg-carbon-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-block mb-4 px-4 py-2 bg-electric-orange/10 border border-electric-orange/20 rounded-full">
            <span className="text-electric-orange text-sm font-mono tracking-wider">PORTFOLIO</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter max-w-2xl">
              Selected <span className="bg-gradient-to-r from-electric-blue to-electric-orange bg-clip-text text-transparent">Work</span>
            </h2>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <span className="font-mono text-sm">View all projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative bg-carbon-50 border border-gray-800 p-8 hover:border-electric-blue/30 transition-all duration-500 overflow-hidden ${
                project.featured ? 'lg:row-span-1' : ''
              }`}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/0 to-electric-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative h-full flex flex-col">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-electric-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{project.desc}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono bg-carbon-100 border border-gray-800 text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-auto flex items-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span className="font-mono">Code</span>
                  </a>
                  {project.demo && (
                    <>
                      <div className="h-4 w-px bg-gray-800" />
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-electric-blue transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="font-mono">Live</span>
                      </a>
                    </>
                  )}
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-gray-800 group-hover:border-electric-blue/30 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

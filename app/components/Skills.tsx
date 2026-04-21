'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Palette, Brain, Terminal, Rocket, Users } from 'lucide-react'

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const skills = [
    {
      icon: Code2,
      title: 'Software Development',
      desc: 'Full-stack development with React, Next.js, TypeScript, and modern web technologies. Building scalable applications with clean architecture.',
      tags: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python'],
      color: 'electric-blue',
    },
    {
      icon: Terminal,
      title: 'Systems Programming',
      desc: 'Low-level programming in C for embedded systems, telemetry data processing, and automotive software development.',
      tags: ['C', 'Embedded', 'Real-time', 'CAN Bus'],
      color: 'electric-orange',
    },
    {
      icon: Brain,
      title: 'Data Analysis & AI',
      desc: 'Motorsports telemetry analysis, SQL optimization, and machine learning for predictive racing insights.',
      tags: ['SQL', 'Python', 'Data Science', 'ML'],
      color: 'electric-blue',
    },
    {
      icon: Palette,
      title: 'Design & Content',
      desc: 'Creating engaging motorsports content with Adobe Creative Suite. Managing 56K+ community across social platforms.',
      tags: ['Photoshop', 'Premiere Pro', 'After Effects'],
      color: 'electric-orange',
    },
    {
      icon: Rocket,
      title: 'Project Management',
      desc: 'Leading technical projects from concept to deployment. Agile methodologies and cross-functional team coordination.',
      tags: ['Agile', 'Git', 'CI/CD', 'Leadership'],
      color: 'electric-blue',
    },
    {
      icon: Users,
      title: 'Community Building',
      desc: 'Built Arka Kanat from zero to 56K+ followers with 18M monthly reach. Content strategy and audience engagement.',
      tags: ['Social Media', 'Content Strategy', 'Analytics'],
      color: 'electric-orange',
    },
  ]

  return (
    <section ref={ref} className="relative py-32 bg-carbon-50/30 border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4 px-4 py-2 bg-electric-blue/10 border border-electric-blue/20 rounded-full">
            <span className="text-electric-blue text-sm font-mono tracking-wider">CAPABILITIES</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter">
            Technical <span className="bg-gradient-to-r from-electric-blue to-electric-orange bg-clip-text text-transparent">Arsenal</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-carbon-100 border border-gray-800 p-8 hover:border-electric-blue/30 transition-all duration-500 overflow-hidden"
            >
              {/* Hover Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br from-${skill.color}/0 to-${skill.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative">
                {/* Icon */}
                <div className={`inline-flex p-4 bg-${skill.color}/10 border border-${skill.color}/20 mb-6`}>
                  <skill.icon className={`w-6 h-6 text-${skill.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 tracking-tight">{skill.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{skill.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono bg-carbon-50 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-gray-800 group-hover:border-electric-blue/30 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

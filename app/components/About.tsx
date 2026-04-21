'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Gauge, Database, Cpu, Trophy } from 'lucide-react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const highlights = [
    { icon: Trophy, title: 'Arka Kanat', desc: '56K+ followers motorsports platform', color: 'electric-orange' },
    { icon: Database, title: 'Fibabanka', desc: 'SQL optimization & big data', color: 'electric-blue' },
    { icon: Gauge, title: 'Telemetry', desc: 'Racing data analysis systems', color: 'electric-orange' },
    { icon: Cpu, title: 'AI & ML', desc: 'Future racing technology', color: 'electric-blue' },
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
            <span className="text-electric-orange text-sm font-mono tracking-wider">ABOUT</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter max-w-3xl">
            Engineering the intersection of{' '}
            <span className="bg-gradient-to-r from-electric-blue to-electric-orange bg-clip-text text-transparent">
              speed and data
            </span>
          </h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Large Card - Main Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 bg-carbon-50 border border-gray-800 p-10 relative overflow-hidden group hover:border-electric-blue/30 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-electric-blue/5 rounded-full blur-3xl group-hover:bg-electric-blue/10 transition-all duration-500" />
            
            <div className="relative space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg">
                I'm a <span className="text-white font-semibold">Computer Engineering student</span> at Trabzon University, 
                merging my passion for motorsports with cutting-edge software development. Specialized in{' '}
                <span className="text-electric-blue font-semibold">React, JavaScript, C, and Java</span>.
              </p>
              
              <p className="text-lg">
                Since March 2024, I've been building <span className="text-electric-orange font-semibold">Arka Kanat</span> — 
                a motorsports media platform that reached <span className="text-white font-semibold">18 million impressions</span> in 
                just 3 months with 56,000+ followers. We deliver Formula 1 and motorsports content to a massive audience.
              </p>
              
              <p className="text-lg">
                At <span className="text-white font-semibold">Fibabanka's IT department</span>, I gained hands-on experience 
                with large-scale datasets and SQL query optimization. Now I'm developing projects around{' '}
                <span className="text-electric-blue font-semibold">racing telemetry systems</span>, automotive software, 
                and AI-driven motorsports analytics.
              </p>

              <div className="pt-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-electric-blue/50 to-transparent" />
                <span className="text-sm text-gray-500 font-mono">Building tomorrow's racing tech today</span>
              </div>
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <div className="space-y-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-carbon-50 border border-gray-800 p-6 hover:border-electric-blue/30 transition-all duration-500 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 bg-${item.color}/10 border border-${item.color}/20`}>
                    <item.icon className={`w-5 h-5 text-${item.color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { TrendingUp, Users, Code2, Zap } from 'lucide-react'

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [counts, setCounts] = useState({ commits: 0, projects: 0, followers: 0, reach: 0 })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const interval = duration / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps
        setCounts({
          commits: Math.floor(40 * progress),
          projects: Math.floor(11 * progress),
          followers: Math.floor(56 * progress),
          reach: Math.floor(18 * progress),
        })
        if (step >= steps) clearInterval(timer)
      }, interval)

      return () => clearInterval(timer)
    }
  }, [isInView])

  const stats = [
    { icon: Code2, label: 'GitHub Commits', value: `${counts.commits}+`, color: 'electric-blue', description: 'Active development' },
    { icon: Zap, label: 'Live Projects', value: counts.projects, color: 'electric-orange', description: 'Production ready' },
    { icon: Users, label: 'Community', value: `${counts.followers}K+`, color: 'electric-blue', description: 'Arka Kanat followers' },
    { icon: TrendingUp, label: 'Monthly Reach', value: `${counts.reach}M`, color: 'electric-orange', description: 'Content impressions' },
  ]

  return (
    <section ref={ref} className="relative py-24 border-y border-gray-800 bg-carbon-50/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4 px-4 py-2 bg-electric-blue/10 border border-electric-blue/20 rounded-full">
            <span className="text-electric-blue text-sm font-mono tracking-wider">PERFORMANCE METRICS</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tighter">
            Impact by the <span className="bg-gradient-to-r from-electric-blue to-electric-orange bg-clip-text text-transparent">Numbers</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-carbon-100 border border-gray-800 p-8 hover:border-electric-blue/30 transition-all duration-500 overflow-hidden"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}/0 to-${stat.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <stat.icon className={`w-8 h-8 text-${stat.color}`} />
                  <div className="h-px w-12 bg-gradient-to-r from-gray-800 to-transparent" />
                </div>
                
                <div className="mb-2">
                  <div className="text-5xl font-black tracking-tighter mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500 font-mono uppercase tracking-wider">{stat.label}</div>
                </div>
                
                <div className="text-xs text-gray-600 mt-4">{stat.description}</div>
              </div>

              {/* Corner Accent */}
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r border-b border-gray-800 group-hover:border-electric-blue/30 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

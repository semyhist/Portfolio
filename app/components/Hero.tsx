'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram, Twitter, Youtube, ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/aydinsemih61', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/semyhist', label: 'GitHub' },
    { icon: Instagram, href: 'https://instagram.com/semjhaydin', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/semyhist', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com/@semjhaydin', label: 'YouTube' },
  ]

  if (!mounted) return null

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-carbon-100 via-carbon-50 to-carbon-100">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, #18181b 1px, transparent 1px),
              linear-gradient(to bottom, #18181b 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-flow 20s linear infinite'
          }}
        />
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-orange/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="inline-block mb-4 px-4 py-2 bg-electric-blue/10 border border-electric-blue/20 rounded-full">
              <span className="text-electric-blue text-sm font-mono tracking-wider">MOTORSPORTS × ENGINEERING</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter mb-6 leading-none">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Semih
              </span>
              <br />
              <span className="bg-gradient-to-r from-electric-blue to-electric-orange bg-clip-text text-transparent">
                Aydın
              </span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 max-w-xl leading-relaxed">
              Motorsports Data Analyst & Software Engineer crafting the future of racing technology through telemetry systems and AI-driven insights.
            </p>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-electric-blue to-transparent" />
              <span className="text-sm text-gray-500 font-mono">Trabzon University — Computer Engineering</span>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="group relative px-5 py-3 bg-carbon-50/50 border border-gray-800 hover:border-electric-blue/50 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/0 via-electric-blue/10 to-electric-blue/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <div className="relative flex items-center gap-2">
                    <social.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{social.label}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Bento Grid Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {/* Large Card */}
            <div className="col-span-2 bg-gradient-to-br from-carbon-50 to-carbon-100 border border-gray-800 p-8 relative overflow-hidden group hover:border-electric-blue/30 transition-all duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-electric-blue/5 rounded-full blur-2xl group-hover:bg-electric-blue/10 transition-all duration-500" />
              <div className="relative">
                <div className="text-sm text-gray-500 font-mono mb-2">REACH</div>
                <div className="text-5xl font-black tracking-tighter mb-2">18M+</div>
                <div className="text-gray-400 text-sm">Monthly impressions across motorsports content</div>
              </div>
            </div>

            {/* Small Cards */}
            <div className="bg-carbon-50 border border-gray-800 p-6 hover:border-electric-orange/30 transition-all duration-500">
              <div className="text-sm text-gray-500 font-mono mb-2">COMMITS</div>
              <div className="text-4xl font-black tracking-tighter">40+</div>
            </div>

            <div className="bg-carbon-50 border border-gray-800 p-6 hover:border-electric-orange/30 transition-all duration-500">
              <div className="text-sm text-gray-500 font-mono mb-2">PROJECTS</div>
              <div className="text-4xl font-black tracking-tighter">11</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-2 text-gray-600"
          >
            <span className="text-xs font-mono">SCROLL</span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

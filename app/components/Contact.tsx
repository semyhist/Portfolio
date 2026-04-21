'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Send, Linkedin, Github, Instagram, Twitter, Youtube } from 'lucide-react'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    
    const mailtoLink = `mailto:aydnsemih61@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`
    window.location.href = mailtoLink
    
    setTimeout(() => {
      setStatus('sent')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 3000)
    }, 1000)
  }

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/aydinsemih61', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/semyhist', label: 'GitHub' },
    { icon: Instagram, href: 'https://instagram.com/semjhaydin', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/semyhist', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com/@semjhaydin', label: 'YouTube' },
  ]

  return (
    <section ref={ref} className="relative py-32 bg-carbon-50/30 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4 px-4 py-2 bg-electric-blue/10 border border-electric-blue/20 rounded-full">
            <span className="text-electric-blue text-sm font-mono tracking-wider">GET IN TOUCH</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-6">
            Let's Build <span className="bg-gradient-to-r from-electric-blue to-electric-orange bg-clip-text text-transparent">Something</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Open for collaborations, freelance projects, or just a chat about motorsports and technology.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-mono text-gray-400 mb-2">
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-carbon-100 border border-gray-800 text-white focus:border-electric-blue focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-mono text-gray-400 mb-2">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-carbon-100 border border-gray-800 text-white focus:border-electric-blue focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-mono text-gray-400 mb-2">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-carbon-100 border border-gray-800 text-white focus:border-electric-blue focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group w-full px-6 py-4 bg-electric-blue text-carbon-100 font-bold hover:bg-electric-blue/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'sending' ? (
                  'Sending...'
                ) : status === 'sent' ? (
                  'Message Sent!'
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Email */}
            <div className="bg-carbon-100 border border-gray-800 p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-electric-blue/10 border border-electric-blue/20">
                  <Mail className="w-5 h-5 text-electric-blue" />
                </div>
                <div>
                  <div className="text-sm font-mono text-gray-400 mb-1">EMAIL</div>
                  <a
                    href="mailto:aydnsemih61@gmail.com"
                    className="text-white hover:text-electric-blue transition-colors font-medium"
                  >
                    aydnsemih61@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-carbon-100 border border-gray-800 p-8">
              <div className="text-sm font-mono text-gray-400 mb-6">CONNECT</div>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-carbon-50 border border-gray-800 hover:border-electric-blue/30 transition-all duration-300 group"
                  >
                    <social.icon className="w-4 h-4 text-gray-400 group-hover:text-electric-blue transition-colors" />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-gradient-to-br from-electric-blue/10 to-electric-orange/10 border border-electric-blue/20 p-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-electric-blue rounded-full animate-pulse" />
                <span className="text-sm font-mono text-electric-blue">AVAILABLE FOR WORK</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Currently open to freelance projects, collaborations, and full-time opportunities in software engineering and motorsports technology.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 pt-12 border-t border-gray-800 text-center"
        >
          <p className="text-gray-500 text-sm font-mono">
            © {new Date().getFullYear()} Semih Aydın. Engineered with Next.js & Tailwind CSS.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

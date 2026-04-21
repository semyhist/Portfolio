'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function ClientAnimations() {
  const [yukariGoster, setYukariGoster] = useState(false)
  const [dil, setDil] = useState('tr')
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const sayfaKaydir = () => {
      setYukariGoster(window.scrollY > 500)
    }
    window.addEventListener('scroll', sayfaKaydir)
    return () => window.removeEventListener('scroll', sayfaKaydir)
  }, [])

  const yukariCik = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
      
      {yukariGoster && (
        <motion.button
          className="scroll-to-top"
          onClick={yukariCik}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ArrowUp size={20} />
        </motion.button>
      )}

      <div className="lang-toggle">
        <button className={`lang-btn ${dil === 'tr' ? 'active' : ''}`} onClick={() => setDil('tr')}>
          TR
        </button>
        <button className={`lang-btn ${dil === 'en' ? 'active' : ''}`} onClick={() => setDil('en')}>
          EN
        </button>
      </div>
    </>
  )
}

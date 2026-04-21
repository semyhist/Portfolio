'use client'

import { useState } from 'react'
import { User, Mail, MessageSquare, Send } from 'lucide-react'
import { translations } from '../lib/translations'

export default function InteractiveForm() {
  const [formVerisi, setFormVerisi] = useState({ name: '', email: '', subject: '', message: '' })
  const [formDurum, setFormDurum] = useState('')
  const [gonderiliyor, setGonderiliyor] = useState(false)
  const tr = translations.tr

  const formDegistir = (e: any) => {
    setFormVerisi({ ...formVerisi, [e.target.name]: e.target.value })
  }

  const formGonder = async (e: any) => {
    e.preventDefault()
    setGonderiliyor(true)
    setFormDurum('')
    try {
      const mailtoLink = `mailto:aydnsemih61@gmail.com?subject=${encodeURIComponent(formVerisi.subject)}&body=${encodeURIComponent(`İsim: ${formVerisi.name}\\nEmail: ${formVerisi.email}\\n\\nMesaj:\\n${formVerisi.message}`)}`
      window.location.href = mailtoLink
      setFormDurum('success')
      setFormVerisi({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error(err)
      setFormDurum('error')
    } finally {
      setGonderiliyor(false)
    }
  }

  return (
    <form className="contact-form" onSubmit={formGonder}>
      <div className="form-group">
        <User size={20} />
        <input
          type="text"
          name="name"
          placeholder={tr.contact.form.name}
          value={formVerisi.name}
          onChange={formDegistir}
          required
        />
      </div>
      <div className="form-group">
        <Mail size={20} />
        <input
          type="email"
          name="email"
          placeholder={tr.contact.form.email}
          value={formVerisi.email}
          onChange={formDegistir}
          required
        />
      </div>
      <div className="form-group">
        <MessageSquare size={20} />
        <input
          type="text"
          name="subject"
          placeholder={tr.contact.form.subject}
          value={formVerisi.subject}
          onChange={formDegistir}
          required
        />
      </div>
      <div className="form-group">
        <MessageSquare size={20} />
        <textarea
          name="message"
          placeholder={tr.contact.form.message}
          value={formVerisi.message}
          onChange={formDegistir}
          rows={5}
          required
        />
      </div>
      <button type="submit" className="submit-btn" disabled={gonderiliyor}>
        <Send size={20} />
        {gonderiliyor ? tr.contact.form.sending : tr.contact.form.send}
      </button>
      {formDurum === 'success' && <p className="form-message success">{tr.contact.form.success}</p>}
      {formDurum === 'error' && <p className="form-message error">{tr.contact.form.error}</p>}
    </form>
  )
}

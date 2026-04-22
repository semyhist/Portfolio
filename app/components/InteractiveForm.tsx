'use client'

import { useState } from 'react'
import { User, Mail, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react'

interface Props {
  lang?: 'tr' | 'en'
}

const labels = {
  tr: {
    name: 'Adınız', email: 'E-posta Adresiniz', subject: 'Konu', message: 'Mesajınız',
    send: 'Mesaj Gönder', sending: 'Gönderiliyor...',
    success: 'Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağım.',
    error: 'Mesaj gönderilemedi. Lütfen tekrar deneyin.',
    again: 'Yeni Mesaj Gönder',
  },
  en: {
    name: 'Your Name', email: 'Your Email', subject: 'Subject', message: 'Your Message',
    send: 'Send Message', sending: 'Sending...',
    success: "Your message has been sent! I'll get back to you soon.",
    error: 'Message could not be sent. Please try again.',
    again: 'Send Another Message',
  },
}

export default function InteractiveForm({ lang = 'tr' }: Props) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const t = labels[lang]

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          subject: `[Portfolio] ${form.subject}`,
          message: form.message,
          from_name: 'semihaydin.dev',
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="form-success-state">
        <CheckCircle size={48} />
        <h3>{t.success}</h3>
        <button className="form-reset-btn" onClick={() => setStatus('idle')}>{t.again}</button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="form-group">
        <User size={20} />
        <input type="text" name="name" placeholder={t.name} value={form.name} onChange={onChange} required />
      </div>
      <div className="form-group">
        <Mail size={20} />
        <input type="email" name="email" placeholder={t.email} value={form.email} onChange={onChange} required />
      </div>
      <div className="form-group">
        <MessageSquare size={20} />
        <input type="text" name="subject" placeholder={t.subject} value={form.subject} onChange={onChange} required />
      </div>
      <div className="form-group">
        <MessageSquare size={20} style={{ top: '20px', transform: 'none' }} />
        <textarea name="message" placeholder={t.message} value={form.message} onChange={onChange} rows={5} required />
      </div>
      <button type="submit" className="submit-btn" disabled={status === 'sending'}>
        <Send size={20} />
        {status === 'sending' ? t.sending : t.send}
      </button>
      {status === 'error' && (
        <div className="form-message error">
          <AlertCircle size={16} />
          <span>{t.error}</span>
        </div>
      )}
    </form>
  )
}

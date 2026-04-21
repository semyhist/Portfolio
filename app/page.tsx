import { Metadata } from 'next'
import Hero from './components/Hero'
import Stats from './components/Stats'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'

export const metadata: Metadata = {
  title: 'Semih Aydın | Motorsports Data Analyst & Software Engineer',
  description: 'Computer Engineering student specializing in motorsports data analysis, telemetry systems, and full-stack development. Founder of Arka Kanat motorsports media platform with 56K+ followers.',
  keywords: ['Semih Aydın', 'Motorsports', 'Data Analysis', 'Software Engineer', 'F1', 'Telemetry', 'React', 'Next.js', 'Computer Engineering'],
  authors: [{ name: 'Semih Aydın', url: 'https://semihaydin.dev' }],
  openGraph: {
    title: 'Semih Aydın | Motorsports Data Analyst & Software Engineer',
    description: 'Combining motorsports passion with software engineering expertise',
    url: 'https://semihaydin.dev',
    siteName: 'Semih Aydın Portfolio',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Semih Aydın | Motorsports Data Analyst',
    description: 'Software Engineer specializing in motorsports technology',
    creator: '@semyhist',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Stats />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  )
}

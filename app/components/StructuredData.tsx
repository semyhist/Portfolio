export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Semih Aydın',
    url: 'https://semihaydin.dev',
    image: 'https://semihaydin.dev/profile.jpg',
    sameAs: [
      'https://www.linkedin.com/in/aydinsemih61',
      'https://github.com/semyhist',
      'https://twitter.com/semyhist',
      'https://instagram.com/semjhaydin',
      'https://youtube.com/@semjhaydin'
    ],
    jobTitle: 'Software Engineer & Motorsports Data Analyst',
    worksFor: {
      '@type': 'Organization',
      name: 'Arka Kanat'
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Trabzon Üniversitesi'
    },
    knowsAbout: [
      'Web Development',
      'React',
      'Next.js',
      'JavaScript',
      'TypeScript',
      'C Programming',
      'Motorsports',
      'Formula 1',
      'Data Analysis',
      'Telemetry Systems'
    ],
    description: 'Computer Engineering student at Trabzon University. Founder of Arka Kanat motorsports media platform with 56K+ followers and 18M monthly reach.'
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

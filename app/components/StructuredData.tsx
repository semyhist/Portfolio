export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Semih Aydın',
    url: 'https://semihaydin.dev',
    image: 'https://semihaydin.dev/profile.jpg',
    jobTitle: 'Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Arka Kanat'
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Trabzon Üniversitesi'
    },
    sameAs: [
      'https://github.com/semyhist',
      'https://www.linkedin.com/in/aydinsemih61',
      'https://twitter.com/semyhist',
      'https://instagram.com/semjhaydin',
      'https://youtube.com/@semjhaydin'
    ],
    knowsAbout: [
      'Web Development',
      'React',
      'Next.js',
      'JavaScript',
      'TypeScript',
      'C Programming',
      'Python',
      'Motorsports',
      'Formula 1',
      'Data Analysis',
      'Telemetry Systems',
      'Software Engineering'
    ],
    description: 'Computer Engineering student at Trabzon University. Software Engineer specializing in web development and motorsports data analysis. Founder of Arka Kanat motorsports media platform with 56K+ followers and 18M monthly reach.'
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

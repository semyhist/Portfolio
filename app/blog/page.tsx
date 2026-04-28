import Link from 'next/link'
import { posts } from './data'

const BASE_URL = 'https://semihaydin.dev'

export const metadata = {
  title: 'Blog | Semih Aydın',
  description: 'Semih Aydın\'ın web geliştirme, Next.js, SEO ve motorsporları üzerine yazıları. Yazılım geliştirme deneyimleri ve teknik içerikler.',
  keywords: ['Semih Aydın blog', 'web geliştirme blog', 'Next.js yazıları', 'SEO ipuçları', 'motorsporları blog', 'yazılım geliştirici blog'],
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/blog`,
    title: 'Blog | Semih Aydın',
    description: 'Web geliştirme, Next.js, SEO ve motorsporları üzerine yazılar.',
    siteName: 'Semih Aydın',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@semyhist',
    title: 'Blog | Semih Aydın',
    description: 'Web geliştirme, Next.js, SEO ve motorsporları üzerine yazılar.',
    images: ['/images/og-image.png'],
  },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Semih Aydın Blog',
    url: `${BASE_URL}/blog`,
    author: { '@type': 'Person', name: 'Semih Aydın', url: BASE_URL },
    blogPost: sorted.map(p => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${BASE_URL}/blog/${p.slug}`,
      datePublished: p.date,
      description: p.summary,
      author: { '@type': 'Person', name: 'Semih Aydın' },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />

      <nav className="blog-nav-bar">
        <div className="container">
          <Link href="/" className="blog-nav-logo">
            <picture>
              <source srcSet="/logowhitetrans.webp" type="image/webp" />
              <img src="/logowhitetrans-small.png" alt="Semih Aydın" width="36" height="36" />
            </picture>
          </Link>
          <div className="blog-nav-links">
            <Link href="/" className="blog-nav-item">← Ana Sayfa</Link>
            <Link href="/projects" className="blog-nav-item">Projeler</Link>
          </div>
        </div>
      </nav>

      <main className="blog-page">
        <div className="blog-header">
          <div className="container">
            <p className="blog-header-label">Blog</p>
            <h1>Yazılar</h1>
            <p className="blog-header-desc">
              Web geliştirme, SEO ve motorsporları üzerine düşünceler.
            </p>
          </div>
        </div>

        <div className="container">
          <div className="blog-list">
            {sorted.map((post) => (
              <article key={post.slug} className="blog-card">
                <Link href={`/blog/${post.slug}`} className="blog-card-link">
                  <div className="blog-card-meta">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span className="blog-card-dot">·</span>
                    <span>{post.readingTime} dk okuma</span>
                  </div>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-summary">{post.summary}</p>
                  <div className="blog-card-tags">
                    {post.tags.map(tag => (
                      <span key={tag} className="blog-tag">{tag}</span>
                    ))}
                  </div>
                  <span className="blog-card-read">Devamını oku →</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

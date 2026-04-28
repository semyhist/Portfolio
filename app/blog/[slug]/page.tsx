import { notFound } from 'next/navigation'
import Link from 'next/link'
import { posts, getPost, getAllSlugs } from '../data'

const BASE_URL = 'https://semihaydin.dev'

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) return {}

  const url = `${BASE_URL}/blog/${post.slug}`

  return {
    title: post.title,
    description: post.summary,
    keywords: post.keywords,
    authors: [{ name: 'Semih Aydın', url: BASE_URL }],
    alternates: {
      canonical: url,
      languages: {
        'tr-TR': url,
        'en-US': `${url}?lang=en`,
      },
    },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.summary,
      siteName: 'Semih Aydın',
      publishedTime: post.date,
      authors: ['Semih Aydın'],
      tags: post.tags,
      images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@semyhist',
      creator: '@semyhist',
      title: post.title,
      description: post.summary,
      images: ['/images/og-image.png'],
    },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()

  const postIndex = posts.findIndex(p => p.slug === post.slug)
  const prev = posts[postIndex + 1] ?? null
  const next = posts[postIndex - 1] ?? null

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    url: `${BASE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Semih Aydın',
      url: BASE_URL,
      sameAs: [
        'https://github.com/semyhist',
        'https://www.linkedin.com/in/aydinsemih61',
        'https://twitter.com/semyhist',
      ],
    },
    publisher: {
      '@type': 'Person',
      name: 'Semih Aydın',
      url: BASE_URL,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/blog/${post.slug}` },
    keywords: post.keywords.join(', '),
    inLanguage: 'tr-TR',
    image: `${BASE_URL}/images/og-image.png`,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${BASE_URL}/blog/${post.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

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
            <Link href="/blog" className="blog-nav-item">Blog</Link>
          </div>
        </div>
      </nav>

      <main className="blog-post-page">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Ana Sayfa</Link>
            <span>›</span>
            <Link href="/blog">Blog</Link>
            <span>›</span>
            <span>{post.title}</span>
          </nav>

          <article className="blog-post">
            <header className="blog-post-header">
              <div className="blog-post-meta">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="blog-card-dot">·</span>
                <span>{post.readingTime} dk okuma</span>
              </div>
              <h1>{post.title}</h1>
              <p className="blog-post-summary">{post.summary}</p>
              <div className="blog-card-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="blog-tag">{tag}</span>
                ))}
              </div>
            </header>

            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <footer className="blog-post-footer">
              <div className="blog-post-author">
                <span className="blog-post-author-name">Semih Aydın</span>
                <span className="blog-post-author-role">Bilgisayar Mühendisliği Öğrencisi & Web Developer</span>
              </div>
            </footer>
          </article>

          <nav className="blog-post-nav" aria-label="Yazılar arası gezinti">
            {prev && (
              <Link href={`/blog/${prev.slug}`} className="blog-nav-link blog-nav-prev">
                <span>← Önceki</span>
                <span className="blog-nav-title">{prev.title}</span>
              </Link>
            )}
            {next && (
              <Link href={`/blog/${next.slug}`} className="blog-nav-link blog-nav-next">
                <span>Sonraki →</span>
                <span className="blog-nav-title">{next.title}</span>
              </Link>
            )}
          </nav>

          <div className="blog-back">
            <Link href="/blog" className="blog-back-link">← Tüm yazılara dön</Link>
          </div>
        </div>
      </main>
    </>
  )
}

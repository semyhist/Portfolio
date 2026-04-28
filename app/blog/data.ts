export interface BlogPost {
  slug: string
  title: string
  titleEn: string
  summary: string
  summaryEn: string
  date: string        // ISO format: "2025-01-15"
  readingTime: number // dakika
  tags: string[]
  tagsEn: string[]
  keywords: string[]
  content: string     // HTML (TR)
  contentEn: string   // HTML (EN) — opsiyonel, TR ile aynı bırakabilirsin
}

// ─── Yazılarını buraya ekle ───────────────────────────────────────────────────
export const posts: BlogPost[] = [

  // Yeni yazı eklemek için aşağıdaki bloğu kopyala, alanları doldur, posts dizisine ekle:
  //
  // {
  //   slug: 'url-de-gorunecek-kisim',
  //   // Örn: 'react-hooks-rehberi'  →  semihaydin.dev/blog/react-hooks-rehberi
  //
  //   title: 'Türkçe Başlık',
  //   // Google arama sonucunda görünen başlık — 50-60 karakter ideal
  //
  //   titleEn: 'English Title',
  //   // Şu an kullanılmıyor, ileride EN dil desteği için
  //
  //   summary: 'Kısa açıklama, 1-2 cümle.',
  //   // Google snippet metni + blog kartındaki özet — 150-160 karakter ideal
  //
  //   summaryEn: 'Short English summary.',
  //
  //   date: '2025-01-01',
  //   // Yayın tarihi — ISO format (yıl-ay-gün)
  //
  //   readingTime: 5,
  //   // Tahmini okuma süresi (dakika)
  //
  //   tags: ['Tag1', 'Tag2'],
  //   // Kart üzerinde görünen etiketler (Türkçe)
  //
  //   tagsEn: ['Tag1', 'Tag2'],
  //
  //   keywords: [
  //     'anahtar kelime 1',
  //     'anahtar kelime 2',
  //   ],
  //   // Google'ın hedefleyeceği long-tail kelimeler — ne aratılınca çıksın?
  //
  //   content: `
  //     <h2>Bölüm Başlığı</h2>
  //     <p>Paragraf metni buraya.</p>
  //
  //     <h2>İkinci Bölüm</h2>
  //     <p>Devam ediyor...</p>
  //
  //     <h3>Alt Başlık</h3>
  //     <p>Daha fazla detay.</p>
  //
  //     <ul>
  //       <li>Madde 1</li>
  //       <li>Madde 2</li>
  //     </ul>
  //
  //     <pre><code>// Kod bloğu varsa böyle yazılır</code></pre>
  //   `,
  //   // Desteklenen HTML tagları:
  //   //   <h2>         → Bölüm başlığı
  //   //   <h3>         → Alt başlık
  //   //   <p>          → Paragraf
  //   //   <strong>     → Kalın
  //   //   <em>         → İtalik
  //   //   <code>       → Satır içi kod
  //   //   <pre><code>  → Kod bloğu
  //   //   <ul><li>     → Madde listesi
  //   //   <ol><li>     → Numaralı liste
  //   //   <a href="">  → Link
  //
  //   contentEn: `...`,
  //   // İngilizce içerik — şimdilik TR ile aynı bırakabilirsin
  // },

]
// ─────────────────────────────────────────────────────────────────────────────

export function getPost(slug: string): BlogPost | undefined {
  return posts.find(p => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return posts.map(p => p.slug)
}

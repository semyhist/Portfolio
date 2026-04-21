'use client'

import { useState } from 'react'

export default function BotTestPage() {
  const [url, setUrl] = useState('https://semihaydin.dev')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testUrl = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/bot-test?url=${encodeURIComponent(url)}`)
      const data = await res.json()
      setResult(data)
    } catch (error) {
      setResult({ success: false, error: 'Test başarısız' })
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', fontFamily: 'monospace' }}>
      <h1>🤖 Bot Görünüm Testi</h1>
      <p>Sitenizin Google botları tarafından nasıl görüldüğünü test edin.</p>
      
      <div style={{ marginTop: '30px' }}>
        <input 
          type="text" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://semihaydin.dev"
          style={{ width: '70%', padding: '10px', fontSize: '16px' }}
        />
        <button 
          onClick={testUrl} 
          disabled={loading}
          style={{ padding: '10px 20px', marginLeft: '10px', fontSize: '16px', cursor: 'pointer' }}
        >
          {loading ? 'Test ediliyor...' : 'Test Et'}
        </button>
      </div>

      {result && (
        <div style={{ marginTop: '30px', background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
          <h2>Sonuçlar:</h2>
          
          {result.success ? (
            <>
              <div style={{ marginBottom: '20px' }}>
                <h3>✅ Analiz</h3>
                <ul>
                  <li>İçerik var mı: {result.analysis.hasContent ? '✅ Evet' : '❌ Hayır'}</li>
                  <li>Structured Data var mı: {result.analysis.hasStructuredData ? '✅ Evet' : '❌ Hayır'}</li>
                  <li>Meta tags var mı: {result.analysis.hasMetaTags ? '✅ Evet' : '❌ Hayır'}</li>
                  <li>İçerik uzunluğu: {result.analysis.contentLength} karakter</li>
                  <li><strong>İndekslenebilir mi: {result.analysis.isIndexable ? '✅ EVET' : '❌ HAYIR'}</strong></li>
                </ul>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h3>📄 Meta Bilgiler</h3>
                <p><strong>Title:</strong> {result.analysis.title}</p>
                <p><strong>Description:</strong> {result.analysis.description}</p>
              </div>

              <div>
                <h3>🔍 Ham HTML (İlk 2000 karakter)</h3>
                <pre style={{ background: '#fff', padding: '15px', overflow: 'auto', fontSize: '12px' }}>
                  {result.rawHtml}
                </pre>
              </div>
            </>
          ) : (
            <p style={{ color: 'red' }}>❌ Hata: {result.error}</p>
          )}
        </div>
      )}
    </div>
  )
}

import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url') || 'https://semihaydin.dev'
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      }
    })
    
    const html = await response.text()
    
    const hasContent = html.includes('Semih Aydın')
    const hasStructuredData = html.includes('application/ld+json')
    const hasMetaTags = html.includes('og:title')
    const contentLength = html.length
    
    const titleMatch = html.match(/<title>(.*?)<\/title>/)
    const descMatch = html.match(/<meta name="description" content="(.*?)"/)
    
    return NextResponse.json({
      success: true,
      url,
      analysis: {
        hasContent,
        hasStructuredData,
        hasMetaTags,
        contentLength,
        title: titleMatch?.[1] || 'Bulunamadı',
        description: descMatch?.[1] || 'Bulunamadı',
        isIndexable: hasContent && hasStructuredData && hasMetaTags
      },
      rawHtml: html.substring(0, 2000) + '...'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 })
  }
}

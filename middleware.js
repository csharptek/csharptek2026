import { NextResponse } from 'next/server'

export function middleware(request) {
  const host = request.headers.get('host') || ''
  // Redirect non-www to www
  if (host === 'csharptek.com' || host.startsWith('csharptek.com:')) {
    const url = request.nextUrl.clone()
    url.host = 'www.csharptek.com'
    return NextResponse.redirect(url, { status: 301 })
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|sitemap.xml|robots.txt).*)'],
}

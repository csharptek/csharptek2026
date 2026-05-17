import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />

        {/* Default meta — overridden per page via next/head */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="CSharpTek" />
        <meta name="theme-color" content="#0A1628" />

        {/* Default OG fallbacks */}
        <meta property="og:site_name" content="CSharpTek" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.csharptek.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card fallbacks */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@csharptek" />
        <meta name="twitter:image" content="https://www.csharptek.com/og-image.jpg" />

        {/* Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'CSharpTek',
              url: 'https://www.csharptek.com',
              logo: 'https://www.csharptek.com/logo.png',
              foundingDate: '2016',
              description: 'AI-first software development company specialising in healthcare AI, medical scribe software, AI voice agents and enterprise automation.',
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'info@csharptek.com',
                contactType: 'customer service',
                areaServed: ['IN', 'US', 'GB', 'AU'],
                availableLanguage: ['English', 'Arabic'],
              },
              address: [
                { '@type': 'PostalAddress', addressLocality: 'Ranchi', addressRegion: 'Jharkhand', addressCountry: 'IN' },
                
              ],
              sameAs: [
                'https://linkedin.com/company/csharptek',
                'https://github.com/csharptek',
                'https://twitter.com/csharptek',
              ],
              knowsAbout: [
                'Healthcare AI', 'HIPAA Compliance', 'AI Medical Scribe', 'Azure OpenAI',
                'AI Voice Agents', 'React Native', 'Next.js', '.NET Core', 'LangChain',
                'FHIR Integration', 'RAG Pipelines', 'Microsoft Azure', 'AWS', 'Google Cloud',
              ],
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

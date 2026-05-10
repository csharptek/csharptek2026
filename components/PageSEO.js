import Head from 'next/head'

const BASE_URL = 'https://www.csharptek.com'

/**
 * PageSEO — drop into any page's JSX (outside Layout, before Layout or inside Head)
 * Props: title, description, canonical, ogImage, jsonLd (object)
 */
export default function PageSEO({ title, description, canonical, ogImage, jsonLd }) {
  const fullTitle = title.includes('CSharpTek') ? title : `${title} | CSharpTek`
  const image = ogImage || `${BASE_URL}/og-image.jpg`
  const canon = canonical ? `${BASE_URL}${canonical}` : null

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canon && <link rel="canonical" href={canon} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canon || BASE_URL} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  )
}

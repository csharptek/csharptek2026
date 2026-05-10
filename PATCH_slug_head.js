// PATCH: In pages/industries/[slug].js
// Find this block inside the return statement:
//
//   <Head>
//     <title>{ind.name} Software — CSharpTek</title>
//     <meta name="description" content={ind.metaDesc} />
//
// Replace with:
//
//   <Head>
//     <title>{ind.metaTitle || `${ind.name} Solutions | CSharpTek`}</title>
//     <meta name="description" content={ind.metaDesc} />
//     <link rel="canonical" href={`https://www.csharptek.com/industries/${slug}`} />
//     <meta property="og:title" content={ind.metaTitle || `${ind.name} Solutions | CSharpTek`} />
//     <meta property="og:description" content={ind.metaDesc} />
//     <meta property="og:type" content="website" />
//     <meta property="og:url" content={`https://www.csharptek.com/industries/${slug}`} />
//
// That's the only change needed in [slug].js

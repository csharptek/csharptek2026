import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content="CSharpTek — AI-First Software Development for Healthcare, Education, Wellness and more. We build intelligent software powered by Azure, AWS, OpenAI and Claude." />
        <meta name="keywords" content="AI software development, Azure, AWS, healthcare AI, HIPAA, Next.js, React, vibe coding, MVP" />
        <meta property="og:title" content="CSharpTek — AI-First Software Development" />
        <meta property="og:description" content="We design, build and deploy intelligent software across healthcare, education, wellness and beyond." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.csharptek.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
        {/* Replace with your real logo path */}
        {/* <link rel="icon" href="/logo.png" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

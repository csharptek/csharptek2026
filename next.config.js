/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  async redirects() {
    return [
      // ── INDUSTRY REDIRECTS ──
      { source: '/e-learning-solutions',                     destination: '/industries/education',              permanent: true },
      { source: '/healthcare-software-development',          destination: '/industries/healthcare',             permanent: true },
      { source: '/healthcare-it-solutions',                  destination: '/industries/healthcare',             permanent: true },
      { source: '/wellness-app-development',                 destination: '/industries/wellness',               permanent: true },
      { source: '/pet-care-software',                        destination: '/industries/petcare',                permanent: true },
      { source: '/crm-software-development',                 destination: '/industries/crm',                   permanent: true },
      { source: '/marketplace-development',                  destination: '/industries/marketplace',            permanent: true },
      { source: '/real-estate-software',                     destination: '/industries/realestate',            permanent: true },

      // ── SERVICE REDIRECTS ──
      { source: '/azure-ai-service',                         destination: '/services/ai-integration',          permanent: true },
      { source: '/artificial-intelligence-development',      destination: '/services/ai-integration',          permanent: true },
      { source: '/custom-mobile-app-development-services',   destination: '/services/web-mobile',              permanent: true },
      { source: '/mobile-app-development',                   destination: '/services/web-mobile',              permanent: true },
      { source: '/react-native-development',                 destination: '/services/web-mobile',              permanent: true },
      { source: '/custom-software-development',              destination: '/services/web-mobile',              permanent: true },
      { source: '/web-application-development',              destination: '/services/web-mobile',              permanent: true },
      { source: '/cloud-services',                           destination: '/services/cloud-devops',            permanent: true },
      { source: '/azure-cloud-services',                     destination: '/services/cloud-devops',            permanent: true },
      { source: '/devops-services',                          destination: '/services/cloud-devops',            permanent: true },
      { source: '/chatbot-development',                      destination: '/services/ai-integration',          permanent: true },
      { source: '/voice-ai-development',                     destination: '/services/ai-voice',                permanent: true },
      { source: '/crm-development',                          destination: '/services/crm-productivity',        permanent: true },

      // ── CASE STUDY / PORTFOLIO REDIRECTS ──
      { source: '/casestudy/:slug*',                         destination: '/portfolio',                        permanent: true },
      { source: '/case-study/:slug*',                        destination: '/portfolio',                        permanent: true },
      { source: '/portfolio/:slug*',                         destination: '/portfolio',                        permanent: true },

      // ── ABOUT / COMPANY REDIRECTS ──
      { source: '/about-us',                                 destination: '/about',                            permanent: true },
      { source: '/company',                                  destination: '/about',                            permanent: true },
      { source: '/team',                                     destination: '/about',                            permanent: true },
      { source: '/our-team',                                 destination: '/about',                            permanent: true },

      // ── CONTACT REDIRECTS ──
      { source: '/contact-us',                               destination: '/contact',                          permanent: true },
      { source: '/get-in-touch',                             destination: '/contact',                          permanent: true },
      { source: '/free-consultation',                        destination: '/contact',                          permanent: true },

      // ── BLOG REDIRECTS ──
      { source: '/blog/:slug*',                              destination: '/blog',                             permanent: true },
      { source: '/insights/:slug*',                          destination: '/blog',                             permanent: true },

      // ── SERVICES INDEX ──
      { source: '/services-overview',                        destination: '/services',                         permanent: true },
      { source: '/our-services',                             destination: '/services',                         permanent: true },
    ]
  },
}

module.exports = nextConfig

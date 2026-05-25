/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  async redirects() {
    return [
      // ── Old service/industry URLs ──
      { source: '/e-learning-solutions',                        destination: '/industries/education',              permanent: true },
      { source: '/azure-ai-service',                            destination: '/services/ai-integration',           permanent: true },
      { source: '/custom-mobile-app-development-services',      destination: '/services/web-mobile',               permanent: true },
      { source: '/mobile-app-development',                      destination: '/services/web-mobile',               permanent: true },
      { source: '/healthcare-software-development',             destination: '/industries/healthcare',             permanent: true },
      { source: '/ai-development-services',                     destination: '/services/ai-integration',           permanent: true },
      { source: '/chatbot-development',                         destination: '/services/ai-integration',           permanent: true },
      { source: '/crm-development',                             destination: '/services/crm-productivity',         permanent: true },
      { source: '/cloud-consulting-services',                   destination: '/services/cloud-devops',             permanent: true },
      { source: '/real-estate-software-development',            destination: '/industries/realestate',             permanent: true },

      // ── Case studies ──
      { source: '/casestudy/:slug*',                            destination: '/portfolio',                         permanent: true },
      { source: '/case-study/:slug*',                           destination: '/portfolio',                         permanent: true },

      // ── Careers old URLs ──
      { source: '/we-are-hiring',                               destination: '/careers',                           permanent: true },
      { source: '/software-trainee',                            destination: '/careers',                           permanent: true },
      { source: '/project-manager',                             destination: '/careers',                           permanent: true },
      { source: '/it-staffing',                                 destination: '/careers',                           permanent: true },

      // ── Blog old URLs (/blogs/ → /blog) ──
      { source: '/blogs/:slug*',                                destination: '/blog',                              permanent: true },
      { source: '/blog/:slug*',                                 destination: '/blog',                              permanent: true },

      // ── Home old URLs ──
      { source: '/Home/Index2',                                 destination: '/',                                  permanent: true },
      { source: '/Home/:slug*',                                 destination: '/',                                  permanent: true },
      { source: '/about-us',                                    destination: '/about',                             permanent: true },

      // ── Old Azure/services pages ──
      { source: '/services/azure-mobile-applications',          destination: '/services/web-mobile',               permanent: true },
      { source: '/azure-integration-developer',                 destination: '/services/ai-integration',           permanent: true },
      { source: '/cloud-migration-assesment-and-planning-services', destination: '/services/cloud-devops',         permanent: true },
      { source: '/azure-ai-service',                            destination: '/services/ai-integration',           permanent: true },
      { source: '/advance-technological-solutions',             destination: '/services',                          permanent: true },
      { source: '/create-connected-manufacturing-experiences',  destination: '/services',                          permanent: true },
      { source: '/chat-gpt',                                    destination: '/services/ai-integration',           permanent: true },

      // ── Old case study slugs at root ──
      { source: '/matchmaking-site-azure-devops-case-study',    destination: '/portfolio',                         permanent: true },
      { source: '/patient-care-azure-ai-case-study',            destination: '/portfolio',                         permanent: true },
      { source: '/bytehealthy-home-made-food-delivery-app',     destination: '/portfolio',                         permanent: true },

      // ── Old news/blog at root ──
      { source: '/News/:slug*',                                 destination: '/',                                  permanent: true },

      // ── Old .NET MVC routes ──
      { source: '/Srevices/:slug*',                             destination: '/services',                          permanent: true },
      { source: '/Recruitment/:slug*',                          destination: '/careers',                           permanent: true },

      // ── Privacy policy trailing slash ──
      { source: '/privacy-policy/',                             destination: '/privacy-policy',                    permanent: true },
    ]
  },
}

module.exports = nextConfig

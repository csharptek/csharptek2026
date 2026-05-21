/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  async redirects() {
    return [
      { source: '/e-learning-solutions',                        destination: '/industries/education',              permanent: true },
      { source: '/azure-ai-service',                            destination: '/services/ai-integration',           permanent: true },
      { source: '/custom-mobile-app-development-services',      destination: '/services/web-mobile',               permanent: true },
      { source: '/mobile-app-development',                      destination: '/services/web-mobile',               permanent: true },
      { source: '/healthcare-software-development',             destination: '/industries/healthcare',             permanent: true },
      { source: '/ai-development-services',                     destination: '/services/ai-integration',           permanent: true },
      { source: '/chatbot-development',                         destination: '/services/ai-integration',           permanent: true },
      { source: '/crm-development',                             destination: '/services/crm-productivity',         permanent: true },
      { source: '/cloud-consulting-services',                   destination: '/services/cloud-devops',             permanent: true },
      { source: '/casestudy/:slug*',                            destination: '/portfolio',                         permanent: true },
      { source: '/case-study/:slug*',                           destination: '/portfolio',                         permanent: true },
      { source: '/real-estate-software-development',            destination: '/industries/realestate',             permanent: true },
    ]
  },
}

module.exports = nextConfig

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.csharptek.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/404', '/500', '/blog', '/blog/*', '/api/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [],
  },
  transform: async (config, path) => {
    const high = ['/', '/services', '/industries', '/portfolio', '/about', '/contact']
    let priority = 0.6
    if (high.includes(path)) priority = 1.0
    else if (['/blog', '/careers'].includes(path)) priority = 0.8
    else if (path.startsWith('/services/') || path.startsWith('/industries/')) priority = 0.9
    else if (path.startsWith('/products/')) priority = 0.75

    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  },
}

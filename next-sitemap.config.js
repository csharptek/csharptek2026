/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.csharptek.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/404', '/500'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [
      'https://www.csharptek.com/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Higher priority for key pages
    const high = ['/', '/services', '/industries', '/portfolio', '/about', '/contact']
    const medium = ['/blog', '/careers']
    let priority = 0.6
    if (high.includes(path)) priority = 1.0
    else if (medium.includes(path)) priority = 0.8
    else if (path.startsWith('/services/') || path.startsWith('/industries/')) priority = 0.9
    else if (path.startsWith('/blog/')) priority = 0.7

    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  },
}

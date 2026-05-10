/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.csharptek.com',
  generateRobotsTxt: false, // we have manual robots.txt
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/404', '/500'],
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/about'),
    await config.transform(config, '/contact'),
    await config.transform(config, '/portfolio'),
    await config.transform(config, '/services'),
    await config.transform(config, '/industries'),
    await config.transform(config, '/blog'),
    // Industries
    await config.transform(config, '/industries/healthcare'),
    await config.transform(config, '/industries/wellness'),
    await config.transform(config, '/industries/education'),
    await config.transform(config, '/industries/realestate'),
    await config.transform(config, '/industries/automation'),
    await config.transform(config, '/industries/marketplace'),
    await config.transform(config, '/industries/petcare'),
    await config.transform(config, '/industries/crm'),
    // Services
    await config.transform(config, '/services/ai-integration'),
    await config.transform(config, '/services/ai-voice'),
    await config.transform(config, '/services/web-mobile'),
    await config.transform(config, '/services/cloud-devops'),
    await config.transform(config, '/services/mvp-vibe'),
    await config.transform(config, '/services/marketplace'),
    await config.transform(config, '/services/prompt-engineering'),
    await config.transform(config, '/services/crm-productivity'),
    await config.transform(config, '/services/support'),
  ],
}

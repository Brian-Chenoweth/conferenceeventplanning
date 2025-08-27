// next.config.js
const { withFaust, getWpHostname } = require('@faustwp/core');

/** @type {import('next').NextConfig} */
module.exports = withFaust({
  reactStrictMode: true,
  sassOptions: { includePaths: ['node_modules'] },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cep.calpolypartners.org' },
      // in case media redirects via WPE’s CDN/origin:
      { protocol: 'https', hostname: 'www.cep.calpolypartners.org' },
      { protocol: 'https', hostname: '*.wpenginepowered.com' }, // safe catch-all if your media ever resolves here
      // optional: whatever getWpHostname() resolves to (explicitly list it if known)
    ],
  },
  i18n: { locales: ['en'], defaultLocale: 'en' },
  async redirects() {
    return [{ source: '/news/:slug', destination: '/:slug', permanent: true }];
  },
});

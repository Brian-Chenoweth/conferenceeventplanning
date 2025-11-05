// next.config.js
const { withFaust } = require('@faustwp/core');

/** @type {import('next').NextConfig} */
module.exports = withFaust({
  reactStrictMode: true,
  sassOptions: { includePaths: ['node_modules'] },

  images: {
    // ✅ Tell Next to serve AVIF/WebP when the browser accepts it
    formats: ['image/avif', 'image/webp'],

    // (optional but good) cache longer from the optimizer
    // minimumCacheTTL: 60 * 60 * 24, // 1 day
    minimumCacheTTL: 60 * 60 * 24,
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    remotePatterns: [
      // your CEP/atlas media domain(s)
      { protocol: 'https', hostname: 'cep.calpolypartners.org' },
      { protocol: 'https', hostname: 'www.cep.calpolypartners.org' },

      // ✅ add the site we’re actually optimizing
      { protocol: 'https', hostname: 'www.calpolyconferences.org' },
      { protocol: 'https', hostname: 'calpolyconferences.org' },

      // ✅ fix wildcard: Next supports **.sub.domain
      { protocol: 'https', hostname: '**.wpenginepowered.com' },
    ],
  },

  i18n: { locales: ['en'], defaultLocale: 'en' },

  async redirects() {
    return [{ source: '/news/:slug', destination: '/:slug', permanent: true }];
  },
});

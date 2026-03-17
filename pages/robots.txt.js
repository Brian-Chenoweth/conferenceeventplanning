import { buildAbsoluteUrl, getSiteUrl } from 'utilities';

export async function getServerSideProps({ res }) {
  const robots = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /preview/',
    'Disallow: /search/',
    'Disallow: /404/',
    `Host: ${getSiteUrl()}`,
    `Sitemap: ${buildAbsoluteUrl('/sitemap.xml')}`,
  ].join('\n');

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.write(robots);
  res.end();

  return {
    props: {},
  };
}

export default function RobotsTxt() {
  return null;
}

import appConfig from 'app.config';

const DEFAULT_SITE_URL = appConfig.siteUrl.replace(/\/+$/, '');

function normalizePath(path = '/') {
  const [pathname] = `${path || '/'}`.split('#');
  const [cleanPath] = pathname.split('?');
  const normalized = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;

  return normalized === '/' ? '/' : normalized.replace(/\/+$/, '');
}

export function getSiteUrl() {
  return DEFAULT_SITE_URL;
}

export function buildAbsoluteUrl(path = '/') {
  return `${DEFAULT_SITE_URL}${normalizePath(path)}`;
}

export function resolveSeoImage(imageUrl) {
  if (!imageUrl) {
    return undefined;
  }

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  return buildAbsoluteUrl(imageUrl);
}

export function buildRobotsDirectives({
  noindex = false,
  nofollow = false,
  noarchive = false,
} = {}) {
  const directives = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
    noarchive ? 'noarchive' : 'max-snippet:-1',
    'max-image-preview:large',
    'max-video-preview:-1',
  ];

  return directives.join(', ');
}

export function buildOrganizationSchema() {
  const { organization } = appConfig;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organization.name,
    legalName: organization.legalName,
    url: DEFAULT_SITE_URL,
    telephone: organization.phone,
    email: organization.email,
    logo: organization.logoPath
      ? buildAbsoluteUrl(organization.logoPath)
      : undefined,
    address: {
      '@type': 'PostalAddress',
      ...organization.address,
    },
  };
}

export function buildLocalBusinessSchema() {
  const { organization } = appConfig;

  return JSON.parse(JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: organization.name,
    legalName: organization.legalName,
    url: DEFAULT_SITE_URL,
    image: organization.logoPath
      ? buildAbsoluteUrl(organization.logoPath)
      : undefined,
    telephone: organization.phone,
    email: organization.email,
    areaServed: {
      '@type': 'City',
      name: organization.address.addressLocality,
    },
    address: {
      '@type': 'PostalAddress',
      ...organization.address,
    },
  }));
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: appConfig.organization.name,
    url: DEFAULT_SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${buildAbsoluteUrl('/search')}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

function humanizeSegment(segment = '') {
  return segment
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function buildBreadcrumbSchema(items = []) {
  const itemListElement = items
    .filter((item) => item?.name && item?.url)
    .map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    }));

  if (!itemListElement.length) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

export function buildBreadcrumbItemsFromPath(path = '/', currentTitle) {
  const normalizedPath = normalizePath(path);
  const segments = normalizedPath.split('/').filter(Boolean);
  const items = [
    {
      name: 'Home',
      url: buildAbsoluteUrl('/'),
    },
  ];

  if (!segments.length) {
    return items;
  }

  segments.forEach((segment, index) => {
    const segmentPath = `/${segments.slice(0, index + 1).join('/')}`;
    const isLastSegment = index === segments.length - 1;

    items.push({
      name:
        isLastSegment && currentTitle
          ? currentTitle
          : humanizeSegment(segment),
      url: buildAbsoluteUrl(segmentPath),
    });
  });

  return items;
}

export function buildArticleSchema({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
}) {
  if (!headline || !url) {
    return null;
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    mainEntityOfPage: url,
    url,
    author: authorName
      ? {
          '@type': 'Person',
          name: authorName,
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: appConfig.organization.name,
      url: DEFAULT_SITE_URL,
    },
    image: image ? [image] : undefined,
    datePublished: datePublished || undefined,
    dateModified: dateModified || datePublished || undefined,
  };

  return JSON.parse(JSON.stringify(schema));
}

export function buildCollectionPageSchema({
  name,
  description,
  url,
}) {
  if (!name || !url) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
  };
}

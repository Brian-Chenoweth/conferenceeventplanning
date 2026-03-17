import { buildAbsoluteUrl } from 'utilities';

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
const GRAPHQL_ENDPOINT = WORDPRESS_URL
  ? `${WORDPRESS_URL.replace(/\/+$/, '')}/index.php?graphql`
  : null;

const STATIC_ROUTES = [
  { loc: buildAbsoluteUrl('/') },
  { loc: buildAbsoluteUrl('/posts/') },
  { loc: buildAbsoluteUrl('/projects/') },
];

const SITEMAP_QUERY = `
  query SitemapQuery($first: Int!) {
    pages(first: $first) {
      nodes {
        uri
        modifiedGmt
      }
    }
    posts(first: $first) {
      nodes {
        uri
        modifiedGmt
      }
    }
    projects(first: $first) {
      nodes {
        uri
        modifiedGmt
      }
    }
  }
`;

function toIsoDate(value) {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function toUrlEntry(node) {
  if (!node?.uri) {
    return null;
  }

  return {
    loc: buildAbsoluteUrl(node.uri),
    lastmod: toIsoDate(node.modifiedGmt),
  };
}

function buildXml(entries) {
  const body = entries
    .map(({ loc, lastmod }) => {
      const lastmodTag = lastmod ? `<lastmod>${lastmod}</lastmod>` : '';
      return `<url><loc>${loc}</loc>${lastmodTag}</url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
}

async function fetchDynamicEntries() {
  if (!GRAPHQL_ENDPOINT) {
    return [];
  }

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: SITEMAP_QUERY,
        variables: { first: 500 },
      }),
    });

    if (!response.ok) {
      return [];
    }

    const payload = await response.json();
    const data = payload?.data ?? {};

    return [
      ...(data.pages?.nodes ?? []),
      ...(data.posts?.nodes ?? []),
      ...(data.projects?.nodes ?? []),
    ]
      .map(toUrlEntry)
      .filter(Boolean);
  } catch {
    return [];
  }
}

export async function getServerSideProps({ res }) {
  const dynamicEntries = await fetchDynamicEntries();
  const dedupedEntries = [...STATIC_ROUTES, ...dynamicEntries].filter(
    (entry, index, entries) =>
      entries.findIndex((candidate) => candidate.loc === entry.loc) === index
  );

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.write(buildXml(dedupedEntries));
  res.end();

  return {
    props: {},
  };
}

export default function SitemapXml() {
  return null;
}

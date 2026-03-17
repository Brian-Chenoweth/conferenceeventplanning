import Head from 'next/head';
import Script from 'next/script';

/**
 * Provide SEO related meta tags to a page.
 *
 * @param {Props} props The props object.
 * @param {string} props.title Used for the page title, og:title, twitter:title, etc.
 * @param {string} props.description Used for the meta description, og:description, twitter:description, etc.
 * @param {string} props.keywords Used for the legacy meta keywords tag.
 * @param {string} props.imageUrl Used for the og:image and twitter:image.
 * @param {string} props.url Used for the og:url and twitter:url.
 *
 * @returns {React.ReactElement} The SEO component
 */
export default function SEO({ title, description, keywords, imageUrl, url }) {
  if (!title && !description && !keywords && !imageUrl && !url) {
    return null;
  }

  const typekitHref = 'https://use.typekit.net/mfv5sni.css';
  const googleFontsHref =
    'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;500;600;700&display=swap';

  return (
    <>
      <Head>
        {/* Load external font stylesheets without blocking initial render. */}
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://p.typekit.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <noscript>
          <link rel="stylesheet" href={typekitHref} />
          <link rel="stylesheet" href={googleFontsHref} />
        </noscript>

        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />

        {title && (
          <>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta property="og:title" content={title} />
            <meta property="twitter:title" content={title} />
          </>
        )}

        {description && (
          <>
            <meta name="description" content={description} />
            <meta property="og:description" content={description} />
            <meta property="twitter:description" content={description} />
          </>
        )}

        {keywords && <meta name="keywords" content={keywords} />}

        {imageUrl && (
          <>
            <meta property="og:image" content={imageUrl} />
            <meta property="twitter:image" content={imageUrl} />
          </>
        )}

        {url && (
          <>
            <meta property="og:url" content={url} />
            <meta property="twitter:url" content={url} />
          </>
        )}
      </Head>
      <Script
        id="defer-external-font-styles"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var head = document.head;
              if (!head) return;
              var hrefs = ${JSON.stringify([typekitHref, googleFontsHref])};

              hrefs.forEach(function(href) {
                if (head.querySelector('link[data-font-href="' + href + '"]')) return;

                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = href;
                link.setAttribute('data-font-href', href);
                head.appendChild(link);
              });
            })();
          `,
        }}
      />
    </>
  );
}

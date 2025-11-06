import '../faust.config';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaustProvider } from '@faustwp/core';
import Script from 'next/script';
import 'normalize.css/normalize.css';
import '../styles/main.scss';
import ThemeStyles from 'components/ThemeStyles/ThemeStyles';

const GA_TRACKING_ID = 'G-121M5PNKJP';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // -------------------------------
  // Google Analytics route tracking
  // -------------------------------
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (typeof window.gtag !== 'undefined') {
        window.gtag('config', GA_TRACKING_ID, { page_path: url });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  // --------------------------------------------
  // Parallax and standalone link logic (optimized)
  // --------------------------------------------
  useEffect(() => {
    const getParallaxEls = () =>
      Array.from(document.querySelectorAll('.wp-block-image.parallax img'))
        .map((img) => ({ img, container: img.closest('.parallax') }))
        .filter(({ container }) => !!container);

    const getStandaloneLinks = () =>
      Array.from(
        document.querySelectorAll(
          '.bg-green a, .bg-white a, .bg-yellow a, .green-image-right a, .white-image-left a, .white-image-right a, .yellow-image-left a, .intro-text a'
        )
      );

    let parallaxNodes = getParallaxEls();
    let linkNodes = getStandaloneLinks();

    // ---- PARALLAX ----
    let scrollRAF = 0;

    const readParallax = () => {
      const vh = window.innerHeight;
      const reads = [];
      for (const { img, container } of parallaxNodes) {
        const rect = container.getBoundingClientRect();
        const progress = 1 - Math.min(Math.max(rect.top / vh, 0), 1);
        const maxOffset = 200;
        const offset = Math.max(
          Math.min((progress - 0.5) * 2 * maxOffset, maxOffset),
          -maxOffset
        );
        reads.push({ img, offset });
      }
      return reads;
    };

    const writeParallax = (reads) => {
      for (const { img, offset } of reads) {
        img.style.transform = `translateY(${offset}px)`;
      }
    };

    const onScroll = () => {
      if (scrollRAF) return;
      scrollRAF = requestAnimationFrame(() => {
        scrollRAF = 0;
        writeParallax(readParallax());
      });
    };

    // ---- STANDALONE LINKS ----
    let resizeRAF = 0;

    const readLinks = () => {
      const results = [];
      for (const link of linkNodes) {
        const parent = link.parentElement;
        if (!parent) continue;

        const visualChildren = Array.from(parent.childNodes).filter(
          (node) =>
            node.nodeType === Node.ELEMENT_NODE ||
            (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '')
        );
        const isOnlyChild = visualChildren.length === 1 && visualChildren[0] === link;

        const rect = link.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();
        const isFullBlock =
          Math.abs(rect.top - parentRect.top) < 2 &&
          Math.abs(rect.bottom - parentRect.bottom) < 2;

        const parentText = parent.innerText.trim();
        const linkText = link.innerText.trim();
        const isOnlyTextMatch = parentText === linkText;

        const isStandalone = isOnlyChild && isFullBlock && isOnlyTextMatch;
        results.push({ link, isStandalone });
      }
      return results;
    };

    const writeLinks = (results) => {
      for (const { link, isStandalone } of results) {
        link.classList.toggle('standalone-link', isStandalone);
      }
    };

    const onResize = () => {
      if (resizeRAF) return;
      resizeRAF = requestAnimationFrame(() => {
        resizeRAF = 0;
        parallaxNodes = getParallaxEls();
        linkNodes = getStandaloneLinks();
        writeLinks(readLinks());
        writeParallax(readParallax());
      });
    };

    // ---- Initial run ----
    const initRAF = requestAnimationFrame(() => {
      writeLinks(readLinks());
      writeParallax(readParallax());
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(initRAF);
      if (scrollRAF) cancelAnimationFrame(scrollRAF);
      if (resizeRAF) cancelAnimationFrame(resizeRAF);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // -------------------------------
  // Render
  // -------------------------------
  return (
    <>
      {/* ✅ Google Analytics scripts */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <script src="/team-lightbox.js" defer />

      <ThemeStyles />
      <FaustProvider pageProps={pageProps}>
        <Component {...pageProps} key={router.asPath} />
      </FaustProvider>
    </>
  );
}

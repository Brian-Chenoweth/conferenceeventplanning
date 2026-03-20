import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';

import styles from './HomepageParallax.module.scss';

const Parallax = dynamic(
  () => import('react-parallax').then((module) => module.Parallax),
  { ssr: false }
);

// Finer-grained widths so phones don't jump to 640/750 unnecessarily
const WIDTHS = [320, 360, 480, 540, 600, 640, 750, 828, 1080, 1200, 1920];

function qualityFor(w) {
  // leaner for mobile candidates; a touch higher for larger screens
  return w <= 828 ? 60 : 72;
}

function nextSrcSet(path) {
  const enc = encodeURIComponent(path);
  return WIDTHS.map(
    (w) => `/_next/image?url=${enc}&w=${w}&q=${qualityFor(w)} ${w}w`
  ).join(', ');
}

export default function HomepageParallax() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [height, setHeight] = useState(750);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 768px)');

    const updateHeight = () => {
      const width = window.innerWidth;

      setIsDesktop(desktopQuery.matches);

      if (width < 480) {
        setHeight(300);
      } else if (width < 768) {
        setHeight(400);
      } else {
        setHeight(750);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const path = '/home/elegant-dessert-table-setting-green-runner-macarons-flowers.jpg';

  const srcSet = useMemo(() => nextSrcSet(path), [path]);
  const sizes = '100vw';

  // Small, optimized SSR fallback (prevents a large eager request before srcset parses)
  const enc = encodeURIComponent(path);
  const ssrFallback = `/_next/image?url=${enc}&w=640&q=60`;

  return (
    <div className={styles.para}>
      {isDesktop ? (
        <Parallax
          blur={0}
          strength={700}
          bgImage={ssrFallback}
          bgImageSrcSet={srcSet}
          bgImageSizes={sizes}
          bgImageAlt="Dessert table"
          bgClassName={styles.bg}
          bgImageStyle={{ objectFit: 'cover', objectPosition: 'center' }}
        >
          <div style={{ height }} />
        </Parallax>
      ) : (
        <div
          aria-hidden="true"
          className={styles.bg}
          style={{
            height,
            backgroundImage: `url("${ssrFallback}")`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        />
      )}
    </div>
  );
}

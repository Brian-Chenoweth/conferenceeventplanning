import { useEffect, useState, useMemo } from 'react';
import { Parallax } from 'react-parallax';
import styles from './HomepageParallax.module.scss';

const WIDTHS = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

function nextSrcSet(path, q = 80) {
  // Next optimizer endpoint – will negotiate AVIF/WebP based on Accept header
  const enc = encodeURIComponent(path);
  return WIDTHS.map((w) => `/_next/image?url=${enc}&w=${w}&q=${q} ${w}w`).join(', ');
}

export default function HomepageParallax() {
  const [height, setHeight] = useState(750);

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth < 480) setHeight(300);
      else if (window.innerWidth < 768) setHeight(400);
      else setHeight(750);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const path = '/home/elegant-dessert-table-setting-green-runner-macarons-flowers.jpg';

  const srcSet = useMemo(() => nextSrcSet(path, 78), [path]);
  const sizes = '100vw';

  return (
    <div className={styles.para}>
      <Parallax
        blur={0}
        strength={700}
        /** Fallback src (SSR + non-supporting browsers) */
        bgImage={path}
        /** ✅ Next-optimized responsive sources */
        bgImageSrcSet={srcSet}
        bgImageSizes={sizes}
        bgImageAlt="Dessert table"
        bgClassName={styles.bg}
        bgImageStyle={{ objectFit: 'cover', objectPosition: 'center' }}
      >
        <div style={{ height }} />
      </Parallax>
    </div>
  );
}

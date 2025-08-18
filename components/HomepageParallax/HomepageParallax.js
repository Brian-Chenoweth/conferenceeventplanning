import { useEffect, useState } from 'react';
import { Parallax } from 'react-parallax';

import styles from './HomepageParallax.module.scss';

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

  return (
    <div className={styles.para}>
      <Parallax
        blur={0}
        strength={700}
        bgImage="/home/elegant-dessert-table-setting-green-runner-macarons-flowers.jpg"
        bgImageAlt="Dessert table"
        bgClassName={styles.bg}
        bgImageStyle={{ objectFit: 'cover', objectPosition: 'center' }}
   // ⬅️ add this
      >
        <div style={{ height }} />
      </Parallax>

    </div>
  );
}
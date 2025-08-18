import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Parallax, Background } from 'react-parallax';

import styles from './HomepageAttainableHousing.module.scss';

export default function HomepageAttainableHousing() {
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
import Image from 'next/image';
import Link from 'next/link';

import styles from './HomepageEventOfferings.module.scss';

const CARD_IMG_PROPS = {
  width: 778,
  height: 728,
  quality: 72, // small bump for thumbnails
  loading: 'lazy',
  style: { width: '100%', height: 'auto', objectFit: 'cover' },
};

export default function HomepageEventOfferings() {
  return (
    <div className={styles.cta}>
      <div className="wp-block-columns alignwide three-cards is-layout-flex">
        {/* Card 1 */}
        <div className="wp-block-column has-black-background-color has-background is-layout-flow">
          <figure className="wp-block-image size-large">
            <Image
              src="/home/buffet-shrimp-skewers-catering.png"
              alt="Guests laughing and socializing around red tablecloth cocktail tables with bowls of strawberries at a networking event."
              className={styles.image}
              sizes="(min-width: 1200px) 360px, (min-width: 768px) 50vw, 100vw"
              {...CARD_IMG_PROPS}
            />
          </figure>
          {/* ... */}
        </div>

        {/* Card 2 (middle column is wider on desktop) */}
        <div className="wp-block-column has-black-background-color has-background is-layout-flow">
          <figure className="wp-block-image size-large">
            <Image
              src="/home/outdoor-dinner-event-string-lights.png"
              alt="Guests seated at round tables under string lights during an outdoor dinner event in a garden setting."
              className={styles.image}
              sizes="(min-width: 1200px) 480px, (min-width: 768px) 50vw, 100vw"
              {...CARD_IMG_PROPS}
            />
          </figure>
          {/* ... */}
        </div>

        {/* Card 3 */}
        <div className="wp-block-column has-black-background-color has-background is-layout-flow">
          <figure className="wp-block-image size-large">
            <Image
              src="/home/students-cheering-poolside-event.png"
              alt="A group of students laughing and cheering poolside during a lively campus event under clear skies."
              className={styles.image}
              sizes="(min-width: 1200px) 360px, (min-width: 768px) 50vw, 100vw"
              {...CARD_IMG_PROPS}
            />
          </figure>
          {/* ... */}
        </div>
      </div>
    </div>
  );
}

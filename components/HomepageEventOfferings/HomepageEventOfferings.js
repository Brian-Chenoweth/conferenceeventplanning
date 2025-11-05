import Image from 'next/image';
import Link from 'next/link';

import styles from './HomepageEventOfferings.module.scss';

const CARD_IMG_PROPS = {
  width: 778,
  height: 728,
  quality: 72,
  loading: 'lazy',
  style: { width: '100%', height: 'auto', objectFit: 'cover' },
};

export default function HomepageEventOfferings() {
  return (
    <div className={styles.cta}>
      <div className="wp-block-columns alignwide three-cards is-layout-flex">
        {/* Card 1 (side column ~355px on desktop) */}
        <div className="wp-block-column has-black-background-color has-background is-layout-flow">
          <figure className="wp-block-image size-large">
            <Image
              src="/home/buffet-shrimp-skewers-catering.png"
              alt="Guests laughing and socializing around red tablecloth cocktail tables with bowls of strawberries at a networking event."
              className={styles.image}
              sizes="(min-width: 1200px) 355px, (min-width: 768px) 50vw, 100vw"
              {...CARD_IMG_PROPS}
            />
          </figure>

          <div className="wp-block-group is-layout-flow">
            <h3 className="wp-block-heading has-text-align-left has-white-color has-text-color">Services</h3>
            <p className="has-text-align-left has-white-color has-text-color has-small-font-size">
              From planning the meals to budget development and financial reporting, let us take care of the nitty gritty.
            </p>
            <p className="has-white-color has-text-color has-link-color">
              <Link legacyBehavior href="/plan/services/">
                <a className={styles.link} title="See What we Offer"><span>See What we Offer</span></a>
              </Link>
            </p>
          </div>
        </div>

        {/* Card 2 (middle column ~474px on desktop) */}
        <div className="wp-block-column has-black-background-color has-background is-layout-flow">
          <figure className="wp-block-image size-large">
            <Image
              src="/home/outdoor-dinner-event-string-lights.png"
              alt="Guests seated at round tables under string lights during an outdoor dinner event in a garden setting."
              className={styles.image}
              sizes="(min-width: 1280px) 474px, (min-width: 1024px) 420px, 50vw"
              quality={68}         
              loading="lazy"
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              width={778}
              height={728}
            />
          </figure>

          <div className="wp-block-group is-layout-flow">
            <h3 className="wp-block-heading has-text-align-left has-white-color has-text-color">Venues</h3>
            <p className="has-text-align-left has-white-color has-text-color has-small-font-size">
              We have all the rooms, theaters, auditoriums, sports fields and hiking trails that you could possibly need.
            </p>
            <p className="has-white-color has-text-color has-link-color">
              <Link legacyBehavior href="/plan/venues/">
                <a className={styles.link} title="Explore Our Space Options"><span>Explore Our Space Options</span></a>
              </Link>
            </p>
          </div>
        </div>

        {/* Card 3 (side column ~355px on desktop) */}
        <div className="wp-block-column has-black-background-color has-background is-layout-flow">
          <figure className="wp-block-image size-large">
            <Image
              src="/home/students-cheering-poolside-event.png"
              alt="A group of students laughing and cheering poolside during a lively campus event under clear skies."
              className={styles.image}
              sizes="(min-width: 1200px) 355px, (min-width: 768px) 50vw, 100vw"
              {...CARD_IMG_PROPS}
            />
          </figure>

          <div className="wp-block-group is-layout-flow">
            <h3 className="wp-block-heading has-text-align-left has-white-color has-text-color">Accommodations</h3>
            <p className="has-text-align-left has-white-color has-text-color has-small-font-size">
              Create an immersive experience with modern on-campus communities, or five-star accommodation in the heart of SLO.
            </p>
            <p className="has-white-color has-text-color has-link-color">
              <Link legacyBehavior href="/plan/accommodations/">
                <a className={styles.link} title="Browse Where You Can Stay"><span>Browse Where You Can Stay</span></a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

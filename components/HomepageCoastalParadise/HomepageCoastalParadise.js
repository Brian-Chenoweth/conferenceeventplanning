import Link from 'next/link';

import styles from './HomepageCoastalParadise.module.scss';


export default function HomepageCoastalParadise() {
  return (
    <div className={styles.cta}>
      <div className="wp-block-group centered bg-beige has-global-padding is-layout-constrained wp-block-group-is-layout-constrained">
        <h2 className="wp-block-heading">Host Your Event in Coastal Paradise</h2>
        <p>A laidback coastal mountain town with a mediterranean climate, San Luis Obispo offers much more than expected. A historic downtown surrounded by a world class wine region with pristine beaches just minutes away.</p>
        <p>And in the middle of it all, Cal Poly.</p>
        <p>
          <Link legacyBehavior href="/plan/location/" target="_blank" rel="noopener">
            <a title="Discover San Luis Obispo">
              Discover San Luis Obispo
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
}

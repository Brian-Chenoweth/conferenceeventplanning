import Image from 'next/image';
import Link from 'next/link';

import styles from './HomepageVision.module.scss';

export default function HomepageVision() {
  return (
    <div className="bg-beige">
    <section className={styles.mintBand}>
      <div className={styles.container}>
        <div className={`${styles.layout} ${styles.mirrored}`}>
          {/* Media */}
          <figure className={styles.media}>
            <Image
              src="/home/wedding-cake-slices-outdoor-reception.jpg"
              width={1600}
              height={1067}
              alt="Plated slices of wedding cake with pink and yellow frosting served at an outdoor reception, with a server arranging desserts in the background."
              className={styles.image}
              sizes="(min-width: 1280px) 582px, (min-width: 1024px) 520px, 100vw"
              quality={72}
              loading="lazy" 
              style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
          </figure>

          {/* Card */}
          <div className={styles.card}>
            <h2 className={styles.heading}>Bring your vision to life</h2>

            <p>
              Imagine hosting your event in the heart of a vibrant coastal town, surrounded by stunning landscapes and top-notch amenities. Our expert team will handle everything—from venue selection and catering to logistics and staffing—making your event successful.
            </p>
            <p className={styles.bodyBottom}>
              We have the expertise and experience to bring your dream to reality. 
            </p>

            <p className={styles.ctaRow}>
              <Link legacyBehavior href="/envision/">
                <a className={styles.link} title="See the Possibilities">
                  <span>See the Possibilities</span>
                </a>
              </Link>
            </p>
            
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}

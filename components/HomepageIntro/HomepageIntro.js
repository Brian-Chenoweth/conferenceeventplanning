import { Button } from 'components';

import styles from './HomepageIntro.module.scss';

export default function HomepageIntro() {
  return (
    <div className={styles.homeIntroWrapper}>

    <section className={`bg-white centered ${styles.homeIntro}`}>

        <p>
          Ready to create something extraordinary? At Cal Poly Conference and Event Planning, we&apos;re excited to partner with you to bring your vision to life. Whether it&apos;s a conference, workshop, or special event, our team is here to ensure every detail is perfect.
        </p>

        <Button href="/contact/" styleType="primary">
          Get Started
        </Button>

    </section>

    </div>
  );
}

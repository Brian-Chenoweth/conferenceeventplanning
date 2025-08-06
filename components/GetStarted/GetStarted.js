import { useMemo } from 'react';
import { Button } from 'components';
import styles from './GetStarted.module.scss';

export default function GetStarted() {
  // useMemo ensures the heading doesn't change on every re-render
  const heading = useMemo(() => {
    const options = ["Let's Get it Started", "Ready to Get Started?"];
    return options[Math.floor(Math.random() * options.length)];
  }, []);

  return (
    <div className={styles.cta}>
      <div className="wp-block-group centered bg-green has-global-padding is-layout-constrained wp-block-group-is-layout-constrained container">
        <h2 className="wp-block-heading">{heading}</h2>
        <p>
          Share the details of your event with us, and together, we&apos;ll start
          creating the memorable experience that you&apos;re looking for.
        </p>
        <Button href="/contact/" styleType="primary">
          Get Started
        </Button>
      </div>
    </div>
  );
}

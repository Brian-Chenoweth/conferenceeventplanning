import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'components';

import styles from './GetStarted.module.scss';

export default function GetStarted() {
  const [heading, setHeading] = useState("Let's Get it Started");
  const [paragraph, setParagraph] = useState(
    "Share the details of your event with us, and together, we&apos;ll start creating the memorable experience that you&apos;re looking for."
  );

  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/") {
      setHeading("Plan Your Event With Us");
      setParagraph(
        "Share a few details about your event, and we’ll take it from there. We’re excited to bring your vision to life."
      );
    } else {
      const options = ["Let's Get it Started", "Ready to Get Started?"];
      const random = options[Math.floor(Math.random() * options.length)];
      setHeading(random);
      setParagraph(
        "Share the details of your event with us, and together, we&apos;ll start creating the memorable experience that you&apos;re looking for."
      );
    }
  }, [router.pathname]);

  return (
    <div className={styles.cta}>
      <div className="wp-block-group centered bg-green has-global-padding is-layout-constrained wp-block-group-is-layout-constrained container">
        <h2 className="wp-block-heading">{heading}</h2>
        <p dangerouslySetInnerHTML={{ __html: paragraph }} />
        <Button href="/contact/" styleType="primary">
          Get Started
        </Button>
      </div>
    </div>
  );
}

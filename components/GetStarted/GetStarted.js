import { Button } from 'components';

import styles from './GetStarted.module.scss';


export default function GetStarted() {
  return (
    <div className={styles.cta}>
      <div className="wp-block-group centered bg-green has-global-padding is-layout-constrained wp-block-group-is-layout-constrained container">
        
        <h2 className="wp-block-heading">Let's Get it Started</h2>
        <p>Share the details of your event with us, and together, we&apos;ll start creating the memorable experience that you&apos;re looking for.</p>
          
        <Button href="/contact/" styleType="primary">
            Get Started
        </Button>
        
      </div>
    </div>
  );
}

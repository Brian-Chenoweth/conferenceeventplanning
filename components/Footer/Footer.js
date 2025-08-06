import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { GetStarted } from 'components';

import { NavigationMenu } from '../';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

/**
 * The Blueprint's Footer component
 * @return {React.ReactElement} The Footer component.
 */
export default function Footer({
  siteTitle,
  title,
  menuItems, // PRIMARY footer menu
  navOneMenuItems, // SECONDARY footer menu
  navTwoMenuItems, // TERTIARY footer menu
}) {
  return (
    <>
      <GetStarted />
      <footer className={cx('footer')}>
        {/* Footer Navigation */}
        <div className="container">
          <div className={cx('footer-nav-contact-info')}>
            <div className={cx('footer-nav')}>
              <h3>Quick Links</h3>
              <NavigationMenu className={cx('quick')} menuItems={menuItems} />
            </div>

            <div className={cx('contact-info')}>
              <Link href="/" legacyBehavior>
                <a className={cx('cppText')}>
                  {title ?? 'Cal Poly Partners'}
                </a>
              </Link>
              <a href="tel:7600" className={cx('phone')}>
                (805) 756-7600
              </a>
            </div>
          </div>

          <div className={cx('logo-address')}>
            <div className={cx('logo')}>
              <Link legacyBehavior href="/">
                <a title="Home">
                  <Image
                    src="/logo.png"
                    width={400}
                    height={80}
                    alt="Cal Poly University logo"
                    layout="responsive"
                  />
                </a>
              </Link>
            </div>

            <p>1 Grand Avenue, San Luis Obispo, CA 93407</p>

            <a href="tel:8057561111" className={cx('phone')}>
              (805) 756-1111
            </a>
          </div>

          <div className={cx('nav-one')}>
            <NavigationMenu className={cx('nav')} menuItems={navOneMenuItems} />
          </div>

          <div className={cx('nav-two')}>
            <NavigationMenu className={cx('nav')} menuItems={navTwoMenuItems} />
          </div>

          <div className={cx('copyright')}>
            &copy; {new Date().getFullYear()} {siteTitle ?? 'Cal Poly Partners'}
          </div>
        </div>
        {console.log(menuItems, navOneMenuItems, navTwoMenuItems)}
      </footer>
    </>
  );
}

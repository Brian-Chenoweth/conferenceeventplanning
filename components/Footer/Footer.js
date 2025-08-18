// Footer.js
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';

// ⬇️ Import directly to avoid circular deps with the barrel
import GetStarted from '../GetStarted';
import Testimonials from '../Testimonials';

import { NavigationMenu } from '../';
import styles from './Footer.module.scss';
const cx = classNames.bind(styles);

// ⬇️ Inline a fragment so we don't depend on Testimonials.fragments
const FOOTER_TESTIMONIALS_FRAGMENT = gql`
  fragment FooterTestimonialsFragment on Testimonial {
    databaseId
    title
    featuredImage {
      node {
        sourceUrl
        altText
        mediaDetails { width height }
      }
    }
    testimonialFields {
      testimonialContent
      testimonialJob
      testimonialAuthor
    }
  }
`;

const FOOTER_TESTIMONIALS_QUERY = gql`
  ${FOOTER_TESTIMONIALS_FRAGMENT}
  query FooterTestimonials {
    testimonials {
      nodes {
        ...FooterTestimonialsFragment
      }
    }
  }
`;

export default function Footer({
  siteTitle,
  title,
  menuItems,
  navOneMenuItems,
  navTwoMenuItems,
}) {
  const router = useRouter();
  const isHome = router.pathname === '/';

  // Only fetch when NOT on homepage
  const { data: tdata } = useQuery(FOOTER_TESTIMONIALS_QUERY, { skip: isHome });
  const tnodes = tdata?.testimonials?.nodes ?? [];

  return (
    <>
      {!isHome && tnodes.length > 0 && (
         <div className="container">
          {/* <h2>Hear what our clients rave about</h2> */}
          {/* <p>Read what our satisfied clients have to say about their amazing experiences with us.</p> */}
          <Testimonials testimonials={tnodes} />
        </div>
      )}

      <GetStarted />
      <footer className={cx('footer')}>
        <div className="container">
          <div className={cx('footer-nav-contact-info')}>
            <div className={cx('footer-nav')}>
              <h3>Quick Links</h3>
              <NavigationMenu className={cx('quick')} menuItems={menuItems} />
            </div>

            <div className={cx('contact-info')}>
              <Link href="/" legacyBehavior>
                <a className={cx('cppText')}>{title ?? 'Cal Poly Partners'}</a>
              </Link>
              <a href="tel:7600" className={cx('phone')}>(805) 756-7600</a>
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
            <a href="tel:8057561111" className={cx('phone')}>(805) 756-1111</a>
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

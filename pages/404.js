import * as MENUS from 'constants/menus';

import { gql, useQuery } from '@apollo/client';
import {
  Button,
  Footer,
  Header,
  Main,
  NavigationMenu,
  SEO,
} from 'components';
import { BlogInfoFragment } from 'fragments/GeneralSettings';
import styles from 'styles/pages/_404.module.scss';

export default function Page() {
  const { data: pageData, loading: pageLoading } = useQuery(Page.query, {
    variables: Page.variables(),
  });

  if (pageLoading || !pageData) return null;

  const { title: siteTitle, description: siteDescription } =
    pageData?.generalSettings ?? {};

  const primaryMenu = pageData?.headerMenuItems?.nodes ?? [];
  const footerMenu = pageData?.footerMenuItems?.nodes ?? [];
  const navOneMenuItems = pageData?.footerSecondaryMenuItems?.nodes ?? [];

  // Prefer tertiary-by-location; fall back to tertiary-by-name if empty
  const quickLinksMenuItems =
    (pageData?.footerTertiaryMenuItems?.nodes?.length
      ? pageData.footerTertiaryMenuItems.nodes
      : pageData?.footerTertiaryByName?.menuItems?.nodes) ?? [];

  const pageTitle = siteTitle ? `404 — ${siteTitle}` : '404 — Page Not Found';

  return (
    <>
      <SEO
        title={pageTitle}
        description={
          siteDescription ||
          'The page you are looking for could not be found. Try heading home or searching the site.'
        }
      />

      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />

      <Main>
        <section className={styles.page}>
          <div className="container">
            <div className={styles.hero}>
              <div className={styles.panel}>
                <p className={styles.badge}>Page Not Found</p>
                <h1 className={styles.title}>
                  <span className={styles.code}>404</span>
                  We could not find that page.
                </h1>
                <p className={styles.lede}>
                  The link might be outdated, or the page may have moved. Start
                  over with a fresh route below.
                </p>
                <div className={styles.actions}>
                  <Button href="/">Back to home</Button>
                  <Button href="/search" styleType="secondary">
                    Search the site
                  </Button>
                </div>
                <p className={styles.hint}>
                  If you followed a link, let us know and we will fix it.{' '}
                  <a href="/contact/">Contact us.</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Main>

      <Footer
        title={siteTitle}
        menuItems={footerMenu}
        navOneMenuItems={navOneMenuItems}
        quickLinksMenuItems={quickLinksMenuItems}
      />
    </>
  );
}

Page.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    footerSecondaryLocation: MENUS.FOOTER_SECONDARY_LOCATION,
    footerTertiaryLocation: MENUS.FOOTER_TERTIARY_LOCATION,
    // Change ONLY if your Quick Links menu has a different name in WP Admin → Menus
    footerTertiaryMenuName: 'Quick Links',
  };
};

Page.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query Get404PageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $footerSecondaryLocation: MenuLocationEnum
    $footerTertiaryLocation: MenuLocationEnum
    $footerTertiaryMenuName: ID!
  ) {
    generalSettings {
      ...BlogInfoFragment
    }

    headerMenuItems: menuItems(where: { location: $headerLocation } first: 100) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }

    footerMenuItems: menuItems(where: { location: $footerLocation } first: 100) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }

    footerSecondaryMenuItems: menuItems(
      where: { location: $footerSecondaryLocation }
      first: 100
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }

    # Tertiary by LOCATION (preferred)
    footerTertiaryMenuItems: menuItems(
      where: { location: $footerTertiaryLocation }
      first: 100
    ) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }

    # Tertiary by NAME (failsafe if location isn’t wired/assigned)
    footerTertiaryByName: menu(id: $footerTertiaryMenuName, idType: NAME) {
      menuItems {
        nodes {
          ...NavigationMenuItemFragment
        }
      }
    }
  }
`;

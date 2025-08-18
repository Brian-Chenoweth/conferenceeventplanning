import * as MENUS from 'constants/menus';

import { useQuery, gql } from '@apollo/client';
import { FaArrowRight } from 'react-icons/fa';
import styles from 'styles/pages/_Home.module.scss';
import {
  EntryHeader,
  Main,
  Button,
  Heading,
  CTA,
  NavigationMenu,
  SEO,
  Header,
  Footer,
  Testimonials,
  HomepageEventOfferings,
  HomepageIntro,
  HomepageATeam,
  HomepageVision,
  HomepageCoastalParadise,
  HomepageAttainableHousing,
  HomepageEmpowering,
  HomepageFoodInsecurity,
} from 'components';
import { BlogInfoFragment } from 'fragments/GeneralSettings';


export default function Component() {
  const { data, loading } = useQuery(Component.query, {
    variables: Component.variables(),
  });
  if (loading) {
    return null;
  }

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  const mainBanner = {
    sourceUrl: '/static/banner.jpeg',
    mediaDetails: { width: 1200, height: 600 },
    altText: 'Portfolio Banner',
  };
  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />

      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />

      <Main className={styles.home}>

        <EntryHeader image={mainBanner} />

        <div className="container">

          <HomepageIntro />

          <HomepageVision />

          <HomepageATeam />


          <div className={styles.testimonials}>
            <h2 className="wp-block-heading">Discover Our Event Offerings</h2>
            <p>Let us take care of it. Planning a week-long conference or afternoon event is not everyone&apos;s forte. That is where we shine. And oh, do we shine. From housing to dining and facility coordination to onsite staffing, we can take it from concept to creation.</p>
            <HomepageEventOfferings />
          </div>

          <HomepageCoastalParadise />

          <HomepageAttainableHousing />

          <HomepageEmpowering />

          <HomepageFoodInsecurity />

          <div className={styles.testimonials}>
            <h2>Hear what our clients rave about</h2>
            <p>Read what our satisfied clients have to say about their amazing experiences with us.</p>
            <Testimonials testimonials={data?.testimonials?.nodes} />
          </div>


        </div>

      </Main>

      <Footer
        title={siteTitle}
        menuItems={footerMenu}
        navOneMenuItems={data?.footerSecondaryMenuItems?.nodes ?? []}
        navTwoMenuItems={data?.footerTertiaryMenuItems?.nodes ?? []}
      />


    </>
  );
}

Component.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    footerSecondaryLocation: MENUS.FOOTER_SECONDARY_LOCATION,
    footerTertiaryLocation: MENUS.FOOTER_TERTIARY_LOCATION,
  };
};

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${Testimonials.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $footerSecondaryLocation: MenuLocationEnum
    $footerTertiaryLocation: MenuLocationEnum
  ) {
    testimonials {
      nodes {
        ...TestimonialsFragment
      }
    }
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }, first: 100) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
   footerMenuItems: menuItems(where: { location: $footerLocation }) {
  nodes {
    ...NavigationMenuItemFragment
  }
}
footerSecondaryMenuItems: menuItems(where: { location: $footerSecondaryLocation }) {
  nodes {
    ...NavigationMenuItemFragment
  }
}
footerTertiaryMenuItems: menuItems(where: { location: $footerTertiaryLocation }) {
  nodes {
    ...NavigationMenuItemFragment
  }
}
  }
`;

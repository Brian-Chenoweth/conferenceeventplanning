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
  HomepageParallax,
  HomepageEventHighlights,
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
  const quickLinks   = data?.quickFooterMenuItems?.nodes ?? [];
  const aboutLinks   = data?.aboutFooterMenuItems?.nodes ?? [];
  const navOne       = data?.footerSecondaryMenuItems?.nodes ?? [];
  const navTwo       = data?.footerTertiaryMenuItems?.nodes ?? [];
  const resources    = data?.resourcesFooterMenuItems?.nodes ?? [];

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

          <HomepageParallax />

          <HomepageCoastalParadise />

          <HomepageEventHighlights />

          <div className={styles.testimonials}>
            <h2>Hear what our clients rave about</h2>
            <p>Read what our satisfied clients have to say about their amazing experiences with us.</p>
            <Testimonials testimonials={data?.testimonials?.nodes} />
          </div>


        </div>

      </Main>
{/* 
      <Footer
        title={siteTitle}
        menuItems={footerMenu}
        navOneMenuItems={data?.footerSecondaryMenuItems?.nodes ?? []}
        navTwoMenuItems={data?.footerTertiaryMenuItems?.nodes ?? []}
      /> */}

      <Footer
        title={siteTitle}
        menuItems={quickLinks}                // left column: Quick Footer
        navOneMenuItems={navOne}              // middle: Footer Secondary
        navTwoMenuItems={navTwo}              // right: Footer Tertiary
        resourcesMenuItems={resources} 
        aboutMenuItems={aboutLinks}        // new Resources block
      />


    </>
  );
}

// Component.variables = () => {
//   return {
//     headerLocation: MENUS.PRIMARY_LOCATION,
//     footerLocation: MENUS.FOOTER_LOCATION,
//     footerSecondaryLocation: MENUS.FOOTER_SECONDARY_LOCATION,
//     footerTertiaryLocation: MENUS.FOOTER_TERTIARY_LOCATION,
//   };
// };

Component.variables = () => ({
  headerLocation: MENUS.PRIMARY_LOCATION,
  // was FOOTER_LOCATION — stop using it on the homepage
   footerLocation: MENUS.FOOTER_LOCATION,
  quickFooterLocation: MENUS.QUICK_FOOTER_LOCATION,
  aboutFooterLocation: MENUS.ABOUT_FOOTER_LOCATION,
  footerSecondaryLocation: MENUS.FOOTER_SECONDARY_LOCATION,
  footerTertiaryLocation: MENUS.FOOTER_TERTIARY_LOCATION,
  resourcesFooterLocation: MENUS.RESOURCES_FOOTER_LOCATION,
});

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${Testimonials.fragments.entry}
  query GetPageData(
  $headerLocation: MenuLocationEnum
  $quickFooterLocation: MenuLocationEnum
  $aboutFooterLocation: MenuLocationEnum
  $footerSecondaryLocation: MenuLocationEnum
  $footerTertiaryLocation: MenuLocationEnum
  $resourcesFooterLocation: MenuLocationEnum
  ) {
    testimonials {
      nodes {
        ...TestimonialsFragment
      }
    }
    generalSettings { ...BlogInfoFragment }
  headerMenuItems: menuItems(where: { location: $headerLocation }, first: 100) {
    nodes { ...NavigationMenuItemFragment }
  }

  quickFooterMenuItems: menuItems(where: { location: $quickFooterLocation }, first: 100) {
    nodes { ...NavigationMenuItemFragment }
    
  }
  aboutFooterMenuItems: menuItems(where: { location: $aboutFooterLocation }, first: 100) {
    nodes { ...NavigationMenuItemFragment }
    
  }
  footerSecondaryMenuItems: menuItems(where: { location: $footerSecondaryLocation }, first: 100) {
    nodes { ...NavigationMenuItemFragment }
  }
  footerTertiaryMenuItems: menuItems(where: { location: $footerTertiaryLocation }, first: 100) {
    nodes { ...NavigationMenuItemFragment }
  }
  resourcesFooterMenuItems: menuItems(where: { location: $resourcesFooterLocation }, first: 100) {
    nodes { ...NavigationMenuItemFragment }
  }
  }
`;

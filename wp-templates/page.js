import * as MENUS from 'constants/menus';

import { gql } from '@apollo/client';
import { BlogInfoFragment } from 'fragments/GeneralSettings';
import { pageTitle } from 'utilities';

import {
  Header,
  Footer,
  Main,
  ContentWrapper,
  EntryHeader,
  NavigationMenu,
  FeaturedImage,
  SEO,
} from '../components';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// Client-only form to avoid SSR/client mismatch
const ContactForm = dynamic(() => import('components/ContactForm'), { ssr: false });

const TOKEN = '<!-- FORMSPREE_CONTACT -->';
const SLOT_HTML = '<div></div>';

// Portals the ContactForm into the placeholder div after mount.
function ContactFormIntoSlot() {
  const [slot, setSlot] = useState(null);
  useEffect(() => {
    setSlot(document.getElementById('contact-form-slot'));
  }, []);
  if (!slot) return null;
  return createPortal(<ContactForm />, slot);
}

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { title, content, featuredImage } = props?.data?.page ?? { title: '' };

  // Replace the marker with a stable placeholder DIV for SSR
  const htmlWithSlot = (content ?? '').split(TOKEN).join(SLOT_HTML);

  return (
    <>
      <SEO
        title={pageTitle(
          props?.data?.generalSettings,
          title,
          props?.data?.generalSettings?.title
        )}
        description={siteDescription}
        imageUrl={featuredImage?.node?.sourceUrl}
      />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <>
          <EntryHeader title={title} image={featuredImage?.node} />
          <div className="container">
            {/* Server and client markup match here */}
            <ContentWrapper content={htmlWithSlot} />
            {/* After hydration, portal the interactive form into the slot */}
            <ContactFormIntoSlot />
          </div>
        </>
      </Main>
      <Footer
        title={siteTitle}
        menuItems={footerMenu}
        navOneMenuItems={props?.data?.footerSecondaryMenuItems?.nodes ?? []}
        quickLinksMenuItems={props?.data?.footerTertiaryMenuItems?.nodes ?? []}
      />
    </>
  );
}

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    footerSecondaryLocation: MENUS.FOOTER_SECONDARY_LOCATION,
    footerTertiaryLocation: MENUS.FOOTER_TERTIARY_LOCATION,
    asPreview: ctx?.asPreview,
  };
};

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  query GetPageData(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $footerSecondaryLocation: MenuLocationEnum
    $footerTertiaryLocation: MenuLocationEnum
    $asPreview: Boolean = false
  ) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      ...FeaturedImageFragment
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

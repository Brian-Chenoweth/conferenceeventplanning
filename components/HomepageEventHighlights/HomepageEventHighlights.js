"use client";

import * as React from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";

import "yet-another-react-lightbox/plugins/captions.css";
import styles from "./HomepageEventHighlights.module.scss";

export default function HomepageEventHighlights() {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const slides = [
    { src: "/home/pound-cake-dessert-bar-with-berries-whipped-cream.jpg", alt: "Shortcake and fresh Cal Poly-made whipped cream and student-grown fruit toppings were available to guests at the Cal Poly Strawberry Center Field Day reception.", w: 1600, h: 1067 },
    { src: "/home/students-cardboard-boat-race-pool-competition.jpg", alt: "High school students participating in the summer EPIC- Engineering Possibilities in College camp launch their boat during the cardboard boat race.", w: 1600, h: 1067 },
    { src: "/home/students-cheering-cardboard-boat-race-poolside.jpg", alt: "Participants in the EPIC- Engineering Possibilities in College cardboard boat race react as their teammates near the finish line.", w: 1600, h: 1067 },
  ];

  return (
    <div className={styles.cta}>
      <div className="centered bg-white">
        <h2 className="wp-block-heading">Explore Event Highlights</h2>
        <p>Scroll through our photo gallery to see the stunning venues and vibrant events we&apos;ve hosted.</p>

        <ul className={styles.grid}>
          {slides.map((s, i) => {
            const isWide = ((i + 1) % 3 === 0);
            const sizes = isWide
              ? "(min-width: 1200px) 580px, (min-width: 768px) 90vw, 100vw"
              : "(min-width: 1200px) 360px, (min-width: 768px) 50vw, 100vw";

            return (
              <li key={i} className={`${styles.item} ${isWide ? styles.wide : ""}`}>
                <button
                  type="button"
                  className={styles.thumbBtn}
                  onClick={() => { setIndex(i); setOpen(true); }}
                  aria-label={`Open image: ${s.alt}`}
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={Math.min(s.w, 800)}
                    height={Math.round((Math.min(s.w, 800) / s.w) * s.h)}
                    quality={78}            // a bit sharper than 70
                    loading="lazy"
                    sizes={sizes}           // wide card gets ~580px, normal ~360px
                    className={styles.thumb}
                    style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  />
                  <span className={styles.overlay} aria-hidden="true"></span>
                  <span className={styles.caption}>{s.description ?? s.alt}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={slides}
          plugins={[Captions]}
          captions={{ showToggle: false, descriptionTextAlign: "center" }}
          styles={{ toolbar: { top: "72px" } }}
          controller={{ closeOnBackdropClick: true }}
        />
      </div>
    </div>
  );
}

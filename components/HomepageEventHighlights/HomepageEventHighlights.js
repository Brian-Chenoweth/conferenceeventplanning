"use client";

import * as React from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import styles from "./HomepageEventHighlights.module.scss";

const SIZES_NORMAL =
  "(min-width: 1200px) 360px, (min-width: 768px) 50vw, 100vw"; // ≈355px column on desktop
const SIZES_WIDE =
  "(min-width: 1200px) 580px, (min-width: 768px) 90vw, 100vw";  // ≈582px wide card on desktop

export default function HomepageEventHighlights() {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const slides = [
    {
      src: "/home/pound-cake-dessert-bar-with-berries-whipped-cream.jpg",
      alt:
        "Shortcake and fresh Cal Poly-made whipped cream and student-grown fruit toppings were available to guests at the Cal Poly Strawberry Center Field Day reception.",
      w: 1600,
      h: 1067,
    },
    {
      src: "/home/students-cardboard-boat-race-pool-competition.jpg",
      alt:
        "High school students participating in the summer EPIC- Engineering Possibilities in College camp launch their boat during the cardboard boat race.",
      w: 1600,
      h: 1067,
    },
    {
      src: "/home/students-cheering-cardboard-boat-race-poolside.jpg",
      alt:
        "Participants in the EPIC- Engineering Possibilities in College cardboard boat race react as their teammates near the finish line.",
      w: 1600,
      h: 1067,
    },
  ];

  return (
    <div className={styles.cta}>
      <div className="centered bg-white">
        <h2 className="wp-block-heading">Explore Event Highlights</h2>
        <p>
          Scroll through our photo gallery to see the stunning venues and vibrant events we&apos;ve hosted.
        </p>

        <ul className={styles.grid}>
          {slides.map((s, i) => {
            const isWide = (i + 1) % 3 === 0;
            const targetW = isWide ? 580 : 360; // matches sizes caps above
            const width = Math.min(s.w, 800);
            const height = Math.round((width / s.w) * s.h);

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
                    width={width}
                    height={height}
                    quality={70}
                    loading="lazy"
                    sizes={isWide ? SIZES_WIDE : SIZES_NORMAL}
                    className={styles.thumb}
                    style={{ width: "100%", height: "auto", objectFit: "cover", maxWidth: `${targetW}px` }}
                  />
                  <span className={styles.overlay} aria-hidden="true"></span>
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

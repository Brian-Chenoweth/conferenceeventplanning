"use client";

import * as React from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import styles from "./HomepageFoodInsecurity.module.scss";

export default function HomepageFoodInsecurity() {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  // Show these on the page AND use them for the lightbox
  const slides = [
    {
      src: "/home/pound-cake-dessert-bar-with-berries-whipped-cream.jpg",
      alt: "Dessert bar with pound cake, berries, and whipped cream.",
      w: 1600,
      h: 1067,
    },
    {
      src: "/home/networking-event-guests-laughing-strawberry-tables.jpg",
      alt: "Guests laughing around cocktail tables with bowls of strawberries.",
      w: 1600,
      h: 1067,
    },
    {
      src: "https://placehold.co/1200x800",
      alt: "Placeholder image.",
      w: 1200,
      h: 800,
    },
  ];

  return (
    <div className={styles.cta}>
      <div className="centered bg-white">
        <h2 className="wp-block-heading">Explore Event Highlights</h2>
        <p>
          Scroll through our photo gallery to see the stunning venues and vibrant events we&apos;ve hosted.
        </p>

        {/* Thumbnails always visible */}
        <ul className={styles.grid}>
          {slides.map((s, i) => (
            <li key={i} className={styles.item}>
              <Image
                src={s.src}
                alt={s.alt}
                width={Math.min(s.w, 800)}
                height={Math.round((Math.min(s.w, 800) / s.w) * s.h)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.thumb}
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
                // If using external domains (like placehold.co) and you haven't whitelisted them in next.config.js:
                {...(s.src.startsWith("http") ? { unoptimized: true } : {})}
              />
            </li>
          ))}
        </ul>

        {/* Lightbox opens only when a thumbnail is clicked */}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={slides.map(({ src }) => ({ src }))}
          styles={{
           // push the close button + toolbar down by your header height
            toolbar: { top: '72px' }, // ← match your header height
          }}
          controller={{ closeOnBackdropClick: true }} // backup close method
        />
      </div>
    </div>
  );
}

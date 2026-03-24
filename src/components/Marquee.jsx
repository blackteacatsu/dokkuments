import React from 'react';
import styles from './Marquee.module.css';

export default function Marquee({ speed = 1, variant = 'text' }) {
  const safeSpeed = Math.max(speed, 0.1);
  const textItems = [
    'Latest: Feb Forecast Data Now Live Through API',
    'Available dates: [2026-02, 2026-03, 2026-04, 2026-05, 2026-06, 2026-07]',
    'Free Image Service !'
  ];
  const loopedTextItems = [...textItems, ...textItems, ...textItems];

  const logos = [
    { src: '/dokkuments/img/university.logo.horizontal.black.svg', alt: 'University Logo' },
    { src: '/dokkuments/img/SA-logo-BLACK.svg', alt: 'SERVIR Amazonia Logo' },
    { src: '/dokkuments/img/brand-nasa.svg', alt: 'NASA Logo' },
    // { src: '/dokkuments/img/duke.png', alt: 'Duke Logo' }
  ];
  const logoItems = [...logos, ...logos, ...logos, ...logos];

  const TextTrack = ({ suffix = '' }) => (
    <div className={styles.track} aria-hidden={suffix !== ''}>
      {loopedTextItems.map((item, index) => (
        <React.Fragment key={`${item}-${suffix}-${index}`}>
          <span className={styles.item}>{item}</span>
          {index < loopedTextItems.length - 1 && <span className={styles.dot}>•</span>}
        </React.Fragment>
      ))}
    </div>
  );

  const LogoTrack = ({ suffix = '' }) => (
    <div className={`${styles.track} ${styles.logoTrack}`} aria-hidden={suffix !== ''}>
      {logoItems.map((logo, index) => (
        <div key={`${logo.alt}-${suffix}-${index}`} className={styles.logoCell}>
          <img src={logo.src} alt={logo.alt} className={styles.logo} />
        </div>
      ))}
    </div>
  );

  const isLogo = variant === 'logos';

  if (isLogo) {
    return (
      <div className={styles.logoOuter} style={{ '--duration': `${64 / safeSpeed}s` }}>
        <div className={styles.logoInner}>
          <LogoTrack />
          <LogoTrack suffix="copy" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.marquee} ${styles.textMarquee}`}
      style={{ '--duration': `${32 / safeSpeed}s` }}
    >
      <div className={styles.fadeLeft} aria-hidden="true" />
      <div className={styles.fadeRight} aria-hidden="true" />
      <div className={styles.viewport}>
        <TextTrack />
        <TextTrack suffix="copy" />
      </div>
    </div>
  );
}

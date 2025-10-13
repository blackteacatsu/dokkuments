import React, { useEffect, useRef } from 'react';
import styles from './Marquee.module.css';

export default function Marquee({ speed = 1 }) {
  const marqueeRef = useRef(null);
  const animationRef = useRef(null);

  const logos = [
    { src: '/dokkuments/img/university.logo.horizontal.black.svg', alt: 'University Logo', className: styles.logoLarge },
    { src: '/dokkuments/img/SA-logo-BLACK.svg', alt: 'SERVIR Amazonia Logo', className: styles.logoSmall },
    { src: '/dokkuments/img/brand-nasa.svg', alt: 'NASA Logo', className: styles.logoLarge },
  ];

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const firstElement = marquee.children[0];
    let position = 0;

    const animate = () => {
      position += speed; // Adjust speed here
      if (position > firstElement.clientWidth) {
        position = 0;
      }
      firstElement.style.marginLeft = `-${position}px`;
      animationRef.current = requestAnimationFrame(animate);
    };

    const startMarquee = () => {
      animationRef.current = requestAnimationFrame(animate);
    };

    const stopMarquee = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    marquee.addEventListener('mouseenter', stopMarquee);
    marquee.addEventListener('mouseleave', startMarquee);

    startMarquee();

    return () => {
      stopMarquee();
      marquee.removeEventListener('mouseenter', stopMarquee);
      marquee.removeEventListener('mouseleave', startMarquee);
    };
  }, [speed]);

  const LogoGroup = () => (
    <div className={styles.logoGroup}>
      {logos.map((logo, index) => (
        <img
          key={index}
          src={logo.src}
          alt={logo.alt}
          className={logo.className}
        />
      ))}
    </div>
  );

  return (
    <div className={styles.marquee} ref={marqueeRef}>
      <LogoGroup />
      <LogoGroup />
      <LogoGroup />
    </div>
  );
}

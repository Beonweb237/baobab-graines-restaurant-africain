import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const text1 = 'UN VOYAGE CULINAIRE \u00B7 UN VOYAGE CULINAIRE \u00B7 ';
const text2 = 'UN VOYAGE CULINAIRE \u00B7 UN VOYAGE CULINAIRE \u00B7 ';

export default function LiquidBannerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      });
      triggers.push(tl.scrollTrigger!);

      tl.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' });
    }, sectionRef);

    return () => {
      triggers.forEach((st) => st.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden relative"
      style={{
        backgroundColor: '#1C1917',
        padding: 'clamp(60px, 6vw, 80px) 0',
        opacity: 0,
      }}
    >
      {/* Marquee Row 1 - scrolling left */}
      <div className="relative w-full overflow-hidden py-2">
        <div
          ref={marquee1Ref}
          className="flex whitespace-nowrap animate-marquee"
        >
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-display font-medium text-[#FFFBF5] mx-2 flex-shrink-0"
              style={{
                fontSize: 'clamp(48px, 6vw, 72px)',
                lineHeight: 1.1,
              }}
            >
              {text1}
            </span>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 - scrolling right */}
      <div className="relative w-full overflow-hidden py-2">
        <div
          ref={marquee2Ref}
          className="flex whitespace-nowrap animate-marquee-reverse"
        >
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-display font-medium mx-2 flex-shrink-0"
              style={{
                fontSize: 'clamp(48px, 6vw, 72px)',
                lineHeight: 1.1,
                color: 'transparent',
                WebkitTextStroke: '1px #FFFBF5',
              }}
            >
              {text2}
            </span>
          ))}
        </div>
      </div>

      {/* Subtitle */}
      <p
        className="font-body italic text-base text-center mt-8"
        style={{ color: '#D4A853' }}
      >
        Chaque bouchée est une découverte
      </p>
    </section>
  );
}

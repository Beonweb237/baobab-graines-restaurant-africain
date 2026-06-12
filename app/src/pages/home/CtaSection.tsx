import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const btnWrapRef = useRef<HTMLDivElement>(null);

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

      tl
        .fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' })
        .fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.3)
        .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.5)
        .fromTo(btnWrapRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }, 0.7);
    }, sectionRef);

    return () => {
      triggers.forEach((st) => st.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ minHeight: '500px', padding: 'clamp(80px, 10vw, 128px) 0' }}
    >
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0 }}
      >
        <img
          src="/restaurant-3.jpg"
          alt="Terrasse du restaurant"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(28,25,23,0.7)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <h2
          ref={titleRef}
          className="font-display font-medium text-[#FFFBF5]"
          style={{
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: 1.1,
            textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            opacity: 0,
          }}
        >
          Réservez votre table
        </h2>

        <p
          ref={subtitleRef}
          className="font-body text-base md:text-lg text-[#FFFBF5] mt-4 mx-auto"
          style={{
            maxWidth: '500px',
            opacity: 0,
            textShadow: '0 1px 10px rgba(0,0,0,0.3)',
          }}
        >
          Vivez l&apos;expérience Baobab & Graines. Réservation recommandée.
        </p>

        <div className="mt-10" style={{ opacity: 0 }} ref={btnWrapRef}>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 font-body text-sm font-medium text-[#FFFBF5] transition-all duration-[400ms] ease-btn"
            style={{
              background: 'linear-gradient(180deg, #D4A853 0%, #D4601A 100%)',
              border: '1px solid transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = '#FFFBF5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(180deg, #D4A853 0%, #D4601A 100%)';
              e.currentTarget.style.borderColor = 'transparent';
            }}
          >
            Réserver maintenant
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

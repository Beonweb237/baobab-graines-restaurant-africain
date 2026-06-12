import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Instagram, Facebook, Star, ChevronRight } from 'lucide-react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.75 })
        .fromTo(logoRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
        .fromTo(title1Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.2')
        .fromTo(title2Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
        .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .fromTo(badgeRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 }, '-=0.3')
        .fromTo(socialsRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.4');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full overflow-hidden flex items-center"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero-home.jpg"
          alt="Plat africain traditionnel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(28,25,23,0.45)' }} />
      </div>

      {/* Logo centered at top */}
      <div
        ref={logoRef}
        className="absolute top-0 left-0 right-0 z-10 flex justify-center pt-24 md:pt-28"
        style={{ opacity: 0 }}
      >
        <span className="font-display text-2xl md:text-3xl font-medium text-[#FFFBF5] tracking-tight">
          Baobab & Graines
        </span>
      </div>

      {/* Social Links (Left Column) */}
      <div
        ref={socialsRef}
        className="hidden md:flex fixed left-6 z-10 flex-col items-center gap-4"
        style={{ top: '50%', transform: 'translateY(-50%)', opacity: 0 }}
      >
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FFFBF5] hover:text-[#D4A853] transition-colors duration-300"
          aria-label="Instagram"
        >
          <Instagram size={20} />
        </a>
        <div className="w-[1px] h-8 bg-[#FFFBF5] opacity-40" />
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FFFBF5] hover:text-[#D4A853] transition-colors duration-300"
          aria-label="Facebook"
        >
          <Facebook size={20} />
        </a>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-container mx-auto px-4 md:px-6 lg:px-12 pt-32 pb-20">
        <div className="max-w-2xl">
          <h1
            className="font-display font-medium text-[#FFFBF5] text-left md:text-left text-center"
            style={{
              fontSize: 'clamp(36px, 6vw, 80px)',
              lineHeight: 1.1,
              textShadow: '0 4px 30px rgba(0,0,0,0.4)',
            }}
          >
            <span ref={title1Ref} className="block" style={{ opacity: 0 }}>
              L&apos;Afrique dans
            </span>
            <span ref={title2Ref} className="block" style={{ opacity: 0 }}>
              tous vos plats
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="font-body text-base md:text-lg text-[#FFFBF5] mt-6 max-w-[480px] text-left md:text-left text-center mx-auto md:mx-0"
            style={{
              lineHeight: 1.6,
              opacity: 0,
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }}
          >
            Une expérience culinaire authentique où les saveurs africaines se dévoilent avec élégance. Chaque plat raconte une histoire, chaque épice éveille un souvenir.
          </p>

          <div className="mt-10 flex justify-start md:justify-start justify-center">
            <Link
              ref={ctaRef}
              to="/menu"
              className="inline-flex items-center gap-2 px-6 py-3 font-body text-sm font-medium text-[#FFFBF5] transition-all duration-[400ms] ease-btn"
              style={{
                background: 'linear-gradient(180deg, #D4A853 0%, #D4601A 100%)',
                border: '1px solid transparent',
                opacity: 0,
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
              Découvrir notre menu
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Award Badge */}
      <div
        ref={badgeRef}
        className="absolute bottom-6 right-4 md:bottom-10 md:right-10 z-10 flex items-center gap-2 px-4 py-3 md:px-5 md:py-3"
        style={{
          backgroundColor: '#FFFBF5',
          opacity: 0,
        }}
      >
        <Star size={16} className="text-[#D4A853] flex-shrink-0" />
        <span className="font-body text-xs font-semibold uppercase tracking-wider text-[#3B2314]">
          Meilleur Restaurant Africain 2025
        </span>
      </div>
    </section>
  );
}

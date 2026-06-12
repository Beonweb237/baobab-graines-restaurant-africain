import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PresentationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overtitleRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      const imgTl = gsap.timeline({
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
          once: true,
        },
      });
      triggers.push(imgTl.scrollTrigger!);

      imgTl.fromTo(imageRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }
      );

      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          once: true,
        },
      });
      triggers.push(textTl.scrollTrigger!);

      textTl
        .fromTo(overtitleRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.3)
        .fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.5)
        .fromTo(descRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.7)
        .fromTo(btnWrapRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.9);
    }, sectionRef);

    return () => {
      triggers.forEach((st) => st.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full"
      style={{ backgroundColor: '#FFFBF5', padding: 'clamp(80px, 10vw, 128px) 0' }}
    >
      <div className="max-w-container mx-auto px-4 md:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="overflow-hidden"
            style={{ opacity: 0 }}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/restaurant-1.jpg"
                alt="Salle du restaurant Baobab & Graines"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center">
            <span
              ref={overtitleRef}
              className="font-body text-xs font-semibold uppercase tracking-[2px] mb-4 block"
              style={{ color: '#D4A853', opacity: 0 }}
            >
              Notre histoire
            </span>

            <h2
              ref={titleRef}
              className="font-display font-normal mb-6"
              style={{
                color: '#1C1917',
                fontSize: 'clamp(32px, 3.5vw, 40px)',
                lineHeight: 1.2,
                letterSpacing: '-1px',
                opacity: 0,
              }}
            >
              Une cuisine authentique, un héritage préservé
            </h2>

            <p
              ref={descRef}
              className="font-body mb-8"
              style={{
                color: '#8B6B4E',
                fontSize: '16px',
                lineHeight: 1.7,
                opacity: 0,
              }}
            >
              Baobab & Graines est né d&apos;une passion profonde pour les saveurs africaines. Notre chef, Amadou Diallo, a grandi au Sénégal entouré des arômes du marché de Dakar. Chaque plat que nous servons est une invitation au voyage, une célébration des terroirs africains et des recettes transmises de génération en génération.
            </p>

            <div style={{ opacity: 0 }} ref={btnWrapRef}>
              <Link
                to="/notre-histoire"
                className="inline-flex items-center gap-2 px-6 py-3 font-body text-sm font-medium transition-all duration-[400ms] ease-btn"
                style={{
                  color: '#3B2314',
                  border: '1px solid #3B2314',
                  background: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#3B2314';
                  e.currentTarget.style.color = '#FFFBF5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#3B2314';
                }}
              >
                En savoir plus
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

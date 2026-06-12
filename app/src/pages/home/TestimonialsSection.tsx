import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  text: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    text: "Une expérience inoubliable. Les saveurs sont authentiques, le cadre est magnifique et l'accueil est chaleureux. Le poulet yassa est tout simplement divin.",
    name: 'Marie-Claire Dubois',
    role: 'Cliente régulière',
  },
  {
    text: "Baobab & Graines a redéfini ma perception de la cuisine africaine. C'est raffiné, créatif et profondément respectueux des traditions. Un vrai coup de cœur.",
    name: 'Jean-Marc Lefevre',
    role: 'Critique gastronomique, Le Fooding',
  },
  {
    text: 'Nous avons célébré notre anniversaire de mariage ici. L\'équipe a été aux petits soins, le menu de dégustation était exceptionnel. Merci pour cette soirée magique.',
    name: 'Aminata & Karim',
    role: 'Clients',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          once: true,
        },
      });
      triggers.push(headerTl.scrollTrigger!);

      const overtitleEl = headerRef.current?.querySelector('.overtitle');
      const titleEl = headerRef.current?.querySelector('.title');
      if (overtitleEl) headerTl.fromTo(overtitleEl, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
      if (titleEl) headerTl.fromTo(titleEl, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.15);

      const cardsTl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          once: true,
        },
      });
      triggers.push(cardsTl.scrollTrigger!);

      const cards = cardsRef.current?.querySelectorAll('.testimonial-card');
      if (cards) {
        cardsTl.fromTo(cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.15,
          }
        );
      }
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
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span
            className="overtitle font-body text-xs font-semibold uppercase tracking-[2px] mb-4 block"
            style={{ color: '#D4A853', opacity: 0 }}
          >
            Ils en parlent
          </span>
          <h2
            className="title font-display font-normal"
            style={{
              color: '#1C1917',
              fontSize: 'clamp(32px, 3.5vw, 40px)',
              lineHeight: 1.2,
              letterSpacing: '-1px',
              opacity: 0,
            }}
          >
            L&apos;expérience Baobab & Graines
          </h2>
        </div>

        {/* Desktop: 3 cards visible / Mobile: carousel */}
        <div ref={cardsRef}>
          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="lg:hidden">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {testimonials.map((t, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-1">
                    <TestimonialCard testimonial={t} />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={goPrev}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
                style={{ border: '1px solid #1C1917', color: '#1C1917' }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: current === i ? '#3B2314' : '#C4A882',
                      transform: current === i ? 'scale(1.3)' : 'scale(1)',
                    }}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goNext}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
                style={{ border: '1px solid #1C1917', color: '#1C1917' }}
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className="testimonial-card p-8 md:p-10"
      style={{
        border: '1px solid #1C19174D',
        opacity: 0,
      }}
    >
      {/* Quote mark */}
      <span
        className="font-display italic text-5xl leading-none block mb-4"
        style={{ color: '#D4A853' }}
      >
        &ldquo;
      </span>

      {/* Text */}
      <p
        className="font-body text-base mb-6"
        style={{ color: '#1C1917', lineHeight: 1.7 }}
      >
        {testimonial.text}
      </p>

      {/* Author */}
      <div>
        <p className="font-body text-sm font-semibold" style={{ color: '#3B2314' }}>
          {testimonial.name}
        </p>
        <p className="font-body text-[13px]" style={{ color: '#8B6B4E' }}>
          {testimonial.role}
        </p>
      </div>
    </div>
  );
}

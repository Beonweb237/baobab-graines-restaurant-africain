import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Dish {
  title: string;
  description: string;
  price: string;
  tag: string;
  image: string;
}

const dishes: Dish[] = [
  {
    title: 'Couscous Royal',
    description: 'Semoule fine garnie de légumes de saison, agneau tendre et poulet fermier, sublimée par nos épices maison.',
    price: '28 €',
    tag: 'Plat',
    image: '/plat-1.jpg',
  },
  {
    title: 'Poulet Yassa',
    description: 'Poulet mariné aux oignons et citron, cuit lentement pour révéler toute la douceur de la sauce sénégalaise.',
    price: '24 €',
    tag: 'Plat',
    image: '/plat-2.jpg',
  },
  {
    title: 'Alloco Crevettes',
    description: 'Bananes plantain frites croustillantes, crevettes marinées, sauce pimentée maison en pot.',
    price: '18 €',
    tag: 'Entrée',
    image: '/plat-3.jpg',
  },
  {
    title: 'Thieboudienne',
    description: 'Le plat national sénégalais : riz parfumé au poisson, légumes variés, piment et condiments.',
    price: '26 €',
    tag: 'Plat',
    image: '/plat-6.jpg',
  },
  {
    title: "Mafé d'Agneau",
    description: 'Ragoût d\'agneau fondant à la pâte d\'arachide, servi avec du riz basmati parfumé.',
    price: '25 €',
    tag: 'Plat',
    image: '/plat-5.jpg',
  },
  {
    title: 'Duo de Desserts',
    description: 'Beignets de banane et salade de fruits exotiques, nappés au coulis de mangue maison.',
    price: '12 €',
    tag: 'Dessert',
    image: '/plat-7.jpg',
  },
];

const tagStyles: Record<string, { bg: string; text: string }> = {
  Entrée: { bg: '#D4601A33', text: '#D4601A' },
  Plat: { bg: '#4A5D231A', text: '#4A5D23' },
  Dessert: { bg: '#D4A85333', text: '#3B2314' },
};

export default function FeaturedDishesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

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

      const cards = gridRef.current?.querySelectorAll('.dish-card');
      if (cards) {
        const cardsTl = gsap.timeline({
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            once: true,
          },
        });
        triggers.push(cardsTl.scrollTrigger!);

        cardsTl.fromTo(cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1,
          }
        );
      }

      const btnTl = gsap.timeline({
        scrollTrigger: {
          trigger: btnRef.current,
          start: 'top 90%',
          once: true,
        },
      });
      triggers.push(btnTl.scrollTrigger!);

      btnTl.fromTo(btnRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
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
      style={{ backgroundColor: '#F5EFE6', padding: 'clamp(80px, 10vw, 128px) 0' }}
    >
      <div className="max-w-container mx-auto px-4 md:px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span
            className="overtitle font-body text-xs font-semibold uppercase tracking-[2px] mb-4 block"
            style={{ color: '#D4A853', opacity: 0 }}
          >
            Nos spécialités
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
            Les incontournables de Baobab & Graines
          </h2>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {dishes.map((dish) => (
            <div
              key={dish.title}
              className="dish-card group cursor-pointer"
              style={{
                border: '1px solid #1C19174D',
                transition: 'border-color 0.4s ease',
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#3B2314';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1C19174D';
              }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Tag */}
                <span
                  className="absolute top-3 right-3 px-3 py-1 font-body text-xs font-semibold uppercase"
                  style={{
                    backgroundColor: tagStyles[dish.tag]?.bg || '#D4A85333',
                    color: tagStyles[dish.tag]?.text || '#3B2314',
                  }}
                >
                  {dish.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3
                    className="font-display text-xl font-medium"
                    style={{ color: '#1C1917' }}
                  >
                    {dish.title}
                  </h3>
                  <span
                    className="font-body text-lg font-semibold flex-shrink-0"
                    style={{ color: '#3B2314' }}
                  >
                    {dish.price}
                  </span>
                </div>
                <p
                  className="font-body text-sm line-clamp-2"
                  style={{ color: '#8B6B4E', lineHeight: 1.5 }}
                >
                  {dish.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div ref={btnRef} className="text-center mt-12" style={{ opacity: 0 }}>
          <Link
            to="/menu"
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
            Voir tout le menu
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

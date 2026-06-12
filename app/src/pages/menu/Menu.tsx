import { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

interface Dish {
  title: string;
  description: string;
  price: string;
  tag: string;
  tagColor?: string;
  tagTextColor?: string;
  image?: string;
}

const entrees: Dish[] = [
  {
    title: 'Alloco Crevettes',
    description: 'Bananes plantain frites croustillantes, crevettes marinées au citron et gingembre, sauce pimentée maison.',
    price: '18 \u20AC',
    tag: 'Entr\u00E9e',
    tagColor: '#D4601A33',
    tagTextColor: '#D4601A',
    image: '/plat-3.jpg',
  },
  {
    title: 'Fataya au Thon',
    description: 'Chaussons feuillet\u00E9s farcis au thon \u00E9pic\u00E9, oignons et tomates, servis avec une sauce tamarin maison.',
    price: '14 \u20AC',
    tag: 'Entr\u00E9e',
    tagColor: '#D4601A33',
    tagTextColor: '#D4601A',
  },
  {
    title: 'Salade Africaine',
    description: 'M\u00E9lange de l\u00E9gumes frais, avocat, mangue, noix de cajou, vinaigrette au citron vert et huile de palme rouge.',
    price: '16 \u20AC',
    tag: 'Entr\u00E9e',
    tagColor: '#D4601A33',
    tagTextColor: '#D4601A',
  },
  {
    title: 'Soupe de Ch\u00E8vre',
    description: 'Soupe traditionnelle ouest-africaine, ch\u00E8vre tendre, l\u00E9gumes racines, \u00E9pices douces, servie avec du pain traditionnel.',
    price: '15 \u20AC',
    tag: 'Entr\u00E9e',
    tagColor: '#D4601A33',
    tagTextColor: '#D4601A',
  },
];

const plats: Dish[] = [
  {
    title: 'Couscous Royal',
    description: 'Semoule fine garnie de l\u00E9gumes de saison (carottes, navets, courgettes, pois chiches), agneau tendre et poulet fermier, sublim\u00E9e par nos \u00E9pices maison.',
    price: '28 \u20AC',
    tag: 'Plat',
    tagColor: '#4A5D231A',
    tagTextColor: '#4A5D23',
    image: '/plat-1.jpg',
  },
  {
    title: 'Poulet Yassa',
    description: 'Supr\u00EAme de poulet marin\u00E9 24h aux oignons, citron et moutarde, cuit lentement pour une sauce onctueuse. Servi avec du riz blanc parfum\u00E9.',
    price: '24 \u20AC',
    tag: 'Plat',
    tagColor: '#4A5D231A',
    tagTextColor: '#4A5D23',
    image: '/plat-2.jpg',
  },
  {
    title: 'Thieboudienne',
    description: 'Le plat national du S\u00E9n\u00E9gal : riz parfum\u00E9 au poisson, chou, carottes, aubergines, piment et condiments traditionnels.',
    price: '26 \u20AC',
    tag: 'Plat',
    tagColor: '#4A5D231A',
    tagTextColor: '#4A5D23',
    image: '/plat-6.jpg',
  },
  {
    title: "Maf\u00E9 d'Agneau",
    description: "Rago\u00FBt d'agneau fondant \u00E0 la p\u00E2te d'arachide maison, tomates, oignons, servi avec du riz basmati parfum\u00E9.",
    price: '25 \u20AC',
    tag: 'Plat',
    tagColor: '#4A5D231A',
    tagTextColor: '#4A5D23',
    image: '/plat-5.jpg',
  },
  {
    title: 'Poisson Brais\u00E9',
    description: 'Poisson entier brais\u00E9 sur feu de bois, marin\u00E9 aux \u00E9pices ouest-africaines, servi avec alloco et l\u00E9gumes grill\u00E9s sur feuille de bananier.',
    price: '27 \u20AC',
    tag: 'Plat',
    tagColor: '#4A5D231A',
    tagTextColor: '#4A5D23',
    image: '/plat-4.jpg',
  },
  {
    title: 'Ndol\u00E9 au B\u0153uf',
    description: 'Feuilles am\u00E8res ndol\u00E9 cuites dans une sauce onctueuse \u00E0 base de crevettes et d\'arachide, b\u0153uf tendre, plantain et manioc.',
    price: '26 \u20AC',
    tag: 'Plat',
    tagColor: '#4A5D231A',
    tagTextColor: '#4A5D23',
  },
];

const desserts: Dish[] = [
  {
    title: 'Duo de Desserts',
    description: 'Beignets de banane moelleux et salade de fruits exotiques (mangue, ananas, papaye), napp\u00E9s au coulis de mangue maison.',
    price: '12 \u20AC',
    tag: 'Dessert',
    tagColor: '#A63C3C1A',
    tagTextColor: '#A63C3C',
    image: '/plat-7.jpg',
  },
  {
    title: 'Thiakry',
    description: 'Semoule de mil sucr\u00E9e au lait concentr\u00E9, parfum\u00E9e \u00E0 la vanille et au muscade, garnie de raisins secs et de noix de coco r\u00E2p\u00E9e.',
    price: '10 \u20AC',
    tag: 'Dessert',
    tagColor: '#A63C3C1A',
    tagTextColor: '#A63C3C',
  },
  {
    title: 'Fruit \u00E0 la Coque Glac\u00E9',
    description: 'Ananas r\u00F4ti au miel et aux \u00E9pices, servi avec une boule de glace coco maison et un filet de caramel au beurre sal\u00E9.',
    price: '11 \u20AC',
    tag: 'Dessert',
    tagColor: '#A63C3C1A',
    tagTextColor: '#A63C3C',
  },
  {
    title: 'Tiramisu Africain',
    description: 'Notre twist sur le classique italien : biscuits imbib\u00E9s au caf\u00E9 africain, cr\u00E8me mascarpone parfum\u00E9e au cacao et \u00E0 la noix de palme.',
    price: '13 \u20AC',
    tag: 'Dessert',
    tagColor: '#A63C3C1A',
    tagTextColor: '#A63C3C',
  },
];

interface Drink {
  title: string;
  description: string;
  price: string;
  badge?: string;
}

const boissons: Drink[] = [
  {
    title: 'Jus de Bissap',
    description: 'Infusion de fleurs d\'hibiscus, sucre de canne, menthe fra\u00EEche',
    price: '6 \u20AC',
  },
  {
    title: 'Ginger Maison',
    description: 'Jus de gingembre frais p\u00E9tillant, citron vert, sucre de canne',
    price: '6 \u20AC',
  },
  {
    title: 'Bouye',
    description: 'Jus de fruit du baobab, lait, sucre vanill\u00E9',
    price: '7 \u20AC',
  },
  {
    title: 'Cocktail Baobab',
    description: 'Rhum ambr\u00E9, jus de bissap, gingembre frais, citron vert, sirop de sucre de canne',
    price: '12 \u20AC',
    badge: 'Signature',
  },
  {
    title: 'S\u00E9lection de Vins',
    description: 'Notre sommeli\u00E8re Fatou a s\u00E9lectionn\u00E9 des vins africains et fran\u00E7ais qui accompagnent parfaitement nos plats',
    price: '\u00C0 partir de 8 \u20AC / verre',
  },
  {
    title: 'Th\u00E9 \u00E0 la Menthe',
    description: 'Th\u00E9 vert, menthe fra\u00EEche, sucre, servi \u00E0 la traditionnelle',
    price: '5 \u20AC',
  },
];

const categories = [
  { id: 'entrees', label: 'Entr\u00E9es' },
  { id: 'plats', label: 'Plats' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'boissons', label: 'Boissons' },
];

/* ------------------------------------------------------------------ */
/*  SUB-COMPONENTS                                                     */
/* ------------------------------------------------------------------ */

function DishCard({ dish }: { dish: Dish }) {
  return (
    <div
      className="group border border-[#1C19174D] transition-all duration-[400ms] hover:border-[#3B2314] bg-white"
      style={{ padding: 0, overflow: 'hidden' }}
    >
      <div className="flex flex-col md:flex-row">
        {dish.image && (
          <div className="md:w-[35%] flex-shrink-0">
            <img
              src={dish.image}
              alt={dish.title}
              className="w-full h-48 md:h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
        <div
          className="flex flex-col justify-between"
          style={{ padding: '24px', flex: 1 }}
        >
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3
                className="font-display text-[20px] font-medium leading-tight"
                style={{ color: '#1C1917' }}
              >
                {dish.title}
              </h3>
              <span
                className="inline-block px-3 py-1 text-[12px] font-body font-semibold uppercase tracking-wider flex-shrink-0"
                style={{
                  backgroundColor: dish.tagColor || '#D4601A33',
                  color: dish.tagTextColor || '#D4601A',
                }}
              >
                {dish.tag}
              </span>
            </div>
            <p
              className="font-body text-[14px] leading-relaxed line-clamp-2"
              style={{ color: '#8B6B4E' }}
            >
              {dish.description}
            </p>
          </div>
          <p
            className="font-body text-[18px] font-semibold mt-4"
            style={{ color: '#3B2314' }}
          >
            {dish.price}
          </p>
        </div>
      </div>
    </div>
  );
}

function DrinkCard({ drink }: { drink: Drink }) {
  return (
    <div
      className="group border border-[#1C19174D] transition-all duration-[400ms] hover:border-[#3B2314] bg-white"
      style={{ padding: '24px' }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3
              className="font-display text-[20px] font-medium leading-tight"
              style={{ color: '#1C1917' }}
            >
              {drink.title}
            </h3>
            {drink.badge && (
              <span
                className="inline-block px-3 py-1 text-[12px] font-body font-semibold uppercase tracking-wider flex-shrink-0"
                style={{
                  backgroundColor: '#D4A85333',
                  color: '#D4A853',
                }}
              >
                {drink.badge}
              </span>
            )}
          </div>
          <p
            className="font-body text-[14px] leading-relaxed"
            style={{ color: '#8B6B4E' }}
          >
            {drink.description}
          </p>
        </div>
        <p
          className="font-body text-[16px] font-semibold flex-shrink-0"
          style={{ color: '#3B2314' }}
        >
          {drink.price}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE COMPONENT                                                */
/* ------------------------------------------------------------------ */

export default function Menu() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('entrees');

  /* ---- smooth scroll to section ---- */
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 80 + 56; // navbar (80) + sticky nav (56)
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  /* ---- GSAP animations ---- */
  useGSAP(
    () => {
      /* Hero image fade in */
      gsap.fromTo(
        heroImgRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.75, ease: 'power2.out' }
      );

      /* Hero content staggered fade in */
      if (heroContentRef.current) {
        const children = heroContentRef.current.children;
        gsap.fromTo(
          children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.15,
            delay: 0.3,
          }
        );
      }

      /* Sticky nav fade in on scroll */
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: navRef.current,
            start: 'top 90%',
          },
        }
      );

      /* Section headers & cards animations */
      const sections = ['entrees', 'plats', 'desserts', 'boissons'];
      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const header = section.querySelector('.section-header');
        const cards = section.querySelectorAll('.menu-card');

        if (header) {
          gsap.fromTo(
            header,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: header,
                start: 'top 85%',
              },
            }
          );
        }

        if (cards.length) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              stagger: 0.1,
              scrollTrigger: {
                trigger: cards[0],
                start: 'top 85%',
              },
            }
          );
        }
      });

      /* CTA section animation */
      const ctaSection = document.getElementById('cta-reservation');
      if (ctaSection) {
        const ctaChildren = ctaSection.querySelectorAll('.cta-animate');
        gsap.fromTo(
          ctaChildren,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: ctaSection,
              start: 'top 80%',
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  /* ---- Active category tracking on scroll ---- */
  useEffect(() => {
    const sectionIds = categories.map((c) => c.id);
    const triggers: ScrollTrigger[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 160px',
        end: 'bottom 160px',
        onEnter: () => setActiveCategory(id),
        onEnterBack: () => setActiveCategory(id),
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef}>
      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section
        ref={heroRef}
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ height: '60vh', minHeight: '400px' }}
      >
        {/* Background image */}
        <div
          ref={heroImgRef}
          className="absolute inset-0 w-full h-full"
          style={{ willChange: 'transform' }}
        >
          <img
            src="/hero-menu.jpg"
            alt="Assortiment de plats africains"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(28,25,23,0.5)' }}
          />
        </div>

        {/* Hero content */}
        <div
          ref={heroContentRef}
          className="relative z-10 text-center px-4 md:px-6"
        >
          <span
            className="inline-block font-body text-[12px] font-semibold uppercase tracking-[2px] mb-4"
            style={{ color: '#D4A853' }}
          >
            La carte
          </span>
          <h1
            className="font-display text-[48px] md:text-[72px] font-medium leading-[1.1]"
            style={{
              color: '#FFFBF5',
              textShadow: '0 4px 30px rgba(0,0,0,0.4)',
            }}
          >
            Notre Menu
          </h1>
          <p
            className="font-body text-[16px] md:text-[18px] mt-4 max-w-xl mx-auto"
            style={{ color: '#FFFBF5' }}
          >
            Des saveurs authentiques, des produits frais, une cuisine faite maison
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  STICKY CATEGORY NAV                                          */}
      {/* ============================================================ */}
      <div
        ref={navRef}
        className="sticky z-40 border-b border-[#1C19174D]"
        style={{
          top: '80px',
          backgroundColor: 'rgba(255,251,245,0.9)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        <div className="max-w-container mx-auto px-4 md:px-6 lg:px-12">
          <div
            className="flex items-center justify-center gap-6 md:gap-8 overflow-x-auto"
            style={{ padding: '16px 0' }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToSection(cat.id)}
                className="relative font-body text-[14px] font-medium uppercase tracking-[1px] whitespace-nowrap transition-colors duration-300 flex-shrink-0"
                style={{
                  color: activeCategory === cat.id ? '#3B2314' : '#8B6B4E',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 0',
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== cat.id) {
                    e.currentTarget.style.color = '#3B2314';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== cat.id) {
                    e.currentTarget.style.color = '#8B6B4E';
                  }
                }}
              >
                {cat.label}
                {/* Animated underline */}
                <span
                  className="absolute bottom-0 left-0 h-[2px] w-full origin-left transition-transform duration-300"
                  style={{
                    backgroundColor: '#D4A853',
                    transform: activeCategory === cat.id ? 'scaleX(1)' : 'scaleX(0)',
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  ENTR\u00C9ES                                                     */}
      {/* ============================================================ */}
      <section
        id="entrees"
        style={{ backgroundColor: '#FFFBF5', padding: '80px 0' }}
      >
        <div className="max-w-container mx-auto px-4 md:px-6 lg:px-12">
          <div className="section-header" style={{ marginBottom: '48px' }}>
            <h2
              className="font-display text-[32px] md:text-[36px] font-medium"
              style={{ color: '#1C1917', letterSpacing: '-1px' }}
            >
              Entr\u00E9es
            </h2>
            <p
              className="font-body text-[16px] mt-2"
              style={{ color: '#8B6B4E' }}
            >
              Des bouch\u00E9es savoureuses pour \u00E9veiller vos papilles
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {entrees.map((dish, i) => (
              <div key={i} className="menu-card">
                <DishCard dish={dish} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PLATS                                                        */}
      {/* ============================================================ */}
      <section
        id="plats"
        style={{ backgroundColor: '#F5EFE6', padding: '80px 0' }}
      >
        <div className="max-w-container mx-auto px-4 md:px-6 lg:px-12">
          <div className="section-header" style={{ marginBottom: '48px' }}>
            <h2
              className="font-display text-[32px] md:text-[36px] font-medium"
              style={{ color: '#1C1917', letterSpacing: '-1px' }}
            >
              Plats
            </h2>
            <p
              className="font-body text-[16px] mt-2"
              style={{ color: '#8B6B4E' }}
            >
              Nos sp\u00E9cialit\u00E9s, le c\u0153ur de notre cuisine
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {plats.map((dish, i) => (
              <div key={i} className="menu-card">
                <DishCard dish={dish} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  DESSERTS                                                     */}
      {/* ============================================================ */}
      <section
        id="desserts"
        style={{ backgroundColor: '#FFFBF5', padding: '80px 0' }}
      >
        <div className="max-w-container mx-auto px-4 md:px-6 lg:px-12">
          <div className="section-header" style={{ marginBottom: '48px' }}>
            <h2
              className="font-display text-[32px] md:text-[36px] font-medium"
              style={{ color: '#1C1917', letterSpacing: '-1px' }}
            >
              Desserts
            </h2>
            <p
              className="font-body text-[16px] mt-2"
              style={{ color: '#8B6B4E' }}
            >
              Une touche sucr\u00E9e pour finir en beaut\u00E9
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {desserts.map((dish, i) => (
              <div key={i} className="menu-card">
                <DishCard dish={dish} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  BOISSONS                                                     */}
      {/* ============================================================ */}
      <section
        id="boissons"
        style={{ backgroundColor: '#F5EFE6', padding: '80px 0' }}
      >
        <div className="max-w-container mx-auto px-4 md:px-6 lg:px-12">
          <div className="section-header" style={{ marginBottom: '48px' }}>
            <h2
              className="font-display text-[32px] md:text-[36px] font-medium"
              style={{ color: '#1C1917', letterSpacing: '-1px' }}
            >
              Boissons
            </h2>
            <p
              className="font-body text-[16px] mt-2"
              style={{ color: '#8B6B4E' }}
            >
              Rafra\u00EEchissements et saveurs exotiques
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {boissons.map((drink, i) => (
              <div key={i} className="menu-card">
                <DrinkCard drink={drink} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA R\u00C9SERVATION                                             */}
      {/* ============================================================ */}
      <section
        id="cta-reservation"
        style={{
          backgroundColor: '#1C1917',
          padding: '80px 16px',
        }}
      >
        <div className="max-w-container mx-auto text-center">
          <h2
            className="cta-animate font-display text-[32px] md:text-[40px] font-medium"
            style={{ color: '#FFFBF5' }}
          >
            Envie de go\u00FBter ?
          </h2>
          <p
            className="cta-animate font-body text-[16px] mt-4"
            style={{ color: '#8B6B4E' }}
          >
            R\u00E9servez votre table d\u00E8s maintenant et laissez-vous transporter.
          </p>
          <div className="cta-animate mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 font-body text-sm font-medium transition-all duration-[400ms]"
              style={{
                backgroundColor: 'transparent',
                color: '#FFFBF5',
                border: '1px solid #FFFBF5',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFBF5';
                e.currentTarget.style.color = '#1C1917';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#FFFBF5';
              }}
            >
              R\u00E9server
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

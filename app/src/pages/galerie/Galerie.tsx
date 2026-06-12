import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ChevronRight as ChevronRightIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

type Category = 'Tous' | 'Le Restaurant' | 'Les Plats' | "L'Équipe" | "Les Événements";

interface GalleryImage {
  src: string;
  category: Category;
  aspect: 'landscape' | 'portrait';
}

const CATEGORIES: Category[] = ['Tous', 'Le Restaurant', 'Les Plats', "L'Équipe", "Les Événements"];

const GALLERY_IMAGES: GalleryImage[] = [
  { src: '/restaurant-1.jpg', category: 'Le Restaurant', aspect: 'landscape' },
  { src: '/restaurant-2.jpg', category: 'Le Restaurant', aspect: 'landscape' },
  { src: '/plat-1.jpg', category: 'Les Plats', aspect: 'landscape' },
  { src: '/plat-2.jpg', category: 'Les Plats', aspect: 'landscape' },
  { src: '/equipe-1.jpg', category: "L'Équipe", aspect: 'portrait' },
  { src: '/gallery-1.jpg', category: "Les Événements", aspect: 'portrait' },
  { src: '/restaurant-3.jpg', category: 'Le Restaurant', aspect: 'landscape' },
  { src: '/plat-3.jpg', category: 'Les Plats', aspect: 'landscape' },
  { src: '/plat-4.jpg', category: 'Les Plats', aspect: 'landscape' },
  { src: '/equipe-2.jpg', category: "L'Équipe", aspect: 'portrait' },
  { src: '/gallery-3.jpg', category: "Les Événements", aspect: 'portrait' },
  { src: '/restaurant-4.jpg', category: 'Le Restaurant', aspect: 'landscape' },
];

const TESTIMONIALS = [
  {
    image: '/gallery-1.jpg',
    quote: 'Un d\u00eener m\u00e9morable avec des saveurs qui nous ont transport\u00e9s directement \u00e0 Dakar.',
    name: 'Sophie & Thomas Martin',
    date: 'Mars 2025',
  },
  {
    image: '/gallery-4.jpg',
    quote: "L'attention port\u00e9e aux d\u00e9tails est remarquable. De la d\u00e9co aux assiettes, tout respire l'authenticit\u00e9.",
    name: 'Pierre-Henri Dubois',
    date: 'F\u00e9vrier 2025',
  },
  {
    image: '/gallery-5.jpg',
    quote: "Nous avons organis\u00e9 notre soir\u00e9e d'entreprise ici. L'\u00e9quipe a \u00e9t\u00e9 impeccable du d\u00e9but \u00e0 la fin.",
    name: 'A\u00efcha Benali',
    date: 'Janvier 2025',
  },
];

/* ------------------------------------------------------------------ */
/*  HELPER: smooth ease array for Framer Motion                       */
/* ------------------------------------------------------------------ */
const smoothEase = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/*  LIGHTBOX COMPONENT                                                 */
/* ------------------------------------------------------------------ */

function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 z-10 p-2 text-[#FFFBF5] hover:text-ocre transition-colors"
        onClick={onClose}
        aria-label="Fermer"
      >
        <X size={32} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 font-body text-sm text-[#FFFBF5]">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Prev */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-[#FFFBF5] hover:text-ocre transition-colors"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Pr\u00e9c\u00e9dent"
      >
        <ChevronLeft size={40} />
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex].src}
          alt={`Image ${currentIndex + 1}`}
          className="max-w-[90vw] max-h-[90vh] object-contain"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, ease: smoothEase }}
          onClick={(e) => e.stopPropagation()}
        />
      </AnimatePresence>

      {/* Next */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-[#FFFBF5] hover:text-ocre transition-colors"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Suivant"
      >
        <ChevronRight size={40} />
      </button>
    </motion.div>
  );
}

/* ================================================================== */
/*  MAIN PAGE COMPONENT                                                */
/* ================================================================== */

export default function Galerie() {
  const [activeFilter, setActiveFilter] = useState<Category>('Tous');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  /* ---- filtered images ---- */
  const filteredImages =
    activeFilter === 'Tous'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeFilter);

  /* ---- lightbox helpers ---- */
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i === 0 ? filteredImages.length - 1 : i - 1));
  }, [filteredImages.length]);
  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i === filteredImages.length - 1 ? 0 : i + 1));
  }, [filteredImages.length]);

  /* ---- GSAP scroll animations ---- */
  useGSAP(() => {
    /* Hero */
    if (heroRef.current) {
      const heroImg = heroRef.current.querySelector('.hero-bg');
      const heroSurtitre = heroRef.current.querySelector('.hero-surtitre');
      const heroTitre = heroRef.current.querySelector('.hero-titre');
      const heroSous = heroRef.current.querySelector('.hero-sous');

      const tl = gsap.timeline();
      tl.fromTo(heroImg, { opacity: 0 }, { opacity: 1, duration: 0.75, ease: 'power2.out' })
        .fromTo(heroSurtitre, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.25')
        .fromTo(heroTitre, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.2')
        .fromTo(heroSous, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');
    }

    /* Filters */
    if (filtersRef.current) {
      gsap.fromTo(
        filtersRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: filtersRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        }
      );
    }

    /* Grid images */
    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll('.grid-item');
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out',
            delay: i * 0.08,
            scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
      });
    }

    /* Video section */
    if (videoRef.current) {
      const header = videoRef.current.querySelector('.video-header');
      const player = videoRef.current.querySelector('.video-player');
      gsap.fromTo(
        header,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: header, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );
      gsap.fromTo(
        player,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: player, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
    }

    /* Testimonials */
    if (testimonialsRef.current) {
      const header = testimonialsRef.current.querySelector('.testimonials-header');
      const cards = testimonialsRef.current.querySelectorAll('.testimonial-card');
      gsap.fromTo(
        header,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: header, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: i * 0.15,
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      });
    }

    /* CTA section */
    if (ctaRef.current) {
      const bg = ctaRef.current.querySelector('.cta-bg');
      const titre = ctaRef.current.querySelector('.cta-titre');
      const sous = ctaRef.current.querySelector('.cta-sous');
      const btn = ctaRef.current.querySelector('.cta-btn');

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ctaRef.current, start: 'top 70%', toggleActions: 'play none none none' },
      });
      tl.fromTo(bg, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' })
        .fromTo(titre, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
        .fromTo(sous, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5')
        .fromTo(btn, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4');
    }

    /* Cleanup */
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  /* ---- render ---- */
  return (
    <div style={{ backgroundColor: '#FFFBF5' }}>
      {/* ============================================================ */}
      {/* SECTION 1 — HERO                                             */}
      {/* ============================================================ */}
      <section
        ref={heroRef}
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ height: '60vh' }}
      >
        <div
          className="hero-bg absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/hero-gallery.jpg)' }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(28,25,23,0.5)' }} />

        <div className="relative z-10 text-center px-4">
          <p
            className="hero-surtitre font-body text-xs font-semibold uppercase tracking-[2px] mb-4"
            style={{ color: '#D4A853' }}
          >
            Le restaurant
          </p>
          <h1
            className="hero-titre font-display text-5xl md:text-7xl font-medium"
            style={{ color: '#FFFBF5', textShadow: '0 4px 30px rgba(0,0,0,0.4)' }}
          >
            Galerie
          </h1>
          <p className="hero-sous font-body text-lg mt-4 max-w-xl mx-auto" style={{ color: '#FFFBF5' }}>
            Des images qui parlent de moments partag\u00e9s
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — FILTERS (sticky)                                 */}
      {/* ============================================================ */}
      <div
        ref={filtersRef}
        className="sticky top-0 z-40 w-full"
        style={{
          backgroundColor: 'rgba(255,251,245,0.9)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderBottom: '1px solid #1C19174D',
        }}
      >
        <div className="max-w-container mx-auto px-4 md:px-6 lg:px-12 py-4">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="relative font-body text-sm font-medium transition-colors duration-300 pb-1"
                style={{
                  color: activeFilter === cat ? '#3B2314' : '#8B6B4E',
                }}
              >
                {cat}
                {activeFilter === cat && (
                  <motion.span
                    layoutId="activeFilter"
                    className="absolute -bottom-0 left-0 right-0 h-[2px]"
                    style={{ backgroundColor: '#D4A853' }}
                    transition={{ duration: 0.3, ease: smoothEase }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 3 — MASONRY GRID                                     */}
      {/* ============================================================ */}
      <section className="py-16 md:py-20">
        <div className="max-w-container mx-auto px-4 md:px-6 lg:px-12">
          <motion.div
            ref={gridRef}
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img, i) => (
                <motion.div
                  key={img.src + img.category}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: smoothEase }}
                  className="grid-item break-inside-avoid mb-4 group cursor-pointer overflow-hidden"
                  onClick={() => openLightbox(i)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.category}
                      className="w-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                      style={{ aspectRatio: img.aspect === 'portrait' ? '3/4' : '4/3' }}
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms]"
                      style={{ backgroundColor: 'rgba(59,35,20,0.3)' }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={filteredImages}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* SECTION 4 — VIDEO / AMBIANCE                                 */}
      {/* ============================================================ */}
      <section
        ref={videoRef}
        className="py-20 md:py-32"
        style={{ backgroundColor: '#1C1917' }}
      >
        <div className="max-w-container mx-auto px-4 md:px-6 lg:px-12">
          <div className="video-header text-center mb-12">
            <p
              className="font-body text-xs font-semibold uppercase tracking-[2px] mb-4"
              style={{ color: '#D4A853' }}
            >
              L&apos;ambiance
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-normal" style={{ color: '#FFFBF5' }}>
              Une soir\u00e9e au Baobab & Graines
            </h2>
          </div>

          <div className="video-player max-w-[900px] mx-auto" style={{ border: '1px solid #FFFBF51A' }}>
            <div className="relative" style={{ paddingTop: '56.25%' }}>
              <video
                className="absolute inset-0 w-full h-full object-cover"
                poster="/gallery-6.jpg"
                controls
                preload="none"
              >
                <source src="" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture vid\u00e9o.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — T\u00c9MOIGNAGES VISUELS                               */}
      {/* ============================================================ */}
      <section
        ref={testimonialsRef}
        className="py-20 md:py-32"
        style={{ backgroundColor: '#FFFBF5' }}
      >
        <div className="max-w-container mx-auto px-4 md:px-6 lg:px-12">
          <div className="testimonials-header text-center mb-16">
            <p
              className="font-body text-xs font-semibold uppercase tracking-[2px] mb-4"
              style={{ color: '#D4A853' }}
            >
              Ils en parlent
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-normal" style={{ color: '#1C1917' }}>
              Ce que nos clients disent
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="testimonial-card"
                style={{ border: '1px solid #1C19174D' }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <p
                    className="font-display italic text-lg mb-4 leading-relaxed"
                    style={{ color: '#1C1917' }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="font-body text-sm font-semibold" style={{ color: '#3B2314' }}>
                    {t.name}
                  </p>
                  <p className="font-body text-[13px] mt-1" style={{ color: '#8B6B4E' }}>
                    {t.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6 — CTA \u00c9V\u00c9NEMENTS                                     */}
      {/* ============================================================ */}
      <section
        ref={ctaRef}
        className="relative py-20 md:py-32 overflow-hidden"
      >
        <div
          className="cta-bg absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/gallery-5.jpg)' }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(28,25,23,0.6)' }} />

        <div className="relative z-10 max-w-container mx-auto px-4 md:px-6 lg:px-12 text-center">
          <h2
            className="cta-titre font-display text-4xl md:text-6xl font-medium"
            style={{ color: '#FFFBF5', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
          >
            Organisez votre \u00e9v\u00e9nement
          </h2>
          <p
            className="cta-sous font-body text-lg mt-4 max-w-[560px] mx-auto"
            style={{ color: '#FFFBF5' }}
          >
            D\u00eeners priv\u00e9s, anniversaires, soir\u00e9es d&apos;entreprise &mdash; nous cr\u00e9ons des exp\u00e9riences sur mesure pour vos moments importants.
          </p>
          <Link
            to="/contact"
            className="cta-btn inline-flex items-center gap-2 mt-10 px-8 py-4 font-body text-sm font-medium transition-all duration-[400ms] ease-btn"
            style={{
              background: 'linear-gradient(180deg, #D4A853 0%, #D4601A 100%)',
              color: '#FFFBF5',
              border: '1px solid transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#3B2314';
              e.currentTarget.style.borderColor = '#3B2314';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(180deg, #D4A853 0%, #D4601A 100%)';
              e.currentTarget.style.color = '#FFFBF5';
              e.currentTarget.style.borderColor = 'transparent';
            }}
          >
            Nous contacter
            <ChevronRightIcon size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}

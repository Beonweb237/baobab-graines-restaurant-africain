import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Heart, Star, Users, Instagram, Mail, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const valeurs = [
  {
    icon: Heart,
    title: 'Authenticité',
    description:
      'Nous honorons les recettes traditionnelles transmises de génération en génération. Chaque plat est préparé avec le respect des méthodes ancestrales, utilisant des épices authentiques importées directement d\'Afrique.',
  },
  {
    icon: Star,
    title: 'Excellence',
    description:
      'Des produits frais et locaux, sélectionnés avec soin. Nous travaillons avec des producteurs français passionnés pour sublimer les saveurs africaines avec la meilleure qualité.',
  },
  {
    icon: Users,
    title: 'Partage',
    description:
      'La cuisine africaine est conviviale par essence. Notre restaurant est un lieu de rencontre, d\'échange et de célébration. Chaque repas est un moment de communion.',
  },
];

const equipe = [
  {
    nom: 'Amadou Diallo',
    role: 'Chef & Fondateur',
    image: '/equipe-1.jpg',
  },
  {
    nom: 'Fatou Ndiaye',
    role: 'Sommelière',
    image: '/equipe-2.jpg',
  },
  {
    nom: 'Ibrahim Sow',
    role: 'Responsable de salle',
    image: '/equipe-3.jpg',
  },
];

const restaurantImages = [
  { src: '/restaurant-1.jpg', alt: 'Salle principale du restaurant avec tables dressées et nattes africaines' },
  { src: '/restaurant-2.jpg', alt: 'Table dressée avec vaisselle artisanale africaine et serviettes en tissu wax' },
  { src: '/restaurant-3.jpg', alt: 'Terrasse extérieure avec plantes tropicales et lanternes' },
  { src: '/restaurant-4.jpg', alt: 'Bar du restaurant avec étagères de bouteilles et tabourets en bois sculpté' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function NotreHistoire() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      /* ---- Hero animations (auto-play on load) ---- */
      const heroTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      heroTl
        .fromTo(
          '.hero-bg',
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 0.75 }
        )
        .fromTo(
          '.hero-surtitre',
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          '-=0.25'
        )
        .fromTo(
          '.hero-titre',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.2'
        )
        .fromTo(
          '.hero-sous-titre',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        );

      /* ---- Section 2: Notre Histoire ---- */
      gsap.fromTo(
        '.histoire-surtitre, .histoire-titre, .histoire-paragraphe',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.histoire-section',
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.histoire-image',
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.histoire-section',
            start: 'top 80%',
            once: true,
          },
        }
      );

      /* ---- Section 3: Le Chef ---- */
      gsap.fromTo(
        '.chef-image',
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.chef-section',
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.chef-texte-element',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.chef-section',
            start: 'top 75%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.chef-citation',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.chef-citation',
            start: 'top 85%',
            once: true,
          },
        }
      );

      /* ---- Section 4: Valeurs ---- */
      gsap.fromTo(
        '.valeurs-header-surtitre',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.valeurs-section',
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.valeurs-header-titre',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.15,
          scrollTrigger: {
            trigger: '.valeurs-section',
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.valeur-carte',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.valeurs-grid',
            start: 'top 80%',
            once: true,
          },
        }
      );

      /* ---- Section 5: Équipe ---- */
      gsap.fromTo(
        '.equipe-header-surtitre, .equipe-header-titre',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.equipe-section',
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.equipe-carte',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.equipe-grid',
            start: 'top 80%',
            once: true,
          },
        }
      );

      /* ---- Section 6: Restaurant Gallery ---- */
      gsap.fromTo(
        '.restaurant-header-surtitre, .restaurant-header-titre',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.restaurant-section',
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.restaurant-image',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.restaurant-grid',
            start: 'top 80%',
            once: true,
          },
        }
      );

      /* ---- Section 7: CTA ---- */
      gsap.fromTo(
        '.cta-titre',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.cta-sous-titre',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.15,
          scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.cta-bouton',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 80%',
            once: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      {/* ============================================================ */}
      {/* SECTION 1 — HERO                                              */}
      {/* ============================================================ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: '70vh', minHeight: '500px' }}
      >
        {/* Background image */}
        <div
          className="hero-bg absolute inset-0 w-full h-full"
          style={{ opacity: 0 }}
        >
          <img
            src="/hero-story.jpg"
            alt="Intérieur chaleureux du restaurant Baobab & Graines"
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 50%' }}
          />
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(28,25,23,0.5)' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <span
            className="hero-surtitre font-body text-xs font-semibold uppercase"
            style={{
              color: '#D4A853',
              letterSpacing: '2px',
              opacity: 0,
            }}
          >
            À propos de nous
          </span>

          <h1
            className="hero-titre font-display font-medium mt-4"
            style={{
              color: '#FFFBF5',
              fontSize: 'clamp(36px, 5vw, 72px)',
              lineHeight: 1.1,
              textShadow: '0 4px 30px rgba(0,0,0,0.4)',
              opacity: 0,
            }}
          >
            Notre Histoire
          </h1>

          <p
            className="hero-sous-titre font-body mt-4"
            style={{
              color: '#FFFBF5',
              fontSize: '18px',
              fontWeight: 400,
              opacity: 0,
            }}
          >
            De Dakar à Paris, une histoire de passion et de saveurs
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — NOTRE HISTOIRE                                    */}
      {/* ============================================================ */}
      <section
        className="histoire-section"
        style={{ backgroundColor: '#FFFBF5', padding: 'clamp(80px, 10vw, 128px) 0' }}
      >
        <div className="max-w-container mx-auto px-4 md:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            {/* Text column (60%) */}
            <div className="w-full lg:w-[60%]">
              <span
                className="histoire-surtitre font-body text-xs font-semibold uppercase inline-block"
                style={{
                  color: '#D4A853',
                  letterSpacing: '2px',
                  marginBottom: '16px',
                }}
              >
                Notre parcours
              </span>

              <h2
                className="histoire-titre font-display"
                style={{
                  color: '#1C1917',
                  fontSize: 'clamp(32px, 3.5vw, 40px)',
                  fontWeight: 400,
                  letterSpacing: '-1px',
                  lineHeight: 1.2,
                  marginBottom: '32px',
                }}
              >
                De la terre africaine à votre assiette
              </h2>

              <div className="space-y-6">
                <p
                  className="histoire-paragraphe font-body"
                  style={{
                    color: '#8B6B4E',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: 1.8,
                  }}
                >
                  L'histoire de Baobab & Graines commence en 2018, lorsque notre chef fondateur Amadou Diallo décide de partager les saveurs de son enfance avec Paris. Né à Dakar, au cœur d'une famille où la cuisine est un langage d'amour, Amadou a grandi aux côtés de sa grand-mère, apprenant les secrets des épices, des marinades et des cuissons lentes.
                </p>

                <p
                  className="histoire-paragraphe font-body"
                  style={{
                    color: '#8B6B4E',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: 1.8,
                  }}
                >
                  Après des années passées dans les plus grandes maisons de la gastronomie française, il ressent le besoin de revenir à ses racines. Baobab & Graines naît de cette envie : créer un lieu où la haute cuisine rencontre l'âme africaine. Chaque plat est une histoire, chaque épice un souvenir, chaque repas un voyage.
                </p>

                <p
                  className="histoire-paragraphe font-body"
                  style={{
                    color: '#8B6B4E',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: 1.8,
                  }}
                >
                  Aujourd'hui, notre restaurant est devenu une référence de la cuisine africaine contemporaine à Paris, récompensé par de nombreux prix et surtout, adoré par nos clients qui reviennent pour cette expérience unique.
                </p>
              </div>
            </div>

            {/* Image column (40%) */}
            <div className="w-full lg:w-[40%]">
              <div className="histoire-image overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <img
                  src="/savoir-faire.jpg"
                  alt="Chef africain en train de préparer un plat traditionnel"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '50% 50%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — LE CHEF                                           */}
      {/* ============================================================ */}
      <section
        className="chef-section"
        style={{ backgroundColor: '#F5EFE6', padding: 'clamp(80px, 10vw, 128px) 0' }}
      >
        <div className="max-w-container mx-auto px-4 md:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            {/* Image column (40%) */}
            <div className="w-full lg:w-[40%]">
              <div className="chef-image overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <img
                  src="/chef.jpg"
                  alt="Portrait du Chef Amadou Diallo"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '50% 50%' }}
                />
              </div>
            </div>

            {/* Text column (60%) */}
            <div className="w-full lg:w-[60%]">
              <span
                className="chef-texte-element font-body text-xs font-semibold uppercase inline-block"
                style={{
                  color: '#D4A853',
                  letterSpacing: '2px',
                  marginBottom: '16px',
                }}
              >
                Le Chef
              </span>

              <h2
                className="chef-texte-element font-display"
                style={{
                  color: '#1C1917',
                  fontSize: 'clamp(36px, 4vw, 48px)',
                  fontWeight: 500,
                  letterSpacing: '-1px',
                  lineHeight: 1.2,
                  marginBottom: '8px',
                }}
              >
                Amadou Diallo
              </h2>

              <p
                className="chef-texte-element font-body italic"
                style={{
                  color: '#8B6B4E',
                  fontSize: '16px',
                  fontWeight: 400,
                  marginBottom: '24px',
                }}
              >
                Chef & Fondateur
              </p>

              <div className="space-y-4">
                <p
                  className="chef-texte-element font-body"
                  style={{
                    color: '#8B6B4E',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: 1.8,
                  }}
                >
                  Formé aux côtés des plus grands chefs français, Amadou a choisi de célébrer ses racines sénégalaises à travers une cuisine qui respecte les traditions tout en osant la modernité. Sa philosophie est simple : utiliser les meilleurs produits français pour sublimer les recettes africaines. Il travaille directement avec des producteurs et des artisans, sélectionnant chaque ingrédient avec une exigence passionnée.
                </p>

                <p
                  className="chef-texte-element font-body"
                  style={{
                    color: '#8B6B4E',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: 1.8,
                  }}
                >
                  Amadou croit profondément que la cuisine africaine mérite sa place dans la gastronomie mondiale. Chaque plat qu'il crée est une lettre d'amour au continent africain.
                </p>
              </div>

              {/* Quote */}
              <blockquote
                className="chef-citation"
                style={{
                  borderLeft: '3px solid #D4A853',
                  paddingLeft: '24px',
                  marginTop: '32px',
                }}
              >
                <p
                  className="font-display italic"
                  style={{
                    color: '#3B2314',
                    fontSize: 'clamp(20px, 2.5vw, 24px)',
                    fontWeight: 400,
                    lineHeight: 1.4,
                  }}
                >
                  "La cuisine est le plus ancien langage universel. Elle parle de terroir, de mémoire et de partage."
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — NOS VALEURS                                       */}
      {/* ============================================================ */}
      <section
        className="valeurs-section"
        style={{ backgroundColor: '#FFFBF5', padding: 'clamp(80px, 10vw, 128px) 0' }}
      >
        <div className="max-w-container mx-auto px-4 md:px-6 lg:px-12">
          {/* Header */}
          <div className="text-center" style={{ marginBottom: '64px' }}>
            <span
              className="valeurs-header-surtitre font-body text-xs font-semibold uppercase inline-block"
              style={{
                color: '#D4A853',
                letterSpacing: '2px',
                marginBottom: '16px',
              }}
            >
              Nos valeurs
            </span>
            <h2
              className="valeurs-header-titre font-display"
              style={{
                color: '#1C1917',
                fontSize: 'clamp(32px, 3.5vw, 40px)',
                fontWeight: 400,
                letterSpacing: '-1px',
                lineHeight: 1.2,
              }}
            >
              Ce qui nous définit
            </h2>
          </div>

          {/* Values grid */}
          <div className="valeurs-grid grid grid-cols-1 md:grid-cols-3 gap-12">
            {valeurs.map((valeur) => {
              const Icon = valeur.icon;
              return (
                <div key={valeur.title} className="valeur-carte text-center">
                  {/* Icon circle */}
                  <div
                    className="mx-auto flex items-center justify-center rounded-full"
                    style={{
                      width: '64px',
                      height: '64px',
                      backgroundColor: '#F5EFE6',
                    }}
                  >
                    <Icon size={28} style={{ color: '#D4A853' }} />
                  </div>

                  <h3
                    className="font-display mt-6"
                    style={{
                      color: '#1C1917',
                      fontSize: '24px',
                      fontWeight: 500,
                    }}
                  >
                    {valeur.title}
                  </h3>

                  <p
                    className="font-body mt-3"
                    style={{
                      color: '#8B6B4E',
                      fontSize: '15px',
                      fontWeight: 400,
                      lineHeight: 1.7,
                    }}
                  >
                    {valeur.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — L'ÉQUIPE                                          */}
      {/* ============================================================ */}
      <section
        className="equipe-section"
        style={{
          backgroundColor: '#1C1917',
          padding: 'clamp(80px, 10vw, 128px) 0',
        }}
      >
        <div className="max-w-container mx-auto px-4 md:px-6 lg:px-12">
          {/* Header */}
          <div className="text-center" style={{ marginBottom: '64px' }}>
            <span
              className="equipe-header-surtitre font-body text-xs font-semibold uppercase inline-block"
              style={{
                color: '#D4A853',
                letterSpacing: '2px',
                marginBottom: '16px',
              }}
            >
              L'équipe
            </span>
            <h2
              className="equipe-header-titre font-display"
              style={{
                color: '#FFFBF5',
                fontSize: 'clamp(32px, 3.5vw, 40px)',
                fontWeight: 400,
                letterSpacing: '-1px',
                lineHeight: 1.2,
              }}
            >
              Les visages de Baobab & Graines
            </h2>
          </div>

          {/* Team grid */}
          <div className="equipe-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            {equipe.map((membre) => (
              <div key={membre.nom} className="equipe-carte group relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                {/* Image */}
                <img
                  src={membre.image}
                  alt={`Portrait de ${membre.nom}, ${membre.role}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: '50% 50%' }}
                />

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-end pb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms] ease-out"
                  style={{
                    background: 'linear-gradient(to top, rgba(59,35,20,0.8) 0%, rgba(59,35,20,0.2) 50%, transparent 100%)',
                  }}
                >
                  <h3
                    className="font-display"
                    style={{
                      color: '#FFFBF5',
                      fontSize: '20px',
                      fontWeight: 500,
                    }}
                  >
                    {membre.nom}
                  </h3>
                  <p
                    className="font-body mt-1"
                    style={{
                      color: '#D4A853',
                      fontSize: '14px',
                      fontWeight: 400,
                    }}
                  >
                    {membre.role}
                  </p>

                  {/* Social icons */}
                  <div className="flex items-center gap-4 mt-4">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-300 hover:text-ocre"
                      style={{ color: '#FFFBF5' }}
                      aria-label={`Instagram de ${membre.nom}`}
                    >
                      <Instagram size={20} />
                    </a>
                    <a
                      href="mailto:contact@baobabgraines.fr"
                      className="transition-colors duration-300 hover:text-ocre"
                      style={{ color: '#FFFBF5' }}
                      aria-label={`Email de ${membre.nom}`}
                    >
                      <Mail size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6 — LE RESTAURANT (Galerie)                           */}
      {/* ============================================================ */}
      <section
        className="restaurant-section"
        style={{ backgroundColor: '#FFFBF5', padding: 'clamp(80px, 10vw, 128px) 0' }}
      >
        <div className="max-w-container mx-auto px-4 md:px-6 lg:px-12">
          {/* Header */}
          <div className="text-center" style={{ marginBottom: '64px' }}>
            <span
              className="restaurant-header-surtitre font-body text-xs font-semibold uppercase inline-block"
              style={{
                color: '#D4A853',
                letterSpacing: '2px',
                marginBottom: '16px',
              }}
            >
              Le lieu
            </span>
            <h2
              className="restaurant-header-titre font-display"
              style={{
                color: '#1C1917',
                fontSize: 'clamp(32px, 3.5vw, 40px)',
                fontWeight: 400,
                letterSpacing: '-1px',
                lineHeight: 1.2,
              }}
            >
              Un cadre chaleureux et authentique
            </h2>
          </div>

          {/* Gallery grid */}
          <div className="restaurant-grid grid grid-cols-1 md:grid-cols-2 gap-4">
            {restaurantImages.map((img, i) => (
              <div key={i} className="restaurant-image overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  style={{ objectPosition: '50% 50%' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 7 — CTA                                               */}
      {/* ============================================================ */}
      <section
        className="cta-section"
        style={{ backgroundColor: '#F5EFE6', padding: 'clamp(48px, 6vw, 80px) 0' }}
      >
        <div className="max-w-container mx-auto px-4 md:px-6 lg:px-12 text-center">
          <h2
            className="cta-titre font-display"
            style={{
              color: '#1C1917',
              fontSize: 'clamp(32px, 3.5vw, 40px)',
              fontWeight: 400,
              letterSpacing: '-1px',
              lineHeight: 1.2,
            }}
          >
            Venez nous rencontrer
          </h2>

          <p
            className="cta-sous-titre font-body mx-auto"
            style={{
              color: '#8B6B4E',
              fontSize: '16px',
              fontWeight: 400,
              marginTop: '16px',
              maxWidth: '480px',
            }}
          >
            Réservez votre table et laissez-vous transporter par les saveurs de l'Afrique.
          </p>

          <div className="cta-bouton mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 font-body text-sm font-medium transition-all duration-[400ms] ease-btn"
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
              Réserver une table
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

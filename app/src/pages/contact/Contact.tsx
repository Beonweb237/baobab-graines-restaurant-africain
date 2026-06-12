import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Clock,
  MapPin,
  Phone,
  Calendar,
  Instagram,
  Facebook,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  FAQ DATA                                                           */
/* ------------------------------------------------------------------ */

const FAQ_ITEMS = [
  {
    q: 'Comment r\u00e9server une table ?',
    a: "Vous pouvez r\u00e9server directement via le formulaire sur cette page, ou nous appeler au +33 1 42 00 00 00. Nous vous recommandons de r\u00e9server au moins 48h \u00e0 l'avance, surtout pour le week-end.",
  },
  {
    q: 'Proposez-vous des options v\u00e9g\u00e9tariennes ?',
    a: "Oui, plusieurs de nos plats peuvent \u00eatre adapt\u00e9s en version v\u00e9g\u00e9tarienne. Notre couscous aux l\u00e9gumes et notre thieboudienne v\u00e9g\u00e9tale sont des succ\u00e8s. Indiquez-nous vos pr\u00e9f\u00e9rences lors de la r\u00e9servation.",
  },
  {
    q: 'Acceptez-vous les groupes ?',
    a: "Nous accueillons les groupes jusqu'\u00e0 20 personnes. Pour les groupes de plus de 8 personnes, nous proposons des menus de groupe sur mesure. Contactez-nous pour organiser votre \u00e9v\u00e9nement.",
  },
  {
    q: "Y a-t-il une tenue vestimentaire exig\u00e9e ?",
    a: "Nous vous invitons \u00e0 une tenue \u00e9l\u00e9gante et d\u00e9contract\u00e9e. L'ambiance est chaleureuse et conviviale, pas besoin d'\u00eatre en tenue de soir\u00e9e !",
  },
  {
    q: 'Proposez-vous des menus enfant ?',
    a: "Oui, nous avons un menu enfant avec des portions adapt\u00e9es et des saveurs douces. Nos petits clients adorent nos alloco et notre poulet yassa doux.",
  },
  {
    q: 'Puis-je offrir un bon cadeau ?',
    a: "Oui, nous proposons des bons cadeaux d'une valeur au choix. Contactez-nous par t\u00e9l\u00e9phone ou email pour commander le v\u00f4tre.",
  },
];

const TIME_OPTIONS = [
  '12h00', '12h30', '13h00', '13h30', '14h00',
  '19h00', '19h30', '20h00', '20h30', '21h00', '21h30', '22h00',
];

const GUEST_OPTIONS = ['1', '2', '3', '4', '5', '6', '7', '8+'];

/* ------------------------------------------------------------------ */
/*  HELPER: smooth ease                                               */
/* ------------------------------------------------------------------ */
const smoothEase = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ================================================================== */
/*  ACCORDION ITEM (Framer Motion)                                     */
/* ================================================================== */

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="accordion-item"
      style={{ border: '1px solid #1C19174D', marginBottom: '12px' }}
    >
      <button
        className="w-full flex items-center justify-between p-5 md:px-6 text-left cursor-pointer"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="font-display text-lg font-medium pr-4" style={{ color: '#1C1917' }}>
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: smoothEase }}
          className="flex-shrink-0"
          style={{ color: '#8B6B4E' }}
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: smoothEase }}
            className="overflow-hidden"
          >
            <div
              className="px-5 md:px-6 pb-5 font-body text-[15px] leading-[1.7]"
              style={{ color: '#8B6B4E' }}
            >
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================================================================== */
/*  MAIN PAGE COMPONENT                                                */
/* ================================================================== */

export default function Contact() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    date: '',
    heure: '',
    guests: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);

  /* ---- form handlers ---- */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.nom.trim()) errors.nom = 'Le nom est requis';
    if (!formData.email.trim()) {
      errors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Format d'email invalide";
    }
    if (!formData.telephone.trim()) errors.telephone = 'Le t\u00e9l\u00e9phone est requis';
    if (!formData.date) errors.date = 'La date est requise';
    if (!formData.heure) errors.heure = "L'heure est requise";
    if (!formData.guests) errors.guests = 'Le nombre de personnes est requis';
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormSubmitted(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setNewsletterSubmitted(true);
      setNewsletterEmail('');
    }
  };

  const toggleFaq = useCallback((index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  }, []);

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

    /* Form section */
    if (formRef.current) {
      const surtitre = formRef.current.querySelector('.form-surtitre');
      const titre = formRef.current.querySelector('.form-titre');
      const fields = formRef.current.querySelectorAll('.form-field');
      const btn = formRef.current.querySelector('.form-btn');

      gsap.fromTo(surtitre, { opacity: 0 }, {
        opacity: 1, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
      gsap.fromTo(titre, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
      fields.forEach((field, i) => {
        gsap.fromTo(field, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.5, delay: i * 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 75%', toggleActions: 'play none none none' },
        });
      });
      gsap.fromTo(btn, { opacity: 0 }, {
        opacity: 1, duration: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: btn, start: 'top 95%', toggleActions: 'play none none none' },
      });

      /* Info blocks */
      const infoBlocks = formRef.current.querySelectorAll('.info-block');
      infoBlocks.forEach((block, i) => {
        gsap.fromTo(block, { opacity: 0, x: 40 }, {
          opacity: 1, x: 0, duration: 0.7, delay: i * 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: block, start: 'top 85%', toggleActions: 'play none none none' },
        });
      });
    }

    /* Map */
    if (mapRef.current) {
      gsap.fromTo(
        mapRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: mapRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        }
      );
    }

    /* FAQ */
    if (faqRef.current) {
      const header = faqRef.current.querySelector('.faq-header');
      const items = faqRef.current.querySelectorAll('.accordion-item');
      gsap.fromTo(header, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: header, start: 'top 80%', toggleActions: 'play none none none' },
      });
      items.forEach((item, i) => {
        gsap.fromTo(item, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none none' },
        });
      });
    }

    /* Newsletter */
    if (newsletterRef.current) {
      const titre = newsletterRef.current.querySelector('.newsletter-titre');
      const desc = newsletterRef.current.querySelector('.newsletter-desc');
      const form = newsletterRef.current.querySelector('.newsletter-form');

      gsap.fromTo(titre, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: newsletterRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
      gsap.fromTo(desc, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, delay: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: newsletterRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
      gsap.fromTo(form, { opacity: 0 }, {
        opacity: 1, duration: 0.5, delay: 0.2, ease: 'power2.out',
        scrollTrigger: { trigger: newsletterRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  /* ---- input style helpers ---- */
  const inputBaseStyle: React.CSSProperties = {
    border: '1px solid #1C19174D',
    padding: '16px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '15px',
    color: '#1C1917',
    backgroundColor: 'transparent',
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.3s ease',
    borderRadius: 0,
  };

  const getInputStyle = (fieldName: string): React.CSSProperties => ({
    ...inputBaseStyle,
    borderColor: formErrors[fieldName] ? '#A63C3C' : '#1C19174D',
  });

  const labelStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '13px',
    fontWeight: 500,
    color: '#1C1917',
    marginBottom: '8px',
    display: 'block',
  };

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
          style={{ backgroundImage: 'url(/hero-contact.jpg)' }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(28,25,23,0.5)' }} />

        <div className="relative z-10 text-center px-4">
          <p
            className="hero-surtitre font-body text-xs font-semibold uppercase tracking-[2px] mb-4"
            style={{ color: '#D4A853' }}
          >
            Contact
          </p>
          <h1
            className="hero-titre font-display text-5xl md:text-7xl font-medium"
            style={{ color: '#FFFBF5', textShadow: '0 4px 30px rgba(0,0,0,0.4)' }}
          >
            R\u00e9servez votre table
          </h1>
          <p className="hero-sous font-body text-lg mt-4 max-w-xl mx-auto" style={{ color: '#FFFBF5' }}>
            Une question ? Une envie ? \u00c9crivez-nous, nous vous r\u00e9pondrons avec plaisir.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — FORMULAIRE & INFORMATIONS                        */}
      {/* ============================================================ */}
      <section ref={formRef} className="py-20 md:py-32">
        <div className="max-w-container mx-auto px-4 md:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
            {/* ---- COLONNE GAUCHE: FORMULAIRE ---- */}
            <div className="flex-1 lg:max-w-[55%]">
              <p
                className="form-surtitre font-body text-xs font-semibold uppercase tracking-[2px] mb-3"
                style={{ color: '#D4A853' }}
              >
                R\u00e9servation
              </p>
              <h2
                className="form-titre font-display text-2xl md:text-3xl font-normal mb-12"
                style={{ color: '#1C1917' }}
              >
                R\u00e9servez en ligne
              </h2>

              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: smoothEase }}
                  className="p-4"
                  style={{
                    backgroundColor: '#4A5D231A',
                    border: '1px solid #4A5D23',
                    color: '#4A5D23',
                  }}
                >
                  <p className="font-body text-[15px]">
                    Merci pour votre r\u00e9servation ! Nous vous confirmerons dans les plus brefs d\u00e9lais.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Nom */}
                  <div className="form-field">
                    <label style={labelStyle}>Nom complet *</label>
                    <input
                      type="text"
                      name="nom"
                      placeholder="Votre nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      style={getInputStyle('nom')}
                      onFocus={(e) => { if (!formErrors.nom) e.currentTarget.style.borderColor = '#3B2314'; }}
                      onBlur={(e) => { if (!formErrors.nom) e.currentTarget.style.borderColor = '#1C19174D'; }}
                    />
                    {formErrors.nom && (
                      <p className="font-body text-[13px] mt-1" style={{ color: '#A63C3C' }}>{formErrors.nom}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="form-field">
                    <label style={labelStyle}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      style={getInputStyle('email')}
                      onFocus={(e) => { if (!formErrors.email) e.currentTarget.style.borderColor = '#3B2314'; }}
                      onBlur={(e) => { if (!formErrors.email) e.currentTarget.style.borderColor = '#1C19174D'; }}
                    />
                    {formErrors.email && (
                      <p className="font-body text-[13px] mt-1" style={{ color: '#A63C3C' }}>{formErrors.email}</p>
                    )}
                  </div>

                  {/* T\u00e9l\u00e9phone */}
                  <div className="form-field">
                    <label style={labelStyle}>T\u00e9l\u00e9phone *</label>
                    <input
                      type="tel"
                      name="telephone"
                      placeholder="+33 6 00 00 00 00"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      style={getInputStyle('telephone')}
                      onFocus={(e) => { if (!formErrors.telephone) e.currentTarget.style.borderColor = '#3B2314'; }}
                      onBlur={(e) => { if (!formErrors.telephone) e.currentTarget.style.borderColor = '#1C19174D'; }}
                    />
                    {formErrors.telephone && (
                      <p className="font-body text-[13px] mt-1" style={{ color: '#A63C3C' }}>{formErrors.telephone}</p>
                    )}
                  </div>

                  {/* Date + Heure row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="form-field">
                      <label style={labelStyle}>Date de r\u00e9servation *</label>
                      <input
                        type="date"
                        name="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={handleInputChange}
                        style={getInputStyle('date')}
                        onFocus={(e) => { if (!formErrors.date) e.currentTarget.style.borderColor = '#3B2314'; }}
                        onBlur={(e) => { if (!formErrors.date) e.currentTarget.style.borderColor = '#1C19174D'; }}
                      />
                      {formErrors.date && (
                        <p className="font-body text-[13px] mt-1" style={{ color: '#A63C3C' }}>{formErrors.date}</p>
                      )}
                    </div>

                    <div className="form-field">
                      <label style={labelStyle}>Heure *</label>
                      <select
                        name="heure"
                        value={formData.heure}
                        onChange={handleInputChange}
                        style={getInputStyle('heure')}
                        onFocus={(e) => { if (!formErrors.heure) e.currentTarget.style.borderColor = '#3B2314'; }}
                        onBlur={(e) => { if (!formErrors.heure) e.currentTarget.style.borderColor = '#1C19174D'; }}
                      >
                        <option value="">S\u00e9lectionner</option>
                        {TIME_OPTIONS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      {formErrors.heure && (
                        <p className="font-body text-[13px] mt-1" style={{ color: '#A63C3C' }}>{formErrors.heure}</p>
                      )}
                    </div>
                  </div>

                  {/* Nombre de personnes */}
                  <div className="form-field">
                    <label style={labelStyle}>Nombre de personnes *</label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      style={getInputStyle('guests')}
                      onFocus={(e) => { if (!formErrors.guests) e.currentTarget.style.borderColor = '#3B2314'; }}
                      onBlur={(e) => { if (!formErrors.guests) e.currentTarget.style.borderColor = '#1C19174D'; }}
                    >
                      <option value="">S\u00e9lectionner</option>
                      {GUEST_OPTIONS.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                    {formErrors.guests && (
                      <p className="font-body text-[13px] mt-1" style={{ color: '#A63C3C' }}>{formErrors.guests}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="form-field">
                    <label style={labelStyle}>Message particulier</label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Allergies, occasion sp\u00e9ciale, demandes particuli\u00e8res..."
                      value={formData.message}
                      onChange={handleInputChange}
                      style={inputBaseStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#3B2314'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = '#1C19174D'; }}
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="form-btn w-full py-4 font-body text-sm font-medium transition-all duration-[400ms] ease-btn cursor-pointer"
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
                    R\u00e9server ma table
                  </button>
                </form>
              )}
            </div>

            {/* ---- COLONNE DROITE: INFORMATIONS ---- */}
            <div className="lg:max-w-[40%] lg:pl-8">
              {/* Horaires */}
              <div className="info-block mb-12">
                <div className="flex items-start gap-4">
                  <Clock size={24} style={{ color: '#D4A853' }} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display text-xl font-medium mb-3" style={{ color: '#1C1917' }}>
                      Horaires d&apos;ouverture
                    </h3>
                    <p className="font-body text-sm font-semibold mb-1" style={{ color: '#1C1917' }}>
                      Mardi &ndash; Samedi
                    </p>
                    <p className="font-body text-sm" style={{ color: '#8B6B4E' }}>D\u00e9jeuner : 12h &ndash; 14h30</p>
                    <p className="font-body text-sm" style={{ color: '#8B6B4E' }}>D\u00eener : 19h &ndash; 22h30</p>
                    <p className="font-body text-sm font-semibold mt-3 mb-1" style={{ color: '#1C1917' }}>
                      Dimanche
                    </p>
                    <p className="font-body text-sm" style={{ color: '#8B6B4E' }}>Brunch : 12h &ndash; 15h</p>
                    <p className="font-body text-sm italic mt-3" style={{ color: '#8B6B4E' }}>
                      Lundi &mdash; Ferm\u00e9
                    </p>
                  </div>
                </div>
              </div>

              {/* Adresse */}
              <div className="info-block mb-12">
                <div className="flex items-start gap-4">
                  <MapPin size={24} style={{ color: '#D4A853' }} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display text-xl font-medium mb-3" style={{ color: '#1C1917' }}>
                      Adresse
                    </h3>
                    <p className="font-body text-[15px]" style={{ color: '#8B6B4E' }}>15 Rue des Baobabs</p>
                    <p className="font-body text-[15px]" style={{ color: '#8B6B4E' }}>75011 Paris, France</p>
                    <a
                      href="https://maps.google.com/?q=15+Rue+des+Baobabs+75011+Paris"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 font-body text-sm font-semibold group relative"
                      style={{ color: '#3B2314' }}
                    >
                      Ouvrir dans Google Maps
                      <span
                        className="absolute -bottom-0.5 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300"
                        style={{ backgroundColor: '#3B2314' }}
                      />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="info-block mb-12">
                <div className="flex items-start gap-4">
                  <Phone size={24} style={{ color: '#D4A853' }} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display text-xl font-medium mb-3" style={{ color: '#1C1917' }}>
                      Nous contacter
                    </h3>
                    <p className="font-body text-[15px]" style={{ color: '#8B6B4E' }}>+33 1 42 00 00 00</p>
                    <p className="font-body text-[15px]" style={{ color: '#8B6B4E' }}>reservation@baobabetgraines.fr</p>
                  </div>
                </div>
              </div>

              {/* \u00c9v\u00e9nements */}
              <div className="info-block mb-12">
                <div className="flex items-start gap-4">
                  <Calendar size={24} style={{ color: '#D4A853' }} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display text-xl font-medium mb-3" style={{ color: '#1C1917' }}>
                      \u00c9v\u00e9nements priv\u00e9s
                    </h3>
                    <p className="font-body text-[15px] mb-3" style={{ color: '#8B6B4E' }}>
                      Nous privatisons le restaurant pour vos d\u00eeners d&apos;entreprise, anniversaires et c\u00e9l\u00e9brations.
                      Contactez-nous pour un devis personnalis\u00e9.
                    </p>
                    <a
                      href="mailto:reservation@baobabetgraines.fr?subject=Demande de devis \u00e9v\u00e9nement priv\u00e9"
                      className="inline-block font-body text-sm font-semibold group relative"
                      style={{ color: '#3B2314' }}
                    >
                      Demander un devis
                      <span
                        className="absolute -bottom-0.5 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300"
                        style={{ backgroundColor: '#3B2314' }}
                      />
                    </a>
                  </div>
                </div>
              </div>

              {/* R\u00e9seaux sociaux */}
              <div className="info-block">
                <h3 className="font-display text-xl font-medium mb-4" style={{ color: '#1C1917' }}>
                  Suivez-nous
                </h3>
                <div className="flex items-center gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300"
                    style={{ color: '#1C1917' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#D4A853'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#1C1917'; }}
                    aria-label="Instagram"
                  >
                    <Instagram size={24} />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300"
                    style={{ color: '#1C1917' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#D4A853'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#1C1917'; }}
                    aria-label="Facebook"
                  >
                    <Facebook size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — CARTE GOOGLE MAPS                                */}
      {/* ============================================================ */}
      <section
        ref={mapRef}
        className="w-full"
        style={{ height: '450px' }}
      >
        <iframe
          title="Localisation Baobab & Graines"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.0!2d2.38!3d48.86!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUxJzM2LjAiTiAywrAyMic0OC4wIkU!5e0!3m2!1sfr!2sfr!4v1"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0.3) sepia(0.2)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — FAQ                                              */}
      {/* ============================================================ */}
      <section ref={faqRef} className="py-16 md:py-20" style={{ backgroundColor: '#F5EFE6' }}>
        <div className="max-w-small mx-auto px-4 md:px-6 lg:px-12">
          <div className="faq-header text-center mb-12">
            <p
              className="font-body text-xs font-semibold uppercase tracking-[2px] mb-4"
              style={{ color: '#D4A853' }}
            >
              FAQ
            </p>
            <h2 className="font-display text-3xl font-normal" style={{ color: '#1C1917' }}>
              Questions fr\u00e9quentes
            </h2>
          </div>

          <div>
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                question={item.q}
                answer={item.a}
                isOpen={openFaqIndex === i}
                onToggle={() => toggleFaq(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — NEWSLETTER                                       */}
      {/* ============================================================ */}
      <section
        ref={newsletterRef}
        className="py-16 md:py-20"
        style={{ backgroundColor: '#1C1917' }}
      >
        <div className="max-w-[600px] mx-auto px-4 md:px-6 text-center">
          <h2
            className="newsletter-titre font-display text-3xl font-medium"
            style={{ color: '#FFFBF5' }}
          >
            Restez inform\u00e9s
          </h2>
          <p className="newsletter-desc font-body text-[15px] mt-4" style={{ color: '#8B6B4E' }}>
            Inscrivez-vous \u00e0 notre newsletter pour recevoir nos actualit\u00e9s, nouveaut\u00e9s du menu et offres exclusives.
          </p>

          {newsletterSubmitted ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-6 font-body text-sm"
              style={{ color: '#4A5D23' }}
            >
              Merci pour votre inscription !
            </motion.p>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              className="newsletter-form mt-8 flex flex-col sm:flex-row"
            >
              <input
                type="email"
                placeholder="Votre adresse email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-1 px-4 py-4 font-body text-sm outline-none transition-colors duration-300"
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid #FFFBF533',
                  color: '#FFFBF5',
                  borderRadius: 0,
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#D4A853'; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#FFFBF533'; }}
              />
              <button
                type="submit"
                className="px-8 py-4 font-body text-sm font-semibold transition-colors duration-300 cursor-pointer"
                style={{
                  backgroundColor: '#D4A853',
                  color: '#1C1917',
                  border: 'none',
                  borderRadius: 0,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FFFBF5'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#D4A853'; }}
              >
                S&apos;inscrire
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

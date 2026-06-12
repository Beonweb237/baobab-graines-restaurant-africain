import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, MapPin, Phone, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface InfoCard {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}

const infoCards: InfoCard[] = [
  {
    icon: <Clock size={32} style={{ color: '#D4A853' }} />,
    title: "Horaires d'ouverture",
    lines: [
      'Mardi \u2013 Samedi : 12h \u2013 14h30 / 19h \u2013 22h30',
      'Dimanche : 12h \u2013 15h',
      'Lundi : Ferm\u00E9',
    ],
  },
  {
    icon: <MapPin size={32} style={{ color: '#D4A853' }} />,
    title: 'Adresse',
    lines: ['15 Rue des Baobabs', '75011 Paris, France'],
  },
  {
    icon: <Phone size={32} style={{ color: '#D4A853' }} />,
    title: 'R\u00E9servations',
    lines: ['+33 1 42 00 00 00', 'reservation@baobabetgraines.fr'],
  },
  {
    icon: <Calendar size={32} style={{ color: '#D4A853' }} />,
    title: '\u00C9v\u00E9nements priv\u00E9s',
    lines: ['Nous organisons vos d\u00Eeners priv\u00E9s', 'et \u00E9v\u00E9nements sur mesure.'],
  },
];

export default function InfoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.info-card');
      if (cards) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            once: true,
          },
        });
        triggers.push(tl.scrollTrigger!);

        tl.fromTo(cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1,
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
      style={{ backgroundColor: '#F5EFE6', padding: 'clamp(48px, 6vw, 80px) 0' }}
    >
      <div className="max-w-container mx-auto px-4 md:px-6 lg:px-12">
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {infoCards.map((card) => (
            <div
              key={card.title}
              className="info-card text-center"
              style={{ opacity: 0 }}
            >
              <div className="flex justify-center mb-4">
                {card.icon}
              </div>
              <h3
                className="font-body text-base font-semibold mb-2"
                style={{ color: '#1C1917' }}
              >
                {card.title}
              </h3>
              {card.lines.map((line, i) => (
                <p
                  key={i}
                  className="font-body text-sm"
                  style={{ color: '#8B6B4E', lineHeight: 1.5 }}
                >
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

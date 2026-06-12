import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

const navLinks = [
  { label: 'Accueil', path: '/' },
  { label: 'Notre Histoire', path: '/notre-histoire' },
  { label: 'Menu', path: '/menu' },
  { label: 'Galerie', path: '/galerie' },
  { label: 'Contact', path: '/contact' },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#1C1917', color: '#FFFBF5' }}>
      <div className="max-w-container mx-auto px-4 md:px-6 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Logo & Description */}
          <div>
            <Link to="/" className="font-display text-2xl font-medium tracking-tight" style={{ color: '#FFFBF5' }}>
              Baobab & Graines
            </Link>
            <p className="mt-4 font-body text-sm leading-relaxed" style={{ color: '#8B6B4E' }}>
              Une expérience culinaire authentique où les saveurs africaines se dévoilent avec élégance. Chaque plat raconte une histoire.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-ocre"
                style={{ color: '#FFFBF5' }}
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-ocre"
                style={{ color: '#FFFBF5' }}
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-body text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#D4A853' }}>
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-body text-sm transition-colors duration-300 hover:text-ocre"
                    style={{ color: '#FFFBF5' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Horaires */}
          <div>
            <h4 className="font-body text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#D4A853' }}>
              Horaires
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Clock size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#D4A853' }} />
                <div className="font-body text-sm" style={{ color: '#FFFBF5' }}>
                  <p>Mardi – Samedi</p>
                  <p style={{ color: '#8B6B4E' }}>12h – 14h30 / 19h – 22h30</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#D4A853' }} />
                <div className="font-body text-sm" style={{ color: '#FFFBF5' }}>
                  <p>Dimanche</p>
                  <p style={{ color: '#8B6B4E' }}>12h – 15h</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#D4A853' }} />
                <div className="font-body text-sm" style={{ color: '#FFFBF5' }}>
                  <p>Lundi</p>
                  <p style={{ color: '#8B6B4E' }}>Fermé</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-body text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#D4A853' }}>
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#D4A853' }} />
                <span className="font-body text-sm" style={{ color: '#FFFBF5' }}>
                  15 Rue des Baobabs<br />
                  <span style={{ color: '#8B6B4E' }}>75011 Paris, France</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="flex-shrink-0" style={{ color: '#D4A853' }} />
                <a href="tel:+33142000000" className="font-body text-sm hover:text-ocre transition-colors" style={{ color: '#FFFBF5' }}>
                  +33 1 42 00 00 00
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="flex-shrink-0" style={{ color: '#D4A853' }} />
                <a href="mailto:reservation@baobabetgraines.fr" className="font-body text-sm hover:text-ocre transition-colors" style={{ color: '#FFFBF5' }}>
                  reservation@baobabetgraines.fr
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t" style={{ borderColor: '#FFFBF51A' }}>
          <p className="font-body text-xs text-center" style={{ color: '#8B6B4E' }}>
            &copy; {new Date().getFullYear()} Baobab & Graines. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

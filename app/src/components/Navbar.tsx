import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Accueil', path: '/' },
  { label: 'Notre Histoire', path: '/notre-histoire' },
  { label: 'Menu', path: '/menu' },
  { label: 'Galerie', path: '/galerie' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[9998] transition-all duration-300"
        style={{
          backgroundColor: scrolled ? '#FFFBF5' : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'none',
        }}
      >
        <div className="max-w-container mx-auto px-4 md:px-6 lg:px-12 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="font-display text-lg md:text-xl font-medium tracking-tight"
            style={{ color: scrolled ? '#1C1917' : '#FFFBF5' }}
          >
            Baobab & Graines
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-body text-sm font-medium transition-colors duration-300 relative group"
                style={{
                  color: location.pathname === link.path
                    ? '#3B2314'
                    : scrolled ? '#1C1917' : '#FFFBF5',
                }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-300 ease-btn"
                  style={{ backgroundColor: scrolled ? '#3B2314' : '#FFFBF5' }}
                />
                {location.pathname === link.path && (
                  <span
                    className="absolute -bottom-1 left-0 h-[1.5px] w-full"
                    style={{ backgroundColor: scrolled ? '#3B2314' : '#FFFBF5' }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <Link
            to="/contact"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 font-body text-sm font-medium transition-all duration-[400ms] ease-btn"
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
            Réserver
          </Link>

          {/* Hamburger (Mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
            style={{ color: scrolled ? '#1C1917' : '#FFFBF5' }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay Menu */}
      <div
        className="fixed inset-0 z-[9999] lg:hidden flex flex-col items-center justify-center gap-8 transition-all duration-500"
        style={{
          clipPath: menuOpen ? 'circle(150% at calc(100% - 40px) 40px)' : 'circle(0% at calc(100% - 40px) 40px)',
          backgroundColor: '#1C1917',
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 p-2 text-[#FFFBF5]"
          aria-label="Close menu"
        >
          <X size={28} />
        </button>

        {navLinks.map((link, i) => (
          <Link
            key={link.path}
            to={link.path}
            className="font-display text-3xl font-medium text-[#FFFBF5] opacity-0"
            style={{
              animation: menuOpen ? `fadeSlideIn 0.4s ease-out ${i * 0.08}s forwards` : 'none',
            }}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}

        <Link
          to="/contact"
          className="mt-4 inline-flex items-center gap-2 px-8 py-3 font-body text-sm font-semibold text-[#FFFBF5] opacity-0 border border-[#FFFBF5] transition-all duration-[400ms] ease-btn hover:bg-[#FFFBF5] hover:text-[#3B2314]"
          style={{
            animation: menuOpen ? `fadeSlideIn 0.4s ease-out ${navLinks.length * 0.08 + 0.15}s forwards` : 'none',
          }}
          onClick={() => setMenuOpen(false)}
        >
          Réserver une table
        </Link>

        <style>{`
          @keyframes fadeSlideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </>
  );
}

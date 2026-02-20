import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/integrations';
import Cart from '@/components/Cart';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount, actions } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[100rem] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="font-heading text-3xl font-bold bg-gradient-to-r from-deep-violet-gradient-start to-deep-violet-gradient-end bg-clip-text text-transparent">
                DigitalStore
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-paragraph font-medium transition-colors duration-300 ${
                    location.pathname === link.path
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={actions.toggleCart}
                className="relative p-2 text-foreground hover:text-primary transition-colors duration-300"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-deep-violet-gradient-start to-deep-violet-gradient-end text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <Link
                to="/products"
                className="bg-gradient-to-r from-deep-violet-gradient-start to-deep-violet-gradient-end text-primary-foreground font-paragraph font-semibold px-6 py-3 rounded-xl hover:scale-105 transition-transform duration-300"
              >
                Shop Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-4">
              <button
                onClick={actions.toggleCart}
                className="relative p-2 text-foreground hover:text-primary transition-colors duration-300"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-deep-violet-gradient-start to-deep-violet-gradient-end text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-foreground hover:text-primary transition-colors duration-300"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden mt-4 pt-4 border-t border-foreground/10">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`font-paragraph font-medium py-2 transition-colors duration-300 ${
                      location.pathname === link.path
                        ? 'text-primary'
                        : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  to="/products"
                  className="bg-gradient-to-r from-deep-violet-gradient-start to-deep-violet-gradient-end text-primary-foreground font-paragraph font-semibold px-6 py-3 rounded-xl text-center hover:scale-105 transition-transform duration-300"
                >
                  Shop Now
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Cart Component */}
      <Cart />
    </>
  );
}

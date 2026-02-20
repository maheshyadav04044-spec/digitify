import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { name: 'All Products', path: '/products' },
      { name: 'Ebooks', path: '/products?category=Ebooks' },
      { name: 'Templates', path: '/products?category=Templates' },
      { name: 'Bundles', path: '/products?category=Bundles' }
    ],
    company: [
      { name: 'About Us', path: '/contact' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Contact', path: '/contact' }
    ],
    legal: [
      { name: 'Privacy Policy', path: '/contact' },
      { name: 'Terms of Service', path: '/contact' },
      { name: 'Refund Policy', path: '/faq' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="w-full bg-foreground text-background">
      <div className="max-w-[100rem] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="font-heading text-3xl font-bold bg-gradient-to-r from-deep-violet-gradient-start to-deep-violet-gradient-end bg-clip-text text-transparent">
                DigitalStore
              </span>
            </Link>
            <p className="font-paragraph text-background/80 mb-6 max-w-md">
              Premium digital products designed to elevate your creative workflow. Quality, innovation, and excellence in every download.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/10 hover:bg-gradient-to-r hover:from-deep-violet-gradient-start hover:to-deep-violet-gradient-end flex items-center justify-center transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-background/80 hover:text-background transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-background/80 hover:text-background transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-background/80 hover:text-background transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-paragraph text-background/70 text-sm">
              © {currentYear} DigitalStore. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-background/70">
              <Mail className="w-4 h-4" />
              <a
                href="mailto:support@digitalstore.com"
                className="font-paragraph text-sm hover:text-background transition-colors duration-300"
              >
                support@digitalstore.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

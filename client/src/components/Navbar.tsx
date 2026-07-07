import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/custom-cake", label: "Custom Cake" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(22%_0.06_42/0.97)] backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-9 h-9 rounded-full gold-gradient flex items-center justify-center shadow-md">
                <span className="text-white font-serif font-bold text-sm">AP</span>
              </div>
              <div className="leading-tight">
                <p className="font-serif font-bold text-white text-lg leading-none tracking-wide">
                  Aushky
                </p>
                <p className="text-[oklch(72%_0.12_75)] text-[10px] tracking-[0.2em] uppercase font-light leading-none">
                  Pastries
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer rounded-md group ${
                    isActive(link.href)
                      ? "text-[oklch(72%_0.12_75)]"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[oklch(72%_0.12_75)] rounded-full"
                    />
                  )}
                </span>
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/custom-cake">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-full gold-gradient text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
                <ShoppingBag size={15} />
                Order Now
              </button>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-white p-2 rounded-md"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="lg:hidden bg-[oklch(22%_0.06_42/0.98)] backdrop-blur-md border-t border-white/10"
          >
            <div className="container py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                >
                  <Link href={link.href}>
                    <span
                      className={`block px-4 py-3 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                        isActive(link.href)
                          ? "text-[oklch(72%_0.12_75)] bg-white/5"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <div className="pt-3 border-t border-white/10 mt-2">
                <a href="https://wa.me/254788400483?text=Hi%20Aushky%20Pastries%2C%20I%20would%20like%20to%20order%20a%20cake" target="_blank" rel="noopener noreferrer">
                  <button className="w-full py-3 rounded-full gold-gradient text-white font-semibold text-sm">
                    Order on WhatsApp
                  </button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

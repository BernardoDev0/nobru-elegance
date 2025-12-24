import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "../common/Logo";

const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Serviços", href: "#servicos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Clientes", href: "#clientes" },
  { label: "Contato", href: "#contato" },
] as const;

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
    setIsOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ willChange: "transform, opacity, background-color" }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-5 md:px-12 lg:px-20 transition-all duration-300 ${
        isScrolled
          ? "bg-nobru-teal/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between">
        <Logo variant="light" />

        <ul className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-sm font-light tracking-wider uppercase transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-nobru-olive after:transition-all after:duration-500 hover:after:w-full ${
                  isScrolled
                    ? "text-nobru-cream hover:text-white"
                    : "text-nobru-cream/80 hover:text-nobru-cream"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={toggleMenu}
          className={`md:hidden p-2 transition-colors duration-300 ${
            isScrolled ? "text-nobru-cream hover:text-white" : "text-nobru-cream"
          }`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Mobile Overlay de Tela Cheia */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={toggleMenu}
            />
            {/* Menu Overlay */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-0 bg-nobru-teal/95 backdrop-blur-lg z-50 md:hidden flex items-center justify-center"
              style={{ willChange: "transform, opacity" }}
            >
              <button
                onClick={toggleMenu}
                className="absolute top-6 right-6 text-nobru-cream hover:text-white transition-colors duration-300 p-2"
                aria-label="Fechar menu"
              >
                <X size={28} />
              </button>
              
              <nav className="w-full px-6">
                <ul className="flex flex-col items-center justify-center gap-8">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      style={{ willChange: "transform, opacity" }}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="font-serif text-3xl md:text-4xl text-nobru-cream hover:text-white transition-colors duration-300 tracking-wide uppercase block py-3"
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};


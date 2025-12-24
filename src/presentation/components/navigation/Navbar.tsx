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

  // Bloquear scroll quando menu mobile está aberto
  useEffect(() => {
    if (isOpen) {
      // Salvar a posição atual do scroll
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.dataset.scrollY = scrollY.toString();
    } else {
      // Restaurar a posição do scroll apenas se ainda não foi restaurado
      const scrollY = document.body.dataset.scrollY;
      if (scrollY && document.body.style.position === "fixed") {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        // Não fazer scroll aqui se foi clicado em um link (será feito no handleNavClick)
        const shouldScroll = !document.body.dataset.skipScroll;
        if (shouldScroll && scrollY) {
          window.scrollTo(0, parseInt(scrollY, 10));
        }
        delete document.body.dataset.scrollY;
        delete document.body.dataset.skipScroll;
      }
    }
    return () => {
      // Cleanup: restaurar scroll se o componente for desmontado
      const scrollY = document.body.dataset.scrollY;
      if (scrollY) {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, parseInt(scrollY, 10));
        delete document.body.dataset.scrollY;
        delete document.body.dataset.skipScroll;
      }
    };
  }, [isOpen]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Marcar que vamos fazer scroll manualmente (para evitar conflito com useEffect)
    document.body.dataset.skipScroll = "true";
    
    // Restaurar o scroll imediatamente para permitir a navegação
    const scrollY = document.body.dataset.scrollY;
    if (scrollY) {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, parseInt(scrollY, 10));
      delete document.body.dataset.scrollY;
    }
    
    // Fechar o menu
    setIsOpen(false);
    
    // Aguardar um pouco para garantir que o DOM foi atualizado antes de scrollar para a seção
    setTimeout(() => {
      scrollToSection(href);
      delete document.body.dataset.skipScroll;
    }, 100);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ willChange: "transform, opacity, background-color" }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-5 md:px-12 lg:px-20 transition-all duration-300 ${
          isScrolled
            ? "bg-nobru-teal/90 backdrop-blur-md shadow-md"
            : "bg-transparent"
        } ${
          isOpen ? "md:opacity-100 opacity-0 pointer-events-none md:pointer-events-auto" : "opacity-100"
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
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Menu Mobile Overlay de Tela Cheia Premium */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] md:hidden"
            onClick={toggleMenu}
          >
            {/* Overlay com Glassmorphism - cobre tudo incluindo a navbar */}
            <div className="absolute inset-0 bg-[#0D3B3F]/95 backdrop-blur-xl" />
            
            {/* Conteúdo do Menu */}
            <div className="relative h-full w-full flex items-center justify-center">
              {/* Botão de Fechar Elegante */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMenu();
                }}
                className="absolute top-6 right-6 z-10 p-3 rounded-full bg-nobru-cream/10 hover:bg-nobru-cream/20 backdrop-blur-sm text-nobru-cream hover:text-white transition-all duration-300 border border-nobru-cream/20 hover:border-nobru-cream/40"
                aria-label="Fechar menu"
              >
                <X size={28} strokeWidth={1.5} />
              </motion.button>
              
              {/* Navegação Centralizada */}
              <nav className="w-full px-6" onClick={(e) => e.stopPropagation()}>
                <ul className="flex flex-col items-center justify-center space-y-8">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      style={{ willChange: "transform, opacity" }}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="font-serif text-3xl md:text-4xl text-nobru-cream hover:text-white transition-all duration-300 tracking-wide uppercase block py-3 relative group"
                      >
                        <span className="relative z-10">{item.label}</span>
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-nobru-olive transition-all duration-500 group-hover:w-full" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


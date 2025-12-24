import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { portfolioItems, PortfolioCategory, type PortfolioItem } from "../../data/portfolioData";
import { Lightbox } from "../common/Lightbox";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const categories: PortfolioCategory[] = ["Todos", "Corporativos", "Drinks", "Sociais", "Coquetel"];

export const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px", amount: 0.2 });
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>("Todos");
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const scrollPositionRef = useRef<number>(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Detectar tamanho da tela
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const filteredItems = useMemo(
    () =>
      activeFilter === "Todos"
        ? portfolioItems
        : portfolioItems.filter((item) => item.category === activeFilter),
    [activeFilter]
  );

  // Limitar exibição inicial: 4 no mobile, 6 no desktop
  const initialLimit = isDesktop ? 6 : 4;
  const displayedItems = useMemo(() => {
    if (showAll) return filteredItems;
    return filteredItems.slice(0, initialLimit);
  }, [filteredItems, showAll, initialLimit]);

  const hasMoreItems = filteredItems.length > initialLimit;

  const handleImageClick = useCallback((item: PortfolioItem) => {
    setSelectedImage(item);
    setIsLightboxOpen(true);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  // Reset showAll quando o filtro mudar
  const handleFilterChange = useCallback((category: PortfolioCategory) => {
    setActiveFilter(category);
    setShowAll(false);
  }, []);

  // Manter posição do scroll quando expandir
  useEffect(() => {
    if (showAll) {
      const savedScrollY = scrollPositionRef.current;
      
      // Função para forçar scroll
      const forceScroll = () => {
        window.scrollTo({ top: savedScrollY, behavior: 'auto' });
      };
      
      // Prevenir scroll automático durante a renderização
      let scrollLocked = true;
      const preventScroll = () => {
        if (scrollLocked) {
          window.scrollTo({ top: savedScrollY, behavior: 'auto' });
        }
      };
      
      // Adicionar listener para prevenir scroll
      window.addEventListener('scroll', preventScroll, { passive: false, capture: true });
      
      // Forçar scroll múltiplas vezes
      forceScroll();
      requestAnimationFrame(() => {
        forceScroll();
        requestAnimationFrame(() => {
          forceScroll();
          setTimeout(() => {
            forceScroll();
            setTimeout(() => {
              forceScroll();
              // Liberar scroll após um tempo
              setTimeout(() => {
                scrollLocked = false;
                window.removeEventListener('scroll', preventScroll, { capture: true });
              }, 600);
            }, 100);
          }, 50);
        });
      });
      
      return () => {
        scrollLocked = false;
        window.removeEventListener('scroll', preventScroll, { capture: true });
      };
    }
  }, [showAll]);

  return (
    <section
      id="portfolio"
      ref={ref}
      className="py-32 lg:py-40 bg-section-depth relative"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ willChange: "transform, opacity" }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block text-nobru-olive text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Nosso Portfólio
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary leading-tight tracking-tight">
            Momentos que transformamos em arte
          </h2>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 border ${
                activeFilter === category
                  ? "bg-nobru-olive text-nobru-teal border-nobru-olive shadow-md"
                  : "bg-transparent text-primary border-nobru-olive/30 hover:border-nobru-olive/50 hover:bg-nobru-olive/10"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Grid de Imagens */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeFilter}-${showAll}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {displayedItems.map((item, index) => {
              // Itens que aparecem após "Veja Mais" devem ter animação fade-in
              const isNewItem = showAll && index >= initialLimit;
              return (
                <motion.div
                  key={item.id}
                  initial={isNewItem ? { opacity: 0, y: 20 } : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: isNewItem ? 0.5 : 0.4,
                    delay: isNewItem ? (index - initialLimit) * 0.05 : index * 0.05,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  style={{ willChange: "transform, opacity" }}
                  className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-nobru-silver/20"
                  onClick={() => handleImageClick(item)}
                  onAnimationStart={() => {
                    // Manter scroll durante animação
                    if (isNewItem && scrollPositionRef.current) {
                      window.scrollTo({ top: scrollPositionRef.current, behavior: 'auto' });
                    }
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    style={{ willChange: "transform" }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-serif text-lg text-white mb-1">{item.title}</h3>
                      <p className="text-nobru-silver text-xs">
                        {item.event && `${item.event} | `}
                        {item.location && `${item.location} | `}
                        {item.date || "NOBRU Buffet"}
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-nobru-silver/80 text-[10px] font-light">
                      Buffet NOBRU | {item.location || "Rio de Janeiro"} | {item.date || "2024"}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Botão Veja Mais / Ver Menos */}
        {hasMoreItems && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mt-12"
          >
            {!showAll ? (
              <Button
                ref={buttonRef}
                onClick={() => {
                  // Salvar posição atual do scroll antes de expandir
                  scrollPositionRef.current = window.scrollY;
                  setShowAll(true);
                }}
                variant="outline"
                className="border-2 border-nobru-olive/30 text-nobru-olive hover:bg-nobru-olive hover:text-primary font-medium tracking-wide px-8 py-6 rounded-full transition-all duration-500 hover:border-nobru-olive/50"
              >
                Veja Mais
                <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setShowAll(false);
                  // Scroll suave até o topo do grid após colapsar
                  setTimeout(() => {
                    const portfolioSection = document.getElementById("portfolio");
                    if (portfolioSection) {
                      const gridElement = portfolioSection.querySelector(".grid");
                      if (gridElement) {
                        gridElement.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }
                  }, 100);
                }}
                variant="outline"
                className="border-2 border-nobru-olive/30 text-nobru-olive hover:bg-nobru-olive hover:text-primary font-medium tracking-wide px-8 py-6 rounded-full transition-all duration-500 hover:border-nobru-olive/50"
              >
                Ver Menos
                <ChevronUp className="ml-2 h-5 w-5" />
              </Button>
            )}
          </motion.div>
        )}

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-primary/60">Nenhum item encontrado nesta categoria.</p>
          </motion.div>
        )}
      </div>

      <Lightbox
        isOpen={isLightboxOpen}
        onClose={handleCloseLightbox}
        image={selectedImage}
      />
    </section>
  );
};


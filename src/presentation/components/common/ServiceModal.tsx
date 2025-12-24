import { useMemo, useCallback, memo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ImageCarousel } from "./ImageCarousel";
import { ArrowRight, X } from "lucide-react";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewPortfolio: () => void;
  service: {
    title: string;
    description: string;
    fullDescription?: string;
    image?: string;
    images?: string[];
  } | null;
}

const ServiceModalComponent = ({ isOpen, onClose, onViewPortfolio, service }: ServiceModalProps) => {
  const handleWhatsApp = useCallback(() => {
    if (!service) return;
    const message = encodeURIComponent(
      `Olá! Gostaria de saber mais sobre ${service.title} do NOBRU Buffet.`
    );
    window.open(`https://wa.me/5511999999999?text=${message}`, "_blank");
  }, [service]);

  const carouselImages = useMemo(
    () => service?.images || (service?.image ? [service.image] : []),
    [service?.images, service?.image]
  );

  const handleViewPortfolioClick = useCallback(() => {
    onClose();
    // Delay para garantir que a animação de saída termine antes de scrollar
    setTimeout(() => {
      onViewPortfolio();
    }, 250);
  }, [onClose, onViewPortfolio]);

  // Bloquear scroll do body quando modal está aberto
  useEffect(() => {
    if (isOpen) {
      // Salvar a posição atual do scroll
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      // Restaurar a posição do scroll
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!service) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Overlay com animação de saída */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          {/* Content Card com animação de saída sincronizada - todos os elementos dentro fazem fade out junto */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg border bg-background p-6 shadow-lg mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão de fechar */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Conteúdo - todos os elementos fazem fade out junto com o container pai motion.div */}
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-3xl text-primary tracking-tight">
                  {service.title}
                </h2>
              </div>

              {carouselImages.length > 0 && (
                <ImageCarousel images={carouselImages} autoPlay={true} interval={4000} />
              )}

              <p className="text-primary/80 leading-relaxed text-base">
                {service.fullDescription || service.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={handleViewPortfolioClick}
                  className="bg-nobru-olive hover:bg-nobru-olive/90 text-primary font-medium tracking-wide px-8 py-6 border border-nobru-olive/20 hover:border-nobru-olive/40 transition-all duration-300 group"
                  size="lg"
                >
                  Conhecer nosso Portfólio Completo
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button
                  onClick={handleWhatsApp}
                  variant="outline"
                  className="flex-1 border border-nobru-olive/30 text-nobru-olive hover:bg-nobru-olive hover:text-primary transition-all duration-300"
                >
                  Falar no WhatsApp
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ServiceModal = memo(ServiceModalComponent);
ServiceModal.displayName = "ServiceModal";


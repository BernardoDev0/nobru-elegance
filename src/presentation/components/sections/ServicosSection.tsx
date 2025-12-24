import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useCallback, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceModal } from "../common/ServiceModal";

const servicos = [
  {
    id: "1",
    title: "Eventos Corporativos",
    description:
      "Coffee breaks, almoços executivos, coquetéis e confraternizações empresariais com o padrão que sua empresa merece.",
    fullDescription:
      "Oferecemos soluções completas para eventos corporativos, desde coffee breaks matinais até jantares executivos. Nossa equipe entende a importância de impressionar clientes e parceiros, por isso cada detalhe é cuidadosamente planejado. Trabalhamos com cardápios personalizados que refletem a identidade da sua empresa, sempre com ingredientes de primeira qualidade e apresentação impecável.",
    image: "/src/imagens/DSC00094.JPG",
    images: [
      "/src/imagens/DSC00001 (1).JPG",
      "/src/imagens/DSC00002 (1).JPG",
      "/src/imagens/DSC00005 (1).JPG",
      "/src/imagens/DSC00007 (1).JPG",
    ],
  },
  {
    id: "2",
    title: "Eventos Sociais",
    description:
      "Aniversários, batizados, formaturas e celebrações especiais com cardápios que encantam todos os convidados.",
    fullDescription:
      "Transformamos momentos especiais em memórias inesquecíveis. Seja um aniversário íntimo ou uma grande celebração, criamos cardápios que agradam a todos os paladares. Nossa experiência de 15 anos nos permite entender que cada evento social é único, e por isso oferecemos personalização completa, desde o menu até a decoração da mesa.",
    image: "/src/imagens/DSC00008.JPG",
    images: [
      "/src/imagens/DSC00008.JPG",
      "/src/imagens/DSC00018.JPG",
      "/src/imagens/DSC00036.JPG",
      "/src/imagens/DSC00037.JPG",
    ],
  },
  {
    id: "3",
    title: "Experiências Gastronômicas",
    description:
      "Jantares particulares e menus degustação exclusivos. Uma jornada sensorial criada especialmente para você.",
    fullDescription:
      "Para os verdadeiros apreciadores da gastronomia, oferecemos experiências únicas e exclusivas. Nossos menus degustação são criados especialmente para cada ocasião, combinando sabores sofisticados com apresentação artística. Cada prato conta uma história, e nossa equipe está sempre pronta para criar momentos gastronômicos memoráveis em ambientes íntimos e elegantes.",
    image: "/src/imagens/Carrossel Botafogo IBIUNA (5).jpg",
    images: [
      "/src/imagens/Carrossel Botafogo IBIUNA (5).jpg",
      "/src/imagens/Carrossel Botafogo IBIUNA (11).jpg",
      "/src/imagens/Carrossel Botafogo IBIUNA (3).jpg",
      "/src/imagens/Carrossel Botafogo IBIUNA (4).jpg",
    ],
  },
];

interface ServicosSectionProps {
  onViewPortfolio?: () => void;
}

export const ServicosSection = ({ onViewPortfolio }: ServicosSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px", amount: 0.2 });
  const [selectedService, setSelectedService] = useState<typeof servicos[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewPortfolio = useCallback(() => {
    setIsModalOpen(false);
    if (onViewPortfolio) {
      onViewPortfolio();
    } else {
      const element = document.querySelector("#portfolio");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [onViewPortfolio]);

  const handleServiceClick = useCallback((servico: typeof servicos[0]) => {
    setSelectedService(servico);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <section
      id="servicos"
      ref={ref}
      className="py-32 lg:py-40 bg-section-depth"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ willChange: "transform, opacity" }}
          className="text-center mb-20 lg:mb-28"
        >
          <span className="inline-block text-nobru-olive text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Nossos Serviços
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary leading-tight max-w-2xl mx-auto tracking-tight">
            Soluções exclusivas para cada ocasião
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {servicos.map((servico, index) => (
            <motion.div
              key={servico.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{ willChange: "transform, opacity" }}
              className="group"
            >
              <motion.div
                className="aspect-[4/3] rounded-2xl mb-6 overflow-hidden relative shadow-sm cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ willChange: "transform" }}
                onClick={() => handleServiceClick(servico)}
              >
                <img
                  src={servico.image}
                  alt={servico.title}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  style={{ willChange: "transform" }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nobru-teal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>

              <h3 className="font-serif text-xl lg:text-2xl text-primary mb-3 tracking-wide">
                {servico.title}
              </h3>
              <p className="text-primary/70 leading-relaxed text-sm lg:text-base mb-5">
                {servico.description}
              </p>

              <Button
                variant="ghost"
                onClick={() => handleServiceClick(servico)}
                className="text-nobru-olive hover:text-nobru-olive hover:bg-nobru-olive/10 p-0 h-auto font-medium group/btn border border-transparent hover:border-nobru-olive/30 px-4 py-2 rounded-lg transition-all duration-500"
              >
                Saiba mais
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-500" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
      <ServiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onViewPortfolio={handleViewPortfolio}
        service={selectedService}
      />
    </section>
  );
};


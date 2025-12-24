import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const servicos = [
  {
    title: "Eventos Corporativos",
    description:
      "Coffee breaks, almoços executivos, coquetéis e confraternizações empresariais com o padrão que sua empresa merece.",
    image: "bg-nobru-silver",
  },
  {
    title: "Eventos Sociais",
    description:
      "Aniversários, batizados, formaturas e celebrações especiais com cardápios que encantam todos os convidados.",
    image: "bg-nobru-silver/80",
  },
  {
    title: "Experiências Gastronômicas",
    description:
      "Jantares particulares e menus degustação exclusivos. Uma jornada sensorial criada especialmente para você.",
    image: "bg-nobru-silver/60",
  },
];

const ServicosSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="servicos"
      ref={ref}
      className="py-32 lg:py-40 bg-section-depth"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20 lg:mb-28"
        >
          <span className="inline-block text-nobru-olive text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Nossos Serviços
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary leading-tight max-w-2xl mx-auto">
            Soluções exclusivas para cada ocasião
          </h2>
        </motion.div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {servicos.map((servico, index) => (
            <motion.div
              key={servico.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.15,
                ease: "easeOut",
              }}
              className="group"
            >
              {/* Image Placeholder */}
              <div
                className={`${servico.image} aspect-[4/3] rounded-2xl mb-6 overflow-hidden relative shadow-sm`}
              >
                <div className="absolute inset-0 bg-nobru-teal/10 group-hover:bg-nobru-teal/20 transition-colors duration-500" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl lg:text-2xl text-primary mb-3">
                {servico.title}
              </h3>
              <p className="text-primary/70 leading-relaxed text-sm lg:text-base mb-5">
                {servico.description}
              </p>

              {/* Ghost Button */}
              <Button
                variant="ghost"
                className="text-nobru-olive hover:text-nobru-olive hover:bg-nobru-olive/10 p-0 h-auto font-medium group/btn"
              >
                Saiba mais
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicosSection;

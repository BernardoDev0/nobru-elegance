import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { Leaf, Award, Heart } from "lucide-react";

const diferenciais = [
  {
    id: "1",
    title: "Ingredientes Selecionados",
    description:
      "Trabalhamos apenas com fornecedores locais e ingredientes frescos, garantindo qualidade e sabor em cada prato.",
    icon: Leaf,
  },
  {
    id: "2",
    title: "Experiência de 15 Anos",
    description:
      "Mais de mil eventos realizados com excelência, desde encontros corporativos até grandes celebrações sociais.",
    icon: Award,
  },
  {
    id: "3",
    title: "Atendimento Personalizado",
    description:
      "Cada evento é único. Nossa equipe dedica atenção especial para entender e superar suas expectativas.",
    icon: Heart,
  },
] as const;

export const DiferenciaisSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px", amount: 0.2 });

  return (
    <section
      id="diferenciais"
      ref={ref}
      className="py-32 lg:py-40 bg-section-silver"
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
            Por Que Escolher
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary leading-tight tracking-tight">
            A arte de servir com excelência
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-16 lg:gap-24">
          {diferenciais.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{ willChange: "transform, opacity" }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-nobru-olive/40 bg-nobru-cream/50 mb-8 shadow-sm">
                  <IconComponent
                    className="w-7 h-7 text-nobru-olive"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="font-serif text-xl lg:text-2xl text-primary mb-4">
                  {item.title}
                </h3>
                <p className="text-primary/70 leading-relaxed text-sm lg:text-base">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


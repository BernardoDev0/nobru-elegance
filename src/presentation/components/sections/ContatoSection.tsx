import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useCallback, useMemo } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const contactInfo = [
    {
      icon: Phone,
      label: "Telefone",
      value: "(11) 99999-9999",
      href: "tel:+5511999999999",
    },
    {
      icon: Mail,
      label: "Email",
      value: "contato@nobrubuffet.com.br",
      href: "mailto:contato@nobrubuffet.com.br",
    },
    {
      icon: MapPin,
      label: "Localização",
      value: "Rio de Janeiro, RJ",
      href: "#",
    },
] as const;

export const ContatoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px", amount: 0.2 });

  const handleWhatsApp = useCallback(() => {
    const message = encodeURIComponent(
      "Olá! Gostaria de saber mais sobre os serviços do NOBRU Buffet."
    );
    window.open(`https://wa.me/5511999999999?text=${message}`, "_blank");
  }, []);

  const handleScrollToInicio = useCallback(() => {
    scrollToSection("#inicio");
  }, []);

  return (
    <section
      id="contato"
      ref={ref}
      className="py-32 lg:py-40 bg-section-silver relative"
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
            Entre em Contato
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary leading-tight tracking-tight">
            Vamos criar algo especial juntos
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ willChange: "transform, opacity" }}
            className="space-y-6"
          >
            <p className="text-primary/70 leading-relaxed text-lg">
              Estamos prontos para transformar seu evento em uma experiência
              inesquecível. Entre em contato e descubra como podemos tornar seu
              momento especial ainda mais memorável.
            </p>

            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ willChange: "transform, opacity" }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-nobru-olive/10 flex items-center justify-center group-hover:bg-nobru-olive/20 transition-colors duration-500">
                      <IconComponent className="w-5 h-5 text-nobru-olive" />
                    </div>
                    <div>
                      <p className="text-sm text-primary/60 uppercase tracking-wide">
                        {info.label}
                      </p>
                      <p className="text-primary font-medium">{info.value}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ willChange: "transform, opacity" }}
            className="flex flex-col gap-6"
          >
            <Button
              onClick={handleWhatsApp}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white font-medium tracking-wide py-6 border border-green-700/30 hover:border-green-600/50 transition-all duration-500"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Falar no WhatsApp
            </Button>
            <Button
              onClick={handleScrollToInicio}
              variant="outline"
              size="lg"
              className="border border-nobru-olive/30 text-nobru-olive hover:bg-nobru-olive hover:text-primary font-medium tracking-wide py-6 transition-all duration-500"
            >
              Solicitar Orçamento
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


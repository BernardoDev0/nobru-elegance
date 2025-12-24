import { motion } from "framer-motion";
import { Calendar, Users, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.15,
      duration: 0.8,
      ease: "easeOut" as const,
    },
  }),
};

const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Placeholder (neutral gray) */}
      <div className="absolute inset-0 bg-nobru-silver" />

      {/* Teal Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            <motion.span
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="inline-block text-nobru-olive text-sm font-medium tracking-[0.3em] uppercase mb-6"
            >
              Experiências Gastronômicas
            </motion.span>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-nobru-cream leading-[1.1] mb-8 text-balance"
            >
              Transformamos seus eventos em{" "}
              <span className="italic text-nobru-olive">memórias</span>{" "}
              inesquecíveis
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="text-nobru-cream/70 text-lg md:text-xl font-light leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10"
            >
              Com ingredientes selecionados e uma equipe apaixonada pela arte
              culinária, criamos experiências que encantam todos os sentidos.
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="bg-nobru-olive hover:bg-nobru-olive/90 text-primary font-medium tracking-wide px-8"
              >
                Conheça Nossos Serviços
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-nobru-cream/30 text-nobru-cream hover:bg-nobru-cream/10 font-medium tracking-wide px-8"
              >
                Ver Cardápio
              </Button>
            </motion.div>
          </div>

          {/* Right: Glass Form */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="w-full max-w-md mx-auto lg:ml-auto"
          >
            <div className="glass-card rounded-2xl p-8 md:p-10">
              <h3 className="font-serif text-2xl text-primary mb-2">
                Solicite um Orçamento
              </h3>
              <p className="text-muted-foreground text-sm mb-8">
                Preencha o formulário e entraremos em contato em até 24h
              </p>

              <form className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-primary/80">
                    Nome Completo
                  </Label>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    className="bg-white/50 border-nobru-silver/50 focus:border-nobru-olive"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-primary/80">
                    Telefone
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      placeholder="(00) 00000-0000"
                      className="pl-10 bg-white/50 border-nobru-silver/50 focus:border-nobru-olive"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-primary/80">
                      Data do Evento
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="date"
                        type="date"
                        className="pl-10 bg-white/50 border-nobru-silver/50 focus:border-nobru-olive"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests" className="text-primary/80">
                      Convidados
                    </Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="guests"
                        type="number"
                        placeholder="100"
                        className="pl-10 bg-white/50 border-nobru-silver/50 focus:border-nobru-olive"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-primary/80">
                    Local do Evento
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="Cidade ou endereço"
                      className="pl-10 bg-white/50 border-nobru-silver/50 focus:border-nobru-olive"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium tracking-wide py-6"
                  size="lg"
                >
                  Solicitar Orçamento
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-nobru-cream/50 text-xs tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-nobru-cream/50 to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

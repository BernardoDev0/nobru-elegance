import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { Users, MapPin, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CustomDatePicker } from "../common/CustomDatePicker";
import { cn } from "@/lib/utils";

const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const, // Custom cubic-bezier for smoother animation
    },
  }),
};

export const HeroSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: undefined as Date | undefined,
    guests: "",
    location: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    date?: string;
  }>({});

  // Validação de nome: apenas letras e espaços
  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permitir apenas letras, espaços e acentos
    const onlyLetters = /^[a-zA-ZÀ-ÿ\s]*$/;
    
    if (value === "" || onlyLetters.test(value)) {
      setFormData((prev) => ({ ...prev, name: value }));
      if (errors.name) {
        setErrors((prev) => ({ ...prev, name: undefined }));
      }
    } else {
      setErrors((prev) => ({
        ...prev,
        name: "Apenas letras são permitidas",
      }));
    }
  }, [errors.name]);

  // Máscara de telefone: (00) 00000-0000
  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é dígito
    
    if (value.length <= 11) {
      // Aplica a máscara
      if (value.length <= 2) {
        value = value;
      } else if (value.length <= 7) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
      }
      
      setFormData((prev) => ({ ...prev, phone: value }));
      
      // Validação: telefone deve ter pelo menos 10 dígitos (com DDD)
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length >= 10 && errors.phone) {
        setErrors((prev) => ({ ...prev, phone: undefined }));
      } else if (digitsOnly.length > 0 && digitsOnly.length < 10) {
        setErrors((prev) => ({
          ...prev,
          phone: "Telefone inválido",
        }));
      }
    }
  }, [errors.phone]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "guests" || id === "location") {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  }, []);

  const handleDateChange = useCallback((date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, date }));
    if (errors.date) {
      setErrors((prev) => ({ ...prev, date: undefined }));
    }
  }, [errors.date]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    const newErrors: typeof errors = {};

    // Validação de nome
    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Nome deve ter pelo menos 2 caracteres";
    }

    // Validação de telefone
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!formData.phone) {
      newErrors.phone = "Telefone é obrigatório";
    } else if (phoneDigits.length < 10) {
      newErrors.phone = "Telefone inválido";
    }

    // Validação de data (se preenchida)
    if (formData.date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const maxDate = new Date(today);
      maxDate.setFullYear(maxDate.getFullYear() + 2);

      if (formData.date < tomorrow) {
        newErrors.date = "A data deve ser a partir de amanhã";
      } else if (formData.date > maxDate) {
        newErrors.date = "A data não pode ser mais de 2 anos no futuro";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast({
        title: "Campos inválidos",
        description: "Por favor, corrija os erros no formulário.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    toast({
      title: "Orçamento solicitado!",
      description: "Entraremos em contato em até 24h.",
    });

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", phone: "", date: undefined, guests: "", location: "" });
      setErrors({});
    }, 3000);
  }, [formData, toast]);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/src/imagens/DSC00002 (1).JPG"
          alt="NOBRU Buffet - Experiências Gastronômicas"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-nobru-teal/80 via-nobru-teal/70 to-nobru-teal/80" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
          <div className="text-center lg:text-left px-2 md:px-0">
            <motion.span
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              style={{ willChange: "transform, opacity" }}
              className="inline-block text-nobru-olive text-sm font-medium tracking-[0.3em] uppercase mb-6"
            >
              Experiências Gastronômicas
            </motion.span>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              style={{ willChange: "transform, opacity" }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-nobru-cream leading-[1.1] mb-8 text-balance tracking-tight"
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
              style={{ willChange: "transform, opacity" }}
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
              style={{ willChange: "transform, opacity" }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection("#servicos")}
                className="bg-nobru-olive hover:bg-nobru-olive/90 text-primary font-medium tracking-wide px-8 border border-nobru-olive/20 hover:border-nobru-olive/40 transition-all duration-500"
              >
                Conheça Nossos Serviços
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("#servicos")}
                className="border border-nobru-olive/30 text-nobru-olive hover:bg-nobru-olive hover:text-primary font-medium tracking-wide px-8 transition-all duration-500 hover:border-nobru-olive/50"
              >
                Ver Cardápio
              </Button>
            </motion.div>
          </div>

          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            style={{ willChange: "transform, opacity" }}
            className="w-full max-w-md mx-auto lg:ml-auto px-2 md:px-0"
          >
            <div className="glass-card rounded-2xl p-6 md:p-8 lg:p-10">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  className="text-center py-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.2,
                    }}
                  >
                    <CheckCircle className="w-20 h-20 text-nobru-olive mx-auto mb-6" />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="font-serif text-2xl text-primary mb-3 tracking-wide"
                  >
                    Recebemos seu pedido!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-muted-foreground mb-6"
                  >
                    Entraremos em contato em até 24h.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Button
                      onClick={() => {
                        window.open(
                          `https://wa.me/5511999999999?text=${encodeURIComponent(
                            `Olá! Solicitei um orçamento no site. Nome: ${formData.name}, Telefone: ${formData.phone}`
                          )}`,
                          "_blank"
                        );
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Falar no WhatsApp
                    </Button>
                  </motion.div>
                </motion.div>
              ) : (
                <>
                  <h3 className="font-serif text-2xl text-primary mb-2">
                    Solicite um Orçamento
                  </h3>
                  <p className="text-muted-foreground text-sm mb-8">
                    Preencha o formulário e entraremos em contato em até 24h
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-primary/80">
                        Nome Completo *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Seu nome"
                        value={formData.name}
                        onChange={handleNameChange}
                        className={cn(
                          "bg-white/50 focus:border-nobru-olive",
                          errors.name
                            ? "border-[#8B2635]/60 focus:border-[#8B2635]"
                            : "border-nobru-silver/50"
                        )}
                      />
                      {errors.name && (
                        <p className="text-[#8B2635] text-xs mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-primary/80">
                        Telefone *
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                        <Input
                          id="phone"
                          placeholder="(00) 00000-0000"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          maxLength={15}
                          className={cn(
                            "pl-10 bg-white/50 focus:border-nobru-olive",
                            errors.phone
                              ? "border-[#8B2635]/60 focus:border-[#8B2635]"
                              : "border-nobru-silver/50"
                          )}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-[#8B2635] text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date" className="text-primary/80">
                          Data do Evento
                        </Label>
                        <div className="relative">
                          <CustomDatePicker
                            value={formData.date}
                            onChange={handleDateChange}
                            placeholder="dd/mm/aaaa"
                            error={!!errors.date}
                          />
                        </div>
                        {errors.date && (
                          <p className="text-[#8B2635] text-xs mt-1">{errors.date}</p>
                        )}
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
                            min="1"
                            placeholder="100"
                            value={formData.guests}
                            onChange={handleInputChange}
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
                          value={formData.location}
                          onChange={handleInputChange}
                          className="pl-10 bg-white/50 border-nobru-silver/50 focus:border-nobru-olive"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium tracking-wide py-6 disabled:opacity-70 border border-primary/20 hover:border-primary/40 transition-all duration-500"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <motion.span
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          Enviando...
                        </motion.span>
                      ) : (
                        "Solicitar Orçamento"
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>

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


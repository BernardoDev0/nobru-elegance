import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Placeholder client logos (using text as placeholder)
const clientes = [
  { name: "Empresa A", id: 1 },
  { name: "Empresa B", id: 2 },
  { name: "Empresa C", id: 3 },
  { name: "Empresa D", id: 4 },
  { name: "Empresa E", id: 5 },
  { name: "Empresa F", id: 6 },
  { name: "Empresa G", id: 7 },
  { name: "Empresa H", id: 8 },
];

// Duplicate for infinite scroll effect
const duplicatedClientes = [...clientes, ...clientes];

const ClientesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="clientes"
      ref={ref}
      className="py-32 lg:py-40 bg-nobru-teal overflow-hidden relative"
    >
      {/* Subtle top gradient for depth */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" />
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block text-nobru-olive text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Confiança
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-nobru-cream leading-tight">
            Clientes que confiam em nós
          </h2>
        </motion.div>
      </div>

      {/* Infinite Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative"
      >
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-nobru-teal to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-nobru-teal to-transparent z-10 pointer-events-none" />

        {/* Scrolling Container */}
        <motion.div
          animate={{
            x: [0, -50 * clientes.length * 4],
          }}
          transition={{
            x: {
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          className="flex gap-16 items-center"
        >
          {duplicatedClientes.map((cliente, index) => (
            <div
              key={`${cliente.id}-${index}`}
              className="flex-shrink-0 group cursor-pointer"
            >
              {/* Logo Placeholder */}
              <div className="w-40 h-20 rounded-xl bg-nobru-cream/10 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <span className="font-serif text-lg text-nobru-cream/80 group-hover:text-nobru-olive transition-colors duration-500">
                  {cliente.name}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ClientesSection;

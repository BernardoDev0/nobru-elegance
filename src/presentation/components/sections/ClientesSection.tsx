import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useMemo, useState } from "react";

type Cliente = {
  name: string;
  id: number;
  logo: string | string[] | React.ReactNode; // Pode ser uma URL, array de URLs, ou SVG inline
};

const ClienteLogo = ({ cliente }: { cliente: Cliente }) => {
  const [hasError, setHasError] = useState(false);
  
  // Se for um ReactNode (SVG inline), renderizar diretamente
  if (typeof cliente.logo !== 'string' && !Array.isArray(cliente.logo)) {
    return <div className="max-w-full max-h-full flex items-center justify-center">{cliente.logo}</div>;
  }
  
  // Usar apenas URLs externas, sem tentar logo local
  const logoUrl = Array.isArray(cliente.logo) ? cliente.logo[0] : cliente.logo;
  
  if (!logoUrl || hasError) {
    return (
      <span className="font-serif text-sm text-nobru-cream/80 group-hover:text-nobru-olive transition-colors duration-500 text-center px-2">
        {cliente.name}
      </span>
    );
  }

  return (
    <img
      src={logoUrl}
      alt={cliente.name}
      className="max-w-full max-h-full object-contain"
      onError={() => setHasError(true)}
      loading="lazy"
    />
  );
};

// URLs dos logos usando Google Favicon Service (muito confiável)
const clientes: Cliente[] = [
  { 
    name: "Sawala", 
    id: 1,
    logo: `https://www.sawala.com.br/media/logo.png`
  },
  { 
    name: "Ilha Pura", 
    id: 2,
    logo: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTElRxJOx-TWxe8XZrbulaqdAmVcyqz37WcBg&s`
  },
  { 
    name: "Lopes", 
    id: 3,
    logo: `https://upload.wikimedia.org/wikipedia/commons/7/7c/Logo-Lopes-Consultoria-de-Imoveis-2020.png`
  },
  { 
    name: "Performance", 
    id: 4,
    logo: `https://vectorseek.com/wp-content/uploads/2023/06/BMW-M-Performance-Logo-Vector.svg-.png`
  },
  { 
    name: "Deugro", 
    id: 5,
    logo: `https://cdn.brandfetch.io/deugro.com/fallback/lettermark/theme/dark/h/256/w/256/icon?c=1bfwsmEH20zzEfSNTed`
  },
  { 
    name: "PetroHouse", 
    id: 6,
    logo: `https://petro-house.com/wp-content/uploads/2022/01/Petrohouse-Logotipo-Horizontal-Colorido-Positivo.png`
  },
  { 
    name: "Honda", 
    id: 7,
    logo: `https://1000logos.net/wp-content/uploads/2018/03/Honda-Logo-2000.png`
  },
  { 
    name: "Toyota", 
    id: 8,
    logo: `https://media.toyota.com.ar/696c13db-6d58-4897-aff3-5f874c67a090.png`
  },
  { 
    name: "BYD", 
    id: 9,
    logo: `https://images.seeklogo.com/logo-png/52/1/byd-atualizada-2024-logo-png_seeklogo-528892.png`
  },
  { 
    name: "Casa Shopping", 
    id: 10,
    logo: `https://i0.wp.com/assets.propmark.com.br/legacy/thumbs/images/casashopping1.jpg?w=720&ssl=1`
  },
  { 
    name: "Jeep", 
    id: 11,
    logo: `https://upload.wikimedia.org/wikipedia/commons/0/0d/Jeep_logo.svg`
  },
  { 
    name: "RAM", 
    id: 12,
    logo: `https://www.pngplay.com/wp-content/uploads/13/RAM-Logo-Transparent-Image.png`
  },
];

export const ClientesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px", amount: 0.2 });

  // Criar 2 cópias para loop infinito perfeito - quando a primeira cópia sai, a segunda entra
  const infiniteClientes = useMemo(() => {
    return [...clientes, ...clientes];
  }, []);

  // Calcular a distância exata para animação (160px width + 64px gap = 224px por item)
  const scrollDistance = useMemo(() => {
    // w-40 = 10rem = 160px, gap-16 = 4rem = 64px
    // Total por item: 224px
    return clientes.length * 224;
  }, []);
  
  return (
    <section
      id="clientes"
      ref={ref}
      className="py-32 lg:py-40 bg-nobru-teal overflow-hidden relative"
    >
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" />
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ willChange: "transform, opacity" }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block text-nobru-olive text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Confiança
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-nobru-cream leading-tight tracking-tight">
            Clientes que confiam em nós
          </h2>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ willChange: "opacity" }}
        className="relative"
      >
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-nobru-teal to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-nobru-teal to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden">
          <div 
            className="flex gap-16 items-center"
            style={{
              width: 'fit-content',
              animation: `infinite-scroll 40s linear infinite`,
              '--scroll-distance': `-${scrollDistance}px`,
            } as React.CSSProperties & { '--scroll-distance': string }}
          >
            <style>{`
              @keyframes infinite-scroll {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(var(--scroll-distance));
                }
              }
            `}</style>
            {infiniteClientes.map((cliente, index) => (
              <div
                key={`${cliente.id}-${index}`}
                className="flex-shrink-0 group cursor-pointer"
              >
                <div className="w-40 h-20 rounded-xl bg-nobru-cream/10 flex items-center justify-center opacity-100 transition-opacity duration-300 p-4 hover:opacity-90 relative">
                  <ClienteLogo cliente={cliente} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};


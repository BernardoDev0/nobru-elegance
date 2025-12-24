import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useCallback, memo } from "react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  image: {
    src: string;
    title: string;
    event?: string;
    location?: string;
    date?: string;
  } | null;
}

const LightboxComponent = ({ isOpen, onClose, image }: LightboxProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleBackdropClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  if (!image) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md"
            onClick={handleBackdropClick}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={handleBackdropClick}
          >
            <div
              className="relative max-w-6xl max-h-[90vh] w-full"
              onClick={handleContentClick}
            >
              <button
                onClick={onClose}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-300 z-10"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative rounded-xl overflow-hidden bg-nobru-teal/20 backdrop-blur-sm">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                  loading="eager"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6">
                  <h3 className="font-serif text-2xl text-white mb-2">{image.title}</h3>
                  <p className="text-nobru-silver text-sm">
                    {image.event && `${image.event} | `}
                    {image.location && `${image.location} | `}
                    {image.date || "NOBRU Buffet"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const Lightbox = memo(LightboxComponent);
Lightbox.displayName = "Lightbox";


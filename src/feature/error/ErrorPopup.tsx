// src/components/common/ErrorPopup.tsx
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ErrorPopupProps {
  message: string | null;
  onClose: () => void;
}

export const ErrorPopup = ({ message, onClose }: ErrorPopupProps) => {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [message, onClose]);

  return (
    <AnimatePresence>
      {message && (
<motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-[9999] bg-red-600 text-white text-sm font-medium px-6 py-3 rounded-lg shadow-lg"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

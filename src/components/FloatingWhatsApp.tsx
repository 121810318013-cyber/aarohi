import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const FloatingWhatsApp = () => {
  const handleClick = () => {
    const message = encodeURIComponent('Hi! I have a query about Aarohi Selections.');
    window.open(`https://wa.me/919999999999?text=${message}`, '_blank');
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg transition-colors"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full animate-ping" />
      <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full" />
    </motion.button>
  );
};

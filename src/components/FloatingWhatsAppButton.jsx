import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsAppButton = ({ phoneNumber, message }) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg z-50 flex items-center justify-center"
      whileHover={{ scale: 1.1, boxShadow: "0px 0px 12px rgba(0,255,0,0.7)" }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} />
    </motion.a>
  );
};

export default FloatingWhatsAppButton;
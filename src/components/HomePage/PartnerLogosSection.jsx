import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Building } from 'lucide-react';

const partnerLogos = [
  { name: "Ministerio de Desarrollo Social (Placeholder)", logo: "/placeholder-logo-ministerio.png", alt: "Logo Ministerio de Desarrollo Social" },
  { name: "UNICEF (Placeholder)", logo: "/placeholder-logo-unicef.png", alt: "Logo UNICEF" },
  { name: "Red Solidaria (Placeholder)", logo: "/placeholder-logo-red.png", alt: "Logo Red Solidaria" },
  { name: "Empresa Amiga (Placeholder)", logo: "/placeholder-logo-empresa.png", alt: "Logo Empresa Amiga" },
  { name: "Auditoría Externa (Placeholder)", logo: "/placeholder-logo-auditoria.png", alt: "Sello Auditoría Externa" },
];

const PartnerLogosSection = () => {
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Confianza y Transparencia</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trabajamos con aliados estratégicos y nos sometemos a rigurosos controles para garantizar la transparencia de nuestra gestión.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-12 items-center mb-12">
          {partnerLogos.map((partner, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={logoVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex justify-center"
              title={partner.name}
            >
              <img  
                src={partner.logo} 
                alt={partner.alt} 
                className="h-16 md:h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300"
               src="https://images.unsplash.com/photo-1599472696777-95cab5e0f891" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-center text-gray-700 bg-green-50 p-6 rounded-lg shadow-md border-l-4 border-green-500"
        >
          <div className="flex items-center justify-center mb-3">
            <CheckCircle className="w-7 h-7 text-green-600 mr-2" />
            <p className="text-lg font-semibold">
              Somos una organización auditada, con balance público y registro oficial.
            </p>
          </div>
          <p className="text-sm text-gray-600">
            Tu confianza es nuestro mayor activo. <a href="/transparencia" className="underline hover:text-green-700">Conocé más sobre nuestra gestión transparente.</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerLogosSection;
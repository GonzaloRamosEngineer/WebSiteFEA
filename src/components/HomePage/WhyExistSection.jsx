import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, HeartHandshake } from 'lucide-react';

const WhyExistSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-700 via-purple-700 to-pink-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <HeartHandshake className="w-16 h-16 md:w-20 md:h-20 text-yellow-300 mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight shadow-text-md">
            ¿Por qué existimos?
          </h2>
          <p className="text-5xl md:text-7xl font-bold mb-10 max-w-3xl mx-auto text-yellow-300 shadow-text-lg">
            Porque hay causas que no pueden esperar.
          </p>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            En Fundación Evolución Antoniana, creemos firmemente que cada persona merece la oportunidad de alcanzar su máximo potencial. Actuamos donde la necesidad es urgente, construyendo puentes hacia un futuro más digno y esperanzador para las comunidades vulnerables de Salta.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyExistSection;
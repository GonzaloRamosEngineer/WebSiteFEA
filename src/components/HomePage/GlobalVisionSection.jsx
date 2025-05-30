import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, HeartHandshake as Handshake } from 'lucide-react';

const GlobalVisionSection = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img  
            alt="Mapa del mundo estilizado o red de manos unidas" 
            className="w-full h-full object-cover"
         src="https://images.unsplash.com/photo-1585858229735-cd08d8cb510d" />
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Globe className="w-20 h-20 md:w-28 md:h-28 text-yellow-300 mx-auto mb-8 animate-pulse" />
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight shadow-text-strong">
            Desde Salta al mundo, <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300">
              sembramos presente para transformar futuros.
            </span>
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-gray-200 shadow-text-soft">
            Creemos en el poder de la acción local con visión global. Cada niño educado, cada familia asistida, cada voluntario comprometido, es un paso hacia un mundo más justo y equitativo para todos.
          </p>
          <div className="flex justify-center space-x-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a href="/proyectos-globales" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-indigo-700 bg-white hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl">
                <Users className="mr-2 h-5 w-5" /> Conoce Nuestros Proyectos
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
               <a href="/alianzas" className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-lg text-white hover:bg-white hover:text-indigo-700 transition-colors shadow-lg hover:shadow-xl">
                <Handshake className="mr-2 h-5 w-5" /> Sé un Aliado Estratégico
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalVisionSection;
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowDown, BookOpen, Users } from 'lucide-react';

const HeroSection = React.forwardRef(({ scrollToImpact }, ref) => {
  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white p-4 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <img  
            alt="Collage de imágenes inspiradoras de la fundación: niños sonriendo, voluntarios trabajando, manos entrelazadas" 
            className="w-full h-full object-cover"
         src="https://images.unsplash.com/photo-1622297068586-58e5f9479f1c" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="relative z-10 max-w-3xl"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight shadow-text-strong">
          Donde hay necesidad, <span className="block">creamos soluciones humanas.</span>
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-gray-200 shadow-text-soft">
          Transformamos vidas a través de la educación, el apoyo comunitario y la acción solidaria. Tu ayuda es el motor de este cambio.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255,255,255,0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/colaborar">
              <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-lg px-8 py-4 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <Users className="mr-2 h-5 w-5" /> ¡Súmate Ahora!
              </Button>
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255,255,255,0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Button onClick={scrollToImpact} size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600 font-semibold text-lg px-8 py-4 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <BookOpen className="mr-2 h-5 w-5" /> Conoce Nuestro Impacto
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <ArrowDown className="h-8 w-8 text-white" />
      </motion.div>
    </section>
  );
});

export default HeroSection;
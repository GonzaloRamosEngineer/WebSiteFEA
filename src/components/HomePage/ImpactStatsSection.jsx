import React from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';
import { Users, BookOpen, Heart, CalendarClock } from 'lucide-react';

const stats = [
  { icon: Users, value: 1200, label: "Personas Asistidas", suffix: "+" },
  { icon: BookOpen, value: 250, label: "Jóvenes en Programas Educativos", suffix: "+" },
  { icon: Heart, value: 50, label: "Voluntarios Activos", suffix: "+" },
  { icon: CalendarClock, value: 10, label: "Años de Historia Documentada", suffix: "" },
];

const ImpactStatsSection = React.forwardRef((props, ref) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-b from-white to-sky-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">Nuestro Impacto en Números</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cada cifra representa una historia de cambio y esperanza. Con tu ayuda, podemos seguir creciendo.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white p-6 md:p-8 rounded-xl shadow-2xl hover:shadow-blue-200/50 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center"
            >
              <stat.icon className="w-12 h-12 md:w-16 md:h-16 text-blue-600 mb-4" />
              <div className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-2">
                <AnimatedCounter targetValue={stat.value} duration={2500} />{stat.suffix}
              </div>
              <p className="text-base md:text-lg text-gray-700 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default ImpactStatsSection;
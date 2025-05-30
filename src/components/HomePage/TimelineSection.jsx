import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flag, Users, Award, HeartHandshake as Handshake, Zap, Building2 } from 'lucide-react';

const timelineEvents = [
  {
    year: "2014",
    title: "Nace la Fundación",
    description: "Un grupo de soñadores se une para crear un impacto positivo en Salta.",
    icon: Flag,
    color: "text-red-500",
    bgColor: "bg-red-50"
  },
  {
    year: "2016",
    title: "Primer Proyecto Educativo",
    description: "Lanzamos 'Sembrando Futuro', apoyando a jóvenes en sus estudios.",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  {
    year: "2018",
    title: "Alianza Estratégica",
    description: "Colaboración clave con UNICEF para ampliar nuestro alcance.",
    icon: Handshake,
    color: "text-green-500",
    bgColor: "bg-green-50"
  },
  {
    year: "2020",
    title: "Respuesta COVID-19",
    description: "Adaptamos nuestros programas y brindamos asistencia alimentaria y sanitaria.",
    icon: Zap,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50"
  },
  {
    year: "2022",
    title: "Expansión Regional",
    description: "Llevamos nuestros programas a nuevas comunidades en el interior de Salta.",
    icon: Building2,
    color: "text-purple-500",
    bgColor: "bg-purple-50"
  },
  {
    year: "Hoy",
    title: "Consolidación y Futuro",
    description: "Más de 1200 personas asistidas, 50 voluntarios y la mirada puesta en seguir creciendo.",
    icon: Award,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50"
  },
];

const TimelineSection = () => {
  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-rose-50 to-amber-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-teal-700 mb-4">Nuestra Trayectoria de Impacto</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Un viaje de compromiso, crecimiento y transformación constante.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-1 bg-teal-200 transform -translate-x-1/2"></div>
          
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className={`mb-12 md:mb-8 flex md:items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
            >
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pl-8 md:text-left' : 'md:pr-8 md:text-right'}`}>
                <div className={`p-6 rounded-lg shadow-xl ${event.bgColor} border-l-4 md:border-l-0 ${index % 2 === 0 ? 'md:border-r-4' : 'md:border-l-4'} border-teal-500 hover:shadow-teal-200/60 transition-shadow duration-300`}>
                  <div className={`flex items-center mb-2 ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                     <event.icon className={`w-8 h-8 ${event.color} mr-3 md:hidden`} />
                    <h3 className={`text-2xl font-bold ${event.color}`}>{event.year}</h3>
                  </div>
                  <h4 className="text-xl font-semibold text-teal-800 mb-2">{event.title}</h4>
                  <p className="text-gray-700 leading-relaxed">{event.description}</p>
                </div>
              </div>
              <div className="hidden md:flex w-2/12 items-center justify-center">
                <div className={`w-10 h-10 rounded-full ${event.bgColor} flex items-center justify-center shadow-md border-2 border-teal-400`}>
                  <event.icon className={`w-6 h-6 ${event.color}`} />
                </div>
              </div>
              <div className="hidden md:block w-5/12"></div>
            </motion.div>
          ))}
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-center text-xl text-teal-700 font-semibold mt-12"
        >
          Esto recién empieza. <Link to="/colaborar" className="underline hover:text-teal-900">Sumate hoy y sé parte de nuestra historia.</Link>
        </motion.p>
      </div>
    </section>
  );
};

export default TimelineSection;
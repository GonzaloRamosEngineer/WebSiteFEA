import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Target, Heart, Users, ChevronLeft, ChevronRight, PlayCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';


const testimonialsData = [
  {
    id: "maria-gonzalez",
    quote: "Gracias a los talleres de capacitación, pude conseguir mi primer empleo formal y mejorar la calidad de vida de mi familia. La fundación me dio las herramientas y la confianza que necesitaba.",
    name: "María González",
    role: "Beneficiaria del Programa de Empleo",
    image: "Una mujer sonriendo con confianza, representando a María González",
    type: "text"
  },
  {
    id: "carlos-rodriguez",
    quote: "Ser voluntario en la Fundación me ha permitido crecer como persona y contribuir a construir una sociedad más justa. Cada sonrisa que recibo es una recompensa invaluable.",
    name: "Carlos Rodríguez",
    role: "Voluntario Comprometido",
    image: "Un hombre joven ayudando en una actividad comunitaria, representando a Carlos Rodríguez",
    type: "video"
  },
  {
    id: "laura-martinez",
    quote: "El apoyo escolar que reciben mis hijos ha sido fundamental para su desarrollo académico y personal. Ahora tienen más oportunidades y un futuro más brillante gracias a la fundación.",
    name: "Laura Martínez",
    role: "Madre de Beneficiarios del Programa Educativo",
    image: "Una madre con sus hijos estudiando alegremente, representando a Laura Martínez",
    type: "audio"
  },
  {
    id: "elena-vargas",
    quote: "La fundación no solo me brindó asistencia material en un momento difícil, sino que también me ofreció contención y esperanza. Estoy eternamente agradecida.",
    name: "Elena Vargas",
    role: "Beneficiaria de Asistencia Social",
    image: "Una mujer mayor sonriendo con gratitud, representando a Elena Vargas",
    type: "text"
  }
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const currentTestimonial = testimonialsData[currentIndex];

  const handleReadMore = (storyId) => {
    navigate(`/quienes-somos#historia-${storyId}`); 
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-10 shadow-xl card-hover overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex flex-col md:flex-row items-center md:items-start"
        >
          <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8 text-center">
            <img-replace className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto object-cover shadow-lg border-4 border-white" alt={currentTestimonial.image} />
             {currentTestimonial.type === 'video' && (
                <div className="mt-3 flex justify-center">
                    <PlayCircle className="h-8 w-8 text-blue-600 cursor-pointer hover:text-blue-700 transition-colors" onClick={() => alert("Reproducir video (simulado)")}/>
                </div>
            )}
            {currentTestimonial.type === 'audio' && (
                <div className="mt-3 flex justify-center">
                     <Users className="h-8 w-8 text-blue-600 cursor-pointer hover:text-blue-700 transition-colors" onClick={() => alert("Reproducir audio (simulado)")}/>
                </div>
            )}
          </div>
          <div className="text-center md:text-left">
             <div className="mb-4 text-blue-600 flex justify-center md:justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
              </svg>
            </div>
            <p className="text-gray-700 mb-6 italic text-lg md:text-xl leading-relaxed">"{currentTestimonial.quote}"</p>
            <div className="mb-5">
              <p className="font-bold text-gray-800 text-xl">{currentTestimonial.name}</p>
              <p className="text-blue-600 text-md font-medium">{currentTestimonial.role}</p>
            </div>
            <Button 
              onClick={() => handleReadMore(currentTestimonial.id)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Leer más <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
      <button
        onClick={prevTestimonial}
        className="absolute -left-3 md:-left-5 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Testimonio anterior"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextTestimonial}
        className="absolute -right-3 md:-right-5 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Siguiente testimonio"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};


const AboutPage = () => {
  return (
    <div className="pt-20 md:pt-24 bg-gray-50">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Quiénes Somos</h1>
              <p className="text-xl md:text-2xl leading-relaxed">
                Conoce nuestra historia, la pasión que nos mueve y el impacto que generamos día a día en Salta y más allá.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">Nuestra Historia de Impacto</h2>
              <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                La Fundación Evolución Antoniana nació en 2014 del sueño compartido de un grupo de profesionales y ciudadanos salteños comprometidos con el desarrollo social y humano de nuestra provincia. Identificamos necesidades urgentes y decidimos actuar, creando una organización sólida y transparente para canalizar la solidaridad en soluciones efectivas.
              </p>
              <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                A lo largo de una década, hemos crecido exponencialmente, no solo en el alcance de nuestros programas, sino en la profundidad del impacto que generamos. Desde nuestros humildes comienzos, hemos beneficiado a miles de personas, fortaleciendo comunidades y promoviendo la igualdad de oportunidades.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Hoy, somos un referente en Salta y la región, reconocidos por nuestra capacidad de innovación social, nuestra gestión eficiente y, sobre todo, por el compromiso inquebrantable con aquellos que más nos necesitan.
              </p>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img-replace className="w-full h-auto object-cover" alt="Fotografía inspiradora del equipo de la Fundación Evolución Antoniana trabajando en un proyecto comunitario en Salta" src="https://images.unsplash.com/photo-1517048676732-d65bc937f952" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Misión, Visión y Valores */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Nuestros Pilares Fundamentales</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              La brújula que guía cada una de nuestras acciones y decisiones, reflejando nuestro compromiso con la excelencia y la humanidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-white rounded-xl p-8 shadow-xl card-hover border-t-4 border-blue-500"
            >
              <div className="mb-5 text-blue-600">
                <Target className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Misión</h3>
              <p className="text-gray-600 leading-relaxed">
                Impulsar el desarrollo humano integral y sostenible en Salta y la región, a través de programas innovadores en educación, salud, y desarrollo comunitario, empoderando a individuos y comunidades para que alcancen su máximo potencial.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="bg-white rounded-xl p-8 shadow-xl card-hover border-t-4 border-green-500"
            >
              <div className="mb-5 text-green-600">
                <Award className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Visión</h3>
              <p className="text-gray-600 leading-relaxed">
                Ser una fundación líder y referente a nivel nacional e internacional por la excelencia e impacto de sus programas, reconocida por su transparencia, sostenibilidad y capacidad de generar alianzas estratégicas para construir una sociedad más justa, equitativa e inclusiva.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="bg-white rounded-xl p-8 shadow-xl card-hover border-t-4 border-red-500"
            >
              <div className="mb-5 text-red-600">
                <Heart className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Valores</h3>
              <ul className="text-gray-600 space-y-2 leading-relaxed">
                <li><strong className="text-gray-700">Compromiso:</strong> Con las personas y sus realidades.</li>
                <li><strong className="text-gray-700">Solidaridad:</strong> Motor de nuestras acciones.</li>
                <li><strong className="text-gray-700">Transparencia:</strong> En cada proceso y recurso.</li>
                <li><strong className="text-gray-700">Profesionalismo:</strong> Buscando la excelencia.</li>
                <li><strong className="text-gray-700">Respeto:</strong> Por la diversidad y la dignidad.</li>
                <li><strong className="text-gray-700">Colaboración:</strong> Juntos llegamos más lejos.</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Sección Testimonial Animada */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Voces que Inspiran y Transforman</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              El corazón de nuestra fundación late en las historias de quienes hemos acompañado y en aquellos que se suman a nuestra causa.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
             <TestimonialCarousel />
          </div>
        </div>
      </section>


      {/* Equipo */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Nuestro Equipo Humano</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Profesionales apasionados y voluntarios comprometidos que hacen posible nuestra labor cada día.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Dra. Ana Martínez",
                role: "Presidenta y Fundadora",
                bio: "Médica pediatra con vocación social. Lidera la visión estratégica y las alianzas institucionales.",
                imageAlt: "Retrato profesional de Dra. Ana Martínez, Presidenta y Fundadora"
              },
              {
                name: "Lic. Carlos Rodríguez",
                role: "Director Ejecutivo",
                bio: "Sociólogo especializado en gestión de ONGs. Coordina la ejecución de programas y la administración.",
                imageAlt: "Retrato profesional de Lic. Carlos Rodríguez, Director Ejecutivo"
              },
              {
                name: "Mg. Laura Gómez",
                role: "Coordinadora de Programas",
                bio: "Magíster en Desarrollo Social. Diseña y supervisa los proyectos educativos y comunitarios.",
                imageAlt: "Retrato profesional de Mg. Laura Gómez, Coordinadora de Programas"
              },
              {
                name: "Sr. Martín López",
                role: "Responsable de Voluntariado",
                bio: "Emprendedor social con gran carisma. Moviliza y acompaña a nuestra red de voluntarios.",
                imageAlt: "Retrato profesional de Sr. Martín López, Responsable de Voluntariado"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="bg-white rounded-xl overflow-hidden shadow-lg card-hover flex flex-col"
              >
                <div className="h-72 overflow-hidden">
                  <img-replace className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" alt={member.imageAlt} src="https://images.unsplash.com/photo-1542957057-debadce4ce81" />
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold mb-1 text-gray-800">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reconocimientos y Transparencia */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Compromiso con la Excelencia</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Nuestra labor es reconocida y auditada, garantizando la transparencia y el uso eficiente de cada recurso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
             <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
             >
                <h3 className="text-2xl font-semibold mb-6 text-gray-700">Reconocimientos Destacados</h3>
                <div className="space-y-6">
                {[
                  { year: "2023", title: "Premio Nacional a la Innovación Social", org: "Presidencia de la Nación" },
                  { year: "2021", title: "Sello de Buenas Prácticas ONG", org: "Red de Fundaciones de Salta" },
                  { year: "2019", title: "Reconocimiento al Impacto Comunitario", org: "Gobierno de la Provincia de Salta" },
                ].map((award, index) => (
                  <div key={index} className="flex items-start p-4 bg-slate-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <Award className="h-8 w-8 text-blue-500 mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <span className="block text-xs text-blue-600 font-semibold">{award.year}</span>
                      <h4 className="text-lg font-bold text-gray-800">{award.title}</h4>
                      <p className="text-sm text-gray-600">{award.org}</p>
                    </div>
                  </div>
                ))}
                </div>
             </motion.div>
             <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay:0.15, ease: "easeOut" }}
             >
                <h3 className="text-2xl font-semibold mb-6 text-gray-700">Nuestros Aliados Estratégicos</h3>
                <div className="grid grid-cols-2 gap-6 items-center mb-8">
                  {[
                    { name: "Ministerio de Desarrollo Social (Nacional)", image: "Logo Ministerio Desarrollo Social", id: "mds-logo" },
                    { name: "UNICEF Argentina", image: "Logo UNICEF", id: "unicef-logo" },
                    { name: "Fundación Nobleza Obliga", image: "Logo Nobleza Obliga", id: "nobleza-logo" },
                    { name: "Banco de Alimentos Salta", image: "Logo Banco de Alimentos Salta", id: "banco-alimentos-logo" },
                  ].map(logo => (
                    <div key={logo.id} title={logo.name} className="flex justify-center p-3 bg-gray-100 rounded-md">
                       <img-replace className="h-12 md:h-16 object-contain grayscale hover:grayscale-0 transition-all duration-300" alt={logo.image} />
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 p-6 rounded-lg shadow-inner border-l-4 border-blue-500">
                    <ShieldCheck className="h-10 w-10 text-blue-600 mb-3" />
                    <h4 className="text-xl font-bold text-gray-800 mb-2">Transparencia Total</h4>
                    <p className="text-gray-700 leading-relaxed">Publicamos anualmente nuestro balance y memorias auditadas. Creemos firmemente en la rendición de cuentas como pilar de la confianza.</p>
                    <Link to="/transparencia" className="text-blue-600 hover:text-blue-800 font-semibold mt-3 inline-block transition-colors">
                        Conocer más sobre nuestra transparencia <ArrowRight className="inline h-4 w-4 ml-1" />
                    </Link>
                </div>
             </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
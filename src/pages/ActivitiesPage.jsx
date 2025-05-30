
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, BookOpen, Heart, ShoppingBag, Utensils, Home, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ActivitiesPage = () => {
  return (
    <div className="pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Nuestras Actividades</h1>
              <p className="text-xl">
                Conoce los programas y proyectos que desarrollamos para contribuir al bienestar de nuestra comunidad.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programas Principales */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Programas Principales</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nuestros programas están diseñados para abordar las necesidades más urgentes de la comunidad y generar un impacto positivo y duradero.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                icon: <BookOpen className="h-12 w-12 text-blue-600" />,
                title: "Educación para el Futuro",
                description: "Programa de apoyo escolar y becas para niños y jóvenes de bajos recursos, que busca prevenir la deserción escolar y promover la continuidad educativa.",
                activities: [
                  "Apoyo escolar para niños de primaria y secundaria",
                  "Becas para estudiantes destacados",
                  "Talleres de orientación vocacional",
                  "Cursos de alfabetización digital"
                ],
                image: "Niños estudiando en un aula con voluntarios ayudándoles"
              },
              {
                icon: <Heart className="h-12 w-12 text-blue-600" />,
                title: "Salud Comunitaria",
                description: "Iniciativas orientadas a mejorar el acceso a servicios de salud preventiva y promover hábitos saludables en la comunidad.",
                activities: [
                  "Jornadas de prevención y detección temprana",
                  "Talleres de nutrición y alimentación saludable",
                  "Campañas de vacunación",
                  "Atención primaria en zonas vulnerables"
                ],
                image: "Profesionales de la salud atendiendo a personas en una jornada comunitaria"
              },
              {
                icon: <ShoppingBag className="h-12 w-12 text-blue-600" />,
                title: "Emprendimiento Social",
                description: "Programa que busca fomentar el desarrollo de emprendimientos sostenibles como herramienta de inclusión económica y social.",
                activities: [
                  "Capacitación en gestión de microemprendimientos",
                  "Asesoramiento técnico y comercial",
                  "Microcréditos para emprendedores",
                  "Ferias de economía solidaria"
                ],
                image: "Grupo de emprendedores mostrando sus productos en un stand"
              },
              {
                icon: <Utensils className="h-12 w-12 text-blue-600" />,
                title: "Seguridad Alimentaria",
                description: "Iniciativas destinadas a garantizar el acceso a una alimentación adecuada para familias en situación de vulnerabilidad.",
                activities: [
                  "Comedores comunitarios",
                  "Entrega de bolsones de alimentos",
                  "Huertas comunitarias",
                  "Talleres de cocina económica y nutritiva"
                ],
                image: "Voluntarios preparando y distribuyendo alimentos en un comedor comunitario"
              }
            ].map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100"
              >
                <div className="h-64 overflow-hidden">
                  <img  className="w-full h-full object-cover" alt={`Programa ${program.title}`} src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
                </div>
                <div className="p-8">
                  <div className="mb-4">{program.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{program.title}</h3>
                  <p className="text-gray-600 mb-6">{program.description}</p>
                  <h4 className="font-bold text-blue-600 mb-3">Actividades:</h4>
                  <ul className="space-y-2 mb-6">
                    {program.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-700">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendario de Actividades */}
      <section className="py-16 md:py-24 section-gradient">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Próximas Actividades</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Te invitamos a participar en nuestras próximas actividades y ser parte del cambio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                date: "15 de Junio, 2025",
                title: "Jornada de Salud Comunitaria",
                location: "Plaza Central",
                description: "Controles médicos gratuitos, vacunación y charlas sobre prevención de enfermedades.",
                icon: <Calendar className="h-5 w-5 text-blue-600" />
              },
              {
                date: "22 de Junio, 2025",
                title: "Taller de Emprendimiento",
                location: "Sede de la Fundación",
                description: "Capacitación sobre cómo iniciar y gestionar un microemprendimiento sostenible.",
                icon: <Briefcase className="h-5 w-5 text-blue-600" />
              },
              {
                date: "1 de Julio, 2025",
                title: "Campaña de Recolección de Útiles Escolares",
                location: "Varios puntos de la ciudad",
                description: "Recolección de materiales escolares para niños de bajos recursos.",
                icon: <BookOpen className="h-5 w-5 text-blue-600" />
              },
              {
                date: "10 de Julio, 2025",
                title: "Feria de Economía Solidaria",
                location: "Parque Municipal",
                description: "Exposición y venta de productos elaborados por emprendedores locales.",
                icon: <ShoppingBag className="h-5 w-5 text-blue-600" />
              },
              {
                date: "18 de Julio, 2025",
                title: "Jornada de Construcción de Viviendas",
                location: "Barrio El Progreso",
                description: "Trabajo voluntario para la construcción de viviendas de emergencia.",
                icon: <Home className="h-5 w-5 text-blue-600" />
              },
              {
                date: "25 de Julio, 2025",
                title: "Encuentro de Voluntarios",
                location: "Sede de la Fundación",
                description: "Reunión para compartir experiencias y planificar futuras actividades.",
                icon: <Users className="h-5 w-5 text-blue-600" />
              }
            ].map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md card-hover"
              >
                <div className="flex items-center mb-4">
                  {event.icon}
                  <span className="ml-2 text-sm font-medium text-blue-600">{event.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <div className="flex items-center mb-4 text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{event.location}</span>
                </div>
                <p className="text-gray-600 mb-6">{event.description}</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Inscribirme
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería de Fotos */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Galería de Actividades</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Imágenes que reflejan nuestro trabajo y el impacto que generamos en la comunidad.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Voluntarios construyendo viviendas en un barrio vulnerable",
              "Niños participando en actividades educativas con voluntarios",
              "Entrega de alimentos a familias necesitadas",
              "Taller de capacitación para emprendedores locales",
              "Jornada de salud comunitaria con profesionales voluntarios",
              "Celebración comunitaria con beneficiarios del programa"
            ].map((description, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="overflow-hidden rounded-lg shadow-md"
              >
                <img  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300" alt={description} src="https://images.unsplash.com/photo-1515435187718-b41654581592" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 hero-gradient text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Quieres participar en nuestras actividades?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Tu tiempo y habilidades pueden marcar la diferencia. Únete a nuestro equipo de voluntarios.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/colaborar">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-3">
                  Ser voluntario
                </Button>
              </Link>
              <Link to="/contacto">
                <Button className="bg-blue-800 hover:bg-blue-900 text-white font-bold px-8 py-3">
                  Contactarnos
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Añadir el componente MapPin que faltaba
const MapPin = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
};

export default ActivitiesPage;

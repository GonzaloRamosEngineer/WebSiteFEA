
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Gift, Briefcase, Clock, Check, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';

const CollaborationOptions = () => {
  const options = [
    {
      icon: <Users className="h-12 w-12 text-blue-600" />,
      title: "Voluntariado",
      description: "Dona tu tiempo y habilidades participando en nuestros programas y actividades.",
      cta: "Ser voluntario",
      link: "#voluntariado"
    },
    {
      icon: <Gift className="h-12 w-12 text-blue-600" />,
      title: "Donaciones",
      description: "Realiza una contribución económica para apoyar nuestros programas y proyectos.",
      cta: "Donar ahora",
      link: "/donar"
    },
    {
      icon: <Briefcase className="h-12 w-12 text-blue-600" />,
      title: "Alianzas Corporativas",
      description: "Establece una alianza estratégica entre tu empresa y nuestra fundación.",
      cta: "Formar alianza",
      link: "#alianzas"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Formas de Colaborar</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Cada aporte, sin importar su tamaño, es valioso para nuestra misión. Conoce las diferentes maneras en que puedes colaborar.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-8 shadow-lg border border-gray-100 card-hover"
            >
              <div className="mb-6 flex justify-center">{option.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-center">{option.title}</h3>
              <p className="text-gray-600 mb-6 text-center leading-relaxed">{option.description}</p>
              <Link to={option.link} className="block w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  {option.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VolunteerForm = () => {
  const { toast } = useToast();
  const { userProfile } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    area_interes: '',
    disponibilidad: '',
    mensaje: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setFormData(prev => ({
        ...prev,
        nombre: userProfile.nombre?.split(' ')[0] || '',
        apellido: userProfile.nombre?.split(' ').slice(1).join(' ') || '',
        email: userProfile.email || '',
        telefono: userProfile.telefono || ''
      }));
    }
  }, [userProfile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await supabase.from('colaboradores').insert([
      { 
        nombre: `${formData.nombre} ${formData.apellido}`,
        email: formData.email,
        telefono: formData.telefono,
        tipo_colaboracion: 'voluntariado',
        area_interes: formData.area_interes,
        disponibilidad: formData.disponibilidad,
        mensaje: formData.mensaje,
      }
    ]);

    if (error) {
      toast({ title: "Error al enviar solicitud", description: error.message, variant: "destructive" });
      await supabase.from('logs').insert({
        user_id: userProfile?.id,
        tipo_evento: 'error_form_voluntariado',
        descripcion: `Error enviando formulario de voluntariado para ${formData.email}: ${error.message}`
      });
    } else {
      toast({ title: "Solicitud enviada", description: "Gracias por tu interés en ser voluntario. Nos pondremos en contacto contigo pronto." });
      setFormData({ nombre: '', apellido: '', email: '', telefono: '', area_interes: '', disponibilidad: '', mensaje: '' });
      await supabase.from('logs').insert({
        user_id: userProfile?.id,
        tipo_evento: 'form_voluntariado_enviado',
        descripcion: `Formulario de voluntariado enviado por ${formData.email}`
      });
    }
    setIsLoading(false);
  };


  return (
     <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
      <h3 className="text-xl font-bold mb-4 text-blue-600">Formulario de Inscripción Voluntariado</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
          <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido" required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
        </div>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
        <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
        <select name="area_interes" value={formData.area_interes} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-gray-500">
          <option value="">Selecciona área de interés</option>
          <option value="educacion">Apoyo educativo</option>
          <option value="salud">Salud comunitaria</option>
          <option value="construccion">Construcción</option>
          <option value="administrativo">Administrativo</option>
          <option value="eventos">Eventos</option>
          <option value="otro">Otro</option>
        </select>
        <select name="disponibilidad" value={formData.disponibilidad} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-gray-500">
          <option value="">Selecciona disponibilidad</option>
          <option value="semanal_pocas_horas">Semanal (hasta 4 horas)</option>
          <option value="semanal_muchas_horas">Semanal (más de 4 horas)</option>
          <option value="quincenal">Quincenal</option>
          <option value="mensual">Mensual</option>
          <option value="eventos_especiales">Solo eventos especiales</option>
        </select>
        <textarea name="mensaje" value={formData.mensaje} onChange={handleChange} placeholder="Cuéntanos un poco sobre ti y tu motivación (opcional)" className="w-full p-3 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-blue-500"></textarea>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-3" disabled={isLoading}>
           {isLoading ? 'Enviando...' : <> <Send className="mr-2 h-5 w-5" /> Enviar solicitud </>}
        </Button>
      </form>
    </div>
  );
};


const VolunteerSection = () => {
  const volunteerAreas = [
    "Apoyo educativo: tutorías, talleres, actividades recreativas",
    "Salud comunitaria: campañas de prevención, jornadas de atención",
    "Construcción: mejoramiento de viviendas, infraestructura comunitaria",
    "Administrativo: apoyo en tareas de oficina, comunicación, eventos"
  ];
  const volunteerSteps = [
    "Completa el formulario de inscripción",
    "Asiste a la entrevista y sesión informativa",
    "Participa en la capacitación inicial",
    "¡Comienza tu experiencia como voluntario!"
  ];

  return (
    <section id="voluntariado" className="py-16 md:py-24 section-gradient">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-600">Programa de Voluntariado</h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Nuestros voluntarios son el corazón de la Fundación. Su compromiso y dedicación hacen posible que podamos llegar a más personas y generar un mayor impacto en la comunidad.
            </p>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Como voluntario, podrás participar en diferentes programas y actividades según tus intereses, habilidades y disponibilidad de tiempo. Recibirás capacitación y acompañamiento durante todo el proceso.
            </p>
            
            <h3 className="text-xl font-bold mb-4">Áreas de Voluntariado:</h3>
            <ul className="space-y-3 mb-8">
              {volunteerAreas.map((area, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 leading-relaxed">{area}</span>
                </li>
              ))}
            </ul>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-xl font-bold mb-4">¿Cómo convertirte en voluntario?</h3>
              <ol className="space-y-3">
                {volunteerSteps.map((step, index) => (
                   <li key={index} className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 font-semibold">{index + 1}</span>
                    <span className="text-gray-700 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="rounded-lg overflow-hidden shadow-xl mb-8">
              <img-replace className="w-full h-auto object-cover" alt="Grupo de voluntarios sonrientes de la Fundación Evolución Antoniana participando en una actividad comunitaria" src="https://images.unsplash.com/photo-1682009562551-419cbd18091b" />
            </div>
            <VolunteerForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const DonationsSection = () => {
  const donationDistribution = [
    { percentage: "40%", title: "Programas Educativos", description: "Apoyo escolar, becas, materiales y capacitaciones." },
    { percentage: "25%", title: "Asistencia Alimentaria", description: "Comedores y entrega de alimentos." },
    { percentage: "20%", title: "Salud Comunitaria", description: "Campañas de prevención, atención y medicamentos." },
    { percentage: "15%", title: "Infraestructura y Logística", description: "Mantenimiento y gastos operativos." }
  ];

  return (
     <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Donaciones</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Tu aporte económico nos permite continuar y expandir nuestros programas, llegando a más personas que necesitan apoyo.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg p-8 shadow-lg border border-gray-100"
            >
              <h3 className="text-2xl font-bold mb-6 text-blue-600">¿A dónde van tus donaciones?</h3>
              <div className="space-y-6">
                {donationDistribution.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-blue-600 text-white font-bold rounded-md px-3 py-1 mr-4 flex-shrink-0">
                      {item.percentage}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Transparencia:</strong> Publicamos informes anuales detallando el uso de los fondos recibidos y el impacto generado.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg p-8 shadow-lg border border-gray-100"
            >
              <h3 className="text-2xl font-bold mb-6 text-blue-600">Opciones de Donación</h3>
              <div className="space-y-6">
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 card-hover">
                  <h4 className="font-bold text-lg mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-600" />Donación Única
                  </h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">Realiza una contribución por única vez del monto que desees.</p>
                  <Link to="/donar"><Button className="w-full bg-blue-600 hover:bg-blue-700">Donar ahora</Button></Link>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 card-hover">
                  <h4 className="font-bold text-lg mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-600" />Donación Mensual
                  </h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">Conviértete en donante recurrente y apoya nuestros programas de manera sostenida.</p>
                  <Link to="/donar"><Button className="w-full bg-blue-600 hover:bg-blue-700">Ser donante mensual</Button></Link>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 card-hover">
                  <h4 className="font-bold text-lg mb-4">Otras formas de donar</h4>
                  <ul className="space-y-2 text-gray-600">
                    {["Transferencia bancaria", "Donación de materiales", "Legados y testamentos"].map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" /><span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <Link to="/contacto" className="text-blue-600 font-medium hover:underline">Contacta con nosotros para más información</Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
  );
};

const CorporateAlliancesSection = () => {
  const allianceOptions = [
    {
      title: "Responsabilidad Social Empresarial",
      description: "Desarrolla programas de RSE alineados con nuestra misión, generando un impacto positivo.",
      benefits: ["Mejora de imagen corporativa", "Vínculo con la comunidad", "Desarrollo de colaboradores"]
    },
    {
      title: "Patrocinio de Programas",
      description: "Financia total o parcialmente nuestros programas, contribuyendo a su sostenibilidad.",
      benefits: ["Visibilidad de marca", "Informes de impacto", "Participación en eventos"]
    },
    {
      title: "Voluntariado Corporativo",
      description: "Involucra a tus colaboradores en actividades de voluntariado, fortaleciendo el equipo.",
      benefits: ["Fortalecimiento del clima laboral", "Desarrollo de habilidades blandas", "Experiencias significativas"]
    }
  ];
  return (
    <section id="alianzas" className="py-16 md:py-24 section-gradient">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Alianzas Corporativas</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Invitamos a empresas y organizaciones a sumarse a nuestra causa a través de diferentes modalidades de colaboración.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allianceOptions.map((alliance, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-8 shadow-lg border border-gray-100 card-hover"
            >
              <h3 className="text-xl font-bold mb-4 text-blue-600">{alliance.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{alliance.description}</p>
              <h4 className="font-bold mb-3">Beneficios:</h4>
              <ul className="space-y-2 mb-6">
                {alliance.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contacto?asunto=alianza_corporativa" className="block w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Solicitar información</Button>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-center">Empresas que confían en nosotros</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
                className="flex justify-center"
              >
                <img-replace className="max-h-16 grayscale hover:grayscale-0 transition-all duration-300" alt={`Logo de empresa colaboradora ${item}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


const CollaboratePage = () => {
  return (
    <div className="pt-0"> {/* Remove pt-24 md:pt-32 */}
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Cómo Colaborar</h1>
              <p className="text-xl leading-relaxed">
                Existen muchas formas de sumarte a nuestra causa y contribuir a generar un impacto positivo en la comunidad.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <CollaborationOptions />
      <VolunteerSection />
      <DonationsSection />
      <CorporateAlliancesSection />

      <section className="py-16 md:py-24 hero-gradient text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Tienes dudas sobre cómo colaborar?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Nuestro equipo está disponible para brindarte toda la información que necesites y encontrar la mejor forma de colaboración.
            </p>
            <Link to="/contacto">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-3 text-lg">
                Contáctanos
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CollaboratePage;

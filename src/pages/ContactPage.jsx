
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'react-router-dom';

const ContactPage = () => {
  const { toast } = useToast();
  const { userProfile } = useAuth();
  const location = useLocation();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
    acepta_politica: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setFormData(prev => ({
        ...prev,
        nombre: userProfile.nombre?.split(' ')[0] || '',
        apellido: userProfile.nombre?.split(' ').slice(1).join(' ') || '',
        email: userProfile.email || '',
        telefono: userProfile.telefono || '',
      }));
    }
    const queryParams = new URLSearchParams(location.search);
    const asuntoParam = queryParams.get('asunto');
    if (asuntoParam) {
      setFormData(prev => ({ ...prev, asunto: asuntoParam }));
    }

  }, [userProfile, location.search]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.acepta_politica) {
      toast({ title: "Política de privacidad", description: "Debes aceptar la política de privacidad.", variant: "destructive" });
      setIsLoading(false);
      return;
    }
    
    const { data, error } = await supabase.from('contactos').insert([
      { 
        nombre: `${formData.nombre} ${formData.apellido}`,
        email: formData.email,
        telefono: formData.telefono,
        asunto: formData.asunto,
        mensaje: formData.mensaje,
      }
    ]);

    if (error) {
      toast({ title: "Error al enviar mensaje", description: error.message, variant: "destructive" });
      await supabase.from('logs').insert({
        user_id: userProfile?.id,
        tipo_evento: 'error_form_contacto',
        descripcion: `Error enviando formulario de contacto para ${formData.email}: ${error.message}`
      });
    } else {
      toast({ title: "Mensaje enviado", description: "Gracias por contactarnos. Te responderemos a la brevedad." });
      setFormData({ nombre: '', apellido: '', email: '', telefono: '', asunto: '', mensaje: '', acepta_politica: false });
       await supabase.from('logs').insert({
        user_id: userProfile?.id,
        tipo_evento: 'form_contacto_enviado',
        descripcion: `Formulario de contacto enviado por ${formData.email}`
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="pt-0"> {/* Removed pt-24 md:pt-32 */}
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contacto</h1>
              <p className="text-xl">
                Estamos aquí para responder tus preguntas y escuchar tus inquietudes. No dudes en ponerte en contacto con nosotros.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Información de Contacto y Formulario */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-blue-600">Información de Contacto</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Dirección</h3>
                    <p className="text-gray-600">Av. Siempreviva 742</p>
                    <p className="text-gray-600">Salta, Argentina</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Teléfono</h3>
                    <p className="text-gray-600">+54 9 387 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-gray-600">info@fundacionevolucionantoniana.org</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Horario de Atención</h3>
                    <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="font-bold text-lg mb-4">Síguenos en redes sociales</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors" aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors" aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-100">
                <h2 className="text-3xl font-bold mb-6 text-blue-600">Envíanos un mensaje</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                      <input 
                        type="text" name="nombre" value={formData.nombre} onChange={handleChange}
                        required 
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                      <input 
                        type="text" name="apellido" value={formData.apellido} onChange={handleChange}
                        required 
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" name="email" value={formData.email} onChange={handleChange}
                      required 
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono (opcional)</label>
                    <input 
                      type="tel" name="telefono" value={formData.telefono} onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Asunto</label>
                    <select name="asunto" value={formData.asunto} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-700">
                      <option value="">Selecciona una opción</option>
                      <option value="info_general">Información general</option>
                      <option value="voluntariado">Voluntariado</option>
                      <option value="donaciones">Donaciones</option>
                      <option value="alianza_corporativa">Alianzas corporativas</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                    <textarea 
                      name="mensaje" value={formData.mensaje} onChange={handleChange}
                      required 
                      rows="5" 
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    ></textarea>
                  </div>
                  
                  <div className="flex items-start">
                    <input 
                      type="checkbox" name="acepta_politica" checked={formData.acepta_politica} onChange={handleChange}
                      id="privacy" 
                      required 
                      className="mt-1 mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-600">
                      Acepto la política de privacidad y el tratamiento de mis datos personales.
                    </label>
                  </div>
                  
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-3 flex items-center justify-center" disabled={isLoading}>
                     {isLoading ? 'Enviando...' : <><Send className="mr-2 h-5 w-5" /> Enviar mensaje</>}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="py-16 md:py-24 section-gradient">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestra Ubicación</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Te esperamos en nuestra sede para conocernos personalmente y brindarte toda la información que necesites.
            </p>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-xl">
            <iframe 
              src="https://www.openstreetmap.org/export/embed.html?bbox=-65.4159%2C-24.7941%2C-65.4059%2C-24.7841&amp;layer=mapnik"
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de ubicación de la Fundación Evolución Antoniana en Salta"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

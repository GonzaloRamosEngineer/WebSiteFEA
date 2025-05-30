
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Check, CreditCard, Calendar, DollarSign, Users, Gift, Briefcase, Info, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Slider } from '@/components/ui/slider';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';

const donationImpacts = [
  { amount: 500, description: "Proporcionas materiales escolares para un niño durante un mes." },
  { amount: 1000, description: "Garantizas 10 comidas nutritivas en nuestros comedores." },
  { amount: 2500, description: "Financias un taller de capacitación para 5 emprendedores." },
  { amount: 5000, description: "Cubre gastos médicos básicos de una familia por un mes." },
  { amount: 10000, description: "Ayudas a equipar un aula con recursos tecnológicos." }
];

const DonatePage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();

  const [donationType, setDonationType] = useState('unica');
  const [selectedAmount, setSelectedAmount] = useState(donationImpacts[1].amount);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('mercadopago');
  const [currentImpact, setCurrentImpact] = useState(donationImpacts[1].description);

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && userProfile) {
      setNombre(userProfile.nombre?.split(' ')[0] || '');
      setApellido(userProfile.nombre?.split(' ').slice(1).join(' ') || '');
      setEmail(userProfile.email || '');
      setTelefono(userProfile.telefono || '');
    }
  }, [user, userProfile]);

  const handleSliderChange = (value) => {
    const newAmount = value[0];
    setSelectedAmount(newAmount);
    updateImpactDescription(newAmount);
    setCustomAmount(''); 
  };

  const updateImpactDescription = (amount) => {
    let closestImpact = donationImpacts[0];
    for (let i = 0; i < donationImpacts.length; i++) {
      if (amount >= donationImpacts[i].amount) {
        closestImpact = donationImpacts[i];
      } else {
        break;
      }
    }
    setCurrentImpact(closestImpact.description);
  };
  
  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value && !isNaN(parseFloat(value))) {
      setSelectedAmount(parseFloat(value));
      updateImpactDescription(parseFloat(value));
    } else if (!value) {
      setSelectedAmount(donationImpacts[0].amount); 
      updateImpactDescription(donationImpacts[0].amount);
    }
  };

  useEffect(() => {
    updateImpactDescription(selectedAmount);
  }, []);

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let finalAmount = selectedAmount;
    if (customAmount && !isNaN(parseFloat(customAmount))) {
      finalAmount = parseFloat(customAmount);
    }

    if (finalAmount < 100) {
       toast({
        title: "Monto Inválido",
        description: "Por favor, ingresa un monto de donación válido (mínimo $100 ARS).",
        variant: "destructive",
        duration: 5000,
      });
      setIsLoading(false);
      return;
    }

    if (!termsAccepted) {
      toast({
        title: "Términos y Condiciones",
        description: "Debes aceptar los términos y condiciones para continuar.",
        variant: "destructive",
        duration: 5000,
      });
      setIsLoading(false);
      return;
    }
    
    // Aquí iría la lógica de MercadoPago. Por ahora, simulamos el éxito.
    // En una implementación real, después del pago exitoso de MercadoPago, se llamaría a recordDonation.
    // const paymentResult = await processPaymentWithMercadoPago(finalAmount, { nombre, apellido, email });

    // if (paymentResult.success) {
    // const numeroOperacion = paymentResult.operationId; // Obtenido de MercadoPago
    const numeroOperacion = `MP-${Date.now()}`; // Simulación
    
    await recordDonation(finalAmount, nombre, email, telefono, numeroOperacion);

    toast({
      title: "¡Gracias por tu donación!",
      description: `Tu generosidad de $${finalAmount.toLocaleString('es-AR')} ARS nos ayuda a seguir con nuestra misión.`,
      duration: 7000,
    });

    // Log event
    if (user && userProfile) {
      await supabase.from('logs').insert({ 
        user_id: userProfile.id, 
        tipo_evento: 'donacion_registrada', 
        descripcion: `Usuario ${userProfile.email} realizó donación de $${finalAmount}.`
      });
    } else {
       await supabase.from('logs').insert({ 
        tipo_evento: 'donacion_anonima_registrada', 
        descripcion: `Donación anónima de $${finalAmount} por ${email}.`
      });
    }

    navigate('/donar/exito', { state: { amount: finalAmount, isAnonymous: !user } });
    // } else {
    //   toast({ title: "Error en el pago", description: paymentResult.message, variant: "destructive" });
    //   navigate('/donar/error');
    // }

    setIsLoading(false);
  };

  const recordDonation = async (amount, donorName, donorEmail, donorPhone, operationId) => {
    const donationData = {
      monto: amount,
      nombre_donante: donorName,
      email_donante: donorEmail,
      telefono_donante: donorPhone || null,
      metodo_pago: paymentMethod,
      numero_operacion: operationId,
      user_id: user && userProfile ? userProfile.id : null,
    };

    const { error } = await supabase.from('donaciones').insert(donationData);

    if (error) {
      console.error("Error al registrar donación:", error);
      toast({ title: "Error", description: "No se pudo registrar tu donación en nuestro sistema. Por favor, contáctanos.", variant: "destructive" });
      // Log error
      await supabase.from('logs').insert({ 
        tipo_evento: 'error_registro_donacion', 
        descripcion: `Error al registrar donación para ${donorEmail}: ${error.message}`,
        user_id: user && userProfile ? userProfile.id : null, 
      });
    }
  };
  
  const predefinedAmounts = [500, 1000, 2500, 5000];


  return (
    <div className="pt-0"> {/* Remove pt-24 md:pt-32 as Navbar handles it */}
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Haz una Donación</h1>
              <p className="text-xl">
                Tu generosidad nos permite continuar con nuestra misión de ayudar a quienes más lo necesitan.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold text-blue-600">Tu donación transforma vidas</h2>
              
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold mb-4">¿A dónde va tu donación?</h3>
                <div className="space-y-4">
                  {[
                    { title: "Programas Educativos", description: "Apoyo escolar, becas y materiales educativos." },
                    { title: "Asistencia Alimentaria", description: "Comedores y entrega de alimentos." },
                    { title: "Salud Comunitaria", description: "Campañas de prevención y atención médica." }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 shadow-sm">
                 <h3 className="text-xl font-bold mb-4 text-blue-700">Visualiza tu Impacto</h3>
                <Slider
                  value={[selectedAmount]}
                  min={donationImpacts[0].amount}
                  max={donationImpacts[donationImpacts.length - 1].amount}
                  step={100}
                  onValueChange={handleSliderChange}
                  className="my-6"
                  aria-label="Selector de monto de donación"
                />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImpact}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-center p-4 bg-white rounded-md shadow"
                  >
                    <p className="text-lg font-semibold text-blue-600">Con ${selectedAmount.toLocaleString('es-AR')},</p>
                    <p className="text-gray-700">{currentImpact}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold mb-4">Transparencia</h3>
                <p className="text-gray-600 text-sm">
                  Nos comprometemos a utilizar tus donaciones de manera eficiente y transparente. Publicamos informes anuales y emitimos certificados fiscales.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-lg p-8 shadow-xl border border-gray-100">
                <div className="flex items-center mb-6">
                  <Heart className="h-8 w-8 text-blue-600 mr-3" />
                  <h2 className="text-3xl font-bold text-blue-600">Donar ahora</h2>
                </div>
                
                <form onSubmit={handleDonationSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Tipo de donación</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[{id: 'unica', label: 'Única', icon: CreditCard}, {id: 'mensual', label: 'Mensual', icon: Calendar}].map(type => (
                        <motion.div
                          key={type.id}
                          className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 ease-in-out ${
                            donationType === type.id ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-500' : 'border-gray-300 hover:border-blue-400'
                          }`}
                          onClick={() => setDonationType(type.id)}
                          whileTap={{ scale: 0.97 }}
                        >
                          <div className="flex items-center justify-center">
                            <input type="radio" name="donationType" value={type.id} checked={donationType === type.id} onChange={() => {}} className="sr-only" />
                            <type.icon className={`h-5 w-5 mr-2 ${donationType === type.id ? 'text-blue-600' : 'text-gray-500'}`} />
                            <span className={`font-medium ${donationType === type.id ? 'text-blue-700' : 'text-gray-700'}`}>{type.label}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Monto (ARS)</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                      {predefinedAmounts.map(amount => (
                        <motion.button
                          type="button"
                          key={amount}
                          className={`border rounded-lg p-2 text-center cursor-pointer transition-all duration-200 ease-in-out ${
                            selectedAmount === amount && !customAmount ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-500' : 'border-gray-300 hover:border-blue-400'
                          }`}
                          onClick={() => { setSelectedAmount(amount); setCustomAmount(''); updateImpactDescription(amount); }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <span className={`font-medium ${selectedAmount === amount && !customAmount ? 'text-blue-700' : 'text-gray-700'}`}>${amount.toLocaleString('es-AR')}</span>
                        </motion.button>
                      ))}
                    </div>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          min="100"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Otro monto (mín. $100)"
                        />
                      </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Método de pago</h3>
                    <motion.div
                        className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 ease-in-out ${
                        paymentMethod === 'mercadopago' ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-500' : 'border-gray-300 hover:border-blue-400'
                        }`}
                        onClick={() => setPaymentMethod('mercadopago')}
                        whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <input type="radio" name="paymentMethod" value="mercadopago" checked={paymentMethod === 'mercadopago'} onChange={() => {}} className="sr-only" />
                        <img-replace src="/mercadopago-logo.svg" alt="MercadoPago" className="h-6 mr-2" /> 
                        <span className={`font-medium ${paymentMethod === 'mercadopago' ? 'text-blue-700' : 'text-gray-700'}`}>MercadoPago</span>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Información personal</h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input type="text" required placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                        <input type="text" required placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                      <input type="tel" placeholder="Teléfono (opcional)" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <input type="checkbox" id="terms" required checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-1 mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      Acepto los <Link to="/terminos" target="_blank" className="text-blue-600 hover:underline">términos y condiciones</Link> y la <Link to="/privacidad" target="_blank" className="text-blue-600 hover:underline">política de privacidad</Link>.
                    </label>
                  </div>
                  
                  <Button type="submit" className="w-full donation-button text-white font-bold py-3 text-lg" disabled={isLoading}>
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                    ) : (
                      <Heart className="mr-2 h-5 w-5" />
                    )}
                    {donationType === 'unica' ? `Donar $${(customAmount && parseFloat(customAmount) >=100 ? parseFloat(customAmount) : selectedAmount).toLocaleString('es-AR')}` : `Donar $${(customAmount && parseFloat(customAmount) >=100 ? parseFloat(customAmount) : selectedAmount).toLocaleString('es-AR')} Mensualmente`}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    Serás redirigido a MercadoPago para completar tu donación de forma segura.
                  </p>
                  {!user && (
                    <div className="text-center mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
                      <p className="text-sm text-blue-700">
                        ¿Sabías que puedes llevar un registro de tus donaciones?
                        <Link to="/registro" className="font-semibold hover:underline ml-1">Crea una cuenta</Link> o 
                        <Link to="/login" className="font-semibold hover:underline ml-1">Inicia sesión</Link>.
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 section-gradient">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Otras formas de ayudar</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Además de las donaciones monetarias, existen otras maneras de contribuir a nuestra causa.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Voluntariado", description: "Dona tu tiempo y habilidades.", cta: "Ser voluntario", link: "/colaborar#voluntariado" },
              { icon: Gift, title: "Donaciones en especie", description: "Alimentos, ropa, materiales.", cta: "Más información", link: "/contacto" },
              { icon: Briefcase, title: "Alianzas Corporativas", description: "Colabora con tu empresa.", cta: "Formar alianza", link: "/colaborar#alianzas" }
            ].map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-8 shadow-lg card-hover"
              >
                <div className="mb-6 flex justify-center"><option.icon className="h-12 w-12 text-blue-600" /></div>
                <h3 className="text-2xl font-bold mb-4 text-center">{option.title}</h3>
                <p className="text-gray-600 mb-6 text-center">{option.description}</p>
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
    </div>
  );
};

export default DonatePage;

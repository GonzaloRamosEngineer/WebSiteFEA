import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

const DonationSuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        className="bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-lg w-full"
      >
        <CheckCircle className="w-20 h-20 md:w-24 md:h-24 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">¡Donación Exitosa!</h1>
        <p className="text-gray-600 text-lg mb-8">
          ¡Muchísimas gracias por tu generosidad! Tu aporte hace una gran diferencia y nos ayuda a seguir transformando vidas.
        </p>
        <div className="space-y-4 md:space-y-0 md:flex md:justify-center md:space-x-4">
          <Link to="/">
            <Button size="lg" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white">
              <Home className="mr-2 h-5 w-5" /> Volver al Inicio
            </Button>
          </Link>
          <Link to="/panel">
            <Button size="lg" variant="outline" className="w-full md:w-auto">
              <Gift className="mr-2 h-5 w-5" /> Ver Mis Donaciones
            </Button>
          </Link>
        </div>
        <p className="text-xs text-gray-500 mt-8">
          Recibirás un comprobante de tu donación en tu correo electrónico en breve.
        </p>
      </motion.div>
    </div>
  );
};

export default DonationSuccessPage;
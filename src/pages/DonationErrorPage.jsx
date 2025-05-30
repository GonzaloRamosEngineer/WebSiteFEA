import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { XCircle, Home, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const DonationErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-400 to-pink-500 p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-lg w-full"
      >
        <XCircle className="w-20 h-20 md:w-24 md:h-24 text-red-500 mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Error en la Donación</h1>
        <p className="text-gray-600 text-lg mb-8">
          Lo sentimos, parece que hubo un problema al procesar tu donación. Por favor, inténtalo de nuevo o contacta con nosotros si el problema persiste.
        </p>
        <div className="space-y-4 md:space-y-0 md:flex md:justify-center md:space-x-4">
          <Link to="/donar">
            <Button size="lg" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white">
              <RefreshCw className="mr-2 h-5 w-5" /> Intentar de Nuevo
            </Button>
          </Link>
          <Link to="/">
            <Button size="lg" variant="outline" className="w-full md:w-auto">
              <Home className="mr-2 h-5 w-5" /> Volver al Inicio
            </Button>
          </Link>
        </div>
        <p className="text-xs text-gray-500 mt-8">
          Si necesitas ayuda, no dudes en <Link to="/contacto" className="underline hover:text-blue-600">contactarnos</Link>.
        </p>
      </motion.div>
    </div>
  );
};

export default DonationErrorPage;
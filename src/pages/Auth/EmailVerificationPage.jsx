
import React from 'react';
import { Link } from 'react-router-dom';
import { MailCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const EmailVerificationPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-400 to-blue-600 p-4 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white/20 backdrop-blur-lg p-8 md:p-12 rounded-xl shadow-2xl text-center max-w-lg"
      >
        <MailCheck className="mx-auto h-20 w-20 text-green-400 mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold mb-4">¡Revisa tu Correo!</h1>
        <p className="text-lg md:text-xl mb-8 leading-relaxed">
          Te hemos enviado un enlace de verificación a tu dirección de correo electrónico. Por favor, haz clic en ese enlace para activar tu cuenta.
        </p>
        <p className="text-sm mb-8">
          Si no encuentras el correo, revisa tu carpeta de spam o correo no deseado.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 font-semibold text-lg px-8 py-3 shadow-md">
              Volver al Inicio
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white/10 font-semibold text-lg px-8 py-3 shadow-md">
              Ir a Login
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;

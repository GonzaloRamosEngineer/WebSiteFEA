
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';


const PasswordRecoveryPage = () => {
  const [email, setEmail] = useState('');
  const { sendPasswordResetEmail, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await sendPasswordResetEmail(email);
    if (!error) {
      toast({
        title: "Correo Enviado",
        description: "Si existe una cuenta con ese email, recibirás un enlace para restablecer tu contraseña.",
      });
      // navigate('/login'); // Opcional: redirigir a login
    }
    // AuthContext ya maneja el toast de error
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl"
      >
        <div className="text-center">
          <Link to="/" className="inline-block mb-6">
            <img-replace src="/logo-fundacion.png" alt="Fundación Evolución Antoniana" className="w-32 h-auto mx-auto" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Recuperar Contraseña</h1>
          <p className="text-gray-600 mt-2">Ingresa tu email y te enviaremos un enlace para restablecerla.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
            />
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-3" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Mail className="mr-2 h-5 w-5" />}
            Enviar Enlace
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600">
          ¿Recordaste tu contraseña?{' '}
          <Link to="/login" className="font-medium text-purple-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default PasswordRecoveryPage;

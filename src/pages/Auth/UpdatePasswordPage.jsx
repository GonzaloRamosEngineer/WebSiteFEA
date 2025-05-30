
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, KeyRound, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const UpdatePasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { updateUserPassword, loading, user } = useAuth(); // Necesitamos 'user' para saber si hay una sesión activa.
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();

  // Verificar si hay un token de recuperación en la URL (Supabase maneja esto internamente con onAuthStateChange)
  // Si el usuario llega aquí después de hacer clic en el enlace de correo electrónico,
  // Supabase Auth debería haber manejado el token y establecido una sesión temporal.
  // El evento 'PASSWORD_RECOVERY' en onAuthStateChange es clave.

  useEffect(() => {
    // Si el usuario no está en una sesión de recuperación de contraseña (ej. navega directamente aquí)
    // y no hay usuario activo, redirigir.
    // Supabase establece un usuario temporalmente durante el flujo de recuperación.
    if (!user && location.hash.includes('type=recovery')) {
        // El usuario está en el flujo de recuperación, permitir que continúe.
    } else if (!user) {
        toast({ title: "Acceso no permitido", description: "Por favor, inicia el proceso de recuperación de contraseña nuevamente.", variant: "destructive"});
        // navigate('/recuperar-password'); // O a login si prefieres
    }
  }, [user, location, navigate, toast]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: "Error", description: "Las contraseñas no coinciden.", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Error", description: "La contraseña debe tener al menos 6 caracteres.", variant: "destructive" });
      return;
    }

    const { error } = await updateUserPassword(password);
    if (!error) {
      toast({ title: "Contraseña Actualizada", description: "Tu contraseña ha sido cambiada exitosamente. Ya puedes iniciar sesión." });
      navigate('/login');
    }
    // El AuthContext ya maneja el toast de error.
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-cyan-500 p-4">
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
          <h1 className="text-3xl font-bold text-gray-800">Actualizar Contraseña</h1>
          <p className="text-gray-600 mt-2">Ingresa tu nueva contraseña.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password">Nueva Contraseña</Label>
            <div className="relative">
                <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                />
                <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
                >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
            <div className="relative">
                <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
                />
                <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
            </div>
          </div>
          <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white text-lg py-3" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <KeyRound className="mr-2 h-5 w-5" />}
            Actualizar Contraseña
          </Button>
        </form>
         <p className="text-center text-sm text-gray-600">
          <Link to="/login" className="font-medium text-teal-600 hover:underline">
            Volver a Iniciar sesión
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default UpdatePasswordPage;

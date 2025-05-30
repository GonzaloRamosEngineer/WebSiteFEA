
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Chrome, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient'; // Importación añadida

const AuthForm = ({ mode }) => {
  const navigate = useNavigate();
  const { signUp, signIn, signInWithGoogle, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (mode === 'register') {
      if (password !== confirmPassword) {
        toast({ title: "Error", description: "Las contraseñas no coinciden.", variant: "destructive" });
        setIsLoading(false);
        return;
      }
      if (password.length < 6) {
        toast({ title: "Error", description: "La contraseña debe tener al menos 6 caracteres.", variant: "destructive" });
        setIsLoading(false);
        return;
      }
      const { data, error } = await signUp(email, password, nombreCompleto);
      if (!error && data.user) {
        navigate('/verificar-email');
      }
    } else {
      const { data, error } = await signIn(email, password);
      if (!error && data.user) {
        if (data.user.email_confirmed_at) {
           const { data: profileData, error: profileError } = await supabase
            .from('users')
            .select('rol')
            .eq('auth_user_id', data.user.id)
            .single();

          if (profileError) {
            console.error("Error fetching user role after login:", profileError);
            toast({ title: "Error", description: "No se pudo determinar tu rol.", variant: "destructive" });
            navigate('/'); 
          } else if (profileData) {
            if (profileData.rol === 'admin') {
              navigate('/admin');
            } else {
              navigate('/panel');
            }
          } else {
             navigate('/panel'); 
          }
        } else {
          navigate('/verificar-email');
        }
      }
    }
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const { data, error } = await signInWithGoogle();
     if (error) {
      setIsLoading(false);
    }
  };

  const isRegister = mode === 'register';

  return (
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
        <h1 className="text-3xl font-bold text-gray-800">
          {isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
        </h1>
        <p className="text-gray-600 mt-2">
          {isRegister ? 'Únete a nuestra comunidad.' : 'Bienvenido de nuevo.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {isRegister && (
          <div className="space-y-2">
            <Label htmlFor="nombreCompleto">Nombre Completo</Label>
            <Input
              id="nombreCompleto"
              type="text"
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
              required
              placeholder="Juan Pérez"
            />
          </div>
        )}
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
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Contraseña</Label>
            {!isRegister && (
              <Link to="/recuperar-password" 
                className="text-sm text-blue-600 hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            )}
          </div>
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
        {isRegister && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
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
        )}
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3" disabled={isLoading || authLoading}>
          {(isLoading || authLoading) && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          {isRegister ? 'Registrarse' : 'Iniciar Sesión'}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">O continúa con</span>
        </div>
      </div>

      <Button variant="outline" className="w-full text-lg py-3" onClick={handleGoogleSignIn} disabled={isLoading || authLoading}>
         {(isLoading || authLoading) && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
        <Chrome className="mr-2 h-5 w-5" /> Google
      </Button>

      <p className="text-center text-sm text-gray-600">
        {isRegister ? (
          <>
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:underline">
              Inicia sesión
            </Link>
          </>
        ) : (
          <>
            ¿No tienes una cuenta?{' '}
            <Link to="/registro" className="font-medium text-blue-600 hover:underline">
              Regístrate
            </Link>
          </>
        )}
      </p>
    </motion.div>
  );
};

export default AuthForm;


import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const ProtectedRoute = ({ children }) => {
  const { user, userProfile, loading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (user && !user.email_confirmed_at) {
     toast({
        title: "Verifica tu Email",
        description: "Por favor, verifica tu dirección de correo electrónico para acceder a esta página. Revisa tu bandeja de entrada.",
        variant: "default",
        duration: 8000,
      });
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  if (userProfile && userProfile.estado !== 'activa') {
      toast({
        title: "Cuenta Inactiva",
        description: `Tu cuenta está actualmente ${userProfile.estado}. Por favor, contacta con soporte si crees que es un error.`,
        variant: "destructive",
        duration: 8000,
      });
    return <Navigate to="/" state={{ from: location }} replace />;
  }


  return children;
};

export default ProtectedRoute;

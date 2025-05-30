
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const AdminRoute = ({ children }) => {
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
        description: "Por favor, verifica tu dirección de correo electrónico para acceder al panel de administración.",
        variant: "default",
        duration: 8000,
      });
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  if (userProfile && userProfile.estado !== 'activa') {
      toast({
        title: "Cuenta Inactiva",
        description: `Tu cuenta está actualmente ${userProfile.estado}. No puedes acceder al panel de administración.`,
        variant: "destructive",
        duration: 8000,
      });
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (userProfile && userProfile.rol !== 'admin') {
    toast({
      title: "Acceso Denegado",
      description: "No tienes permisos para acceder a esta página.",
      variant: "destructive",
      duration: 5000,
    });
    return <Navigate to="/panel" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;

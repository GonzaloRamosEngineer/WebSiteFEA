
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ActivitiesPage from '@/pages/ActivitiesPage';
import CollaboratePage from '@/pages/CollaboratePage';
import ContactPage from '@/pages/ContactPage';
import DonatePage from '@/pages/DonatePage';
import LoginPage from '@/pages/Auth/LoginPage';
import RegisterPage from '@/pages/Auth/RegisterPage';
import EmailVerificationPage from '@/pages/Auth/EmailVerificationPage';
import UserDashboardPage from '@/pages/Dashboard/UserDashboardPage';
import AdminDashboardPage from '@/pages/Dashboard/Admin/AdminDashboardPage';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import AdminUsersPage from '@/pages/Dashboard/Admin/AdminUsersPage';
import AdminDonationsPage from '@/pages/Dashboard/Admin/AdminDonationsPage';
import AdminSubmissionsPage from '@/pages/Dashboard/Admin/AdminSubmissionsPage';
import AdminLogsPage from '@/pages/Dashboard/Admin/AdminLogsPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminRoute from '@/components/AdminRoute';
import DonationSuccessPage from '@/pages/DonationSuccessPage';
import DonationErrorPage from '@/pages/DonationErrorPage';
import PasswordRecoveryPage from '@/pages/Auth/PasswordRecoveryPage';
import UpdatePasswordPage from '@/pages/Auth/UpdatePasswordPage';


function AppRoutes() {
  const { user, loading, userProfile } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }
  
  const getRedirectPath = () => {
    if (!user) return "/login";
    if (!user.email_confirmed_at) return "/verificar-email";
    if (userProfile) {
      if (userProfile.estado !== 'activa') return "/"; // o a una página de 'cuenta suspendida'
      return userProfile.rol === 'admin' ? "/admin" : "/panel";
    }
    // Si userProfile es null pero el usuario está autenticado y confirmado,
    // es probable que el perfil aún se esté cargando o hubo un error.
    // Podrías redirigir a una página de carga/error o al panel por defecto.
    return "/panel"; 
  };


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="quienes-somos" element={<AboutPage />} />
        <Route path="actividades" element={<ActivitiesPage />} />
        <Route path="colaborar" element={<CollaboratePage />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route path="donar" element={<DonatePage />} />
        <Route path="donar/exito" element={<DonationSuccessPage />} />
        <Route path="donar/error" element={<DonationErrorPage />} />
        
        <Route path="login" element={user && user.email_confirmed_at && userProfile ? <Navigate to={getRedirectPath()} /> : <LoginPage />} />
        <Route path="registro" element={user && user.email_confirmed_at && userProfile ? <Navigate to={getRedirectPath()} /> : <RegisterPage />} />
        <Route path="verificar-email" element={user && user.email_confirmed_at ? <Navigate to={getRedirectPath()} /> : <EmailVerificationPage />} />
        <Route path="recuperar-password" element={<PasswordRecoveryPage />} />
        <Route path="actualizar-password" element={<UpdatePasswordPage />} />


        <Route 
            path="panel" 
            element={
                <ProtectedRoute>
                    <UserDashboardPage />
                </ProtectedRoute>
            } 
        />
        
        <Route path="admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>}>
          <Route index element={<Navigate to="usuarios" />} />
          <Route path="usuarios" element={<AdminRoute><AdminUsersPage /></AdminRoute>} />
          <Route path="donaciones" element={<AdminRoute><AdminDonationsPage /></AdminRoute>} />
          <Route path="formularios" element={<AdminRoute><AdminSubmissionsPage /></AdminRoute>} />
          <Route path="logs" element={<AdminRoute><AdminLogsPage /></AdminRoute>} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster />
    </AuthProvider>
  );
}

export default App;

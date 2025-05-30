
import React from 'react';
import AuthForm from '@/components/Auth/AuthForm';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-teal-600 p-4">
      <AuthForm mode="register" />
    </div>
  );
};

export default RegisterPage;

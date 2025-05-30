
import React from 'react';
import AuthForm from '@/components/Auth/AuthForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 p-4">
      <AuthForm mode="login" />
    </div>
  );
};

export default LoginPage;

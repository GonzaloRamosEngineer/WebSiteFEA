
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
        setLoading(false);
        return;
      }
      
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      }
      setLoading(false);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setUserProfile(null);
        }
        if (event === 'PASSWORD_RECOVERY') {
          // Handle password recovery if needed, e.g. redirect to a reset password page
        }
        if (event === 'SIGNED_IN') {
           // Handled by fetchUserProfile
        }
        if (event === 'SIGNED_OUT') {
          setUserProfile(null);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (authUserId) => {
    if (!authUserId) {
      setUserProfile(null);
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_user_id', authUserId)
        .single();

      if (error) {
        // This can happen if the user exists in auth.users but not yet in public.users (trigger might be slow)
        // Retry fetching after a short delay
        if (error.code === 'PGRST116') { // " réfrigérateur" is a known code for "single row not found" with some locales
          console.warn("User profile not found, retrying...", error.message);
          setTimeout(() => fetchUserProfile(authUserId), 2000); // Retry after 2 seconds
          return; // Don't set loading to false yet
        }
        console.error('Error fetching user profile:', error.message);
        setUserProfile(null);
         await supabase.from('logs').insert({ tipo_evento: 'error_fetch_profile', descripcion: `Error fetching profile for ${authUserId}: ${error.message}` });
      } else {
        setUserProfile(data);
      }
    } catch (catchError) {
      console.error('Unexpected error fetching user profile:', catchError);
      setUserProfile(null);
    } finally {
      setLoading(false);
    }
  };


  const signUp = async (email, password, nombreCompleto) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre_completo: nombreCompleto, // This will be available in the handle_new_user trigger
        },
        // emailRedirectTo: `${window.location.origin}/verificar-email` // Supabase handles this redirect URL in its settings.
      },
    });
    if (error) {
      toast({ title: "Error de Registro", description: error.message, variant: "destructive" });
      await supabase.from('logs').insert({ tipo_evento: 'error_registro', descripcion: `Error registrando ${email}: ${error.message}` });
    } else if (data.user && data.user.identities && data.user.identities.length === 0) {
      // This case can indicate an existing user with unconfirmed email. Supabase might not send a new confirmation.
      toast({ title: "Verifica tu Email", description: "Parece que ya tienes una cuenta. Por favor, verifica tu email o intenta iniciar sesión.", variant: "default" });
    } else if (data.user) {
      toast({ title: "Registro Exitoso", description: "¡Gracias por registrarte! Revisa tu email para verificar tu cuenta." });
      await supabase.from('logs').insert({ user_id: data.user.id, tipo_evento: 'registro_exitoso', descripcion: `Usuario ${email} registrado.` });
      // The trigger handle_new_user will create the profile.
    }
    setLoading(false);
    return { data, error };
  };

  const signIn = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: "Error de Inicio de Sesión", description: error.message, variant: "destructive" });
       await supabase.from('logs').insert({ tipo_evento: 'error_login', descripcion: `Error login para ${email}: ${error.message}` });
    } else if (data.user) {
      await fetchUserProfile(data.user.id); // Ensure profile is fresh
      toast({ title: "Inicio de Sesión Exitoso", description: "¡Bienvenido de nuevo!" });
       await supabase.from('logs').insert({ user_id: data.user.id, tipo_evento: 'login_exitoso', descripcion: `Usuario ${email} inició sesión.` });
    }
    setLoading(false);
    return { data, error };
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/panel`
      }
    });
    if (error) {
      toast({ title: "Error con Google", description: error.message, variant: "destructive" });
       await supabase.from('logs').insert({ tipo_evento: 'error_login_google', descripcion: `Error login con Google: ${error.message}` });
    }
    // Supabase handles redirection, loading state will be managed by onAuthStateChange
  };

  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({ title: "Error al Cerrar Sesión", description: error.message, variant: "destructive" });
      await supabase.from('logs').insert({ user_id: user?.id, tipo_evento: 'error_logout', descripcion: `Error cerrando sesión para ${user?.email}: ${error.message}` });
    } else {
       await supabase.from('logs').insert({ user_id: user?.id, tipo_evento: 'logout_exitoso', descripcion: `Usuario ${user?.email} cerró sesión.` });
    }
    setUser(null);
    setUserProfile(null);
    setLoading(false);
  };
  
  const sendPasswordResetEmail = async (email) => {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/actualizar-password`, // You'll need a page for this
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Email Enviado", description: "Revisa tu correo para restablecer tu contraseña." });
    }
    setLoading(false);
  };

  const updateUserPassword = async (newPassword) => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
     if (error) {
      toast({ title: "Error", description: `Error al actualizar contraseña: ${error.message}`, variant: "destructive" });
    } else {
      toast({ title: "Éxito", description: "Contraseña actualizada correctamente." });
    }
    setLoading(false);
  };


  const value = {
    user,
    userProfile,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    sendPasswordResetEmail,
    updateUserPassword,
    loading,
    fetchUserProfile, // Expose to refresh profile if needed
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, DollarSign, Edit3, UserCircle, CalendarDays, Info, LogOut, ShoppingBag, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const UserDashboardPage = () => {
  const { user, userProfile, signOut, loading } = useAuth();
  const [donations, setDonations] = useState([]);
  const [isLoadingDonations, setIsLoadingDonations] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (userProfile && userProfile.id) {
      fetchDonations();
    } else if (!loading && !userProfile) {
      console.warn("User profile not available for fetching donations.");
      setIsLoadingDonations(false);
    }
  }, [userProfile, loading]);

  const fetchDonations = async () => {
    setIsLoadingDonations(true);
    if (!userProfile || !userProfile.id) {
        console.error('User profile or ID is undefined in fetchDonations');
        setIsLoadingDonations(false);
        toast({ title: "Error", description: "No se pudo cargar el perfil para obtener donaciones.", variant: "destructive"});
        return;
    }
    const { data, error } = await supabase
      .from('donaciones')
      .select('*')
      .eq('user_id', userProfile.id)
      .order('fecha', { ascending: false });

    if (error) {
      console.error('Error fetching donations:', error);
      toast({ title: "Error", description: "No se pudieron cargar tus donaciones.", variant: "destructive"});
    } else {
      setDonations(data);
    }
    setIsLoadingDonations(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
  if (loading && !userProfile) { // Muestra loader principal si userProfile aún no está cargado
    return <div className="flex justify-center items-center min-h-[calc(100vh-theme(spacing.20))]"><Loader2 className="h-12 w-12 animate-spin text-blue-600" /></div>;
  }

  if (!userProfile) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Info className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Error al cargar perfil</h1>
        <p className="text-gray-600 mb-6">No pudimos cargar la información de tu perfil. Por favor, intenta recargar la página o contacta a soporte.</p>
        <Button onClick={() => window.location.reload()}>Recargar Página</Button>
      </div>
    );
  }


  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-6 border-b border-gray-200"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Hola, <span className="text-blue-600">{userProfile.nombre || userProfile.email}</span>!</h1>
          <p className="text-gray-600 mt-1">Bienvenido a tu panel de Fundación Evolución Antoniana.</p>
        </div>
        <Button onClick={handleSignOut} variant="outline" className="mt-4 sm:mt-0">
          <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div custom={0} variants={cardVariants} initial="hidden" animate="visible">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Email</CardTitle>
              <UserCircle className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold break-all">{userProfile.email}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div custom={1} variants={cardVariants} initial="hidden" animate="visible">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estado de Cuenta</CardTitle>
              <Info className={`h-5 w-5 ${userProfile.estado === 'activa' ? 'text-green-500' : 'text-red-500'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-lg font-semibold capitalize ${userProfile.estado === 'activa' ? 'text-green-600' : 'text-red-600'}`}>
                {userProfile.estado.replace('_', ' ')}
              </div>
              {userProfile.estado === 'pendiente_verificacion' && (
                <p className="text-xs text-amber-600 mt-1">Revisa tu email para verificar tu cuenta.</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
        <motion.div custom={2} variants={cardVariants} initial="hidden" animate="visible">
         <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Teléfono</CardTitle>
              <Edit3 className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold">{userProfile.telefono || <span className="text-gray-400">No especificado</span>}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card className="shadow-xl">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl flex items-center">
              <Gift className="mr-3 h-7 w-7 text-blue-600" /> Historial de Donaciones
            </CardTitle>
            <CardDescription>Aquí puedes ver todas las donaciones que has realizado.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {isLoadingDonations ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <p className="ml-3 text-gray-600">Cargando tus donaciones...</p>
              </div>
            ) : donations.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Método</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operación</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {donations.map((donation, index) => (
                      <motion.tr 
                        key={donation.id}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {new Date(donation.fecha).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                          ${donation.monto.toLocaleString('es-AR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 capitalize">{donation.metodo_pago}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donation.numero_operacion || '-'}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-10">
                <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg mb-2">Aún no has realizado ninguna donación.</p>
                <p className="text-gray-500 mb-6">¡Tu apoyo es fundamental para nuestra misión!</p>
                <Link to="/donar">
                  <Button className="donation-button text-white font-semibold">
                    <DollarSign className="mr-2 h-5 w-5" /> Donar Ahora
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
          {donations.length > 0 && (
            <CardFooter className="border-t pt-6 flex justify-end">
              <Link to="/donar">
                <Button className="donation-button text-white font-semibold">
                  <DollarSign className="mr-2 h-5 w-5" /> Realizar Nueva Donación
                </Button>
              </Link>
            </CardFooter>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default UserDashboardPage;
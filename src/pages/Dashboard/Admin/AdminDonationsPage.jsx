import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2, Gift, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const AdminDonationsPage = () => {
  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDonations, setFilteredDonations] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchDonations();
  }, []);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = donations.filter(item => {
      return (
        item.nombre_donante?.toLowerCase().includes(lowercasedFilter) ||
        item.email_donante?.toLowerCase().includes(lowercasedFilter) ||
        item.monto?.toString().includes(lowercasedFilter) ||
        item.numero_operacion?.toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredDonations(filteredData);
  }, [searchTerm, donations]);

  const fetchDonations = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('donaciones')
      .select(`
        *,
        users (
          email,
          nombre
        )
      `)
      .order('fecha', { ascending: false });

    if (error) {
      console.error('Error fetching donations:', error);
      toast({ title: "Error", description: "No se pudieron cargar las donaciones.", variant: "destructive" });
    } else {
      setDonations(data);
      setFilteredDonations(data);
    }
    setIsLoading(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-xl">
        <CardHeader className="border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-3xl font-bold text-gray-800 flex items-center">
                <Gift className="mr-3 h-8 w-8 text-blue-600" />
                Gestión de Donaciones
              </CardTitle>
              <CardDescription className="mt-1">
                Visualiza y administra todas las donaciones recibidas.
              </CardDescription>
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar donación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64 md:w-80 h-10 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {filteredDonations.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donante</TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Método</TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nº Operación</TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario Registrado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white divide-y divide-gray-200">
                  {filteredDonations.map((donation) => (
                    <TableRow key={donation.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(donation.fecha)}</TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>{donation.nombre_donante || donation.users?.nombre || 'Anónimo'}</div>
                        <div className="text-xs text-gray-500">{donation.email_donante || donation.users?.email}</div>
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">{formatCurrency(donation.monto)}</TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 capitalize">{donation.metodo_pago}</TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donation.numero_operacion || '-'}</TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                        {donation.user_id ? <Badge variant="default" className="bg-blue-100 text-blue-700">Sí</Badge> : <Badge variant="secondary">No</Badge>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-10">
              <Gift className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">No se encontraron donaciones.</p>
              {searchTerm && <p className="text-gray-500">Intenta con otro término de búsqueda.</p>}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminDonationsPage;
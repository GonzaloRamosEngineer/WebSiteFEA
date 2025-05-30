import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, FileText, Users, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminSubmissionsPage = () => {
  const [contactos, setContactos] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const [isLoadingContactos, setIsLoadingContactos] = useState(true);
  const [isLoadingColaboradores, setIsLoadingColaboradores] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchContactos();
    fetchColaboradores();
  }, []);

  const fetchContactos = async () => {
    setIsLoadingContactos(true);
    const { data, error } = await supabase
      .from('contactos')
      .select('*')
      .order('fecha', { ascending: false });
    if (error) {
      console.error('Error fetching contactos:', error);
      toast({ title: "Error", description: "No se pudieron cargar los formularios de contacto.", variant: "destructive" });
    } else {
      setContactos(data);
    }
    setIsLoadingContactos(false);
  };

  const fetchColaboradores = async () => {
    setIsLoadingColaboradores(true);
    const { data, error } = await supabase
      .from('colaboradores')
      .select('*')
      .order('fecha', { ascending: false });
    if (error) {
      console.error('Error fetching colaboradores:', error);
      toast({ title: "Error", description: "No se pudieron cargar los formularios de colaboración.", variant: "destructive" });
    } else {
      setColaboradores(data);
    }
    setIsLoadingColaboradores(false);
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const renderTable = (data, type) => {
    const isLoading = type === 'contactos' ? isLoadingContactos : isLoadingColaboradores;
    if (isLoading) {
      return <div className="flex justify-center items-center py-10"><Loader2 className="h-8 w-8 animate-spin text-blue-500" /></div>;
    }
    if (data.length === 0) {
      return <p className="text-center text-gray-500 py-10">No hay formularios de {type === 'contactos' ? 'contacto' : 'colaboración'} aún.</p>;
    }
    return (
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</TableHead>
              {type === 'colaboradores' && <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo Colaboración</TableHead>}
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mensaje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
                <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{formatDate(item.fecha)}</TableCell>
                <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.nombre}</TableCell>
                <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.email}</TableCell>
                {type === 'colaboradores' && <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 capitalize">{item.tipo_colaboracion?.replace('_', ' ') || '-'}</TableCell>}
                <TableCell className="px-4 py-3 text-sm text-gray-700"><p className="max-w-xs truncate" title={item.mensaje}>{item.mensaje}</p></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-xl">
        <CardHeader className="border-b">
          <CardTitle className="text-3xl font-bold text-gray-800 flex items-center">
            <FileText className="mr-3 h-8 w-8 text-blue-600" />
            Formularios Recibidos
          </CardTitle>
          <CardDescription className="mt-1">
            Visualiza los mensajes de contacto y las solicitudes de colaboración.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="contactos" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:w-1/2 mb-6">
              <TabsTrigger value="contactos" className="flex items-center space-x-2 py-2.5">
                <Mail className="h-5 w-5" /> <span>Contacto</span>
              </TabsTrigger>
              <TabsTrigger value="colaboradores" className="flex items-center space-x-2 py-2.5">
                <Users className="h-5 w-5" /> <span>Colaboradores</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="contactos">
              {renderTable(contactos, 'contactos')}
            </TabsContent>
            <TabsContent value="colaboradores">
              {renderTable(colaboradores, 'colaboradores')}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminSubmissionsPage;
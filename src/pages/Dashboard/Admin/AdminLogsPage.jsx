import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, ListChecks, UserCircle, CalendarDays, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('logs')
      .select(`
        *,
        users (
          email,
          nombre
        )
      `)
      .order('fecha', { ascending: false })
      .limit(100); // Limitar para no sobrecargar

    if (error) {
      console.error('Error fetching logs:', error);
      toast({ title: "Error", description: "No se pudieron cargar los logs del sistema.", variant: "destructive" });
    } else {
      setLogs(data);
    }
    setIsLoading(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('es-AR', {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
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
          <CardTitle className="text-3xl font-bold text-gray-800 flex items-center">
            <ListChecks className="mr-3 h-8 w-8 text-blue-600" />
            Logs del Sistema
          </CardTitle>
          <CardDescription className="mt-1">
            Registro de eventos importantes ocurridos en la plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {logs.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[200px]">
                      <CalendarDays className="inline-block mr-1 h-4 w-4" />Fecha
                    </TableHead>
                    <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <UserCircle className="inline-block mr-1 h-4 w-4" />Usuario
                    </TableHead>
                    <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <Info className="inline-block mr-1 h-4 w-4" />Tipo Evento
                    </TableHead>
                    <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white divide-y divide-gray-200">
                  {logs.map((log) => (
                    <TableRow key={log.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{formatDate(log.fecha)}</TableCell>
                      <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {log.users ? `${log.users.nombre || 'N/A'} (${log.users.email})` : 'Sistema/Anónimo'}
                      </TableCell>
                      <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 capitalize">{log.tipo_evento?.replace('_', ' ') || '-'}</TableCell>
                      <TableCell className="px-4 py-3 text-sm text-gray-700"><p className="max-w-md truncate" title={log.descripcion}>{log.descripcion}</p></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">No hay logs registrados aún.</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminLogsPage;
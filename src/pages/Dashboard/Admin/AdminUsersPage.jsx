import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Users, Edit, Trash2, Search, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState(null); // 'suspend', 'activate', 'delete'
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = users.filter(item => {
      return (
        item.nombre?.toLowerCase().includes(lowercasedFilter) ||
        item.email?.toLowerCase().includes(lowercasedFilter) ||
        item.rol?.toLowerCase().includes(lowercasedFilter) ||
        item.estado?.toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredUsers(filteredData);
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('fecha_creacion', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
      toast({ title: "Error", description: "No se pudieron cargar los usuarios.", variant: "destructive" });
    } else {
      setUsers(data);
      setFilteredUsers(data);
    }
    setIsLoading(false);
  };

  const handleUserAction = async () => {
    if (!selectedUser || !actionType) return;
    setIsLoading(true);

    let updateData = {};
    let successMessage = "";

    if (actionType === 'suspend') {
      updateData = { estado: 'suspendida' };
      successMessage = "Usuario suspendido exitosamente.";
    } else if (actionType === 'activate') {
      updateData = { estado: 'activa' };
      successMessage = "Usuario activado exitosamente.";
    } else if (actionType === 'delete') {
      toast({ title: "Acción no implementada", description: "La eliminación de usuarios requiere configuración adicional.", variant: "warning" });
      setIsLoading(false);
      setSelectedUser(null);
      setActionType(null);
      return;
    }

    const { error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', selectedUser.id);

    if (error) {
      console.error(`Error ${actionType} user:`, error);
      toast({ title: "Error", description: `No se pudo ${actionType} el usuario.`, variant: "destructive" });
    } else {
      toast({ title: "Éxito", description: successMessage });
      fetchUsers(); 
    }
    setIsLoading(false);
    setSelectedUser(null);
    setActionType(null);
  };

  const openDialog = (user, type) => {
    setSelectedUser(user);
    setActionType(type);
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  };

  if (isLoading && users.length === 0) {
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
                <Users className="mr-3 h-8 w-8 text-blue-600" />
                Gestión de Usuarios
              </CardTitle>
              <CardDescription className="mt-1">
                Administra los usuarios registrados en la plataforma.
              </CardDescription>
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar usuario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64 md:w-80 h-10 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {filteredUsers.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</TableHead>
                    <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</TableHead>
                    <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</TableHead>
                    <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</TableHead>
                    <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Creación</TableHead>
                    <TableHead className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{user.nombre || '-'}</TableCell>
                      <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{user.email}</TableCell>
                      <TableCell className="px-4 py-3 whitespace-nowrap text-sm">
                        <Badge variant={user.rol === 'admin' ? 'destructive' : 'outline'} className="capitalize">
                          {user.rol}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 whitespace-nowrap text-sm">
                        <Badge 
                          className={cn(
                            "capitalize",
                            user.estado === 'activa' && "bg-green-100 text-green-700",
                            user.estado === 'suspendida' && "bg-red-100 text-red-700",
                            user.estado === 'pendiente_verificacion' && "bg-yellow-100 text-yellow-700"
                          )}
                        >
                          {user.estado.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{formatDate(user.fecha_creacion)}</TableCell>
                      <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-center space-x-2">
                        {user.estado === 'activa' ? (
                          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => openDialog(user, 'suspend')}>
                            <XCircle className="h-5 w-5" />
                          </Button>
                        ) : user.estado === 'suspendida' ? (
                          <Button variant="ghost" size="icon" className="text-green-500 hover:text-green-700" onClick={() => openDialog(user, 'activate')}>
                            <CheckCircle className="h-5 w-5" />
                          </Button>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
             <div className="text-center py-10">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">No se encontraron usuarios.</p>
              {searchTerm && <p className="text-gray-500">Intenta con otro término de búsqueda.</p>}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={selectedUser !== null && (actionType === 'suspend' || actionType === 'activate')} onOpenChange={() => { if (!isLoading) { setSelectedUser(null); setActionType(null);}}}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertTriangle className={`mr-2 h-6 w-6 ${actionType === 'suspend' ? 'text-red-500' : 'text-green-500'}`} />
              Confirmar Acción
            </AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres {actionType === 'suspend' ? 'suspender' : 'activar'} al usuario <strong>{selectedUser?.nombre || selectedUser?.email}</strong>?
              {actionType === 'suspend' && " El usuario no podrá acceder a su panel."}
              {actionType === 'activate' && " El usuario recuperará el acceso a su panel."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleUserAction} 
              disabled={isLoading}
              className={cn(actionType === 'suspend' ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700")}
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Confirmar {actionType === 'suspend' ? 'Suspensión' : 'Activación'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default AdminUsersPage;
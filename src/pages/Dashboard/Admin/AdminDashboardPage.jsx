import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Users, Gift, FileText, ListChecks, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const AdminDashboardPage = () => {
  const location = useLocation();

  const navItems = [
    { href: '/admin/usuarios', label: 'Usuarios', icon: Users },
    { href: '/admin/donaciones', label: 'Donaciones', icon: Gift },
    { href: '/admin/formularios', label: 'Formularios', icon: FileText },
    { href: '/admin/logs', label: 'Logs', icon: ListChecks },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <aside className="w-full md:w-64 bg-gradient-to-b from-slate-800 to-slate-900 text-white p-4 md:p-6 space-y-6 shadow-lg">
        <div className="text-center mb-8">
          <Link to="/admin" className="flex items-center justify-center space-x-2">
            <LayoutDashboard className="h-8 w-8 text-yellow-400" />
            <h1 className="text-2xl font-bold text-white">Panel Admin</h1>
          </Link>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link key={item.label} to={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-base py-3 px-4 rounded-lg transition-all duration-200 ease-in-out",
                  location.pathname.startsWith(item.href)
                    ? "bg-yellow-400 text-slate-900 font-semibold shadow-md hover:bg-yellow-500"
                    : "text-gray-300 hover:bg-slate-700 hover:text-white"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardPage;
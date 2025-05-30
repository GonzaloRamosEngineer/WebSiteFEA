
import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ShieldCheck, LogIn, UserPlus, LayoutDashboard, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Navbar = ({ scrollY }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, userProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation(); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({ title: "Sesión cerrada", description: "Has cerrado sesión exitosamente." });
      navigate('/');
    } catch (error) {
      toast({ title: "Error al cerrar sesión", description: error.message, variant: "destructive" });
    }
    setIsMenuOpen(false);
  };

  const baseNavItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Quiénes Somos', path: '/quienes-somos' },
    { name: 'Actividades', path: '/actividades' },
    { name: 'Cómo Colaborar', path: '/colaborar' },
    { name: 'Contacto', path: '/contacto' },
  ];

  const authNavItems = user 
    ? [
        { name: 'Panel', path: userProfile?.rol === 'admin' ? '/admin' : '/panel', icon: LayoutDashboard },
        { name: 'Cerrar Sesión', action: handleSignOut, icon: LogOut }
      ]
    : [
        { name: 'Login', path: '/login', icon: LogIn },
        { name: 'Registro', path: '/registro', icon: UserPlus }
      ];

  const navItems = [...baseNavItems];
  const mobileNavItems = [...baseNavItems, ...authNavItems];


  const isScrolled = scrollY > 50;
  const isHomePageTop = scrollY <= 50 && location.pathname === '/';

  const getNavTextColor = () => {
    if (isHomePageTop && !isMenuOpen) return 'text-white'; 
    if (isScrolled || isMenuOpen) return 'text-gray-900'; 
    return 'text-gray-900'; 
  };

  const getLogoColor = () => {
    if (isHomePageTop && !isMenuOpen) return 'text-white';
    return 'text-blue-600';
  };
  
  const getHeaderBg = () => {
    if (isHomePageTop && !isMenuOpen) return 'bg-transparent py-5';
    return 'bg-white shadow-md py-3'; 
  }
  
  const getButtonTextColor = () => {
     if (isHomePageTop && !isMenuOpen) return 'text-white';
     return 'text-gray-700';
  }


  return (
    <header className={`fixed w-full z-[60] transition-all duration-300 ${getHeaderBg()}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              <span className={`text-xl md:text-2xl font-bold ${getLogoColor()}`}>
                Fundación E. Antoniana
              </span>
            </Link>
            <motion.div 
              className={`hidden md:flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium ${isHomePageTop && !isMenuOpen ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-700'}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>ONG registrada · +10 años</span>
            </motion.div>
          </div>

          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-blue-500 ${
                    isActive ? (isHomePageTop && !isMenuOpen ? 'text-blue-300' : 'text-blue-600') : getNavTextColor()
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            {user ? (
              <>
                <NavLink
                  to={userProfile?.rol === 'admin' ? '/admin' : '/panel'}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-blue-500 flex items-center ${
                      isActive ? (isHomePageTop && !isMenuOpen ? 'text-blue-300' : 'text-blue-600') : getNavTextColor()
                    }`
                  }
                >
                 <LayoutDashboard className="mr-1 h-4 w-4"/> Panel
                </NavLink>
                <Button variant="ghost" size="sm" onClick={handleSignOut} className={`text-sm font-medium transition-colors hover:text-blue-500 ${getNavTextColor()}`}>
                  <LogOut className="mr-1 h-4 w-4"/> Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-blue-500 flex items-center ${
                      isActive ? (isHomePageTop && !isMenuOpen ? 'text-blue-300' : 'text-blue-600') : getNavTextColor()
                    }`
                  }
                >
                  <LogIn className="mr-1 h-4 w-4"/> Login
                </NavLink>
                <NavLink
                  to="/registro"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-blue-500 flex items-center ${
                      isActive ? (isHomePageTop && !isMenuOpen ? 'text-blue-300' : 'text-blue-600') : getNavTextColor()
                    }`
                  }
                >
                   <UserPlus className="mr-1 h-4 w-4"/> Registro
                </NavLink>
              </>
            )}
            <Link to="/donar">
              <Button className={`donation-button text-white font-bold text-sm px-4 py-2 ${(isHomePageTop && !isMenuOpen) && !isScrolled ? 'bg-opacity-80 hover:bg-opacity-100' : ''}`}>
                Donar
              </Button>
            </Link>
          </nav>

          <button
            className="md:hidden hover:opacity-80"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMenuOpen ? (
              <X className={`h-7 w-7 ${getNavTextColor()}`} />
            ) : (
              <Menu className={`h-7 w-7 ${getNavTextColor()}`} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 mb-2`}>
                <ShieldCheck className="h-4 w-4" />
                <span>ONG registrada · +10 años</span>
              </div>
              {mobileNavItems.map((item) => (
                item.path ? (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `text-md font-medium py-2 transition-colors hover:text-blue-600 flex items-center ${
                        isActive ? 'text-blue-600' : 'text-gray-900'
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon && <item.icon className="mr-2 h-5 w-5"/>} {item.name}
                  </NavLink>
                ) : (
                  <button
                    key={item.name}
                    onClick={item.action}
                    className="text-md font-medium py-2 transition-colors hover:text-blue-600 text-gray-900 flex items-center text-left w-full"
                  >
                    {item.icon && <item.icon className="mr-2 h-5 w-5"/>} {item.name}
                  </button>
                )
              ))}
              <Link to="/donar" onClick={() => setIsMenuOpen(false)}>
                <Button className="donation-button text-white font-bold w-full text-md py-3 mt-2">
                  Donar
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

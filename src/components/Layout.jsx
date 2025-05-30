
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift as HandHeart, MessageCircle, MapPin as MapPinIcon, Home, Users, CalendarDays, HeartHandshake as HandshakeIcon, LogIn, UserPlus, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const FloatingHelpButton = () => {
  return (
    <Link to="/colaborar">
      <motion.div
        className="fixed bottom-20 md:bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl z-40 hidden md:flex items-center justify-center group"
        whileHover={{ scale: 1.1, width: 'auto', paddingRight: '1.5rem', boxShadow: "0px 0px 15px rgba(59, 130, 246, 0.8)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        aria-label="Quiero ayudar"
      >
        <HandshakeIcon size={28} className="group-hover:mr-2 transition-all duration-300" />
        <span className="hidden group-hover:inline transition-all duration-300 whitespace-nowrap">Quiero ayudar</span>
      </motion.div>
    </Link>
  );
};

const MobileBottomNavBar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const phoneNumber = "+5493871234567"; 
  const foundationAddress = "Av. Siempreviva 742, Salta, Argentina";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(foundationAddress)}`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Hola! Quisiera más información sobre la Fundación Evolución Antoniana.")}`;

  const commonNavItems = [
    { path: "/", icon: Home, label: "Inicio" },
    { path: "/donar", icon: HandHeart, label: "Donar" },
    { type: "whatsapp", icon: MessageCircle, label: "WhatsApp", url: whatsappUrl },
  ];

  const authNavItems = user
    ? [{ path: "/panel", icon: LayoutDashboard, label: "Panel" }]
    : [{ path: "/login", icon: LogIn, label: "Login" }];

  const navItems = [...commonNavItems, ...authNavItems];


  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-white shadow-t-lg p-2 border-t border-gray-200 flex justify-around items-center z-50 md:hidden"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {navItems.map((item) => {
        const isActive = item.path && location.pathname === item.path;
        const commonProps = {
          key: item.label,
          className: `flex flex-col items-center justify-center p-2 rounded-md transition-all duration-200 ease-in-out w-1/4 ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'}`,
          whileTap: { scale: 0.90 },
        };

        if (item.type === "whatsapp" || item.type === "map") {
          return (
            <motion.a href={item.url} target="_blank" rel="noopener noreferrer" {...commonProps} aria-label={item.label}>
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : 'font-normal'}`}>{item.label}</span>
            </motion.a>
          );
        }

        return (
          <Link to={item.path} {...commonProps} aria-label={item.label}>
            <item.icon size={22} strokeWidth={isActive ? 2.5 : 2}/>
            <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : 'font-normal'}`}>{item.label}</span>
          </Link>
        );
      })}
    </motion.div>
  );
};


const Layout = () => {
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0 bg-gray-50"> 
      <Navbar scrollY={scrollY} />
      <main className="flex-grow pt-16 md:pt-20"> {/* Adjusted padding top for Navbar height */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <div className="hidden md:block"> 
        <FloatingWhatsAppButton phoneNumber="+5493871234567" message="Hola! Quisiera más información sobre la Fundación Evolución Antoniana." />
      </div>
      <FloatingHelpButton /> 
      <MobileBottomNavBar /> 
    </div>
  );
};

export default Layout;

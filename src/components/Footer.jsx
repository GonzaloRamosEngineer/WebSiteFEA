
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <span className="text-xl font-bold mb-4 block">Fundación Evolución Antoniana</span>
            <p className="text-gray-300 mb-4">
              Trabajamos para mejorar la calidad de vida de las personas más vulnerables a través de programas educativos, sociales y de salud.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">Enlaces</span>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/quienes-somos" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link to="/actividades" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Actividades
                </Link>
              </li>
              <li>
                <Link to="/colaborar" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Cómo Colaborar
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/donar" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Donar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">Contacto</span>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">Av. Siempreviva 742, Buenos Aires, Argentina</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">+54 11 1234-5678</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300">info@fundacionevolucionantoniana.org</span>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-lg font-semibold mb-4 block">Horario de Atención</span>
            <p className="text-gray-300 mb-2">Lunes a Viernes</p>
            <p className="text-gray-300 mb-4">9:00 - 18:00</p>
            <Link to="/donar" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
              Haz una donación
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Fundación Evolución Antoniana. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

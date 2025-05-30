import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);


    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 12, 
      y: mousePosition.y - 12,
      opacity: isVisible ? 1 : 0,
      scale: isVisible ? 1 : 0,
      transition: { type: "spring", stiffness: 500, damping: 30, mass: 0.5 }
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-full pointer-events-none z-[9999] shadow-lg mix-blend-screen blur-[2px]"
      variants={variants}
      animate="default"
    />
  );
};

export default MouseFollower;
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Users, Activity, CalendarClock, Target, Globe, ShieldCheck, ArrowDown } from 'lucide-react';

import HeroSection from '@/components/HomePage/HeroSection';
import ImpactStatsSection from '@/components/HomePage/ImpactStatsSection';
import TestimonialCarouselSection from '@/components/HomePage/TestimonialCarouselSection';
import TimelineSection from '@/components/HomePage/TimelineSection';
import PartnerLogosSection from '@/components/HomePage/PartnerLogosSection';
import GlobalVisionSection from '@/components/HomePage/GlobalVisionSection';
import MouseFollower from '@/components/HomePage/MouseFollower';
import WhyExistSection from '@/components/HomePage/WhyExistSection';


const HomePage = () => {
  const impactSectionRef = useRef(null);
  const heroRef = useRef(null); 

  const { scrollYProgress: heroScrollYProgress } = useScroll({
    target: heroRef, 
    offset: ["start start", "end start"]
  });

  const contentSectionOpacity = useTransform(heroScrollYProgress, [0.6, 0.8], [0, 1]);
  const contentSectionY = useTransform(heroScrollYProgress, [0.6, 0.8], ["50px", "0px"]);
  
  const scrollToImpact = () => {
    if (impactSectionRef.current) {
      impactSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-sky-100 via-rose-50 to-amber-50 text-gray-800">
      <MouseFollower />
      <HeroSection ref={heroRef} scrollToImpact={scrollToImpact} />

      <motion.div 
        style={{ opacity: contentSectionOpacity, y: contentSectionY }}
      >
        <WhyExistSection />
        <ImpactStatsSection ref={impactSectionRef} />
        <TestimonialCarouselSection />
        <TimelineSection />
        <PartnerLogosSection />
        <GlobalVisionSection />
      </motion.div>
    </div>
  );
};

export default HomePage;
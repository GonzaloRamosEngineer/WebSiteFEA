import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, MessageSquare, UserCircle, PlayCircle } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Marcos L.",
    location: "Salta Capital",
    quote: "Gracias a la Fundación, pude terminar la escuela y hoy soy voluntario. Me dieron una segunda oportunidad.",
    image: "/placeholder-user1.jpg",
    type: "text",
  },
  {
    id: 2,
    name: "Ana G.",
    location: "Barrio Castañares",
    quote: "Mi hijo recibió atención médica y contención cuando más lo necesitábamos. Son ángeles.",
    image: "/placeholder-user2.jpg",
    type: "text",
  },
  {
    id: 3,
    name: "Lucía R.",
    location: "Voluntaria",
    quote: "Encontré un lugar donde ayudar también me sanó a mí. Ver el impacto directo es increíble.",
    image: "/placeholder-user3.jpg",
    type: "video", 
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Example video
  },
];

const TestimonialCarouselSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    hiddenRight: { x: "100%", opacity: 0, scale: 0.8 },
    hiddenLeft: { x: "-100%", opacity: 0, scale: 0.8 },
    visible: { x: "0", opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeInOut" }},
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3, ease: "easeOut" } }
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-sky-50 to-rose-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">Historias Reales, Vidas Transformadas</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Escucha las voces de aquellos a quienes hemos acompañado y de quienes hacen posible nuestra labor.
          </p>
        </motion.div>

        <div className="relative flex items-center justify-center min-h-[450px] md:min-h-[400px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial={direction === 1 ? "hiddenRight" : "hiddenLeft"}
              animate="visible"
              exit="exit"
              className="absolute w-full max-w-2xl"
            >
              <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl text-center flex flex-col items-center">
                {currentTestimonial.type === "video" && currentTestimonial.videoUrl ? (
                  <div className="mb-6 w-full aspect-video rounded-lg overflow-hidden shadow-md">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={currentTestimonial.videoUrl}
                      title={`Testimonio de ${currentTestimonial.name}`}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <img  
                    alt={`Foto de ${currentTestimonial.name}`} 
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover mb-6 border-4 border-purple-300 shadow-lg"
                   src="https://images.unsplash.com/photo-1593300614547-0335e95cee65" />
                )}
                
                <MessageSquare className="w-10 h-10 text-purple-500 mb-4" />
                <p className="text-lg md:text-xl text-gray-700 italic mb-6 leading-relaxed">"{currentTestimonial.quote}"</p>
                <div className="flex items-center text-purple-800 font-semibold">
                  <UserCircle className="w-5 h-5 mr-2" />
                  {currentTestimonial.name} <span className="mx-1 text-gray-400">|</span> {currentTestimonial.location}
                </div>
                {currentTestimonial.type !== "video" && (
                <Button variant="link" className="mt-4 text-purple-600 hover:text-purple-800">
                  Leer más
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <Button 
            onClick={handlePrevious} 
            variant="outline" 
            size="icon" 
            className="absolute left-0 md:-left-8 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow-md w-10 h-10 md:w-12 md:h-12"
            aria-label="Testimonio Anterior"
          >
            <ChevronLeft className="h-6 w-6 text-purple-600" />
          </Button>
          <Button 
            onClick={handleNext} 
            variant="outline" 
            size="icon" 
            className="absolute right-0 md:-right-8 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow-md w-10 h-10 md:w-12 md:h-12"
            aria-label="Siguiente Testimonio"
          >
            <ChevronRight className="h-6 w-6 text-purple-600" />
          </Button>
        </div>
         <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-center text-xl text-purple-700 font-semibold mt-12"
        >
          Tu ayuda transforma vidas. <Link to="/colaborar" className="underline hover:text-purple-900">Hoy podés ser parte.</Link>
        </motion.p>
      </div>
    </section>
  );
};

export default TestimonialCarouselSection;
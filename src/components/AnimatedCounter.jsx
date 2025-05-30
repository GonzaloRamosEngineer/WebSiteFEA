import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const AnimatedCounter = ({ value, duration = 2 }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const nodeRef = useRef();

  useEffect(() => {
    if (isInView) {
      const node = nodeRef.current;
      controls.start({
        opacity: 1,
        transition: { duration: 0.5 }
      });

      const animation = controls.start({
        innerHTML: value,
        transition: {
          duration: duration,
          ease: "easeOut",
          type: "tween",
          onUpdate: (latest) => {
            if (node) {
              node.innerHTML = Math.round(latest);
            }
          },
        },
      });
      
      const initialValue = 0;
      controls.set({ innerHTML: initialValue });
      controls.start({ innerHTML: value });


      return () => animation.stop();
    }
  }, [isInView, value, duration, controls]);

  return (
    <motion.span ref={ref}>
      <motion.span ref={nodeRef} initial={{ opacity: 0 }} animate={controls}>
        0
      </motion.span>
    </motion.span>
  );
};

export default AnimatedCounter;
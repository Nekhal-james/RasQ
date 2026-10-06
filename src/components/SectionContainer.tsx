import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface SectionContainerProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  id,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // High-precision scroll-linked transform
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Smooth spring physics for organic motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001
  });

  // Subtle luxury scale: enters at 0.982, peaks at 1.0, gently scales down on exit
  const scale = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.985, 1, 1, 0.99]);
  
  // Subtle optical elevation
  const y = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [24, 0, 0, -16]);

  // Subtle opacity ramp
  const opacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0.35, 1, 1, 0.45]);

  return (
    <motion.div
      ref={containerRef}
      id={id}
      style={{
        scale,
        y,
        opacity,
        transformOrigin: 'center center'
      }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

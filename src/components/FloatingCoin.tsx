'use client';

import { motion } from 'framer-motion';
import CryptoLogo from './CryptoLogo';

interface FloatingCoinProps {
  symbol: string;
  name: string;
  position: { top: number; left: number };
  size: number;
  delay: number;
}

export function FloatingCoin({ 
  symbol, 
  name, 
  position, 
  size, 
  delay 
}: FloatingCoinProps) {
  // Random float distance for variety (60-120px)
  const floatDistance = 60 + Math.random() * 60;
  
  // Random subtle rotation (-5 to +5 degrees)
  const rotation = (Math.random() - 0.5) * 10;
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: `${position.top}%`,
        left: `${position.left}%`,
      }}
      initial={{ 
        y: 0, 
        rotate: 0,
        opacity: 0.3
      }}
      animate={{
        y: [0, -floatDistance, 0],
        rotate: [0, rotation, 0],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 25 + Math.random() * 15, // 25-40s (faster, more noticeable)
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
    >
      <CryptoLogo symbol={symbol} name={name} size={size} />
    </motion.div>
  );
}

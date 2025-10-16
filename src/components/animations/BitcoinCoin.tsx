'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CoinProps {
  x: number;
  y: number;
  id: number;
}

export function BitcoinCoin({ x, y, id }: CoinProps) {
  return (
    <motion.div
      className="fixed pointer-events-none"
      style={{ zIndex: 50 }}
      initial={{
        x: x - 20,
        y: y - 20,
        scale: 0,
        rotate: 0,
      }}
      animate={{
        y: y - 150,
        scale: [0, 1.2, 1],
        rotate: [0, 360, 720],
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1],
      }}
    >
      <div className="text-4xl">💰</div>
    </motion.div>
  );
}

export function CoinManager() {
  const [coins, setCoins] = useState<CoinProps[]>([]);

  useEffect(() => {
    if (coins.length > 0) {
      const timer = setTimeout(() => {
        setCoins((prev) => prev.slice(1));
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [coins]);

  useEffect(() => {
    const spawnCoin = (e: MouseEvent) => {
      console.log('Bitcoin spawned at:', e.clientX, e.clientY);
      setCoins((prev) => [
        ...prev,
        {
          x: e.clientX,
          y: e.clientY,
          id: Date.now() + Math.random(),
        },
      ]);
    };

    window.addEventListener('spawn-bitcoin' as any, spawnCoin as any);
    return () => {
      window.removeEventListener('spawn-bitcoin' as any, spawnCoin as any);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 5 }}>
      {coins.map((coin) => (
        <BitcoinCoin key={coin.id} {...coin} />
      ))}
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useState } from 'react';

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  limitations?: string[];
  cta: string;
  badge?: string;
  variant?: 'default' | 'popular' | 'premium' | 'enterprise';
  onCtaClick?: () => void;
  featured?: boolean;
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  limitations = [],
  cta,
  badge,
  variant = 'default',
  onCtaClick,
  featured = false,
}: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const variantStyles = {
    default: 'border-gray-200 bg-white',
    popular: 'border-primary-500 bg-gradient-to-br from-primary-50 to-white ring-2 ring-primary-500',
    premium: 'border-purple-500 bg-gradient-to-br from-purple-50 to-white',
    enterprise: 'border-gold-500 bg-gradient-to-br from-gold-50 to-white',
  };

  const buttonStyles = {
    default: 'bg-gray-900 hover:bg-gray-800 text-white',
    popular: 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/50',
    premium: 'bg-purple-600 hover:bg-purple-700 text-white',
    enterprise: 'bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-700 hover:to-gold-800 text-white',
  };

  return (
    <motion.div
      className={`relative rounded-2xl border p-8 ${variantStyles[variant]} ${
        featured ? 'scale-105 shadow-xl' : 'shadow-lg'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className={`rounded-full px-4 py-1 text-sm font-semibold ${
            variant === 'popular' ? 'bg-primary-600 text-white' :
            variant === 'premium' ? 'bg-purple-600 text-white' :
            variant === 'enterprise' ? 'bg-gold-600 text-white' :
            'bg-gray-900 text-white'
          }`}>
            {badge}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </div>

      {/* Price */}
      <div className="mb-6 text-center">
        <div className="flex items-baseline justify-center">
          <span className="text-5xl font-bold tracking-tight text-gray-900">
            {price}
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-600">{period}</p>
      </div>

      {/* CTA Button */}
      <button
        onClick={onCtaClick}
        className={`mb-8 w-full rounded-xl px-6 py-3 font-semibold transition-all ${buttonStyles[variant]}`}
      >
        {cta}
      </button>

      {/* Features */}
      <div className="space-y-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
            <span className="text-sm text-gray-700">{feature}</span>
          </motion.div>
        ))}

        {/* Limitations */}
        {limitations.length > 0 && (
          <>
            <div className="my-4 border-t border-gray-200" />
            {limitations.map((limitation, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (features.length + index) * 0.05 }}
              >
                <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                <span className="text-sm text-gray-500">{limitation}</span>
              </motion.div>
            ))}
          </>
        )}
      </div>

      {/* Hover Effect - Bitcoin Coins */}
      {isHovered && variant === 'popular' && (
        <motion.div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              initial={{ 
                x: Math.random() * 100 + '%',
                y: '100%',
                rotate: 0,
              }}
              animate={{ 
                y: '-100%',
                rotate: 360,
              }}
              transition={{
                duration: 2 + i * 0.5,
                ease: 'linear',
                repeat: Infinity,
              }}
            >
              ₿
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import {
  Brain,
  Building2,
  Shield,
  FileCheck,
  Zap,
  Globe,
} from 'lucide-react';

export function FeaturesSection() {
  const t = useTranslations('home.features');
  const [activeTab, setActiveTab] = useState(0);
  const locale = useLocale();
  
  console.log('Current locale:', locale);
  console.log('Features translations:', t('heading'));

  const features = [
    {
      icon: Brain,
      key: 'ai',
      color: 'from-purple-500 to-pink-500',
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Building2,
      key: 'exchanges',
      color: 'from-blue-500 to-cyan-500',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Shield,
      key: 'security',
      color: 'from-emerald-500 to-teal-500',
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: FileCheck,
      key: 'reports',
      color: 'from-orange-500 to-red-500',
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Zap,
      key: 'realtime',
      color: 'from-yellow-500 to-orange-500',
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: Globe,
      key: 'multiyear',
      color: 'from-indigo-500 to-purple-500',
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ];

  const activeFeature = features[activeTab];
  const Icon = activeFeature.icon;

  const handleTabClick = (index: number, e: React.MouseEvent) => {
    console.log('Tab clicked:', index, 'at position:', e.clientX, e.clientY);
    setActiveTab(index);
    
    // Spawn Bitcoin coin at click position
    const event = new MouseEvent('spawn-bitcoin', {
      clientX: e.clientX,
      clientY: e.clientY,
    });
    window.dispatchEvent(event);
  };

  return (
    <section className="py-24 px-4 bg-white relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t('heading')}
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t('subheading')}
          </motion.p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {features.map((feature, index) => {
            const TabIcon = feature.icon;
            return (
              <motion.button
                key={feature.key}
                onClick={(e) => handleTabClick(index, e)}
                className={`
                  relative px-6 py-3 rounded-xl font-semibold
                  transition-all duration-300
                  ${
                    activeTab === index
                      ? `bg-gradient-to-r ${feature.color} text-white shadow-lg scale-105`
                      : `bg-gray-100 text-gray-700 hover:bg-gray-200`
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-2">
                  <TabIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">
                    {t(`${feature.key}.title`)}
                  </span>
                </div>
                
                {activeTab === index && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 w-2 h-2 bg-white rounded-full"
                    layoutId="activeIndicator"
                    style={{ x: '-50%' }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 shadow-xl relative z-10"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              {/* Left Side: Text Content */}
              <div>
                <motion.div
                  className={`inline-flex p-6 rounded-3xl ${activeFeature.bgColor} mb-6`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 200,
                    damping: 15 
                  }}
                >
                  <Icon className={`w-16 h-16 ${activeFeature.iconColor}`} />
                </motion.div>

                <h3 className="text-3xl font-bold mb-4">
                  {t(`${activeFeature.key}.title`)}
                </h3>
                
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {t(`${activeFeature.key}.description`)}
                </p>

                {/* Feature Bullets */}
                <ul className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className={`text-2xl ${activeFeature.iconColor}`}>
                        ✓
                      </span>
                      <span className="text-gray-700">
                        {t(`${activeFeature.key}.bullet${i}`)}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Right Side: Visual Placeholder */}
              <div className="relative">
                <motion.div
                  className={`aspect-square rounded-3xl bg-gradient-to-br ${activeFeature.color} opacity-10`}
                  initial={{ scale: 0.8, rotate: -5 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring' }}
                />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Icon className={`w-32 h-32 ${activeFeature.iconColor} opacity-20`} />
                  </motion.div>
                </div>
              </div>
              
            </div>
          </motion.div>
        </AnimatePresence>
        
      </div>
    </section>
  );
}

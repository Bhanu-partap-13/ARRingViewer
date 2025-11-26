import React from 'react';
import { motion } from 'framer-motion';

const DiamondLoader = () => {
  return (
    <div className="fixed inset-0 bg-luxury-dark/95 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative">
        {/* Main Diamond */}
        <motion.div
          className="relative w-24 h-24"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Diamond SVG */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-2xl"
          >
            <defs>
              <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
              </linearGradient>
              
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Diamond Shape */}
            <g filter="url(#glow)">
              {/* Top facet */}
              <polygon points="50,10 70,35 50,30 30,35" fill="url(#diamondGradient)" opacity="0.9" />
              
              {/* Left facet */}
              <polygon points="50,10 30,35 20,50 50,30" fill="url(#diamondGradient)" opacity="0.7" />
              
              {/* Right facet */}
              <polygon points="50,10 70,35 80,50 50,30" fill="url(#diamondGradient)" opacity="0.8" />
              
              {/* Center */}
              <polygon points="30,35 50,30 70,35 50,90" fill="url(#diamondGradient)" opacity="1" />
              
              {/* Bottom left */}
              <polygon points="20,50 30,35 50,90" fill="url(#diamondGradient)" opacity="0.6" />
              
              {/* Bottom right */}
              <polygon points="80,50 70,35 50,90" fill="url(#diamondGradient)" opacity="0.65" />
              
              {/* Highlights */}
              <polygon points="50,10 55,20 50,30 45,20" fill="white" opacity="0.3" />
              <polygon points="50,30 60,50 50,90" fill="white" opacity="0.1" />
            </g>
          </svg>
        </motion.div>

        {/* Sparkle Effects */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-luxury-gold rounded-full"
            style={{
              top: '50%',
              left: '50%',
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              x: [0, Math.cos((i * 60 * Math.PI) / 180) * 40],
              y: [0, Math.sin((i * 60 * Math.PI) / 180) * 40],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Loading Text */}
        <motion.div
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="font-serif text-luxury-gold text-xl tracking-widest">Loading Excellence...</p>
        </motion.div>

        {/* Progress Dots */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-luxury-gold rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiamondLoader;

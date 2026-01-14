import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '@/app/contexts/ThemeContext';

/**
 * Global visual effects layer
 * - Film grain texture
 * - Vignette
 * - Mode-specific atmospheric effects
 */
export const VisualEffects: React.FC = () => {
  const { isUpsideDownMode } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Film grain overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px'
        }}
      />

      {/* Vignette */}
      <div 
        className={`
          absolute inset-0 
          ${isUpsideDownMode 
            ? 'bg-gradient-radial from-transparent via-transparent to-black/80' 
            : 'bg-gradient-radial from-transparent via-transparent to-black/60'
          }
        `}
        style={{
          background: isUpsideDownMode
            ? 'radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.9) 100%)'
            : 'radial-gradient(circle at center, transparent 0%, transparent 50%, rgba(0,0,0,0.4) 85%, rgba(0,0,0,0.7) 100%)'
        }}
      />

      {/* Upside Down Mode: Blood red glow */}
      {isUpsideDownMode && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(139, 0, 0, 0.15) 0%, transparent 60%)',
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )}

      {/* Upside Down Mode: Subtle flicker */}
      {isUpsideDownMode && (
        <motion.div
          className="absolute inset-0 bg-black"
          animate={{
            opacity: [0, 0, 0, 0.05, 0, 0, 0, 0.08, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            times: [0, 0.2, 0.3, 0.35, 0.4, 0.6, 0.7, 0.75, 1],
          }}
        />
      )}

      {/* Normal Mode: Warm amber glow */}
      {!isUpsideDownMode && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(217, 119, 6, 0.08) 0%, transparent 70%)',
          }}
          animate={{
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )}
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ReelItem } from '@/app/components/ReelItem';
import { useTheme } from '@/app/contexts/ThemeContext';
import { getReelsForMode } from '@/app/data/products';

export const ReelsScreen: React.FC = () => {
  const { isUpsideDownMode } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const reels = getReelsForMode(isUpsideDownMode);

  /**
   * VERTICAL SCROLL SNAP LOGIC
   * Desktop: Mouse wheel
   * Mobile: Touch swipe
   */
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    
    if (e.deltaY > 50 && currentIndex < reels.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (e.deltaY < -50 && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75 && currentIndex < reels.length - 1) {
      // Swipe up - next
      setCurrentIndex(prev => prev + 1);
    }
    if (touchStart - touchEnd < -75 && currentIndex > 0) {
      // Swipe down - previous
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && currentIndex < reels.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, reels.length]);

  return (
    <div 
      ref={containerRef}
      className="relative h-full overflow-hidden bg-black"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Reels container */}
      <motion.div
        className="relative"
        animate={{ y: `-${currentIndex * 100}vh` }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          damping: 30,
          mass: 0.8
        }}
      >
        {reels.map((product, index) => (
          <div key={product._id} className="h-screen">
            <ReelItem product={product} />
          </div>
        ))}
      </motion.div>

      {/* Progress indicator */}
      <div className="fixed top-6 right-6 z-20 flex flex-col gap-2">
        {reels.map((_, index) => (
          <motion.div
            key={index}
            className={`
              w-1 rounded-full transition-all
              ${index === currentIndex 
                ? (isUpsideDownMode ? 'bg-red-500 h-8' : 'bg-amber-500 h-8')
                : 'bg-gray-600 h-4'
              }
            `}
            animate={{
              height: index === currentIndex ? 32 : 16,
              opacity: index === currentIndex ? 1 : 0.5,
            }}
          />
        ))}
      </div>

      {/* Scroll hint */}
      {currentIndex === 0 && (
        <motion.div
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0.5, 1, 0.5], y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-white text-sm flex flex-col items-center gap-2">
            <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
              <motion.div
                className="w-1 h-2 bg-white rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            <span className="text-xs opacity-75">Scroll to explore</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

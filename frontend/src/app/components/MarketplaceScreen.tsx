import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '@/app/components/ProductCard';
import { ProductDetailModal } from '@/app/components/ProductDetailModal';
import { useTheme } from '@/app/contexts/ThemeContext';
import { normalMarketplaceProducts, upsideDownMarketplaceProducts, Product } from '@/app/data/products';

export const MarketplaceScreen: React.FC = () => {
  const { isUpsideDownMode, setUpsideDownMode } = useTheme();
  const [scrollAttempts, setScrollAttempts] = useState(0);
  const [showGlitch, setShowGlitch] = useState(false);
  const [shake, setShake] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef<number>(0);

  const products = isUpsideDownMode ? upsideDownMarketplaceProducts : normalMarketplaceProducts;

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  /**
   * SECRET MODE SWITCHING LOGIC
   * User must scroll past bottom 5 times consecutively to toggle modes
   */
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

    if (isAtBottom) {
      const now = Date.now();
      
      // Reset if too much time passed since last scroll (> 2 seconds)
      if (now - lastScrollTime.current > 2000) {
        setScrollAttempts(1);
        lastScrollTime.current = now;
        // First attempt - tiny shake + red pulse
        setShake(1);
        setTimeout(() => setShake(0), 300);
      } else {
        setScrollAttempts(prev => {
          const newAttempts = prev + 1;
          
          // Provide feedback based on attempt count
          if (newAttempts <= 2) {
            // First two attempts - tiny shake
            setShake(1);
            setTimeout(() => setShake(0), 300);
          } else if (newAttempts === 3) {
            // Third attempt - slight static hint
            setShake(1);
            setShowGlitch(true);
            setTimeout(() => {
              setShake(0);
              setShowGlitch(false);
            }, 300);
          } else if (newAttempts === 4) {
            // Fourth attempt - stronger shake + static
            setShake(2);
            setShowGlitch(true);
            setTimeout(() => {
              setShake(0);
              setShowGlitch(false);
            }, 500);
          } else if (newAttempts >= 5) {
            // Fifth attempt - ENTER/EXIT UPSIDE DOWN MODE
            setShake(3);
            setShowGlitch(true);
            
            // Dramatic transition
            setTimeout(() => {
              setUpsideDownMode(!isUpsideDownMode);
              setScrollAttempts(0);
              setShake(0);
              setShowGlitch(false);
            }, 800);
          }
          
          return newAttempts;
        });
        lastScrollTime.current = now;
      }
    }
  };

  // Add scroll listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [isUpsideDownMode]);

  return (
    <motion.div
      ref={scrollContainerRef}
      className={`
        h-full overflow-y-auto px-8 py-6
        ${isUpsideDownMode ? 'bg-black' : 'bg-zinc-950'}
      `}
      animate={{
        x: shake > 0 ? [0, -10, 10, -10, 10, 0] : 0,
        y: shake > 0 ? [0, -5, 5, -5, 5, 0] : 0,
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Glitch overlay */}
      <AnimatePresence>
        {showGlitch && (
          <motion.div
            className={`
              fixed inset-0 z-50 pointer-events-none mix-blend-difference
              ${isUpsideDownMode ? 'bg-red-900' : 'bg-red-950'}
            `}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0, 0.5, 0, 0.3, 0],
              x: [0, -5, 5, -10, 10, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      {/* Mode transition overlay */}
      <AnimatePresence>
        {shake === 3 && (
          <motion.div
            className="fixed inset-0 z-40 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 
          className={`
            text-4xl font-bold mb-2
            ${isUpsideDownMode ? 'text-red-200' : 'text-amber-100'}
          `}
          style={{
            textShadow: isUpsideDownMode 
              ? '0 0 20px rgba(220, 38, 38, 0.6)' 
              : '0 0 15px rgba(251, 191, 36, 0.4)'
          }}
        >
          {isUpsideDownMode ? 'The Upside Down' : 'Artisan Marketplace'}
        </h1>
        <p className="text-gray-400">
          {isUpsideDownMode 
            ? 'Items not meant for daylight. Tread carefully.' 
            : 'Discover mysterious artifacts from talented artisans'
          }
        </p>
      </motion.div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
        <AnimatePresence mode="wait">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard product={product} onClick={() => handleProductClick(product)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Scroll hint (subtle, only shows when not in upside down) */}
      {!isUpsideDownMode && scrollAttempts === 0 && (
        <motion.div
          className="text-center py-12 text-gray-600 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1 }}
        >
          There might be more below...
        </motion.div>
      )}

      {/* Red pulse feedback for scroll attempts */}
      {scrollAttempts > 0 && scrollAttempts < 3 && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 h-1 bg-red-600 z-30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrollAttempts / 3 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={handleCloseModal}
      />
    </motion.div>
  );
};
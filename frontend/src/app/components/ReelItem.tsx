import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Share2, Eye } from 'lucide-react';
import { Product } from '@/app/data/products';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useFavorites } from '@/app/contexts/FavoritesContext';

interface ReelItemProps {
  product: Product;
}

export const ReelItem: React.FC<ReelItemProps> = ({ product }) => {
  const { isUpsideDownMode } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [showUI, setShowUI] = useState(true);
  const [likeAnimation, setLikeAnimation] = useState(false);
  const favorited = isFavorite(product._id);

  // Double-click to like
  const handleDoubleClick = () => {
    if (!favorited) {
      toggleFavorite(product);
    }
    setLikeAnimation(true);
    setTimeout(() => setLikeAnimation(false), 1000);
  };

  // Single click to toggle UI
  const handleClick = () => {
    setShowUI(prev => !prev);
  };

  // Prevent double-click from triggering single click
  const handleInteraction = (e: React.MouseEvent) => {
    if (e.detail === 1) {
      setTimeout(() => {
        if (e.detail === 1) handleClick();
      }, 200);
    } else if (e.detail === 2) {
      handleDoubleClick();
    }
  };

  return (
    <div 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden cursor-pointer"
      onClick={handleInteraction}
    >
      {/* Background image with parallax effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Dark overlay */}
        <div 
          className={`
            absolute inset-0
            ${isUpsideDownMode 
              ? 'bg-gradient-to-t from-black via-black/60 to-black/80' 
              : 'bg-gradient-to-t from-black via-black/40 to-black/60'
            }
          `}
        />
      </motion.div>

      {/* Double-tap heart animation */}
      <AnimatePresence>
        {likeAnimation && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heart
              size={120}
              className="fill-current drop-shadow-2xl"
              color={isUpsideDownMode ? '#dc2626' : '#f59e0b'}
              style={{
                filter: `drop-shadow(0 0 20px ${isUpsideDownMode ? '#dc2626' : '#f59e0b'})`
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content overlay */}
      <AnimatePresence>
        {showUI && (
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pb-20">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {/* Rarity badge */}
                {product.rarity === 'forbidden' && (
                  <motion.div
                    className="inline-block px-3 py-1 mb-3 bg-red-900/80 text-red-200 text-xs font-bold uppercase tracking-wider border border-red-700"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ⚠ Forbidden Item
                  </motion.div>
                )}

                <h2 className={`
                  text-3xl font-bold mb-2
                  ${isUpsideDownMode ? 'text-red-200' : 'text-amber-100'}
                `}>
                  {product.name}
                </h2>

                <p className="text-gray-300 text-base mb-3 max-w-lg">
                  {product.description}
                </p>

                {product.warning && (
                  <p className="text-red-400 text-sm italic mb-3 max-w-lg">
                    {product.warning}
                  </p>
                )}

                <div className="flex items-center gap-4 mb-2">
                  <motion.span
                    className={`
                      text-4xl font-bold
                      ${isUpsideDownMode ? 'text-red-400' : 'text-amber-400'}
                    `}
                    animate={{
                      textShadow: isUpsideDownMode
                        ? ['0 0 10px rgba(220, 38, 38, 0.8)', '0 0 20px rgba(220, 38, 38, 1)', '0 0 10px rgba(220, 38, 38, 0.8)']
                        : ['0 0 10px rgba(251, 191, 36, 0.5)', '0 0 15px rgba(251, 191, 36, 0.8)', '0 0 10px rgba(251, 191, 36, 0.5)']
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ${product.price.toFixed(2)}
                  </motion.span>
                </div>

                <div className="text-sm text-gray-400">
                  Sold by <span className="text-gray-300 font-semibold">{product.seller.name}</span>
                  <span className="mx-2">•</span>
                  <span className="uppercase tracking-wider">{product.seller.type}</span>
                </div>
              </motion.div>
            </div>

            {/* Right side actions */}
            <div className="absolute right-6 bottom-32 flex flex-col gap-6 items-center">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(product);
                }}
                className="flex flex-col items-center gap-2"
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className={`
                    p-3 rounded-full backdrop-blur-sm
                    ${favorited 
                      ? (isUpsideDownMode ? 'bg-red-900/80' : 'bg-amber-900/80')
                      : 'bg-black/50'
                    }
                  `}
                  whileHover={{ scale: 1.1 }}
                  animate={favorited ? { 
                    scale: [1, 1.2, 1],
                    boxShadow: isUpsideDownMode
                      ? ['0 0 0px rgba(220, 38, 38, 0)', '0 0 20px rgba(220, 38, 38, 0.8)', '0 0 0px rgba(220, 38, 38, 0)']
                      : ['0 0 0px rgba(251, 191, 36, 0)', '0 0 20px rgba(251, 191, 36, 0.8)', '0 0 0px rgba(251, 191, 36, 0)']
                  } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Heart
                    size={28}
                    className={favorited ? 'fill-current' : ''}
                    color={favorited ? (isUpsideDownMode ? '#dc2626' : '#f59e0b') : '#ffffff'}
                  />
                </motion.div>
                <span className="text-white text-sm">{favorited ? 'Saved' : 'Save'}</span>
              </motion.button>

              <motion.button
                className="flex flex-col items-center gap-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="p-3 rounded-full bg-black/50 backdrop-blur-sm">
                  <Eye size={28} color="#ffffff" />
                </div>
                <span className="text-white text-sm">View</span>
              </motion.button>

              <motion.button
                className="flex flex-col items-center gap-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="p-3 rounded-full bg-black/50 backdrop-blur-sm">
                  <Share2 size={28} color="#ffffff" />
                </div>
                <span className="text-white text-sm">Share</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { Product } from '@/app/data/products';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useFavorites } from '@/app/contexts/FavoritesContext';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { isUpsideDownMode } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(product._id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  const handleCardClick = () => {
    onClick?.();
  };

  return (
    <motion.div
      onClick={handleCardClick}
      className={`
        relative group cursor-pointer overflow-hidden
        ${isUpsideDownMode 
          ? 'bg-black/60 border border-red-900/40' 
          : 'bg-black/40 border border-amber-900/30'
        }
        rounded-sm shadow-2xl
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: isUpsideDownMode 
          ? '0 0 30px rgba(139, 0, 0, 0.5)' 
          : '0 0 30px rgba(251, 191, 36, 0.3)'
      }}
      transition={{ duration: 0.4 }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Fog/Smoke overlay */}
        <div 
          className={`
            absolute inset-0 pointer-events-none
            ${isUpsideDownMode 
              ? 'bg-gradient-to-t from-black/80 via-red-950/20 to-transparent' 
              : 'bg-gradient-to-t from-black/70 via-amber-950/10 to-transparent'
            }
          `}
        />

        {/* Rarity indicator */}
        {product.rarity === 'forbidden' && (
          <motion.div
            className="absolute top-2 left-2 px-2 py-1 bg-red-900/80 text-red-200 text-xs font-bold uppercase tracking-wider border border-red-700"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Forbidden
          </motion.div>
        )}

        {/* Favorite heart */}
        <motion.button
          onClick={handleFavoriteClick}
          className={`
            absolute top-2 right-2 p-2 rounded-full
            ${favorited 
              ? (isUpsideDownMode ? 'bg-red-900/80' : 'bg-amber-900/80')
              : 'bg-black/50'
            }
            hover:scale-110 transition-transform
          `}
          whileTap={{ scale: 0.9 }}
        >
          <Heart 
            size={18} 
            className={favorited ? 'fill-current' : ''}
            color={
              favorited 
                ? (isUpsideDownMode ? '#dc2626' : '#f59e0b')
                : '#ffffff'
            }
          />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className={`
          font-bold mb-1 line-clamp-1
          ${isUpsideDownMode ? 'text-red-200' : 'text-amber-100'}
        `}>
          {product.name}
        </h3>
        
        <p className="text-gray-400 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>

        {/* Warning for dangerous items */}
        {product.warning && (
          <p className="text-red-400 text-xs italic mb-2 line-clamp-1">
            {product.warning}
          </p>
        )}

        <div className="flex items-center justify-between">
          <motion.span 
            className={`
              text-xl font-bold
              ${isUpsideDownMode ? 'text-red-400' : 'text-amber-400'}
            `}
            animate={{ 
              textShadow: isUpsideDownMode 
                ? ['0 0 5px rgba(220, 38, 38, 0.5)', '0 0 10px rgba(220, 38, 38, 0.8)', '0 0 5px rgba(220, 38, 38, 0.5)']
                : ['0 0 5px rgba(251, 191, 36, 0.3)', '0 0 8px rgba(251, 191, 36, 0.5)', '0 0 5px rgba(251, 191, 36, 0.3)']
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ${product.price.toFixed(2)}
          </motion.span>
          
          <span className="text-xs text-gray-500 uppercase tracking-wider">
            {product.seller.type}
          </span>
        </div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className={`
          absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100
          ${isUpsideDownMode 
            ? 'bg-gradient-to-br from-red-900/20 to-purple-900/20' 
            : 'bg-gradient-to-br from-amber-900/10 to-orange-900/10'
          }
        `}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

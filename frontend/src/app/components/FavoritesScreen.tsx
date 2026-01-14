import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { ProductCard } from '@/app/components/ProductCard';
import { ProductDetailModal } from '@/app/components/ProductDetailModal';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useFavorites } from '@/app/contexts/FavoritesContext';
import { Product } from '@/app/data/products';

export const FavoritesScreen: React.FC = () => {
  const { isUpsideDownMode } = useTheme();
  const { favorites } = useFavorites();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div 
      className={`
        h-full overflow-y-auto px-8 py-6
        ${isUpsideDownMode ? 'bg-black' : 'bg-zinc-950'}
      `}
    >
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Heart 
            size={32} 
            className="fill-current"
            color={isUpsideDownMode ? '#dc2626' : '#f59e0b'}
          />
          <h1 
            className={`
              text-4xl font-bold
              ${isUpsideDownMode ? 'text-red-200' : 'text-amber-100'}
            `}
            style={{
              textShadow: isUpsideDownMode 
                ? '0 0 20px rgba(220, 38, 38, 0.6)' 
                : '0 0 15px rgba(251, 191, 36, 0.4)'
            }}
          >
            Saved Items
          </h1>
        </div>
        <p className="text-gray-400">
          {favorites.length === 0 
            ? 'No saved items yet. Explore the marketplace to find items that call to you.'
            : `${favorites.length} ${favorites.length === 1 ? 'item' : 'items'} saved for later`
          }
        </p>
      </motion.div>

      {/* Favorites Grid */}
      {favorites.length === 0 ? (
        <motion.div
          className="flex flex-col items-center justify-center h-[60vh] text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Heart 
            size={80} 
            className="mb-4 opacity-20"
            color={isUpsideDownMode ? '#dc2626' : '#f59e0b'}
          />
          <p className="text-gray-500 text-lg mb-2">Your collection awaits</p>
          <p className="text-gray-600 text-sm max-w-md">
            Items you save will appear here, waiting in the shadows until you're ready.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
          {favorites.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard product={product} onClick={() => handleProductClick(product)} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Cursed items warning */}
      {favorites.some(item => item.isUpsideDown) && (
        <motion.div
          className="mt-8 p-4 border border-red-900/40 bg-red-950/20 rounded"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-red-400 text-sm flex items-center gap-2">
            <span className="text-xl">⚠</span>
            You have forbidden items in your collection. Handle with care.
          </p>
        </motion.div>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={handleCloseModal}
      />
    </div>
  );
};

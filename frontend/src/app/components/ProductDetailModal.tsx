import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Shield, AlertTriangle, Sparkles, User, Tag, Package, MapPin, Store, Hammer, Calendar } from 'lucide-react';
import { Product } from '@/app/data/products';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useFavorites } from '@/app/contexts/FavoritesContext';
import { RiddleCard } from '@/app/components/RiddleCard';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ 
  product, 
  isOpen, 
  onClose 
}) => {
  const { isUpsideDownMode } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!product) return null;

  const favorited = isFavorite(product._id);

  const handleFavoriteClick = () => {
    toggleFavorite(product);
  };

  const getRarityConfig = (rarity?: string) => {
    switch (rarity) {
      case 'forbidden':
        return {
          label: 'FORBIDDEN',
          color: 'text-red-400',
          bgColor: 'bg-red-900/30',
          borderColor: 'border-red-700/50',
          glowColor: 'rgba(220, 38, 38, 0.5)',
          icon: AlertTriangle
        };
      case 'rare':
        return {
          label: 'RARE',
          color: 'text-purple-400',
          bgColor: 'bg-purple-900/30',
          borderColor: 'border-purple-700/50',
          glowColor: 'rgba(147, 51, 234, 0.5)',
          icon: Sparkles
        };
      case 'uncommon':
        return {
          label: 'UNCOMMON',
          color: 'text-blue-400',
          bgColor: 'bg-blue-900/30',
          borderColor: 'border-blue-700/50',
          glowColor: 'rgba(59, 130, 246, 0.4)',
          icon: Shield
        };
      default:
        return {
          label: 'COMMON',
          color: 'text-gray-400',
          bgColor: 'bg-gray-900/30',
          borderColor: 'border-gray-700/50',
          glowColor: 'rgba(156, 163, 175, 0.3)',
          icon: Package
        };
    }
  };

  const getSellerTypeConfig = (type: string) => {
    switch (type) {
      case 'artisan':
        return { label: 'Master Artisan', description: 'Handcrafts unique pieces with traditional methods' };
      case 'alchemist':
        return { label: 'Alchemist', description: 'Deals in mysterious substances and transformations' };
      case 'blacksmith':
        return { label: 'Blacksmith', description: 'Forges metal into powerful artifacts' };
      case 'collector':
        return { label: 'Collector', description: 'Acquires rare items from distant lands' };
      case 'unknown':
        return { label: 'Unknown Dealer', description: 'Identity shrouded in mystery. Approach with caution.' };
      default:
        return { label: 'Merchant', description: 'A wandering trader' };
    }
  };

  const rarityConfig = getRarityConfig(product.rarity);
  const sellerConfig = getSellerTypeConfig(product.seller.type);
  const RarityIcon = rarityConfig.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div 
              className={`
                pointer-events-auto w-full max-w-4xl max-h-full overflow-hidden
                rounded-lg shadow-2xl
                ${isUpsideDownMode 
                  ? 'bg-gradient-to-br from-zinc-950 via-black to-red-950/30 border border-red-900/50' 
                  : 'bg-gradient-to-br from-zinc-950 via-black to-amber-950/20 border border-amber-900/30'
                }
              `}
              style={{
                boxShadow: isUpsideDownMode 
                  ? '0 0 60px rgba(139, 0, 0, 0.4), inset 0 0 100px rgba(0,0,0,0.5)' 
                  : '0 0 60px rgba(251, 191, 36, 0.2), inset 0 0 100px rgba(0,0,0,0.5)'
              }}
            >
              {/* Close button */}
              <motion.button
                onClick={onClose}
                className={`
                  absolute top-4 right-4 z-10 p-2 rounded-full
                  ${isUpsideDownMode 
                    ? 'bg-red-900/50 hover:bg-red-800/70 text-red-200' 
                    : 'bg-amber-900/50 hover:bg-amber-800/70 text-amber-200'
                  }
                  transition-colors
                `}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>

              <div className="flex flex-col md:flex-row h-full max-h-[80vh] overflow-auto">
                {/* Image Section */}
                <div className="relative md:w-1/2 aspect-square md:aspect-auto">
                  <motion.img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                  
                  {/* Image overlay gradient */}
                  <div 
                    className={`
                      absolute inset-0 pointer-events-none
                      ${isUpsideDownMode 
                        ? 'bg-gradient-to-r from-transparent via-transparent to-black/80 md:bg-gradient-to-r' 
                        : 'bg-gradient-to-r from-transparent via-transparent to-black/70 md:bg-gradient-to-r'
                      }
                    `}
                  />
                  <div 
                    className={`
                      absolute inset-0 pointer-events-none md:hidden
                      ${isUpsideDownMode 
                        ? 'bg-gradient-to-b from-transparent via-transparent to-black' 
                        : 'bg-gradient-to-b from-transparent via-transparent to-black/90'
                      }
                    `}
                  />

                  {/* Rarity Badge */}
                  <motion.div
                    className={`
                      absolute top-4 left-4 px-3 py-2 rounded
                      ${rarityConfig.bgColor} ${rarityConfig.borderColor} border
                      flex items-center gap-2
                    `}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <RarityIcon size={16} className={rarityConfig.color} />
                    <span className={`text-xs font-bold uppercase tracking-wider ${rarityConfig.color}`}>
                      {rarityConfig.label}
                    </span>
                  </motion.div>

                  {/* Favorite Button */}
                  <motion.button
                    onClick={handleFavoriteClick}
                    className={`
                      absolute top-4 right-16 md:right-4 p-3 rounded-full
                      ${favorited 
                        ? (isUpsideDownMode ? 'bg-red-900/80' : 'bg-amber-900/80')
                        : 'bg-black/50 hover:bg-black/70'
                      }
                      transition-colors
                    `}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                  >
                    <Heart 
                      size={22} 
                      className={favorited ? 'fill-current' : ''}
                      color={
                        favorited 
                          ? (isUpsideDownMode ? '#dc2626' : '#f59e0b')
                          : '#ffffff'
                      }
                    />
                  </motion.button>
                </div>

                {/* Content Section */}
                <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto">
                  {/* Category */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className={`
                      text-xs uppercase tracking-widest
                      ${isUpsideDownMode ? 'text-red-400/70' : 'text-amber-400/70'}
                    `}>
                      {product.category}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    className={`
                      text-3xl md:text-4xl font-bold mt-2 mb-4
                      ${isUpsideDownMode ? 'text-red-100' : 'text-amber-100'}
                    `}
                    style={{
                      textShadow: `0 0 30px ${rarityConfig.glowColor}`
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {product.name}
                  </motion.h1>

                  {/* Price */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <span 
                      className={`
                        text-4xl font-bold
                        ${isUpsideDownMode ? 'text-red-400' : 'text-amber-400'}
                      `}
                      style={{
                        textShadow: isUpsideDownMode 
                          ? '0 0 20px rgba(220, 38, 38, 0.6)' 
                          : '0 0 20px rgba(251, 191, 36, 0.5)'
                      }}
                    >
                      ${product.price.toFixed(2)}
                    </span>
                  </motion.div>

                  {/* Warning Banner (for forbidden items) */}
                  {product.warning && (
                    <motion.div
                      className="mb-6 p-4 bg-red-950/50 border border-red-800/50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle size={18} className="text-red-400" />
                        <span className="text-red-400 font-bold uppercase text-sm tracking-wider">
                          Warning
                        </span>
                      </div>
                      <p className="text-red-300 italic text-sm">
                        "{product.warning}"
                      </p>
                    </motion.div>
                  )}

                  {/* Description */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                      Description
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {product.description}
                    </p>
                  </motion.div>

                  {/* Seller Info */}
                  <motion.div
                    className={`
                      mb-6 p-4 rounded-lg
                      ${isUpsideDownMode 
                        ? 'bg-red-950/20 border border-red-900/30' 
                        : 'bg-amber-950/20 border border-amber-900/20'
                      }
                    `}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`
                        p-2 rounded-full
                        ${isUpsideDownMode ? 'bg-red-900/50' : 'bg-amber-900/30'}
                      `}>
                        <User size={18} className={isUpsideDownMode ? 'text-red-300' : 'text-amber-300'} />
                      </div>
                      <div>
                        <p className={`font-semibold ${isUpsideDownMode ? 'text-red-200' : 'text-amber-200'}`}>
                          {product.seller.name}
                        </p>
                        <p className="text-gray-500 text-xs uppercase tracking-wider">
                          {sellerConfig.label}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm italic">
                      {sellerConfig.description}
                    </p>
                  </motion.div>

                  {/* Tags */}
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Tag size={14} className="text-gray-500" />
                      <h3 className="text-gray-400 text-xs uppercase tracking-wider">
                        Tags
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag: string, index: number) => (
                        <motion.span
                          key={tag}
                          className={`
                            px-3 py-1 rounded-full text-sm
                            ${isUpsideDownMode 
                              ? 'bg-red-900/30 text-red-300 border border-red-800/30' 
                              : 'bg-amber-900/20 text-amber-300 border border-amber-800/20'
                            }
                          `}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.05 }}
                        >
                          #{tag}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Location Section (for normal items) */}
                  {!product.isUpsideDown && product.locations && product.locations.length > 0 && (
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin size={14} className={isUpsideDownMode ? 'text-red-400' : 'text-amber-400'} />
                        <h3 className="text-gray-400 text-xs uppercase tracking-wider">
                          Available Locations
                        </h3>
                      </div>
                      <div className="space-y-2">
                        {product.locations.map((location, index) => (
                          <motion.div
                            key={location.id}
                            className={`
                              p-3 rounded-lg border
                              ${isUpsideDownMode 
                                ? 'bg-red-950/10 border-red-900/20' 
                                : 'bg-amber-950/10 border-amber-900/15'
                              }
                            `}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.65 + index * 0.1 }}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`
                                p-1.5 rounded
                                ${location.type === 'origin' 
                                  ? (isUpsideDownMode ? 'bg-red-900/40' : 'bg-amber-800/30')
                                  : location.type === 'event'
                                    ? (isUpsideDownMode ? 'bg-purple-900/40' : 'bg-purple-800/30')
                                    : (isUpsideDownMode ? 'bg-red-800/30' : 'bg-amber-700/30')
                                }
                              `}>
                                {location.type === 'origin' && <Hammer size={14} className={isUpsideDownMode ? 'text-red-300' : 'text-amber-300'} />}
                                {location.type === 'stock' && <Store size={14} className={isUpsideDownMode ? 'text-red-300' : 'text-amber-300'} />}
                                {location.type === 'event' && <Calendar size={14} className="text-purple-300" />}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className={`font-medium text-sm ${isUpsideDownMode ? 'text-red-200' : 'text-amber-200'}`}>
                                    {location.name}
                                  </span>
                                  <span className="text-gray-500 text-xs uppercase">
                                    {location.type}
                                  </span>
                                </div>
                                <p className="text-gray-400 text-xs">
                                  {location.city}, {location.country}
                                </p>
                                {location.flavorText && (
                                  <p className="text-gray-500 text-xs italic mt-1">
                                    "{location.flavorText}"
                                  </p>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Riddle Section (for black market items) */}
                  {product.isUpsideDown && product.riddle && (
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <RiddleCard riddle={product.riddle} productName={product.name} />
                    </motion.div>
                  )}

                  {/* Action Button */}
                  <motion.button
                    className={`
                      w-full py-4 rounded-lg font-bold uppercase tracking-wider
                      transition-all
                      ${isUpsideDownMode 
                        ? 'bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-red-100 shadow-lg shadow-red-900/50' 
                        : 'bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-amber-100 shadow-lg shadow-amber-900/30'
                      }
                    `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    {product.isUpsideDown ? 'Acquire at Your Own Risk' : 'Add to Collection'}
                  </motion.button>

                  {/* Item ID (subtle) */}
                  <motion.p
                    className="mt-4 text-center text-gray-600 text-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    Item ID: {product._id}
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

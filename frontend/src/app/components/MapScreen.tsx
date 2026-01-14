import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Store, Hammer, Calendar, X, Eye } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from '@/app/contexts/ThemeContext';
import { normalMarketplaceProducts, Product, ProductLocation } from '@/app/data/products';
import { ProductDetailModal } from '@/app/components/ProductDetailModal';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons for different location types
const createCustomIcon = (type: 'origin' | 'stock' | 'event', isUpsideDown: boolean) => {
  const colors = {
    origin: isUpsideDown ? '#991b1b' : '#b45309',   // Red/Amber for origin (where made)
    stock: isUpsideDown ? '#dc2626' : '#f59e0b',     // Brighter for stock (where sold)
    event: isUpsideDown ? '#7f1d1d' : '#92400e',     // Darker for events
  };
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background: ${colors[type]};
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 2px solid ${isUpsideDown ? '#450a0a' : '#78350f'};
        box-shadow: 0 0 10px ${colors[type]}80;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-size: 12px;
        ">
          ${type === 'origin' ? '⚒' : type === 'event' ? '★' : '◉'}
        </div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
};

interface LocationWithProduct {
  location: ProductLocation;
  product: Product;
}

export const MapScreen: React.FC = () => {
  const { isUpsideDownMode } = useTheme();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'origin' | 'stock' | 'event'>('all');

  // Gather all locations from normal products
  const allLocations = useMemo(() => {
    const locations: LocationWithProduct[] = [];
    normalMarketplaceProducts.forEach(product => {
      product.locations?.forEach(location => {
        locations.push({ location, product });
      });
    });
    return locations;
  }, []);

  // Filter locations by type
  const filteredLocations = useMemo(() => {
    if (filterType === 'all') return allLocations;
    return allLocations.filter(item => item.location.type === filterType);
  }, [allLocations, filterType]);

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const getLocationTypeLabel = (type: 'origin' | 'stock' | 'event') => {
    switch (type) {
      case 'origin': return 'Origin';
      case 'stock': return 'Available';
      case 'event': return 'Event';
    }
  };

  const getLocationTypeIcon = (type: 'origin' | 'stock' | 'event') => {
    switch (type) {
      case 'origin': return <Hammer size={14} />;
      case 'stock': return <Store size={14} />;
      case 'event': return <Calendar size={14} />;
    }
  };

  return (
    <div className={`h-full flex flex-col ${isUpsideDownMode ? 'bg-black' : 'bg-zinc-950'}`}>
      {/* Header */}
      <motion.div
        className="px-6 py-4 border-b border-amber-900/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <MapPin 
              size={28} 
              className={isUpsideDownMode ? 'text-red-400' : 'text-amber-400'}
            />
            <h1 
              className={`text-2xl font-bold ${isUpsideDownMode ? 'text-red-200' : 'text-amber-100'}`}
              style={{
                textShadow: isUpsideDownMode 
                  ? '0 0 15px rgba(220, 38, 38, 0.5)' 
                  : '0 0 15px rgba(251, 191, 36, 0.4)'
              }}
            >
              Market Map
            </h1>
          </div>

          {/* Filter buttons */}
          <div className="flex gap-2">
            {(['all', 'origin', 'stock', 'event'] as const).map(type => (
              <motion.button
                key={type}
                onClick={() => setFilterType(type)}
                className={`
                  px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5
                  transition-all
                  ${filterType === type 
                    ? (isUpsideDownMode 
                        ? 'bg-red-900/50 text-red-200 border border-red-700' 
                        : 'bg-amber-900/50 text-amber-200 border border-amber-700')
                    : 'bg-zinc-800/50 text-gray-400 border border-zinc-700 hover:bg-zinc-700/50'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {type === 'all' ? <MapPin size={14} /> : getLocationTypeIcon(type as 'origin' | 'stock' | 'event')}
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        <p className="text-gray-400 text-sm">
          {filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''} across the world
        </p>
      </motion.div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapContainer
          center={[48.8566, 10.3522]}
          zoom={4}
          className="h-full w-full"
          style={{ background: isUpsideDownMode ? '#0a0a0a' : '#18181b' }}
        >
          {/* Dark themed map tiles */}
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url={isUpsideDownMode 
              ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
              : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            }
          />

          {/* Location Markers */}
          {filteredLocations.map(({ location, product }) => (
            <Marker
              key={location.id}
              position={[location.lat, location.lng]}
              icon={createCustomIcon(location.type, isUpsideDownMode)}
              eventHandlers={{
                mouseover: () => setHoveredLocation(location.id),
                mouseout: () => setHoveredLocation(null),
              }}
            >
              <Popup className="custom-popup">
                <div 
                  className={`
                    p-3 rounded-lg min-w-[250px]
                    ${isUpsideDownMode 
                      ? 'bg-zinc-900 border border-red-900/50' 
                      : 'bg-zinc-900 border border-amber-900/30'
                    }
                  `}
                >
                  {/* Location header */}
                  <div className="flex items-center gap-2 mb-2">
                    {getLocationTypeIcon(location.type)}
                    <span className={`
                      text-xs uppercase tracking-wider font-medium
                      ${isUpsideDownMode ? 'text-red-400' : 'text-amber-400'}
                    `}>
                      {getLocationTypeLabel(location.type)}
                    </span>
                  </div>

                  {/* Location name */}
                  <h3 className={`font-bold text-lg mb-1 ${isUpsideDownMode ? 'text-red-100' : 'text-amber-100'}`}>
                    {location.name}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-2">
                    {location.city}, {location.country}
                  </p>

                  {/* Flavor text */}
                  {location.flavorText && (
                    <p className="text-gray-500 text-xs italic mb-3 border-l-2 border-amber-900/50 pl-2">
                      "{location.flavorText}"
                    </p>
                  )}

                  {/* Product preview */}
                  <div 
                    className={`
                      p-2 rounded border cursor-pointer
                      ${isUpsideDownMode 
                        ? 'bg-red-950/20 border-red-900/30 hover:bg-red-950/40' 
                        : 'bg-amber-950/20 border-amber-900/20 hover:bg-amber-950/40'
                      }
                      transition-colors
                    `}
                    onClick={() => handleViewProduct(product)}
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-sm truncate ${isUpsideDownMode ? 'text-red-200' : 'text-amber-200'}`}>
                          {product.name}
                        </p>
                        <p className={`text-sm font-bold ${isUpsideDownMode ? 'text-red-400' : 'text-amber-400'}`}>
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                      <Eye size={16} className="text-gray-500" />
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend */}
        <motion.div
          className={`
            absolute bottom-4 left-4 z-[1000] p-4 rounded-lg
            ${isUpsideDownMode 
              ? 'bg-black/90 border border-red-900/40' 
              : 'bg-black/90 border border-amber-900/30'
            }
          `}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-2">Legend</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-3 h-3 rounded-full ${isUpsideDownMode ? 'bg-red-800' : 'bg-amber-700'}`} />
              <Hammer size={12} className="text-gray-400" />
              <span className="text-gray-300">Origin (where made)</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-3 h-3 rounded-full ${isUpsideDownMode ? 'bg-red-600' : 'bg-amber-500'}`} />
              <Store size={12} className="text-gray-400" />
              <span className="text-gray-300">Stock (where sold)</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-3 h-3 rounded-full ${isUpsideDownMode ? 'bg-red-900' : 'bg-amber-800'}`} />
              <Calendar size={12} className="text-gray-400" />
              <span className="text-gray-300">Event (limited time)</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { Store, Film, Heart, Map } from 'lucide-react';
import { useTheme } from '@/app/contexts/ThemeContext';

interface NavigationProps {
  activeTab: 'marketplace' | 'reels' | 'favorites' | 'map';
  onTabChange: (tab: 'marketplace' | 'reels' | 'favorites' | 'map') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const { isUpsideDownMode } = useTheme();

  const tabs = [
    { id: 'marketplace' as const, label: 'Marketplace', icon: Store },
    { id: 'reels' as const, label: 'For You', icon: Film },
    { id: 'map' as const, label: 'Map', icon: Map },
    { id: 'favorites' as const, label: 'Saved', icon: Heart },
  ];

  return (
    <nav 
      className={`
        border-b
        ${isUpsideDownMode 
          ? 'bg-black/95 border-red-900/40 backdrop-blur-lg' 
          : 'bg-zinc-950/95 border-amber-900/30 backdrop-blur-lg'
        }
      `}
    >
      <div className="flex items-center justify-between px-8 py-4">
        {/* Logo/Title */}
        <motion.h1 
          className={`
            text-2xl font-bold tracking-wider
            ${isUpsideDownMode ? 'text-red-200' : 'text-amber-100'}
          `}
          style={{
            textShadow: isUpsideDownMode 
              ? '0 0 20px rgba(220, 38, 38, 0.6)' 
              : '0 0 15px rgba(251, 191, 36, 0.4)',
            fontFamily: 'serif'
          }}
        >
          {isUpsideDownMode ? '⊥HƎ ∩Ԁ˥IפƎ DOWN' : 'STRANGE MARKET'}
        </motion.h1>

        {/* Tab Navigation */}
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  relative px-6 py-3 rounded-lg font-medium transition-all
                  ${isActive 
                    ? (isUpsideDownMode 
                      ? 'text-red-200' 
                      : 'text-amber-100')
                    : 'text-gray-500 hover:text-gray-300'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  <Icon size={20} />
                  <span>{tab.label}</span>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className={`
                      absolute bottom-0 left-0 right-0 h-0.5
                      ${isUpsideDownMode ? 'bg-red-500' : 'bg-amber-500'}
                    `}
                    layoutId="activeTab"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{
                      boxShadow: isUpsideDownMode 
                        ? '0 0 10px rgba(220, 38, 38, 0.8)' 
                        : '0 0 10px rgba(251, 191, 36, 0.8)'
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

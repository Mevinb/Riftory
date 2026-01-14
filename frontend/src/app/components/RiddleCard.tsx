import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  MapPin, 
  User, 
  Scroll,
  Lock,
  Unlock,
  Sparkles
} from 'lucide-react';
import { BlackMarketRiddle } from '@/app/data/products';
import { useTheme } from '@/app/contexts/ThemeContext';

interface RiddleCardProps {
  riddle: BlackMarketRiddle;
  productName: string;
}

export const RiddleCard: React.FC<RiddleCardProps> = ({ riddle, productName }) => {
  const { isUpsideDownMode } = useTheme();
  const [showHint, setShowHint] = useState(false);
  const [showLore, setShowLore] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);

  const handleRevealHint = () => {
    setShowHint(true);
    setInteractionCount(prev => prev + 1);
  };

  const handleRevealLore = () => {
    if (interactionCount >= 2) {
      setShowLore(true);
    }
  };

  const getRiskLevelConfig = (level: string) => {
    switch (level) {
      case 'low':
        return { label: 'Low Risk', color: 'text-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-800/30' };
      case 'medium':
        return { label: 'Medium Risk', color: 'text-orange-400', bg: 'bg-orange-900/20', border: 'border-orange-800/30' };
      case 'high':
        return { label: 'High Risk', color: 'text-red-400', bg: 'bg-red-900/20', border: 'border-red-800/30' };
      case 'extreme':
        return { label: 'Extreme Risk', color: 'text-red-600', bg: 'bg-red-950/30', border: 'border-red-700/40' };
      default:
        return { label: 'Unknown', color: 'text-gray-400', bg: 'bg-gray-900/20', border: 'border-gray-800/30' };
    }
  };

  const riskConfig = getRiskLevelConfig(riddle.riskLevel);

  return (
    <motion.div
      className={`
        rounded-lg overflow-hidden
        ${isUpsideDownMode 
          ? 'bg-gradient-to-br from-red-950/30 via-black to-purple-950/20 border border-red-900/40' 
          : 'bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-amber-900/30'
        }
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="p-4 border-b border-red-900/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <MapPin size={18} className="text-red-400 opacity-60" />
            </motion.div>
            <span className="text-red-400/70 text-xs uppercase tracking-widest font-medium">
              Rumored Whereabouts
            </span>
          </div>
          
          {/* Risk Level Badge */}
          <motion.div
            className={`
              px-2 py-1 rounded text-xs font-bold uppercase tracking-wider
              ${riskConfig.bg} ${riskConfig.border} ${riskConfig.color} border
            `}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex items-center gap-1">
              <AlertTriangle size={12} />
              {riskConfig.label}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Riddle Content */}
      <div className="p-4 space-y-4">
        {/* Main Riddle */}
        <div className="relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-transparent to-red-600/10 rounded"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="relative p-4 rounded-lg bg-black/40 border border-red-900/20">
            <Scroll size={16} className="text-red-400/50 mb-2" />
            <p className="text-red-200 italic leading-relaxed text-lg">
              "{riddle.riddle}"
            </p>
          </div>
        </div>

        {/* Region Hint (always visible, vague) */}
        <div className="flex items-start gap-3 p-3 rounded bg-red-950/10 border border-red-900/10">
          <motion.div
            className="mt-0.5"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Eye size={16} className="text-red-400/60" />
          </motion.div>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Region</p>
            <p className="text-gray-400 text-sm">{riddle.regionHint}</p>
          </div>
        </div>

        {/* Hint Section (reveal on interaction) */}
        {riddle.hint && (
          <div className="relative">
            {!showHint ? (
              <motion.button
                onClick={handleRevealHint}
                className={`
                  w-full p-3 rounded-lg flex items-center justify-center gap-2
                  bg-red-950/20 border border-red-900/30
                  text-red-300 hover:bg-red-950/40 transition-colors
                `}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Lock size={16} />
                <span className="text-sm">Reveal Additional Hint</span>
              </motion.button>
            ) : (
              <motion.div
                className="p-3 rounded-lg bg-red-950/20 border border-red-800/30"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Unlock size={14} className="text-red-400" />
                  <span className="text-red-400/70 text-xs uppercase tracking-wider">Hint Revealed</span>
                </div>
                <p className="text-red-200 text-sm italic">"{riddle.hint}"</p>
              </motion.div>
            )}
          </div>
        )}

        {/* Intermediary Info */}
        {riddle.intermediary && (
          <div className="p-3 rounded-lg bg-purple-950/10 border border-purple-900/20">
            <div className="flex items-center gap-2 mb-2">
              <User size={14} className="text-purple-400/70" />
              <span className="text-purple-400/70 text-xs uppercase tracking-wider">Rumored Contact</span>
            </div>
            <p className="text-purple-300/80 text-sm italic">
              "{riddle.intermediary}"
            </p>
          </div>
        )}

        {/* Lore Unlock (requires interaction) */}
        {riddle.loreUnlock && (
          <div className="relative">
            <AnimatePresence mode="wait">
              {!showLore ? (
                <motion.button
                  key="locked"
                  onClick={handleRevealLore}
                  disabled={interactionCount < 2}
                  className={`
                    w-full p-3 rounded-lg flex items-center justify-center gap-2
                    border transition-all
                    ${interactionCount >= 2 
                      ? 'bg-purple-950/30 border-purple-800/40 text-purple-300 hover:bg-purple-950/50 cursor-pointer' 
                      : 'bg-zinc-900/30 border-zinc-800/30 text-gray-600 cursor-not-allowed'
                    }
                  `}
                  whileHover={interactionCount >= 2 ? { scale: 1.01 } : {}}
                  whileTap={interactionCount >= 2 ? { scale: 0.99 } : {}}
                  exit={{ opacity: 0 }}
                >
                  <Sparkles size={16} />
                  <span className="text-sm">
                    {interactionCount >= 2 
                      ? 'Unlock Hidden Lore' 
                      : `Lore Locked (interact ${2 - interactionCount} more time${2 - interactionCount !== 1 ? 's' : ''})`
                    }
                  </span>
                </motion.button>
              ) : (
                <motion.div
                  key="unlocked"
                  className="p-4 rounded-lg bg-gradient-to-br from-purple-950/30 to-red-950/20 border border-purple-800/40"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles size={16} className="text-purple-400" />
                    </motion.div>
                    <span className="text-purple-300 text-xs uppercase tracking-wider font-medium">
                      Lore Unlocked
                    </span>
                  </div>
                  <p className="text-purple-200/90 text-sm leading-relaxed">
                    {riddle.loreUnlock}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Footer warning */}
      <div className="px-4 py-3 border-t border-red-900/20 bg-red-950/10">
        <p className="text-red-400/60 text-xs text-center italic">
          ⚠ No exact location will ever be revealed for forbidden items
        </p>
      </div>
    </motion.div>
  );
};

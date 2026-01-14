import { useState, useCallback } from 'react';
import { ThemeProvider } from '@/app/contexts/ThemeContext';
import { FavoritesProvider } from '@/app/contexts/FavoritesContext';
import { Navigation } from '@/app/components/Navigation';
import { MarketplaceScreen } from '@/app/components/MarketplaceScreen';
import { ReelsScreen } from '@/app/components/ReelsScreen';
import { FavoritesScreen } from '@/app/components/FavoritesScreen';
import { MapScreen } from '@/app/components/MapScreen';
import { VisualEffects } from '@/app/components/VisualEffects';
import { SplashScreen } from '@/app/components/SplashScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'reels' | 'favorites' | 'map'>('marketplace');
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <ThemeProvider>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} duration={2500} />}
      <FavoritesProvider>
        <div className="h-screen w-screen bg-zinc-950 text-white overflow-hidden flex flex-col">
          {/* Global visual effects */}
          <VisualEffects />

          {/* Navigation */}
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Main content */}
          <div className="flex-1 overflow-hidden relative">
            {activeTab === 'marketplace' && <MarketplaceScreen />}
            {activeTab === 'reels' && <ReelsScreen />}
            {activeTab === 'map' && <MapScreen />}
            {activeTab === 'favorites' && <FavoritesScreen />}
          </div>
        </div>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

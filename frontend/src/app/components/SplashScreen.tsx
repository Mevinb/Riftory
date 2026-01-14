import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

export function SplashScreen({ onComplete, duration = 2500 }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const [flickerText, setFlickerText] = useState(true);

  useEffect(() => {
    // Random flicker effect for the text
    const flickerInterval = setInterval(() => {
      setFlickerText(prev => !prev);
      setTimeout(() => setFlickerText(true), 100);
    }, 200 + Math.random() * 800);

    // Start fade out animation before completing
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, duration - 500);

    // Complete and unmount splash screen
    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration);

    return () => {
      clearInterval(flickerInterval);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Dark foggy background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Static noise overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-noise animate-static" />
        
        {/* Red glow from bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-red-900/30 via-red-950/10 to-transparent" />
        
        {/* Floating particles/embers */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-500/60 rounded-full animate-float-up"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Flickering light effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl animate-flicker-light" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Stranger Things style title */}
        <div className="relative">
          {/* Glitch layers */}
          <h1 
            className="absolute text-6xl md:text-8xl font-bold tracking-[0.2em] text-red-500/50 blur-sm animate-glitch-1"
            style={{ fontFamily: 'ITC Benguiat, serif' }}
          >
            RIFTORY
          </h1>
          <h1 
            className="absolute text-6xl md:text-8xl font-bold tracking-[0.2em] text-cyan-500/30 blur-sm animate-glitch-2"
            style={{ fontFamily: 'ITC Benguiat, serif' }}
          >
            RIFTORY
          </h1>
          
          {/* Main title with flicker */}
          <h1 
            className={`text-6xl md:text-8xl font-bold tracking-[0.2em] text-red-600 transition-opacity duration-75 ${
              flickerText ? 'opacity-100' : 'opacity-30'
            }`}
            style={{ 
              fontFamily: 'ITC Benguiat, serif',
              textShadow: '0 0 10px rgba(220, 38, 38, 0.8), 0 0 20px rgba(220, 38, 38, 0.6), 0 0 40px rgba(220, 38, 38, 0.4), 0 0 80px rgba(220, 38, 38, 0.2)'
            }}
          >
            RIFTORY
          </h1>
        </div>

        {/* Subtitle */}
        <p 
          className="text-zinc-500 text-sm md:text-base tracking-[0.5em] uppercase animate-fade-in"
          style={{ animationDelay: '0.5s' }}
        >
          The Upside Down Market
        </p>

        {/* Eerie loading bar */}
        <div className="mt-8 w-48 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-red-800 via-red-600 to-red-800 animate-loading-bar"
            style={{ boxShadow: '0 0 10px rgba(220, 38, 38, 0.8)' }}
          />
        </div>

        {/* Creepy tagline */}
        <p className="text-red-900/60 text-xs tracking-widest mt-2 animate-pulse">
          Enter if you dare...
        </p>
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-radial-vignette" />
    </div>
  );
}


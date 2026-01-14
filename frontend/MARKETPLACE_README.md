# Strange Market - Mysterious Marketplace Application

A Stranger Things-inspired marketplace with hidden secrets and supernatural aesthetics.

## 🎭 Overview

Strange Market is a cinematic, discovery-first marketplace experience where users can explore mysterious artisan products through multiple interfaces. The app features a hidden "Upside Down" mode that transforms the entire experience into a dark black market.

## 🎨 Design Philosophy

### Visual Themes

**NORMAL MODE (Default)**
- 1980s retro supernatural aesthetic
- Dark but readable backgrounds (zinc-950)
- Warm amber glow (#f59e0b) for interactive elements
- Film grain overlay for cinematic feel
- Subtle vignette effect
- Muted neon accents

**UPSIDE DOWN MODE (Hidden)**
- Crushed blacks (pure black backgrounds)
- Blood red (#dc2626) + deep purple accents
- Heavy vignette and atmospheric effects
- Flickering and distortion
- Hostile, forbidden UI feel
- Different product inventory (cursed/experimental items)

### User Experience Principles

1. **Discovery-first**: No onboarding, users dive straight in
2. **Environmental storytelling**: UI tells a story through visual design
3. **Hidden mechanics**: Secret features reward exploration
4. **Cinematic transitions**: Heavy but intentional animations
5. **Lore over labels**: No obvious tutorial text

## 📱 Features

### 1. Main Marketplace
- Grid layout of artisan products
- Product cards with:
  - Hover animations and glow effects
  - Floating motion on interaction
  - Price tags with glowing text
  - Favorite/heart button
  - Rarity indicators
- Smooth scroll with custom scrollbar
- **Secret**: Contains the portal to Upside Down mode

### 2. For You (Reels Feed)
- TikTok/Instagram Reels-style vertical scrolling
- Full-screen product displays
- One product per screen with snap scrolling
- Interactions:
  - **Double-click**: Add to favorites (heart burst animation)
  - **Single-click**: Toggle UI visibility
  - **Mouse wheel/Arrow keys**: Navigate between products
  - **Touch swipe**: Mobile-style navigation
- Parallax background effects
- Progress indicator (dots on right side)
- Auto-adapts to current mode (normal vs upside down)

### 3. Favorites / Saved Items
- Global favorites management
- Session-only persistence
- Visual distinction for cursed items
- Warning labels for forbidden products
- Works in both modes
- Empty state with atmospheric messaging

### 4. Hidden Upside Down Mode

#### 🔐 SECRET ENTRY MECHANISM

To enter the Upside Down, users must:
1. Navigate to the **Marketplace** tab
2. Scroll to the very bottom of the page
3. Continue attempting to scroll down **3 times consecutively**

**Feedback per attempt:**

**1st Attempt:**
- Small screen shake (x/y jitter)
- Subtle red pulse at bottom of screen
- Progress bar appears (1/3 filled)

**2nd Attempt:**
- Stronger shake animation
- Static/glitch overlay flashes
- Progress bar (2/3 filled)

**3rd Attempt:**
- Intense screen shake
- Full glitch/static effect
- Screen fades through black
- **Mode switches**
- All products change
- Theme transforms to dark red

#### EXIT MECHANISM

Same process:
- Scroll past bottom 3 times while in Upside Down mode
- OR (hidden): Long-press on app title for 5 seconds (not implemented in current version)

**Attempts reset if:**
- User stops scrolling for more than 2 seconds
- User scrolls up or navigates away

### 5. Product Data Structure

MongoDB-style objects with Cloudinary image URLs:

```typescript
interface Product {
  _id: string;              // MongoDB ObjectId format
  name: string;             // Product name
  price: number;            // Price in USD
  description: string;      // Eerie description
  imageUrl: string;         // Cloudinary URL (via Unsplash)
  category: string;         // Product category
  seller: {
    name: string;           // Seller name
    type: 'artisan' | 'alchemist' | 'blacksmith' | 'collector' | 'unknown';
  };
  tags: string[];           // Product tags
  isUpsideDown?: boolean;   // Black market flag
  rarity?: 'common' | 'uncommon' | 'rare' | 'forbidden';
  warning?: string;         // For dangerous items
}
```

## 🎯 Key Technical Implementation

### State Management

**Global Context Providers:**
1. `ThemeProvider` - Manages `isUpsideDownMode` state
2. `FavoritesProvider` - Manages global favorites array

### Components

```
/src/app/
├── contexts/
│   ├── ThemeContext.tsx       # Mode switching (normal/upside down)
│   └── FavoritesContext.tsx   # Favorites management
├── data/
│   └── products.ts            # Mock product data
├── components/
│   ├── Navigation.tsx         # Top navigation bar
│   ├── ProductCard.tsx        # Marketplace grid item
│   ├── ReelItem.tsx          # Full-screen reel display
│   ├── MarketplaceScreen.tsx # Main marketplace + scroll detection
│   ├── ReelsScreen.tsx       # Vertical scroll feed
│   ├── FavoritesScreen.tsx   # Saved items page
│   └── VisualEffects.tsx     # Global atmospheric effects
└── App.tsx                    # Main app container
```

### Animations

**Libraries:**
- `motion` (Framer Motion) for all animations
- `AnimatePresence` for enter/exit transitions
- Spring physics for natural motion

**Key Animations:**
- Product card hover (scale, glow, shadow)
- Heart burst on double-tap
- Screen shake on scroll attempts
- Mode transition (fade through black)
- Glitch/static overlay
- Floating/parallax effects
- Vignette pulse (breathing effect)

### Scroll Detection Logic

Located in `MarketplaceScreen.tsx`:

```typescript
// Detects when user scrolls past bottom
const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = container;
  const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
  
  if (isAtBottom) {
    const now = Date.now();
    
    // Reset attempts if > 2 seconds passed
    if (now - lastScrollTime.current > 2000) {
      setScrollAttempts(1);
    } else {
      setScrollAttempts(prev => prev + 1);
    }
    
    // Trigger effects based on attempt count
    if (scrollAttempts >= 2) {
      // SWITCH MODES
      setUpsideDownMode(!isUpsideDownMode);
    }
  }
};
```

## 🎬 Visual Effects

### Film Grain Overlay
- SVG noise filter applied globally
- 3% opacity, overlay blend mode
- Creates vintage cinematic look

### Vignette
- Radial gradient from transparent to black
- Stronger in Upside Down mode (80% vs 60%)
- Applied via fixed overlay layer

### Mode-Specific Effects

**Normal Mode:**
- Warm amber glow from top
- Subtle breathing animation (opacity pulse)
- Film grain + light vignette

**Upside Down Mode:**
- Blood red atmospheric glow
- Heavy vignette (crushed blacks)
- Subtle flicker effect (random opacity drops)
- Stronger film grain
- Screen distortion on interactions

## 🎮 User Interactions

### Marketplace
- **Hover over product**: Scale up, glow effect
- **Click heart**: Add/remove from favorites
- **Scroll to bottom 3x**: Enter/exit Upside Down

### Reels
- **Mouse wheel**: Next/previous product
- **Arrow keys**: Navigation
- **Double-click**: Like/save product (heart burst)
- **Single-click**: Toggle UI overlay visibility
- **Touch swipe** (mobile): Vertical navigation

### Favorites
- **Click product**: View details (mocked)
- **Click heart**: Remove from favorites

## 🛠 Mock Data

### Normal Products (8 items)
- Handcrafted Skull Candle
- Rusted Iron Pendant
- Antique Pocket Watch
- Weathered Leather Journal
- Ancient Clay Vessel
- Tarnished Silver Mirror
- Bone Dice Set
- Preserved Moth Display

### Upside Down Products (8 items)
- Unfinished Cursed Blade
- Unstable Alchemy Vial
- Forbidden Grimoire Fragment
- Cracked Obsidian Amulet
- Failed Armor Prototype
- Void Crystal Shard
- Whispering Dagger
- Blood Moon Lantern

All products use real images from Unsplash.

## 🔧 Technical Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Motion (Framer Motion)** - Animations
- **Lucide React** - Icons
- **Vite** - Build tool

## 🎨 Color Palette

### Normal Mode
- Background: `#09090b` (zinc-950)
- Primary: `#f59e0b` (amber-500)
- Text: `#fef3c7` (amber-100)
- Accent: `#d97706` (amber-600)

### Upside Down Mode
- Background: `#000000` (pure black)
- Primary: `#dc2626` (red-600)
- Text: `#fecaca` (red-200)
- Accent: `#991b1b` (red-900)

## 🎭 Easter Eggs & Hidden Features

1. **Upside Down Mode**: The main secret (scroll detection)
2. **Rarity system**: Forbidden items pulse red
3. **Seller types**: Different seller personas
4. **Product warnings**: Eerie microcopy on dangerous items
5. **Inverted title**: Logo text inverts in Upside Down mode
6. **Progress bar**: Red bar at bottom during scroll attempts
7. **Double-tap hearts**: Different glow colors per mode

## 📝 Code Comments

All complex logic is commented:
- Scroll detection mechanism
- Mode switching logic
- Animation timings
- Touch gesture handlers
- State reset conditions

## 🚀 Future Enhancements

Ideas for expansion:
- Long-press title to exit (5 seconds)
- Product detail modal
- Shopping cart simulation
- Audio effects (ambient sounds)
- More visual glitch effects
- Additional secret products
- Seller profile pages
- Search with cryptic filters
- AR product preview (mock)

## 💡 Design Notes

- No login required - immediate access
- No onboarding screens
- Session-only state (no persistence)
- Hackathon/demo optimized
- Focus on discovery and delight
- Judges should find Upside Down "accidentally"

---

**Built with dark magic and React. Handle with care.** ⚠️

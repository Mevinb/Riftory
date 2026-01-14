# 🔮 Hidden Features Guide

## The Upside Down Portal

### How to Access

The most prominent secret in Strange Market is the **Upside Down Mode** - a complete transformation of the marketplace into a dark black market.

#### Entry Steps:

1. **Navigate to Marketplace tab** (should be the default on load)
2. **Scroll down** to the very bottom of the product grid
3. **Keep scrolling down** after you've reached the bottom
4. You'll need to attempt this **3 times in a row** within 2 seconds

#### Visual Feedback:

**Attempt 1:**
- Screen shakes slightly (small jitter)
- Faint red pulse appears
- Progress bar starts at bottom (1/3 red)

**Attempt 2:**
- Stronger screen shake
- Static/glitch overlay flashes across screen
- Progress bar grows (2/3 red)
- Heavier visual distortion

**Attempt 3:**
- Intense screen shake
- Full screen glitch effect
- Fade through black transition
- **MODE SWITCHES** 🌑

### What Changes in Upside Down Mode?

**Visual Transformation:**
- Background becomes pure black (#000000)
- All amber colors shift to blood red (#dc2626)
- Heavy vignette darkens edges
- Subtle flicker effect
- Logo text becomes inverted/distorted
- Film grain intensifies

**Product Inventory Changes:**
- All 8 marketplace items swap to cursed/forbidden items:
  - Unfinished Cursed Blade
  - Unstable Alchemy Vial
  - Forbidden Grimoire Fragment
  - Cracked Obsidian Amulet
  - Failed Armor Prototype
  - Void Crystal Shard
  - Whispering Dagger
  - Blood Moon Lantern

**UI Changes:**
- Navigation bar turns red-themed
- Product cards show "Forbidden" badges
- Prices glow with red shadow
- Warning messages appear on items
- Rarity indicators pulse red
- Heart icons become darker red when filled

**Microcopy Changes:**
- Header: "The Upside Down"
- Subtitle: "Items not meant for daylight. Tread carefully."
- Product warnings like:
  - "No refunds. No questions."
  - "Some things should stay unfinished."
  - "Knowledge has consequences."

### How to Exit

**Same mechanism as entry:**
1. Scroll to bottom of marketplace
2. Attempt to scroll down 3 more times
3. Watch the glitch effect reverse
4. Return to normal mode

**Alternative (Hidden):**
- Long-press on the app title for 5 seconds (not implemented in current version)

### Important Notes:

- Attempts **reset** if you stop scrolling for more than 2 seconds
- Scrolling up or changing tabs also resets the counter
- The progress bar at the bottom shows your current attempt (red line)
- Mode persists across tab changes (Reels and Favorites adapt too!)

---

## Reels Feed Secrets

### Double-Tap Easter Egg

In the **For You** tab:

**Double-click on any product** to:
- Add it to favorites instantly
- Trigger a massive heart burst animation
- Heart glows with mode-specific color (amber or red)
- Creates a satisfying "like" effect

### UI Hide/Show

**Single-click anywhere** on a reel to:
- Toggle the UI overlay visibility
- View the full product image without text
- Click again to bring UI back

### Navigation Methods

Most users won't discover all these:

1. **Mouse wheel** - Scroll up/down to navigate
2. **Arrow keys** (↑/↓) - Navigate between products
3. **Touch swipe** (if on touchscreen) - Swipe vertically
4. **Progress dots** - Visual indicator on right side shows position

---

## Product Card Interactions

### Hover Effects

Desktop users will notice:
- Cards scale up slightly (1.02x)
- Glow effect appears around edges
- Product image zooms in (1.1x scale)
- Shadow intensifies
- Atmospheric overlay brightens

### Heart Animation

When you favorite an item:
- Heart icon fills with color
- Background of heart button glows
- Subtle pulse animation (scale 1 → 1.2 → 1)
- Glow shadow appears (red or amber based on mode)

---

## Atmospheric Details

### Film Grain

A subtle noise texture overlays the entire app:
- Created with SVG turbulence filter
- 3% opacity in overlay blend mode
- Gives vintage/cinematic feel
- More noticeable in darker areas

### Vignette Effect

Darkens the edges of the screen:
- Radial gradient from center
- Normal mode: 60% opacity at edges
- Upside Down: 80-90% opacity (crushed blacks)
- Creates focus on center content

### Mode-Specific Glows

**Normal Mode:**
- Warm amber glow from top center
- Pulses slowly (breathing effect)
- Creates inviting atmosphere

**Upside Down Mode:**
- Blood red glow from top
- Faster, more aggressive pulse
- Random flicker effect (opacity drops)
- Creates hostile atmosphere

---

## Favorites System Secrets

### Cursed Item Warning

If you save any Upside Down items:
- A warning banner appears at bottom of Favorites page
- "⚠ You have forbidden items in your collection"
- Only shows if cursed items present
- Works across mode switches

### Session Persistence

- Favorites persist during your session
- Switching modes doesn't clear favorites
- You can have both normal AND cursed items saved
- Visual distinction shows which items are cursed
- Refreshing the page clears everything (no backend)

---

## Navigation Secrets

### Logo Transformation

Watch the app title closely:
- **Normal mode**: "STRANGE MARKET"
- **Upside Down mode**: "⊥HƎ ∩Ԁ˥IפƎ DOWN" (upside-down text)
- Glow color changes (amber → red)

### Active Tab Indicator

The underline beneath active tab:
- Uses layout animation for smooth movement
- Glows with mode-specific color
- Smooth spring physics transition

---

## Scroll Behavior Details

### Custom Scrollbar

The scrollbar theme adapts:
- Normal mode: Amber semi-transparent thumb
- Upside Down: Red semi-transparent thumb
- Hover brightens the color
- Dark track blends with background

### Infinite Attempts

You can enter/exit the Upside Down unlimited times:
- No cooldown or limits
- Each entry/exit shows full animation sequence
- Mode state persists until manually toggled

---

## Animation Timing Secrets

### Spring Physics

All major animations use spring physics:
- Natural easing curves
- Realistic momentum
- Stiffness: 300
- Damping: 30
- Creates fluid, organic feel

### Key Timings

- **Screen shake**: 0.5s
- **Glitch effect**: 0.3-0.5s  
- **Mode transition fade**: 0.8s
- **Heart burst**: 1s (with exit)
- **Card hover**: 0.4s
- **Reel navigation**: Spring (no fixed duration)

---

## Developer Secrets

### State Management

Both contexts (Theme and Favorites) are:
- Global and accessible anywhere
- Session-only (no localStorage)
- Fully reactive to changes
- Type-safe with TypeScript

### Mock Data Structure

Products follow MongoDB-style schema:
- `_id` uses ObjectId format
- Image URLs are "Cloudinary-style" (via Unsplash)
- Seller types match RPG archetypes
- Rarity system determines visual effects

---

## Pro Tips

1. **Explore everything** - Hover, click, double-click, scroll
2. **Try the reels first** - Most cinematic experience
3. **Find the portal** - The Upside Down is the main surprise
4. **Save mixed items** - Collect both normal and cursed for full effect
5. **Watch the details** - Film grain, vignette, glows all shift
6. **Test navigation** - Try all 3 methods in reels (wheel, keys, touch)

---

**Remember: "Some doors, once opened, cannot be closed."** 🚪🌑

(Except they can. Just scroll down 3 more times.) 😉

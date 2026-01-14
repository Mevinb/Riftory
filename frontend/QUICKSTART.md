# 🚀 Quick Start Guide

## Installation & Running

```bash
# The app is ready to run - all dependencies are installed
npm run dev
```

Open your browser and navigate to the local development URL (typically `http://localhost:5173`).

## First Experience

When the app loads, you'll land on the **Marketplace** tab showing 8 mysterious artisan products in a cinematic grid layout.

### What to Try First

**1. Explore the Marketplace** (1 minute)
- Hover over product cards to see glow effects
- Click the heart icon to save items
- Notice the film grain and atmospheric effects

**2. Discover the Reels** (2 minutes)
- Click the **"For You"** tab
- Scroll with mouse wheel or arrow keys
- **Double-click** on a product to favorite it (watch the heart burst!)
- Single-click to hide/show UI

**3. Find the Secret** (2 minutes)
- Go back to **Marketplace** tab
- Scroll all the way to the bottom
- Keep trying to scroll down after hitting the bottom
- Do this **3 times in a row** quickly
- Watch the transformation! 🌑

**4. Check Your Favorites** (1 minute)
- Click the **"Saved"** tab
- See all items you've favorited
- Notice if you saved any "forbidden" items

## Key Interactions

| Where | Action | Result |
|-------|--------|--------|
| Marketplace | Scroll to bottom 3x | Enter Upside Down mode |
| Any product | Click heart ❤️ | Save to favorites |
| Reels | Double-click | Favorite + animation |
| Reels | Single-click | Toggle UI |
| Reels | Mouse wheel/arrows | Navigate |

## The Secret Revealed

**To enter the Upside Down:**
1. Marketplace tab
2. Scroll to bottom
3. Try to scroll down 3 more times (within 2 seconds)
4. Watch the glitch effect!

**What changes:**
- Background becomes pure black
- Amber colors turn blood red
- All products swap to cursed items
- Heavy atmospheric effects
- Distorted logo
- Forbidden warnings appear

**To exit:**
- Same process (scroll bottom 3x)

## Quick Architecture

```
App (with ThemeProvider & FavoritesProvider)
├── Navigation (tabs)
├── MarketplaceScreen (grid + secret scroll)
├── ReelsScreen (vertical swipe feed)
├── FavoritesScreen (saved items)
└── VisualEffects (grain + vignette)
```

## Tips for Demo/Presentation

1. **Start with Reels** - Most impressive visually
2. **Show the double-tap heart** - People love the animation
3. **Discover the portal "accidentally"** - Makes it feel organic
4. **Switch modes** - Show the dramatic transformation
5. **Check favorites** - Show the cursed item warning

## Tech Stack at a Glance

- React 18 + TypeScript
- Tailwind CSS v4
- Motion (Framer Motion) for animations
- Session-only state (no backend)
- Mock MongoDB data structure

## Performance

The app is optimized for:
- Smooth 60fps animations
- Efficient re-renders
- Fast navigation
- Desktop-first experience

## Common Questions

**Q: Where's the login?**
A: No login! It's a demo - jump straight in.

**Q: Does data persist?**
A: Only during your session. Refresh = reset.

**Q: Why can't I find the secret?**
A: Scroll to the very bottom of Marketplace, then keep scrolling down 3 times quickly.

**Q: Can I exit Upside Down mode?**
A: Yes! Same process - scroll bottom 3x.

**Q: Do favorites work across modes?**
A: Yes! You can save both normal and cursed items.

## Next Steps

- Read [README.md](./README.md) for full feature list
- Check [HIDDEN_FEATURES.md](./HIDDEN_FEATURES.md) for all secrets
- Review [MARKETPLACE_README.md](./MARKETPLACE_README.md) for technical docs

---

**Enjoy exploring the Strange Market!** 🌑✨

*"Some doors, once opened, cannot be closed."*

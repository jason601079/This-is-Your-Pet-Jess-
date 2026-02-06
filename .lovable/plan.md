

# Cat Companion App Overhaul

This plan covers all the changes you requested. Here's a summary:

## 1. Remove the top-right button (QuietMode sun/moon icon)
Remove the QuietMode toggle button from the main screen entirely.

## 2. Remove "Good Evening" greeting
Remove the time-of-day greeting text from the top of the main screen.

## 3. Make the cat animatable with different poses/positions
Add the ability for the cat to move around the screen. The cat SVG will have multiple pose states (sitting, lying, stretching, standing) and will smoothly transition between positions on the screen.

## 4. Make toys (laser, yarn, feather) bigger
Increase the size of the toy button icons and their active toy displays (the laser dot, yarn ball, and feather wand).

## 5. Add a side panel with interaction actions
Create a slide-out side panel (mobile-friendly, swipe or tap to open) with a list of actions:
- **Shake** - cat gets annoyed/startled
- **Rub** - cat purrs and leans in
- **Touch** - cat reacts with a head tilt or ear twitch

Each action triggers a corresponding cat animation and reaction bubble.

## 6. Fix the MessageCarousel bugs
Three issues to fix:
- **Never-ending carousel**: Make it wrap around (loop) so swiping past the last card goes back to the first, and vice versa.
- **Card message changing on flip**: The bug is that `cards` are regenerated via `useMemo` when `discoveredCount` changes (which happens on every flip). This causes ALL card messages to regenerate. Fix: generate card messages once and store them in state, only adding new cards when needed.
- **Only flip the tapped card**: Currently working correctly per the code, but the message regeneration makes it look like other cards changed. Fixing the message stability resolves this.

## 7. Intro screen "Shake to wake" feature
On the intro screen where it says "Wake them up... or don't", add:
- A hint text: "try shaking your phone..."
- Use the DeviceMotion API to detect phone shaking
- When shaken, the cat wakes up annoyed with a grumpy reaction like "...really?" or "I was SLEEPING." and then proceeds to the setup/main screen

---

## Technical Details

### Files to modify:

| File | Changes |
|------|---------|
| `src/pages/Index.tsx` | Remove QuietMode import/usage, remove time greeting, add side panel state, pass new interaction handlers |
| `src/components/QuietMode.tsx` | Delete or leave unused |
| `src/components/CatCompanion.tsx` | Add position/pose state, accept new interaction types (shake, rub, touch), animate position transitions |
| `src/components/CatSVG.tsx` | Add new pose variants (lying, stretching, standing), support position-based transforms |
| `src/components/CatToys.tsx` | Increase icon sizes from 14 to 24, scale up active toy displays |
| `src/components/MessageCarousel.tsx` | Fix card message regeneration bug (use `useRef` to persist messages), implement infinite loop wrapping with modulo math |
| `src/components/IntroScreen.tsx` | Add DeviceMotion shake detection, show "shake your phone" hint, handle annoyed wake-up reaction |
| `src/index.css` | Add new keyframe animations for cat movement (walk, stretch, lie down) |

### New file to create:

| File | Purpose |
|------|---------|
| `src/components/ActionPanel.tsx` | Side panel component with Shake/Rub/Touch action buttons, slides in from the right edge, mobile-optimized with large touch targets |

### Carousel fix approach:
- Store card messages in a `useRef` so they persist across renders
- Use modular index math for infinite scrolling: when reaching the end, wrap to the beginning
- Remove `discoveredCount` from the `useMemo` dependency to prevent message regeneration

### Shake detection approach:
- Use `window.addEventListener('devicemotion', ...)` on the intro screen
- Detect acceleration magnitude exceeding a threshold (~15 m/s^2)
- On shake: show the cat waking up annoyed, display a grumpy speech bubble, then auto-proceed after a short delay

### Cat movement approach:
- Add a `catPosition` state with x/y coordinates
- Cat randomly wanders to new positions every 8-12 seconds with smooth CSS transitions
- Different poses trigger at different positions (e.g., lying down near edges, stretching after moving)
- Interactions from the side panel also trigger pose changes

### Build error fixes:
- Fix the `"glow"` and `"glass"` button variant errors by adding those variants back to the button component
- Fix the `"xl"` size variant error similarly
- Fix the missing `@supabase/supabase-js` import (install the package)


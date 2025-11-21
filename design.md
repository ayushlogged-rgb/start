# CS1.6 Mobile Clone - Design Document

## Design Philosophy

### Visual Language
The design embraces the authentic Counter-Strike 1.6 aesthetic with modern mobile enhancements. We're preserving the gritty, tactical military feel that made CS1.6 iconic while optimizing for touch interfaces and mobile performance.

### Color Palette
- **Primary**: Military olive drab (#556B2F) and desert tan (#D2B48C)
- **Secondary**: Steel gray (#708090) and tactical black (#2F2F2F)
- **Accent**: Warning orange (#FF8C00) for critical UI elements
- **Text**: High contrast white (#FFFFFF) on dark backgrounds, black (#000000) on light
- **HUD**: Semi-transparent dark overlay with vibrant green (#00FF00) for health/armor

### Typography
- **Primary Font**: "Orbitron" - Futuristic military-style font for headings and UI elements
- **Secondary Font**: "Roboto Mono" - Clean monospace for stats, scores, and technical readouts
- **Body Font**: "Inter" - Highly legible sans-serif for descriptions and general text

### Visual Hierarchy
- Large, bold headings for game modes and weapon categories
- Compact, information-dense layouts for mobile screens
- High contrast elements for critical gameplay information
- Subtle shadows and borders to separate UI components

## Visual Effects and Styling

### Used Libraries
- **Three.js**: 3D game engine for authentic FPS gameplay
- **Anime.js**: Smooth UI animations and weapon switching effects
- **Matter.js**: Physics simulation for realistic bullet trajectories
- **PIXI.js**: Particle effects for muzzle flashes, explosions, and smoke
- **ECharts.js**: Player statistics and match data visualization
- **Splide**: Weapon carousel and map selection sliders

### Animation Effects
- **Weapon Switching**: Quick, snappy transitions with subtle recoil animation
- **Reload Sequences**: Realistic magazine changes with audio synchronization
- **Damage Indicators**: Directional hit markers with screen shake effects
- **Score Updates**: Animated number counters with team color highlights
- **Menu Transitions**: Slide-in panels with military-style timing

### Header Effects
- **Main Menu**: Parallax scrolling background with tactical overlay graphics
- **Game HUD**: Semi-transparent panels with subtle scanline effects
- **Loading Screens**: Animated progress bars with CS1.6-style loading indicators

### Interactive Elements
- **Touch Controls**: Large, responsive buttons with haptic-style feedback
- **Weapon Selection**: 3D weapon models with rotation and inspection
- **Map Previews**: Interactive mini-maps with spawn point indicators
- **Crosshair**: Customizable reticle with dynamic sizing based on movement

### Background Design
- **Consistent Theme**: Military/tactical aesthetic throughout all pages
- **Subtle Patterns**: Digital camouflage and tactical grid overlays
- **Depth Layers**: Multiple parallax layers for visual depth
- **Performance Optimized**: Lightweight textures suitable for mobile devices

### Mobile-Specific Design
- **Touch Targets**: Minimum 44px touch areas for all interactive elements
- **Thumb-Friendly**: Critical controls positioned within thumb reach
- **Gesture Support**: Swipe gestures for weapon switching and map navigation
- **Responsive Layouts**: Adaptive designs for various screen sizes
- **Performance First**: Optimized graphics and effects for smooth 60fps gameplay

### Authentic CS1.6 Elements
- **Weapon Models**: Faithful recreations of classic CS1.6 weapon designs
- **Map Layouts**: Accurate representations of iconic maps like de_dust2
- **Sound Design**: Authentic weapon sounds and radio commands
- **UI Layout**: Familiar buy menu and scoreboard layouts
- **Game Mechanics**: True-to-original recoil patterns and damage values

This design approach ensures the mobile version captures the essence of CS1.6 while providing an optimized, modern gaming experience on mobile devices.
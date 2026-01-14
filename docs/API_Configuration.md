# Configuration API Reference

Complete reference for all configuration options in the Cosmos Simulation.

## Overview

Configuration is spread across multiple modules:
- **WebGLRenderer.settings** - Rendering settings
- **TimeSystem.timeScales** - Time scale presets
- **PhysicsEngine constants** - Physics calculation parameters

---

## WebGLRenderer Settings

### Complete Settings Object

```javascript
WebGLRenderer.settings = {
    // Visibility Toggles
    showOrbits: false,           // Show orbital path lines
    showLabels: false,           // Show body name labels
    showAsteroids: false,        // Show asteroid belt
    showMoons: true,             // Show moon bodies
    
    // Scale Factors
    scalePlanets: 0.0001,        // Planet size multiplier
    scaleDistances: 1,           // Distance scaling (AU)
    scaleMoons: 0.0005,          // Moon size multiplier
    
    // Visual Appearance
    orbitOpacity: 0.3,           // Orbital line transparency
    labelSize: 14,               // Label font size in pixels
    labelColor: '#88AAFF',       // Label text color
    
    // Performance Settings
    starFieldDensity: 100,       // Number of stars
    asteroidCount: 50,           // Number of asteroids
    
    // Rendering Quality
    antialias: false,            // Enable antialiasing
    pixelRatio: 1,               // Device pixel ratio
    powerPreference: 'low-power' // GPU power preference
    
    // Camera Constraints
    minDistance: 1,              // Minimum camera distance
    maxDistance: 10000,          // Maximum camera distance
    
    // Controls
    rotateSpeed: 0.5,            // Rotation sensitivity
    zoomSpeed: 1,                // Zoom sensitivity
    panSpeed: 1,                 // Pan sensitivity
    dampingFactor: 0.05          // Smoothness of controls
};
```

### Visibility Settings

#### showOrbits

**Type:** `boolean`  
**Default:** `false`

Controls visibility of orbital path lines.

```javascript
// Show orbital paths
WebGLRenderer.settings.showOrbits = true;
WebGLRenderer.toggleOrbits(true);

// Hide orbital paths
WebGLRenderer.settings.showOrbits = false;
WebGLRenderer.toggleOrbits(false);
```

**Effect:**
```
Without orbits:     With orbits:
    ●                    ●──────●
   Earth              Earth ────► Mars
```

#### showLabels

**Type:** `boolean`  
**Default:** `false`

Controls visibility of body name labels.

```javascript
// Show labels
WebGLRenderer.settings.showLabels = true;
WebGLRenderer.toggleLabels(true);
```

**Label Style:**
```css
.body-label {
    position: absolute;
    color: #88AAFF;
    font-size: 14px;
    font-family: Arial, sans-serif;
    text-shadow: 0 0 5px #000;
    pointer-events: none;
}
```

#### showAsteroids

**Type:** `boolean`  
**Default:** `false`

Controls visibility of the asteroid belt.

```javascript
// Toggle asteroid belt
WebGLRenderer.settings.showAsteroids = true;
WebGLRenderer.toggleAsteroids(true);
```

#### showMoons

**Type:** `boolean`  
**Default:** `true`

Controls visibility of moon bodies.

```javascript
// Hide moons for cleaner view
WebGLRenderer.settings.showMoons = false;
WebGLRenderer.toggleMoons(false);
```

### Scale Settings

#### scalePlanets

**Type:** `number`  
**Default:** `0.0001`

Planet size scale factor. Adjusts the visual size of planets relative to their actual size.

```javascript
// Default scale (realistic proportions)
WebGLRenderer.settings.scalePlanets = 0.0001;

// Larger planets for visibility
WebGLRenderer.settings.scalePlanets = 0.001;

// Custom scale
WebGLRenderer.settings.scalePlanets = 0.0005;
```

**Visual Comparison:**
```
Real scale (0.0001):     Enhanced scale (0.001):
    .                         ●
  Earth                    Earth
                           
Sun (5 units):           Sun (5 units):
   ●●●●●                    ●●●●●
```

#### scaleDistances

**Type:** `number`  
**Default:** `1`

Distance scaling factor. Note: This is primarily for internal use; the renderer handles distance visualization differently.

```javascript
WebGLRenderer.settings.scaleDistances = 1; // Default (AU)
```

### Performance Settings

#### starFieldDensity

**Type:** `number`  
**Default:** `100`

Number of stars in the background star field.

```javascript
// Low density (performance)
WebGLRenderer.settings.starFieldDensity = 50;

// Medium density (balanced)
WebGLRenderer.settings.starFieldDensity = 200;

// High density (visual quality)
WebGLRenderer.settings.starFieldDensity = 500;
```

#### asteroidCount

**Type:** `number`  
**Default:** `50`

Number of asteroids in the asteroid belt.

```javascript
// Minimal asteroids
WebGLRenderer.settings.asteroidCount = 20;

// Default
WebGLRenderer.settings.asteroidCount = 50;

// Dense asteroid belt
WebGLRenderer.settings.asteroidCount = 200;
```

### Camera Settings

#### minDistance

**Type:** `number`  
**Default:** `1`

Minimum camera distance from center (AU).

```javascript
WebGLRenderer.controls.minDistance = 1;
```

#### maxDistance

**Type:** `number`  
**Default:** `10000`

Maximum camera distance from center (AU).

```javascript
// Allow zooming out further
WebGLRenderer.controls.maxDistance = 50000;

// Limit zoom for guided tours
WebGLRenderer.controls.maxDistance = 100;
```

---

## TimeSystem Configuration

### Time Scale Presets

```javascript
TimeSystem.timeScales = {
    'paused': 0,             // No time progression
    'realtime': 1,           // 1 second = 1 second
    '1min/sec': 60,          // 1 minute per second
    '1hour/sec': 3600,       // 1 hour per second
    '1day/sec': 86400,       // 1 day per second
    '1week/sec': 604800,     // 1 week per second
    '1month/sec': 2592000,   // 1 month per second
    '1year/sec': 31536000,   // 1 year per second
    '10years/sec': 315360000,// 10 years per second
    '100years/sec': 3153600000,
    '1000years/sec': 31536000000
};
```

### Custom Time Scale

```javascript
// Set arbitrary time scale
TimeSystem.setTimeScale(86400 * 7); // 1 week per second

// Using preset
TimeSystem.setTimeScalePreset('1day/sec');

// Get current scale
const currentScale = TimeSystem.getTimeScale();

// Get display name
const displayName = TimeSystem.getTimeScaleDisplay();
```

### Default Configuration

```javascript
const TIME_CONFIG = {
    defaultScale: 86400,           // 1 day per second
    maxScale: 31536000000,         // 1000 years per second
    minScale: 0,                   // Paused
    updateInterval: null           // requestAnimationFrame
};
```

---

## PhysicsEngine Constants

### Physical Constants

```javascript
PhysicsEngine.G = 6.67430e-11;      // Gravitational constant (m³ kg⁻¹ s⁻²)
PhysicsEngine.AU = 149597870700;    // Astronomical Unit (meters)
PhysicsEngine.DAY = 86400;          // Seconds per day
PhysicsEngine.DEG2RAD = Math.PI / 180;
PhysicsEngine.RAD2DEG = 180 / Math.PI;
```

### Solver Settings

```javascript
PhysicsEngine.solver = {
    tolerance: 1e-8,        // Convergence tolerance for Kepler solver
    maxIterations: 100,     // Maximum Newton-Raphson iterations
    minPeriod: 0.01         // Minimum orbital period (days)
};
```

### Custom Solver Configuration

```javascript
// For higher precision (slower)
PhysicsEngine.solver.tolerance = 1e-12;
PhysicsEngine.solver.maxIterations = 200;

// For faster calculations (lower precision)
PhysicsEngine.solver.tolerance = 1e-6;
PhysicsEngine.solver.maxIterations = 50;
```

---

## Complete Configuration Example

```javascript
// Complete configuration setup
const COSMOS_CONFIG = {
    // Renderer settings
    renderer: {
        showOrbits: true,
        showLabels: true,
        showAsteroids: false,
        showMoons: true,
        scalePlanets: 0.0001,
        orbitOpacity: 0.3,
        starFieldDensity: 200,
        asteroidCount: 100,
        labelSize: 14,
        
        // Performance
        antialias: false,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
        
        // Camera
        minDistance: 1,
        maxDistance: 10000,
        
        // Controls
        rotateSpeed: 0.5,
        zoomSpeed: 1.0,
        dampingFactor: 0.05
    },
    
    // Time settings
    time: {
        defaultScale: 86400,        // 1 day per second
        maxScale: 3153600000,       // 100 years per second
        initialDate: '2000-01-01',  // J2000
    },
    
    // Physics settings
    physics: {
        tolerance: 1e-8,
        maxIterations: 100,
        minPeriod: 0.01
    },
    
    // Body visibility
    bodies: {
        visiblePlanets: ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'],
        visibleMoons: true,
        visibleComets: false
    }
};

// Apply configuration
function applyConfiguration(config) {
    // Renderer
    Object.assign(WebGLRenderer.settings, config.renderer);
    
    // Time
    TimeSystem.setTimeScalePreset('1day/sec');
    
    // Physics
    PhysicsEngine.solver.tolerance = config.physics.tolerance;
}
```

---

## Platform-Specific Settings

### Desktop

```javascript
const DESKTOP_CONFIG = {
    renderer: {
        antialias: true,
        pixelRatio: window.devicePixelRatio,
        starFieldDensity: 500,
        asteroidCount: 200
    },
    controls: {
        rotateSpeed: 0.5,
        zoomSpeed: 1.2
    }
};
```

### Mobile

```javascript
const MOBILE_CONFIG = {
    renderer: {
        antialias: false,
        pixelRatio: 1, // Reduce for battery life
        starFieldDensity: 100,
        asteroidCount: 50
    },
    controls: {
        rotateSpeed: 0.3,
        zoomSpeed: 0.8
    }
};
```

### Low-Power Devices

```javascript
const LOW_POWER_CONFIG = {
    renderer: {
        antialias: false,
        pixelRatio: 1,
        starFieldDensity: 50,
        asteroidCount: 20,
        showOrbits: false, // Disable expensive orbit rendering
        showLabels: false
    },
    physics: {
        tolerance: 1e-6,  // Lower precision
        maxIterations: 50 // Fewer iterations
    }
};
```

---

## Configuration Persistence

### Save Settings

```javascript
function saveConfiguration() {
    const settings = {
        renderer: WebGLRenderer.settings,
        timeScale: TimeSystem.getTimeScale(),
        physics: {
            tolerance: PhysicsEngine.solver.tolerance
        }
    };
    
    localStorage.setItem('cosmosConfig', JSON.stringify(settings));
}
```

### Load Settings

```javascript
function loadConfiguration() {
    const saved = localStorage.getItem('cosmosConfig');
    if (saved) {
        const settings = JSON.parse(saved);
        
        Object.assign(WebGLRenderer.settings, settings.renderer);
        TimeSystem.setTimeScale(settings.timeScale);
        PhysicsEngine.solver.tolerance = settings.physics.tolerance;
    }
}
```

---

## See Also

- [Integration](API_Integration.md) - How configurations affect engine behavior
- [WebGLRenderer](API_WebGLRenderer.md) - Renderer settings reference
- [TimeSystem](API_TimeSystem.md) - Time management
- [PhysicsEngine](API_PhysicsEngine.md) - Physics parameters


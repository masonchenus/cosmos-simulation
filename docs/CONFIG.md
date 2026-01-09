# Configuration Guide

Comprehensive configuration options for the Cosmos Simulation application.

## Overview

Configuration is distributed across multiple files:

| File                                   | Purpose                       |
| -------------------------------------- | ----------------------------- |
| `Engine/AstronomicalData.js`           | Celestial body data constants |
| `Engine/PhysicsEngine.js`              | Physics calculation constants |
| `Engine/TimeSystem.js`                 | Time system constants         |
| `Resources/Assets/js/WebGLRenderer.js` | Rendering settings            |
| `index.html`                           | UI configuration              |

## Astronomical Data Constants

Located in `Engine/AstronomicalData.js`:

```javascript
const AstronomicalData = {
    AU: 149597870700,    // Astronomical Unit (meters)
    DAY: 86400,          // Seconds per day
    DEG2RAD: Math.PI / 180,
    RAD2DEG: 180 / Math.PI,
    J2000: new Date('2000-01-01T12:00:00Z')
};
```

### Constants

| Constant  | Value        | Description                  |
| --------- | ------------ | ---------------------------- |
| `AU`      | 149597870700 | Distance Earth-Sun in meters |
| `DAY`     | 86400        | Seconds in one day           |
| `DEG2RAD` | π/180        | Degrees to radians           |
| `RAD2DEG` | 180/π        | Radians to degrees           |
| `J2000`   | Date object  | J2000 epoch reference        |

## Physics Engine Constants

Located in `Engine/PhysicsEngine.js`:

```javascript
const PhysicsEngine = {
    G: 6.67430e-11,           // Gravitational constant
    AU: 149597870700,         // Astronomical Unit (m)
    DAY: 86400,               // Seconds per day
    DEG2RAD: Math.PI / 180,
    RAD2DEG: 180 / Math.PI
};
```

### Constants

| Constant | Value        | Description                       |
| -------- | ------------ | --------------------------------- |
| `G`      | 6.67430e-11  | Gravitational constant (m³/kg/s²) |
| `AU`     | 149597870700 | Astronomical Unit in meters       |
| `DAY`    | 86400        | Seconds per day                   |

### State Configuration

```javascript
simTime: 0,              // Starting simulation time (days since J2000)
timeScale: 1,            // Time multiplier (1 = real time)
isPlaying: false         // Auto-play on startup
```

## Time System Constants

Located in `Engine/TimeSystem.js`:

```javascript
const TimeSystem = {
    DAY: 86400000,       // Milliseconds per day
    HOUR: 3600000,       // Milliseconds per hour
    MINUTE: 60000,       // Milliseconds per minute
    SECOND: 1000,        // Milliseconds per second
    
    J2000_EPOCH: new Date('2000-01-01T12:00:00Z'),
    J2000_JD: 2451545.0
};
```

### Time Scale Presets

```javascript
timeScales: {
    'paused': 0,
    'realtime': 1,
    '1min/sec': 60,
    '1hour/sec': 3600,
    '1day/sec': 86400,
    '1week/sec': 604800,
    '1month/sec': 2592000,
    '1year/sec': 31536000,
    '10years/sec': 315360000,
    '100years/sec': 3153600000,
    '1000years/sec': 31536000000
}
```

## WebGL Renderer Settings

Located in `Resources/Assets/js/WebGLRenderer.js`:

```javascript
settings: {
    showOrbits: false,
    showLabels: false,
    showAsteroids: false,
    showMoons: true,
    scalePlanets: 0.0001,
    scaleDistances: 1,
    orbitOpacity: 0.3,
    labelSize: 14,
    starFieldDensity: 500,
    asteroidCount: 100
}
```

### Visualization Settings

| Setting            | Default | Range   | Description                |
| ------------------ | ------- | ------- | -------------------------- |
| `showOrbits`       | false   | boolean | Display orbital paths      |
| `showLabels`       | false   | boolean | Show body name labels      |
| `showAsteroids`    | false   | boolean | Display asteroid belt      |
| `showMoons`        | true    | boolean | Display moons              |
| `scalePlanets`     | 0.0001  | number  | Planet size multiplier     |
| `scaleDistances`   | 1       | number  | Distance scale factor      |
| `orbitOpacity`     | 0.3     | 0-1     | Orbit line transparency    |
| `labelSize`        | 14      | number  | Label font size (px)       |
| `starFieldDensity` | 500     | number  | Number of background stars |
| `asteroidCount`    | 100     | number  | Number of asteroids        |

### Performance Tuning

For low-power devices:

```javascript
settings: {
    starFieldDensity: 200,       // Reduce stars
    asteroidCount: 50,           // Fewer asteroids
    orbitOpacity: 0,             // Hide orbits
    scalePlanets: 0.00005        // Smaller planets
}
```

For high-end devices:

```javascript
settings: {
    starFieldDensity: 2000,      // More stars
    asteroidCount: 500,          // More asteroids
    orbitOpacity: 0.5,           // Brighter orbits
    scalePlanets: 0.0002         // Larger planets
}
```

### Renderer Options

```javascript
renderer: new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
})
```

| Option            | Default            | Description            |
| ----------------- | ------------------ | ---------------------- |
| `antialias`       | true               | Smooth edges           |
| `alpha`           | true               | Transparent background |
| `powerPreference` | "high-performance" | GPU preference         |

### Camera Settings

```javascript
camera: new THREE.PerspectiveCamera(
    60,                              // Field of view
    window.innerWidth / window.innerHeight,  // Aspect ratio
    0.1,                             // Near clipping
    1000000                          // Far clipping
)
```

### Controls Settings

```javascript
controls: {
    enableDamping: true,
    dampingFactor: 0.05,
    minDistance: 1,
    maxDistance: 10000,
    enablePan: true,
    panSpeed: 1,
    rotateSpeed: 0.5,
    zoomSpeed: 1
}
```

## UI Configuration

### HTML Structure

```html
<div id="container">
    <div id="loading">Loading...</div>
    <div id="controls">
        <button id="play-pause">▶ Play</button>
        <button id="reset-time">↺ Reset</button>
        <input type="range" id="time-speed" min="0" max="100" value="50">
        <div id="speed-display">1day/sec</div>
    </div>
    <div id="bodies-tree"></div>
    <div id="info-panel" class="hidden">
        <h3 id="body-name"></h3>
        <div id="body-info"></div>
    </div>
</div>
```

### Control IDs

| Element ID       | Purpose                    |
| ---------------- | -------------------------- |
| `play-pause`     | Toggle simulation playback |
| `reset-time`     | Reset to J2000 epoch       |
| `time-speed`     | Time scale slider          |
| `speed-display`  | Current time scale display |
| `current-date`   | Current simulation date    |
| `show-orbits`    | Toggle orbit visibility    |
| `show-labels`    | Toggle label visibility    |
| `show-asteroids` | Toggle asteroid visibility |
| `show-moons`     | Toggle moon visibility     |
| `bodies-tree`    | Celestial body navigation  |
| `info-panel`     | Selected body information  |

## OrbitControls Key Bindings

| Key    | Action        |
| ------ | ------------- |
| Space  | Play/Pause    |
| Escape | Deselect body |
| R      | Reset time    |
| +/=    | Zoom in       |
| -      | Zoom out      |

## Data Fetch Configuration

Located in `Scripts/fetchAstronomicalData.js`:

```javascript
const CONFIG = {
    outputPath: path.join(__dirname, '..', 'Engine', 'AstronomicalData.js'),
    apiBaseUrl: 'https://api.le-systeme-solaire.net/rest/bodies'
};
```

## Environment Variables

Create `.env` file for custom configuration:

```bash
# API Configuration
SOLAR_SYSTEM_API_URL=https://api.le-systeme-solaire.net/rest/bodies

# Output paths
ASTRONOMICAL_DATA_OUTPUT=Engine/AstronomicalData.js

# Rendering
DEFAULT_PIXEL_RATIO=1
MAX_STARS=2000
MAX_ASTEROIDS=500
```

## Production Configuration

For production deployment:

```javascript
// Enable optimizations
settings: {
    starFieldDensity: 300,
    asteroidCount: 100,
    scalePlanets: 0.00008  // More realistic sizing
}

// Disable debug features
renderer: new THREE.WebGLRenderer({
    antialias: false,        // Reduce GPU load
    powerPreference: "high-performance"
})
```

## Configuration Best Practices

1. **Start with defaults** - Test before customizing
2. **Use presets for time scales** - Easier to maintain
3. **Adjust scale for visualization** - Real solar system doesn't render well 1:1
4. **Consider device capabilities** - Mobile needs different settings than desktop
5. **Cache configuration** - Avoid recalculating on each frame

## Runtime Configuration Change

```javascript
// Change settings at runtime
function optimizeForMobile() {
    WebGLRenderer.settings.starFieldDensity = 200;
    WebGLRenderer.settings.asteroidCount = 50;
    WebGLRenderer.settings.showOrbits = false;
    WebGLRenderer.settings.showLabels = false;
    WebGLRenderer.renderer.setPixelRatio(1);
}

function optimizeForDesktop() {
    WebGLRenderer.settings.starFieldDensity = 1000;
    WebGLRenderer.settings.asteroidCount = 300;
    WebGLRenderer.settings.showOrbits = true;
    WebGLRenderer.settings.showLabels = true;
    WebGLRenderer.renderer.setPixelRatio(window.devicePixelRatio);
}
```

## See Also

- [API_AstronomicalData](API_AstronomicalData.md)
- [API_PhysicsEngine](API_PhysicsEngine.md)
- [API_TimeSystem](API_TimeSystem.md)
- [API_WebGLRenderer](API_WebGLRenderer.md)
- [USAGE.md](USAGE.md)


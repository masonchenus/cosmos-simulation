# Usage Guide

Comprehensive examples and integration patterns for the Cosmos Simulation API.

## Table of Contents

1. [Basic Setup](#basic-setup)
2. [Initialization Examples](#initialization-examples)
3. [Time Control](#time-control)
4. [Position Calculations](#position-calculations)
5. [Rendering Integration](#rendering-integration)
6. [Custom Extensions](#custom-extensions)
7. [Common Patterns](#common-patterns)
8. [Troubleshooting](#troubleshooting)

## Basic Setup

### HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cosmos Simulation</title>
    <link rel="stylesheet" href="Resources/Assets/css/styles.css">
</head>
<body>
    <div id="container"></div>
    
    <div id="loading">
        <div class="spinner"></div>
        <p>Initializing Cosmos Simulation...</p>
    </div>
    
    <div id="controls">
        <button id="play-pause">▶ Play</button>
        <button id="reset-time">↺ Reset</button>
        <input type="range" id="time-speed" min="0" max="100" value="50">
        <span id="speed-display">1day/sec</span>
        <span id="current-date">2000-01-01</span>
    </div>
    
    <div id="info-panel" class="hidden">
        <h3 id="body-name">Body Name</h3>
        <div id="body-info"></div>
    </div>
    
    <script src="Resources/Assets/js/three.min.js"></script>
    <script src="Resources/Assets/js/OrbitControls.min.js"></script>
    <script src="Engine/AstronomicalData.js"></script>
    <script src="Engine/PhysicsEngine.js"></script>
    <script src="Engine/TimeSystem.js"></script>
    <script src="Resources/Assets/js/WebGLRenderer.js"></script>
    <script src="Resources/Assets/js/main.js"></script>
</body>
</html>
```

### Required Scripts

Load order matters:

```html
<!-- Dependencies -->
<script src="Resources/Assets/js/three.min.js"></script>
<script src="Resources/Assets/js/OrbitControls.min.js"></script>

<!-- Core modules -->
<script src="Engine/AstronomicalData.js"></script>
<script src="Engine/PhysicsEngine.js"></script>
<script src="Engine/TimeSystem.js"></script>

<!-- Renderer -->
<script src="Resources/Assets/js/WebGLRenderer.js"></script>

<!-- Application -->
<script src="Resources/Assets/js/main.js"></script>
```

## Initialization Examples

### Minimal Setup

```javascript
// Get container
const container = document.getElementById('container');

// Initialize time system
TimeSystem.init();

// Initialize renderer
WebGLRenderer.init(container);

// Start simulation
WebGLRenderer.start();
```

### Custom Initialization

```javascript
function initializeSimulation() {
    // Set custom time
    TimeSystem.setDate(new Date('2024-01-01'));
    
    // Set fast time scale
    TimeSystem.setTimeScale(86400); // 1 day per second
    
    // Configure renderer
    WebGLRenderer.settings.showLabels = true;
    WebGLRenderer.settings.showOrbits = true;
    WebGLRenderer.settings.asteroidCount = 200;
    
    // Initialize
    WebGLRenderer.init(document.getElementById('container'));
    
    // Start
    WebGLRenderer.start();
    
    console.log('Simulation started at', TimeSystem.getFormattedDate());
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSimulation);
} else {
    initializeSimulation();
}
```

### ES Module Import (if using bundler)

```javascript
// main.mjs
import AstronomicalData from './Engine/AstronomicalData.js';
import PhysicsEngine from './Engine/PhysicsEngine.js';
import TimeSystem from './Engine/TimeSystem.js';
import WebGLRenderer from './Resources/Assets/js/WebGLRenderer.js';

// Use the modules
TimeSystem.init();
WebGLRenderer.init(document.getElementById('container'));
WebGLRenderer.start();
```

## Time Control

### Basic Time Operations

```javascript
// Initialize
TimeSystem.init();

// Set to specific date
TimeSystem.goToDate(1969, 7, 20); // Moon landing
console.log(TimeSystem.formatDate()); // "1969-07-20"

// Jump forward/backward
TimeSystem.jumpForward(1, 'weeks');
TimeSystem.jumpBackward(7, 'days');

// Use presets
TimeSystem.setTimeScalePreset('1day/sec');
console.log(TimeSystem.getTimeScaleDisplay()); // "1day/sec"

// Play/Pause
TimeSystem.play();
TimeSystem.pause();

// Toggle
const isPlaying = TimeSystem.togglePlay();

// Get current time info
console.log('Date:', TimeSystem.getFormattedDate());
console.log('Julian Date:', TimeSystem.getJulianDate());
console.log('Days since J2000:', TimeSystem.getDaysSinceJ2000());
```

### Time Scale Examples

```javascript
// Different time scales for different purposes
const presets = {
    'Realtime': 1,
    'Educational': 86400,           // 1 day per second
    'Observational': 604800,        // 1 week per second
    'Historical': 2592000,          // 1 month per second
    'Geological': 31536000,         // 1 year per second
    'Fast Forward': 315360000,      // 10 years per second
    'Epic': 3153600000              // 100 years per second
};

// Apply preset
function setSimulationSpeed(name) {
    if (TimeSystem.setTimeScalePreset(name)) {
        console.log(`Speed set to: ${name}`);
    }
}

// Slider control
document.getElementById('time-speed').addEventListener('input', function() {
    const value = parseFloat(this.value);
    const scale = Math.pow(value / 10, 2); // Quadratic scale
    TimeSystem.setTimeScale(scale);
});
```

### Astronomical Events

```javascript
// Find moon phase
function displayMoonInfo() {
    const phase = TimeSystem.getMoonPhase();
    const phaseName = TimeSystem.getMoonPhaseName();
    const illumination = (1 - Math.cos(2 * Math.PI * phase)) * 50;
    
    console.log(`Phase: ${phaseName}`);
    console.log(`Illumination: ${illumination.toFixed(1)}%`);
    
    // Visual representation
    const bars = '█'.repeat(Math.round(illumination / 5)) + 
                 '░'.repeat(20 - Math.round(illumination / 5));
    console.log(`Moon: [${bars}]`);
}

// Find next full moon
function findNextFullMoon() {
    const synodicMonth = 29.53058867;
    let days = TimeSystem.getDaysSinceJ2000();
    const currentPhase = days % synodicMonth;
    const daysToFull = synodicMonth * 0.5 - currentPhase;
    
    TimeSystem.jumpForward(daysToFull < 0 ? daysToFull + synodicMonth : daysToFull, 'days');
    console.log(`Next full moon: ${TimeSystem.getFormattedDate()}`);
    console.log(`Phase: ${TimeSystem.getMoonPhaseName()}`);
}

// Season information
function displaySeasonInfo() {
    const season = TimeSystem.getSeason();
    const solarLon = TimeSystem.getSolarLongitude();
    const obliquity = TimeSystem.getEarthObliquity();
    
    console.log(`Season (NH): ${season}`);
    console.log(`Solar Longitude: ${solarLon.toFixed(1)}°`);
    console.log(`Axial Tilt: ${obliquity.toFixed(2)}°`);
}
```

## Position Calculations

### Getting Body Positions

```javascript
// Get position at current simulation time
const earthPos = PhysicsEngine.getPosition('Earth');
const marsPos = PhysicsEngine.getPosition('Mars');

console.log(`Earth: (${earthPos.x}, ${earthPos.y}, ${earthPos.z}) AU`);
console.log(`Mars: (${marsPos.x}, ${marsPos.y}, ${marsPos.z}) AU`);

// Get position at specific time
const futurePos = PhysicsEngine.getPosition('Mars', 1000); // 1000 days from J2000

// Get all positions
const allPositions = PhysicsEngine.getAllPositions();
Object.entries(allPositions).forEach(([name, pos]) => {
    console.log(`${name}: (${pos.x.toFixed(3)}, ${pos.y.toFixed(3)}, ${pos.z.toFixed(3)})`);
});
```

### Distance Calculations

```javascript
// Distance between two bodies
const earthMarsDist = PhysicsEngine.getDistance('Earth', 'Mars');
console.log(`Earth-Mars distance: ${earthMarsDist.toFixed(3)} AU`);

// Distance in more useful units
function AUtoKm(au) {
    return au * 149597870.7; // km
}

function AUtoMi(au) {
    return au * 92955807.3; // miles
}

console.log(`Earth-Mars: ${AUtoKm(earthMarsDist).toLocaleString()} km`);

// Find closest approach (simplified)
function findClosestApproach(body1, body2, daysRange = 1000) {
    let minDist = Infinity;
    let closestTime = 0;
    
    for (let t = 0; t < daysRange; t++) {
        const dist = PhysicsEngine.getDistance(body1, body2, t);
        if (dist < minDist) {
            minDist = dist;
            closestTime = t;
        }
    }
    
    return { time: closestTime, distance: minDist };
}
```

### Orbital Calculations

```javascript
// Calculate orbital period from distance
function getOrbitalPeriodAU(a) {
    // P² = a³ (Kepler's 3rd law)
    return PhysicsEngine.calculatePeriod(a);
}

console.log(`Earth orbital period: ${getOrbitalPeriodAU(1)} days`);
console.log(`Mars orbital period: ${getOrbitalPeriodAU(1.524)} days`);

// Calculate position from orbital elements
const marsElements = {
    a: 1.524,
    e: 0.093,
    i: 1.85,
    L: 0,
    w: 286.5,
    node: 49.6,
    period: 687
};

const position = PhysicsEngine.calculatePosition(marsElements, 0);
console.log(`Mars at J2000: (${position.x}, ${position.y}, ${position.z}) AU`);

// Solve Kepler's equation
const M = Math.PI; // Mean anomaly at quadrature
const e = 0.017;   // Earth's eccentricity
const E = PhysicsEngine.solveKepler(M, e);
console.log(`Eccentric anomaly: ${(E * 180 / Math.PI).toFixed(1)}°`);
```

### Velocity Calculations

```javascript
// Calculate orbital velocity
function getOrbitalVelocity(bodyName) {
    const elements = AstronomicalData.getAllBodies()[bodyName];
    const velocity = PhysicsEngine.calculateVelocity(elements, 0);
    const speed = Math.sqrt(velocity.x**2 + velocity.y**2 + velocity.z**2);
    
    // Convert AU/day to km/s
    const speedKmS = speed * AstronomicalData.AU / AstronomicalData.DAY;
    
    return {
        vector: velocity,
        speedAU: speed,
        speedKmS: speedKmS
    };
}

const earthVel = getOrbitalVelocity('Earth');
console.log(`Earth orbital velocity: ${earthVel.speedKmS.toFixed(1)} km/s`);
// Should be approximately 29.78 km/s

const marsVel = getOrbitalVelocity('Mars');
console.log(`Mars orbital velocity: ${marsVel.speedKmS.toFixed(1)} km/s`);
// Approximately 24.1 km/s (varies)
```

## Rendering Integration

### Custom Animation Loop

```javascript
let lastTime = Date.now();

function customAnimate() {
    requestAnimationFrame(customAnimate);
    
    const now = Date.now();
    const deltaTime = (now - lastTime) / 1000; // seconds
    lastTime = now;
    
    // Update time system
    TimeSystem.update();
    
    // Update renderer
    WebGLRenderer.updatePositions(TimeSystem.getDaysSinceJ2000());
    WebGLRenderer.updateLabels();
    WebGLRenderer.render();
}

// Start custom loop
customAnimate();
```

### Custom Body Addition

```javascript
function addCustomAsteroid() {
    // Create geometry
    const geometry = new THREE.DodecahedronGeometry(0.05, 0);
    const material = new THREE.MeshStandardMaterial({
        color: 0x888888,
        roughness: 0.9
    });
    
    const asteroid = new THREE.Mesh(geometry, material);
    
    // Set position
    asteroid.position.set(2.5, 0.1, -1.0);
    
    // Store orbital data
    asteroid.userData = {
        name: 'Custom Asteroid',
        type: 'asteroid',
        distance: 2.5,
        angle: Math.random() * Math.PI * 2,
        speed: 0.0002
    };
    
    // Add to scene and tracking
    WebGLRenderer.scene.add(asteroid);
    WebGLRenderer.bodies['CustomAsteroid'] = asteroid;
    
    return asteroid;
}

// Custom update for asteroid
function updateCustomAsteroids() {
    const asteroid = WebGLRenderer.bodies['CustomAsteroid'];
    if (asteroid && asteroid.userData) {
        const data = asteroid.userData;
        data.angle += data.speed * TimeSystem.timeScale;
        asteroid.position.x = data.distance * Math.cos(data.angle);
        asteroid.position.z = data.distance * Math.sin(data.angle);
    }
}
```

### Custom Labels

```javascript
function addCustomLabel(text, position, color = '#88AAFF') {
    const label = document.createElement('div');
    label.className = 'custom-label';
    label.textContent = text;
    label.style.cssText = `
        position: absolute;
        color: ${color};
        font-size: 12px;
        font-family: Arial, sans-serif;
        text-shadow: 0 0 5px #000;
        pointer-events: none;
    `;
    
    document.body.appendChild(label);
    
    return {
        element: label,
        position: position,
        update: function(camera) {
            const screenPos = this.position.clone();
            screenPos.project(camera);
            
            const x = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
            const y = (-screenPos.y * 0.5 + 0.5) * window.innerHeight;
            
            this.element.style.left = x + 'px';
            this.element.style.top = y + 'px';
        }
    };
}

// Usage
const label = addCustomLabel('My Location', new THREE.Vector3(5, 2, 5));
```

### Camera Controls

```javascript
// Focus on body
function focusOn(bodyName) {
    WebGLRenderer.focusOnBody(bodyName);
}

// Orbit controls
function setupCameraControls() {
    const controls = WebGLRenderer.controls;
    
    // Disable damping for instant response
    controls.enableDamping = false;
    
    // Custom zoom
    controls.zoomSpeed = 1.5;
    controls.rotateSpeed = 0.8;
    controls.panSpeed = 1.2;
}

// Preset camera views
const views = {
    'overview': { position: { x: 50, y: 30, z: 50 }, target: { x: 0, y: 0, z: 0 } },
    'top': { position: { x: 0, y: 100, z: 0 }, target: { x: 0, y: 0, z: 0 } },
    'side': { position: { x: 100, y: 0, z: 0 }, target: { x: 0, y: 0, z: 0 } },
    'earth': { position: { x: 1.5, y: 0.5, z: 1 }, target: { x: 1, y: 0, z: 0 } }
};

function setView(viewName) {
    const view = views[viewName];
    if (!view) return;
    
    WebGLRenderer.camera.position.set(view.position.x, view.position.y, view.position.z);
    WebGLRenderer.controls.target.set(view.target.x, view.target.y, view.target.z);
    WebGLRenderer.controls.update();
}
```

## Custom Extensions

### Custom Time System

```javascript
const CustomTimeSystem = {
    ...TimeSystem,
    
    // Add custom time zone support
    setTimeZone(offsetHours) {
        this.timeZoneOffset = offsetHours * 60 * 60 * 1000;
    },
    
    getLocalDate() {
        const utc = this.getDate().getTime();
        return new Date(utc + (this.timeZoneOffset || 0));
    },
    
    // Add custom date formatting
    formatCustom(format) {
        const date = this.getDate();
        const replacements = {
            'YYYY': date.getUTCFullYear(),
            'MM': String(date.getUTCMonth() + 1).padStart(2, '0'),
            'DD': String(date.getUTCDate()).padStart(2, '0'),
            'HH': String(date.getUTCHours()).padStart(2, '0'),
            'mm': String(date.getUTCMinutes()).padStart(2, '0'),
            'ss': String(date.getUTCSeconds()).padStart(2, '0')
        };
        
        return format.replace(/YYYY|MM|DD|HH|mm|ss/g, match => replacements[match]);
    }
};
```

### Custom Physics Engine Extension

```javascript
const ExtendedPhysicsEngine = {
    ...PhysicsEngine,
    
    // Add N-body gravity approximation
    calculateNBodyForce(body1Name, body2Name, time) {
        const pos1 = this.getPosition(body1Name, time);
        const pos2 = this.getPosition(body2Name, time);
        
        const dx = pos2.x - pos1.x;
        const dy = pos2.y - pos1.y;
        const dz = pos2.z - pos1.z;
        
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        const distM = dist * this.AU; // Convert to meters
        
        const data1 = AstronomicalData.getAllBodies()[body1Name];
        const data2 = AstronomicalData.getAllBodies()[body2Name];
        
        // F = G * m1 * m2 / r²
        const force = this.G * data1.mass * data2.mass / (distM * distM);
        
        return {
            force: force,
            direction: { x: dx/dist, y: dy/dist, z: dz/dist },
            distance: dist
        };
    },
    
    // Add escape velocity calculation
    getEscapeVelocity(bodyName, altitude = 0) {
        const body = AstronomicalData.getAllBodies()[bodyName];
        const radius = body.radius + altitude;
        
        // v_esc = sqrt(2 * G * M / r)
        const velocity = Math.sqrt(2 * this.G * body.mass / radius);
        
        return {
            mps: velocity,           // meters per second
            kps: velocity / 1000,    // kilometers per second
            kms: velocity / 1000     // same
        };
    }
};

// Usage
const earthGravity = ExtendedPhysicsEngine.calculateNBodyForce('Sun', 'Earth', 0);
console.log(`Earth-Sun gravitational force: ${earthGravity.force.toExponential(2)} N`);

const escapeVel = ExtendedPhysicsEngine.getEscapeVelocity('Earth');
console.log(`Earth escape velocity: ${escapeVel.kps.toFixed(2)} km/s`);
```

### Custom Renderer Extension

```javascript
const ExtendedRenderer = {
    ...WebGLRenderer,
    
    // Add trail effect for selected body
    trailPositions: {},
    
    addTrail(bodyName, maxLength = 100) {
        this.trailPositions[bodyName] = [];
        this.trailMaxLength = maxLength;
    },
    
    updateTrails() {
        Object.keys(this.trailPositions).forEach(bodyName => {
            const body = this.bodies[bodyName];
            if (!body) return;
            
            const trail = this.trailPositions[bodyName];
            trail.push(body.position.clone());
            
            if (trail.length > this.trailMaxLength) {
                trail.shift();
            }
            
            // Update trail line (implementation depends on existing line setup)
            this.updateTrailLine(bodyName, trail);
        });
    },
    
    // Add trajectory prediction
    predictTrajectory(bodyName, days) {
        const currentTime = TimeSystem.getDaysSinceJ2000();
        const positions = [];
        const step = 1; // days
        
        for (let t = currentTime; t < currentTime + days; t += step) {
            const pos = PhysicsEngine.getPosition(bodyName, t);
            positions.push(new THREE.Vector3(pos.x, pos.y, pos.z));
        }
        
        return positions;
    }
};
```

## Common Patterns

### Animation Frame Loop

```javascript
// Proper animation loop with delta time
let lastFrameTime = performance.now();
let frameCount = 0;
let fps = 0;

function animate() {
    requestAnimationFrame(animate);
    
    const now = performance.now();
    const delta = now - lastFrameTime;
    lastFrameTime = now;
    
    // FPS counter
    frameCount++;
    if (frameCount >= 60) {
        fps = Math.round(frameCount / (delta / 1000));
        frameCount = 0;
    }
    
    // Update systems
    TimeSystem.update();
    WebGLRenderer.updatePositions(TimeSystem.getDaysSinceJ2000());
    WebGLRenderer.updateLabels();
    WebGLRenderer.render();
    
    // Update FPS display
    document.getElementById('fps-counter').textContent = `${fps} FPS`;
}
```

### Data Loading

```javascript
// Check if all modules are loaded
function checkDependencies() {
    const required = ['THREE', 'AstronomicalData', 'PhysicsEngine', 'TimeSystem', 'WebGLRenderer'];
    const missing = required.filter(name => typeof window[name] === 'undefined');
    
    if (missing.length > 0) {
        console.error('Missing dependencies:', missing.join(', '));
        return false;
    }
    
    console.log('All dependencies loaded');
    return true;
}

// Initialize when ready
function whenReady(callback) {
    if (checkDependencies()) {
        callback();
    } else {
        window.addEventListener('load', callback);
    }
}
```

### Error Handling

```javascript
// Safe function wrapper
function safeCall(fn, fallback = null) {
    try {
        return fn();
    } catch (error) {
        console.error('Error:', error.message);
        return fallback;
    }
}

// Usage
const earthPos = safeCall(() => PhysicsEngine.getPosition('Earth'), { x: 0, y: 0, z: 0 });

// Handle Three.js errors
WebGLRenderer.renderer.addEventListener('error', (event) => {
    console.error('WebGL error:', event.message);
    showError('Graphics error. Please try a different browser.');
});
```

### Event System

```javascript
// Simple event system
const SimulationEvents = {
    listeners: {},
    
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    },
    
    emit(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(cb => cb(data));
        }
    }
};

// Usage
SimulationEvents.on('timeChange', (days) => {
    document.getElementById('current-date').textContent = TimeSystem.formatDate();
});

SimulationEvents.on('bodySelect', (bodyName) => {
    console.log(`Selected: ${bodyName}`);
});
```

## Troubleshooting

### Common Issues

#### 1. Three.js Not Loaded

```javascript
// Check if Three.js is available
if (typeof THREE === 'undefined') {
    console.error('Three.js not loaded!');
    showError('Three.js library not found. Please check your internet connection.');
}

// Fix: Ensure script is loaded before other scripts
```

#### 2. Bodies Not Visible

```javascript
// Check if bodies were created
console.log('Bodies:', Object.keys(WebGLRenderer.bodies));
console.log('Sun position:', WebGLRenderer.bodies['Sun']?.position);

// Common causes:
// - Scale too small (increase scalePlanets)
// - Camera too far (check camera.position)
// - Bodies behind camera
```

#### 3. Time Not Advancing

```javascript
// Check time system state
console.log('Time scale:', TimeSystem.timeScale);
console.log('Is playing:', TimeSystem.isPlaying);

// Fix:
TimeSystem.play();
TimeSystem.setTimeScale(86400);
```

#### 4. Labels Not Showing

```javascript
// Check label settings
console.log('Show labels:', WebGLRenderer.settings.showLabels);
console.log('Labels:', Object.keys(WebGLRenderer.labels));

// Fix:
WebGLRenderer.toggleLabels(true);
```

#### 5. Performance Issues

```javascript
// Check frame rate
console.log('FPS:', frameCount);

// Performance optimizations:
WebGLRenderer.settings.starFieldDensity = 200;
WebGLRenderer.settings.asteroidCount = 50;
WebGLRenderer.settings.showOrbits = false;
WebGLRenderer.renderer.setPixelRatio(1);
```

### Debug Mode

```javascript
const DEBUG = {
    enabled: true,
    
    logPositions() {
        const positions = PhysicsEngine.getAllPositions();
        console.table(positions);
    },
    
    logBodies() {
        const allBodies = AstronomicalData.getAllBodies();
        console.table(Object.entries(allBodies).map(([name, data]) => ({
            name,
            type: data.type,
            mass: data.mass,
            radius: data.radius
        })));
    },
    
    logTime() {
        console.log({
            date: TimeSystem.getFormattedDate(),
            julianDate: TimeSystem.getJulianDate(),
            daysSinceJ2000: TimeSystem.getDaysSinceJ2000(),
            timeScale: TimeSystem.getTimeScale(),
            isPlaying: TimeSystem.isPlaying
        });
    },
    
    toggleOrbitLines(visible) {
        WebGLRenderer.toggleOrbits(visible);
    }
};
```

## Best Practices

1. **Load scripts in order**: Three.js → OrbitControls → Core modules → Renderer → App
2. **Use `requestAnimationFrame`**: For smooth animations
3. **Handle errors gracefully**: Wrap calculations in try-catch
4. **Use presets for time scales**: Easier to maintain
5. **Optimize for target device**: Adjust settings for mobile vs desktop
6. **Cache calculations**: Don't recalculate same positions repeatedly
7. **Use appropriate precision**: Default tolerance is sufficient for visualization

## See Also

- [API_AstronomicalData](API_AstronomicalData.md)
- [API_PhysicsEngine](API_PhysicsEngine.md)
- [API_TimeSystem](API_TimeSystem.md)
- [API_WebGLRenderer](API_WebGLRenderer.md)
- [API_fetchAstronomicalData](API_fetchAstronomicalData.md)
- [CONFIG.md](CONFIG.md)
- [Three.js Documentation](https://threejs.org/docs/)


# Integration API Reference

Documentation for how the Cosmos Simulation engine components interact and integrate with each other.

## System Architecture

``` text
┌─────────────────────────────────────────────────────────────────┐
│                    COSMOS SIMULATION SYSTEM                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
│  │   User UI    │◄──►│  TimeSystem  │◄──►│ PhysicsEngine│       │
│  │   (HTML/JS)  │    │   (Time)     │    │   (Orbits)   │       │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘       │
│         │                   │                   │               │
│         ▼                   ▼                   ▼               │
│  ┌─────────────────────────────────────────────────────┐        │
│  │              WebGLRenderer (Three.js)               │        │
│  │         Scene • Camera • Controls • Labels          │        │
│  └─────────────────────────────────────────────────────┘        │
│                               │                                 │
│                               ▼                                 │
│  ┌─────────────────────────────────────────────────────┐        │
│  │              AstronomicalData (Static)              │        │
│  │    Sun • Planets • Moons • Comets • Meteors        │         │
│  └─────────────────────────────────────────────────────┘        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Engine Interaction Flow

### Initialization Sequence

```javascript
// Step 1: Load astronomical data (synchronous)
const astronomicalData = AstronomicalData; // Pre-loaded from Engine/AstronomicalData.js

// Step 2: Initialize time system
TimeSystem.init(); // Sets simTime to current system time relative to J2000

// Step 3: Initialize physics engine (uses AstronomicalData)
PhysicsEngine.init(); // Sets up orbital calculations

// Step 4: Initialize renderer (depends on AstronomicalData and PhysicsEngine)
WebGLRenderer.init(container); // Creates scene, camera, bodies

// Step 5: Start animation loop
WebGLRenderer.start(); // Begins render loop with TimeSystem.update()
```

### Runtime Data Flow

```
┌──────────────────────────────────────────────────────────────────────┐
│                    ANIMATION FRAME UPDATE                            │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  1. TimeSystem.update()                                              │
│     └─► Updates simTime based on deltaMs × timeScale                 │
│                                                                       │
│  2. PhysicsEngine.getPosition(bodyName, simTime)                     │
│     └─► Calculates 3D position from orbital elements                 │
│                                                                       │
│  3. WebGLRenderer.updatePositions(simTime)                           │
│     └─► Updates mesh positions from PhysicsEngine                    │
│                                                                       │
│  4. WebGLRenderer.render()                                           │
│     └─► Renders scene to canvas                                      │
│                                                                       │
│  5. UpdateLabels()                                                   │
│     └─► Projects 3D positions to 2D screen coordinates               │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

## Time Integration

### Time System to Physics Engine

```javascript
// TimeSystem provides the time reference
const daysSinceJ2000 = TimeSystem.getDaysSinceJ2000();

// PhysicsEngine uses this time to calculate positions
const earthPosition = PhysicsEngine.getPosition('Earth', daysSinceJ2000);
const marsPosition = PhysicsEngine.getPosition('Mars', daysSinceJ2000);

// Calculate distance between planets
const distanceAU = PhysicsEngine.getDistance('Earth', 'Mars');
```

### Time System to Renderer

```javascript
// TimeSystem updates every frame
TimeSystem.update();

// Renderer uses time for animation
function animate() {
    requestAnimationFrame(animate);
    
    TimeSystem.update();
    const simTime = TimeSystem.getDaysSinceJ2000();
    
    WebGLRenderer.updatePositions(simTime);
    WebGLRenderer.updateLabels();
    WebGLRenderer.render();
}
```

## Physics Integration

### Physics Engine to Renderer

```javascript
// Renderer queries physics engine for positions
function updatePositions(time) {
    const bodies = AstronomicalData.getAllBodies();
    
    for (const [name, data] of Object.entries(bodies)) {
        if (data.type !== 'star') {
            const position = PhysicsEngine.getPosition(name, time);
            const mesh = WebGLRenderer.bodies[name];
            
            if (mesh) {
                mesh.position.set(position.x, position.y, position.z);
            }
        }
    }
}
```

### Physics Engine to Astronomical Data

```javascript
// Physics engine uses orbital elements from AstronomicalData
function calculatePosition(elements, time) {
    const { a, e, i, period, ... } = elements;
    
    // Mean anomaly
    const n = (2 * Math.PI) / period; // Mean motion
    const M = n * time;               // Mean anomaly
    
    // Solve Kepler's equation
    const E = PhysicsEngine.solveKepler(M, e);
    
    // Calculate position from orbital elements
    return { x, y, z }; // AU coordinates
}
```

## Renderer Integration

### Three.js Scene Setup

```javascript
// Scene graph structure
WebGLRenderer.scene
├── Camera (PerspectiveCamera)
│   └── Controls (OrbitControls)
├── Lighting
│   ├── AmbientLight (base illumination)
│   └── PointLight at Sun (main light source)
├── StarField (Points)
├── Sun (Mesh + Glow)
├── Planets (Meshes)
│   ├── Mercury
│   ├── Venus
│   ├── Earth
│   │   └── Moon
│   ├── Mars
│   │   ├── Phobos
│   │   └── Deimos
│   └── ...
└── Orbits (LineLoop)
```

### Body Selection Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    BODY SELECTION SEQUENCE                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  User Click                                                     │
│      │                                                         │
│      ▼                                                         │
│  WebGLRenderer.onMouseClick(event)                              │
│      │                                                         │
│      ├─► Calculate normalized device coordinates               │
│      │                                                         │
│      ├─► Raycaster.setFromCamera(mouse, camera)                │
│      │                                                         │
│      ├─► raycaster.intersectObjects(bodies)                    │
│      │                                                         │
│      ├─► Select closest intersected body                       │
│      │                                                         │
│      ├─► WebGLRenderer.selectBody(mesh)                        │
│      │     ├─► Store original emissive color                   │
│      │     ├─► Set highlight (emissive: 0x333333)              │
│      │     └─► Update info panel                              │
│      │                                                         │
│      └─► Display body info in panel                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Event Integration

### Custom Events

```javascript
// Custom event types
const COSMOS_EVENTS = {
    TIME_CHANGED: 'cosmos:time-changed',
    BODY_SELECTED: 'cosmos:body-selected',
    BODY_DESELECTED: 'cosmos:body-deselected',
    TIME_SCALE_CHANGED: 'cosmos:timescale-changed',
    RENDER_STARTED: 'cosmos:render-started',
    RENDER_STOPPED: 'cosmos:render-stopped'
};

// Listen for events
document.addEventListener(COSMOS_EVENTS.BODY_SELECTED, (e) => {
    console.log('Selected:', e.detail.bodyName);
    console.log('Position:', e.detail.position);
});

// Emit events
function selectBody(mesh) {
    // ... selection logic
    
    const event = new CustomEvent(COSMOS_EVENTS.BODY_SELECTED, {
        detail: { bodyName, position: mesh.position }
    });
    document.dispatchEvent(event);
}
```

## Data Integration

### Astronomical Data Access

```javascript
// Direct access
const earth = AstronomicalData.Planets.Earth;
const moons = AstronomicalData.getMoonsForPlanet('Earth');
const allBodies = AstronomicalData.getAllBodies();

// Use with physics
const position = PhysicsEngine.calculatePosition(earth, 0);

// Use with renderer
WebGLRenderer.createPlanet('Earth', earth);
```

### Configuration Integration

```javascript
// Centralized configuration
const CONFIG = {
    renderer: {
        scalePlanets: 0.0001,
        showOrbits: false,
        showLabels: false
    },
    time: {
        defaultTimeScale: 86400, // 1 day per second
        maxTimeScale: 31536000000
    },
    physics: {
        tolerance: 1e-8,
        maxIterations: 100
    }
};

// Apply configuration
WebGLRenderer.settings.scalePlanets = CONFIG.renderer.scalePlanets;
TimeSystem.setTimeScale(CONFIG.time.defaultTimeScale);
```

## Performance Optimization

### Caching Strategy

```javascript
// Cache frequently accessed data
const bodyCache = {
    positions: new Map(),
    velocities: new Map()
};

// Clear cache when time changes
function onTimeChanged(newTime) {
    bodyCache.positions.clear();
    bodyCache.velocities.clear();
}
```

### Batch Updates

```javascript
// Update all positions in single pass
function updateAllPositions(time) {
    const allBodies = AstronomicalData.getAllBodies();
    
    for (const [name, data] of Object.entries(allBodies)) {
        if (data.type !== 'star') {
            const pos = PhysicsEngine.getPosition(name, time);
            WebGLRenderer.bodies[name]?.position.set(pos.x, pos.y, pos.z);
        }
    }
}
```

## Error Handling

```javascript
// Graceful degradation
try {
    const position = PhysicsEngine.getPosition(bodyName, time);
    WebGLRenderer.updateBodyPosition(bodyName, position);
} catch (error) {
    console.warn(`Failed to update ${bodyName}:`, error);
    // Continue with other bodies
}

// Fallback data
function getFallbackPosition(bodyName) {
    return { x: 0, y: 0, z: 0 };
}
```

## See Also

- [AstronomicalData](API_AstronomicalData.md) - Celestial body data
- [PhysicsEngine](API_PhysicsEngine.md) - Orbital mechanics
- [TimeSystem](API_TimeSystem.md) - Time management
- [WebGLRenderer](API_WebGLRenderer.md) - 3D visualization
- [Architecture](API_Architecture.md) - System architecture


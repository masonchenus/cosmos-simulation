# Architecture API Reference

System architecture and module structure for the Cosmos Simulation.

## Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           COSMOS SIMULATION                                 │
│                    A Solar System Visualization Engine                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                          APPLICATION LAYER                          │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌───────────┐   │    │
│  │  │   Index     │  │   Main      │  │  Components │  │  Styles   │   │    │
│  │  │   HTML      │  │   Script    │  │     JS      │  │    CSS    │   │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └───────────┘   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                     │                                       │
│                                     ▼                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                          ENGINE LAYER                               │    │
│  │                                                                     │    │
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────────────┐    │    │
│  │  │ Astronomical  │  │   TimeSystem  │  │     PhysicsEngine     │    │    │
│  │  │    Data       │  │   (Time)      │  │      (Orbits)         │    │    │
│  │  │               │  │               │  │                       │    │    │
│  │  │ • Constants   │  │ • J2000 Epoch │  │ • Kepler's Laws       │    │    │
│  │  │ • Planets     │  │ • Time Scales │  │ • Orbital Elements    │    │    │
│  │  │ • Moons       │  │ • Julian Date │  │ • Position Calc       │    │    │
│  │  │ • Comets      │  │ • Presets     │  │ • Velocity Calc       │    │    │
│  │  └───────────────┘  └───────────────┘  └───────────────────────┘    │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                     │                                       │
│                                     ▼                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                        RENDERER LAYER                               │    │
│  │                                                                     │    │
│  │  ┌───────────────────────────────────────────────────────────────┐  │    │
│  │  │                    WebGLRenderer                              │  │    │
│  │  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐   │  │    │ 
│  │  │  │ Three.js  │  │  Scene    │  │  Camera   │  │ Controls  │   │  │    │ 
│  │  │  │  Core     │  │  Graph    │  │           │  │           │   │  │    │
│  │  │  └───────────┘  └───────────┘  └───────────┘  └───────────┘   │  │    │
│  │  │                                                               │  │    │
│  │  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐   │  │    │
│  │  │  │  Bodies   │  │  Orbits   │  │  Labels   │  │ Selection │   │  │    │
│  │  │  │  (Meshes) │  │  (Lines)  │  │  (HTML)   │  │  (Raycast)│   │  │    │
│  │  │  └───────────┘  └───────────┘  └───────────┘  └───────────┘   │  │    │
│  │  └───────────────────────────────────────────────────────────────┘  │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                          DATA LAYER                                 │    │
│  │  ┌───────────────────────────────────────────────────────────────┐  │    │
│  │  │                    Scripts / Data Sources                     │  │    │
│  │  │  ┌─────────────────┐  ┌─────────────────────────────────────┐ │  │    │
│  │  │  │ fetchAstronom   │  │     Engine/AstronomicalData.js      │ │  │    │
│  │  │  │    icalData.js  │  │         (Static Data)               │ │  │    │
│  │  │  └─────────────────┘  └─────────────────────────────────────┘ │  │    │
│  │  └───────────────────────────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Module Dependencies

``` text
                    ┌─────────────────┐
                    │   index.html    │
                    │   (Entry Point) │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  main.js        │
                    │  (Initialization)
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
     ┌────────────────┐ ┌──────────┐ ┌────────────────┐
     │ Astronomical   │ │ TimeSystem│ │ PhysicsEngine │
     │    Data        │ │          │ │                │
     └────────────────┘ └──────────┘ └────────────────┘
              │              │              │
              │              │              │
              └──────────────┼──────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ WebGLRenderer   │
                    │  (Visualization)│
                    └─────────────────┘
```

## Data Structures

### Celestial Body Object

```javascript
{
    name: "Earth",
    type: "planet",
    parent: "Sun",
    
    // Orbital Elements
    a: 1.0,              // Semi-major axis (AU)
    e: 0.017,            // Eccentricity
    i: 0,                // Inclination (degrees)
    L: 0,                // Mean longitude (degrees)
    w: 102.9,            // Longitude of perihelion (degrees)
    node: 0,             // Longitude of ascending node (degrees)
    period: 365.25,      // Orbital period (days)
    
    // Physical Properties
    radius: 6371000,     // Mean radius (meters)
    mass: 5.972e+24,     // Mass (kg)
    rotation: 24.0,      // Rotation period (hours)
    tilt: 23.44,         // Axial tilt (degrees)
    
    // Visualization
    color: 0x6B93D6,     // Hex color
    
    // Hierarchy
    moons: ["Moon"],     // Child bodies
    hasRings: false      // Ring indicator
}
```

### Position Vector

```javascript
{
    x: 1.0,    // AU from reference point (typically Sun)
    y: 0.0,    // AU
    z: 0.0     // AU
}
```

### Scene Graph Node

```
THREE.Scene
├── THREE.PerspectiveCamera
│   └── THREE.OrbitControls
├── THREE.AmbientLight
├── THREE.PointLight (Sun position)
├── THREE.Points (StarField)
├── THREE.Mesh (Sun)
├── THREE.Mesh (Mercury)
├── THREE.Mesh (Venus)
├── THREE.Mesh (Earth)
│   └── THREE.Mesh (Moon)
├── THREE.Line (Mercury orbit)
├── THREE.Line (Venus orbit)
└── THREE.Line (Earth orbit)
```

## State Management

### Global State

```javascript
const STATE = {
    time: {
        simTime: 0,           // Milliseconds from J2000
        timeScale: 86400,     // Multiplier
        isPlaying: false      // Playback state
    },
    view: {
        selectedBody: null,   // Currently selected body
        showOrbits: false,    // Orbit visibility
        showLabels: false,    // Label visibility
        showAsteroids: false, // Asteroid visibility
        cameraPosition: { x, y, z }
    },
    bodies: {
        // Position cache
        positions: new Map(),
        // Visibility state
        visible: new Set()
    }
};
```

## Rendering Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           RENDERING PIPELINE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐                                                            │
│  │ Animation   │                                                            │
│  │   Frame     │                                                            │
│  └──────┬──────┘                                                            │
│         │                                                                   │
│         ▼                                                                   │
│  ┌─────────────┐                                                            │
│  │ TimeSystem  │  Get current simulation time                               │
│  │   .update() │                                                            │
│  └──────┬──────┘                                                            │
│         │                                                                   │
│         ▼                                                                   │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                   │
│  │   Physics   │────►│   Get All   │────►│   Update    │                   │
│  │  Engine     │     │  Positions  │     │  Meshes     │                   │
│  └─────────────┘     └─────────────┘     └──────┬──────┘                   │
│                                                  │                          │
│                                                  ▼                          │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                   │
│  │   Update    │────►│   Render    │────►│   Present   │                   │
│  │   Labels    │     │   Scene     │     │   Frame     │                   │
│  └─────────────┘     └─────────────┘     └─────────────┘                   │
│                                                                             │
│  Frame Rate: ~60 FPS (depending on device)                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Physics Calculations

### Kepler's Equation Solver

```
                    ┌─────────────────────────┐
                    │  Solve Kepler's Eq:     │
                    │  M = E - e·sin(E)       │
                    └───────────┬─────────────┘
                                │
                    ┌───────────▼─────────────┐
                    │  Newton-Raphson:         │
                    │  E(n+1) = E(n) -         │
                    │  (E(n) - e·sin(E) - M)   │
                    │  / (1 - e·cos(E))        │
                    └───────────┬─────────────┘
                                │
                    ┌───────────▼─────────────┐
                    │  Converge to tolerance  │
                    │  (default: 1e-8)        │
                    └─────────────────────────┘
```

### Orbital Position Calculation

```
┌─────────────────────────────────────────────────────────────────┐
│              ORBITAL POSITION CALCULATION                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  INPUT: Orbital elements (a, e, i, w, node, L), time t         │
│                                                                 │
│  STEP 1: Mean Anomaly                                           │
│          M = (2π/P) × t                                         │
│                                                                 │
│  STEP 2: Eccentric Anomaly (via Kepler solver)                  │
│          M = E - e·sin(E)  →  E = solve(M, e)                   │
│                                                                 │
│  STEP 3: True Anomaly                                           │
│          tan(ν/2) = √((1+e)/(1-e)) × tan(E/2)                  │
│                                                                 │
│  STEP 4: Radial Distance                                        │
│          r = a(1 - e·cos(E))                                    │
│                                                                 │
│  STEP 5: Position in Orbital Plane                              │
│          x' = r × cos(ν)                                        │
│          y' = r × sin(ν)                                        │
│                                                                 │
│  STEP 6: Rotate to Ecliptic Coordinates                         │
│          x = x'(cosΩ·cosω - sinΩ·sinω·cosi)                     │
│            - y'(cosΩ·sinω + sinΩ·cosω·cosi)                     │
│          y = x'(sinΩ·cosω + cosΩ·sinω·cosi)                     │
│            + y'(cosΩ·cosω - sinΩ·sinω·cosi)                     │
│          z = x'(sinω·sini) + y'(cosω·sini)                      │
│                                                                 │
│  OUTPUT: {x, y, z} in AU                                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Memory Management

### Object Pooling

```javascript
// Reusable vectors for position calculations
const tempVector = new THREE.Vector3();
const tempMatrix = new THREE.Matrix4();
const tempQuaternion = new THREE.Quaternion();

// Reuse instead of creating new objects
function updateBodyPositions(bodies, time) {
    for (const body of bodies) {
        const pos = PhysicsEngine.getPosition(body.name, time);
        tempVector.set(pos.x, pos.y, pos.z);
        body.mesh.position.copy(tempVector);
    }
}
```

### Lazy Initialization

```javascript
// Delay expensive operations
let starField = null;
let orbitLines = null;

function getStarField() {
    if (!starField) {
        starField = createStarField();
    }
    return starField;
}
```

## Performance Considerations

### Rendering Optimizations

| Technique        | Description                              | Benefit             |
| ---------------- | ---------------------------------------- | ------------------- |
| Geometry Sharing | Use same geometry for similar objects    | Reduced memory      |
| Level of Detail  | Reduce polygon count for distant objects | Faster rendering    |
| Frustum Culling  | Don't render objects outside camera view | Reduced draw calls  |
| Instancing       | Use InstancedMesh for asteroids          | Single draw call    |
| Texture Atlases  | Combine textures into single image       | Fewer texture binds |

### Physics Optimizations

| Technique      | Description                                | Benefit                     |
| -------------- | ------------------------------------------ | --------------------------- |
| Caching        | Store calculated positions                 | Skip redundant calculations |
| Time Buckets   | Update less frequently for distant objects | Reduced calculations        |
| Approximation  | Use simpler models for distant bodies      | Faster calculations         |
| Worker Threads | Run physics in Web Worker                  | Non-blocking UI             |

## Error Handling

```
┌─────────────────────────────────────────────────────────────────┐
│                    ERROR BOUNDARY LAYER                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    try { ... } catch                    │   │
│  │                                                         │   │
│  │  PhysicsEngine.getPosition()  ──►  Valid Position      │   │
│  │       │                          │                       │   │
│  │       ▼                          ▼                       │   │
│  │  Return cached position  ──►  Use calculated           │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Fallback: Return {x: 0, y: 0, z: 0} for any calculation error │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Extension Points

### Custom Body Types

```javascript
// Extend AstronomicalData with custom body types
AstronomicalData.DwarfPlanets = {
    Pluto: { ... },
    Eris: { ... },
    Ceres: { ... }
};

// Custom rendering
WebGLRenderer.createDwarfPlanet = function(name, data) {
    // Custom implementation
};
```

### Custom Time Scales

```javascript
// Add custom time scale preset
TimeSystem.timeScales['10min/sec'] = 10 * 60 * 86400;
```

### Custom Event Handlers

```javascript
// Register custom event listener
document.addEventListener('cosmos:time-changed', (e) => {
    // Custom logic
});
```

## See Also

- [Integration](API_Integration.md) - Engine interaction patterns
- [AstronomicalData](API_AstronomicalData.md) - Celestial data structures
- [PhysicsEngine](API_PhysicsEngine.md) - Physics calculations
- [TimeSystem](API_TimeSystem.md) - Time management
- [WebGLRenderer](API_WebGLRenderer.md) - Rendering system


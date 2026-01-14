e# WebGLRenderer API Reference

Three.js-based 3D visualization engine for rendering the solar system. Handles scene setup, celestial body rendering, labels, orbits, and user interaction.

## Overview

```javascript
const WebGLRenderer = {
    // Three.js objects
    scene: null,
    camera: null,
    renderer: null,
    controls: null,

    // Body management
    bodies: {},
    orbits: {},
    labels: {},

    // Settings
    settings: { ... },

    // Selection
    selectedBody: null,

    // Raycasting
    raycaster: null,
    mouse: null,

    // Methods
    init: function(container) { ... },
    initControls: function() { ... },
    createStarField: function() { ... },
    createSun: function() { ... },
    createPlanets: function() { ... },
    createPlanet: function(name, data) { ... },
    createRings: function(planetMesh, data) { ... },
    createOrbit: function(data, name) { ... },
    createMoons: function() { ... },
    createMoon: function(name, data) { ... },
    createAsteroids: function() { ... },
    createAsteroid: function() { ... },
    createDwarfPlanets: function() { ... },
    createComets: function() { ... },
    createComet: function(name, data) { ... },
    createLights: function() { ... },
    createLabel: function(name, offset) { ... },
    updateLabels: function() { ... },
    updatePositions: function(time) { ... },
    updateOrbits: function(time) { ... },
    toggleOrbits: function(visible) { ... },
    toggleLabels: function(visible) { ... },
    toggleAsteroids: function(visible) { ... },
    toggleMoons: function(visible) { ... },
    onWindowResize: function() { ... },
    onMouseClick: function(event) { ... },
    onMouseMove: function(event) { ... },
    selectBody: function(mesh) { ... },
    deselectBody: function() { ... },
    updateInfoPanel: function(name) { ... },
    formatNumber: function(num) { ... },
    formatScientific: function(num) { ... },
    focusOnBody: function(name) { ... },
    render: function() { ... },
    animate: function() { ... },
    start: function() { ... }
};
```

## Settings

The `settings` object controls visualization parameters:

```javascript
settings: {
    showOrbits: false,              // Show orbital paths
    showLabels: false,              // Show body labels
    showAsteroids: false,           // Show asteroid belt
    showMoons: true,                // Show moons
    scalePlanets: 0.0001,           // Planet size scale factor
    scaleDistances: 1,              // Distance scale factor
    orbitOpacity: 0.3,              // Orbit line opacity
    labelSize: 14,                  // Label font size
    starFieldDensity: 500,          // Number of stars
    asteroidCount: 100              // Number of asteroids
}
```

## Methods

### init()

Initializes the Three.js scene and all visual elements.

**Syntax:**
```javascript
WebGLRenderer.init(container);
```

**Parameters:**
- `container` (HTMLElement): DOM element to contain the canvas

**Effects:**
- Creates Three.js scene, camera, renderer
- Initializes OrbitControls
- Sets up raycaster for mouse interaction
- Creates star field, Sun, planets, moons, asteroids, comets
- Adds lighting
- Attaches event listeners (resize, click, mousemove)

**Returns:**
- (WebGLRenderer): Reference to renderer for chaining

**Example:**
```javascript
const container = document.getElementById('canvas-container');
WebGLRenderer.init(container);
WebGLRenderer.start();
```

### initControls()

Initializes OrbitControls for camera navigation.

**Syntax:**
```javascript
WebGLRenderer.initControls();
```

**Default Settings:**
```javascript
{
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

**Example:**
```javascript
// Pan camera
WebGLRenderer.controls.pan(new THREE.Vector3(10, 0, 0));

// Rotate camera
WebGLRenderer.controls.rotateLeft(Math.PI / 4);

// Zoom
WebGLRenderer.controls.dollyIn(1.5);
```

### createStarField()

Creates the background star field.

**Syntax:**
```javascript
WebGLRenderer.createStarField();
```

**Details:**
- Creates `settings.starFieldDensity` stars (default: 500)
- Random positions on sphere radius 100,000-1,000,000
- Slight color variation (warm white tones)

### createSun()

Creates the Sun mesh with glow and corona effects.

**Syntax:**
```javascript
WebGLRenderer.createSun();
```

**Visual Elements:**
- Sun sphere (radius: 5 units)
- Inner glow (radius: 6 units, opacity: 0.3)
- Corona (radius: 8 units, opacity: 0.1)
- Label at position {x: 0, y: 8, z: 0}

### createPlanets()

Creates all planets from AstronomicalData.

**Syntax:**
```javascript
WebGLRenderer.createPlanets();
```

### createPlanet()

Creates a single planet with orbit and label.

**Syntax:**
```javascript
WebGLRenderer.createPlanet(name, data);
```

**Parameters:**
- `name` (string): Planet name
- `data` (object): Planet data from AstronomicalData

**Details:**
- Sphere geometry with radius × scalePlanets
- MeshStandardMaterial with body color
- Orbit line (128 segments)
- Label positioned above planet
- Rings for Saturn (if `hasRings: true`)

**Example:**
```javascript
WebGLRenderer.createPlanet('Mars', AstronomicalData.Planets.Mars);
```

### createRings()

Creates planetary ring system (Saturn).

**Syntax:**
```javascript
WebGLRenderer.createRings(planetMesh, data);
```

**Parameters:**
- `planetMesh` (THREE.Mesh): Planet mesh to attach rings to
- `data` (object): Planet data with ring information

**Visual:**
- RingGeometry with inner radius × 1.2 and outer radius × 2.3
- Semi-transparent material (opacity: 0.7)
- Tilted at ~77° (π/2.2 radians)

### createOrbit()

Creates orbital path visualization.

**Syntax:**
```javascript
WebGLRenderer.createOrbit(data, name);
```

**Parameters:**
- `data` (object): Orbital elements
- `name` (string): Body name for storage

**Details:**
- 128 line segments
- Uses PhysicsEngine.calculatePosition() for points
- Colored to match body color
- Semi-transparent (settings.orbitOpacity)

### createMoons()

Creates all moons from AstronomicalData.

**Syntax:**
```javascript
WebGLRenderer.createMoons();
```

### createMoon()

Creates a single moon.

**Syntax:**
```javascript
WebGLRenderer.createMoon(name, data);
```

**Parameters:**
- `name` (string): Moon name
- `data` (object): Moon data from AstronomicalData

**Details:**
- Sphere with radius × scalePlanets × 5 (enhanced visibility)
- Minimal geometry (8 segments) for performance
- Label positioned above moon

### createAsteroids()

Creates asteroid belt between Mars and Jupiter.

**Syntax:**
```javascript
WebGLRenderer.createAsteroids();
```

**Details:**
- Creates `settings.asteroidCount` asteroids (default: 100)
- Random positions at 2.2-3.7 AU
- Dodecahedron geometry for irregular shapes
- Stored in `bodies['AsteroidBelt']` group

### createAsteroid()

Creates a single asteroid.

**Syntax:**
```javascript
const asteroid = WebGLRenderer.createAsteroid();
```

**Returns:**
- (THREE.Mesh): Asteroid mesh with orbital data

**Stored in `userData`:**
```javascript
{
    distance: number,      // AU from Sun
    angle: number,         // Current angle
    speed: number,         // Orbital speed
    height: number,        // Z variation
    rotationSpeed: number  // Self-rotation speed
}
```

### createDwarfPlanets()

Creates dwarf planets.

**Syntax:**
```javascript
WebGLRenderer.createDwarfPlanets();
```

### createComets()

Creates comets with tails.

**Syntax:**
```javascript
WebGLRenderer.createComets();
```

### createComet()

Creates a comet with tail.

**Syntax:**
```javascript
WebGLRenderer.createComet(name, data);
```

**Parameters:**
- `name` (string): Comet name
- `data` (object): Comet data from AstronomicalData

**Visual Elements:**
- Small sphere (radius: 0.1)
- Cone tail extending opposite to Sun
- Tail color from `tailColor` property

### createLights()

Sets up scene lighting.

**Syntax:**
```javascript
WebGLRenderer.createLights();
```

**Lights Created:**
1. Ambient light (0x333344, intensity: 0.5) - Base illumination
2. Point light at Sun position (0, 0, 0) - Primary illumination
   - Color: 0xFFFFFF
   - Intensity: 2
   - Distance: 1000
   - Casts shadows

### createLabel()

Creates HTML label for a celestial body.

**Syntax:**
```javascript
WebGLRenderer.createLabel(name, offset);
```

**Parameters:**
- `name` (string): Body name
- `offset` (object): `{x, y, z}` offset from body center

**Label Properties:**
```javascript
{
    position: 'absolute',
    color: '#88AAFF',
    fontSize: '14px',
    fontFamily: 'Arial, sans-serif',
    textShadow: '0 0 5px #000',
    pointerEvents: 'none',
    display: settings.showLabels ? 'block' : 'none'
}
```

**Stored in:**
```javascript
labels[name] = {
    element: HTMLDivElement,
    offset: {x, y, z}
}
```

### updateLabels()

Updates label positions based on camera projection.

**Syntax:**
```javascript
WebGLRenderer.updateLabels();
```

**Details:**
- Projects 3D body positions to 2D screen coordinates
- Updates label DOM positions
- Hides labels behind camera (pos.z > 1)

### updatePositions()

Updates celestial body positions for current simulation time.

**Syntax:**
```javascript
WebGLRenderer.updatePositions(time);
```

**Parameters:**
- `time` (number): Days since J2000

**Updates:**
- Planet positions (via PhysicsEngine.getPosition)
- Moon positions (via PhysicsEngine.getPosition)
- Dwarf planet positions
- Comet positions
- Asteroid belt rotation

**Example:**
```javascript
// In animation loop
WebGLRenderer.updatePositions(TimeSystem.getDaysSinceJ2000());
```

### updateOrbits()

Updates orbital path calculations (placeholder).

**Syntax:**
```javascript
WebGLRenderer.updateOrbits(time);
```

**Note:** Orbital positions are calculated dynamically; orbits don't need explicit updates.

### toggleOrbits()

Toggles orbit line visibility.

**Syntax:**
```javascript
WebGLRenderer.toggleOrbits(visible);
```

**Parameters:**
- `visible` (boolean): Show/hide orbits

**Example:**
```javascript
// Toggle with checkbox
document.getElementById('show-orbits').addEventListener('change', (e) => {
    WebGLRenderer.toggleOrbits(e.target.checked);
});
```

### toggleLabels()

Toggles label visibility.

**Syntax:**
```javascript
WebGLRenderer.toggleLabels(visible);
```

**Parameters:**
- `visible` (boolean): Show/hide labels

### toggleAsteroids()

Toggles asteroid belt visibility.

**Syntax:**
```javascript
WebGLRenderer.toggleAsteroids(visible);
```

**Parameters:**
- `visible` (boolean): Show/hide asteroids

### toggleMoons()

Toggles moon visibility.

**Syntax:**
```javascript
WebGLRenderer.toggleMoons(visible);
```

**Parameters:**
- `visible` (boolean): Show/hide moons

### onWindowResize()

Handles window resize events.

**Syntax:**
```javascript
WebGLRenderer.onWindowResize();
```

**Updates:**
- Camera aspect ratio
- Camera projection matrix
- Renderer size

### onMouseClick()

Handles mouse clicks for body selection.

**Syntax:**
```javascript
WebGLRenderer.onMouseClick(event);
```

**Parameters:**
- `event` (MouseEvent): Click event

**Process:**
1. Calculate normalized device coordinates
2. Cast ray from camera
3. Intersect with body meshes
4. Select closest body
5. Update info panel

**Example:**
```javascript
canvas.addEventListener('click', WebGLRenderer.onMouseClick.bind(WebGLRenderer));
```

### onMouseMove()

Handles mouse movement for hover effects.

**Syntax:**
```javascript
WebGLRenderer.onMouseMove(event);
```

**Effects:**
- Changes cursor to pointer when hovering over body
- Default cursor otherwise

### selectBody()

Selects a celestial body and highlights it.

**Syntax:**
```javascript
WebGLRenderer.selectBody(mesh);
```

**Parameters:**
- `mesh` (THREE.Mesh): Three.js mesh to select

**Effects:**
- Deselects previous body
- Stores original emissive color
- Sets emissive to 0x333333 (highlight)
- Updates info panel with body details
- Updates controls target

### deselectBody()

Deselects current body.

**Syntax:**
```javascript
WebGLRenderer.deselectBody();
```

**Effects:**
- Restores original emissive color
- Clears selectedBody
- Hides info panel

### updateInfoPanel()

Updates the info panel with body details.

**Syntax:**
```javascript
WebGLRenderer.updateInfoPanel(name);
```

**Parameters:**
- `name` (string): Body name

**Displayed Information:**
- Type
- Radius (meters)
- Mass (kg, scientific notation)
- Orbital period (days)
- Rotation period (hours)
- Axial tilt (degrees)
- Semi-major axis (AU)
- Eccentricity
- Inclination (degrees)
- Moon count
- Description (if available)

**HTML Structure:**
```html
<div id="info-panel" class="hidden">
    <h3 id="body-name">Body Name</h3>
    <div id="body-info">
        <p><span class="label">Type:</span> <span class="value">planet</span></p>
        <!-- ... more fields -->
    </div>
</div>
```

### formatNumber()

Formats number with thousand separators.

**Syntax:**
```javascript
const formatted = WebGLRenderer.formatNumber(num);
```

**Example:**
```javascript
console.log(WebGLRenderer.formatNumber(6371000));
// "6,371,000"
```

### formatScientific()

Formats number in scientific notation.

**Syntax:**
```javascript
const formatted = WebGLRenderer.formatScientific(num);
```

**Example:**
```javascript
console.log(WebGLRenderer.formatScientific(5.972e+24));
// "5.97 × 10^24"
```

### focusOnBody()

Moves camera to focus on a specific body.

**Syntax:**
```javascript
WebGLRenderer.focusOnBody(name);
```

**Parameters:**
- `name` (string): Name of body to focus on

**Effects:**
- Moves controls target to body position
- Positions camera near body (offset: 5, 3, 5)
- Selects the body

**Example:**
```javascript
// Focus on Saturn
WebGLRenderer.focusOnBody('Saturn');

// Focus on Io
WebGLRenderer.focusOnBody('Io');
```

### render()

Renders the current frame.

**Syntax:**
```javascript
WebGLRenderer.render();
```

**Effects:**
- Updates controls (if damping enabled)
- Renders scene through camera

**Note:** Usually called from `animate()`, not directly.

### animate()

Main animation loop.

**Syntax:**
```javascript
WebGLRenderer.animate();
```

**Process:**
1. Request next frame
2. Update simulation time (TimeSystem.update)
3. Update body positions
4. Update labels
5. Render scene

**Example:**
```javascript
// Start animation loop
WebGLRenderer.animate();
```

### start()

Starts the simulation.

**Syntax:**
```javascript
WebGLRenderer.start();
```

**Effects:**
- Calls `animate()` to start the loop

**Example:**
```javascript
WebGLRenderer.init(container);
WebGLRenderer.start();
```

## Body Management

### bodies Object

Stores references to all celestial body meshes:

```javascript
bodies: {
    'Sun': THREE.Mesh,
    'Mercury': THREE.Mesh,
    'Venus': THREE.Mesh,
    'Earth': THREE.Mesh,
    // ... all planets, moons, comets
    'AsteroidBelt': THREE.Group  // Asteroid group
}
```

### orbits Object

Stores orbital line meshes:

```javascript
orbits: {
    'Mercury': THREE.Line,
    'Venus': THREE.Line,
    // ... planets and dwarf planets
}
```

### labels Object

Stores label elements and offsets:

```javascript
labels: {
    'Sun': {
        element: HTMLDivElement,
        offset: {x: 0, y: 8, z: 0}
    },
    'Earth': {
        element: HTMLDivElement,
        offset: {x: 0, y: 0.5, z: 0}
    }
}
```

## Usage Examples

### Basic Setup

```javascript
// Get container
const container = document.getElementById('container');

// Initialize renderer
WebGLRenderer.init(container);

// Start animation
WebGLRenderer.start();
```

### Custom Settings

```javascript
// Before initialization
WebGLRenderer.settings.showLabels = true;
WebGLRenderer.settings.showOrbits = true;
WebGLRenderer.settings.asteroidCount = 200;
WebGLRenderer.settings.starFieldDensity = 1000;

// Initialize
WebGLRenderer.init(container);
```

### Toggle Controls

```javascript
// Play/Pause button
document.getElementById('play-pause').addEventListener('click', () => {
    const playing = TimeSystem.togglePlay();
    this.textContent = playing ? '❚❚ Pause' : '▶ Play';
});

// Reset button
document.getElementById('reset-time').addEventListener('click', () => {
    TimeSystem.reset();
    updateDateDisplay();
});

// Layer toggles
document.getElementById('show-orbits').addEventListener('change', (e) => {
    WebGLRenderer.toggleOrbits(e.target.checked);
});

document.getElementById('show-labels').addEventListener('change', (e) => {
    WebGLRenderer.toggleLabels(e.target.checked);
});

document.getElementById('show-asteroids').addEventListener('change', (e) => {
    WebGLRenderer.toggleAsteroids(e.target.checked);
});
```

### Keyboard Controls

```javascript
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case ' ':
            // Space - play/pause
            event.preventDefault();
            TimeSystem.togglePlay();
            break;
        case 'Escape':
            // Escape - deselect
            WebGLRenderer.deselectBody();
            document.getElementById('info-panel').classList.add('hidden');
            break;
        case 'r':
            // R - reset time
            TimeSystem.reset();
            break;
        case '+':
        case '=':
            // Zoom in
            WebGLRenderer.controls.dollyIn(1.1);
            break;
        case '-':
            // Zoom out
            WebGLRenderer.controls.dollyOut(1.1);
            break;
    }
});
```

### Custom Camera Movement

```javascript
// Zoom to specific location
WebGLRenderer.camera.position.set(50, 30, 50);
WebGLRenderer.controls.target.set(0, 0, 0);
WebGLRenderer.controls.update();

// Smooth transition to body
function focusOnBodySmooth(name) {
    const body = WebGLRenderer.bodies[name];
    if (!body) return;
    
    const target = body.position.clone();
    const offset = new THREE.Vector3(5, 3, 5);
    
    // Animate camera (using animation library or custom)
    animateCamera(WebGLRenderer.camera.position, target.clone().add(offset), 1000);
    animateCamera(WebGLRenderer.controls.target, target, 1000);
}
```

### Getting Body Information

```javascript
function getBodyInfo(name) {
    const mesh = WebGLRenderer.bodies[name];
    if (!mesh) return null;
    
    const allBodies = AstronomicalData.getAllBodies();
    const data = allBodies[name];
    
    return {
        name: data.name,
        type: data.type,
        position: mesh.position.clone(),
        radius: data.radius,
        mass: data.mass
    };
}

console.log(getBodyInfo('Mars'));
```

## Performance Optimization

### For Low-Power Devices

```javascript
WebGLRenderer.settings.starFieldDensity = 200;
WebGLRenderer.settings.asteroidCount = 50;
WebGLRenderer.settings.showOrbits = false;
WebGLRenderer.settings.showLabels = false;
WebGLRenderer.renderer.setPixelRatio(1); // Disable retina
```

### For High-End Devices

```javascript
WebGLRenderer.settings.starFieldDensity = 2000;
WebGLRenderer.settings.asteroidCount = 500;
WebGLRenderer.settings.orbitOpacity = 0.5;
WebGLRenderer.settings.showOrbits = true;
WebGLRenderer.settings.showLabels = true;
WebGLRenderer.renderer.setPixelRatio(window.devicePixelRatio);
WebGLRenderer.renderer.shadowMap.enabled = true;
```

## Three.js Integration

### Accessing Three.js Objects

```javascript
// Scene
const scene = WebGLRenderer.scene;

// Camera
const camera = WebGLRenderer.camera;

// Renderer
const renderer = WebGLRenderer.renderer;

// Controls
const controls = WebGLRenderer.controls;
```

### Adding Custom Objects

```javascript
// Add custom star
const starGeometry = new THREE.SphereGeometry(0.5, 16, 16);
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
const customStar = new THREE.Mesh(starGeometry, starMaterial);
customStar.position.set(100, 50, -100);
WebGLRenderer.scene.add(customStar);

// Add custom light
const customLight = new THREE.PointLight(0xFF0000, 1, 500);
customLight.position.set(50, 50, 50);
WebGLRenderer.scene.add(customLight);
```

## See Also

- [Three.js Documentation](https://threejs.org/docs/)
- [AstronomicalData](API_AstronomicalData.md) - Celestial body data
- [PhysicsEngine](API_PhysicsEngine.md) - Position calculations
- [TimeSystem](API_TimeSystem.md) - Time management


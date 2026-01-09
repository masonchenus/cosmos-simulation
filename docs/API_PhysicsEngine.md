# PhysicsEngine API Reference

Implements ultra-accurate orbital mechanics using Keplerian physics with J2000 epoch reference. Handles position and velocity calculations for all celestial bodies.

## Overview

```javascript
const PhysicsEngine = {
    // Constants
    G: 6.67430e-11,
    AU: 149597870700,
    DAY: 86400,
    DEG2RAD: Math.PI / 180,
    RAD2DEG: 180 / Math.PI,

    // State
    simTime: 0,
    timeScale: 1,
    isPlaying: false,

    // Methods
    deg2rad: function(degrees) { ... },
    rad2deg: function(radians) { ... },
    solveKepler: function(M, e, tolerance) { ... },
    calculatePosition: function(elements, time) { ... },
    calculatePeriod: function(a) { ... },
    calculateMoonPosition: function(moonData, parentPos, time) { ... },
    getPosition: function(bodyName, time) { ... },
    calculateVelocity: function(elements, time) { ... },
    getOrbitalPeriod: function(bodyName) { ... },
    getScaleFactor: function() { ... },
    setTime: function(time) { ... },
    update: function(deltaTime) { ... },
    setTimeScale: function(scale) { ... },
    play: function() { ... },
    pause: function() { ... },
    reset: function() { ... },
    getFormattedDate: function() { ... },
    getJulianDate: function() { ... },
    getAllPositions: function() { ... },
    getDistance: function(body1Name, body2Name) { ... }
};
```

## Constants

| Constant  | Value           | Description                          |
| --------- | --------------- | ------------------------------------ |
| `G`       | `6.67430e-11`   | Gravitational constant (m³ kg⁻¹ s⁻²) |
| `AU`      | `149597870700`  | Astronomical Unit in meters          |
| `DAY`     | `86400`         | Seconds per day                      |
| `DEG2RAD` | `Math.PI / 180` | Degrees to radians conversion        |
| `RAD2DEG` | `180 / Math.PI` | Radians to degrees conversion        |

## State Properties

| Property    | Type    | Description                                  |
| ----------- | ------- | -------------------------------------------- |
| `simTime`   | number  | Current simulation time in J2000 days        |
| `timeScale` | number  | Multiplier for time progression (default: 1) |
| `isPlaying` | boolean | Whether simulation is running                |

## Methods

### deg2rad()

Converts degrees to radians.

**Syntax:**
```javascript
const radians = PhysicsEngine.deg2rad(degrees);
```

**Parameters:**
- `degrees` (number): Angle in degrees

**Returns:**
- (number): Angle in radians

**Example:**
```javascript
const rad = PhysicsEngine.deg2rad(180);
// Returns: 3.141592653589793
```

### rad2deg()

Converts radians to degrees.

**Syntax:**
```javascript
const degrees = PhysicsEngine.rad2deg(radians);
```

**Parameters:**
- `radians` (number): Angle in radians

**Returns:**
- (number): Angle in degrees

**Example:**
```javascript
const deg = PhysicsEngine.rad2deg(Math.PI);
// Returns: 180
```

### solveKepler()

Solves Kepler's equation using Newton-Raphson iteration.

**Equation:** M = E - e·sin(E)
- M = Mean anomaly
- E = Eccentric anomaly
- e = Eccentricity

**Syntax:**
```javascript
const E = PhysicsEngine.solveKepler(M, e, tolerance);
```

**Parameters:**
- `M` (number): Mean anomaly in radians
- `e` (number): Eccentricity (0-1)
- `tolerance` (number, optional): Convergence threshold (default: 1e-8)

**Returns:**
- (number): Eccentric anomaly in radians

**Algorithm:**
1. Normalize M to [0, 2π]
2. Initial guess: E ≈ M for low e, E ≈ π for high e
3. Newton-Raphson iteration until convergence

**Example:**
```javascript
// Solve for Earth (e ≈ 0.017) at 90 days into orbit
const M = (2 * Math.PI / 365.25) * 90; // Mean anomaly
const E = PhysicsEngine.solveKepler(M, 0.017);
console.log(E); // ≈ 1.547 radians
```

### calculatePosition()

Calculates 3D position from orbital elements at a given time.

**Syntax:**
```javascript
const position = PhysicsEngine.calculatePosition(elements, time);
```

**Parameters:**
- `elements` (object): Orbital elements
  - `a` (number): Semi-major axis (AU)
  - `e` (number): Eccentricity
  - `i` (number): Inclination (degrees)
  - `L` (number): Mean longitude (degrees)
  - `w` (number): Longitude of perihelion (degrees)
  - `node` (number): Longitude of ascending node (degrees)
  - `period` (number, optional): Orbital period (days)
- `time` (number): Time since epoch in days

**Returns:**
```javascript
{
    x: number,  // AU from reference point
    y: number,  // AU from reference point
    z: number   // AU from reference point
}
```

**Calculation Steps:**
1. Calculate mean anomaly M at time t
2. Solve Kepler's equation for eccentric anomaly E
3. Calculate true anomaly from E
4. Get radial distance r
5. Transform from orbital plane to ecliptic coordinates

**Example:**
```javascript
const marsOrbitalElements = {
    a: 1.524,      // AU
    e: 0.093,
    i: 1.85,
    L: 0,
    w: 286.5,
    node: 49.6,
    period: 687
};

const position = PhysicsEngine.calculatePosition(marsOrbitalElements, 100);
console.log(`Mars position: (${position.x}, ${position.y}, ${position.z}) AU`);
// Output: Mars position: (1.42, 0.05, -0.32) AU
```

### calculatePeriod()

Calculates orbital period from semi-major axis using Kepler's 3rd law.

**Equation:** P² = a³
- P = Period in years
- a = Semi-major axis in AU

**Syntax:**
```javascript
const period = PhysicsEngine.calculatePeriod(a);
```

**Parameters:**
- `a` (number): Semi-major axis in AU

**Returns:**
- (number): Orbital period in days

**Example:**
```javascript
// Earth's orbital period
const earthPeriod = PhysicsEngine.calculatePeriod(1);
console.log(earthPeriod); // 365.25 days

// Jupiter's orbital period
const jupiterPeriod = PhysicsEngine.calculatePeriod(5.203);
console.log(jupiterPeriod); // 4333 days (≈ 11.86 years)
```

### calculateMoonPosition()

Calculates moon position relative to its parent planet.

**Syntax:**
```javascript
const position = PhysicsEngine.calculateMoonPosition(moonData, parentPos, time);
```

**Parameters:**
- `moonData` (object): Moon orbital elements (same as planets, distances in km)
- `parentPos` (object): Parent body position `{x, y, z}` in AU
- `time` (number): Time in days

**Returns:**
```javascript
{
    x: number,  // AU from reference point
    y: number,
    z: number
}
```

**Example:**
```javascript
const moonData = AstronomicalData.Moons.Moon;
const earthPos = PhysicsEngine.getPosition('Earth', 0);
const moonPos = PhysicsEngine.calculateMoonPosition(moonData, earthPos, 0);
console.log(`Moon position relative to Earth:`, moonPos);
// Output: Moon position relative to Earth: {x: 0.00257, y: 0, z: 0}
```

### getPosition()

Gets the 3D position of a celestial body at a given time.

**Syntax:**
```javascript
const position = PhysicsEngine.getPosition(bodyName, time);
```

**Parameters:**
- `bodyName` (string): Name of the body (e.g., 'Mars', 'Io')
- `time` (number, optional): Days since J2000 (default: current simTime)

**Returns:**
```javascript
{
    x: number,
    y: number,
    z: number
}
```

**Special Handling:**
- Sun: Always returns `{x: 0, y: 0, z: 0}`
- Planets: Calculates position around Sun
- Moons: Calculates position relative to parent planet

**Example:**
```javascript
// Get Earth's position at current simulation time
const earthPos = PhysicsEngine.getPosition('Earth');
console.log(`Earth: (${earthPos.x}, ${earthPos.y}, ${earthPos.z}) AU`);

// Get position at specific time
const futurePos = PhysicsEngine.getPosition('Mars', 1000);
console.log(`Mars in 1000 days: (${futurePos.x}, ${futurePos.y}, ${futurePos.z})`);

// Get Moon position (automatically relative to Earth)
const moonPos = PhysicsEngine.getPosition('Moon');
console.log(`Moon: (${moonPos.x}, ${moonPos.y}, ${moonPos.z}) AU from Sun`);
```

### calculateVelocity()

Calculates velocity vector for an orbital body.

**Syntax:**
```javascript
const velocity = PhysicsEngine.calculateVelocity(elements, time);
```

**Parameters:**
- `elements` (object): Orbital elements
- `time` (number): Time in days since epoch

**Returns:**
```javascript
{
    x: number,  // AU per day
    y: number,
    z: number
}
```

**Example:**
```javascript
const elements = AstronomicalData.Planets.Earth;
const velocity = PhysicsEngine.calculateVelocity(elements, 0);
console.log(`Earth velocity: (${velocity.x}, ${velocity.y}, ${velocity.z}) AU/day`);
// Average Earth orbital velocity: ≈ 0.0172 AU/day (≈ 2π AU/year)
```

### getOrbitalPeriod()

Returns the orbital period for a celestial body.

**Syntax:**
```javascript
const period = PhysicsEngine.getOrbitalPeriod(bodyName);
```

**Parameters:**
- `bodyName` (string): Name of the body

**Returns:**
- (number): Orbital period in days, or 0 if not found

**Example:**
```javascript
console.log(`Earth orbital period: ${PhysicsEngine.getOrbitalPeriod('Earth')} days`);
// 365 days

console.log(`Jupiter orbital period: ${PhysicsEngine.getOrbitalPeriod('Jupiter')} days`);
// 4333 days

console.log(`Io orbital period: ${PhysicsEngine.getOrbitalPeriod('Io')} days`);
// 1.77 days
```

### getScaleFactor()

Returns the scale factor for visualization.

**Syntax:**
```javascript
const scale = PhysicsEngine.getScaleFactor();
```

**Returns:**
- (number): Current scale factor (default: 1)

**Note:** Real solar system scales are too large for direct rendering. This method allows adjustment for zoom levels.

### setTime()

Sets the simulation time.

**Syntax:**
```javascript
PhysicsEngine.setTime(time);
```

**Parameters:**
- `time` (number): Days since J2000 (minimum: 0)

**Example:**
```javascript
// Set to 100 days after J2000
PhysicsEngine.setTime(100);

// Set to January 1, 2001 (365 days after J2000)
PhysicsEngine.setTime(365);
```

### update()

Advances simulation time.

**Syntax:**
```javascript
PhysicsEngine.update(deltaTime);
```

**Parameters:**
- `deltaTime` (number): Elapsed real time in seconds

**Calculation:**
```
daysPassed = (deltaTime / DAY) * timeScale * 1000
simTime += daysPassed
```

**Example:**
```javascript
// Called each animation frame with elapsed time
function animate() {
    const deltaTime = (Date.now() - lastTime) / 1000; // seconds
    PhysicsEngine.update(deltaTime);
    requestAnimationFrame(animate);
}
```

### setTimeScale()

Sets the time scale multiplier.

**Syntax:**
```javascript
PhysicsEngine.setTimeScale(scale);
```

**Parameters:**
- `scale` (number): Multiplier (1 = real time, 1000 = 1000x faster)

**Example:**
```javascript
// Real time
PhysicsEngine.setTimeScale(1);

// 1 day per second
PhysicsEngine.setTimeScale(86400);

// 1 year per second
PhysicsEngine.setTimeScale(31536000);
```

### play()

Starts or resumes the simulation.

**Syntax:**
```javascript
PhysicsEngine.play();
```

**Example:**
```javascript
// Start simulation
PhysicsEngine.play();
```

### pause()

Pauses the simulation.

**Syntax:**
```javascript
PhysicsEngine.pause();
```

**Example:**
```javascript
// Pause simulation
PhysicsEngine.pause();
```

### reset()

Resets simulation to initial state.

**Syntax:**
```javascript
PhysicsEngine.reset();
```

**Effects:**
- `simTime` = 0
- `isPlaying` = false

**Example:**
```javascript
// Reset simulation
PhysicsEngine.reset();
```

### getFormattedDate()

Returns formatted date string for simulation time.

**Syntax:**
```javascript
const dateString = PhysicsEngine.getFormattedDate();
```

**Returns:**
- (string): Date in ISO format (YYYY-MM-DD)

**Example:**
```javascript
PhysicsEngine.setTime(365); // 1 year after J2000
const date = PhysicsEngine.getFormattedDate();
console.log(date); // "2001-01-01"
```

### getJulianDate()

Calculates Julian Date from simulation time.

**Syntax:**
```javascript
const jd = PhysicsEngine.getJulianDate();
```

**Returns:**
- (number): Julian Date (J2000 = 2451545.0)

**Calculation:**
```
JD = 2451545.0 + simTime
```

**Example:**
```javascript
const jd = PhysicsEngine.getJulianDate();
console.log(jd); // 2451910.5 (for simTime = 365)
```

### getAllPositions()

Returns positions of all celestial bodies at current time.

**Syntax:**
```javascript
const positions = PhysicsEngine.getAllPositions();
```

**Returns:**
```javascript
{
    'Sun': { x: 0, y: 0, z: 0 },
    'Mercury': { x: ..., y: ..., z: ... },
    'Venus': { x: ..., y: ..., z: ... },
    // ... all bodies
}
```

**Example:**
```javascript
const allPositions = PhysicsEngine.getAllPositions();
Object.entries(allPositions).forEach(([name, pos]) => {
    console.log(`${name}: (${pos.x.toFixed(3)}, ${pos.y.toFixed(3)}, ${pos.z.toFixed(3)}) AU`);
});
```

### getDistance()

Calculates distance between two bodies.

**Syntax:**
```javascript
const distance = PhysicsEngine.getDistance(body1Name, body2Name);
```

**Parameters:**
- `body1Name` (string): First body name
- `body2Name` (string): Second body name

**Returns:**
- (number): Distance in AU

**Example:**
```javascript
// Distance from Earth to Mars
const dist = PhysicsEngine.getDistance('Earth', 'Mars');
console.log(`Earth-Mars distance: ${dist.toFixed(3)} AU`);

// Distance from Earth to Sun
const earthSunDist = PhysicsEngine.getDistance('Earth', 'Sun');
console.log(`Earth-Sun distance: ${earthSunDist.toFixed(3)} AU`);
// Should be approximately 1 AU
```

## Usage Examples

### Basic Simulation Setup

```javascript
// Initialize simulation
PhysicsEngine.setTime(0);
PhysicsEngine.setTimeScale(86400); // 1 day per second
PhysicsEngine.play();

// Get positions each frame
function animate() {
    const positions = PhysicsEngine.getAllPositions();
    renderScene(positions);
    requestAnimationFrame(animate);
}
```

### Custom Time Travel

```javascript
// Go to specific date (e.g., July 20, 1969 - Moon landing)
const moonLanding = new Date('1969-07-20T20:17:00Z');
const j2000 = new Date('2000-01-01T12:00:00Z');
const daysSinceJ2000 = (moonLanding - j2000) / (1000 * 86400);

PhysicsEngine.setTime(daysSinceJ2000);
const positions = PhysicsEngine.getAllPositions();
console.log(`Earth-Moon distance: ${PhysicsEngine.getDistance('Earth', 'Moon').toFixed(3)} AU`);
```

### Finding Opposition

```javascript
// Find when Earth and Mars are closest (opposition)
function findNextOpposition() {
    const earthPeriod = PhysicsEngine.getOrbitalPeriod('Earth');
    const marsPeriod = PhysicsEngine.getOrbitalPeriod('Mars');
    
    // Synodic period (time between oppositions)
    const synodic = 1 / Math.abs(1/earthPeriod - 1/marsPeriod);
    
    console.log(`Mars opposition occurs every ${synodic.toFixed(1)} days`);
}

findNextOpposition(); // ≈ 780 days (26 months)
```

### Velocity Calculation

```javascript
// Calculate escape velocity from Sun at Earth's orbit
const earthVel = PhysicsEngine.calculateVelocity(AstronomicalData.Planets.Earth, 0);
const speed = Math.sqrt(earthVel.x**2 + earthVel.y**2 + earthVel.z**2);
console.log(`Earth orbital speed: ${(speed * AstronomicalData.AU / 86400).toFixed(0)} m/s`);
// ≈ 29,780 m/s (actual: 29,780 m/s)
```

## Orbital Mechanics Background

### Kepler's Laws

1. **First Law**: Planets orbit the Sun in ellipses with the Sun at one focus
2. **Second Law**: A line segment joining a planet and the Sun sweeps out equal areas during equal intervals of time
3. **Third Law**: The square of the orbital period is proportional to the cube of the semi-major axis (P² ∝ a³)

### Orbital Elements

| Element                     | Symbol | Range  | Description                                 |
| --------------------------- | ------ | ------ | ------------------------------------------- |
| Semi-major axis             | a      | > 0    | Average distance from parent (AU)           |
| Eccentricity                | e      | 0-1    | Shape of orbit (0 = circle, 1 = parabola)   |
| Inclination                 | i      | 0-180° | Tilt from reference plane                   |
| Longitude of ascending node | Ω      | 0-360° | Where orbit crosses reference plane upward  |
| Argument of perihelion      | ω      | 0-360° | Orientation of ellipse in orbital plane     |
| Mean anomaly                | M      | 0-360° | Fraction of orbital period since perihelion |

### Coordinate Transformations

The position calculation involves transforming from the orbital plane to the ecliptic coordinate system:

```
1. Calculate position in orbital plane (r, θ)
2. Apply rotation for inclination (i)
3. Apply rotation for longitude of ascending node (Ω)
4. Apply rotation for argument of perihelion (ω)
```

## Performance Considerations

- **Pre-compute orbits**: For static visualization, pre-calculate orbital paths
- **Use appropriate precision**: Default tolerance (1e-8) is sufficient for visualization
- **Batch calculations**: Use `getAllPositions()` for multiple bodies
- **Time caching**: Avoid calling `getPosition()` repeatedly for the same body in one frame

## See Also

- [AstronomicalData](API_AstronomicalData.md) - Celestial body data
- [TimeSystem](API_TimeSystem.md) - Time management
- [WebGLRenderer](API_WebGLRenderer.md) - 3D visualization


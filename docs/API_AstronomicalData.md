# AstronomicalData API Reference

Provides comprehensive solar system celestial body data including planets, moons, comets, and meteor showers. Data is sourced from NASA/JPL databases.

## Overview

```javascript
const AstronomicalData = {
    AU: 149597870700,
    DAY: 86400,
    DEG2RAD: Math.PI / 180,
    RAD2DEG: 180 / Math.PI,
    J2000: new Date('2000-01-01T12:00:00Z'),
    Sun: { ... },
    Planets: { ... },
    Moons: { ... },
    Comets: { ... },
    Meteors: { ... },
    getAllBodies: function() { ... },
    getMoonsForPlanet: function(planetName) { ... },
    getUnconfirmedMoonsForPlanet: function(planetName) { ... }
};
```

## Constants

| Constant  | Value                              | Description                                      |
| --------- | ---------------------------------- | ------------------------------------------------ |
| `AU`      | `149597870700`                     | Astronomical Unit in meters (Earth-Sun distance) |
| `DAY`     | `86400`                            | Seconds per day                                  |
| `DEG2RAD` | `Math.PI / 180`                    | Degrees to radians conversion factor             |
| `RAD2DEG` | `180 / Math.PI`                    | Radians to degrees conversion factor             |
| `J2000`   | `new Date('2000-01-01T12:00:00Z')` | J2000 epoch reference date                       |

## Celestial Body Structure

All celestial body objects follow this structure:

```javascript
{
    name: "BodyName",
    type: "planet|moon|comet|meteor|star",
    parent: "ParentBodyName",
    a: 1.524,              // Semi-major axis (AU for planets, km for moons)
    e: 0.093,              // Eccentricity (0-1)
    i: 7.0,                // Inclination (degrees)
    radius: 3390000,       // Mean radius in meters
    mass: 6.39e+23,        // Mass in kg
    period: 687,           // Orbital period in days
    rotation: 24.6,        // Rotation period in hours
    tilt: 25.2,            // Axial tilt in degrees
    color: 0xC1440E,       // Hex color for visualization
    moons: ["Moon1", "Moon2"],  // Array of moon names (planets only)
    unconfirmedMoons: []   // Unconfirmed moon names (planets only)
}
```

## Sun Object

```javascript
Sun: {
    name: 'Sun',
    type: 'star',
    mass: 1.989e30,        // kg
    radius: 696340000,     // m
    color: 0xFFDD00,
    emissive: 0xFFAA00,
    position: { x: 0, y: 0, z: 0 }
}
```

## Planets

### Mercury

```javascript
Planets: {
    Mercury: {
        name: "Mercury",
        type: "planet",
        parent: "Sun",
        a: 0.387,          // AU
        e: 0.206,
        i: 7,
        radius: 2440000,   // m
        mass: 3.301e+23,   // kg
        period: 88,        // days
        rotation: 1408,    // hours
        tilt: 0.03,        // degrees
        color: 0xB5B5B5,
        moons: [],
        unconfirmedMoons: []
    },
    // ... other planets
}
```

### Venus

```javascript
Venus: {
    name: "Venus",
    type: "planet",
    parent: "Sun",
    a: 0.723,
    e: 0.007,
    i: 3.4,
    radius: 6052000,
    mass: 4.867e+24,
    period: 225,
    rotation: -5833,       // Negative = retrograde rotation
    tilt: 177,             // degrees
    color: 0xE6C229,
    moons: [],
    unconfirmedMoons: []
}
```

### Earth

```javascript
Earth: {
    name: "Earth",
    type: "planet",
    parent: "Sun",
    a: 1,
    e: 0.017,
    i: 0,
    radius: 6371000,
    mass: 5.972e+24,
    period: 365,
    rotation: 24,
    tilt: 23.4,
    color: 0x6B93D6,
    moons: ["Moon"],
    unconfirmedMoons: ["Cruithne", "2016_HO3"]
}
```

### Mars

```javascript
Mars: {
    name: "Mars",
    type: "planet",
    parent: "Sun",
    a: 1.524,
    e: 0.093,
    i: 1.85,
    radius: 3390000,
    mass: 6.39e+23,
    period: 687,
    rotation: 24.6,
    tilt: 25.2,
    color: 0xC1440E,
    moons: ["Phobos", "Deimos"],
    unconfirmedMoons: []
}
```

### Jupiter

```javascript
Jupiter: {
    name: "Jupiter",
    type: "planet",
    parent: "Sun",
    a: 5.203,
    e: 0.048,
    i: 1.3,
    radius: 69911000,
    mass: 1.898e+27,
    period: 4333,
    rotation: 9.9,
    tilt: 3.1,
    color: 0xD8CA9D,
    moons: ["Io", "Europa", "Ganymede", "Callisto"],
    unconfirmedMoons: ["S/2003_J12", "S/2011_J2"]
}
```

### Saturn

```javascript
Saturn: {
    name: "Saturn",
    type: "planet",
    parent: "Sun",
    a: 9.537,
    e: 0.054,
    i: 2.49,
    radius: 58232000,
    mass: 5.683e+26,
    period: 10759,
    rotation: 10.7,
    tilt: 26.7,
    color: 0xEAD6B8,
    hasRings: true,
    moons: ["Titan", "Rhea", "Iapetus", "Dione", "Tethys", "Enceladus", "Mimas"],
    unconfirmedMoons: ["S/2004_S8", "S/2004_S9"]
}
```

### Uranus

```javascript
Uranus: {
    name: "Uranus",
    type: "planet",
    parent: "Sun",
    a: 19.19,
    e: 0.047,
    i: 0.77,
    radius: 25362000,
    mass: 8.681e+25,
    period: 30689,
    rotation: -17.2,
    tilt: 97.8,            // Extreme axial tilt (rotates on side)
    color: 0xD1E7E7,
    moons: ["Miranda", "Ariel", "Umbriel", "Titania", "Oberon"],
    unconfirmedMoons: ["S/2001_Q1", "Perdita"]
}
```

### Neptune

```javascript
Neptune: {
    name: "Neptune",
    type: "planet",
    parent: "Sun",
    a: 30.07,
    e: 0.009,
    i: 1.77,
    radius: 24622000,
    mass: 1.024e+26,
    period: 60182,
    rotation: 16.1,
    tilt: 28.3,
    color: 0x5B5DDF,
    moons: ["Triton", "Proteus", "Nereid"],
    unconfirmedMoons: ["S/2002_N1", "S/2003_N1"]
}
```

## Moons

### Major Moons by Planet

#### Earth's Moon
```javascript
Moon: {
    name: "Moon",
    type: "moon",
    parent: "Earth",
    a: 384400,       // km (distance from Earth)
    e: 0.055,
    i: 5.1,
    period: 27.3,    // days
    radius: 1737000, // m
    mass: 7.34e+22,  // kg
    color: 0xAAAAAA
}
```

#### Mars Moons
```javascript
Phobos: {
    name: "Phobos",
    type: "moon",
    parent: "Mars",
    a: 9376,         // km
    e: 0.015,
    i: 1.1,
    period: 0.32,    // days (very fast!)
    radius: 11267,   // m
    mass: 1.07e+16,  // kg
    color: 0x8B7355
}

Deimos: {
    name: "Deimos",
    type: "moon",
    parent: "Mars",
    a: 23458,
    e: 0.0002,
    i: 1.788,
    period: 1.263,
    radius: 6200,
    mass: 1.48e+15,
    color: 0x8B8378
}
```

#### Jupiter's Galilean Moons
```javascript
Io: {
    name: "Io",
    type: "moon",
    parent: "Jupiter",
    a: 421700,
    e: 0.004,
    i: 0.04,
    period: 1.77,
    radius: 1821600,
    mass: 8.93e+22,
    color: 0xFFE135
}

Europa: {
    name: "Europa",
    type: "moon",
    parent: "Jupiter",
    a: 671034,
    e: 0.009,
    i: 0.47,
    period: 3.55,
    radius: 1560800,
    mass: 4.8e+22,
    color: 0xC9A659
}

Ganymede: {
    name: "Ganymede",
    type: "moon",
    parent: "Jupiter",
    a: 1070412,
    e: 0.001,
    i: 0.2,
    period: 7.15,
    radius: 2631200,
    mass: 1.48e+23,
    color: 0x8A8A8A
}

Callisto: {
    name: "Callisto",
    type: "moon",
    parent: "Jupiter",
    a: 1882709,
    e: 0.007,
    i: 0.19,
    period: 16.69,
    radius: 2410300,
    mass: 1.08e+23,
    color: 0x6E6E6E
}
```

#### Saturn's Major Moons
```javascript
Titan: {
    name: "Titan",
    type: "moon",
    parent: "Saturn",
    a: 1221870,
    e: 0.029,
    i: 0.31,
    period: 15.95,
    radius: 2574700,
    mass: 1.35e+23,
    color: 0xE8C776
}

// Plus: Rhea, Iapetus, Dione, Tethys, Enceladus, Mimas
```

#### Uranus's Moons
```javascript
Miranda: {
    name: "Miranda",
    type: "moon",
    parent: "Uranus",
    a: 129390,
    e: 0.001,
    i: 4.23,
    period: 1.41,
    radius: 235800,
    mass: 6.59e+19,
    color: 0xA8A8A8
}

// Plus: Ariel, Umbriel, Titania, Oberon
```

#### Neptune's Moons
```javascript
Triton: {
    name: "Triton",
    type: "moon",
    parent: "Neptune",
    a: 354759,
    e: 0.00002,
    i: 157,          // Highly inclined (retrograde orbit)
    period: -5.88,   // Negative = retrograde orbit
    radius: 1353400,
    mass: 2.14e+22,
    color: 0xB5B5B5
}

// Plus: Proteus, Nereid
```

## Comets

```javascript
Comets: {
    Halley: {
        name: "Halley's Comet",
        type: "comet",
        parent: "Sun",
        a: 17.8,
        e: 0.967,      // High eccentricity
        i: 162.3,      // High inclination
        period: 27500, // years
        radius: 5500,
        color: 0xFFFFFF,
        tailColor: 0x88CCFF
    },
    HaleBopp: {
        name: "Comet Hale-Bopp",
        type: "comet",
        parent: "Sun",
        a: 186,
        e: 0.995,
        i: 89.4,
        period: 10600,
        radius: 30000,
        color: 0x88CCFF,
        tailColor: 0xAADDFF
    },
    Encke: {
        name: "Comet Encke",
        type: "comet",
        parent: "Sun",
        a: 2.21,
        e: 0.847,
        i: 11.8,
        period: 1206,
        radius: 2400,
        color: 0xFFFFFF,
        tailColor: 0xAADDFF
    },
    SwiftTuttle: {
        name: "Comet Swift-Tuttle",
        type: "comet",
        parent: "Sun",
        a: 26.09,
        e: 0.963,
        i: 113.5,
        period: 13328,
        radius: 13500,
        color: 0xFFFFFF,
        tailColor: 0xAADDFF
    },
    TempelTuttle: {
        name: "Comet Tempel-Tuttle",
        type: "comet",
        parent: "Sun",
        a: 10.33,
        e: 0.905,
        i: 162.5,
        period: 3232,
        radius: 2300,
        color: 0xFFFFFF,
        tailColor: 0xAADDFF
    }
}
```

## Meteor Showers

```javascript
Meteors: {
    Perseids: {
        name: "Perseids",
        type: "meteor",
        parent: "Sun",
        radiant: {
            ra: 3.1,      // Right ascension (hours)
            dec: 58       // Declination (degrees)
        },
        peakDate: "August 12",
        zhr: 100,         // Zenithal Hourly Rate
        parentComet: "SwiftTuttle",
        color: 0xFFFFFF
    },
    Leonids: {
        name: "Leonids",
        type: "meteor",
        parent: "Sun",
        radiant: {
            ra: 10.15,
            dec: 22
        },
        peakDate: "November 17",
        zhr: 15,
        parentComet: "TempelTuttle",
        color: 0xFFFFFF
    },
    Quadrantids: {
        name: "Quadrantids",
        type: "meteor",
        parent: "Sun",
        radiant: {
            ra: 15.3,
            dec: 49
        },
        peakDate: "January 3",
        zhr: 120,
        parentComet: "2003_EH1",
        color: 0xFFFFFF
    },
    Geminids: {
        name: "Geminids",
        type: "meteor",
        parent: "Sun",
        radiant: {
            ra: 7.55,
            dec: 33
        },
        peakDate: "December 13",
        zhr: 150,
        parentComet: "3200_Phaethon",
        color: 0xFFFFFF
    },
    Orionids: {
        name: "Orionids",
        type: "meteor",
        parent: "Sun",
        radiant: {
            ra: 6.4,
            dec: 16
        },
        peakDate: "October 21",
        zhr: 20,
        parentComet: "Halley",
        color: 0xFFFFFF
    },
    EtaAquariids: {
        name: "Eta Aquariids",
        type: "meteor",
        parent: "Sun",
        radiant: {
            ra: 22.5,
            dec: -1
        },
        peakDate: "May 5",
        zhr: 50,
        parentComet: "Halley",
        color: 0xFFFFFF
    }
}
```

## Methods

### getAllBodies()

Returns an object containing all celestial bodies indexed by name.

**Syntax:**
```javascript
const allBodies = AstronomicalData.getAllBodies();
```

**Returns:**
```javascript
{
    'Sun': { ... },
    'Mercury': { ... },
    'Venus': { ... },
    // ... all planets, moons, comets, meteors
}
```

**Example:**
```javascript
// Get Earth's data
const earth = AstronomicalData.getAllBodies()['Earth'];
console.log(earth.mass); // 5.972e+24

// Iterate over all bodies
Object.entries(AstronomicalData.getAllBodies()).forEach(([name, data]) => {
    console.log(`${name}: ${data.type}`);
});
```

### getMoonsForPlanet(planetName)

Returns an array of moon objects for the specified planet.

**Syntax:**
```javascript
const moons = AstronomicalData.getMoonsForPlanet(planetName);
```

**Parameters:**
- `planetName` (string): Name of the planet (e.g., 'Jupiter', 'Saturn')

**Returns:**
```javascript
Array of moon objects, or empty array if planet not found
```

**Example:**
```javascript
// Get Jupiter's moons
const jupiterMoons = AstronomicalData.getMoonsForPlanet('Jupiter');
jupiterMoons.forEach(moon => {
    console.log(`${moon.name}: ${moon.period} day orbital period`);
});
// Output: Io: 1.77 day orbital period
//         Europa: 3.55 day orbital period
//         Ganymede: 7.15 day orbital period
//         Callisto: 16.69 day orbital period
```

### getUnconfirmedMoonsForPlanet(planetName)

Returns an array of unconfirmed moon objects for the specified planet.

**Syntax:**
```javascript
const unconfirmed = AstronomicalData.getUnconfirmedMoonsForPlanet(planetName);
```

**Parameters:**
- `planetName` (string): Name of the planet

**Returns:**
```javascript
Array of objects:
{
    name: string,
    type: 'unconfirmed_moon',
    parent: planetName,
    confirmed: false
}
```

**Example:**
```javascript
const earthMoons = AstronomicalData.getUnconfirmedMoonsForPlanet('Earth');
console.log(earthMoons);
// Output: [{ name: 'Cruithne', type: 'unconfirmed_moon', parent: 'Earth', confirmed: false }, ...]
```

## Usage Examples

### Getting Planet Information

```javascript
// Get Mars data
const mars = AstronomicalData.Planets.Mars;
console.log(`${mars.name} has a radius of ${mars.radius} meters`);
console.log(`Orbital period: ${mars.period} days`);

// Get all planet names
const planetNames = Object.keys(AstronomicalData.Planets);
console.log(planetNames);
// ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']
```

### Calculating Orbits

```javascript
// Use with PhysicsEngine
const earth = AstronomicalData.Planets.Earth;
const position = PhysicsEngine.calculatePosition(earth, 0); // At J2000
console.log(`Earth position at J2000:`, position);

// Get moons for a planet
const jupiterMoons = AstronomicalData.getMoonsForPlanet('Jupiter');
jupiterMoons.forEach(moon => {
    const moonPos = PhysicsEngine.calculateMoonPosition(
        moon,
        PhysicsEngine.getPosition('Jupiter'),
        0
    );
    console.log(`${moon.name} position:`, moonPos);
});
```

### Color Visualization

```javascript
// Convert hex color to CSS
function colorToCSS(color) {
    return '#' + color.toString(16).padStart(6, '0');
}

Object.values(AstronomicalData.Planets).forEach(planet => {
    console.log(`${planet.name}: ${colorToCSS(planet.color)}`);
});
```

### Finding Bodies by Type

```javascript
// Get all planets
const planets = Object.values(AstronomicalData.getAllBodies())
    .filter(body => body.type === 'planet');

// Get all moons
const moons = Object.values(AstronomicalData.getAllBodies())
    .filter(body => body.type === 'moon');

// Get retrograde moons (negative orbital period)
const retrogradeMoons = Object.values(AstronomicalData.getAllBodies())
    .filter(body => body.type === 'moon' && body.period < 0);
// Triton is the only major retrograde moon
```

## Data Updates

To update astronomical data from NASA APIs:

```bash
node Scripts/fetchAstronomicalData.js
```

This will:
1. Fetch data from Open Solar System API
2. Process and format the data
3. Generate updated `Engine/AstronomicalData.js`

See [API_fetchAstronomicalData.md](API_fetchAstronomicalData.md) for more details.

## Orbital Element Definitions

| Symbol | Name                        | Description                                                      |
| ------ | --------------------------- | ---------------------------------------------------------------- |
| `a`    | Semi-major axis             | Average distance from parent body (AU for planets, km for moons) |
| `e`    | Eccentricity                | Shape of orbit (0 = circle, 1 = parabola)                        |
| `i`    | Inclination                 | Tilt of orbital plane relative to reference plane (degrees)      |
| `L`    | Mean longitude              | Average angular position                                         |
| `w`    | Longitude of perihelion     | Position of closest approach to parent                           |
| `node` | Longitude of ascending node | Where orbit crosses reference plane going upward                 |

## Notes

- All orbital periods are in **days**
- Moon distances are in **kilometers** (km)
- Planet distances are in **Astronomical Units** (AU)
- Mass values are in **kilograms** (kg)
- Radius values are in **meters** (m)
- Rotation periods are in **hours**
- Negative rotation periods indicate **retrograde** rotation
- Negative orbital periods indicate **retrograde** orbits (orbiting opposite to planet's rotation)


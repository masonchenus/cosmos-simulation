# AstronomicalData - Uranus

## Data Object

```javascript
AstronomicalData.Planets.Uranus: {
    name: "Uranus",
    type: "planet",
    parent: "Sun",
    a: 19.191,
    e: 0.047,
    i: 0.77,
    radius: 25362000,
    mass: 8.681e+25,
    period: 30689,
    rotation: -17.2,
    tilt: 97.8,
    color: 0xD1E7E7,
    moons: [],
    unconfirmedMoons: []
}
```

## Property Reference

| Property | Type | Description |
|----------|------|-------------|
| a | number | Semi-major axis (AU) |
| e | number | Eccentricity |
| i | number | Inclination (degrees) |
| radius | number | Mean radius (meters) |
| mass | number | Mass (kg) |
| period | number | Orbital period (days) |
| rotation | number | Rotation period (hours) |
| tilt | number | Axial tilt (degrees) |

## Usage

```javascript
const Uranus = AstronomicalData.Planets.Uranus;
const position = PhysicsEngine.getPosition('Uranus', daysSinceJ2000);
```

# AstronomicalData - Neptune

## Data Object

```javascript
AstronomicalData.Planets.Neptune: {
    name: "Neptune",
    type: "planet",
    parent: "Sun",
    a: 30.069,
    e: 0.009,
    i: 1.77,
    radius: 24622000,
    mass: 1.024e+26,
    period: 60182,
    rotation: 16.1,
    tilt: 28.3,
    color: 0x5B5DDF,
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
const Neptune = AstronomicalData.Planets.Neptune;
const position = PhysicsEngine.getPosition('Neptune', daysSinceJ2000);
```

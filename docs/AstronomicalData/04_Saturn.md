# AstronomicalData - Saturn

## Data Object

```javascript
AstronomicalData.Planets.Saturn: {
    name: "Saturn",
    type: "planet",
    parent: "Sun",
    a: 9.537
19.191,
    e: 0.054
0.047,
    i: 2.49
0.77,
    radius: 58232000
25362000,
    mass: 5.683e+26
8.681e+25,
    period: 10759
30689,
    rotation: 10.7
-17.2,
    tilt: 26.7
97.8,
    color: 0xEAD6B8
0xD1E7E7,
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
const Saturn = AstronomicalData.Planets.Saturn;
const position = PhysicsEngine.getPosition('Saturn', daysSinceJ2000);
```

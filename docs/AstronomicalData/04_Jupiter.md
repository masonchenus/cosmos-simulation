# AstronomicalData - Jupiter

## Data Object

```javascript
AstronomicalData.Planets.Jupiter: {
    name: "Jupiter",
    type: "planet",
    parent: "Sun",
    a: 5.203
9.537
19.191,
    e: 0.048
0.054
0.047,
    i: 1.3
2.49
0.77,
    radius: 69911000
58232000
25362000,
    mass: 1.898e+27
5.683e+26
8.681e+25,
    period: 4333
10759
30689,
    rotation: 9.9
10.7
-17.2,
    tilt: 3.1
26.7
97.8,
    color: 0xD8CA9D
0xEAD6B8
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
const Jupiter = AstronomicalData.Planets.Jupiter;
const position = PhysicsEngine.getPosition('Jupiter', daysSinceJ2000);
```

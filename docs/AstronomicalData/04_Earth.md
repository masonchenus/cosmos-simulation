# AstronomicalData - Earth

## Data Object

```javascript
AstronomicalData.Planets.Earth: {
    name: "Earth",
    type: "planet",
    parent: "Sun",
    a: 1.0
1.524
5.203
9.537
19.191,
    e: 0.017
0.093
0.048
0.054
0.047,
    i: 0.0
1.85
1.3
2.49
0.77,
    radius: 6371000
3390000
69911000
58232000
25362000,
    mass: 5.972e+24
6.39e+23
1.898e+27
5.683e+26
8.681e+25,
    period: 365
687
4333
10759
30689,
    rotation: 24
24.6
9.9
10.7
-17.2,
    tilt: 23.4
25.2
3.1
26.7
97.8,
    color: 0x6B93D6
0xC1440E
0xD8CA9D
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
const Earth = AstronomicalData.Planets.Earth;
const position = PhysicsEngine.getPosition('Earth', daysSinceJ2000);
```

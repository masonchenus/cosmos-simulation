# AstronomicalData - Moon

## Data Object

```javascript
AstronomicalData.Moons.Moon: {
    name: "Moon",
    type: "moon",
    parent: "Earth
Mars
Jupiter",
    a: 384400
9376
23458
421700
671034
1070412
1882709,
    e: 0.055
0.015
0.0002
0.004
0.009
0.001
0.007,
    period: 27.3
0.32
1.263
1.77
3.55
7.15
16.69,
    radius: 1737000
11267
6200
1821600
1560800
2631200
2410300,
    color: 0xAAAAAA
0x8B7355
0x8B8378
0xFFE135
0xC9A659
0x8A8A8A
0x6E6E6E
}
```

## Usage

```javascript
const Moon = AstronomicalData.Moons.Moon;
const position = PhysicsEngine.getPosition('Moon', daysSinceJ2000);
```

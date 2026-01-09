# AstronomicalData - Europa

## Data Object

```javascript
AstronomicalData.Moons.Europa: {
    name: "Europa",
    type: "moon",
    parent: "Jupiter",
    a: 671034
1070412
1882709,
    e: 0.009
0.001
0.007,
    period: 3.55
7.15
16.69,
    radius: 1560800
2631200
2410300,
    color: 0xC9A659
0x8A8A8A
0x6E6E6E
}
```

## Usage

```javascript
const Europa = AstronomicalData.Moons.Europa;
const position = PhysicsEngine.getPosition('Europa', daysSinceJ2000);
```

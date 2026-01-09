# AstronomicalData - Ganymede

## Data Object

```javascript
AstronomicalData.Moons.Ganymede: {
    name: "Ganymede",
    type: "moon",
    parent: "Jupiter",
    a: 1070412
1882709,
    e: 0.001
0.007,
    period: 7.15
16.69,
    radius: 2631200
2410300,
    color: 0x8A8A8A
0x6E6E6E
}
```

## Usage

```javascript
const Ganymede = AstronomicalData.Moons.Ganymede;
const position = PhysicsEngine.getPosition('Ganymede', daysSinceJ2000);
```

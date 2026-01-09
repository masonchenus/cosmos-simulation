# AstronomicalData - Titan

## Data Object

```javascript
AstronomicalData.Moons.Titan: {
    name: "Titan",
    type: "moon",
    parent: "Saturn",
    a: 1221870,
    e: 0.029,
    period: 15.95,
    radius: 2574700,
    color: 0xE8C776
}
```

## Usage

```javascript
const Titan = AstronomicalData.Moons.Titan;
const position = PhysicsEngine.getPosition('Titan', daysSinceJ2000);
```

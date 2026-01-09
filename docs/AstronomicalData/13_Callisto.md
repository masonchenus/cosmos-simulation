# AstronomicalData - Callisto

## Data Object

```javascript
AstronomicalData.Moons.Callisto: {
    name: "Callisto",
    type: "moon",
    parent: "Jupiter",
    a: 1882709,
    e: 0.007,
    period: 16.69,
    radius: 2410300,
    color: 0x6E6E6E
}
```

## Usage

```javascript
const Callisto = AstronomicalData.Moons.Callisto;
const position = PhysicsEngine.getPosition('Callisto', daysSinceJ2000);
```

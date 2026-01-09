# AstronomicalData - Rhea

## Data Object

```javascript
AstronomicalData.Moons.Rhea: {
    name: "Rhea",
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
const Rhea = AstronomicalData.Moons.Rhea;
const position = PhysicsEngine.getPosition('Rhea', daysSinceJ2000);
```

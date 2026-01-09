# AstronomicalData Planets Overview

## Overview

The `Planets` object contains data for all 8 planets in our solar system. Each planet has orbital and physical parameters used for simulation.

## Planet List

| Planet | Orbital Period | Semi-major Axis | Eccentricity |
|--------|---------------|-----------------|--------------|
| Mercury | 88 days | 0.387 AU | 0.206 |
| Venus | 225 days | 0.723 AU | 0.007 |
| Earth | 365 days | 1.000 AU | 0.017 |
| Mars | 687 days | 1.524 AU | 0.093 |
| Jupiter | 4333 days | 5.203 AU | 0.048 |
| Saturn | 10759 days | 9.537 AU | 0.054 |
| Uranus | 30689 days | 19.191 AU | 0.047 |
| Neptune | 60182 days | 30.069 AU | 0.009 |

## Accessing Planet Data

```javascript
const planets = AstronomicalData.Planets;
console.log(planets.Mercury);
console.log(planets.Earth.radius);
```

## See Also
- [02_SUN](02_SUN.md) - Sun data
- [04_MERCURY](04_MERCURY.md) through [11_NEPTUNE](11_NEPTUNE.md) - Individual planets

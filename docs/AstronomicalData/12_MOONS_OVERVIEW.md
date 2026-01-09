# AstronomicalData Moons Overview

## Overview

The `Moons` object contains data for all major moons in the solar system. Each moon has orbital parameters relative to its parent planet.

## Moon Groups

### Earth
- Moon

### Mars
- Phobos
- Deimos

### Jupiter
- Io, Europa, Ganymede, Callisto (Galilean moons)
- And 79+ other moons

### Saturn
- Titan, Rhea, Iapetus, Dione, Tethys, Enceladus, Mimas
- And 82+ other moons

### Uranus
- Miranda, Ariel, Umbriel, Titania, Oberon

### Neptune
- Triton, Proteus, Nereid

## Accessing Moon Data

```javascript
const moons = AstronomicalData.Moons;
const moon = AstronomicalData.getMoonsForPlanet('Jupiter');
```

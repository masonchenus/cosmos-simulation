# WebGLRenderer.createPlanet()

## Overview

Creates a single planet with orbit and label.

## Syntax

```javascript
WebGLRenderer.createPlanet(name, data);
```

## Parameters

- `name` (string): Planet name
- `data` (object): Planet data from AstronomicalData

## Details

- Sphere geometry with radius × scalePlanets
- MeshStandardMaterial with body color
- Orbit line (128 segments)
- Label positioned above planet
- Rings for Saturn (if applicable)

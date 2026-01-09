# WebGLRenderer.createMoon()

## Overview

Creates a single moon.

## Syntax

```javascript
WebGLRenderer.createMoon(name, data);
```

## Parameters

- `name` (string): Moon name
- `data` (object): Moon data from AstronomicalData

## Details

- Sphere with radius × scalePlanets × 5
- 8 segments for performance
- Label positioned above moon

# WebGLRenderer.createAsteroids()

## Overview

Creates asteroid belt between Mars and Jupiter.

## Syntax

```javascript
WebGLRenderer.createAsteroids();
```

## Details

- Creates `settings.asteroidCount` asteroids (default: 100)
- Random positions at 2.2-3.7 AU
- Dodecahedron geometry
- Stored in `bodies['AsteroidBelt']` group

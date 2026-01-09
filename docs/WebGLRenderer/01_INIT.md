# WebGLRenderer.init()

## Overview

Initializes the Three.js scene and all visual elements.

## Syntax

```javascript
WebGLRenderer.init(container);
```

## Parameters

- `container` (HTMLElement): DOM element for canvas

## Effects

- Creates Three.js scene, camera, renderer
- Initializes OrbitControls
- Creates star field, Sun, planets, moons, asteroids, comets
- Adds lighting
- Attaches event listeners

## Example

```javascript
const container = document.getElementById('canvas');
WebGLRenderer.init(container);
WebGLRenderer.start();
```

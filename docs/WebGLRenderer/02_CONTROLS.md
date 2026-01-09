# WebGLRenderer.initControls()

## Overview

Initializes OrbitControls for camera navigation.

## Syntax

```javascript
WebGLRenderer.initControls();
```

## Default Settings

```javascript
{
    enableDamping: true,
    dampingFactor: 0.05,
    minDistance: 1,
    maxDistance: 10000,
    enablePan: true,
    panSpeed: 1,
    rotateSpeed: 0.5,
    zoomSpeed: 1
}
```

## Usage

```javascript
WebGLRenderer.controls.pan(new THREE.Vector3(10, 0, 0));
WebGLRenderer.controls.rotateLeft(Math.PI / 4);
```

# PhysicsEngine.calculatePosition()

## Overview

Calculates 3D position from orbital elements at a given time.

## Syntax

```javascript
const position = PhysicsEngine.calculatePosition(elements, time);
```

## Parameters

- `elements` (object): Orbital elements (a, e, i, L, w, node, period)
- `time` (number): Days since epoch

## Returns

```javascript
{ x: number, y: number, z: number }  // AU
```

## Example

```javascript
const pos = PhysicsEngine.calculatePosition(earthElements, 0);
```

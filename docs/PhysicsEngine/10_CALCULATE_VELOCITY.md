# PhysicsEngine.calculateVelocity()

## Overview

Calculates velocity vector for an orbital body.

## Syntax

```javascript
const velocity = PhysicsEngine.calculateVelocity(elements, time);
```

## Parameters

- `elements` (object): Orbital elements
- `time` (number): Days since epoch

## Returns

- (object): {x, y, z} in AU/day

## Example

```javascript
const vel = PhysicsEngine.calculateVelocity(earthElements, 0);
```

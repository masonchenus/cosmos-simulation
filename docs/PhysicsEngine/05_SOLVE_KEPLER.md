# PhysicsEngine.solveKepler()

## Overview

Solves Kepler's equation using Newton-Raphson iteration.

## Equation

M = E - e·sin(E)

## Syntax

```javascript
const E = PhysicsEngine.solveKepler(M, e, tolerance);
```

## Parameters

- M (number): Mean anomaly in radians
- e (number): Eccentricity (0-1)
- tolerance (number): Convergence threshold (default: 1e-8)

## Returns

- (number): Eccentric anomaly in radians

## Example

```javascript
const E = PhysicsEngine.solveKepler(Math.PI, 0.017);
```

# PhysicsEngine.calculatePeriod()

## Overview

Calculates orbital period from semi-major axis using Kepler's 3rd law.

## Equation

P² = a³

## Syntax

```javascript
const period = PhysicsEngine.calculatePeriod(a);
```

## Parameters

- `a` (number): Semi-major axis in AU

## Returns

- (number): Orbital period in days

## Example

```javascript
const period = PhysicsEngine.calculatePeriod(1);  // ~365 days
```

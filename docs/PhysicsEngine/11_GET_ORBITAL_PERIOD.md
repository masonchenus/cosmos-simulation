# PhysicsEngine.getOrbitalPeriod()

## Overview

Returns the orbital period for a celestial body.

## Syntax

```javascript
const period = PhysicsEngine.getOrbitalPeriod(bodyName);
```

## Parameters

- `bodyName` (string): Name of the body

## Returns

- (number): Orbital period in days, 0 if not found

## Example

```javascript
const period = PhysicsEngine.getOrbitalPeriod('Jupiter');  // ~4333 days
```

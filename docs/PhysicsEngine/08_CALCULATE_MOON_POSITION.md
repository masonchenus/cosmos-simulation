# PhysicsEngine.calculateMoonPosition()

## Overview

Calculates moon position relative to its parent planet.

## Syntax

```javascript
const position = PhysicsEngine.calculateMoonPosition(moonData, parentPos, time);
```

## Parameters

- `moonData` (object): Moon orbital elements
- `parentPos` (object): Parent position in AU
- `time` (number): Days since epoch

## Returns

- (object): {x, y, z} in AU

## Example

```javascript
const pos = PhysicsEngine.calculateMoonPosition(moonData, earthPos, 0);
```

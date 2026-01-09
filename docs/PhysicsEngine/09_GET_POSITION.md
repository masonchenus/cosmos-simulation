# PhysicsEngine.getPosition()

## Overview

Gets the 3D position of a celestial body at a given time.

## Syntax

```javascript
const position = PhysicsEngine.getPosition(bodyName, time);
```

## Parameters

- `bodyName` (string): Name of the body
- `time` (number, optional): Days since J2000

## Returns

- (object): {x, y, z} in AU

## Example

```javascript
const pos = PhysicsEngine.getPosition('Mars', 100);
```

# PhysicsEngine.getDistance()

## Overview

Calculates distance between two bodies.

## Syntax

```javascript
const distance = PhysicsEngine.getDistance(body1Name, body2Name);
```

## Parameters

- `body1Name` (string): First body name
- `body2Name` (string): Second body name

## Returns

- (number): Distance in AU

## Example

```javascript
const dist = PhysicsEngine.getDistance('Earth', 'Mars');
```

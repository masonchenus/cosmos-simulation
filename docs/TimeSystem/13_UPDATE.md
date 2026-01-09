# TimeSystem.update()

## Overview

Updates simulation time (call each animation frame).

## Syntax

```javascript
TimeSystem.update();
```

## Effects

- Advances simTime by elapsed time × timeScale
- Updates lastUpdate timestamp

## Example

```javascript
function animate() {
    TimeSystem.update();
    render();
    requestAnimationFrame(animate);
}
```

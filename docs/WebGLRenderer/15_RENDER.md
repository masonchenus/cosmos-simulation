# WebGLRenderer Render Methods

## onWindowResize()

Handles window resize.

```javascript
window.addEventListener('resize', WebGLRenderer.onWindowResize.bind(WebGLRenderer));
```

## onMouseMove(event)

Handles mouse movement.

```javascript
canvas.addEventListener('mousemove', WebGLRenderer.onMouseMove.bind(WebGLRenderer));
```

## render()

Renders current frame.

```javascript
WebGLRenderer.render();
```

## animate()

Main animation loop.

```javascript
WebGLRenderer.animate();
```

## start()

Starts simulation.

```javascript
WebGLRenderer.start();
```

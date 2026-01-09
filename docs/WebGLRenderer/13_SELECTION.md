# WebGLRenderer Selection Methods

## onMouseClick(event)

Handles mouse clicks for body selection.

```javascript
canvas.addEventListener('click', WebGLRenderer.onMouseClick.bind(WebGLRenderer));
```

## selectBody(mesh)

Selects a celestial body.

```javascript
WebGLRenderer.selectBody(mesh);
```

## deselectBody()

Deselects current body.

```javascript
WebGLRenderer.deselectBody();
```

## focusOnBody(name)

Moves camera to focus on body.

```javascript
WebGLRenderer.focusOnBody('Mars');
```

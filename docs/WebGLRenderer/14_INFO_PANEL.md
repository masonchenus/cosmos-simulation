# WebGLRenderer Info Panel Methods

## updateInfoPanel(name)

Updates info panel with body details.

```javascript
WebGLRenderer.updateInfoPanel('Earth');
```

## formatNumber(num)

Formats number with thousand separators.

```javascript
const str = WebGLRenderer.formatNumber(6371000);  // "6,371,000"
```

## formatScientific(num)

Formats number in scientific notation.

```javascript
const str = WebGLRenderer.formatScientific(5.972e+24);  // "5.97 × 10^24"
```

## Displayed Information

- Type, Radius, Mass
- Orbital period, Rotation period
- Axial tilt, Semi-major axis
- Eccentricity, Inclination
- Moon count, Description

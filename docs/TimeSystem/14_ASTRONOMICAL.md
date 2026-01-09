# TimeSystem Astronomical Methods

## getSolarLongitude()

Returns Sun's ecliptic longitude in degrees.

```javascript
const lon = TimeSystem.getSolarLongitude();  // 0-360°
```

## getSeason()

Returns Northern Hemisphere season.

```javascript
const season = TimeSystem.getSeason();  // "Spring", "Summer", etc.
```

## getEarthObliquity()

Returns Earth's axial tilt in degrees.

```javascript
const tilt = TimeSystem.getEarthObliquity();  // ~23.44°
```

## getMoonPhase()

Returns moon phase as fraction (0-1).

```javascript
const phase = TimeSystem.getMoonPhase();  // 0=new, 0.5=full
```

## getMoonPhaseName()

Returns phase name.

```javascript
const name = TimeSystem.getMoonPhaseName();  // "Full Moon", etc.
```

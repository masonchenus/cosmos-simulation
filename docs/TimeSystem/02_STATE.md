# TimeSystem State

## State Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| simTime | number | 0 | ms from J2000 |
| timeScale | number | 1 | Time multiplier |
| isPlaying | boolean | false | Playback state |
| lastUpdate | number | 0 | Last update timestamp |

## Usage

```javascript
TimeSystem.simTime;     // Current time
TimeSystem.timeScale;   // Speed multiplier
TimeSystem.isPlaying;   // Playing state
```

# TimeSystem Presets

## Available Presets

| Preset       | Value    | Description         |
| ------------ | -------- | ------------------- |
| 'paused'     | 0        | No time flow        |
| 'realtime'   | 1        | Real time           |
| '1min/sec'   | 60       | 1 minute per second |
| '1hour/sec'  | 3600     | 1 hour per second   |
| '1day/sec'   | 86400    | 1 day per second    |
| '1week/sec'  | 604800   | 1 week per second   |
| '1month/sec' | 2592000  | 1 month per second  |
| '1year/sec'  | 31536000 | 1 year per second   |

## Usage

```javascript
TimeSystem.setTimeScalePreset('1day/sec');
```

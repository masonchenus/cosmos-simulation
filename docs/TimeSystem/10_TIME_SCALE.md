# TimeSystem Time Scale Methods

## setTimeScale(scale)

Sets time multiplier.

```javascript
TimeSystem.setTimeScale(86400);  // 1 day per second
```

## setTimeScalePreset(presetName)

Sets time scale from preset.

```javascript
TimeSystem.setTimeScalePreset('1day/sec');
```

## getTimeScale()

Returns current time scale.

```javascript
const scale = TimeSystem.getTimeScale();
```

## getTimeScaleDisplay()

Returns display name.

```javascript
const display = TimeSystem.getTimeScaleDisplay();  // "1day/sec"
```

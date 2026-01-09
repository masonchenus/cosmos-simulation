# TimeSystem API Reference

Manages simulation time, date calculations, time scales, and calendar conversions. Handles Julian dates, seasonal calculations, and moon phases.

## Overview

```javascript
const TimeSystem = {
    // Constants
    DAY: 86400000,      // milliseconds per day
    HOUR: 3600000,      // milliseconds per hour
    MINUTE: 60000,      // milliseconds per minute
    SECOND: 1000,       // milliseconds per second

    // Epoch reference
    J2000_EPOCH: new Date('2000-01-01T12:00:00Z'),
    J2000_JD: 2451545.0,

    // State
    simTime: 0,
    timeScale: 1,
    isPlaying: false,
    lastUpdate: 0,

    // Presets
    timeScales: { ... },

    // Methods
    init: function() { ... },
    setDate: function(date) { ... },
    setJulianDate: function(jd) { ... },
    setDaysSinceJ2000: function(days) { ... },
    getDate: function() { ... },
    getJulianDate: function() { ... },
    getDaysSinceJ2000: function() { ... },
    formatDate: function(date) { ... },
    formatDateTime: function(date) { ... },
    formatRelativeTime: function() { ... },
    setTimeScale: function(scale) { ... },
    setTimeScalePreset: function(presetName) { ... },
    getTimeScale: function() { ... },
    getTimeScaleDisplay: function() { ... },
    play: function() { ... },
    pause: function() { ... },
    togglePlay: function() { ... },
    reset: function() { ... },
    goToDate: function(year, month, day) { ... },
    jumpForward: function(amount, unit) { ... },
    jumpBackward: function(amount, unit) { ... },
    update: function() { ... },
    getSolarLongitude: function() { ... },
    getSeason: function() { ... },
    getEarthObliquity: function() { ... },
    getMoonPhase: function() { ... },
    getMoonPhaseName: function() { ... }
};
```

## Constants

| Constant      | Value                              | Description                |
| ------------- | ---------------------------------- | -------------------------- |
| `DAY`         | `86400000`                         | Milliseconds per day       |
| `HOUR`        | `3600000`                          | Milliseconds per hour      |
| `MINUTE`      | `60000`                            | Milliseconds per minute    |
| `SECOND`      | `1000`                             | Milliseconds per second    |
| `J2000_EPOCH` | `new Date('2000-01-01T12:00:00Z')` | J2000 epoch reference      |
| `J2000_JD`    | `2451545.0`                        | Julian Date of J2000 epoch |

## Time Scale Presets

The `timeScales` object provides convenient presets:

```javascript
timeScales: {
    'paused': 0,
    'realtime': 1,
    '1min/sec': 60,
    '1hour/sec': 3600,
    '1day/sec': 86400,
    '1week/sec': 604800,
    '1month/sec': 2592000,
    '1year/sec': 31536000,
    '10years/sec': 315360000,
    '100years/sec': 3153600000,
    '1000years/sec': 31536000000
}
```

## State Properties

| Property     | Type    | Description                                        |
| ------------ | ------- | -------------------------------------------------- |
| `simTime`    | number  | Current simulation time in milliseconds from J2000 |
| `timeScale`  | number  | Time multiplier (1 = real time)                    |
| `isPlaying`  | boolean | Whether simulation is running                      |
| `lastUpdate` | number  | Timestamp of last update                           |

## Methods

### init()

Initializes the time system to current system time.

**Syntax:**
```javascript
TimeSystem.init();
```

**Effects:**
- Sets `simTime` to current time relative to J2000
- Sets `lastUpdate` to current timestamp

**Example:**
```javascript
// Initialize time system on app start
TimeSystem.init();
```

### setDate()

Sets simulation time from a Date object.

**Syntax:**
```javascript
TimeSystem.setDate(date);
```

**Parameters:**
- `date` (Date): JavaScript Date object

**Example:**
```javascript
// Set to specific date
const date = new Date('2024-01-01T00:00:00Z');
TimeSystem.setDate(date);

// Set to now
TimeSystem.setDate(new Date());
```

### setJulianDate()

Sets simulation time from Julian Date.

**Syntax:**
```javascript
TimeSystem.setJulianDate(jd);
```

**Parameters:**
- `jd` (number): Julian Date

**Example:**
```javascript
// Set to J2000 epoch
TimeSystem.setJulianDate(2451545.0);

// Set to a specific Julian Date
TimeSystem.setJulianDate(2460000.0);
```

### setDaysSinceJ2000()

Sets simulation time from days since J2000 epoch.

**Syntax:**
```javascript
TimeSystem.setDaysSinceJ2000(days);
```

**Parameters:**
- `days` (number): Days since January 1, 2000 12:00:00 TT

**Example:**
```javascript
// Set to 365 days after J2000 (approximately Jan 1, 2001)
TimeSystem.setDaysSinceJ2000(365);

// Set to 0 (J2000)
TimeSystem.setDaysSinceJ2000(0);
```

### getDate()

Returns current simulation date as Date object.

**Syntax:**
```javascript
const date = TimeSystem.getDate();
```

**Returns:**
- (Date): Current simulation date

**Example:**
```javascript
const currentDate = TimeSystem.getDate();
console.log(currentDate.toISOString());
// Output: "2024-06-15T12:00:00.000Z"
```

### getJulianDate()

Returns current Julian Date.

**Syntax:**
```javascript
const jd = TimeSystem.getJulianDate();
```

**Returns:**
- (number): Julian Date

**Calculation:**
```
JD = J2000_JD + (simTime / DAY)
```

**Example:**
```javascript
const jd = TimeSystem.getJulianDate();
console.log(`Current Julian Date: ${jd}`);
// Output: "Current Julian Date: 2460482.5"
```

### getDaysSinceJ2000()

Returns days since J2000 epoch.

**Syntax:**
```javascript
const days = TimeSystem.getDaysSinceJ2000();
```

**Returns:**
- (number): Days since J2000

**Example:**
```javascript
const days = TimeSystem.getDaysSinceJ2000();
console.log(`Days since J2000: ${days.toFixed(2)}`);
// Output: "Days since J2000: 8942.5"
```

### formatDate()

Formats a date as ISO string (YYYY-MM-DD).

**Syntax:**
```javascript
const dateStr = TimeSystem.formatDate(date);
```

**Parameters:**
- `date` (Date, optional): Date to format (defaults to current simulation date)

**Returns:**
- (string): Formatted date string

**Example:**
```javascript
// Format current simulation date
const str = TimeSystem.formatDate();
console.log(str); // "2024-06-15"

// Format specific date
const customDate = new Date('1969-07-20');
const apolloDate = TimeSystem.formatDate(customDate);
console.log(apolloDate); // "1969-07-20"
```

### formatDateTime()

Formats a date with time (YYYY-MM-DD HH:MM:SS).

**Syntax:**
```javascript
const dateTimeStr = TimeSystem.formatDateTime(date);
```

**Parameters:**
- `date` (Date, optional): Date to format (defaults to current)

**Returns:**
- (string): Formatted datetime string

**Example:**
```javascript
console.log(TimeSystem.formatDateTime());
// Output: "2024-06-15 14:30:00"
```

### formatRelativeTime()

Formats a human-readable relative time string.

**Syntax:**
```javascript
const relativeStr = TimeSystem.formatRelativeTime();
```

**Returns:**
- (string): Human-readable time description

**Format:**
| Range                | Format           | Example             |
| -------------------- | ---------------- | ------------------- |
| < 1 year             | X days           | "45.3 days"         |
| 1-1000 years         | X years          | "2.5 years"         |
| 1000-1,000,000 years | X thousand years | "500 years"         |
| > 1,000,000 years    | X million years  | "2.5 million years" |

**Example:**
```javascript
TimeSystem.setDaysSinceJ2000(365.25);
console.log(TimeSystem.formatRelativeTime());
// Output: "1 years"

TimeSystem.setDaysSinceJ2000(3652500);
console.log(TimeSystem.formatRelativeTime());
// Output: "10000 years"
```

### setTimeScale()

Sets the time scale multiplier.

**Syntax:**
```javascript
TimeSystem.setTimeScale(scale);
```

**Parameters:**
- `scale` (number): Time multiplier (minimum: 0)

**Example:**
```javascript
// Pause (0 speed)
TimeSystem.setTimeScale(0);

// Real time
TimeSystem.setTimeScale(1);

// 1 day per second
TimeSystem.setTimeScale(86400);

// 1 year per second
TimeSystem.setTimeScale(31536000);
```

### setTimeScalePreset()

Sets time scale from a preset name.

**Syntax:**
```javascript
const success = TimeSystem.setTimeScalePreset(presetName);
```

**Parameters:**
- `presetName` (string): Name of preset (see Time Scale Presets table)

**Returns:**
- (boolean): true if preset found and set, false otherwise

**Example:**
```javascript
// Use preset
TimeSystem.setTimeScalePreset('1day/sec');

// Check if valid preset
if (TimeSystem.setTimeScalePreset('1year/sec')) {
    console.log('Time scale set to 1 year per second');
}
```

### getTimeScale()

Returns current time scale.

**Syntax:**
```javascript
const scale = TimeSystem.getTimeScale();
```

**Returns:**
- (number): Current time scale multiplier

**Example:**
```javascript
console.log(`Current time scale: ${TimeSystem.getTimeScale()}`);
// Output: "Current time scale: 86400"
```

### getTimeScaleDisplay()

Returns human-readable time scale display name.

**Syntax:**
```javascript
const display = TimeSystem.getTimeScaleDisplay();
```

**Returns:**
- (string): Display name of current time scale

**Example:**
```javascript
TimeSystem.setTimeScale(86400);
console.log(TimeSystem.getTimeScaleDisplay());
// Output: "1day/sec"

TimeSystem.setTimeScale(31536000);
console.log(TimeSystem.getTimeScaleDisplay());
// Output: "1year/sec"

TimeSystem.setTimeScale(0);
console.log(TimeSystem.getTimeScaleDisplay());
// Output: "paused"
```

### play()

Starts/resumes the simulation.

**Syntax:**
```javascript
TimeSystem.play();
```

**Effects:**
- `isPlaying` = true
- `lastUpdate` = current timestamp

**Example:**
```javascript
// Start simulation
TimeSystem.play();
```

### pause()

Pauses the simulation.

**Syntax:**
```javascript
TimeSystem.pause();
```

**Effects:**
- `isPlaying` = false

**Example:**
```javascript
// Pause simulation
TimeSystem.pause();
```

### togglePlay()

Toggles between play and pause states.

**Syntax:**
```javascript
const isPlaying = TimeSystem.togglePlay();
```

**Returns:**
- (boolean): New state (true = playing, false = paused)

**Example:**
```javascript
// Toggle play/pause
const nowPlaying = TimeSystem.togglePlay();
console.log(nowPlaying ? 'Playing' : 'Paused');
```

### reset()

Resets simulation to initial time.

**Syntax:**
```javascript
TimeSystem.reset();
```

**Effects:**
- `simTime` = 0
- `isPlaying` = false
- `lastUpdate` = current timestamp

**Example:**
```javascript
// Reset to J2000 epoch
TimeSystem.reset();
```

### goToDate()

Jumps to a specific calendar date.

**Syntax:**
```javascript
TimeSystem.goToDate(year, month, day);
```

**Parameters:**
- `year` (number): Year (e.g., 2024)
- `month` (number): Month (1-12)
- `day` (number): Day of month (1-31)

**Example:**
```javascript
// Go to July 20, 1969 (Moon landing)
TimeSystem.goToDate(1969, 7, 20);

// Go to January 1, 2000
TimeSystem.goToDate(2000, 1, 1);
```

### jumpForward()

Advances time by a specified amount.

**Syntax:**
```javascript
TimeSystem.jumpForward(amount, unit);
```

**Parameters:**
- `amount` (number): Amount to jump
- `unit` (string, optional): Time unit ('seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years')

**Example:**
```javascript
// Jump forward 1 week
TimeSystem.jumpForward(1, 'weeks');

// Jump forward 30 days
TimeSystem.jumpForward(30, 'days');

// Jump forward 1 year
TimeSystem.jumpForward(1, 'years');
```

### jumpBackward()

Rewinds time by a specified amount.

**Syntax:**
```javascript
TimeSystem.jumpBackward(amount, unit);
```

**Parameters:**
- `amount` (number): Amount to jump
- `unit` (string, optional): Time unit (default: 'days')

**Example:**
```javascript
// Jump back 1 week
TimeSystem.jumpBackward(1, 'weeks');

// Jump back 1 month
TimeSystem.jumpBackward(1, 'months');

// Jump back 100 years
TimeSystem.jumpBackward(100, 'years');
```

**Note:** Time will not go below 0 (J2000 epoch).

### update()

Updates simulation time (call each animation frame).

**Syntax:**
```javascript
TimeSystem.update();
```

**Effects:**
- If playing, advances `simTime` by elapsed time × timeScale
- Updates `lastUpdate` to current timestamp

**Example:**
```javascript
// In animation loop
function animate() {
    TimeSystem.update();
    renderScene();
    requestAnimationFrame(animate);
}
```

### getSolarLongitude()

Calculates the Sun's ecliptic longitude.

**Syntax:**
```javascript
const longitude = TimeSystem.getSolarLongitude();
```

**Returns:**
- (number): Solar longitude in degrees (0-360)

**Calculation:**
```
L = (280.460 + 0.9856474 × daysSinceJ2000) mod 360
```

**Example:**
```javascript
TimeSystem.setDate(new Date('2024-06-21')); // Summer solstice
const solarLon = TimeSystem.getSolarLongitude();
console.log(`Solar longitude: ${solarLon.toFixed(1)}°`);
// Around 90° (summer solstice in northern hemisphere)
```

### getSeason()

Returns approximate season for Northern Hemisphere.

**Syntax:**
```javascript
const season = TimeSystem.getSeason();
```

**Returns:**
- (string): Season name ('Spring', 'Summer', 'Fall', 'Winter')

**Example:**
```javascript
TimeSystem.setDate(new Date('2024-06-15'));
console.log(TimeSystem.getSeason());
// Output: "Summer"

TimeSystem.setDate(new Date('2024-12-15'));
console.log(TimeSystem.getSeason());
// Output: "Winter"
```

### getEarthObliquity()

Calculates Earth's axial tilt (obliquity) for current epoch.

**Syntax:**
```javascript
const obliquity = TimeSystem.getEarthObliquity();
```

**Returns:**
- (number): Obliquity in degrees

**Calculation (IAU 1976 precession model):**
```
obliquity = 23.439291 - 0.0130042 × centuriesSinceJ2000
```

**Example:**
```javascript
const tilt = TimeSystem.getEarthObliquity();
console.log(`Earth's axial tilt: ${tilt.toFixed(2)}°`);
// Current: ~23.44°
// Varies over ~41,000 year cycle (22.1° to 24.5°)
```

### getMoonPhase()

Calculates the current moon phase (0-1).

**Syntax:**
```javascript
const phase = TimeSystem.getMoonPhase();
```

**Returns:**
- (number): Phase fraction (0 = new, 0.5 = full, 1 = new again)

**Calculation:**
```
phase = (daysSinceJ2000 mod synodicMonth) / synodicMonth
synodicMonth = 29.53058867 days
```

**Example:**
```javascript
const phase = TimeSystem.getMoonPhase();
if (phase < 0.03) {
    console.log('New Moon');
} else if (phase < 0.47) {
    console.log('Waxing Crescent');
} else if (phase < 0.53) {
    console.log('First Quarter');
} else if (phase < 0.97) {
    console.log('Waxing Gibbous');
} else {
    console.log('Full Moon');
}
```

### getMoonPhaseName()

Returns the name of the current moon phase.

**Syntax:**
```javascript
const phaseName = TimeSystem.getMoonPhaseName();
```

**Returns:**
- (string): Phase name

**Possible Values:**
- 'New Moon'
- 'Waxing Crescent'
- 'First Quarter'
- 'Waxing Gibbous'
- 'Full Moon'
- 'Waning Gibbous'
- 'Last Quarter'
- 'Waning Crescent'

**Example:**
```javascript
console.log(`Current phase: ${TimeSystem.getMoonPhaseName()}`);
// Output: "Current phase: First Quarter"
```

## Usage Examples

### Basic Time Control

```javascript
// Initialize
TimeSystem.init();

// Start simulation at 1 day per second
TimeSystem.setTimeScale(86400);
TimeSystem.play();

// In animation loop
function animate() {
    TimeSystem.update();
    updateDisplay();
    render();
    requestAnimationFrame(animate);
}
```

### Date Navigation

```javascript
// Go to specific date
TimeSystem.goToDate(1969, 7, 20); // Moon landing
console.log(`Date: ${TimeSystem.formatDate()}`);

// Jump forward 1 week
TimeSystem.jumpForward(1, 'weeks');
console.log(`Date: ${TimeSystem.formatDate()}`);

// Jump backward 1 month
TimeSystem.jumpBackward(1, 'months');
console.log(`Date: ${TimeSystem.formatDate()}`);
```

### Moon Phase Display

```javascript
function displayMoonInfo() {
    const phase = TimeSystem.getMoonPhase();
    const phaseName = TimeSystem.getMoonPhaseName();
    
    // Calculate illumination (0-100%)
    const illumination = (1 - Math.cos(2 * Math.PI * phase)) * 50;
    
    console.log(`Moon Phase: ${phaseName}`);
    console.log(`Illumination: ${illumination.toFixed(1)}%`);
    console.log(`Phase Fraction: ${phase.toFixed(3)}`);
}

displayMoonInfo();
```

### Julian Date Conversion

```javascript
// Convert between Date and Julian Date
const now = new Date();
TimeSystem.setDate(now);

const jd = TimeSystem.getJulianDate();
const daysSinceJ2000 = TimeSystem.getDaysSinceJ2000();

console.log(`Date: ${TimeSystem.formatDate()}`);
console.log(`Julian Date: ${jd.toFixed(5)}`);
console.log(`Days since J2000: ${daysSinceJ2000.toFixed(2)}`);
```

### Astronomical Events

```javascript
// Find next full moon
function findNextFullMoon() {
    const synodicMonth = 29.53058867;
    let days = TimeSystem.getDaysSinceJ2000();
    
    // Find current phase position
    const currentPhase = days % synodicMonth;
    const daysToFull = synodicMonth * 0.5 - currentPhase;
    
    if (daysToFull < 0) daysToFull += synodicMonth;
    
    TimeSystem.jumpForward(daysToFull, 'days');
    console.log(`Next full moon: ${TimeSystem.formatDate()}`);
    console.log(`Phase: ${TimeSystem.getMoonPhaseName()}`);
}

findNextFullMoon();
```

### Seasonal Information

```javascript
function displaySeasonalInfo() {
    const date = TimeSystem.getDate();
    const season = TimeSystem.getSeason();
    const solarLon = TimeSystem.getSolarLongitude();
    const obliquity = TimeSystem.getEarthObliquity();
    
    console.log(`Date: ${TimeSystem.formatDate()}`);
    console.log(`Season (Northern Hemisphere): ${season}`);
    console.log(`Solar Longitude: ${solarLon.toFixed(1)}°`);
    console.log(`Earth's Axial Tilt: ${obliquity.toFixed(2)}°`);
}

displaySeasonalInfo();
```

## Calendar Background

### Julian Date

The Julian Date (JD) is a continuous count of days since noon Universal Time on January 1, 4713 BCE. It's used extensively in astronomy for:

- Unambiguous date/time representation
- Calculating intervals between events
- Orbital mechanics calculations

**J2000 Epoch:**
- JD: 2451545.0
- January 1, 2000 12:00:00 TT (Terrestrial Time)
- Reference point for modern astronomical calculations

### Synodic Month

The synodic month (29.53058867 days) is the time between consecutive new moons. It's longer than the sidereal month because the Earth-Moon system also orbits the Sun.

### Earth Seasons

Seasons are caused by Earth's 23.44° axial tilt. As Earth orbits the Sun:
- Summer solstice: Sun at maximum northern declination
- Winter solstice: Sun at maximum southern declination
- Equinoxes: Sun crosses the celestial equator

## Performance Notes

- `update()` is designed to be called every animation frame
- Time calculations use efficient millisecond arithmetic
- Moon phase calculations use simplified model (sufficient for visualization)
- Seasonal calculations are approximations for display purposes

## See Also

- [PhysicsEngine](API_PhysicsEngine.md) - Orbital position calculations
- [AstronomicalData](API_AstronomicalData.md) - Celestial body data
- [WebGLRenderer](API_WebGLRenderer.md) - 3D visualization


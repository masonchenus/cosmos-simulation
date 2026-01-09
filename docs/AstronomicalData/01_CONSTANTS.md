# AstronomicalData Constants

## Overview

The `AstronomicalData` module provides fundamental constants used throughout the solar system simulation. These constants are defined at the module level and are used for unit conversions and reference calculations.

## Constants Reference

### AU - Astronomical Unit

```javascript
AU: 149597870700
```

**Type:** `number` (integer)

**Description:** The astronomical unit of length, defined as the mean distance between the Earth and the Sun.

**Unit:** meters

**Value Source:** IAU 2012 definition

**Usage Examples:**

```javascript
// Convert AU to kilometers
const auInKm = AstronomicalData.AU / 1000; // 149,597,870.7 km

// Convert AU to miles
const auInMiles = AstronomicalData.AU / 1609.344; // 92,955,807.3 miles

// Calculate distance between Earth and Mars (minimum)
const minMarsDistance = 0.37 * AstronomicalData.AU; // ~55.4 million km
```

**Related Constants:**
- Used by `PhysicsEngine` for position calculations
- Used by `TimeSystem` for distance-based calculations

---

### DAY

```javascript
DAY: 86400
```

**Type:** `number` (integer)

**Description:** The number of seconds in one Earth day.

**Unit:** seconds

**Usage Examples:**

```javascript
// Convert days to hours
const hoursInDay = AstronomicalData.DAY / 3600; // 24 hours

// Calculate orbital period in seconds
const earthPeriodSeconds = 365.25 * AstronomicalData.DAY; // ~31.56 million seconds

// Convert hours to days
const daysFromHours = 24 / AstronomicalData.DAY; // 1/86400
```

**Related Constants:**
- Part of the time conversion system
- Used by `PhysicsEngine` for orbital calculations
- Used by `TimeSystem` for simulation time

---

### DEG2RAD

```javascript
DEG2RAD: Math.PI / 180
```

**Type:** `number` (float)

**Description:** Conversion factor from degrees to radians.

**Value:** Approximately 0.017453292519943295

**Usage Examples:**

```javascript
// Convert 180 degrees to radians
const piRadians = 180 * AstronomicalData.DEG2RAD; // π

// Convert 90 degrees
const halfPi = 90 * AstronomicalData.DEG2RAD; // π/2

// Convert orbital inclination
const marsInclination = 1.85 * AstronomicalData.DEG2RAD; // 0.0323 radians
```

---

### RAD2DEG

```javascript
RAD2DEG: 180 / Math.PI
```

**Type:** `number` (float)

**Description:** Conversion factor from radians to degrees.

**Value:** Approximately 57.29577951308232

**Usage Examples:**

```javascript
// Convert π radians to degrees
const piDegrees = Math.PI * AstronomicalData.RAD2DEG; // 180°

// Convert radians to degrees
const degrees = Math.PI / 4 * AstronomicalData.RAD2DEG; // 45°

// Convert true anomaly to degrees
const trueAnomalyDeg = 2.5 * AstronomicalData.RAD2DEG; // ~143.24°
```

---

### J2000

```javascript
J2000: new Date('2000-01-01T12:00:00Z')
```

**Type:** `Date` object

**Description:** The J2000 epoch reference date, the standard epoch for astronomical calculations.

**ISO 8601:** 2000-01-01T12:00:00Z

**Julian Date:** 2451545.0

**Usage Examples:**

```javascript
// Get J2000 timestamp
const j2000Time = AstronomicalData.J2000.getTime();

// Calculate days from J2000 to a date
const targetDate = new Date('2024-01-01');
const daysFromJ2000 = (targetDate - AstronomicalData.J2000) / (1000 * 60 * 60 * 24);

// Compare dates
const isAfterJ2000 = AstronomicalData.J2000 < new Date('2024-01-01');
```

**Significance:**
- Standard epoch for celestial coordinate systems
- Reference point for orbital elements
- Used for precession and nutation calculations

---

## Constant Grouping

### Unit Conversion Constants

| Constant  | Value        | From    | To      |
| --------- | ------------ | ------- | ------- |
| `AU`      | 149597870700 | AU      | meters  |
| `DAY`     | 86400        | day     | seconds |
| `DEG2RAD` | π/180        | degrees | radians |
| `RAD2DEG` | 180/π        | radians | degrees |

### Time Reference Constants

| Constant | Value       | Description           |
| -------- | ----------- | --------------------- |
| `J2000`  | Date object | J2000 epoch reference |

---

## Usage Patterns

### Conversion Helper Functions

```javascript
// Convert AU to km
function auToKm(au) {
    return au * AstronomicalData.AU / 1000;
}

// Convert km to AU
function kmToAu(km) {
    return km / AstronomicalData.AU * 1000;
}

// Convert degrees to radians
function degToRad(degrees) {
    return degrees * AstronomicalData.DEG2RAD;
}

// Convert radians to degrees
function radToDeg(radians) {
    return radians * AstronomicalData.RAD2DEG;
}

// Calculate days between dates
function daysBetween(date1, date2) {
    return (date2 - date1) / (AstronomicalData.DAY * 1000);
}
```

### Date Calculations

```javascript
// Get simulation date from J2000
function getSimDate(daysSinceJ2000) {
    return new Date(
        AstronomicalData.J2000.getTime() + 
        daysSinceJ2000 * AstronomicalData.DAY * 1000
    );
}

// Get Julian Date
function getJulianDate(date) {
    const daysFromJ2000 = (date - AstronomicalData.J2000) / (AstronomicalData.DAY * 1000);
    return 2451545.0 + daysFromJ2000;
}
```

---

## See Also

- [API_AstronomicalData](API_AstronomicalData.md) - Full module documentation
- [API_PhysicsEngine](API_PhysicsEngine.md) - Position calculations using these constants
- [API_TimeSystem](API_TimeSystem.md) - Time system using these constants


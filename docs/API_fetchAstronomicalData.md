# fetchAstronomicalData API Reference

Node.js script for fetching and updating astronomical data from NASA APIs. Generates the AstronomicalData.js file with planetary, moon, comet, and asteroid information.

## Overview

```bash
node Scripts/fetchAstronomicalData.js
```

This script:
1. Fetches celestial body data from Open Solar System API
2. Processes and formats the data
3. Generates updated `Engine/AstronomicalData.js`
4. Falls back to static data if API unavailable

## Data Sources

| Source                    | URL                                | Data Provided                            |
| ------------------------- | ---------------------------------- | ---------------------------------------- |
| Open Solar System API     | https://api.le-systeme-solaire.net | Planets, moons, dwarf planets, asteroids |
| NASA Planetary Fact Sheet | -                                  | Reference values                         |
| JPL Small-Body Database   | https://ssd.jpl.nasa.gov           | Comets, asteroids                        |

## Configuration

```javascript
const CONFIG = {
    outputPath: path.join(__dirname, '..', 'Engine', 'AstronomicalData.js'),
    apiBaseUrl: 'https://api.le-systeme-solaire.net/rest/bodies'
};
```

| Setting      | Default                      | Description                |
| ------------ | ---------------------------- | -------------------------- |
| `outputPath` | `Engine/AstronomicalData.js` | Output file path           |
| `apiBaseUrl` | API endpoint                 | Base URL for data fetching |

## Functions

### fetchFromOpenSolarSystemAPI()

Fetches all celestial bodies from the Open Solar System API.

**Syntax:**
```javascript
const bodies = await fetchFromOpenSolarSystemAPI();
```

**Returns:**
```javascript
[
    {
        englishName: "Earth",
        bodyType: "Planet",
        meanRadius: 6371,
        mass: {
            massValue: 5.972,
            massExponent: 24
        },
        semimajorAxis: 149598000000,
        eccentricity: 0.0167,
        inclination: 0,
        siderealOrbit: 31558149.8,
        siderealRotation: 86164.1,
        axialTilt: 23.4,
        aroundPlanet: null,
        aroundStar: { planet: "Sun" },
        // ... more fields
    },
    // ... more bodies
]
```

**Example:**
```javascript
try {
    const bodies = await fetchFromOpenSolarSystemAPI();
    console.log(`Fetched ${bodies.length} celestial bodies`);
} catch (error) {
    console.error('API fetch failed:', error);
}
```

### processBodies()

Processes raw API data into application format.

**Syntax:**
```javascript
const data = processBodies(bodies);
```

**Parameters:**
- `bodies` (Array): Array of raw body objects from API

**Returns:**
```javascript
{
    Sun: { ... },
    Planets: {
        Mercury: { ... },
        Venus: { ... },
        // ...
    },
    Moons: { ... },
    Comets: { ... },
    DwarfPlanets: { ... },
    Asteroids: { ... }
}
```

**Processing Steps:**
1. Categorize by bodyType
2. Extract orbital elements
3. Convert units (km to m, m to AU)
4. Assign colors

**Example:**
```javascript
const rawData = await fetchFromOpenSolarSystemAPI();
const processed = processBodies(rawData);
console.log(`Planets: ${Object.keys(processed.Planets).length}`);
console.log(`Moons: ${Object.keys(processed.Moons).length}`);
```

### processBody()

Processes a single body from API format.

**Syntax:**
```javascript
const item = processBody(body);
```

**Parameters:**
- `body` (Object): Raw body object from API

**Returns:**
```javascript
{
    name: string,
    type: string,
    parent: string | null,
    radius: number | null,
    mass: number | null,
    color: number,
    a: number | null,
    e: number | null,
    i: number | null,
    period: number | null,
    rotation: number | null,
    tilt: number | null
}
```

**Unit Conversions:**
| Property           | API Unit | Output Unit         |
| ------------------ | -------- | ------------------- |
| `radius`           | km       | m (× 1000)          |
| `semimajorAxis`    | m        | AU (÷ 149597870700) |
| `siderealOrbit`    | seconds  | days (÷ 86400)      |
| `siderealRotation` | seconds  | hours (÷ 3600)      |

**Example:**
```javascript
const earthData = {
    englishName: "Earth",
    bodyType: "Planet",
    meanRadius: 6371,
    mass: { massValue: 5.972, massExponent: 24 },
    semimajorAxis: 149598000000,
    eccentricity: 0.0167,
    inclination: 0,
    siderealOrbit: 31558149.8,
    siderealRotation: 86164.1,
    axialTilt: 23.4,
    aroundPlanet: null,
    aroundStar: { planet: "Sun" }
};

const processed = processBody(earthData);
console.log(processed);
// { name: 'Earth', type: 'planet', radius: 6371000, mass: 5.972e+24, ... }
```

### generateAstronomicalData()

Generates the complete AstronomicalData.js file content.

**Syntax:**
```javascript
const output = generateAstronomicalData(data);
```

**Parameters:**
- `data` (Object): Processed body data

**Returns:**
- (string): Complete JavaScript file content

**Output Structure:**
```javascript
/**
 * Astronomical Data - Solar System Parameters
 * Generated from NASA/JPL data sources
 * Run: node Scripts/fetchAstronomicalData.js to update
 */

const AstronomicalData = {
    AU: 149597870700,
    DAY: 86400,
    DEG2RAD: Math.PI / 180,
    RAD2DEG: 180 / Math.PI,
    J2000: new Date('2000-01-01T12:00:00Z'),

    Sun: { ... },

    Planets: { ... },

    Moons: { ... },

    Comets: { ... },

    Meteors: { ... },

    getAllBodies: function() { ... },

    getMoonsForPlanet: function(planetName) { ... },

    getUnconfirmedMoonsForPlanet: function(planetName) { ... }
};

if (typeof window !== 'undefined') window.AstronomicalData = AstronomicalData;
```

**Example:**
```javascript
const processed = processBodies(await fetchFromOpenSolarSystemAPI());
const fileContent = generateAstronomicalData(processed);
fs.writeFileSync('Engine/AstronomicalData.js', fileContent);
```

### generateStaticData()

Generates fallback static data when API is unavailable.

**Syntax:**
```javascript
const staticData = generateStaticData();
```

**Returns:**
```javascript
{
    Planets: {
        Mercury: { ... },
        Venus: { ... },
        Earth: { ... },
        Mars: { ... },
        Jupiter: { ... },
        Saturn: { ... },
        Uranus: { ... },
        Neptune: { ... }
    },
    Moons: {
        Moon: { ... },
        Phobos: { ... },
        // ... all major moons
    },
    Comets: {
        Halley: { ... },
        HaleBopp: { ... },
        // ... all comets
    }
}
```

**Usage:**
```javascript
try {
    const bodies = await fetchFromOpenSolarSystemAPI();
    return processBodies(bodies);
} catch (error) {
    console.log('Using static fallback data...');
    return generateStaticData();
}
```

## Body Type Mapping

Maps API bodyType values to internal types:

| API bodyType   | Internal type  |
| -------------- | -------------- |
| 'Star'         | 'star'         |
| 'Planet'       | 'planet'       |
| 'Dwarf Planet' | 'dwarf_planet' |
| 'Moon'         | 'moon'         |
| 'Comet'        | 'comet'        |
| 'Asteroid'     | 'asteroid'     |

## Usage

### Basic Execution

```bash
# Navigate to project directory
cd /path/to/cosmos-simulation

# Run the script
node Scripts/fetchAstronomicalData.js
```

### Expected Output

```
🌌 NASA Astronomical Data Generator

📡 Fetching from Open Solar System API...
✅ Retrieved 150 celestial bodies
✅ Generated: Engine/AstronomicalData.js
📊 File size: 45.32 KB

📋 Data Summary:
   - Planets: 8
   - Moons: 146
   - Comets: 5

🔗 Data Sources:
   - Open Solar System API (api.le-systeme-solaire.net)
   - NASA Planetary Fact Sheet
   - JPL Small-Body Database
```

### With API Failure

If the API is unavailable:

```
🌌 NASA Astronomical Data Generator

📡 Fetching from Open Solar System API...
⚠️  API fetch failed: getaddrinfo ENOTFOUND api.le-systeme-solaire.net
📦 Using static fallback data...
✅ Generated: Engine/AstronomicalData.js
📊 File size: 32.15 KB

📋 Data Summary:
   - Planets: 8
   - Moons: 20
   - Comets: 5
```

## Integration

### As a Module

```javascript
const { fetchFromOpenSolarSystemAPI, processBodies, generateAstronomicalData } = require('./fetchAstronomicalData');

async function updateData() {
    const bodies = await fetchFromOpenSolarSystemAPI();
    const data = processBodies(bodies);
    const output = generateAstronomicalData(data);
    return output;
}
```

### Cron Job Setup

Add to package.json for scheduled updates:

```json
{
    "scripts": {
        "update-data": "node Scripts/fetchAstronomicalData.js",
        "update-data:daily": "0 0 * * * node /path/to/Scripts/fetchAstronomicalData.js"
    }
}
```

### CI/CD Integration

```yaml
# .github/workflows/update-data.yml
name: Update Astronomical Data

on:
  schedule:
    - cron: '0 0 1 * *'  # Monthly on the 1st
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Fetch updated data
        run: node Scripts/fetchAstronomicalData.js
      - name: Commit changes
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add -A
          git diff --quiet || git commit -m "Update astronomical data"
          git push
```

## API Response Format

### Open Solar System API Response

```json
{
    "bodies": [
        {
            "id": "sun",
            "name": "Sun",
            "englishName": "Sun",
            "isPlanet": false,
            "bodyType": "Star",
            "mass": {
                "massValue": 1.989,
                "massExponent": 30
            },
            "meanRadius": 696340,
            "semimajorAxis": 0,
            "eccentricity": 0,
            "inclination": 0,
            "aroundPlanet": null,
            "aroundStar": null
        },
        {
            "id": "earth",
            "name": "Earth",
            "englishName": "Earth",
            "isPlanet": true,
            "bodyType": "Planet",
            "mass": {
                "massValue": 5.972,
                "massExponent": 24
            },
            "meanRadius": 6371,
            "semimajorAxis": 149598000000,
            "eccentricity": 0.0167,
            "inclination": 0,
            "siderealOrbit": 31558149.8,
            "siderealRotation": 86164.1,
            "axialTilt": 23.4,
            "aroundPlanet": null,
            "aroundStar": {
                "planet": "Sun"
            }
        }
    ]
}
```

## Data Quality Notes

### API Limitations

1. **Color values**: API doesn't provide visual colors; these are assigned based on visual appearance
2. **Some moons**: May be missing for gas giants (API has 146+ moons)
3. **Asteroid data**: Limited to larger/better-known asteroids
4. **Comet data**: Limited; comets frequently updated

### Recommendations

- Run script monthly for updated data
- Verify new data before production deployment
- Consider pinning to specific API version

## Troubleshooting

### API Not Responding

```bash
# Test API connectivity
curl https://api.le-systeme-solaire.net/rest/bodies?format=json
```

### Large File Size

If AstronomicalData.js becomes too large:
- Filter to only major bodies
- Use pagination
- Cache results locally

### Missing Bodies

Check API response:
```javascript
const response = await fetch(CONFIG.apiBaseUrl);
const data = await response.json();
console.log('Body types:', data.bodies.map(b => b.bodyType));
```

## See Also

- [Open Solar System API Documentation](https://api.le-systeme-solaire.net)
- [NASA Planetary Fact Sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/)
- [JPL Small-Body Database](https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html)
- [AstronomicalData](API_AstronomicalData.md) - Generated data reference


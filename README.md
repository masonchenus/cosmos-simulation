# Cosmos Simulation API Documentation

A 3D solar system simulation built with Three.js featuring accurate orbital mechanics, time management, and celestial body data from NASA sources.

## Project Overview

Cosmos Simulation is a web-based solar system visualization that provides:
- **Accurate Orbital Mechanics**: Keplerian physics with J2000 epoch reference
- **Time Control**: Flexible time scales from real-time to 1000 years per second
- **Interactive 3D View**: Navigate and explore the solar system
- **NASA Data Integration**: Astronomical data sourced from NASA/JPL databases

## Architecture

```
cosmos-simulation/
├── Engine/                    # Core simulation modules
│   ├── AstronomicalData.js   # Solar system celestial body data
│   ├── PhysicsEngine.js      # Orbital mechanics calculations
│   ├── TimeSystem.js         # Time management system
│   └── Renderer/             # Rendering modules
├── Resources/
│   ├── Assets/
│   │   ├── js/              # Client-side JavaScript
│   │   ├── css/             # Stylesheets
│   │   └── images/          # Assets
├── Scripts/
│   └── fetchAstronomicalData.js  # NASA API data fetcher
├── docs/                     # API Documentation
└── index.html                # Main application
```

## Quick Start

### Using the API

```javascript
// Access astronomical data
const planets = AstronomicalData.Planets;
const sun = AstronomicalData.Sun;

// Calculate planet position
const position = PhysicsEngine.getPosition('Earth', daysSinceJ2000);

// Manage simulation time
TimeSystem.setDate(new Date());
TimeSystem.setTimeScale(86400); // 1 day per second
TimeSystem.play();

// Render the scene
WebGLRenderer.init(container);
WebGLRenderer.start();
```

### Running the Application

```bash
# Open in browser
open index.html

# Update astronomical data from NASA APIs
node Scripts/fetchAstronomicalData.js
```

## API Modules

| Module                                                | Description             | Key Features                                     |
| ----------------------------------------------------- | ----------------------- | ------------------------------------------------ |
| [AstronomicalData](docs/API_AstronomicalData.md)           | Solar system parameters | 8 planets, 20 moons, 5 comets, 6 meteor showers  |
| [PhysicsEngine](docs/API_PhysicsEngine.md)                 | Orbital mechanics       | Kepler equations, position/velocity calculations |
| [TimeSystem](docs/API_TimeSystem.md)                       | Time management         | Julian dates, time scales, date formatting       |
| [WebGLRenderer](docs/API_WebGLRenderer.md)                 | 3D visualization        | Three.js rendering, labels, orbits               |
| [fetchAstronomicalData](docs/API_fetchAstronomicalData.md) | Data fetching           | NASA API integration, static fallback data       |

## Celestial Bodies Coverage

### Planets (8)
Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune

### Moons (20+)
Moon, Phobos, Deimos, Io, Europa, Ganymede, Callisto, Titan, Rhea, Iapetus, Dione, Tethys, Enceladus, Mimas, Miranda, Ariel, Umbriel, Titania, Oberon, Triton

### Comets (5)
Halley's Comet, Comet Hale-Bopp, Comet Encke, Comet Swift-Tuttle, Comet Tempel-Tuttle

### Meteor Showers (6)
Perseids, Leonids, Quadrantids, Geminids, Orionids, Eta Aquariids

## Data Sources

- **Open Solar System API**: https://api.le-systeme-solaire.net
- **NASA Planetary Fact Sheet**
- **JPL Small-Body Database**: https://ssd.jpl.nasa.gov

## Configuration

See [CONFIG.md](docs/CONFIG.md) for detailed configuration options.

## Usage Examples

See [USAGE.md](docs/USAGE.md) for comprehensive usage examples and integration patterns.

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

Requires WebGL support.

## License

MIT License

## Reach Out to Me

If you have any questions, suggestions, or just want to connect, feel free to reach out:

- **Email**: masonchenus@gmail.com
- **GitHub**: @mason666777


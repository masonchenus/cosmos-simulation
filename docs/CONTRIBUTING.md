# Contributing to Cosmos Simulation

Thank you for your interest in contributing to Cosmos Simulation! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Contributing to Cosmos Simulation](#contributing-to-cosmos-simulation)
  - [Table of Contents](#table-of-contents)
  - [Code of Conduct](#code-of-conduct)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Clone the Repository](#clone-the-repository)
  - [Development Environment](#development-environment)
    - [Running the Application](#running-the-application)
    - [Project Structure](#project-structure)
  - [Coding Standards](#coding-standards)
    - [JavaScript Style Guide](#javascript-style-guide)
    - [Example](#example)
    - [Comments and Documentation](#comments-and-documentation)
    - [CSS Style Guide](#css-style-guide)
  - [Development Workflow](#development-workflow)
    - [Git Branching Strategy](#git-branching-strategy)
    - [Making Changes](#making-changes)
    - [Commit Message Format](#commit-message-format)
  - [Testing](#testing)
    - [Running Tests](#running-tests)
    - [Writing Tests](#writing-tests)
  - [Documentation](#documentation)
    - [Updating Documentation](#updating-documentation)
    - [Documentation Files](#documentation-files)
  - [Reporting Issues](#reporting-issues)
    - [Before Submitting](#before-submitting)
    - [Issue Template](#issue-template)
  - [Security Vulnerabilities](#security-vulnerabilities)
  - [Pull Request Process](#pull-request-process)
    - [PR Review Criteria](#pr-review-criteria)
  - [Community](#community)
    - [Getting Help](#getting-help)
    - [Contributing Areas](#contributing-areas)
  - [Recognition](#recognition)

## Code of Conduct

This project adheres to the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to masonchenus@gmail.com.

## Getting Started

### Prerequisites

Before contributing, ensure you have the following installed:

- **Node.js** (version 14 or higher) - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **Modern web browser** (Chrome, Firefox, Safari, or Edge)

### Clone the Repository

```bash
# Clone the repository
git clone https://github.com/mason666777/cosmos-simulation.git
cd cosmos-simulation

# Install dependencies
npm install
```

## Development Environment

### Running the Application

```bash
# Start development server
npm run dev

# Or using the start script
npm start
```

The application will be available at `http://localhost:8080`

### Project Structure

```
cosmos-simulation/
├── Engine/                    # Core simulation modules
│   ├── AstronomicalData.js   # Solar system celestial body data
│   ├── PhysicsEngine.js      # Orbital mechanics calculations
│   ├── TimeSystem.js         # Time management system
│   └── Renderer/             # Rendering modules
│       └── WebGLRenderer.js  # Three.js WebGL renderer
├── Resources/
│   ├── Assets/
│   │   ├── js/              # Client-side JavaScript libraries
│   │   ├── css/             # Stylesheets
│   │   └── images/          # Assets and logos
├── Scripts/
│   └── fetchAstronomicalData.js  # NASA API data fetcher
├── docs/                     # API Documentation and guides
├── src/                      # Source files
└── index.html                # Main application entry point
```

## Coding Standards

### JavaScript Style Guide

- Use **ES6+** features (const, let, arrow functions, template literals)
- Follow **Airbnb JavaScript Style Guide** principles
- Use **semicolons** for statement termination
- Use **2 spaces** for indentation
- Maximum line length: **100 characters**
- Use **camelCase** for variables and functions
- Use **PascalCase** for classes and constructor functions
- Use **UPPER_SNAKE_CASE** for constants

### Example

```javascript
// Good
const PLANET_COUNT = 8;
const getOrbitalPeriod = (semiMajorAxis) => {
    return Math.pow(semiMajorAxis, 1.5);
};

class CelestialBody {
    constructor(name, mass) {
        this.name = name;
        this.mass = mass;
    }
}
```

### Comments and Documentation

- Use **JSDoc** comments for all public functions and classes
- Comment complex algorithms and physics calculations
- Include parameter types and return values in JSDoc
- Example:

```javascript
/**
 * Calculates the position of a planet at a given time
 * @param {string} planetName - Name of the planet
 * @param {number} daysSinceJ2000 - Days since J2000 epoch
 * @returns {Object} Position {x, y, z} in astronomical units
 */
function getPosition(planetName, daysSinceJ2000) {
    // Implementation
}
```

### CSS Style Guide

- Use **BEM** naming methodology for CSS classes
- Use **2 spaces** for indentation
- Group related properties together
- Use CSS variables for theming
- Example:

```css
/* Good */
.planet__label {
    position: absolute;
    color: var(--text-color);
    font-size: 14px;
    transform: translate(-50%, -50%);
}

.planet__label--selected {
    font-weight: bold;
    color: var(--highlight-color);
}
```

## Development Workflow

### Git Branching Strategy

- **main** - Production-ready code
- **develop** - Integration branch for features
- **feature/** - Feature branches (e.g., feature/add-new-planets)
- **bugfix/** - Bug fix branches (e.g., bugfix/fix-orbital-calculation)
- **hotfix/** - Urgent production fixes

### Making Changes

```bash
# 1. Create a new branch
git checkout -b feature/your-feature-name

# 2. Make your changes
# 3. Add modified files
git add .

# 4. Commit with a descriptive message
git commit -m "Add: Description of your changes"

# 5. Push to your branch
git push origin feature/your-feature-name

# 6. Create a Pull Request
```

### Commit Message Format

Follow the **Conventional Commits** specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Formatting, missing semicolons, etc.
- `refactor` - Code restructuring without behavior change
- `test` - Adding or modifying tests
- `chore` - Maintenance tasks

**Examples:**

```
feat(physics): add lunar position calculation
fix(renderer): resolve WebGL context loss on mobile
docs(readme): update installation instructions
test(engine): add unit tests for Kepler's equation
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- test/astronomicalData.test.js
```

### Writing Tests

- Write tests for all new functionality
- Follow the AAA pattern (Arrange, Act, Assert)
- Use descriptive test names
- Aim for meaningful coverage

Example test structure:

```javascript
describe('PhysicsEngine', () => {
    describe('getPosition', () => {
        it('should calculate Earth position correctly', () => {
            // Arrange
            const daysSinceJ2000 = 0; // J2000 epoch
            const expectedPosition = { x: 1.0, y: 0, z: 0 };
            
            // Act
            const position = PhysicsEngine.getPosition('Earth', daysSinceJ2000);
            
            // Assert
            expect(position).toBeCloseTo(expectedPosition, 2);
        });
    });
});
```

## Documentation

### Updating Documentation

- Update relevant docs when adding features
- Use clear, concise language
- Include code examples where appropriate
- Keep API documentation in sync with code

### Documentation Files

- **README.md** - Project overview and quick start
- **docs/** - Detailed API documentation
- **docs/API_*.md** - Module-specific documentation
- **docs/INSTALLATION.md** - Installation instructions

## Reporting Issues

### Before Submitting

1. Search existing issues to avoid duplicates
2. Check if the issue exists in the latest version
3. Reproduce the issue with minimal steps

### Issue Template

```markdown
## Bug Description
Describe the bug clearly

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., macOS 11.0]
- Browser: [e.g., Chrome 90]
- Version: [e.g., 1.0.0]

## Additional Context
Screenshots, error logs, etc.
```

## Security Vulnerabilities

For security vulnerabilities, please email masonchenus@gmail.com directly instead of opening a public issue.

## Pull Request Process

1. **Fork** the repository
2. **Create** a feature branch from `develop`
3. **Make** your changes following coding standards
4. **Test** your changes thoroughly
5. **Update** documentation as needed
6. **Submit** a Pull Request with:
   - Clear title and description
   - Link to related issues
   - Screenshots for UI changes
   - Notes on breaking changes

### PR Review Criteria

- Code follows style guidelines
- Tests pass and coverage is maintained
- Documentation is updated
- No merge conflicts
- Changes are focused and atomic

## Community

### Getting Help

- Check the [documentation](docs/)
- Search existing [issues](https://github.com/mason666777/cosmos-simulation/issues)
- Email: masonchenus@gmail.com

### Contributing Areas

- 🐛 **Bug fixes** - Help resolve issues
- ✨ **New features** - Add astronomical data or visualization features
- 📝 **Documentation** - Improve guides and API docs
- 🌐 **Internationalization** - Add new language translations
- 🎨 **UI/UX** - Improve user experience
- ⚡ **Performance** - Optimize rendering and calculations

## Recognition

Contributors will be recognized in the project's acknowledgments. Thank you for your contributions!

---

**Questions?** Reach out to masonchenus@gmail.com


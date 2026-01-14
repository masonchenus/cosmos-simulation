# Installation Guide

This document provides detailed instructions for installing and setting up Cosmos Simulation on your local machine.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Platform-Specific Setup](#platform-specific-setup)
- [Installation Methods](#installation-methods)
- [Verifying Installation](#verifying-installation)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements

| Component   | Minimum                 | Recommended    |
| ----------- | ----------------------- | -------------- |
| **OS**      | macOS 10.14+            | macOS 12+      |
| **Node.js** | v14.0.0+                | v18.0.0+       |
| **RAM**     | 4GB                     | 8GB+           |
| **Storage** | 500MB free              | 1GB free       |
| **Browser** | Chrome 80+, Firefox 75+ | Latest version |

### Required Software

1. **Node.js** - JavaScript runtime
   - Download from: https://nodejs.org/
   - Recommended: Use nvm for version management

2. **Git** - Version control
   - Download from: [https://git-scm.com/]
   - Or install via Homebrew: `brew install git`

3. **Code Editor** (recommended)
   - VS Code: [https://code.visualstudio.com/]
   - WebStorm: [https://www.jetbrains.com/webstorm/]

## Platform-Specific Setup

### macOS

#### Using Homebrew

```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Install Git
brew install git

# Verify installations
node --version
npm --version
git --version
```

#### Using nvm (Recommended)

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal or source profile
source ~/.zshrc

# Install and use Node.js 18
nvm install 18
nvm use 18

# Verify
node --version  # Should show v18.x.x
npm --version   # Should show 9.x.x
```

### Windows

#### Using Chocolatey

```powershell
# Install Chocolatey if not installed
Set-ExecutionPolicy Bypass -Scope Process -Force
iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install Node.js and Git
choco install nodejs-lts git

# Restart terminal
```

#### Manual Installation

1. Download Node.js from https://nodejs.org/ (LTS version)
2. Download Git from https://git-scm.com/
3. Run installers with default settings
4. Restart command prompt

### Linux (Ubuntu/Debian)

```bash
# Update package index
sudo apt update

# Install Node.js
sudo apt install nodejs npm

# Or use NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Git
sudo apt install git

# Verify
node --version
npm --version
git --version
```

## Installation Methods

### Method 1: Clone Repository (Recommended)

```bash
# Clone the repository
git clone https://github.com/mason666777/cosmos-simulation.git
cd cosmos-simulation

# Install dependencies
npm install

# Start development server
npm run dev
```

### Method 2: Download Release

1. Visit the [Releases page](https://github.com/mason666777/cosmos-simulation/releases)
2. Download the latest release archive
3. Extract to desired location
4. Open extracted folder in terminal
5. Run: `npm install && npm run dev`

### Method 3: NPM Package

```bash
# Install globally
npm install -g cosmos-simulation

# Run
cosmos-simulation
```

## Project Structure

```
cosmos-simulation/
├── Engine/                    # Core engine modules
│   ├── AstronomicalData.js   # Celestial body data
│   ├── PhysicsEngine.js      # Orbital calculations
│   ├── TimeSystem.js         # Time management
│   └── Renderer/             # Rendering modules
│       └── WebGLRenderer.js
├── Resources/                # Assets and static files
│   ├── Assets/
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
├── docs/                     # Documentation
├── src/                      # Source files
├── index.html               # Main HTML file
├── package.json             # NPM configuration
└── README.md               # Project README
```

## Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm install`     | Install dependencies     |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm test`        | Run tests                |
| `npm run lint`    | Run ESLint               |

## Verifying Installation

### 1. Check Dependencies

```bash
# Verify Node.js version
node --version  # Should be v14+

# Verify npm version
npm --version   # Should be v6+

# Verify Git version
git --version   # Should be v2+
```

### 2. Run Development Server

```bash
npm run dev
```

Expected output:
```
VITE v4.x.x  ready in 300 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 3. Access Application

1. Open browser to `http://localhost:5173/`
2. You should see the Cosmos Simulation interface
3. Verify 3D visualization loads
4. Check browser console for errors

### 4. Run Tests (Optional)

```bash
npm test
```

Expected: All tests pass

## Troubleshooting

### Common Issues

#### Issue: npm install fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules

# Reinstall
npm install
```

#### Issue: Port already in use

**Solution:**
```bash
# Find process using port
lsof -i :5173

# Kill the process
kill <PID>

# Or use different port
npm run dev -- --port 3000
```

#### Issue: Node version mismatch

**Solution:**
```bash
# Check required version in package.json
cat package.json | grep node

# Use nvm to switch versions
nvm install 18
nvm use 18
```

#### Issue: WebGL not available

**Solution:**
1. Update browser to latest version
2. Enable hardware acceleration
3. Check GPU is not disabled

#### Issue: Slow performance

**Solutions:**
- Close unnecessary applications
- Use Chrome DevTools Performance tab
- Reduce visual quality settings

### Getting Help

If you encounter issues not covered here:

- **GitHub Issues**: [Report a bug](https://github.com/mason666777/cosmos-simulation/issues)
- **Email**: masonchenus@gmail.com
- **Check**: [Common Issues](common-issues.md)

## Development Setup

### Recommended VS Code Extensions

- ESLint
- Prettier
- Live Server
- GitLens
- Three.js Snippets

### Environment Variables

Create `.env` file for custom configuration:

```bash
# .env
PUBLIC_API_URL=https://api.le-systeme-solaire.net
PUBLIC_APP_TITLE=Cosmos Simulation
NODE_ENV=development
```

## Next Steps

After successful installation:

1. Read the [Usage Guide](USAGE.md)
2. Explore the [API Documentation](API_Architecture.md)
3. Check [Configuration Options](CONFIG.md)
4. Start contributing!



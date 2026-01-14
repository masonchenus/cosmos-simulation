# Components API Reference

UI component documentation for the Cosmos Simulation interface.

## Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    COSMOS SIMULATION UI                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                        HEADER                             │  │
│  │  ┌─────────┐  Solar System Simulation    ┌─────────────┐  │  │
│  │  │  ☰ Menu │                               │ ⚙ Settings │  │  │
│  │  └─────────┘                               └─────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                      DATE DISPLAY                         │  │
│  │            2024-06-15  14:30:00  UTC                      │  │
│  │            Moon Phase: 🌗 First Quarter                   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                        CANVAS                             │  │
│  │                                                           │  │
│  │         [           Three.js Scene            ]           │  │
│  │         [                                       ]           │  │
│  │         [      Sun ●                          ]           │  │
│  │         [           │                         ]           │  │
│  │         [    Earth ◯─────────────────────     ]           │  │
│  │         [              Mars ●                ]           │  │
│  │         [                                       ]           │  │
│  │         [           (Orbit Controls)          ]           │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                      INFO PANEL                           │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  🌍 Earth                                           │  │  │
│  │  │  ─────────────────────────────────────────────────  │  │  │
│  │  │  Type:         Planet                               │  │  │
│  │  │  Radius:       6,371,000 m                          │  │  │
│  │  │  Mass:         5.97 × 10²⁴ kg                       │  │  │
│  │  │  Period:       365.25 days                          │  │  │
│  │  │  Moons:        1 (Moon)                             │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    TIME CONTROLS                          │  │
│  │  ┌──────┐ ┌──────────┐ ┌────────────────────────────┐    │  │
│  │  │  ◀   │ │  ▶ / ❚❚  │ │  1 day/sec ▾             │    │  │
│  │  │ Back │ │ Play/Pause│ │  Time Speed               │    │  │
│  │  └──────┘ └──────────┘ └────────────────────────────┘    │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                      TOGGLES                             │  │
│  │  [✓] Show Orbits  [ ] Show Labels  [ ] Show Asteroids   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Component Structure

### HTML Layout

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solar System Simulation</title>
    <link rel="stylesheet" href="Resources/Assets/css/styles.css">
</head>
<body>
    <div id="app-container">
        <header id="app-header">...</header>
        <main id="main-content">
            <div id="canvas-container"></div>
            <div id="info-panel" class="hidden">...</div>
        </main>
        <footer id="time-controls">...</footer>
        <aside id="toggles">...</aside>
    </div>
</body>
</html>
```

---

## Info Panel Component

### Structure

```html
<div id="info-panel" class="hidden">
    <div class="panel-header">
        <h3 id="body-name">Body Name</h3>
        <button id="close-panel" class="close-btn">×</button>
    </div>
    <div id="body-info" class="panel-content">
        <!-- Dynamic content -->
    </div>
</div>
```

### CSS Styles

```css
#info-panel {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 280px;
    background: rgba(10, 15, 30, 0.9);
    border: 1px solid rgba(100, 150, 255, 0.3);
    border-radius: 8px;
    padding: 15px;
    color: #fff;
    font-family: 'Arial', sans-serif;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s, transform 0.3s;
}

#info-panel.hidden {
    opacity: 0;
    transform: translateX(20px);
    pointer-events: none;
}

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(100, 150, 255, 0.3);
    padding-bottom: 10px;
    margin-bottom: 10px;
}

#body-name {
    margin: 0;
    font-size: 18px;
    color: #88AAFF;
}

.close-btn {
    background: none;
    border: none;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    line-height: 1;
}

.panel-content {
    font-size: 14px;
}

.panel-content .label {
    color: #88AAFF;
    font-weight: bold;
}

.panel-content .value {
    color: #fff;
}
```

### JavaScript Interface

```javascript
const InfoPanel = {
    /**
     * Show the info panel
     */
    show: function() {
        document.getElementById('info-panel').classList.remove('hidden');
    },
    
    /**
     * Hide the info panel
     */
    hide: function() {
        document.getElementById('info-panel').classList.add('hidden');
    },
    
    /**
     * Update panel with body data
     * @param {string} bodyName - Name of the celestial body
     */
    update: function(bodyName) {
        const body = AstronomicalData.getAllBodies()[bodyName];
        if (!body) return;
        
        document.getElementById('body-name').textContent = body.name;
        
        const infoHtml = this.formatBodyInfo(body);
        document.getElementById('body-info').innerHTML = infoHtml;
        
        this.show();
    },
    
    /**
     * Format body information as HTML
     */
    formatBodyInfo: function(body) {
        return `
            <p><span class="label">Type:</span> <span class="value">${body.type}</span></p>
            <p><span class="label">Radius:</span> <span class="value">${this.formatNumber(body.radius)} m</span></p>
            ${body.mass ? `<p><span class="label">Mass:</span> <span class="value">${this.formatScientific(body.mass)} kg</span></p>` : ''}
            ${body.period ? `<p><span class="label">Period:</span> <span class="value">${body.period.toFixed(1)} days</span></p>` : ''}
            ${body.rotation ? `<p><span class="label">Rotation:</span> <span class="value">${body.rotation} hours</span></p>` : ''}
            ${body.tilt ? `<p><span class="label">Tilt:</span> <span class="value">${body.tilt}°</span></p>` : ''}
        `;
    },
    
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    
    formatScientific: function(num) {
        const exp = Math.floor(Math.log10(num));
        const mantissa = num / Math.pow(10, exp);
        return `${mantissa.toFixed(2)} × 10^${exp}`;
    }
};
```

---

## Time Controls Component

### Structure

```html
<div id="time-controls">
    <div class="date-display">
        <span id="current-date">2024-01-01</span>
        <span id="current-time">12:00:00</span>
    </div>
    
    <div class="playback-controls">
        <button id="jump-backward" class="control-btn" title="Jump Backward">
            ⏮
        </button>
        <button id="play-pause" class="control-btn" title="Play/Pause">
            ▶
        </button>
        <button id="jump-forward" class="control-btn" title="Jump Forward">
            ⏭
        </button>
        <button id="reset-time" class="control-btn" title="Reset">
            ⏹
        </button>
    </div>
    
    <div class="time-scale">
        <label for="time-scale-select">Speed:</label>
        <select id="time-scale-select">
            <option value="0">Paused</option>
            <option value="1">Real-time</option>
            <option value="60">1 min/sec</option>
            <option value="3600">1 hour/sec</option>
            <option value="86400" selected>1 day/sec</option>
            <option value="604800">1 week/sec</option>
            <option value="31536000">1 year/sec</option>
        </select>
    </div>
</div>
```

### CSS Styles

```css
#time-controls {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 20px;
    background: rgba(10, 15, 30, 0.9);
    padding: 15px 25px;
    border-radius: 30px;
    border: 1px solid rgba(100, 150, 255, 0.3);
    backdrop-filter: blur(10px);
}

.date-display {
    font-family: 'Courier New', monospace;
    font-size: 14px;
    color: #88AAFF;
    text-align: center;
}

.playback-controls {
    display: flex;
    gap: 10px;
}

.control-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid rgba(100, 150, 255, 0.5);
    background: rgba(30, 40, 80, 0.8);
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s;
}

.control-btn:hover {
    background: rgba(50, 70, 120, 1);
    border-color: rgba(100, 150, 255, 0.8);
}

.control-btn:active {
    transform: scale(0.95);
}

.time-scale {
    display: flex;
    align-items: center;
    gap: 8px;
}

.time-scale label {
    color: #88AAFF;
    font-size: 12px;
}

.time-scale select {
    background: rgba(30, 40, 80, 0.8);
    border: 1px solid rgba(100, 150, 255, 0.5);
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}
```

### JavaScript Interface

```javascript
const TimeControls = {
    /**
     * Initialize time controls
     */
    init: function() {
        // Bind event listeners
        document.getElementById('play-pause').addEventListener('click', () => {
            this.togglePlay();
        });
        
        document.getElementById('reset-time').addEventListener('click', () => {
            this.reset();
        });
        
        document.getElementById('jump-backward').addEventListener('click', () => {
            this.jump(-1);
        });
        
        document.getElementById('jump-forward').addEventListener('click', () => {
            this.jump(1);
        });
        
        document.getElementById('time-scale-select').addEventListener('change', (e) => {
            TimeSystem.setTimeScale(parseFloat(e.target.value));
        });
    },
    
    /**
     * Toggle play/pause
     */
    togglePlay: function() {
        const isPlaying = TimeSystem.togglePlay();
        this.updatePlayButton(isPlaying);
    },
    
    /**
     * Update play button icon
     */
    updatePlayButton: function(isPlaying) {
        const btn = document.getElementById('play-pause');
        btn.textContent = isPlaying ? '❚❚' : '▶';
    },
    
    /**
     * Reset time to J2000
     */
    reset: function() {
        TimeSystem.reset();
        this.updateDisplay();
    },
    
    /**
     * Jump time forward or backward
     */
    jump: function(direction) {
        const amount = direction * 7; // 7 days
        if (direction > 0) {
            TimeSystem.jumpForward(amount, 'days');
        } else {
            TimeSystem.jumpBackward(amount, 'days');
        }
        this.updateDisplay();
    },
    
    /**
     * Update time display
     */
    updateDisplay: function() {
        document.getElementById('current-date').textContent = TimeSystem.formatDate();
        document.getElementById('current-time').textContent = TimeSystem.formatDateTime().split(' ')[1];
    }
};
```

---

## Toggle Controls Component

### Structure

```html
<div id="toggles">
    <label class="toggle-label">
        <input type="checkbox" id="toggle-orbits">
        <span class="toggle-text">Show Orbits</span>
    </label>
    
    <label class="toggle-label">
        <input type="checkbox" id="toggle-labels">
        <span class="toggle-text">Show Labels</span>
    </label>
    
    <label class="toggle-label">
        <input type="checkbox" id="toggle-asteroids">
        <span class="toggle-text">Show Asteroids</span>
    </label>
    
    <label class="toggle-label">
        <input type="checkbox" id="toggle-moons" checked>
        <span class="toggle-text">Show Moons</span>
    </label>
</div>
```

### CSS Styles

```css
#toggles {
    position: fixed;
    bottom: 100px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: rgba(10, 15, 30, 0.9);
    padding: 15px;
    border-radius: 10px;
    border: 1px solid rgba(100, 150, 255, 0.3);
}

.toggle-label {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    color: #fff;
    font-size: 14px;
}

.toggle-label input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #88AAFF;
}

.toggle-text {
    color: #88AAFF;
}
```

### JavaScript Interface

```javascript
const ToggleControls = {
    /**
     * Initialize toggle controls
     */
    init: function() {
        document.getElementById('toggle-orbits').addEventListener('change', (e) => {
            WebGLRenderer.toggleOrbits(e.target.checked);
        });
        
        document.getElementById('toggle-labels').addEventListener('change', (e) => {
            WebGLRenderer.toggleLabels(e.target.checked);
        });
        
        document.getElementById('toggle-asteroids').addEventListener('change', (e) => {
            WebGLRenderer.toggleAsteroids(e.target.checked);
        });
        
        document.getElementById('toggle-moons').addEventListener('change', (e) => {
            WebGLRenderer.toggleMoons(e.target.checked);
        });
    },
    
    /**
     * Get all toggle states
     */
    getStates: function() {
        return {
            orbits: document.getElementById('toggle-orbits').checked,
            labels: document.getElementById('toggle-labels').checked,
            asteroids: document.getElementById('toggle-asteroids').checked,
            moons: document.getElementById('toggle-moons').checked
        };
    }
};
```

---

## Label Component

### Structure

```html
<div class="body-label" id="label-Earth" style="display: none;">
    <span class="label-text">Earth</span>
</div>
```

### CSS Styles

```css
.body-label {
    position: absolute;
    color: #88AAFF;
    font-size: 14px;
    font-family: 'Arial', sans-serif;
    text-shadow: 0 0 5px #000;
    pointer-events: none;
    user-select: none;
    white-space: nowrap;
}

.label-text {
    background: rgba(0, 0, 0, 0.5);
    padding: 2px 6px;
    border-radius: 3px;
}
```

### JavaScript Interface

```javascript
const LabelManager = {
    labels: {},
    
    /**
     * Create a label for a body
     */
    create: function(bodyName, offset = { x: 0, y: 1, z: 0 }) {
        const label = document.createElement('div');
        label.className = 'body-label';
        label.innerHTML = `<span class="label-text">${bodyName}</span>`;
        document.body.appendChild(label);
        
        this.labels[bodyName] = {
            element: label,
            offset: offset
        };
        
        return label;
    },
    
    /**
     * Update label positions based on 3D positions
     */
    update: function() {
        for (const [bodyName, labelData] of Object.entries(this.labels)) {
            const body = WebGLRenderer.bodies[bodyName];
            if (!body) continue;
            
            // Get 3D position
            const pos = body.position.clone();
            pos.y += labelData.offset.y;
            
            // Project to 2D
            pos.project(WebGLRenderer.camera);
            
            // Convert to screen coordinates
            const x = (pos.x * 0.5 + 0.5) * window.innerWidth;
            const y = (-(pos.y * 0.5) + 0.5) * window.innerHeight;
            
            // Hide if behind camera
            if (pos.z > 1) {
                labelData.element.style.display = 'none';
            } else {
                labelData.element.style.display = WebGLRenderer.settings.showLabels ? 'block' : 'none';
                labelData.element.style.left = x + 'px';
                labelData.element.style.top = y + 'px';
            }
        }
    },
    
    /**
     * Show/hide all labels
     */
    setVisible: function(visible) {
        for (const labelData of Object.values(this.labels)) {
            labelData.element.style.display = visible ? 'block' : 'none';
        }
    }
};
```

---

## Loading Screen Component

### Structure

```html
<div id="loading-screen">
    <div class="loading-content">
        <div class="loading-spinner"></div>
        <p class="loading-text">Initializing Solar System...</p>
        <p class="loading-progress">0%</p>
    </div>
</div>
```

### CSS Styles

```css
#loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s;
}

#loading-screen.hidden {
    opacity: 0;
    pointer-events: none;
}

.loading-content {
    text-align: center;
}

.loading-spinner {
    width: 60px;
    height: 60px;
    border: 3px solid rgba(136, 170, 255, 0.2);
    border-top-color: #88AAFF;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.loading-text {
    color: #88AAFF;
    font-size: 18px;
    margin-bottom: 10px;
}

.loading-progress {
    color: #fff;
    font-size: 24px;
    font-weight: bold;
}
```

### JavaScript Interface

```javascript
const LoadingScreen = {
    /**
     * Show loading screen
     */
    show: function() {
        document.getElementById('loading-screen').classList.remove('hidden');
    },
    
    /**
     * Hide loading screen with fade
     */
    hide: function() {
        document.getElementById('loading-screen').classList.add('hidden');
    },
    
    /**
     * Update progress
     */
    setProgress: function(percent) {
        const progressEl = document.querySelector('.loading-progress');
        if (progressEl) {
            progressEl.textContent = `${Math.round(percent)}%`;
        }
    },
    
    /**
     * Update loading text
     */
    setText: function(text) {
        const textEl = document.querySelector('.loading-text');
        if (textEl) {
            textEl.textContent = text;
        }
    }
};

// Usage
LoadingScreen.show();
LoadingScreen.setText('Loading planets...');
LoadingScreen.setProgress(25);
```

---

## See Also

- [Integration](API_Integration.md) - Component interaction patterns
- [WebGLRenderer](API_WebGLRenderer.md) - 3D rendering
- [TimeSystem](API_TimeSystem.md) - Time management
- [Architecture](API_Architecture.md) - System architecture


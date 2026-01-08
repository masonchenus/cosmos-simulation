/**
 * Main Application - Cosmos Simulation
 * Initializes and coordinates all components
 */

(function () {
    'use strict';

    // Application state
    var app = {
        initialized: false,
        loadingComplete: false
    };

    /**
     * Initialize the application
     */
    function init() {
        if (app.initialized) return;

        console.log('Initializing Cosmos Simulation...');

        // Check for Three.js
        if (typeof THREE === 'undefined') {
            console.error('Three.js not loaded!');
            showError('Three.js library not loaded. Please check your internet connection.');
            return;
        }

        // Initialize time system
        TimeSystem.init();

        // Get container
        var container = document.getElementById('container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'container';
            document.body.insertBefore(container, document.body.firstChild);
        }

        // Initialize renderer
        WebGLRenderer.init(container);

        // Setup UI controls
        setupControls();

        // Populate bodies list
        populateBodiesList();

        // Hide loading screen
        hideLoading();

        // Start animation
        WebGLRenderer.start();

        app.initialized = true;
        console.log('Cosmos Simulation initialized successfully!');
    }

    /**
     * Setup UI control event listeners
     */
    function setupControls() {
        // Play/Pause button
        var playPauseBtn = document.getElementById('play-pause');
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', function () {
                var playing = TimeSystem.togglePlay();
                this.textContent = playing ? '❚❚ Pause' : '▶ Play';
            });
        }

        // Reset button
        var resetBtn = document.getElementById('reset-time');
        if (resetBtn) {
            resetBtn.addEventListener('click', function () {
                TimeSystem.reset();
                updateDateDisplay();
            });
        }

        // Time speed slider
        var timeSpeedSlider = document.getElementById('time-speed');
        if (timeSpeedSlider) {
            timeSpeedSlider.addEventListener('input', function () {
                var value = parseFloat(this.value);
                var scale = Math.pow(value / 10, 2); // Quadratic scale for better feel
                TimeSystem.setTimeScale(scale);
                updateSpeedDisplay(scale);
            });
        }

        // Layer toggles
        var showOrbits = document.getElementById('show-orbits');
        if (showOrbits) {
            showOrbits.addEventListener('change', function () {
                WebGLRenderer.toggleOrbits(this.checked);
            });
        }

        var showLabels = document.getElementById('show-labels');
        if (showLabels) {
            showLabels.addEventListener('change', function () {
                WebGLRenderer.toggleLabels(this.checked);
            });
        }

        var showAsteroids = document.getElementById('show-asteroids');
        if (showAsteroids) {
            showAsteroids.addEventListener('change', function () {
                WebGLRenderer.toggleAsteroids(this.checked);
            });
        }

        var showMoons = document.getElementById('show-moons');
        if (showMoons) {
            showMoons.addEventListener('change', function () {
                WebGLRenderer.toggleMoons(this.checked);
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', handleKeyboard);

        // Update date display periodically
        setInterval(updateDateDisplay, 100);
    }

    /**
     * Handle keyboard shortcuts
     */
    function handleKeyboard(event) {
        switch (event.key) {
            case ' ':
                // Space - play/pause
                event.preventDefault();
                var playPauseBtn = document.getElementById('play-pause');
                if (playPauseBtn) playPauseBtn.click();
                break;
            case 'Escape':
                // Escape - deselect
                WebGLRenderer.deselectBody();
                document.getElementById('info-panel').classList.add('hidden');
                break;
            case 'r':
                // R - reset time
                TimeSystem.reset();
                updateDateDisplay();
                break;
            case '+':
            case '=':
                // Zoom in
                if (WebGLRenderer.controls) {
                    WebGLRenderer.controls.dollyIn(1.1);
                }
                break;
            case '-':
                // Zoom out
                if (WebGLRenderer.controls) {
                    WebGLRenderer.controls.dollyOut(1.1);
                }
                break;
        }
    }

    /**
     * Update date display
     */
    function updateDateDisplay() {
        var dateDisplay = document.getElementById('current-date');
        if (dateDisplay) {
            dateDisplay.textContent = TimeSystem.formatDate();
        }

        // Update speed display
        var speedDisplay = document.getElementById('speed-display');
        if (speedDisplay) {
            speedDisplay.textContent = TimeSystem.getTimeScaleDisplay();
        }
    }

    /**
     * Update speed display
     */
    function updateSpeedDisplay(scale) {
        var display = TimeSystem.getTimeScaleDisplay();
        var speedDisplay = document.getElementById('speed-display');
        if (speedDisplay) {
            speedDisplay.textContent = display;
        }
    }

    /**
     * Populate the celestial bodies list
     */
    function populateBodiesList() {
        var treeContainer = document.getElementById('bodies-tree');
        if (!treeContainer) return;

        var html = '';

        // Sun
        html += createCategory('Sun', ['Sun']);

        // Planets
        var planets = Object.keys(AstronomicalData.Planets);
        html += createCategory('Planets', planets);

        // Moons
        var moons = Object.keys(AstronomicalData.Moons);
        html += createCategory('Moons', moons);

        // Asteroids
        var asteroids = Object.keys(AstronomicalData.Asteroids);
        html += createCategory('Asteroids', asteroids);

        // Dwarf Planets
        var dwarfs = Object.keys(AstronomicalData.DwarfPlanets);
        html += createCategory('Dwarf Planets', dwarfs);

        // Comets
        var comets = Object.keys(AstronomicalData.Comets);
        html += createCategory('Comets', comets);

        treeContainer.innerHTML = html;

        // Add click handlers
        var categories = treeContainer.querySelectorAll('.bodies-category-title');
        for (var i = 0; i < categories.length; i++) {
            categories[i].addEventListener('click', function () {
                this.parentElement.classList.toggle('collapsed');
            });
        }

        var items = treeContainer.querySelectorAll('.bodies-item');
        for (var j = 0; j < items.length; j++) {
            items[j].addEventListener('click', function () {
                var name = this.textContent.trim();

                // Focus on body
                WebGLRenderer.focusOnBody(name);

                // Update selection style
                items.forEach(function (item) {
                    item.classList.remove('selected');
                });
                this.classList.add('selected');
            });
        }
    }

    /**
     * Create HTML for a category
     */
    function createCategory(title, items) {
        var html = '<div class="bodies-category">';
        html += '<div class="bodies-category-title">' + title + '</div>';
        html += '<div class="bodies-list">';

        items.forEach(function (name) {
            var bodyData = getBodyData(name);
            var color = bodyData ? bodyData.color : '#888888';
            html += '<div class="bodies-item" data-name="' + name + '">';
            html += '<span class="color-dot" style="background-color: #' + color.toString(16).padStart(6, '0') + ';"></span>';
            html += name + '</div>';
        });

        html += '</div>';
        return html;
    }

    /**
     * Get body data by name
     */
    function getBodyData(name) {
        var allBodies = AstronomicalData.getAllBodies();
        return allBodies[name] || null;
    }

    /**
     * Hide loading screen
     */
    function hideLoading() {
        var loading = document.getElementById('loading');
        if (loading) {
            loading.classList.add('hidden');
            setTimeout(function () {
                loading.style.display = 'none';
            }, 500);
        }
        app.loadingComplete = true;
    }

    /**
     * Show error message
     */
    function showError(message) {
        var loading = document.getElementById('loading');
        if (loading) {
            loading.querySelector('p').textContent = 'Error: ' + message;
            loading.querySelector('.spinner').style.display = 'none';
        }
    }

    /**
     * Handle window resize
     */
    function onWindowResize() {
        if (WebGLRenderer && WebGLRenderer.onWindowResize) {
            WebGLRenderer.onWindowResize();
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM already loaded
        init();
    }

    // Handle window resize
    window.addEventListener('resize', onWindowResize);

    // Expose to global scope for debugging
    window.CosmosApp = app;
    window.AstronomicalData = AstronomicalData;
    window.PhysicsEngine = PhysicsEngine;
    window.TimeSystem = TimeSystem;
    window.WebGLRenderer = WebGLRenderer;

})();

/**
 * WebGL Renderer - Three.js based 3D visualization
 * Renders the solar system with planets, moons, asteroids, and orbits
 */

const WebGLRenderer = {
    // Three.js objects
    scene: null,
    camera: null,
    renderer: null,
    controls: null,

    // Celestial body meshes
    bodies: {},
    orbits: {},
    labels: {},

    // Visualization settings
    settings: {
        showOrbits: true,
        showLabels: true,
        showAsteroids: true,
        showMoons: true,
        scalePlanets: 0.0001, // Scale factor for planet sizes
        scaleDistances: 1, // Scale factor for distances
        orbitOpacity: 0.3,
        labelSize: 14,
        starFieldDensity: 5000,
        asteroidCount: 1000
    },

    // Selected body
    selectedBody: null,

    // Raycaster for picking
    raycaster: null,
    mouse: null,

    /**
     * Initialize the Three.js scene
     */
    init: function (container) {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000011);

        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000000
        );
        this.camera.position.set(50, 30, 50);

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(this.renderer.domElement);

        // Initialize controls
        this.initControls();

        // Initialize raycaster
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        // Create scene elements
        this.createStarField();
        this.createSun();
        this.createPlanets();
        this.createMoons();
        this.createAsteroids();
        this.createDwarfPlanets();
        this.createComets();
        this.createLights();

        // Handle window resize
        window.addEventListener('resize', this.onWindowResize.bind(this));

        // Handle mouse clicks for selection
        this.renderer.domElement.addEventListener('click', this.onMouseClick.bind(this));
        this.renderer.domElement.addEventListener('mousemove', this.onMouseMove.bind(this));

        return this;
    },

    /**
     * Initialize OrbitControls
     */
    initControls: function () {
        if (typeof THREE.OrbitControls !== 'undefined') {
            this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;
            this.controls.minDistance = 1;
            this.controls.maxDistance = 10000;
            this.controls.enablePan = true;
            this.controls.panSpeed = 1;
            this.controls.rotateSpeed = 0.5;
            this.controls.zoomSpeed = 1;
        }
    },

    /**
     * Create star field background
     */
    createStarField: function () {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const colors = [];

        for (let i = 0; i < this.settings.starFieldDensity; i++) {
            const radius = 100000 + Math.random() * 900000;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            vertices.push(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi)
            );

            // Vary star colors slightly
            const color = new THREE.Color();
            color.setHSL(0.1 + Math.random() * 0.2, 0.2, 0.8 + Math.random() * 0.2);
            colors.push(color.r, color.g, color.b);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        const stars = new THREE.Points(geometry, material);
        this.scene.add(stars);
    },

    /**
     * Create the Sun with glow effect
     */
    createSun: function () {
        const sunData = AstronomicalData.Sun;

        // Sun mesh
        const geometry = new THREE.SphereGeometry(5, 64, 64);
        const material = new THREE.MeshBasicMaterial({
            color: sunData.color,
            emissive: sunData.emissive
        });
        const sun = new THREE.Mesh(geometry, material);
        this.bodies['Sun'] = sun;
        this.scene.add(sun);

        // Sun glow
        const glowGeometry = new THREE.SphereGeometry(6, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xFFAA00,
            transparent: true,
            opacity: 0.3
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        sun.add(glow);

        // Corona effect
        const coronaGeometry = new THREE.SphereGeometry(8, 32, 32);
        const coronaMaterial = new THREE.MeshBasicMaterial({
            color: 0xFF8800,
            transparent: true,
            opacity: 0.1,
            side: THREE.BackSide
        });
        const corona = new THREE.Mesh(coronaGeometry, coronaMaterial);
        sun.add(corona);

        // Create label
        this.createLabel('Sun', { x: 0, y: 8, z: 0 });
    },

    /**
     * Create all planets
     */
    createPlanets: function () {
        for (var name in AstronomicalData.Planets) {
            var planet = AstronomicalData.Planets[name];
            this.createPlanet(name, planet);
        }
    },

    /**
     * Create a single planet with orbit
     */
    createPlanet: function (name, data) {
        // Create planet mesh
        var size = data.radius * this.settings.scalePlanets;
        var geometry = new THREE.SphereGeometry(Math.max(size, 0.1), 32, 32);
        var material = new THREE.MeshStandardMaterial({
            color: data.color,
            roughness: 0.8,
            metalness: 0.1
        });

        var mesh = new THREE.Mesh(geometry, material);
        this.bodies[name] = mesh;
        this.scene.add(mesh);

        // Create orbit line
        this.createOrbit(data, name);

        // Create label
        this.createLabel(name, { x: 0, y: size + 0.5, z: 0 });

        // Add rings for Saturn
        if (data.hasRings) {
            this.createRings(mesh, data);
        }
    },

    /**
     * Create Saturn's rings
     */
    createRings: function (planetMesh, data) {
        var innerRadius = data.radius * this.settings.scalePlanets * 1.2;
        var outerRadius = data.radius * this.settings.scalePlanets * 2.3;

        var geometry = new THREE.RingGeometry(innerRadius, outerRadius, 64);
        var material = new THREE.MeshBasicMaterial({
            color: 0xC9A659,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.7
        });

        var rings = new THREE.Mesh(geometry, material);
        rings.rotation.x = Math.PI / 2.2;
        planetMesh.add(rings);
    },

    /**
     * Create orbital path
     */
    createOrbit: function (data, name) {
        var points = [];
        var segments = 256;
        var period = data.period || 365;

        for (var i = 0; i <= segments; i++) {
            var t = (i / segments) * period;
            var pos = PhysicsEngine.calculatePosition(data, t);
            points.push(new THREE.Vector3(pos.x, pos.y, pos.z));
        }

        var geometry = new THREE.BufferGeometry().setFromPoints(points);
        var material = new THREE.LineBasicMaterial({
            color: data.color,
            transparent: true,
            opacity: this.settings.orbitOpacity
        });

        var orbit = new THREE.Line(geometry, material);
        this.orbits[name] = orbit;
        this.scene.add(orbit);
    },

    /**
     * Create all moons
     */
    createMoons: function () {
        for (var name in AstronomicalData.Moons) {
            var moon = AstronomicalData.Moons[name];
            this.createMoon(name, moon);
        }
    },

    /**
     * Create a moon with orbit
     */
    createMoon: function (name, data) {
        var size = Math.max(data.radius * this.settings.scalePlanets * 5, 0.05);
        var geometry = new THREE.SphereGeometry(size, 16, 16);
        var material = new THREE.MeshStandardMaterial({
            color: data.color,
            roughness: 0.9,
            metalness: 0.1
        });

        var mesh = new THREE.Mesh(geometry, material);
        this.bodies[name] = mesh;
        this.scene.add(mesh);

        // Moon label
        this.createLabel(name, { x: 0, y: size + 0.2, z: 0 });
    },

    /**
     * Create asteroid belt
     */
    createAsteroids: function () {
        var asteroidGroup = new THREE.Group();
        var count = this.settings.asteroidCount;

        for (var i = 0; i < count; i++) {
            var asteroid = this.createAsteroid();
            asteroidGroup.add(asteroid);
        }

        this.bodies['AsteroidBelt'] = asteroidGroup;
        this.scene.add(asteroidGroup);
    },

    /**
     * Create a single asteroid
     */
    createAsteroid: function () {
        // Random position in asteroid belt (between Mars and Jupiter)
        var distance = 2.2 + Math.random() * 1.5; // AU
        var angle = Math.random() * Math.PI * 2;
        var height = (Math.random() - 0.5) * 0.3;

        var x = distance * Math.cos(angle);
        var z = distance * Math.sin(angle);
        var y = height;

        var size = 0.01 + Math.random() * 0.03;
        var geometry = new THREE.DodecahedronGeometry(size, 0);
        var material = new THREE.MeshStandardMaterial({
            color: 0x888888,
            roughness: 0.9
        });

        var asteroid = new THREE.Mesh(geometry, material);
        asteroid.position.set(x, y, z);
        asteroid.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );

        // Store orbital data for animation
        asteroid.userData = {
            distance: distance,
            angle: angle,
            speed: 0.0001 + Math.random() * 0.0005,
            height: height,
            rotationSpeed: 0.01 + Math.random() * 0.02
        };

        return asteroid;
    },

    /**
     * Create dwarf planets
     */
    createDwarfPlanets: function () {
        for (var name in AstronomicalData.DwarfPlanets) {
            var planet = AstronomicalData.DwarfPlanets[name];
            this.createPlanet(name, planet);
        }
    },

    /**
     * Create comets
     */
    createComets: function () {
        for (var name in AstronomicalData.Comets) {
            var comet = AstronomicalData.Comets[name];
            this.createComet(name, comet);
        }
    },

    /**
     * Create a comet
     */
    createComet: function (name, data) {
        var size = 0.1;
        var geometry = new THREE.SphereGeometry(size, 16, 16);
        var material = new THREE.MeshBasicMaterial({
            color: data.color
        });

        var mesh = new THREE.Mesh(geometry, material);
        this.bodies[name] = mesh;
        this.scene.add(mesh);

        // Comet tail
        var tailGeometry = new THREE.ConeGeometry(0.5, 5, 8);
        var tailMaterial = new THREE.MeshBasicMaterial({
            color: data.tailColor || 0x88CCFF,
            transparent: true,
            opacity: 0.3
        });
        var tail = new THREE.Mesh(tailGeometry, tailMaterial);
        tail.rotation.x = Math.PI / 2;
        tail.position.z = -3;
        mesh.add(tail);

        this.createLabel(name, { x: 0, y: size + 0.5, z: 0 });
    },

    /**
     * Create lighting
     */
    createLights: function () {
        // Ambient light for base illumination
        var ambient = new THREE.AmbientLight(0x333344, 0.5);
        this.scene.add(ambient);

        // Sun light (point light at origin)
        var sunLight = new THREE.PointLight(0xFFFFFF, 2, 1000);
        sunLight.position.set(0, 0, 0);
        sunLight.castShadow = true;
        this.scene.add(sunLight);

        // Helper for sun position
        this.sunLight = sunLight;
    },

    /**
     * Create text label using HTML overlay
     */
    createLabel: function (name, offset) {
        var label = document.createElement('div');
        label.className = 'body-label';
        label.textContent = name;
        label.style.position = 'absolute';
        label.style.color = '#88AAFF';
        label.style.fontSize = this.settings.labelSize + 'px';
        label.style.fontFamily = 'Arial, sans-serif';
        label.style.textShadow = '0 0 5px #000';
        label.style.pointerEvents = 'none';
        label.style.display = this.settings.showLabels ? 'block' : 'none';

        this.labels[name] = {
            element: label,
            offset: offset
        };

        document.body.appendChild(label);
    },

    /**
     * Update label positions
     */
    updateLabels: function () {
        for (var name in this.labels) {
            var labelData = this.labels[name];
            var body = this.bodies[name];

            if (!body) continue;

            // Get screen position
            var pos = body.position.clone();
            if (labelData.offset) {
                pos.y += labelData.offset.y;
            }

            pos.project(this.camera);

            var x = (pos.x * 0.5 + 0.5) * window.innerWidth;
            var y = (-(pos.y * 0.5) + 0.5) * window.innerHeight;

            // Hide if behind camera
            if (pos.z > 1) {
                labelData.element.style.display = 'none';
            } else {
                labelData.element.style.display = this.settings.showLabels ? 'block' : 'none';
                labelData.element.style.left = x + 'px';
                labelData.element.style.top = y + 'px';
            }
        }
    },

    /**
     * Update planet positions based on simulation time
     */
    updatePositions: function (time) {
        // Update planets
        for (var name in AstronomicalData.Planets) {
            var body = this.bodies[name];
            if (body) {
                var pos = PhysicsEngine.getPosition(name, time);
                body.position.set(pos.x, pos.y, pos.z);
                body.rotation.y += 0.01; // Self rotation
            }
        }

        // Update moons
        for (var name in AstronomicalData.Moons) {
            var body = this.bodies[name];
            if (body) {
                var pos = PhysicsEngine.getPosition(name, time);
                body.position.set(pos.x, pos.y, pos.z);
            }
        }

        // Update dwarf planets
        for (var name in AstronomicalData.DwarfPlanets) {
            var body = this.bodies[name];
            if (body) {
                var pos = PhysicsEngine.getPosition(name, time);
                body.position.set(pos.x, pos.y, pos.z);
            }
        }

        // Update comets
        for (var name in AstronomicalData.Comets) {
            var body = this.bodies[name];
            if (body) {
                var pos = PhysicsEngine.getPosition(name, time);
                body.position.set(pos.x, pos.y, pos.z);
            }
        }

        // Update asteroids
        var asteroidGroup = this.bodies['AsteroidBelt'];
        if (asteroidGroup) {
            asteroidGroup.children.forEach(function (asteroid) {
                if (asteroid.userData) {
                    var data = asteroid.userData;
                    data.angle += data.speed * TimeSystem.timeScale;
                    asteroid.position.x = data.distance * Math.cos(data.angle);
                    asteroid.position.z = data.distance * Math.sin(data.angle);
                    asteroid.rotation.x += data.rotationSpeed;
                    asteroid.rotation.y += data.rotationSpeed;
                }
            });
        }
    },

    /**
     * Update orbit trails
     */
    updateOrbits: function (time) {
        // Orbital positions are calculated dynamically, 
        // so orbits don't need explicit updates
    },

    /**
     * Toggle orbit visibility
     */
    toggleOrbits: function (visible) {
        this.settings.showOrbits = visible;
        for (var name in this.orbits) {
            this.orbits[name].visible = visible;
        }
    },

    /**
     * Toggle label visibility
     */
    toggleLabels: function (visible) {
        this.settings.showLabels = visible;
        for (var name in this.labels) {
            this.labels[name].element.style.display = visible ? 'block' : 'none';
        }
    },

    /**
     * Toggle asteroid belt visibility
     */
    toggleAsteroids: function (visible) {
        this.settings.showAsteroids = visible;
        if (this.bodies['AsteroidBelt']) {
            this.bodies['AsteroidBelt'].visible = visible;
        }
    },

    /**
     * Toggle moon visibility
     */
    toggleMoons: function (visible) {
        this.settings.showMoons = visible;
        for (var name in AstronomicalData.Moons) {
            if (this.bodies[name]) {
                this.bodies[name].visible = visible;
            }
        }
    },

    /**
     * Handle window resize
     */
    onWindowResize: function () {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    },

    /**
     * Handle mouse click for body selection
     */
    onMouseClick: function (event) {
        var rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);

        var meshes = [];
        for (var name in this.bodies) {
            if (this.bodies[name] instanceof THREE.Mesh) {
                meshes.push(this.bodies[name]);
            }
        }

        var intersects = this.raycaster.intersectObjects(meshes);

        if (intersects.length > 0) {
            var selected = intersects[0].object;
            this.selectBody(selected);
        } else {
            this.deselectBody();
        }
    },

    /**
     * Handle mouse move for hover effects
     */
    onMouseMove: function (event) {
        var rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);

        var meshes = [];
        for (var name in this.bodies) {
            if (this.bodies[name] instanceof THREE.Mesh) {
                meshes.push(this.bodies[name]);
            }
        }

        var intersects = this.raycaster.intersectObjects(meshes);

        if (intersects.length > 0) {
            document.body.style.cursor = 'pointer';
        } else {
            document.body.style.cursor = 'default';
        }
    },

    /**
     * Select a celestial body
     */
    selectBody: function (mesh) {
        // Reset previous selection
        this.deselectBody();

        // Find body name
        for (var name in this.bodies) {
            if (this.bodies[name] === mesh) {
                this.selectedBody = name;

                // Highlight effect
                if (mesh.material) {
                    mesh.userData.originalEmissive = mesh.material.emissive.getHex();
                    mesh.material.emissive.setHex(0x333333);
                }

                // Update info panel
                this.updateInfoPanel(name);
                break;
            }
        }
    },

    /**
     * Deselect current body
     */
    deselectBody: function () {
        if (this.selectedBody) {
            var mesh = this.bodies[this.selectedBody];
            if (mesh && mesh.material && mesh.userData.originalEmissive !== undefined) {
                mesh.material.emissive.setHex(mesh.userData.originalEmissive);
            }
            this.selectedBody = null;
        }
    },

    /**
     * Update info panel with body details
     */
    updateInfoPanel: function (name) {
        var allBodies = AstronomicalData.getAllBodies();
        var body = allBodies[name];

        if (!body) return;

        var infoPanel = document.getElementById('body-info');
        var namePanel = document.getElementById('body-name');

        if (namePanel) namePanel.textContent = body.name;

        if (infoPanel) {
            var html = '';
            html += '<p><span class="label">Type:</span> <span class="value">' + (body.type || 'unknown') + '</span></p>';
            html += '<p><span class="label">Radius:</span> <span class="value">' + this.formatNumber(body.radius) + ' m</span></p>';
            html += '<p><span class="label">Mass:</span> <span class="value">' + this.formatScientific(body.mass) + ' kg</span></p>';

            if (body.period) {
                html += '<p><span class="label">Orbital Period:</span> <span class="value">' + body.period.toFixed(1) + ' days</span></p>';
            }
            if (body.rotation) {
                html += '<p><span class="label">Rotation Period:</span> <span class="value">' + Math.abs(body.rotation).toFixed(1) + ' hours</span></p>';
            }
            if (body.tilt) {
                html += '<p><span class="label">Axial Tilt:</span> <span class="value">' + body.tilt.toFixed(2) + '°</span></p>';
            }
            if (body.a) {
                html += '<p><span class="label">Semi-major Axis:</span> <span class="value">' + body.a.toFixed(3) + ' AU</span></p>';
            }
            if (body.e) {
                html += '<p><span class="label">Eccentricity:</span> <span class="value">' + body.e.toFixed(6) + '</span></p>';
            }
            if (body.i) {
                html += '<p><span class="label">Inclination:</span> <span class="value">' + body.i.toFixed(2) + '°</span></p>';
            }
            if (body.moons && body.moons.length > 0) {
                html += '<p><span class="label">Moons:</span> <span class="value">' + body.moons.length + '</span></p>';
            }
            if (body.description) {
                html += '<p><span class="label">Description:</span> <span class="value">' + body.description + '</span></p>';
            }

            infoPanel.innerHTML = html;
            document.getElementById('info-panel').classList.remove('hidden');
        }
    },

    /**
     * Format number with commas
     */
    formatNumber: function (num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    /**
     * Format number in scientific notation
     */
    formatScientific: function (num) {
        if (num === 0) return '0';
        var exp = Math.floor(Math.log10(Math.abs(num)));
        var mantissa = num / Math.pow(10, exp);
        return mantissa.toFixed(2) + ' × 10^' + exp;
    },

    /**
     * Camera focus on body
     */
    focusOnBody: function (name) {
        var body = this.bodies[name];
        if (!body) return;

        var target = body.position.clone();

        if (this.controls) {
            this.controls.target.copy(target);
        }

        // Move camera to be near the body
        var offset = new THREE.Vector3(5, 3, 5);
        this.camera.position.copy(target).add(offset);

        this.selectBody(body);
    },

    /**
     * Render the scene
     */
    render: function () {
        if (this.controls) {
            this.controls.update();
        }

        this.renderer.render(this.scene, this.camera);
    },

    /**
     * Animation loop
     */
    animate: function () {
        requestAnimationFrame(this.animate.bind(this));

        // Update simulation time
        TimeSystem.update();

        // Update body positions
        this.updatePositions(TimeSystem.getDaysSinceJ2000());

        // Update labels
        this.updateLabels();

        // Render
        this.render();
    },

    /**
     * Start the simulation
     */
    start: function () {
        this.animate();
    }
};

// Make available globally
if (typeof window !== 'undefined') {
    window.WebGLRenderer = WebGLRenderer;
}

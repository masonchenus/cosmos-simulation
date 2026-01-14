/**
 * WebGL Renderer - Optimized Three.js based 3D visualization
 * Optimized for faster loading and better performance
 */

const WebGLRenderer = {
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    bodies: {},
    orbits: {},
    labels: {},
    settings: {
        showOrbits: false,
        showLabels: false,
        showAsteroids: false,
        showMoons: true,
        scalePlanets: 0.0001,
        scaleDistances: 1,
        orbitOpacity: 0.3,
        labelSize: 14,
        starFieldDensity: 100,
        asteroidCount: 50
    },
    selectedBody: null,
    raycaster: null,
    mouse: null,

    init: function (container) {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000011);

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000000);
        this.camera.position.set(50, 30, 50);

        this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(1);
        this.renderer.shadowMap.enabled = false;
        container.appendChild(this.renderer.domElement);

        this.initControls();
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        this.createStarField();
        this.createSun();
        this.createPlanets();
        this.createMoons();
        this.createLights();

        window.addEventListener('resize', this.onWindowResize.bind(this));
        this.renderer.domElement.addEventListener('click', this.onMouseClick.bind(this));
        this.renderer.domElement.addEventListener('mousemove', this.onMouseMove.bind(this));

        return this;
    },

    initControls: function () {
        if (typeof THREE.OrbitControls !== 'undefined') {
            this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;
            this.controls.minDistance = 1;
            this.controls.maxDistance = 10000;
        }
    },

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

            const color = new THREE.Color();
            color.setHSL(0.1 + Math.random() * 0.2, 0.2, 0.8 + Math.random() * 0.2);
            colors.push(color.r, color.g, color.b);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({ size: 3, vertexColors: true, transparent: true, opacity: 0.8 });
        const stars = new THREE.Points(geometry, material);
        this.scene.add(stars);
    },

    createSun: function () {
        const sunData = AstronomicalData.Sun;
        const geometry = new THREE.SphereGeometry(5, 12, 12);
        const material = new THREE.MeshBasicMaterial({ color: sunData.color, emissive: sunData.emissive });
        const sun = new THREE.Mesh(geometry, material);
        this.bodies['Sun'] = sun;
        this.scene.add(sun);
        this.createLabel('Sun', { x: 0, y: 8, z: 0 });
    },

    createPlanets: function () {
        for (var name in AstronomicalData.Planets) {
            this.createPlanet(name, AstronomicalData.Planets[name]);
        }
    },

    createPlanet: function (name, data) {
        var size = data.radius * this.settings.scalePlanets;
        var geometry = new THREE.SphereGeometry(Math.max(size, 0.1), 8, 8);
        var material = new THREE.MeshBasicMaterial({ color: data.color });
        var mesh = new THREE.Mesh(geometry, material);
        this.bodies[name] = mesh;
        this.scene.add(mesh);
        this.createOrbit(data, name);
        this.createLabel(name, { x: 0, y: size + 0.5, z: 0 });
    },

    createOrbit: function (data, name) {
        var points = [];
        var segments = 64;
        var period = data.period || 365;

        for (var i = 0; i <= segments; i++) {
            var t = (i / segments) * period;
            var pos = PhysicsEngine.calculatePosition(data, t);
            points.push(new THREE.Vector3(pos.x, pos.y, pos.z));
        }

        var geometry = new THREE.BufferGeometry().setFromPoints(points);
        var material = new THREE.LineBasicMaterial({ color: data.color, transparent: true, opacity: this.settings.orbitOpacity });
        var orbit = new THREE.Line(geometry, material);
        this.orbits[name] = orbit;
        this.scene.add(orbit);
    },

    createMoons: function () {
        for (var name in AstronomicalData.Moons) {
            this.createMoon(name, AstronomicalData.Moons[name]);
        }
    },

    createMoon: function (name, data) {
        var size = Math.max(data.radius * this.settings.scalePlanets * 5, 0.05);
        var geometry = new THREE.SphereGeometry(size, 6, 6);
        var material = new THREE.MeshBasicMaterial({ color: data.color });
        var mesh = new THREE.Mesh(geometry, material);
        this.bodies[name] = mesh;
        this.scene.add(mesh);
        this.createLabel(name, { x: 0, y: size + 0.2, z: 0 });
    },

    createLights: function () {
        var ambient = new THREE.AmbientLight(0x333344, 0.5);
        this.scene.add(ambient);
        var sunLight = new THREE.PointLight(0xFFFFFF, 2, 1000);
        sunLight.position.set(0, 0, 0);
        this.scene.add(sunLight);
        this.sunLight = sunLight;
    },

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
        this.labels[name] = { element: label, offset: offset };
        document.body.appendChild(label);
    },

    updateLabels: function () {
        for (var name in this.labels) {
            var labelData = this.labels[name];
            var body = this.bodies[name];
            if (!body) continue;
            var pos = body.position.clone();
            if (labelData.offset) pos.y += labelData.offset.y;
            pos.project(this.camera);
            var x = (pos.x * 0.5 + 0.5) * window.innerWidth;
            var y = (-(pos.y * 0.5) + 0.5) * window.innerHeight;
            if (pos.z > 1) {
                labelData.element.style.display = 'none';
            } else {
                labelData.element.style.display = this.settings.showLabels ? 'block' : 'none';
                labelData.element.style.left = x + 'px';
                labelData.element.style.top = y + 'px';
            }
        }
    },

    updatePositions: function (time) {
        for (var name in AstronomicalData.Planets) {
            var body = this.bodies[name];
            if (body) {
                var pos = PhysicsEngine.getPosition(name, time);
                body.position.set(pos.x, pos.y, pos.z);
            }
        }
        for (var name in AstronomicalData.Moons) {
            var body = this.bodies[name];
            if (body) {
                var pos = PhysicsEngine.getPosition(name, time);
                body.position.set(pos.x, pos.y, pos.z);
            }
        }
    },

    toggleOrbits: function (visible) {
        this.settings.showOrbits = visible;
        for (var name in this.orbits) this.orbits[name].visible = visible;
    },

    toggleLabels: function (visible) {
        this.settings.showLabels = visible;
        for (var name in this.labels) this.labels[name].element.style.display = visible ? 'block' : 'none';
    },

    toggleAsteroids: function (visible) { this.settings.showAsteroids = visible; },

    toggleMoons: function (visible) {
        this.settings.showMoons = visible;
        for (var name in AstronomicalData.Moons) {
            if (this.bodies[name]) this.bodies[name].visible = visible;
        }
    },

    onWindowResize: function () {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    },

    onMouseClick: function (event) {
        var rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        var meshes = [];
        for (var name in this.bodies) {
            if (this.bodies[name] instanceof THREE.Mesh) meshes.push(this.bodies[name]);
        }
        var intersects = this.raycaster.intersectObjects(meshes);
        if (intersects.length > 0) {
            this.selectBody(intersects[0].object);
        } else {
            this.deselectBody();
        }
    },

    onMouseMove: function (event) {
        var rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        var meshes = [];
        for (var name in this.bodies) {
            if (this.bodies[name] instanceof THREE.Mesh) meshes.push(this.bodies[name]);
        }
        var intersects = this.raycaster.intersectObjects(meshes);
        document.body.style.cursor = intersects.length > 0 ? 'pointer' : 'default';
    },

    selectBody: function (mesh) {
        this.deselectBody();
        for (var name in this.bodies) {
            if (this.bodies[name] === mesh) {
                this.selectedBody = name;
                this.updateInfoPanel(name);
                break;
            }
        }
    },

    deselectBody: function () { this.selectedBody = null; },

    updateInfoPanel: function (name) {
        var body = AstronomicalData.getAllBodies()[name];
        if (!body) return;
        var infoPanel = document.getElementById('body-info');
        var namePanel = document.getElementById('body-name');
        if (namePanel) namePanel.textContent = body.name;
        if (infoPanel) {
            var html = '<p><span class="label">Type:</span> <span class="value">' + (body.type || 'unknown') + '</span></p>';
            html += '<p><span class="label">Radius:</span> <span class="value">' + this.formatNumber(body.radius) + ' m</span></p>';
            if (body.period) html += '<p><span class="label">Orbital Period:</span> <span class="value">' + body.period.toFixed(1) + ' days</span></p>';
            infoPanel.innerHTML = html;
            document.getElementById('info-panel').classList.remove('hidden');
        }
    },

    formatNumber: function (num) { return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); },

    focusOnBody: function (name) {
        var body = this.bodies[name];
        if (!body) return;
        var target = body.position.clone();
        if (this.controls) this.controls.target.copy(target);
        var offset = new THREE.Vector3(5, 3, 5);
        this.camera.position.copy(target).add(offset);
        this.selectBody(body);
    },

    render: function () {
        if (this.controls) this.controls.update();
        this.renderer.render(this.scene, this.camera);
    },

    animate: function () {
        requestAnimationFrame(this.animate.bind(this));
        TimeSystem.update();
        this.updatePositions(TimeSystem.getDaysSinceJ2000());
        this.updateLabels();
        this.render();
    },

    start: function () { this.animate(); }
};

if (typeof window !== 'undefined') window.WebGLRenderer = WebGLRenderer;

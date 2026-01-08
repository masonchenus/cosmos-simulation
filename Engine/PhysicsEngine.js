/**
 * Physics Engine - Ultra Accurate Orbital Mechanics
 * Implements Keplerian orbital mechanics with J2000 epoch reference
 */

const PhysicsEngine = {
    // Constants
    G: 6.67430e-11, // Gravitational constant (m^3 kg^-1 s^-2)
    AU: 149597870700, // Astronomical Unit in meters
    DAY: 86400, // Seconds per day
    DEG2RAD: Math.PI / 180,
    RAD2DEG: 180 / Math.PI,

    // Current simulation time (J2000 days)
    simTime: 0,
    timeScale: 1, // Multiplier for time progression
    isPlaying: false,

    /**
     * Convert degrees to radians
     */
    deg2rad: function (degrees) {
        return degrees * this.DEG2RAD;
    },

    /**
     * Convert radians to degrees
     */
    rad2deg: function (radians) {
        return radians * this.RAD2DEG;
    },

    /**
     * Solve Kepler's equation using Newton-Raphson iteration
     * M = E - e*sin(E)
     * where M is mean anomaly, E is eccentric anomaly, e is eccentricity
     */
    solveKepler: function (M, e, tolerance = 1e-8) {
        // Normalize M to [0, 2π]
        M = M % (2 * Math.PI);
        if (M < 0) M += 2 * Math.PI;

        // Initial guess: E ≈ M for low e, or E ≈ π for high e
        let E = M < Math.PI ? M : 2 * Math.PI - M;
        if (e > 0.8) E = Math.PI;

        // Newton-Raphson iteration
        let delta = 1;
        let iterations = 0;
        const maxIterations = 100;

        while (Math.abs(delta) > tolerance && iterations < maxIterations) {
            delta = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
            E = E - delta;
            iterations++;
        }

        return E;
    },

    /**
     * Calculate position from orbital elements (J2000)
     * Returns {x, y, z} in AU
     * 
     * Orbital elements:
     * a: semi-major axis (AU)
     * e: eccentricity
     * i: inclination (degrees)
     * L: mean longitude (degrees)
     * w: longitude of perihelion (degrees)
     * node: longitude of ascending node (degrees)
     */
    calculatePosition: function (elements, time) {
        const { a, e, i, L, w, node } = elements;

        // Convert angles to radians
        const i_rad = this.deg2rad(i);
        const w_rad = this.deg2rad(w);
        const node_rad = this.deg2rad(node);

        // Argument of perihelion
        const omega = w_rad - node_rad;

        // Mean longitude at epoch
        const M0 = this.deg2rad(L - w);

        // Mean motion (radians per day)
        // n = 2π / period (for planets, we can derive from Kepler's 3rd law)
        // For higher accuracy, use orbital period if available
        const period = elements.period || this.calculatePeriod(a);
        const n = (2 * Math.PI) / period;

        // Mean anomaly at time t
        const M = M0 + n * time;

        // Eccentric anomaly
        const E = this.solveKepler(M, e);

        // True anomaly
        const cosE = Math.cos(E);
        const sinE = Math.sin(E);
        const sqrt1_e2 = Math.sqrt(1 - e * e);

        // Position in orbital plane
        const x_orb = a * (cosE - e);
        const y_orb = a * sqrt1_e2 * sinE;

        // Rotate to ecliptic plane
        const cos_omega = Math.cos(omega);
        const sin_omega = Math.sin(omega);
        const cos_i = Math.cos(i_rad);
        const sin_i = Math.sin(i_rad);
        const cos_node = Math.cos(node_rad);
        const sin_node = Math.sin(node_rad);

        // Combined rotation
        const x = x_orb * (cos_omega * cos_node - sin_omega * sin_node * cos_i) -
            y_orb * (sin_omega * cos_node + cos_omega * sin_node * cos_i);

        const y = x_orb * (cos_omega * sin_node + sin_omega * cos_node * cos_i) +
            y_orb * (sin_omega * sin_node - cos_omega * cos_node * cos_i);

        const z = x_orb * (sin_omega * sin_i) + y_orb * (cos_omega * sin_i);

        return { x, y, z };
    },

    /**
     * Calculate orbital period from semi-major axis using Kepler's 3rd law
     * P^2 = a^3 (for solar system, P in years, a in AU)
     */
    calculatePeriod: function (a) {
        // P^2 = a^3 (Kepler's 3rd law)
        // P in years, a in AU
        const periodYears = Math.pow(a, 1.5);
        return periodYears * 365.25; // Convert to days
    },

    /**
     * Calculate moon position relative to its parent planet
     * Simplified circular orbit approximation for speed
     * For more accuracy, would need full orbital elements
     */
    calculateMoonPosition: function (moonData, parentPos, time) {
        const { a, e, i, period, L, w, node } = moonData;

        // Convert distances to appropriate scale
        // moon a is in km, need to convert to AU for consistency
        const a_AU = a / this.AU * 1000; // Convert km to AU

        // Convert angles to radians
        const i_rad = this.deg2rad(i || 0);
        const w_rad = this.deg2rad(w || 0);
        const node_rad = this.deg2rad(node || 0);

        // Mean longitude and argument of perihelion
        const omega = w_rad - node_rad;
        const M0 = this.deg2rad((L || 0) - (w || 0));
        const n = (2 * Math.PI) / period;
        const M = M0 + n * time;

        // Solve Kepler's equation
        const E = this.solveKepler(M, e || 0);

        // Calculate position in orbital plane
        const cosE = Math.cos(E);
        const sinE = Math.sin(E);
        const sqrt1_e2 = Math.sqrt(1 - (e || 0) * (e || 0));

        const x_orb = a_AU * (cosE - (e || 0));
        const y_orb = a_AU * sqrt1_e2 * sinE;

        // Rotate to 3D space
        const cos_omega = Math.cos(omega);
        const sin_omega = Math.sin(omega);
        const cos_i = Math.cos(i_rad);
        const sin_i = Math.sin(i_rad);
        const cos_node = Math.cos(node_rad);
        const sin_node = Math.sin(node_rad);

        const x = x_orb * (cos_omega * cos_node - sin_omega * sin_node * cos_i) -
            y_orb * (sin_omega * cos_node + cos_omega * sin_node * cos_i);

        const y = x_orb * (cos_omega * sin_node + sin_omega * cos_node * cos_i) +
            y_orb * (sin_omega * sin_node - cos_omega * cos_node * cos_i);

        const z = x_orb * (sin_omega * sin_i) + y_orb * (cos_omega * sin_i);

        // Add parent position (convert back to meters for rendering)
        return {
            x: parentPos.x + x,
            y: parentPos.y + y,
            z: parentPos.z + z
        };
    },

    /**
     * Get position of a celestial body at current simulation time
     */
    getPosition: function (bodyName, time = this.simTime) {
        const allBodies = AstronomicalData.getAllBodies();
        const body = allBodies[bodyName];

        if (!body) {
            console.warn(`Body not found: ${bodyName}`);
            return { x: 0, y: 0, z: 0 };
        }

        // Sun is always at origin
        if (body.type === 'star' || body.name === 'Sun') {
            return { x: 0, y: 0, z: 0 };
        }

        // For planets and asteroids orbiting the Sun
        if (body.parent === 'Sun' || !body.parent) {
            return this.calculatePosition(body, time);
        }

        // For moons orbiting planets
        if (body.type === 'moon') {
            const parent = AstronomicalData.getParentBody(bodyName);
            if (parent) {
                const parentPos = this.getPosition(parent.name, time);
                return this.calculateMoonPosition(body, parentPos, time);
            }
        }

        return { x: 0, y: 0, z: 0 };
    },

    /**
     * Calculate velocity vector (for future use with N-body simulation)
     */
    calculateVelocity: function (elements, time) {
        const { a, e, i, L, w, node } = elements;

        const i_rad = this.deg2rad(i);
        const w_rad = this.deg2rad(w);
        const node_rad = this.deg2rad(node);
        const omega = w_rad - node_rad;
        const M0 = this.deg2rad(L - w);
        const period = elements.period || this.calculatePeriod(a);
        const n = (2 * Math.PI) / period;
        const M = M0 + n * time;
        const E = this.solveKepler(M, e);

        const cosE = Math.cos(E);
        const sinE = Math.sin(E);
        const sqrt1_e2 = Math.sqrt(1 - e * e);

        // Velocity in orbital plane
        const r = a * (1 - e * cosE);
        const v_orb_x = -a * n * sinE / (1 - e * cosE);
        const v_orb_y = a * n * sqrt1_e2 * cosE / (1 - e * cosE);

        // Same rotation as position
        const cos_omega = Math.cos(omega);
        const sin_omega = Math.sin(omega);
        const cos_i = Math.cos(i_rad);
        const sin_i = Math.sin(i_rad);
        const cos_node = Math.cos(node_rad);
        const sin_node = Math.sin(node_rad);

        const vx = v_orb_x * (cos_omega * cos_node - sin_omega * sin_node * cos_i) -
            v_orb_y * (sin_omega * cos_node + cos_omega * sin_node * cos_i);

        const vy = v_orb_x * (cos_omega * sin_node + sin_omega * cos_node * cos_i) +
            v_orb_y * (sin_omega * sin_node - cos_omega * cos_node * cos_i);

        const vz = v_orb_x * (sin_omega * sin_i) + v_orb_y * (cos_omega * sin_i);

        return { x: vx, y: vy, z: vz };
    },

    /**
     * Get orbital period in days
     */
    getOrbitalPeriod: function (bodyName) {
        const allBodies = AstronomicalData.getAllBodies();
        const body = allBodies[bodyName];

        if (!body) return 0;

        if (body.period) return body.period;
        if (body.a) return this.calculatePeriod(body.a);

        return 0;
    },

    /**
     * Calculate scale factor for visualization
     * Real solar system scales are too large for direct rendering
     */
    getScaleFactor: function () {
        return 1; // Base scale, can be adjusted for zoom
    },

    /**
     * Set simulation time
     */
    setTime: function (time) {
        this.simTime = Math.max(0, time);
    },

    /**
     * Advance simulation by delta time
     */
    update: function (deltaTime) {
        if (!this.isPlaying) return;

        // Advance simulation time (in days)
        // deltaTime is in seconds, convert to days and apply time scale
        const daysPassed = (deltaTime / this.DAY) * this.timeScale * 1000;
        this.simTime += daysPassed;
    },

    /**
     * Set time scale multiplier
     */
    setTimeScale: function (scale) {
        this.timeScale = scale;
    },

    /**
     * Play/Pause simulation
     */
    play: function () {
        this.isPlaying = true;
    },

    /**
     * Pause simulation
     */
    pause: function () {
        this.isPlaying = false;
    },

    /**
     * Reset simulation to initial time
     */
    reset: function () {
        this.simTime = 0;
        this.isPlaying = false;
    },

    /**
     * Get formatted date string for simulation time
     */
    getFormattedDate: function () {
        // Calculate approximate calendar date from J2000 days
        const j2000 = new Date('2000-01-01T12:00:00Z');
        const currentDate = new Date(j2000.getTime() + this.simTime * this.DAY * 1000);

        return currentDate.toISOString().split('T')[0];
    },

    /**
     * Calculate Julian Date from simulation time
     */
    getJulianDate: function () {
        // J2000 = 2451545.0 JD
        return 2451545.0 + this.simTime;
    },

    /**
     * Get position of all bodies at current time
     */
    getAllPositions: function () {
        const positions = {};
        const allBodies = AstronomicalData.getAllBodies();

        for (const name of Object.keys(allBodies)) {
            positions[name] = this.getPosition(name);
        }

        return positions;
    },

    /**
     * Calculate distance between two bodies
     */
    getDistance: function (body1Name, body2Name) {
        const pos1 = this.getPosition(body1Name);
        const pos2 = this.getPosition(body2Name);

        const dx = pos2.x - pos1.x;
        const dy = pos2.y - pos1.y;
        const dz = pos2.z - pos1.z;

        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
};

// Make available globally
if (typeof window !== 'undefined') {
    window.PhysicsEngine = PhysicsEngine;
}
export default PhysicsEngine;

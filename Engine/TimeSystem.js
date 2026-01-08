/**
 * Time System - Simulation Time Management
 * Handles date/time calculations, time scales, and epochs
 */

const TimeSystem = {
    // Constants
    DAY: 86400000, // milliseconds per day
    HOUR: 3600000, // milliseconds per hour
    MINUTE: 60000, // milliseconds per minute
    SECOND: 1000, // milliseconds per second

    // J2000 Epoch reference
    J2000_EPOCH: new Date('2000-01-01T12:00:00Z'),
    J2000_JD: 2451545.0, // Julian Date of J2000

    // Current simulation time (milliseconds from J2000)
    simTime: 0,

    // Time scale multiplier (1 = real time, 1000 = 1000x faster)
    timeScale: 1,

    // Whether simulation is playing
    isPlaying: false,

    // Last update timestamp
    lastUpdate: 0,

    // Preset time scales
    timeScales: {
        'paused': 0,
        'realtime': 1,
        '1min/sec': 60,
        '1hour/sec': 3600,
        '1day/sec': 86400,
        '1week/sec': 604800,
        '1month/sec': 2592000,
        '1year/sec': 31536000,
        '10years/sec': 315360000,
        '100years/sec': 3153600000,
        '1000years/sec': 31536000000
    },

    /**
     * Initialize the time system
     */
    init: function () {
        this.setDate(new Date());
        this.lastUpdate = Date.now();
    },

    /**
     * Set simulation time from a Date object
     */
    setDate: function (date) {
        this.simTime = date.getTime() - this.J2000_EPOCH.getTime();
    },

    /**
     * Set simulation time from Julian Date
     */
    setJulianDate: function (jd) {
        // JD to milliseconds: (JD - J2000_JD) * DAY + J2000 epoch
        this.simTime = (jd - this.J2000_JD) * this.DAY;
    },

    /**
     * Set simulation time from days since J2000
     */
    setDaysSinceJ2000: function (days) {
        this.simTime = days * this.DAY;
    },

    /**
     * Get current simulation date
     */
    getDate: function () {
        return new Date(this.J2000_EPOCH.getTime() + this.simTime);
    },

    /**
     * Get Julian Date
     */
    getJulianDate: function () {
        return this.J2000_JD + (this.simTime / this.DAY);
    },

    /**
     * Get days since J2000
     */
    getDaysSinceJ2000: function () {
        return this.simTime / this.DAY;
    },

    /**
     * Format date as ISO string
     */
    formatDate: function (date = null) {
        const d = date || this.getDate();
        return d.toISOString().split('T')[0];
    },

    /**
     * Format date with time
     */
    formatDateTime: function (date = null) {
        const d = date || this.getDate();
        return d.toISOString().slice(0, 19).replace('T', ' ');
    },

    /**
     * Format relative time display
     */
    formatRelativeTime: function () {
        const days = this.simTime / this.DAY;
        const years = days / 365.25;

        if (years >= 1000000) {
            return `${(years / 1000000).toFixed(1)} million years`;
        } else if (years >= 1000) {
            return `${years.toFixed(0)} years`;
        } else if (years >= 1) {
            return `${years.toFixed(2)} years`;
        } else {
            return `${days.toFixed(1)} days`;
        }
    },

    /**
     * Set time scale
     */
    setTimeScale: function (scale) {
        this.timeScale = Math.max(0, scale);
    },

    /**
     * Set time scale from preset name
     */
    setTimeScalePreset: function (presetName) {
        if (this.timeScales[presetName] !== undefined) {
            this.timeScale = this.timeScales[presetName];
            return true;
        }
        return false;
    },

    /**
     * Get current time scale
     */
    getTimeScale: function () {
        return this.timeScale;
    },

    /**
     * Get time scale display name
     */
    getTimeScaleDisplay: function () {
        for (const [name, scale] of Object.entries(this.timeScales)) {
            if (Math.abs(this.timeScale - scale) < 0.01 * scale) {
                return name;
            }
        }
        return `${this.timeScale.toExponential(2)}x`;
    },

    /**
     * Start/Resume simulation
     */
    play: function () {
        this.isPlaying = true;
        this.lastUpdate = Date.now();
    },

    /**
     * Pause simulation
     */
    pause: function () {
        this.isPlaying = false;
    },

    /**
     * Toggle play/pause
     */
    togglePlay: function () {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
        return this.isPlaying;
    },

    /**
     * Reset to initial time
     */
    reset: function () {
        this.simTime = 0;
        this.isPlaying = false;
        this.lastUpdate = Date.now();
    },

    /**
     * Set to specific date
     */
    goToDate: function (year, month, day) {
        const date = new Date(year, month - 1, day);
        this.setDate(date);
    },

    /**
     * Jump forward by amount
     */
    jumpForward: function (amount, unit = 'days') {
        const multipliers = {
            'seconds': this.SECOND,
            'minutes': this.MINUTE,
            'hours': this.HOUR,
            'days': this.DAY,
            'weeks': this.DAY * 7,
            'months': this.DAY * 30.44,
            'years': this.DAY * 365.25
        };

        const multiplier = multipliers[unit] || this.DAY;
        this.simTime += amount * multiplier;
    },

    /**
     * Jump backward by amount
     */
    jumpBackward: function (amount, unit = 'days') {
        const multipliers = {
            'seconds': this.SECOND,
            'minutes': this.MINUTE,
            'hours': this.HOUR,
            'days': this.DAY,
            'weeks': this.DAY * 7,
            'months': this.DAY * 30.44,
            'years': this.DAY * 365.25
        };

        const multiplier = multipliers[unit] || this.DAY;
        this.simTime -= amount * multiplier;
        if (this.simTime < 0) this.simTime = 0;
    },

    /**
     * Update simulation time (call each frame)
     */
    update: function () {
        if (!this.isPlaying) return;

        const now = Date.now();
        const deltaMs = now - this.lastUpdate;
        this.lastUpdate = now;

        // Apply time scale
        this.simTime += deltaMs * this.timeScale;
    },

    /**
     * Get solar longitude (approximate)
     */
    getSolarLongitude: function () {
        // Approximate solar longitude based on time of year
        const daysSinceJ2000 = this.getDaysSinceJ2000();

        // Mean longitude of Sun
        const L = (280.460 + 0.9856474 * daysSinceJ2000) % 360;

        return L;
    },

    /**
     * Get season approximation (Northern Hemisphere)
     */
    getSeason: function () {
        const date = this.getDate();
        const month = date.getMonth();
        const day = date.getDate();

        // Approximate season boundaries
        if ((month === 3 && day >= 20) || (month === 4) || (month === 5) || (month === 6 && day < 21)) {
            return 'Spring';
        } else if ((month === 6 && day >= 21) || (month === 7) || (month === 8) || (month === 9 && day < 22)) {
            return 'Summer';
        } else if ((month === 9 && day >= 22) || (month === 10) || (month === 11) || (month === 12 && day < 21)) {
            return 'Fall';
        } else {
            return 'Winter';
        }
    },

    /**
     * Calculate Earth axial tilt (obliquity) for current epoch
     * Varies slowly over thousands of years
     */
    getEarthObliquity: function () {
        const daysSinceJ2000 = this.getDaysSinceJ2000();
        const centuries = daysSinceJ2000 / 36525;

        // IAU 1976 precession model (simplified)
        const obliquity = 23.439291 - 0.0130042 * centuries;

        return obliquity;
    },

    /**
     * Get moon phase (0-1, where 0=new, 0.5=full)
     */
    getMoonPhase: function () {
        // Simplified moon phase calculation
        const daysSinceJ2000 = this.getDaysSinceJ2000();
        const synodicMonth = 29.53058867; // days
        const phase = (daysSinceJ2000 % synodicMonth) / synodicMonth;

        return phase;
    },

    /**
     * Get moon phase name
     */
    getMoonPhaseName: function () {
        const phase = this.getMoonPhase();

        if (phase < 0.0625 || phase > 0.9375) return 'New Moon';
        if (phase < 0.1875) return 'Waxing Crescent';
        if (phase < 0.3125) return 'First Quarter';
        if (phase < 0.4375) return 'Waxing Gibbous';
        if (phase < 0.5625) return 'Full Moon';
        if (phase < 0.6875) return 'Waning Gibbous';
        if (phase < 0.8125) return 'Last Quarter';
        return 'Waning Crescent';
    }
};

// Make available globally
if (typeof window !== 'undefined') {
    window.TimeSystem = TimeSystem;
}
export default TimeSystem;
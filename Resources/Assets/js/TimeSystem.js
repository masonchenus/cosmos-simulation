/**
 * Time System - Simulation Time Management
 * Handles date/time calculations, time scales, and epochs
 */

const TimeSystem = {
    // Constants
    DAY: 86400000,
    HOUR: 3600000,
    MINUTE: 60000,
    SECOND: 1000,

    // J2000 Epoch reference
    J2000_EPOCH: new Date('2000-01-01T12:00:00Z'),
    J2000_JD: 2451545.0,

    // Current simulation time
    simTime: 0,
    timeScale: 1,
    isPlaying: false,
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

    init: function () {
        this.setDate(new Date());
        this.lastUpdate = Date.now();
    },

    setDate: function (date) {
        this.simTime = date.getTime() - this.J2000_EPOCH.getTime();
    },

    setJulianDate: function (jd) {
        this.simTime = (jd - this.J2000_JD) * this.DAY;
    },

    setDaysSinceJ2000: function (days) {
        this.simTime = days * this.DAY;
    },

    getDate: function () {
        return new Date(this.J2000_EPOCH.getTime() + this.simTime);
    },

    getJulianDate: function () {
        return this.J2000_JD + (this.simTime / this.DAY);
    },

    getDaysSinceJ2000: function () {
        return this.simTime / this.DAY;
    },

    formatDate: function (date) {
        var d = date || this.getDate();
        return d.toISOString().split('T')[0];
    },

    formatDateTime: function (date) {
        var d = date || this.getDate();
        return d.toISOString().slice(0, 19).replace('T', ' ');
    },

    formatRelativeTime: function () {
        var days = this.simTime / this.DAY;
        var years = days / 365.25;

        if (years >= 1000000) {
            return (years / 1000000).toFixed(1) + ' million years';
        } else if (years >= 1000) {
            return years.toFixed(0) + ' years';
        } else if (years >= 1) {
            return years.toFixed(2) + ' years';
        } else {
            return days.toFixed(1) + ' days';
        }
    },

    setTimeScale: function (scale) {
        this.timeScale = Math.max(0, scale);
    },

    setTimeScalePreset: function (presetName) {
        if (this.timeScales[presetName] !== undefined) {
            this.timeScale = this.timeScales[presetName];
            return true;
        }
        return false;
    },

    getTimeScale: function () {
        return this.timeScale;
    },

    getTimeScaleDisplay: function () {
        for (var name in this.timeScales) {
            if (Math.abs(this.timeScale - this.timeScales[name]) < 0.01 * this.timeScales[name]) {
                return name;
            }
        }
        return this.timeScale.toExponential(2) + 'x';
    },

    play: function () {
        this.isPlaying = true;
        this.lastUpdate = Date.now();
    },

    pause: function () {
        this.isPlaying = false;
    },

    togglePlay: function () {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
        return this.isPlaying;
    },

    reset: function () {
        this.simTime = 0;
        this.isPlaying = false;
        this.lastUpdate = Date.now();
    },

    goToDate: function (year, month, day) {
        var date = new Date(year, month - 1, day);
        this.setDate(date);
    },

    jumpForward: function (amount, unit) {
        unit = unit || 'days';
        var multipliers = {
            'seconds': this.SECOND,
            'minutes': this.MINUTE,
            'hours': this.HOUR,
            'days': this.DAY,
            'weeks': this.DAY * 7,
            'months': this.DAY * 30.44,
            'years': this.DAY * 365.25
        };

        var multiplier = multipliers[unit] || this.DAY;
        this.simTime += amount * multiplier;
    },

    jumpBackward: function (amount, unit) {
        unit = unit || 'days';
        var multipliers = {
            'seconds': this.SECOND,
            'minutes': this.MINUTE,
            'hours': this.HOUR,
            'days': this.DAY,
            'weeks': this.DAY * 7,
            'months': this.DAY * 30.44,
            'years': this.DAY * 365.25
        };

        var multiplier = multipliers[unit] || this.DAY;
        this.simTime -= amount * multiplier;
        if (this.simTime < 0) this.simTime = 0;
    },

    update: function () {
        if (!this.isPlaying) return;

        var now = Date.now();
        var deltaMs = now - this.lastUpdate;
        this.lastUpdate = now;

        this.simTime += deltaMs * this.timeScale;
    },

    getSolarLongitude: function () {
        var daysSinceJ2000 = this.getDaysSinceJ2000();
        var L = (280.460 + 0.9856474 * daysSinceJ2000) % 360;
        return L;
    },

    getSeason: function () {
        var date = this.getDate();
        var month = date.getMonth();
        var day = date.getDate();

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

    getEarthObliquity: function () {
        var daysSinceJ2000 = this.getDaysSinceJ2000();
        var centuries = daysSinceJ2000 / 36525;
        var obliquity = 23.439291 - 0.0130042 * centuries;
        return obliquity;
    },

    getMoonPhase: function () {
        var daysSinceJ2000 = this.getDaysSinceJ2000();
        var synodicMonth = 29.53058867;
        var phase = (daysSinceJ2000 % synodicMonth) / synodicMonth;
        return phase;
    },

    getMoonPhaseName: function () {
        var phase = this.getMoonPhase();

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

if (typeof window !== 'undefined') {
    window.TimeSystem = TimeSystem;
}

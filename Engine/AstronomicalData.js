/**
 * Astronomical Data - Solar System Parameters
 * Generated from NASA/JPL data sources
 * Run: node Scripts/fetchAstronomicalData.js to update
 */

const AstronomicalData = {
    AU: 149597870700,
    DAY: 86400,
    DEG2RAD: Math.PI / 180,
    RAD2DEG: 180 / Math.PI,
    J2000: new Date('2000-01-01T12:00:00Z'),

    Sun: {
        name: 'Sun',
        type: 'star',
        mass: 1.989e30,
        radius: 696340000,
        color: 0xFFDD00,
        emissive: 0xFFAA00,
        position: { x: 0, y: 0, z: 0 }
    },

    Planets: {
    Mercury: {
        name: "Mercury",
        type: "planet",
        parent: "Sun",
        a: 0.387,
        e: 0.206,
        i: 7,
        radius: 2440000,
        mass: 3.301e+23,
        period: 88,
        rotation: 1408,
        tilt: 0.03,
        color: 0xB5B5B5,
        moons: [],
        unconfirmedMoons: []
    },
    Venus: {
        name: "Venus",
        type: "planet",
        parent: "Sun",
        a: 0.723,
        e: 0.007,
        i: 3.4,
        radius: 6052000,
        mass: 4.867e+24,
        period: 225,
        rotation: -5833,
        tilt: 177,
        color: 0xE6C229,
        moons: [],
        unconfirmedMoons: []
    },
    Earth: {
        name: "Earth",
        type: "planet",
        parent: "Sun",
        a: 1,
        e: 0.017,
        i: 0,
        radius: 6371000,
        mass: 5.972e+24,
        period: 365,
        rotation: 24,
        tilt: 23.4,
        color: 0x6B93D6,
        moons: [
            "Moon"
        ],
        unconfirmedMoons: [
            "Cruithne",
            "2016_HO3"
        ]
    },
    Mars: {
        name: "Mars",
        type: "planet",
        parent: "Sun",
        a: 1.524,
        e: 0.093,
        i: 1.85,
        radius: 3390000,
        mass: 6.39e+23,
        period: 687,
        rotation: 24.6,
        tilt: 25.2,
        color: 0xC1440E,
        moons: [
            "Phobos",
            "Deimos"
        ],
        unconfirmedMoons: []
    },
    Jupiter: {
        name: "Jupiter",
        type: "planet",
        parent: "Sun",
        a: 5.203,
        e: 0.048,
        i: 1.3,
        radius: 69911000,
        mass: 1.898e+27,
        period: 4333,
        rotation: 9.9,
        tilt: 3.1,
        color: 0xD8CA9D,
        moons: [
            "Io",
            "Europa",
            "Ganymede",
            "Callisto"
        ],
        unconfirmedMoons: [
            "S/2003_J12",
            "S/2011_J2"
        ]
    },
    Saturn: {
        name: "Saturn",
        type: "planet",
        parent: "Sun",
        a: 9.537,
        e: 0.054,
        i: 2.49,
        radius: 58232000,
        mass: 5.683e+26,
        period: 10759,
        rotation: 10.7,
        tilt: 26.7,
        color: 0xEAD6B8,
        moons: [
            "Titan",
            "Rhea",
            "Iapetus",
            "Dione",
            "Tethys",
            "Enceladus",
            "Mimas"
        ],
        unconfirmedMoons: [
            "S/2004_S8",
            "S/2004_S9"
        ]
    },
    Uranus: {
        name: "Uranus",
        type: "planet",
        parent: "Sun",
        a: 19.19,
        e: 0.047,
        i: 0.77,
        radius: 25362000,
        mass: 8.681e+25,
        period: 30689,
        rotation: -17.2,
        tilt: 97.8,
        color: 0xD1E7E7,
        moons: [
            "Miranda",
            "Ariel",
            "Umbriel",
            "Titania",
            "Oberon"
        ],
        unconfirmedMoons: [
            "S/2001_Q1",
            "Perdita"
        ]
    },
    Neptune: {
        name: "Neptune",
        type: "planet",
        parent: "Sun",
        a: 30.07,
        e: 0.009,
        i: 1.77,
        radius: 24622000,
        mass: 1.024e+26,
        period: 60182,
        rotation: 16.1,
        tilt: 28.3,
        color: 0x5B5DDF,
        moons: [
            "Triton",
            "Proteus",
            "Nereid"
        ],
        unconfirmedMoons: [
            "S/2002_N1",
            "S/2003_N1"
        ]
    }
},

    Moons: {
    Moon: {
        name: "Moon",
        type: "moon",
        parent: "Earth",
        a: 384400,
        e: 0.055,
        i: 5.1,
        period: 27.3,
        radius: 1737000,
        mass: 7.34e+22,
        color: 0xAAAAAA
    },
    Phobos: {
        name: "Phobos",
        type: "moon",
        parent: "Mars",
        a: 9376,
        e: 0.015,
        i: 1.1,
        period: 0.32,
        radius: 11267,
        mass: 10700000000000000,
        color: 0x8B7355
    },
    Deimos: {
        name: "Deimos",
        type: "moon",
        parent: "Mars",
        a: 23458,
        e: 0.0002,
        i: 1.788,
        period: 1.263,
        radius: 6200,
        mass: 1480000000000000,
        color: 0x8B8378
    },
    Io: {
        name: "Io",
        type: "moon",
        parent: "Jupiter",
        a: 421700,
        e: 0.004,
        i: 0.04,
        period: 1.77,
        radius: 1821600,
        mass: 8.93e+22,
        color: 0xFFE135
    },
    Europa: {
        name: "Europa",
        type: "moon",
        parent: "Jupiter",
        a: 671034,
        e: 0.009,
        i: 0.47,
        period: 3.55,
        radius: 1560800,
        mass: 4.8e+22,
        color: 0xC9A659
    },
    Ganymede: {
        name: "Ganymede",
        type: "moon",
        parent: "Jupiter",
        a: 1070412,
        e: 0.001,
        i: 0.2,
        period: 7.15,
        radius: 2631200,
        mass: 1.48e+23,
        color: 0x8A8A8A
    },
    Callisto: {
        name: "Callisto",
        type: "moon",
        parent: "Jupiter",
        a: 1882709,
        e: 0.007,
        i: 0.19,
        period: 16.69,
        radius: 2410300,
        mass: 1.08e+23,
        color: 0x6E6E6E
    },
    Titan: {
        name: "Titan",
        type: "moon",
        parent: "Saturn",
        a: 1221870,
        e: 0.029,
        i: 0.31,
        period: 15.95,
        radius: 2574700,
        mass: 1.35e+23,
        color: 0xE8C776
    },
    Rhea: {
        name: "Rhea",
        type: "moon",
        parent: "Saturn",
        a: 527108,
        e: 0.001,
        i: 0.35,
        period: 4.52,
        radius: 763800,
        mass: 2.31e+21,
        color: 0xA8A8A8
    },
    Iapetus: {
        name: "Iapetus",
        type: "moon",
        parent: "Saturn",
        a: 3560820,
        e: 0.029,
        i: 15.5,
        period: 79.3,
        radius: 734500,
        mass: 1.81e+21,
        color: 0x8B8378
    },
    Dione: {
        name: "Dione",
        type: "moon",
        parent: "Saturn",
        a: 377396,
        e: 0.002,
        i: 0.02,
        period: 2.74,
        radius: 561400,
        mass: 1.1e+21,
        color: 0xB8B8B8
    },
    Tethys: {
        name: "Tethys",
        type: "moon",
        parent: "Saturn",
        a: 294619,
        e: 0.0001,
        i: 1.09,
        period: 1.89,
        radius: 531000,
        mass: 617000000000000000000,
        color: 0xB8B8B8
    },
    Enceladus: {
        name: "Enceladus",
        type: "moon",
        parent: "Saturn",
        a: 237948,
        e: 0.005,
        i: 0.01,
        period: 1.37,
        radius: 252100,
        mass: 108000000000000000000,
        color: 0xFFFFFF
    },
    Mimas: {
        name: "Mimas",
        type: "moon",
        parent: "Saturn",
        a: 185539,
        e: 0.02,
        i: 1.57,
        period: 0.94,
        radius: 198200,
        mass: 37500000000000000000,
        color: 0xB8B8B8
    },
    Miranda: {
        name: "Miranda",
        type: "moon",
        parent: "Uranus",
        a: 129390,
        e: 0.001,
        i: 4.23,
        period: 1.41,
        radius: 235800,
        mass: 65900000000000000000,
        color: 0xA8A8A8
    },
    Ariel: {
        name: "Ariel",
        type: "moon",
        parent: "Uranus",
        a: 191020,
        e: 0.001,
        i: 0.04,
        period: 2.52,
        radius: 578900,
        mass: 1.35e+21,
        color: 0xB8B8B8
    },
    Umbriel: {
        name: "Umbriel",
        type: "moon",
        parent: "Uranus",
        a: 266000,
        e: 0.004,
        i: 0.13,
        period: 4.14,
        radius: 584700,
        mass: 1.17e+21,
        color: 0x787878
    },
    Titania: {
        name: "Titania",
        type: "moon",
        parent: "Uranus",
        a: 435910,
        e: 0.001,
        i: 0.08,
        period: 8.71,
        radius: 788400,
        mass: 3.53e+21,
        color: 0xA8A8A8
    },
    Oberon: {
        name: "Oberon",
        type: "moon",
        parent: "Uranus",
        a: 583520,
        e: 0.001,
        i: 0.07,
        period: 13.46,
        radius: 761400,
        mass: 3.01e+21,
        color: 0x8B8B8B
    },
    Triton: {
        name: "Triton",
        type: "moon",
        parent: "Neptune",
        a: 354759,
        e: 0.00002,
        i: 157,
        period: -5.88,
        radius: 1353400,
        mass: 2.14e+22,
        color: 0xB5B5B5
    },
    Proteus: {
        name: "Proteus",
        type: "moon",
        parent: "Neptune",
        a: 117646,
        e: 0.0005,
        i: 0.03,
        period: 1.12,
        radius: 210000,
        mass: 44000000000000000000,
        color: 0x787878
    },
    Nereid: {
        name: "Nereid",
        type: "moon",
        parent: "Neptune",
        a: 5513400,
        e: 0.751,
        i: 32.6,
        period: 360.1,
        radius: 170000,
        mass: 27000000000000000000,
        color: 0x787878
    }
},

    Comets: {
    Halley: {
        name: "Halley's Comet",
        type: "comet",
        parent: "Sun",
        a: 17.8,
        e: 0.967,
        i: 162.3,
        period: 27500,
        radius: 5500,
        color: 0xFFFFFF,
        tailColor: 0x88CCFF
    },
    HaleBopp: {
        name: "Comet Hale-Bopp",
        type: "comet",
        parent: "Sun",
        a: 186,
        e: 0.995,
        i: 89.4,
        period: 10600,
        radius: 30000,
        color: 0x88CCFF,
        tailColor: 0xAADDFF
    },
    Encke: {
        name: "Comet Encke",
        type: "comet",
        parent: "Sun",
        a: 2.21,
        e: 0.847,
        i: 11.8,
        period: 1206,
        radius: 2400,
        color: 0xFFFFFF,
        tailColor: 0xAADDFF
    },
    SwiftTuttle: {
        name: "Comet Swift-Tuttle",
        type: "comet",
        parent: "Sun",
        a: 26.09,
        e: 0.963,
        i: 113.5,
        period: 13328,
        radius: 13500,
        color: 0xFFFFFF,
        tailColor: 0xAADDFF
    },
    TempelTuttle: {
        name: "Comet Tempel-Tuttle",
        type: "comet",
        parent: "Sun",
        a: 10.33,
        e: 0.905,
        i: 162.5,
        period: 3232,
        radius: 2300,
        color: 0xFFFFFF,
        tailColor: 0xAADDFF
    }
},

    Meteors: {
    Perseids: {
        name: "Perseids",
        type: "meteor",
        parent: "Sun",
        radiant: {
            ra: 3.1,
            dec: 58
        },
        peakDate: "August 12",
        zhr: 100,
        parentComet: "SwiftTuttle",
        color: 0xFFFFFF
    },
    Leonids: {
        name: "Leonids",
        type: "meteor",
        parent: "Sun",
        radiant: {
            ra: 10.15,
            dec: 22
        },
        peakDate: "November 17",
        zhr: 15,
        parentComet: "TempelTuttle",
        color: 0xFFFFFF
    },
    Quadrantids: {
        name: "Quadrantids",
        type: "meteor",
        parent: "Sun",
        radiant: {
            ra: 15.3,
            dec: 49
        },
        peakDate: "January 3",
        zhr: 120,
        parentComet: "2003_EH1",
        color: 0xFFFFFF
    },
    Geminids: {
        name: "Geminids",
        type: "meteor",
        parent: "Sun",
        radiant: {
            ra: 7.55,
            dec: 33
        },
        peakDate: "December 13",
        zhr: 150,
        parentComet: "3200_Phaethon",
        color: 0xFFFFFF
    },
    Orionids: {
        name: "Orionids",
        type: "meteor",
        parent: "Sun",
        radiant: {
            ra: 6.4,
            dec: 16
        },
        peakDate: "October 21",
        zhr: 20,
        parentComet: "Halley",
        color: 0xFFFFFF
    },
    EtaAquariids: {
        name: "Eta Aquariids",
        type: "meteor",
        parent: "Sun",
        radiant: {
            ra: 22.5,
            dec: -1
        },
        peakDate: "May 5",
        zhr: 50,
        parentComet: "Halley",
        color: 0xFFFFFF
    }
},

    getAllBodies: function() {
        const bodies = { 'Sun': this.Sun };
        Object.entries(this.Planets).forEach(([n, d]) => bodies[n] = d);
        Object.entries(this.Moons).forEach(([n, d]) => bodies[n] = d);
        Object.entries(this.Comets).forEach(([n, d]) => bodies[n] = d);
        Object.entries(this.Meteors).forEach(([n, d]) => bodies[n] = d);
        return bodies;
    },

    getMoonsForPlanet: function(planetName) {
        const p = this.Planets[planetName];
        if (!p || !p.moons) return [];
        return p.moons.map(n => this.Moons[n]).filter(Boolean);
    },

    getUnconfirmedMoonsForPlanet: function(planetName) {
        const p = this.Planets[planetName];
        if (!p || !p.unconfirmedMoons) return [];
        return p.unconfirmedMoons.map(n => ({ name: n, type: 'unconfirmed_moon', parent: planetName, confirmed: false }));
    }
};

if (typeof window !== 'undefined') window.AstronomicalData = AstronomicalData;

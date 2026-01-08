/**
 * Astronomical Data - Ultra Accurate Solar System Parameters
 * Based on NASA JPL Horizons System Data (J2000 Epoch)
 * All orbital elements are referenced to J2000.0 epoch
 */

const AstronomicalData = {
    // Constants
    AU: 149597870700, // Astronomical Unit in meters
    DAY: 86400, // Seconds per day
    DEG2RAD: Math.PI / 180,
    RAD2DEG: 180 / Math.PI,

    // Reference epoch
    J2000: new Date('2000-01-01T12:00:00Z'),

    /**
     * Sun - The central star
     */
    Sun: {
        name: 'Sun',
        type: 'star',
        mass: 1.989e30, // kg
        radius: 696340000, // meters
        color: 0xFFDD00,
        emissive: 0xFFAA00,
        position: { x: 0, y: 0, z: 0 }
    },

    /**
     * Planets - Orbital Elements (J2000)
     * a: semi-major axis (AU)
     * e: eccentricity
     * i: inclination (degrees)
     * L: mean longitude (degrees)
     * w: longitude of perihelion (degrees)
     * node: longitude of ascending node (degrees)
     * period: orbital period (days)
     * rotation: rotation period (hours)
     * tilt: axial tilt (degrees)
     */
    Planets: {
        Mercury: {
            name: 'Mercury',
            type: 'planet',
            parent: 'Sun',
            // J2000 orbital elements
            a: 0.38709927, // semi-major axis (AU)
            e: 0.20563593, // eccentricity
            i: 7.00497902, // inclination (deg)
            L: 252.25032350, // mean longitude (deg)
            w: 77.45779628, // longitude of perihelion (deg)
            node: 48.33076593, // longitude of ascending node (deg)
            // Physical properties
            radius: 2439700, // meters
            mass: 3.301e23, // kg
            period: 87.969, // orbital period (days)
            rotation: 1407.6, // rotation period (hours)
            tilt: 0.034, // axial tilt (deg)
            color: 0xB5B5B5,
            moons: [],
            description: 'Smallest planet, closest to the Sun'
        },

        Venus: {
            name: 'Venus',
            type: 'planet',
            parent: 'Sun',
            a: 0.72333566,
            e: 0.00677672,
            i: 3.39467605,
            L: 181.97909950,
            w: 131.60246718,
            node: 76.67984255,
            radius: 6051800,
            mass: 4.867e24,
            period: 224.701,
            rotation: -5832.5, // retrograde rotation
            tilt: 177.3,
            color: 0xE6C229,
            moons: [],
            description: 'Hottest planet, Earth\'s sister'
        },

        Earth: {
            name: 'Earth',
            type: 'planet',
            parent: 'Sun',
            a: 1.00000261,
            e: 0.01671123,
            i: -0.00001531,
            L: 100.46457166,
            w: 102.93768193,
            node: 0.0,
            radius: 6371000,
            mass: 5.972e24,
            period: 365.256,
            rotation: 23.934,
            tilt: 23.439,
            color: 0x6B93D6,
            moons: ['Moon'],
            description: 'Our home planet'
        },

        Mars: {
            name: 'Mars',
            type: 'planet',
            parent: 'Sun',
            a: 1.52371034,
            e: 0.09339410,
            i: 1.84969142,
            L: -4.55343205,
            w: -23.94362959,
            node: 49.55953891,
            radius: 3389500,
            mass: 6.39e23,
            period: 686.980,
            rotation: 24.6229,
            tilt: 25.19,
            color: 0xC1440E,
            moons: ['Phobos', 'Deimos'],
            description: 'The Red Planet'
        },

        Jupiter: {
            name: 'Jupiter',
            type: 'planet',
            parent: 'Sun',
            a: 5.20288700,
            e: 0.04838624,
            i: 1.30439695,
            L: 34.39644051,
            w: 14.72832069,
            node: 100.47390909,
            radius: 69911000,
            mass: 1.898e27,
            period: 4332.59,
            rotation: 9.925,
            tilt: 3.13,
            color: 0xD8CA9D,
            moons: ['Io', 'Europa', 'Ganymede', 'Callisto', 'Amalthea', 'Thebe', 'Adrastea', 'Metis'],
            description: 'Largest planet, gas giant'
        },

        Saturn: {
            name: 'Saturn',
            type: 'planet',
            parent: 'Sun',
            a: 9.53667594,
            e: 0.05386179,
            i: 2.48599187,
            L: 49.95424423,
            w: 92.59887831,
            node: 113.66242448,
            radius: 58232000,
            mass: 5.683e26,
            period: 10759.22,
            rotation: 10.656,
            tilt: 26.73,
            color: 0xEAD6B8,
            hasRings: true,
            moons: ['Titan', 'Rhea', 'Iapetus', 'Dione', 'Tethys', 'Enceladus', 'Mimas', 'Hyperion', 'Phoebe', 'Janus', 'Epimetheus', 'Pandora', 'Prometheus', 'Helene', 'Telesto', 'Calypso'],
            description: 'Ringed gas giant'
        },

        Uranus: {
            name: 'Uranus',
            type: 'planet',
            parent: 'Sun',
            a: 19.18916464,
            e: 0.04725744,
            i: 0.77263783,
            L: 313.23810451,
            w: 170.95427630,
            node: 74.01692503,
            radius: 25362000,
            mass: 8.681e25,
            period: 30688.5,
            rotation: -17.24, // retrograde
            tilt: 97.77,
            color: 0xD1E7E7,
            moons: ['Miranda', 'Ariel', 'Umbriel', 'Titania', 'Oberon', 'Puck', 'Portia', 'Juliet', 'Belinda', 'Cressida', 'Ophelia', 'Bianca'],
            description: 'Ice giant, rotates on its side'
        },

        Neptune: {
            name: 'Neptune',
            type: 'planet',
            parent: 'Sun',
            a: 30.06992276,
            e: 0.00859048,
            i: 1.77004347,
            L: -55.12002969,
            w: 44.96476227,
            node: 131.78422574,
            radius: 24622000,
            mass: 1.024e26,
            period: 60182.0,
            rotation: 16.11,
            tilt: 28.32,
            color: 0x5B5DDF,
            moons: ['Triton', 'Proteus', 'Nereid', 'Larissa', 'Galateia', 'Despina', 'Thalassa', 'Naiad'],
            description: 'Windiest planet, ice giant'
        },

        Pluto: {
            name: 'Pluto',
            type: 'dwarf_planet',
            parent: 'Sun',
            a: 39.48211675,
            e: 0.24882730,
            i: 17.50001208,
            L: 238.92903833,
            w: 113.83518709,
            node: 110.30393684,
            radius: 1188300,
            mass: 1.303e22,
            period: 90560.0,
            rotation: -153.3,
            tilt: 122.53,
            color: 0xDECBB7,
            moons: ['Charon', 'Nix', 'Hydra', 'Kerberos', 'Styx'],
            description: 'Dwarf planet in the Kuiper Belt'
        }
    },

    /**
     * Major Moons - Accurate orbital data relative to their parent planet
     * Period, a (semi-major axis in km), e (eccentricity), i (inclination in deg)
     */
    Moons: {
        // Earth's Moon
        Moon: {
            name: 'Moon',
            type: 'moon',
            parent: 'Earth',
            a: 384400, // km from Earth
            e: 0.0549,
            i: 5.145,
            L: 115.3654,
            w: 318.15,
            node: 125.08,
            period: 27.321661, // days
            radius: 1737100,
            mass: 7.342e22,
            rotation: 655.728, // hours (synchronous)
            tilt: 6.68,
            color: 0xAAAAAA,
            description: 'Earth\'s natural satellite'
        },

        // Mars Moons
        Phobos: {
            name: 'Phobos',
            type: 'moon',
            parent: 'Mars',
            a: 9376,
            e: 0.0151,
            i: 1.093,
            period: 0.3189,
            radius: 11267,
            mass: 1.0659e16,
            color: 0x8B7355,
            description: 'Larger moon of Mars'
        },
        Deimos: {
            name: 'Deimos',
            type: 'moon',
            parent: 'Mars',
            a: 23458,
            e: 0.0002,
            i: 1.788,
            period: 1.263,
            radius: 6200,
            mass: 1.4762e15,
            color: 0x8B8378,
            description: 'Smaller moon of Mars'
        },

        // Jupiter Moons (Galilean + major)
        Io: {
            name: 'Io',
            type: 'moon',
            parent: 'Jupiter',
            a: 421700,
            e: 0.0041,
            i: 0.036,
            period: 1.769137786,
            radius: 1821600,
            mass: 8.9319e22,
            color: 0xFFE135,
            description: 'Most volcanically active body in Solar System'
        },
        Europa: {
            name: 'Europa',
            type: 'moon',
            parent: 'Jupiter',
            a: 671034,
            e: 0.009,
            i: 0.470,
            period: 3.551181,
            radius: 1560800,
            mass: 4.7998e22,
            color: 0xC9A659,
            description: 'May harbor subsurface ocean'
        },
        Ganymede: {
            name: 'Ganymede',
            type: 'moon',
            parent: 'Jupiter',
            a: 1070412,
            e: 0.0013,
            i: 0.195,
            period: 7.154553,
            radius: 2631200,
            mass: 1.4819e23,
            color: 0x8A8A8A,
            description: 'Largest moon in Solar System'
        },
        Callisto: {
            name: 'Callisto',
            type: 'moon',
            parent: 'Jupiter',
            a: 1882709,
            e: 0.0074,
            i: 0.193,
            period: 16.689018,
            radius: 2410300,
            mass: 1.0759e23,
            color: 0x6E6E6E,
            description: 'Most heavily cratered object'
        },
        Amalthea: {
            name: 'Amalthea',
            type: 'moon',
            parent: 'Jupiter',
            a: 181365,
            e: 0.0031,
            i: 0.374,
            period: 0.498,
            radius: 83500,
            mass: 2.08e18,
            color: 0x9C7C58,
            description: 'Reddish irregular moon'
        },
        Thebe: {
            name: 'Thebe',
            type: 'moon',
            parent: 'Jupiter',
            a: 221889,
            e: 0.0176,
            i: 1.076,
            period: 0.674,
            radius: 49200,
            mass: 1.5e18,
            color: 0x8B7355,
            description: 'Small inner moon'
        },

        // Saturn Moons
        Titan: {
            name: 'Titan',
            type: 'moon',
            parent: 'Saturn',
            a: 1221870,
            e: 0.0288,
            i: 0.312,
            period: 15.945,
            radius: 2574700,
            mass: 1.3452e23,
            color: 0xE8C776,
            description: 'Only moon with dense atmosphere'
        },
        Rhea: {
            name: 'Rhea',
            type: 'moon',
            parent: 'Saturn',
            a: 527108,
            e: 0.0012583,
            i: 0.348,
            period: 4.518,
            radius: 763800,
            mass: 2.3065e21,
            color: 0xA8A8A8,
            description: 'Second largest moon of Saturn'
        },
        Iapetus: {
            name: 'Iapetus',
            type: 'moon',
            parent: 'Saturn',
            a: 3560820,
            e: 0.0286135,
            i: 15.47,
            period: 79.3215,
            radius: 734500,
            mass: 1.8056e21,
            color: 0x8B8378,
            description: 'Two-toned moon'
        },
        Dione: {
            name: 'Dione',
            type: 'moon',
            parent: 'Saturn',
            a: 377396,
            e: 0.0022,
            i: 0.019,
            period: 2.737,
            radius: 561400,
            mass: 1.0954e21,
            color: 0xB8B8B8,
            description: 'Trailing Trojan of Enceladus'
        },
        Tethys: {
            name: 'Tethys',
            type: 'moon',
            parent: 'Saturn',
            a: 294619,
            e: 0.0001,
            i: 1.091,
            period: 1.888,
            radius: 531000,
            mass: 6.1746e20,
            color: 0xB8B8B8,
            description: 'Large icy moon'
        },
        Enceladus: {
            name: 'Enceladus',
            type: 'moon',
            parent: 'Saturn',
            a: 237948,
            e: 0.0047,
            i: 0.009,
            period: 1.370,
            radius: 252100,
            mass: 1.08e20,
            color: 0xFFFFFF,
            description: 'Active ice geysers'
        },
        Mimas: {
            name: 'Mimas',
            type: 'moon',
            parent: 'Saturn',
            a: 185539,
            e: 0.0196,
            i: 1.574,
            period: 0.942,
            radius: 198200,
            mass: 3.7493e19,
            color: 0xB8B8B8,
            description: 'Death Star moon'
        },
        Hyperion: {
            name: 'Hyperion',
            type: 'moon',
            parent: 'Saturn',
            a: 1481004,
            e: 0.1042,
            i: 0.568,
            period: 21.277,
            radius: 135000,
            mass: 5.6199e18,
            color: 0x8B8378,
            description: 'Tumbling irregular moon'
        },
        Phoebe: {
            name: 'Phoebe',
            type: 'moon',
            parent: 'Saturn',
            a: 12952784,
            e: 0.1563,
            i: 173.0,
            period: 548.2,
            radius: 106500,
            mass: 8.2926e18,
            color: 0x6E6E6E,
            description: 'Retrograde irregular moon'
        },

        // Uranus Moons
        Miranda: {
            name: 'Miranda',
            type: 'moon',
            parent: 'Uranus',
            a: 129390,
            e: 0.0013,
            i: 4.232,
            period: 1.413,
            radius: 235800,
            mass: 6.59e19,
            color: 0xA8A8A8,
            description: 'Most geologically varied'
        },
        Ariel: {
            name: 'Ariel',
            type: 'moon',
            parent: 'Uranus',
            a: 191020,
            e: 0.0012,
            i: 0.042,
            period: 2.52,
            radius: 578900,
            mass: 1.35e21,
            color: 0xB8B8B8,
            description: 'Brightest Uranian moon'
        },
        Umbriel: {
            name: 'Umbriel',
            type: 'moon',
            parent: 'Uranus',
            a: 266000,
            e: 0.0039,
            i: 0.128,
            period: 4.144,
            radius: 584700,
            mass: 1.17e21,
            color: 0x787878,
            description: 'Darkest major moon'
        },
        Titania: {
            name: 'Titania',
            type: 'moon',
            parent: 'Uranus',
            a: 435910,
            e: 0.0011,
            i: 0.079,
            period: 8.706,
            radius: 788400,
            mass: 3.527e21,
            color: 0xA8A8A8,
            description: 'Largest moon of Uranus'
        },
        Oberon: {
            name: 'Oberon',
            type: 'moon',
            parent: 'Uranus',
            a: 583520,
            e: 0.0014,
            i: 0.072,
            period: 13.463,
            radius: 761400,
            mass: 3.014e21,
            color: 0x8B8B8B,
            description: 'Outermost major moon'
        },

        // Neptune Moons
        Triton: {
            name: 'Triton',
            type: 'moon',
            parent: 'Neptune',
            a: 354759,
            e: 0.000016,
            i: 156.885,
            period: -5.877, // retrograde
            radius: 1353400,
            mass: 2.14e22,
            color: 0xB5B5B5,
            description: 'Captured Kuiper Belt object'
        },
        Proteus: {
            name: 'Proteus',
            type: 'moon',
            parent: 'Neptune',
            a: 117646,
            e: 0.0005,
            i: 0.026,
            period: 1.122,
            radius: 210000,
            mass: 4.4e19,
            color: 0x787878,
            description: 'Irregular shaped moon'
        },
        Nereid: {
            name: 'Nereid',
            type: 'moon',
            parent: 'Neptune',
            a: 5513400,
            e: 0.7507,
            i: 32.55,
            period: 360.13,
            radius: 170000,
            mass: 2.7e19,
            color: 0x787878,
            description: 'Highly eccentric orbit'
        },

        // Pluto Moons
        Charon: {
            name: 'Charon',
            type: 'moon',
            parent: 'Pluto',
            a: 19571,
            e: 0.00005,
            i: 0.08,
            period: 6.387,
            radius: 606000,
            mass: 1.586e21,
            color: 0x8B7355,
            description: 'Largest moon relative to parent'
        },
        Nix: {
            name: 'Nix',
            type: 'moon',
            parent: 'Pluto',
            a: 48694,
            e: 0.0000,
            i: 0.195,
            period: 24.854,
            radius: 22500,
            mass: 1.9e16,
            color: 0xB8B8B8,
            description: 'Irregular moon'
        },
        Hydra: {
            name: 'Hydra',
            type: 'moon',
            parent: 'Pluto',
            a: 64738,
            e: 0.0000,
            i: 0.242,
            period: 38.202,
            radius: 22500,
            mass: 1.9e16,
            color: 0xB8B8B8,
            description: 'Outermost moon'
        },
        Kerberos: {
            name: 'Kerberos',
            type: 'moon',
            parent: 'Pluto',
            a: 57783,
            e: 0.0000,
            i: 0.437,
            period: 32.167,
            radius: 10000,
            mass: 3e15,
            color: 0x6E6E6E,
            description: 'Tiny irregular moon'
        },
        Styx: {
            name: 'Styx',
            type: 'moon',
            parent: 'Pluto',
            a: 42656,
            e: 0.0000,
            i: 0.809,
            period: 20.161,
            radius: 9000,
            mass: 1.5e15,
            color: 0x787878,
            description: 'Innermost small moon'
        }
    },

    /**
     * Major Asteroids
     */
    Asteroids: {
        Ceres: {
            name: 'Ceres',
            type: 'dwarf_planet',
            parent: 'Sun',
            a: 2.767,
            e: 0.0758,
            i: 10.59,
            period: 1680,
            radius: 473000,
            mass: 9.393e20,
            color: 0x8B8B7A,
            description: 'Largest asteroid in main belt'
        },
        Vesta: {
            name: 'Vesta',
            type: 'asteroid',
            parent: 'Sun',
            a: 2.361,
            e: 0.0887,
            i: 7.14,
            period: 1326,
            radius: 262000,
            mass: 2.59e20,
            color: 0x8B7355,
            description: 'Brightest asteroid'
        },
        Pallas: {
            name: 'Pallas',
            type: 'asteroid',
            parent: 'Sun',
            a: 2.772,
            e: 0.2313,
            i: 34.84,
            period: 1685,
            radius: 256000,
            mass: 2.04e20,
            color: 0x6E7B8B,
            description: 'Second largest asteroid'
        },
        Hygiea: {
            name: 'Hygiea',
            type: 'asteroid',
            parent: 'Sun',
            a: 3.142,
            e: 0.112,
            i: 3.83,
            period: 2033,
            radius: 215000,
            mass: 8.67e19,
            color: 0x787878,
            description: 'Fourth largest asteroid'
        },
        Interamnia: {
            name: 'Interamnia',
            type: 'asteroid',
            parent: 'Sun',
            a: 2.987,
            e: 0.0955,
            i: 17.62,
            period: 1888,
            radius: 156000,
            mass: 6.1e19,
            color: 0x787878,
            description: 'Fifth largest asteroid'
        },
        Europa: {
            name: 'Europa',
            type: 'asteroid',
            parent: 'Sun',
            a: 3.096,
            e: 0.103,
            i: 7.47,
            period: 1996,
            radius: 156000,
            mass: 5.2e19,
            color: 0x8B8378,
            description: 'Large asteroid'
        },
        Davida: {
            name: 'Davida',
            type: 'asteroid',
            parent: 'Sun',
            a: 3.163,
            e: 0.187,
            i: 15.94,
            period: 2054,
            radius: 150000,
            mass: 5.9e19,
            color: 0x787878,
            description: 'Large C-type asteroid'
        },
        Sylvia: {
            name: 'Sylvia',
            type: 'asteroid',
            parent: 'Sun',
            a: 3.486,
            e: 0.0902,
            i: 10.86,
            period: 2380,
            radius: 142000,
            mass: 1.5e19,
            color: 0x6E6E6E,
            description: 'Triple asteroid system'
        },
        Cybele: {
            name: 'Cybele',
            type: 'asteroid',
            parent: 'Sun',
            a: 3.428,
            e: 0.1106,
            i: 3.55,
            period: 2319,
            radius: 138000,
            mass: 5.5e18,
            color: 0x787878,
            description: 'Large outer belt asteroid'
        },
        Juno: {
            name: 'Juno',
            type: 'asteroid',
            parent: 'Sun',
            a: 2.669,
            e: 0.2553,
            i: 12.98,
            period: 1594,
            radius: 122000,
            mass: 2.67e19,
            color: 0x8B7355,
            description: 'Third largest asteroid'
        }
    },

    /**
     * Dwarf Planets (beyond Neptune)
     */
    DwarfPlanets: {
        Eris: {
            name: 'Eris',
            type: 'dwarf_planet',
            parent: 'Sun',
            a: 67.78,
            e: 0.4407,
            i: 44.04,
            period: 203830,
            radius: 1162600,
            mass: 1.66e22,
            color: 0xD8D8D8,
            description: 'Most massive dwarf planet'
        },
        Haumea: {
            name: 'Haumea',
            type: 'dwarf_planet',
            parent: 'Sun',
            a: 43.218,
            e: 0.1912,
            i: 28.19,
            period: 103880,
            radius: 780000,
            mass: 4.01e21,
            color: 0xE8E8E8,
            description: 'Egg-shaped dwarf planet'
        },
        Makemake: {
            name: 'Makemake',
            type: 'dwarf_planet',
            parent: 'Sun',
            a: 45.71,
            e: 0.159,
            i: 29.00,
            period: 113150,
            radius: 715000,
            mass: 3.1e21,
            color: 0xD8C8B8,
            description: 'Third largest dwarf planet'
        },
        Sedna: {
            name: 'Sedna',
            type: 'dwarf_planet',
            parent: 'Sun',
            a: 506.8,
            e: 0.855,
            i: 11.93,
            period: 4404480,
            radius: 500000,
            mass: 1e21,
            color: 0xB22222,
            description: 'Most distant known object'
        },
        Quaoar: {
            name: 'Quaoar',
            type: 'dwarf_planet',
            parent: 'Sun',
            a: 43.69,
            e: 0.0388,
            i: 8.52,
            period: 105642,
            radius: 555000,
            mass: 1.4e21,
            color: 0x8B7355,
            description: 'Large Kuiper Belt object'
        },
        Orcus: {
            name: 'Orcus',
            type: 'dwarf_planet',
            parent: 'Sun',
            a: 39.17,
            e: 0.225,
            i: 20.55,
            period: 89610,
            radius: 458000,
            mass: 6.2e20,
            color: 0x787878,
            description: 'Plutino object'
        }
    },

    /**
     * Comets
     */
    Comets: {
        Halley: {
            name: 'Halley\'s Comet',
            type: 'comet',
            parent: 'Sun',
            a: 17.8,
            e: 0.967,
            i: 162.26,
            period: 27500,
            radius: 5500,
            color: 0xFFFFFF,
            tailColor: 0x88CCFF,
            description: 'Most famous periodic comet'
        },
        HaleBopp: {
            name: 'Comet Hale-Bopp',
            type: 'comet',
            parent: 'Sun',
            a: 186,
            e: 0.995,
            i: 89.4,
            period: 10600,
            radius: 30000,
            color: 0x88CCFF,
            tailColor: 0xAADDFF,
            description: 'Great comet of 1997'
        },
        Encke: {
            name: 'Comet Encke',
            type: 'comet',
            parent: 'Sun',
            a: 2.21,
            e: 0.847,
            i: 11.78,
            period: 1206,
            radius: 2400,
            color: 0xFFFFFF,
            tailColor: 0xAADDFF,
            description: 'Shortest period comet'
        }
    },

    /**
     * Get all celestial bodies organized by type
     */
    getAllBodies: function () {
        const bodies = {};

        // Add Sun
        bodies['Sun'] = this.Sun;

        // Add planets
        for (const [name, data] of Object.entries(this.Planets)) {
            bodies[name] = data;
        }

        // Add moons
        for (const [name, data] of Object.entries(this.Moons)) {
            bodies[name] = data;
        }

        // Add asteroids
        for (const [name, data] of Object.entries(this.Asteroids)) {
            bodies[name] = data;
        }

        // Add dwarf planets
        for (const [name, data] of Object.entries(this.DwarfPlanets)) {
            bodies[name] = data;
        }

        // Add comets
        for (const [name, data] of Object.entries(this.Comets)) {
            bodies[name] = data;
        }

        return bodies;
    },

    /**
     * Get bodies by category
     */
    getBodiesByType: function (type) {
        const result = {};
        const allBodies = this.getAllBodies();

        for (const [name, data] of Object.entries(allBodies)) {
            if (data.type === type) {
                result[name] = data;
            }
        }

        return result;
    },

    /**
     * Get moons for a specific planet
     */
    getMoonsForPlanet: function (planetName) {
        const planet = this.Planets[planetName];
        if (!planet || !planet.moons) return [];

        return planet.moons.map(name => this.Moons[name]).filter(Boolean);
    },

    /**
     * Get parent body for a moon
     */
    getParentBody: function (moonName) {
        const moon = this.Moons[moonName];
        if (!moon) return null;

        // Check if parent is Sun
        if (moon.parent === 'Sun') return this.Sun;

        // Check planets
        if (this.Planets[moon.parent]) return this.Planets[moon.parent];

        // Check dwarf planets (like Pluto)
        if (this.DwarfPlanets[moon.parent]) return this.DwarfPlanets[moon.parent];

        return null;
    }
};

// Make available globally
if (typeof window !== 'undefined') {
    window.AstronomicalData = AstronomicalData;
}

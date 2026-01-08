/**
 * Vendor Libraries Stub
 * Three.js and OrbitControls are loaded from CDN in index.html
 * 
 * This file provides fallbacks if CDN loading fails
 */

// Check if Three.js is available
(function () {
    'use strict';

    var checkThreeInterval;

    function checkThree() {
        if (typeof THREE !== 'undefined') {
            console.log('Three.js loaded successfully: v' + THREE.REVISION);
            clearInterval(checkThreeInterval);
            return true;
        }
        return false;
    }

    // Start checking immediately
    if (!checkThree()) {
        // Wait up to 10 seconds for Three.js to load
        var timeout = 0;
        checkThreeInterval = setInterval(function () {
            timeout += 100;
            if (timeout > 10000) {
                clearInterval(checkThreeInterval);
                console.error('Three.js failed to load from CDN');
                showVendorError();
            }
            checkThree();
        }, 100);
    }

    function showVendorError() {
        var loading = document.getElementById('loading');
        if (loading) {
            loading.querySelector('p').textContent = 'Error: Three.js failed to load. Please check your internet connection and refresh.';
            loading.querySelector('.spinner').style.display = 'none';
        }
    }

    // Polyfills for older browsers
    if (!Array.prototype.includes) {
        Array.prototype.includes = function (searchElement, fromIndex) {
            'use strict';
            var O = Object(this);
            var len = O.length >>> 0;
            if (len === 0) return false;
            var n = fromIndex | 0;
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
            while (k < len) {
                if (O[k] === searchElement) return true;
                k++;
            }
            return false;
        };
    }

    if (!String.prototype.includes) {
        String.prototype.includes = function (search, start) {
            'use strict';
            if (typeof start !== 'number') start = 0;
            if (start + search.length > this.length) return false;
            return this.indexOf(search, start) !== -1;
        };
    }

    if (!Object.keys) {
        Object.keys = function (obj) {
            var keys = [];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) keys.push(key);
            }
            return keys;
        };
    }

    console.log('Vendor stub initialized');
})();

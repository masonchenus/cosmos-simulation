# Events API Reference

Event system documentation for the Cosmos Simulation.

## Overview

The Cosmos Simulation uses a custom event system for communication between components. Events enable loose coupling between the physics engine, renderer, time system, and UI.

```
┌─────────────────────────────────────────────────────────────────┐
│                      EVENT FLOW DIAGRAM                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐       │
│  │   Source    │────►│   Event     │────►│   Handler   │       │
│  │  Component  │     │   Bus       │     │  Function   │       │
│  └─────────────┘     └─────────────┘     └─────────────┘       │
│                                                                 │
│  Example:                                                       │
│                                                                 │
│  TimeSystem      COSMOS_EVENTS.TIME_CHANGED       UI Component │
│  .update()  ──►  { detail: { simTime } }  ──►  updates display │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Event Types

### Time Events

```javascript
const TIME_EVENTS = {
    /**
     * Fired when simulation time changes
     * Detail: { simTime: number, daysSinceJ2000: number }
     */
    TIME_CHANGED: 'cosmos:time-changed',
    
    /**
     * Fired when time scale changes
     * Detail: { timeScale: number, previousScale: number }
     */
    TIME_SCALE_CHANGED: 'cosmos:time-scale-changed',
    
    /**
     * Fired when play state changes
     * Detail: { isPlaying: boolean }
     */
    PLAY_STATE_CHANGED: 'cosmos:play-state-changed',
    
    /**
     * Fired when simulation is reset
     * Detail: { previousTime: number }
     */
    TIME_RESET: 'cosmos:time-reset'
};
```

### Body Events

```javascript
const BODY_EVENTS = {
    /**
     * Fired when a celestial body is selected
     * Detail: { bodyName: string, bodyData: object, position: Vector3 }
     */
    BODY_SELECTED: 'cosmos:body-selected',
    
    /**
     * Fired when body selection is cleared
     * Detail: { previousBody: string }
     */
    BODY_DESELECTED: 'cosmos:body-deselected',
    
    /**
     * Fired when body position updates
     * Detail: { bodyName: string, position: Vector3, time: number }
     */
    BODY_POSITION_UPDATED: 'cosmos:body-position-updated',
    
    /**
     * Fired when body visibility changes
     * Detail: { bodyName: string, visible: boolean }
     */
    BODY_VISIBILITY_CHANGED: 'cosmos:body-visibility-changed'
};
```

### View Events

```javascript
const VIEW_EVENTS = {
    /**
     * Fired when camera position changes
     * Detail: { position: Vector3, target: Vector3 }
     */
    CAMERA_MOVED: 'cosmos:camera-moved',
    
    /**
     * Fired when zoom level changes
     * Detail: { distance: number, previousDistance: number }
     */
    ZOOM_CHANGED: 'cosmos:zoom-changed',
    
    /**
     * Fired when view toggles change
     * Detail: { showOrbits: boolean, showLabels: boolean, ... }
     */
    VIEW_TOGGLE_CHANGED: 'cosmos:view-toggle-changed'
};
```

### Render Events

```javascript
const RENDER_EVENTS = {
    /**
     * Fired when renderer initializes
     * Detail: { canvas: HTMLCanvasElement, scene: THREE.Scene }
     */
    RENDERER_INITIALIZED: 'cosmos:renderer-initialized',
    
    /**
     * Fired before each frame render
     * Detail: { time: number, frameNumber: number }
     */
    BEFORE_RENDER: 'cosmos:before-render',
    
    /**
     * Fired after each frame render
     * Detail: { time: number, deltaTime: number }
     */
    AFTER_RENDER: 'cosmos:after-render',
    
    /**
     * Fired when window is resized
     * Detail: { width: number, height: number, previousWidth, previousHeight }
     */
    WINDOW_RESIZED: 'cosmos:window-resized'
};
```

### Error Events

```javascript
const ERROR_EVENTS = {
    /**
     * Fired when a physics calculation fails
     * Detail: { error: Error, context: string, bodyName: string }
     */
    PHYSICS_ERROR: 'cosmos:physics-error',
    
    /**
     * Fired when a render error occurs
     * Detail: { error: Error, context: string }
     */
    RENDER_ERROR: 'cosmos:render-error',
    
    /**
     * Fired when data loading fails
     * Detail: { error: Error, dataType: string, source: string }
     */
    DATA_LOAD_ERROR: 'cosmos:data-load-error'
};
```

## Complete Event Type Reference

```javascript
/**
 * All Cosmos Simulation event types
 */
const COSMOS_EVENTS = {
    // Time events
    TIME_CHANGED: 'cosmos:time-changed',
    TIME_SCALE_CHANGED: 'cosmos:time-scale-changed',
    PLAY_STATE_CHANGED: 'cosmos:play-state-changed',
    TIME_RESET: 'cosmos:time-reset',
    
    // Body events
    BODY_SELECTED: 'cosmos:body-selected',
    BODY_DESELECTED: 'cosmos:body-deselected',
    BODY_POSITION_UPDATED: 'cosmos:body-position-updated',
    BODY_VISIBILITY_CHANGED: 'cosmos:body-visibility-changed',
    
    // View events
    CAMERA_MOVED: 'cosmos:camera-moved',
    ZOOM_CHANGED: 'cosmos:zoom-changed',
    VIEW_TOGGLE_CHANGED: 'cosmos:view-toggle-changed',
    
    // Render events
    RENDERER_INITIALIZED: 'cosmos:renderer-initialized',
    BEFORE_RENDER: 'cosmos:before-render',
    AFTER_RENDER: 'cosmos:after-render',
    WINDOW_RESIZED: 'cosmos:window-resized',
    
    // Error events
    PHYSICS_ERROR: 'cosmos:physics-error',
    RENDER_ERROR: 'cosmos:render-error',
    DATA_LOAD_ERROR: 'cosmos:data-load-error'
};
```

## Event Bus API

### EventEmitter Class

```javascript
class EventEmitter {
    constructor() {
        this.events = new Map();
    }
    
    /**
     * Subscribe to an event
     */
    on(event, callback, priority = 0) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        
        const listeners = this.events.get(event);
        listeners.push({ callback, priority });
        listeners.sort((a, b) => b.priority - a.priority);
        
        return () => this.off(event, callback);
    }
    
    /**
     * Subscribe to an event (one-time)
     */
    once(event, callback, priority = 0) {
        const wrapper = (...args) => {
            this.off(event, wrapper);
            callback(...args);
        };
        
        return this.on(event, wrapper, priority);
    }
    
    /**
     * Unsubscribe from an event
     */
    off(event, callback) {
        if (!this.events.has(event)) return;
        
        const listeners = this.events.get(event);
        const index = listeners.findIndex(l => l.callback === callback);
        
        if (index !== -1) {
            listeners.splice(index, 1);
        }
    }
    
    /**
     * Emit an event
     */
    emit(event, detail = {}) {
        if (!this.events.has(event)) return;
        
        const listeners = this.events.get(event);
        const eventObj = { type: event, detail, timestamp: Date.now() };
        
        for (const listener of listeners) {
            try {
                listener.callback(eventObj);
            } catch (error) {
                console.error(`Error in event listener for ${event}:`, error);
            }
        }
    }
    
    /**
     * Remove all listeners
     */
    removeAllListeners(event = null) {
        if (event) {
            this.events.delete(event);
        } else {
            this.events.clear();
        }
    }
    
    /**
     * Get listener count
     */
    listenerCount(event) {
        if (!this.events.has(event)) return 0;
        return this.events.get(event).length;
    }
}
```

### Global Event Bus

```javascript
// Create global event bus
const EventBus = new EventEmitter();

// Make available globally
window.EventBus = EventBus;
```

## Usage Examples

### Listening to Events

```javascript
// Listen for time changes
const unsubscribeTime = EventBus.on(COSMOS_EVENTS.TIME_CHANGED, (event) => {
    const { simTime, daysSinceJ2000 } = event.detail;
    console.log(`Time changed: ${daysSinceJ2000.toFixed(2)} days since J2000`);
    updateDateDisplay(simTime);
});

// Listen for body selection
EventBus.on(COSMOS_EVENTS.BODY_SELECTED, (event) => {
    const { bodyName, bodyData } = event.detail;
    console.log(`Selected: ${bodyName}`);
    InfoPanel.update(bodyName);
});

// Listen once (auto-removes after firing)
EventBus.once(COSMOS_EVENTS.RENDERER_INITIALIZED, (event) => {
    console.log('Renderer ready!');
    startAnimation();
});

// Conditional listener
EventBus.on(COSMOS_EVENTS.BODY_SELECTED, (event) => {
    if (event.detail.bodyName === 'Mars') {
        console.log('Mars selected! Showing special info...');
    }
});
```

### Emitting Events

```javascript
// Emit time change event
function updateTime(newSimTime) {
    const daysSinceJ2000 = TimeSystem.getDaysSinceJ2000();
    
    EventBus.emit(COSMOS_EVENTS.TIME_CHANGED, {
        simTime: newSimTime,
        daysSinceJ2000: daysSinceJ2000
    });
}

// Emit body selected event
function selectBody(mesh) {
    const bodyName = findBodyName(mesh);
    const bodyData = AstronomicalData.getAllBodies()[bodyName];
    
    EventBus.emit(COSMOS_EVENTS.BODY_SELECTED, {
        bodyName: bodyName,
        bodyData: bodyData,
        position: mesh.position.clone()
    });
}

// Emit custom event with high priority
EventBus.emit(COSMOS_EVENTS.PLAY_STATE_CHANGED, {
    isPlaying: true
}, 100); // priority
```

### Priority Handling

```javascript
// High priority listener (runs first)
EventBus.on(COSMOS_EVENTS.TIME_CHANGED, (event) => {
    console.log('HIGH PRIORITY:', event.detail.daysSinceJ2000);
}, 100);

// Normal priority
EventBus.on(COSMOS_EVENTS.TIME_CHANGED, (event) => {
    console.log('NORMAL PRIORITY:', event.detail.daysSinceJ2000);
}, 0);

// Low priority
EventBus.on(COSMOS_EVENTS.TIME_CHANGED, (event) => {
    console.log('LOW PRIORITY:', event.detail.daysSinceJ2000);
}, -100);
```

### Cleanup

```javascript
// Remove single listener
unsubscribeTime();

// Remove all listeners for an event
EventBus.removeAllListeners(COSMOS_EVENTS.TIME_CHANGED);

// Remove all listeners
EventBus.removeAllListeners();

// Using return value from on()
const unsubscribe = EventBus.on(COSMOS_EVENTS.TIME_CHANGED, handler);
// Later...
unsubscribe();
```

## Integration with DOM Events

### Using Custom Events

```javascript
// Listen using native DOM event system
document.addEventListener('cosmos:time-changed', (e) => {
    console.log('Time:', e.detail.daysSinceJ2000);
});

// Emit using native CustomEvent
function emitTimeChanged(simTime) {
    const event = new CustomEvent('cosmos:time-changed', {
        detail: {
            simTime: simTime,
            daysSinceJ2000: TimeSystem.getDaysSinceJ2000()
        }
    });
    document.dispatchEvent(event);
}
```

### Cross-Tab Communication

```javascript
// Broadcast events to other tabs
function broadcastEvent(eventType, detail) {
    localStorage.setItem('cosmosEvent', JSON.stringify({
        type: eventType,
        detail: detail,
        timestamp: Date.now()
    }));
}

// Listen for events from other tabs
window.addEventListener('storage', (e) => {
    if (e.key === 'cosmosEvent') {
        const data = JSON.parse(e.newValue);
        if (data.type === COSMOS_EVENTS.TIME_CHANGED) {
            // Sync time with other tab
            TimeSystem.setDaysSinceJ2000(data.detail.daysSinceJ2000);
        }
    }
});
```

## Error Event Handling

```javascript
// Listen for errors
EventBus.on(COSMOS_EVENTS.PHYSICS_ERROR, (event) => {
    const { error, context, bodyName } = event.detail;
    console.error(`Physics error for ${bodyName} in ${context}:`, error);
    
    // Send to error tracking service
    reportError(error, { context, bodyName });
});

EventBus.on(COSMOS_EVENTS.RENDER_ERROR, (event) => {
    const { error, context } = event.detail;
    console.error(`Render error in ${context}:`, error);
});
```

## Debugging Events

```javascript
// Enable event logging
const DEBUG_EVENTS = true;

const originalEmit = EventBus.emit;
EventBus.emit = function(event, detail) {
    if (DEBUG_EVENTS) {
        console.log(`[EVENT] ${event}`, detail);
    }
    return originalEmit.call(this, event, detail);
};

// Event listener wrapper for debugging
function debugListener(callback, name = 'anonymous') {
    return function(event) {
        console.log(`[HANDLER] ${name} handling ${event.type}`);
        callback(event);
    };
}

// Usage
EventBus.on(COSMOS_EVENTS.TIME_CHANGED, debugListener(
    (e) => { /* handler */ },
    'TimeDisplay'
));
```

## Performance Considerations

### Event Debouncing

```javascript
// Debounce rapid events
function debounceEvent(eventType, debounceTime = 16) {
    let timeout = null;
    let lastDetail = null;
    
    return (detail) => {
        lastDetail = detail;
        if (timeout) clearTimeout(timeout);
        
        timeout = setTimeout(() => {
            EventBus.emit(eventType, lastDetail);
        }, debounceTime);
    };
}

// Usage for rapid position updates
const debouncedPositionUpdate = debounceEvent(COSMOS_EVENTS.BODY_POSITION_UPDATED);

// In render loop
function animate() {
    // Only emit position updates every ~16ms
    debouncedPositionUpdate({ bodyName: 'Earth', position: ... });
}
```

### Event Throttling

```javascript
// Throttle event emission
function throttleEvent(eventType, limit) {
    let inThrottle = false;
    
    return (detail) => {
        if (!inThrottle) {
            EventBus.emit(eventType, detail);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
```

## See Also

- [Integration](API_Integration.md) - Event flow between engines
- [Architecture](API_Architecture.md) - System architecture
- [Components](API_Components.md) - UI component events
- [WebGLRenderer](API_WebGLRenderer.md) - Render events


// CS1.6 Mobile - Main JavaScript File
// Shared functionality across all pages

// Global Game State
window.CS16Mobile = {
    version: '1.0.0',
    settings: {},
    player: {
        name: 'Player',
        level: 1,
        experience: 0,
        wins: 0,
        losses: 0,
        kills: 0,
        deaths: 0
    },
    game: {
        isPlaying: false,
        currentMap: 'de_dust2',
        currentMode: 'bomb',
        round: 1,
        score: { terrorists: 0, counterTerrorists: 0 }
    }
};

// Utility Functions
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function formatNumber(num) {
    return num.toLocaleString();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

// Local Storage Helpers
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Failed to save to storage:', error);
        return false;
    }
}

function loadFromStorage(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error('Failed to load from storage:', error);
        return defaultValue;
    }
}

// Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.fps = 0;
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.isMonitoring = false;
    }

    start() {
        this.isMonitoring = true;
        this.monitor();
    }

    stop() {
        this.isMonitoring = false;
    }

    monitor() {
        if (!this.isMonitoring) return;

        const currentTime = performance.now();
        this.frameCount++;

        if (currentTime - this.lastTime >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
            this.frameCount = 0;
            this.lastTime = currentTime;
            
            // Update FPS display if element exists
            const fpsElement = document.getElementById('currentFPS');
            if (fpsElement) {
                fpsElement.textContent = this.fps;
                fpsElement.style.color = this.fps >= 55 ? '#00FF00' : this.fps >= 40 ? '#FF8C00' : '#FF6B6B';
            }
        }

        requestAnimationFrame(() => this.monitor());
    }
}

// Network Utilities
class NetworkMonitor {
    constructor() {
        this.ping = 0;
        this.packetLoss = 0;
        this.bandwidth = 0;
        this.isTesting = false;
    }

    async testConnection() {
        if (this.isTesting) return;
        
        this.isTesting = true;
        const startTime = performance.now();
        
        try {
            // Simulate network test
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const endTime = performance.now();
            this.ping = Math.floor((endTime - startTime) / 2);
            this.packetLoss = Math.random() * 5;
            this.bandwidth = Math.random() * 10 + 1;
            
            this.updateDisplay();
        } catch (error) {
            console.error('Network test failed:', error);
        } finally {
            this.isTesting = false;
        }
    }

    updateDisplay() {
        const elements = {
            ping: document.getElementById('pingDisplay'),
            packetLoss: document.getElementById('packetLossDisplay'),
            bandwidth: document.getElementById('bandwidthDisplay')
        };

        if (elements.ping) elements.ping.textContent = this.ping + 'ms';
        if (elements.packetLoss) elements.packetLoss.textContent = this.packetLoss.toFixed(1) + '%';
        if (elements.bandwidth) elements.bandwidth.textContent = this.bandwidth.toFixed(1) + ' Mbps';
    }
}

// Audio Manager
class AudioManager {
    constructor() {
        this.sounds = new Map();
        this.masterVolume = 1.0;
        this.sfxVolume = 1.0;
        this.musicVolume = 1.0;
        this.isMuted = false;
    }

    loadSound(name, url) {
        const audio = new Audio(url);
        this.sounds.set(name, audio);
        return audio;
    }

    playSound(name, volume = 1.0) {
        const sound = this.sounds.get(name);
        if (sound && !this.isMuted) {
            sound.volume = volume * this.sfxVolume * this.masterVolume;
            sound.currentTime = 0;
            sound.play().catch(e => console.warn('Audio play failed:', e));
        }
    }

    setMasterVolume(volume) {
        this.masterVolume = clamp(volume / 100, 0, 1);
    }

    setSFXVolume(volume) {
        this.sfxVolume = clamp(volume / 100, 0, 1);
    }

    setMusicVolume(volume) {
        this.musicVolume = clamp(volume / 100, 0, 1);
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }
}

// Notification System
class NotificationSystem {
    constructor() {
        this.container = null;
        this.notifications = [];
        this.init();
    }

    init() {
        // Create notification container
        this.container = document.createElement('div');
        this.container.id = 'notification-container';
        this.container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
        `;
        document.body.appendChild(this.container);
    }

    show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 12px 20px;
            margin-bottom: 10px;
            border-radius: 6px;
            border-left: 4px solid ${this.getColorForType(type)};
            font-family: 'Roboto Mono', monospace;
            font-size: 0.8rem;
            max-width: 300px;
            word-wrap: break-word;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;

        this.container.appendChild(notification);
        this.notifications.push(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Auto remove
        setTimeout(() => {
            this.remove(notification);
        }, duration);

        return notification;
    }

    remove(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            this.notifications = this.notifications.filter(n => n !== notification);
        }, 300);
    }

    getColorForType(type) {
        const colors = {
            info: '#FF8C00',
            success: '#00FF00',
            warning: '#FFFF00',
            error: '#FF0000'
        };
        return colors[type] || colors.info;
    }
}

// Initialize global instances
window.cs16PerformanceMonitor = new PerformanceMonitor();
window.cs16NetworkMonitor = new NetworkMonitor();
window.cs16AudioManager = new AudioManager();
window.cs16NotificationSystem = new NotificationSystem();

// Page Navigation Helpers
function navigateToPage(url) {
    // Add loading animation
    document.body.style.opacity = '0.8';
    setTimeout(() => {
        window.location.href = url;
    }, 200);
}

function showComingSoon(feature) {
    window.cs16NotificationSystem.show(`${feature} - Coming Soon!`, 'info');
}

// Mobile Touch Helpers
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

function addTouchSupport(element) {
    if (isTouchDevice()) {
        element.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.classList.add('touch-active');
        });
        
        element.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.classList.remove('touch-active');
        });
    }
}

// Performance Optimization
function optimizeForMobile() {
    // Reduce animation quality on low-end devices
    const isLowEnd = navigator.hardwareConcurrency < 4 || 
                    (navigator.deviceMemory && navigator.deviceMemory < 4);
    
    if (isLowEnd) {
        document.documentElement.style.setProperty('--animation-duration', '0.2s');
        document.documentElement.style.setProperty('--transition-duration', '0.1s');
    }

    // Prevent zoom on double tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Start performance monitoring
    window.cs16PerformanceMonitor.start();
    
    // Optimize for mobile
    optimizeForMobile();
    
    // Load saved settings
    const savedSettings = loadFromStorage('cs16mobile-settings');
    if (savedSettings) {
        window.CS16Mobile.settings = savedSettings;
    }
    
    // Show welcome message on first visit
    const hasVisited = loadFromStorage('cs16mobile-visited');
    if (!hasVisited) {
        setTimeout(() => {
            window.cs16NotificationSystem.show('Welcome to CS1.6 Mobile!', 'success', 4000);
            saveToStorage('cs16mobile-visited', true);
        }, 1000);
    }
});

// Export for use in other scripts
window.CS16Utils = {
    formatTime,
    formatNumber,
    getRandomInt,
    clamp,
    saveToStorage,
    loadFromStorage,
    navigateToPage,
    showComingSoon,
    isTouchDevice,
    addTouchSupport
};

console.log('CS1.6 Mobile - Main JavaScript loaded successfully!');
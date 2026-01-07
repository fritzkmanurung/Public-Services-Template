/**
 * Portal Layanan Publik - Theme Logic
 * Handles Light/Dark mode toggling and persistence
 */

const ThemeManager = {
    init() {
        const check = localStorage.getItem('theme');
        const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const theme = check || system;

        this.apply(theme);

        // Setup toggle listeners if elements exist
        this.setupToggles();
    },

    apply(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update any toggle buttons
        const toggles = document.querySelectorAll('.theme-toggle');
        toggles.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        });
    },

    toggle() {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        this.apply(next);
    },

    setupToggles() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.theme-toggle')) {
                this.toggle();
            }
        });
    }
};

// Initialize immediately to prevent flash
ThemeManager.init();

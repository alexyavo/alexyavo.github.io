(function () {
    'use strict';

    const THEME_KEY = 'theme-preference';
    const THEMES = {
        LIGHT: 'light',
        DARK: 'dark'
    };

    class ThemeToggle {
        constructor() {
            this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
            this.init();
        }

        init() {
            this.applyTheme(this.currentTheme);
            this.createToggleButton();
            this.addEventListeners();
        }

        getStoredTheme() {
            return localStorage.getItem(THEME_KEY);
        }

        getSystemTheme() {
            return window.matchMedia('(prefers-color-scheme: dark)').matches
                ? THEMES.DARK
                : THEMES.LIGHT;
        }

        setStoredTheme(theme) {
            localStorage.setItem(THEME_KEY, theme);
        }

        applyTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            this.currentTheme = theme;
            this.updateToggleButton();
        }

        toggleTheme() {
            const newTheme = this.currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
            this.applyTheme(newTheme);
            this.setStoredTheme(newTheme);
        }

        createToggleButton() {
            const button = document.createElement('button');
            button.className = 'theme-toggle';
            button.setAttribute('aria-label', 'Toggle dark mode');
            button.setAttribute('title', 'Toggle dark mode');
            button.innerHTML = this.getButtonIcon();

            document.body.appendChild(button);
            this.button = button;
        }

        getButtonIcon() {
            return this.currentTheme === THEMES.LIGHT ? '🌙' : '☀️';
        }

        updateToggleButton() {
            if (this.button) {
                this.button.innerHTML = this.getButtonIcon();
                this.button.setAttribute('aria-label',
                    this.currentTheme === THEMES.LIGHT ? 'Switch to dark mode' : 'Switch to light mode'
                );
            }
        }

        addEventListeners() {
            // Toggle button click
            if (this.button) {
                this.button.addEventListener('click', () => this.toggleTheme());
            }

            // Listen for system theme changes
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!this.getStoredTheme()) {
                    this.applyTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
                }
            });

            // Keyboard shortcut (Ctrl/Cmd + Shift + D)
            document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
                    e.preventDefault();
                    this.toggleTheme();
                }
            });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new ThemeToggle());
    } else {
        new ThemeToggle();
    }
})(); 
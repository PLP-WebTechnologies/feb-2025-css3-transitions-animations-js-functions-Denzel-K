document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const body = document.body;
    const lightThemeBtn = document.getElementById('light-theme');
    const darkThemeBtn = document.getElementById('dark-theme');
    const pulseBtn = document.getElementById('pulse-btn');
    const rotateBtn = document.getElementById('rotate-btn');
    const bounceBtn = document.getElementById('bounce-btn');
    const savePrefsBtn = document.getElementById('save-prefs');
    const usernameInput = document.getElementById('username');
    const greetingMessage = document.getElementById('greeting');
    const rotateTarget = document.querySelector('.rotate-target');
    const bounceTarget = document.querySelector('.bounce-target');

    // Load saved preferences
    loadPreferences();

    // Theme Toggle Functionality
    lightThemeBtn.addEventListener('click', function() {
        setTheme('light');
    });

    darkThemeBtn.addEventListener('click', function() {
        setTheme('dark');
    });

    function setTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            darkThemeBtn.classList.add('active');
            lightThemeBtn.classList.remove('active');
        } else {
            body.classList.remove('dark-theme');
            lightThemeBtn.classList.add('active');
            darkThemeBtn.classList.remove('active');
        }
        // Save to localStorage
        localStorage.setItem('preferredTheme', theme);
    }

    // Animation Triggers
    pulseBtn.addEventListener('click', function() {
        // Add pulse animation class
        this.classList.add('pulse-animation');
        
        // Remove after animation completes
        setTimeout(() => {
            this.classList.remove('pulse-animation');
        }, 500);
        
        // Save animation preference
        localStorage.setItem('lastAnimation', 'pulse');
    });

    rotateBtn.addEventListener('click', function() {
        // Add rotate animation class
        rotateTarget.classList.add('rotate-animation');
        
        // Remove after animation completes
        setTimeout(() => {
            rotateTarget.classList.remove('rotate-animation');
        }, 1000);
        
        // Save animation preference
        localStorage.setItem('lastAnimation', 'rotate');
    });

    bounceBtn.addEventListener('click', function() {
        // Add bounce animation class
        bounceTarget.classList.add('bounce-animation');
        
        // Remove after animation completes
        setTimeout(() => {
            bounceTarget.classList.remove('bounce-animation');
        }, 800);
        
        // Save animation preference
        localStorage.setItem('lastAnimation', 'bounce');
    });

    // Save User Preferences
    savePrefsBtn.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        
        if (username) {
            localStorage.setItem('username', username);
            showGreeting(username);
            
            // Show confirmation animation
            this.textContent = 'Saved!';
            this.style.backgroundColor = '#4BB543';
            
            setTimeout(() => {
                this.textContent = 'Save Preferences';
                this.style.backgroundColor = '';
            }, 2000);
        } else {
            alert('Please enter your name');
        }
    });

    // Show greeting if username exists
    function showGreeting(username) {
        greetingMessage.textContent = `Welcome back, ${username}! Your preferences are saved.`;
        greetingMessage.style.display = 'block';
    }

    // Load saved preferences from localStorage
    function loadPreferences() {
        // Load theme preference
        const preferredTheme = localStorage.getItem('preferredTheme') || 'light';
        setTheme(preferredTheme);
        
        // Load username
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            usernameInput.value = savedUsername;
            showGreeting(savedUsername);
        }
        
        // Load last animation (just for demo, not applying it)
        const lastAnimation = localStorage.getItem('lastAnimation');
        if (lastAnimation) {
            console.log(`Last animation used: ${lastAnimation}`);
        }
    }

    // Bonus: Trigger random animation on spacebar press
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            const animations = ['pulse', 'rotate', 'bounce'];
            const randomAnim = animations[Math.floor(Math.random() * animations.length)];
            
            switch(randomAnim) {
                case 'pulse':
                    pulseBtn.click();
                    break;
                case 'rotate':
                    rotateBtn.click();
                    break;
                case 'bounce':
                    bounceBtn.click();
                    break;
            }
        }
    });
});
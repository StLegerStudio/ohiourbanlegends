// Ohio Urban Legends - Coming Soon Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // ===== Email Form Handling =====
    const notifyForm = document.getElementById('notifyForm');
    const logo = document.getElementById('logo');
    
    // Handle form submission
    if (notifyForm) {
        notifyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const button = this.querySelector('button');
            const originalText = button.textContent;
            
            // Simple validation
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Update button state
            button.textContent = 'Submitting...';
            button.disabled = true;
            
            // Simulate submission (replace with actual backend call)
            setTimeout(() => {
                // For now, just show success message
                showMessage(`Thanks! We'll notify you at ${email} when we launch.`, 'success');
                this.reset();
                button.textContent = originalText;
                button.disabled = false;
                
                // Add some spooky effects
                addSpookyEffect();
            }, 1500);
        });
    }
    
    // ===== Spooky Interactive Effects =====
    
    // Logo hover effect with particles
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            createParticleEffect(this);
        });
    }
    
    // Random spooky sounds (you can add audio files later)
    function playSpookySound() {
        // Placeholder for future audio implementation
        console.log('👻 Spooky sound would play here');
    }
    
    // Add mysterious cursor trail
    let trail = [];
    document.addEventListener('mousemove', function(e) {
        trail.push({x: e.clientX, y: e.clientY, time: Date.now()});
        
        // Keep trail to reasonable length
        if (trail.length > 20) {
            trail.shift();
        }
        
        // Clean up old trail points
        trail = trail.filter(point => Date.now() - point.time < 1000);
    });
    
    // ===== Atmospheric Effects =====
    
    // Random lightning flash effect
    function createLightningFlash() {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 255, 144, 0.1);
            pointer-events: none;
            z-index: 9999;
            animation: lightning 0.2s ease-out;
        `;
        
        document.body.appendChild(flash);
        
        setTimeout(() => {
            document.body.removeChild(flash);
        }, 200);
    }
    
    // Trigger lightning effect randomly
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every 5 seconds
            createLightningFlash();
        }
    }, 5000);
    
    // ===== Helper Functions =====
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessage = document.querySelector('.notification-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `notification-message ${type}`;
        messageDiv.textContent = message;
        
        const colors = {
            success: 'rgba(0, 255, 144, 0.9)',
            error: 'rgba(195, 55, 125, 0.9)',
            info: 'rgba(108, 40, 128, 0.9)'
        };
        
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-weight: 500;
            z-index: 10000;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.3s ease-out;
            max-width: 350px;
        `;
        
        document.body.appendChild(messageDiv);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => {
                    if (messageDiv.parentNode) {
                        messageDiv.remove();
                    }
                }, 300);
            }
        }, 4000);
    }
    
    function createParticleEffect(element) {
        const rect = element.getBoundingClientRect();
        const particles = 8;
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: var(--accent-bright);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
            `;
            
            document.body.appendChild(particle);
            
            // Animate particle
            const angle = (i / particles) * Math.PI * 2;
            const distance = 50 + Math.random() * 30;
            const duration = 0.8 + Math.random() * 0.4;
            
            particle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: duration * 1000,
                easing: 'ease-out'
            }).onfinish = () => {
                particle.remove();
            };
        }
    }
    
    function addSpookyEffect() {
        // Screen flash effect
        createLightningFlash();
        
        // Logo particle burst
        if (logo) {
            createParticleEffect(logo);
        }
        
        // Temporary text effect
        const title = document.querySelector('.title');
        if (title) {
            title.style.animation = 'none';
            title.style.textShadow = '0 0 20px var(--accent-bright), 0 0 40px var(--secondary)';
            
            setTimeout(() => {
                title.style.animation = 'title-glow 4s ease-in-out infinite alternate';
                title.style.textShadow = '';
            }, 1000);
        }
    }
    
    // ===== Easter Eggs =====
    
    // Konami Code easter egg (up, up, down, down, left, right, left, right, B, A)
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.length === konamiSequence.length && 
            konamiCode.every((key, index) => key === konamiSequence[index])) {
            
            // Activate special mode
            activateSpecialMode();
            konamiCode = [];
        }
    });
    
    function activateSpecialMode() {
        showMessage('👻 You\'ve awakened the spirits! Special mode activated!', 'success');
        
        // Add special CSS class for enhanced effects
        document.body.classList.add('special-mode');
        
        // More frequent lightning
        const specialInterval = setInterval(() => {
            createLightningFlash();
        }, 1000);
        
        // Stop special mode after 10 seconds
        setTimeout(() => {
            document.body.classList.remove('special-mode');
            clearInterval(specialInterval);
            showMessage('The spirits have returned to their slumber...', 'info');
        }, 10000);
    }
});

// ===== CSS Animations (injected via JS) =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes lightning {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
    }
    
    .special-mode .logo {
        filter: drop-shadow(0 0 30px var(--accent-bright)) drop-shadow(0 0 15px var(--secondary)) hue-rotate(180deg);
    }
    
    .special-mode .title {
        animation: title-glow 0.5s ease-in-out infinite alternate !important;
    }
`;
document.head.appendChild(style);
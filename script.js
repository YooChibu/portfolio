// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.timeline-item, .project-card, .skill-item, .stat-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.style.width;
            progressBar.style.width = '0%';
            
            setTimeout(() => {
                progressBar.style.width = width;
            }, 200);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Terminal-style typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            const char = text.charAt(i);
            element.innerHTML += char;
            i++;
            
            // Add cursor effect
            if (i < text.length) {
                element.innerHTML += '<span class="cursor">|</span>';
            }
            
            setTimeout(() => {
                // Remove cursor before adding next character
                const cursor = element.querySelector('.cursor');
                if (cursor) cursor.remove();
                type();
            }, speed);
        } else {
            // Final cursor
            element.innerHTML += '<span class="cursor">|</span>';
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
    
    // Add terminal-style cursor animation
    const style = document.createElement('style');
    style.textContent = `
        .cursor {
            animation: blink 1s infinite;
            color: #00ff41;
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});

// Back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to back to top button
backToTopButton.addEventListener('mouseenter', () => {
    backToTopButton.style.background = '#0056b3';
    backToTopButton.style.transform = 'scale(1.1)';
});

backToTopButton.addEventListener('mouseleave', () => {
    backToTopButton.style.background = '#007bff';
    backToTopButton.style.transform = 'scale(1)';
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll event logic here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading state to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (this.href && this.href.startsWith('#')) {
            // Internal link, don't show loading
            return;
        }
        
        // Add loading state for external links
        const originalText = this.textContent;
        this.textContent = '로딩 중...';
        this.disabled = true;
        
        setTimeout(() => {
            this.textContent = originalText;
            this.disabled = false;
        }, 2000);
    });
});

// Add tooltip functionality
document.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = this.getAttribute('data-tooltip');
        tooltip.style.cssText = `
            position: absolute;
            background: #333;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 12px;
            z-index: 1000;
            pointer-events: none;
            white-space: nowrap;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
    });
    
    element.addEventListener('mouseleave', function() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});

// Terminal-style console output
console.log('%c🚀 Portfolio Website Loaded Successfully!', 'color: #00ff41; font-size: 16px; font-weight: bold;');
console.log('%c> Initializing developer portfolio...', 'color: #58a6ff; font-family: monospace;');
console.log('%c> Dark theme activated', 'color: #00ff41; font-family: monospace;');
console.log('%c> Ready for development!', 'color: #ffff00; font-family: monospace;');

// Terminal-style typing effect for console
function terminalTyping() {
    const messages = [
        '> Welcome to Developer Portfolio',
        '> Loading experience data...',
        '> Initializing skills matrix...',
        '> Ready to showcase projects',
        '> Portfolio system online ✓'
    ];
    
    let messageIndex = 0;
    let charIndex = 0;
    
    function typeMessage() {
        if (messageIndex < messages.length) {
            const message = messages[messageIndex];
            if (charIndex < message.length) {
                // 브라우저 환경에서는 console.log만 사용
                console.log(message[charIndex]);
                charIndex++;
                setTimeout(typeMessage, 50);
            } else {
                console.log(''); // 빈 줄 추가
                messageIndex++;
                charIndex = 0;
                setTimeout(typeMessage, 500);
            }
        }
    }
    
    // 모든 환경에서 실행 (GitHub Pages 포함)
    typeMessage();
}

// Initialize terminal effect
terminalTyping();

// Terminal-style command interface
function createTerminalInterface() {
    const terminal = document.createElement('div');
    terminal.className = 'terminal-interface';
    terminal.innerHTML = `
        <div class="terminal-header">
            <div class="terminal-buttons">
                <span class="terminal-btn close"></span>
                <span class="terminal-btn minimize"></span>
                <span class="terminal-btn maximize"></span>
            </div>
            <div class="terminal-title">developer@portfolio:~$</div>
        </div>
        <div class="terminal-body">
            <div class="terminal-output">
                <div class="terminal-line">Welcome to Developer Portfolio Terminal</div>
                <div class="terminal-line">Type 'help' for available commands</div>
                <div class="terminal-line">Type 'clear' to clear the terminal</div>
            </div>
            <div class="terminal-input-line">
                <span class="terminal-prompt">developer@portfolio:~$</span>
                <input type="text" class="terminal-input" placeholder="Enter command...">
            </div>
        </div>
    `;
    
    // Add terminal styles
    const terminalStyles = document.createElement('style');
    terminalStyles.textContent = `
        .terminal-interface {
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 500px;
            height: 300px;
            background: var(--bg-primary);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            box-shadow: 0 10px 30px var(--shadow-color);
            z-index: 1001;
            display: none;
            font-family: 'JetBrains Mono', monospace;
        }
        
        .terminal-header {
            background: var(--bg-secondary);
            padding: 10px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .terminal-buttons {
            display: flex;
            gap: 5px;
        }
        
        .terminal-btn {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }
        
        .terminal-btn.close { background: #ff5f56; }
        .terminal-btn.minimize { background: #ffbd2e; }
        .terminal-btn.maximize { background: #27ca3f; }
        
        .terminal-title {
            color: var(--text-secondary);
            font-size: 12px;
        }
        
        .terminal-body {
            height: calc(100% - 50px);
            padding: 10px;
            overflow-y: auto;
        }
        
        .terminal-output {
            margin-bottom: 10px;
        }
        
        .terminal-line {
            color: var(--text-secondary);
            margin-bottom: 5px;
            font-size: 12px;
        }
        
        .terminal-input-line {
            display: flex;
            align-items: center;
        }
        
        .terminal-prompt {
            color: var(--terminal-green);
            margin-right: 5px;
            font-size: 12px;
        }
        
        .terminal-input {
            background: transparent;
            border: none;
            color: var(--text-primary);
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            outline: none;
            flex: 1;
        }
        
        .terminal-toggle {
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 50px;
            height: 50px;
            background: var(--terminal-green);
            color: var(--bg-primary);
            border: none;
            border-radius: 4px;
            cursor: pointer;
            z-index: 1002;
            font-size: 20px;
            transition: all 0.3s ease;
        }
        
        .terminal-toggle:hover {
            background: var(--accent-primary);
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(terminalStyles);
    
    // Add terminal toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'terminal-toggle';
    toggleBtn.innerHTML = '>_';
    toggleBtn.title = 'Open Terminal';
    
    document.body.appendChild(terminal);
    document.body.appendChild(toggleBtn);
    
    // Terminal functionality
    const terminalInput = terminal.querySelector('.terminal-input');
    const terminalOutput = terminal.querySelector('.terminal-output');
    
    const commands = {
        help: () => {
            addTerminalLine('Available commands:');
            addTerminalLine('  help - Show this help message');
            addTerminalLine('  clear - Clear terminal');
            addTerminalLine('  about - Show about information');
            addTerminalLine('  skills - Show technical skills');
            addTerminalLine('  projects - Show projects');
            addTerminalLine('  contact - Show contact info');
            addTerminalLine('  exit - Close terminal');
        },
        clear: () => {
            terminalOutput.innerHTML = '';
        },
        about: () => {
            addTerminalLine('Developer Portfolio v1.0');
            addTerminalLine('15+ years of development experience');
            addTerminalLine('Specialized in web and backend development');
            addTerminalLine('Focus on stability and performance');
        },
        skills: () => {
            addTerminalLine('Technical Skills:');
            addTerminalLine('  Backend: .NET Core, ASP.NET, C#, Java, Spring Boot');
            addTerminalLine('  Database: MS-SQL, MySQL');
            addTerminalLine('  Frontend: JavaScript, jQuery, HTML5, CSS3');
            addTerminalLine('  Tools: Git, GitHub, Jira, REST API');
        },
        projects: () => {
            addTerminalLine('Key Projects:');
            addTerminalLine('  Payment Service Refactoring (Classic ASP → .NET Core)');
            addTerminalLine('  Various Payment Services (URL, HectopemBang, Apple Pay)');
            addTerminalLine('  Investment Platform Development');
            addTerminalLine('  Tower Defense Game (Personal Project)');
        },
        contact: () => {
            addTerminalLine('Contact Information:');
            addTerminalLine('  Email: Please check resume for details');
            addTerminalLine('  Location: Please check resume for details');
            addTerminalLine('  Available for new opportunities');
        },
        exit: () => {
            terminal.style.display = 'none';
        }
    };
    
    function addTerminalLine(text) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.textContent = text;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
    
    function executeCommand(command) {
        addTerminalLine(`developer@portfolio:~$ ${command}`);
        
        if (commands[command]) {
            commands[command]();
        } else {
            addTerminalLine(`Command not found: ${command}`);
            addTerminalLine('Type "help" for available commands');
        }
    }
    
    // Event listeners
    toggleBtn.addEventListener('click', () => {
        terminal.style.display = terminal.style.display === 'none' ? 'block' : 'none';
        if (terminal.style.display === 'block') {
            terminalInput.focus();
        }
    });
    
    terminalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            if (command) {
                executeCommand(command);
            }
            terminalInput.value = '';
        }
    });
    
    // Close terminal when clicking outside
    document.addEventListener('click', (e) => {
        if (!terminal.contains(e.target) && !toggleBtn.contains(e.target)) {
            terminal.style.display = 'none';
        }
    });
}

// Initialize terminal interface
createTerminalInterface();

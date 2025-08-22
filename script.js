 // ==================== SPLASH SCREEN FUNCTIONS ====================

 function createCodeRain() {
    const codeRain = document.getElementById('codeRain');
    const codeChars = ['0', '1', '{', '}', '<', '>', '/', '\\', '(', ')', '[', ']', ';', ':', '=', '+', '-', '*', 'def', 'var', 'let', 'const', 'function', 'class', 'import', 'export', 'async', 'await'];
    const columnCount = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < columnCount; i++) {
        const column = document.createElement('div');
        column.className = 'code-column';
        column.style.left = (i * 20) + 'px';
        column.style.animationDelay = Math.random() * 8 + 's';
        column.style.animationDuration = (6 + Math.random() * 4) + 's';

        let columnText = '';
        for (let j = 0; j < 15; j++) {
            columnText += codeChars[Math.floor(Math.random() * codeChars.length)] + '\n';
        }
        column.textContent = columnText;
        codeRain.appendChild(column);
    }
}

let loadingComplete = false;

function hideSplashAndShowPortfolio() {
    if (!loadingComplete) {
        return;
    }

    const splash = document.getElementById('splashScreen');
    const mainPortfolio = document.getElementById('mainPortfolio');

    console.log('Loading complete - starting transition...');

    splash.classList.add('fade-out');

    setTimeout(() => {
        mainPortfolio.classList.add('show');
        initMainPortfolio();
    }, 100);

    setTimeout(() => {
        splash.classList.add('display-none');
        document.body.style.overflow = 'auto';
        console.log('Portfolio loaded successfully!');
    }, 800);
}

function monitorLoadingProgress() {
    const loadingProgress = document.querySelector('.loading-progress');

    setTimeout(() => {
        loadingComplete = true;
        console.log('Loading bar completed at 100%');

        setTimeout(() => {
            hideSplashAndShowPortfolio();
        }, 300);
    }, 4700);
}

// ==================== MAIN PORTFOLIO FUNCTIONS ====================

function updateScrollIndicator() {
    const activeTab = document.querySelector('.devtool-content.active');
    const scrollIndicator = document.getElementById('scroll-indicator');
    const devtools = document.querySelector('.devtools');

    if (!activeTab || !scrollIndicator || !devtools) return;

    const hasScrollableContent = activeTab.scrollHeight > activeTab.clientHeight + 10;
    const scrollTop = activeTab.scrollTop;
    const scrollHeight = activeTab.scrollHeight;
    const clientHeight = activeTab.clientHeight;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;

    if (hasScrollableContent && !isNearBottom) {
        scrollIndicator.classList.add('show');
        devtools.classList.add('has-more-content');
    } else {
        scrollIndicator.classList.remove('show');
        devtools.classList.remove('has-more-content');
    }
}

function initMainPortfolio() {
    typewriterRole();
    setTimeout(startTechAnimation, 2000);
    initTooltips();
    initTabs();
    initCopyEmail();
    initClickableElements();
    initScrollIndicators();
    initCertificateButtons(); // Add this line
}
function typewriterRole() {
    const roleElement = document.getElementById('role-text');
    const text = 'Python Developer';
    let i = 0;

    function type() {
        if (i < text.length) {
            roleElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }

    setTimeout(type, 800);
}

function startTechAnimation() {
    const techActions = {
        'Python': { action: 'Building with', icon: '🔨' },
        'Redis': { action: 'Caching with', icon: '⚡' },
        'Docker': { action: 'Containerizing with', icon: '📦' },
        'FastAPI': { action: 'Optimizing', icon: '🚀' },
        // 'GraphQL': { action: 'Querying with', icon: '🔍' },
        // 'AWS': { action: 'Deploying to', icon: '☁️' },
        'PostgreSQL': { action: 'Querying', icon: '💾' },
        // 'TypeScript': { action: 'Typing with', icon: '📝' },
        // 'Kubernetes': { action: 'Orchestrating with', icon: '⚙️' },
        // 'Node.js': { action: 'Streaming with', icon: '🌊' },
        'Django': { action: 'Architecting with', icon: '🏗️' },
        // 'Terraform': { action: 'Provisioning with', icon: '🔧' }
    };

    const techNames = Object.keys(techActions);
    const statusIconEl = document.getElementById('status-icon');
    const statusActionEl = document.getElementById('status-action');
    const cyclingTechEl = document.getElementById('cycling-tech');
    let techIndex = 0;

    function cycleTech() {
        const currentTech = techNames[techIndex];
        const { action, icon } = techActions[currentTech];

        let charIndex = 0;

        statusIconEl.textContent = icon;
        statusActionEl.textContent = action + ' ';
        cyclingTechEl.textContent = '';

        function typeChar() {
            if (charIndex < currentTech.length) {
                cyclingTechEl.textContent += currentTech[charIndex];
                charIndex++;
                setTimeout(typeChar, 120);
            } else {
                setTimeout(() => {
                    function eraseChar() {
                        if (charIndex > 0) {
                            cyclingTechEl.textContent = currentTech.substring(0, charIndex - 1);
                            charIndex--;
                            setTimeout(eraseChar, 80);
                        } else {
                            techIndex = (techIndex + 1) % techNames.length;
                            setTimeout(cycleTech, 300);
                        }
                    }
                    eraseChar();
                }, 2000);
            }
        }

        typeChar();
    }

    cycleTech();
}

function initTooltips() {
    const globalTooltip = document.getElementById('global-tooltip');
    const netRequests = document.querySelectorAll('.net-request[data-tooltip]');

    netRequests.forEach(request => {
        request.addEventListener('mouseenter', function () {
            const tooltipText = this.getAttribute('data-tooltip');
            globalTooltip.textContent = tooltipText;
            globalTooltip.classList.add('show');
        });

        request.addEventListener('mouseleave', function () {
            globalTooltip.classList.remove('show');
        });

        request.addEventListener('focus', function () {
            const tooltipText = this.getAttribute('data-tooltip');
            globalTooltip.textContent = tooltipText;
            globalTooltip.classList.add('show');
        });

        request.addEventListener('blur', function () {
            globalTooltip.classList.remove('show');
        });
    });
}

// Flag to track if typewriter has already run
let typewriterHasRun = false;

function initTabs() {
    const tabs = document.querySelectorAll('.devtool-tab');
    const panels = document.querySelectorAll('.devtool-content');

    function switchTab(idx) {
        tabs.forEach((t, i) => {
            t.classList.toggle('active', i === idx);
            t.setAttribute('aria-selected', i === idx);
        });
        panels.forEach((p, i) => {
            p.classList.toggle('active', i === idx);
        });
        tabs[idx].focus();

        // Check if Terminal tab (index 1) is clicked for the first time
        if (idx === 1 && !typewriterHasRun) {
            setTimeout(() => {
                typewriterDeveloperInfo();
            }, 300);
        }

        setTimeout(() => {
            updateScrollIndicator();
        }, 100);
    }

    tabs.forEach((tab, ti) => {
        tab.onclick = function () { switchTab(ti); };
        tab.addEventListener("keydown", function (e) {
            if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
                let next = (ti + (e.key === "ArrowLeft" ? -1 : 1) + tabs.length) % tabs.length;
                switchTab(next);
                e.preventDefault();
            } else if (e.key === "Enter" || e.key === " ") {
                switchTab(ti);
                e.preventDefault();
            }
        });
    });
}

// Enhanced Console with selective typewriter effect
function initConsoleTypewriter() {
    // Only start typewriter when Terminal tab is clicked for the first time
    // The function will be called from tab switching logic
}

// New function for selective typewriter effect - FIXED
function typewriterDeveloperInfo() {
    // If already run, don't run again
    if (typewriterHasRun) {
        return;
    }

    const consoleContainer = document.getElementById('tab-console');

    // Clear existing content except the first few lines we want to keep
    const existingLogs = consoleContainer.querySelectorAll('.log');
    existingLogs.forEach((log, index) => {
        if (index > 1) { // Keep first 2 logs, remove the rest
            log.remove();
        }
    });

    // Create container for new content
    const contentContainer = document.createElement('div');
    contentContainer.id = 'content-container';
    consoleContainer.appendChild(contentContainer);

    // First, add the command div with proper HTML structure
    const commandDiv = document.createElement('div');
    commandDiv.className = 'log';
    commandDiv.innerHTML = '<span class="cmd">></span> <span class="key"></span>';
    contentContainer.appendChild(commandDiv);

    // Get the key span to type into
    const keySpan = commandDiv.querySelector('.key');

    // Type just the command text into the key span
    typeTextIntoSpan(keySpan, 'developer.getInfo()', 80, () => {
        // After command is typed, start typing the dictionary output line by line
        addDictionaryOutput(contentContainer, () => {
            // After dictionary is added, add all the remaining content instantly
            addRemainingContentInstantly(contentContainer);
            typewriterHasRun = true; // Mark as completed
        });
    });
}

// New function to type text into an existing span
function typeTextIntoSpan(span, text, delay, callback) {
    let i = 0;
    span.textContent = '';

    function type() {
        if (i < text.length) {
            // Set the text content up to current position
            span.textContent = text.substring(0, i + 1);

            // Add cursor effect
            span.innerHTML = span.textContent + '<span class="console-cursor">|</span>';

            setTimeout(() => {
                // Remove cursor and move to next character
                i++;
                type();
            }, delay);
        } else {
            // Final cleanup - remove cursor and set final text
            span.textContent = text;
            if (callback) callback();
        }
    }

    type();
}

// Function to type dictionary output line by line
function addDictionaryOutput(container, callback) {
    const dictLines = [
        '{',
        '    name: "Adeep I V T",',
        '    role: "Python Developer",',
        '    experience: "3+ years",',
        '    location: "Kerala, India",',
        '    timezone: "GMT+5:30"',
        '}'
    ];

    const outputDiv = document.createElement('div');
    outputDiv.className = 'log';
    outputDiv.style.cssText = 'margin-left: 20px; color: #ce9178;';
    outputDiv.innerHTML = dictLines.join('<br>');
    container.appendChild(outputDiv);

    // Call callback immediately since no typing effect
    if (callback) callback();
}

// Helper function to type text to an existing element with existing content
function typeTextToElement(element, existingContent, newLine, delay, callback) {
    let i = 0;

    function type() {
        if (i < newLine.length) {
            element.innerHTML = existingContent + newLine.substring(0, i + 1) + '<span class="console-cursor">|</span>';
            i++;
            setTimeout(() => {
                // Remove cursor before next character
                element.innerHTML = existingContent + newLine.substring(0, i);
                type();
            }, delay);
        } else {
            // Remove final cursor and call callback
            element.innerHTML = existingContent + newLine;
            if (callback) callback();
        }
    }

    type();
}

// Original typeText function for single elements
function typeText(element, text, delay, callback) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            // Handle HTML tags properly
            if (text[i] === '<') {
                let tagEnd = text.indexOf('>', i);
                if (tagEnd !== -1) {
                    element.innerHTML += text.substring(i, tagEnd + 1);
                    i = tagEnd + 1;
                } else {
                    element.innerHTML += text[i];
                    i++;
                }
            } else if (text[i] === '&') {
                // Handle HTML entities like &gt;, &lt;, &amp;
                let entityEnd = text.indexOf(';', i);
                if (entityEnd !== -1) {
                    element.innerHTML += text.substring(i, entityEnd + 1);
                    i = entityEnd + 1;
                } else {
                    element.innerHTML += text[i];
                    i++;
                }
            } else {
                element.innerHTML += text[i];
                i++;
            }

            // Add cursor effect
            element.innerHTML += '<span class="console-cursor">|</span>';

            setTimeout(() => {
                // Remove cursor before next character
                element.innerHTML = element.innerHTML.replace('<span class="console-cursor">|</span>', '');
                type();
            }, delay);
        } else {
            // Remove final cursor and call callback
            element.innerHTML = element.innerHTML.replace('<span class="console-cursor">|</span>', '');
            if (callback) callback();
        }
    }

    type();
}

// Function to add all remaining content instantly (no typewriter effect)
function addRemainingContentInstantly(container) {
    // All the remaining content appears instantly
    const remainingContent = [
        { content: '✅ Successfully deployed 12+ custom Odoo modules in production', className: 'log success' },
        { content: '⚡ Performance: Optimized ERP workflows reducing processing time by 40%', className: 'log success' },
        { content: '🏢 Business Impact: Automated 15+ manual processes saving 25+ hours weekly', className: 'log success' },
        { content: '🔧 Integration: Connected Odoo with third-party systems and APIs', className: 'log success' },
        { content: '<span class="cmd">></span> <span class="key">developer.achievements</span>', className: 'log' },
        {
            content: `[<br>    "Built custom module for manufacturing sector",<br>    "Designed inventory management system for 500+ products",<br>    "Implemented automated report generation saving 15hrs/week",<br>    "Led Odoo migration from v12 to v16 for 3 client projects"<br>]`,
            className: 'log',
            style: 'margin-left: 20px; color: #ce9178;'
        },
        { content: '⚠️ Always remember: Test in production... just kidding!', className: 'log warn' },
        { content: '🚀 Next deployment scheduled for tonight', className: 'log success' },
        { content: '<span class="cmd">></span> <span class="key">developer.currentStack</span>', className: 'log' },
        { content: '["Python", "Odoo Framework", "PostgreSQL", "Django", "FastAPI", "XML/QWeb"]', className: 'log', style: 'color: #ce9178;' },
        { content: '<span class="cmd">></span> <span class="key">developer.learning()</span>', className: 'log' },
        { content: '"Currently exploring: FastAPI, AWS and Docker"', className: 'log', style: 'color: #ce9178;' },
        { content: '<span class="cmd">></span> <span class="key">developer.expertise</span>', className: 'log' },
        { content: '"ERP Development | Business Process Automation | Custom Module Creation"', className: 'log', style: 'color: #ce9178;' },
        { content: '<span class="cmd">></span> <span class="key">contact</span>', className: 'log' }
    ];

    // Add all content instantly
    remainingContent.forEach(item => {
        const div = document.createElement('div');
        div.className = item.className;
        if (item.style) {
            div.style.cssText = item.style;
        }
        div.innerHTML = item.content;
        container.appendChild(div);
    });

    // Add contact info with copy button
    const contactDiv = document.createElement('div');
    contactDiv.className = 'log';
    contactDiv.innerHTML = `
<span id="email-txt">"adeepivt@gmail.com"</span>
<button class="copy-btn" id="copy-email" title="Copy email to clipboard">Copy</button>
`;
    container.appendChild(contactDiv);

    // // Add phone info
    // const phoneDiv = document.createElement('div');
    // phoneDiv.className = 'log';
    // phoneDiv.style.cssText = 'color: #ce9178;';
    // phoneDiv.textContent = 'Phone: +91-XXXX-XXXX-XX (Available 9 AM - 6 PM IST)';
    // container.appendChild(phoneDiv);

    // // Add test lines for scrolling
    // for (let i = 1; i <= 10; i++) {
    //     const testDiv = document.createElement('div');
    //     testDiv.className = 'log';
    //     testDiv.textContent = `Test line ${i} for scrolling`;
    //     container.appendChild(testDiv);
    // }

    // Reinitialize copy email functionality and scroll indicators
    setTimeout(() => {
        initCopyEmail();
        updateScrollIndicator();
    }, 100);
}

function initCopyEmail() {
    const copyEmailBtn = document.getElementById('copy-email');
    if (copyEmailBtn) {
        copyEmailBtn.onclick = function () {
            let email = document.getElementById('email-txt').innerText.replace(/"/g, '');
            navigator.clipboard.writeText(email).then(() => {
                this.classList.add("copied");
                this.textContent = "Copied!";
                setTimeout(() => {
                    this.classList.remove("copied");
                    this.textContent = "Copy";
                }, 1200);
            });
        };
    }
}

function initClickableElements() {
    function openDataUrl(el) {
        let url = el.dataset.url;
        if (url) window.open(url, '_blank', 'noopener');
    }

    document.querySelectorAll('.proj-title').forEach(pt => {
        pt.addEventListener('click', function () { openDataUrl(this); });
        pt.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                openDataUrl(this);
                e.preventDefault();
            }
        });
    });

    document.querySelectorAll('.exp-link').forEach(el => {
        el.setAttribute('role', 'link');
        el.setAttribute('tabindex', '0');
        el.addEventListener('click', function () { openDataUrl(this); });
        el.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                openDataUrl(this);
                e.preventDefault();
            }
        });
    });

    document.querySelectorAll('.net-request').forEach(row => {
        row.addEventListener('focus', () => row.classList.add('hover'));
        row.addEventListener('blur', () => row.classList.remove('hover'));
    });

    // Make contact links in Elements tab clickable
    initContactLinks();
}

function initContactLinks() {
    // Find the Elements tab content
    const elementsTab = document.getElementById('tab-elements');
    if (!elementsTab) return;

    // Contact link data
    const contactLinks = {
        'mailto:adeepivt@gmail.com': 'mailto:adeepivt@gmail.com',
        'https://linkedin.com/in/adeepivt': 'https://linkedin.com/in/adeepivt',
        'https://github.com/adeepivt': 'https://github.com/adeepivt'
    };

    // Find all spans with href values and make them clickable
    elementsTab.addEventListener('click', function(e) {
        const target = e.target;
        
        // Check if clicked element is a value span containing a URL
        if (target.classList.contains('value')) {
            const href = target.textContent.replace(/"/g, ''); // Remove quotes
            
            // Check if it's one of our contact links
            if (contactLinks[href]) {
                e.preventDefault();
                e.stopPropagation();
                
                // Open the link
                if (href.startsWith('mailto:')) {
                    // For email, open default mail client
                    window.location.href = href;
                } else {
                    // For other links, open in new tab
                    window.open(href, '_blank', 'noopener noreferrer');
                }
                
                // Visual feedback
                target.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    target.style.transform = 'scale(1)';
                }, 150);
            }
        }
        
        // Also check if clicked on the text content (Email, LinkedIn, GitHub)
        if (target.textContent === 'Email' || target.textContent === 'LinkedIn' || target.textContent === 'GitHub') {
            e.preventDefault();
            e.stopPropagation();
            
            // Find the corresponding href value
            let linkElement = target;
            while (linkElement && !linkElement.classList.contains('tag')) {
                linkElement = linkElement.previousElementSibling;
            }
            
            // Look for the href value in the same line
            const parentLine = target.closest('br')?.parentElement || target.parentElement;
            const valueSpan = parentLine?.querySelector('.value');
            
            if (valueSpan) {
                const href = valueSpan.textContent.replace(/"/g, '');
                
                if (contactLinks[href]) {
                    if (href.startsWith('mailto:')) {
                        window.location.href = href;
                    } else {
                        window.open(href, '_blank', 'noopener noreferrer');
                    }
                    
                    // Visual feedback
                    target.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        target.style.transform = 'scale(1)';
                    }, 150);
                }
            }
        }
    });

    // Add hover effects to make it clear these are clickable
    elementsTab.addEventListener('mouseover', function(e) {
        const target = e.target;
        
        if (target.classList.contains('value')) {
            const href = target.textContent.replace(/"/g, '');
            if (contactLinks[href]) {
                target.style.cursor = 'pointer';
                target.style.textDecoration = 'underline';
            }
        }
        
        if (target.textContent === 'Email' || target.textContent === 'LinkedIn' || target.textContent === 'GitHub') {
            target.style.cursor = 'pointer';
            target.style.textDecoration = 'underline';
        }
    });

    elementsTab.addEventListener('mouseout', function(e) {
        const target = e.target;
        
        if (target.classList.contains('value')) {
            target.style.textDecoration = 'none';
        }
        
        if (target.textContent === 'Email' || target.textContent === 'LinkedIn' || target.textContent === 'GitHub') {
            target.style.textDecoration = 'none';
        }
    });
}

function initScrollIndicators() {
    const scrollIndicator = document.getElementById('scroll-indicator');
    const devtools = document.querySelector('.devtools');

    if (!scrollIndicator || !devtools) {
        console.log('Scroll indicator elements not found');
        return;
    }

    scrollIndicator.addEventListener('click', () => {
        const activeTab = document.querySelector('.devtool-content.active');
        if (activeTab) {
            activeTab.scrollBy({ top: 200, behavior: 'smooth' });
        }
    });

    document.querySelectorAll('.devtool-content').forEach(tabContent => {
        tabContent.addEventListener('scroll', updateScrollIndicator);
    });

    window.addEventListener('resize', updateScrollIndicator);

    setTimeout(updateScrollIndicator, 500);
    setTimeout(updateScrollIndicator, 1000);
    setTimeout(updateScrollIndicator, 2000);
}

// Clickable certificate text functionality
function initCertificateButtons() {
    // Certificate data (same as before)
    const certificateData = {
        'aws-sa': {
            title: 'AWS Certified Solutions Architect - Associate',
            issuer: 'Amazon Web Services (AWS)',
            date: 'Issued: March 2023 | Valid until: March 2026',
            badge: 'Associate Level',
            icon: 'fas fa-award',
            link: 'https://www.credly.com/badges/your-aws-badge-id'
        },
        'aws-dev': {
            title: 'AWS Certified Developer - Associate',
            issuer: 'Amazon Web Services (AWS)',
            date: 'Issued: January 2023 | Valid until: January 2026',
            badge: 'Developer Track',
            icon: 'fas fa-code',
            link: 'https://www.credly.com/badges/your-aws-dev-badge-id'
        },
        'docker-dca': {
            title: 'Docker Certified Associate (DCA)',
            issuer: 'Docker, Inc.',
            date: 'Issued: February 2023 | Valid until: February 2025',
            badge: 'Container Expert',
            icon: 'fas fa-container',
            link: 'https://credentials.docker.com/your-docker-credential'
        },
        'k8s-cka': {
            title: 'Certified Kubernetes Administrator',
            issuer: 'Cloud Native Computing Foundation',
            date: 'Issued: April 2023 | Valid until: April 2026',
            badge: 'K8s Admin',
            icon: 'fas fa-network-wired',
            link: 'https://www.credly.com/badges/your-cka-badge-id'
        },
        'terraform': {
            title: 'HashiCorp Certified: Terraform Associate',
            issuer: 'HashiCorp',
            date: 'Issued: May 2023 | Valid until: May 2025',
            badge: 'Infrastructure as Code',
            icon: 'fas fa-tools',
            link: 'https://www.credly.com/badges/your-terraform-badge-id'
        },
        'mongodb': {
            title: 'MongoDB Certified Developer Associate',
            issuer: 'MongoDB University',
            date: 'Issued: December 2022 | Valid until: December 2025',
            badge: 'NoSQL Expert',
            icon: 'fas fa-database',
            link: 'https://university.mongodb.com/certification/your-mongodb-cert'
        },
        'python-pcap': {
            title: 'PCAP – Certified Associate in Python Programming',
            issuer: 'Python Institute',
            date: 'Issued: November 2022 | Valid until: November 2025',
            badge: 'Python Certified',
            icon: 'fab fa-python',
            link: 'https://pythoninstitute.org/certification/pcap-certification-associate/verify/'
        },
        'nodejs': {
            title: 'OpenJS Node.js Application Developer',
            issuer: 'Linux Foundation & OpenJS Foundation',
            date: 'Issued: October 2022 | Valid until: October 2024',
            badge: 'Node.js Expert',
            icon: 'fab fa-node-js',
            link: 'https://www.credly.com/badges/your-nodejs-badge-id'
        }
    };

    // Add click listeners to certificate text
    document.querySelectorAll('.cert-item').forEach(certItem => {
        certItem.addEventListener('click', (e) => {
            e.stopPropagation();
            const certId = certItem.getAttribute('data-cert');
            const certData = certificateData[certId];

            if (certData) {
                showCertificateModal(certData);
            }
        });
    });

    // Function to show certificate modal (same as before)
    function showCertificateModal(certData) {
        // Remove existing modal if any
        const existingModal = document.querySelector('.cert-modal');
        if (existingModal) {
            existingModal.remove();
        }

        // Create modal HTML
        const modalHTML = `
    <div class="cert-modal active">
        <div class="cert-modal-content">
            <button class="cert-close">×</button>
            <div class="cert-details">
                <div class="cert-title">${certData.title}</div>
                <div class="cert-issuer">${certData.issuer}</div>
                <div class="cert-date">${certData.date}</div>
                <div class="cert-badge">
                    <i class="${certData.icon}"></i>
                    ${certData.badge}
                </div>
                <a href="${certData.link}" target="_blank" rel="noopener" class="cert-link">
                    <i class="fas fa-external-link-alt"></i>
                    View Certificate
                </a>
            </div>
        </div>
    </div>
`;

        // Add modal to page
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Add close functionality
        const modal = document.querySelector('.cert-modal');
        const closeBtn = modal.querySelector('.cert-close');

        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }
}


// ==================== INITIALIZATION ====================

createCodeRain();
monitorLoadingProgress();

document.addEventListener('click', (e) => {
    if (e.target.closest('.splash') && !document.getElementById('splashScreen').classList.contains('fade-out')) {
        if (loadingComplete) {
            hideSplashAndShowPortfolio();
        } else {
            console.log('Please wait for loading to complete...');
        }
    }
});

setTimeout(() => {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        cursor.style.animation = 'blink 0.5s infinite';
    }
}, 4000);
// Portfolio Data Structure
const portfolioData = {
    skills: [
        {
            category: "Programming Languages",
            icon: "💻",
            color: "var(--primary)",
            items: [
                { name: "C", level: 85 },
                { name: "C++", level: 80 },
                { name: "Java", level: 75 },
                { name: "Python", level: 90 }
            ]
        },
        {
            category: "Web Development",
            icon: "🌐",
            color: "var(--secondary)",
            items: [
                { name: "HTML5", level: 95 },
                { name: "CSS3", level: 90 },
                { name: "JavaScript", level: 85 },
                { name: "React", level: 80 },
                { name: "Bootstrap", level: 90 }
            ]
        },
        {
            category: "AI & Machine Learning",
            icon: "🧠",
            color: "var(--accent)",
            items: [
                { name: "PyTorch", level: 85 },
                { name: "TensorFlow", level: 75 },
                { name: "Deep Learning", level: 80 },
                { name: "Medical Imaging", level: 85 }
            ]
        },
        {
            category: "Tools & Technologies",
            icon: "🛠️",
            color: "var(--primary)",
            items: [
                { name: "Git", level: 85 },
                { name: "MySQL", level: 80 },
                { name: "Linux", level: 75 },
                { name: "VS Code", level: 90 }
            ]
        }
    ],
    
    education: [
        {
            degree: "Master of Computer Applications (MCA)",
            institution: "Thiagarajar College of Engineering (TCE)",
            period: "2023 - 2025",
            grade: "Final Year",
            description: "Specializing in software development, AI/ML, and advanced computing concepts",
            highlights: [
                "Advanced Machine Learning",
                "Medical Image Processing",
                "Software Testing & Quality Assurance",
                "Research Projects in AI"
            ]
        },
        {
            degree: "Bachelor of Computer Science",
            institution: "University/College Name",
            period: "2019 - 2022",
            grade: "First Class",
            description: "Foundation in computer science principles, programming, and software engineering",
            highlights: [
                "Data Structures & Algorithms",
                "Database Management Systems",
                "Web Technologies",
                "Object-Oriented Programming"
            ]
        }
    ],
    
    projects: [
        {
            title: "Brain Aneurysm Detection System",
            category: "AI/ML",
            icon: "🧠",
            description: "Deep learning system using SegResNet and NN-UNet3D for detecting brain aneurysms in medical imaging data. Participated in RSNA intracranial aneurysm detection competition.",
            technologies: ["PyTorch", "Medical Imaging", "Deep Learning", "NIfTI", "DICOM"],
            features: [
                "Advanced 3D medical image segmentation",
                "Multi-model ensemble approach",
                "High accuracy detection system",
                "RSNA competition participation"
            ],
            github: "#",
            demo: "#",
            year: "2024"
        },
        {
            title: "Visuvasakappal",
            category: "Web Development",
            icon: "🚢",
            description: "Real-time project developed during internship at Digisailor. A comprehensive web application for maritime operations management.",
            technologies: ["HTML", "CSS", "JavaScript", "React", "Bootstrap"],
            features: [
                "User-friendly interface design",
                "Real-time data management",
                "Responsive web design",
                "Collaborative development"
            ],
            github: "#",
            demo: "#",
            year: "2023"
        },
        {
            title: "Fresh Wheels",
            category: "Web Development",
            icon: "🚗",
            description: "E-commerce platform for vehicle rentals developed during Digisailor internship. Enhanced user experience and functionality.",
            technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
            features: [
                "Dynamic vehicle catalog",
                "Booking management system",
                "Payment integration",
                "Admin dashboard"
            ],
            github: "#",
            demo: "#",
            year: "2023"
        },
        {
            title: "Student Information & Support System",
            category: "Full Stack",
            icon: "🎓",
            description: "Comprehensive system that streamlined data access and improved communication efficiency for educational institutions.",
            technologies: ["Python", "MySQL", "HTML", "CSS", "JavaScript"],
            features: [
                "Student data management",
                "Communication portal",
                "Performance tracking",
                "Report generation"
            ],
            github: "#",
            demo: "#",
            year: "2023"
        },
        {
            title: "Statistical Analysis System",
            category: "Research",
            icon: "📊",
            description: "Comprehensive statistical analysis toolkit for hypothesis testing, regression analysis, and data visualization.",
            technologies: ["R", "Statistics", "Data Visualization"],
            features: [
                "Hypothesis testing tools",
                "Regression analysis",
                "Interactive visualizations",
                "Statistical modeling"
            ],
            github: "#",
            demo: "#",
            year: "2024"
        },
        {
            title: "Network Protocol Analyzer",
            category: "Networking",
            icon: "🌐",
            description: "Tool for analyzing network protocols including ARP, DHCP, ICMP, and IPv6 to understand and debug network communications.",
            technologies: ["Python", "Networking", "Security"],
            features: [
                "Protocol analysis",
                "Network debugging",
                "Traffic monitoring",
                "Security assessment"
            ],
            github: "#",
            demo: "#",
            year: "2024"
        }
    ]
};

// ============================================
// PORTFOLIO LOADER FUNCTION
// ============================================

function portfolio_loader(bool) {
    const loader = document.getElementById("portfolio_loader");
    if (loader) {
        loader.style.display = bool ? "flex" : "none";
    }
}

// ============================================
// DYNAMIC DOM RENDERING FUNCTIONS
// ============================================

// Render Skills
function renderSkills() {
    const container = document.getElementById('skillsContainer');
    if (!container) return;
    
    portfolioData.skills.forEach((skillCategory, index) => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card fade-in-up';
        skillCard.style.animationDelay = `${index * 0.1}s`;
        
        skillCard.innerHTML = `
            <div class="skill-icon" style="background: ${skillCategory.color}15; color: ${skillCategory.color}">
                ${skillCategory.icon}
            </div>
            <h3>${skillCategory.category}</h3>
            <div class="skill-items">
                ${skillCategory.items.map(item => `
                    <div class="skill-item">
                        <div class="skill-item-header">
                            <span class="skill-name">${item.name}</span>
                            <span class="skill-percentage">${item.level}%</span>
                        </div>
                        <div class="skill-progress-bar">
                            <div class="skill-progress-fill" style="width: ${item.level}%; background: ${skillCategory.color}"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        container.appendChild(skillCard);
    });
}

// Render Education
function renderEducation() {
    const container = document.getElementById('educationContainer');
    if (!container) return;
    
    portfolioData.education.forEach((edu, index) => {
        const eduCard = document.createElement('div');
        eduCard.className = 'edu-card fade-in-up';
        eduCard.style.animationDelay = `${index * 0.1}s`;
        
        eduCard.innerHTML = `
            <div class="edu-header">
                <h3 class="edu-degree">${edu.degree}</h3>
                <span class="edu-period">${edu.period}</span>
            </div>
            <div class="edu-institution">
                <span class="institution-icon">🎓</span>
                <span>${edu.institution}</span>
            </div>
            <div class="edu-grade">
                <strong>Grade:</strong> ${edu.grade}
            </div>
            <p class="edu-description">${edu.description}</p>
            <div class="edu-highlights">
                <strong>Key Areas:</strong>
                <ul class="highlights-list">
                    ${edu.highlights.map(highlight => `
                        <li>${highlight}</li>
                    `).join('')}
                </ul>
            </div>
        `;
        
        container.appendChild(eduCard);
    });
}

// Render Projects
function renderProjects() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;
    
    portfolioData.projects.forEach((project, index) => {
        const projectCard = document.createElement('article');
        projectCard.className = 'project-card fade-in-up';
        projectCard.style.animationDelay = `${index * 0.1}s`;
        
        projectCard.innerHTML = `
            <div class="project-image">
                <span class="project-icon">${project.icon}</span>
                <span class="project-category">${project.category}</span>
            </div>
            <div class="project-content">
                <div class="project-header">
                    <h3>${project.title}</h3>
                    <span class="project-year">${project.year}</span>
                </div>
                <p class="project-description">${project.description}</p>
                
                <div class="project-features">
                    <strong>Key Features:</strong>
                    <ul>
                        ${project.features.map(feature => `
                            <li>${feature}</li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="skill-tags">
                    ${project.technologies.map(tech => `
                        <span class="tag">${tech}</span>
                    `).join('')}
                </div>
                
                <div class="project-links">
                    <a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer">
                        <span aria-hidden="true">💻</span> View Code
                    </a>
                    <a href="${project.demo}" class="project-link" target="_blank" rel="noopener noreferrer">
                        <span aria-hidden="true">🔗</span> Live Demo
                    </a>
                </div>
            </div>
        `;
        
        container.appendChild(projectCard);
    });
}

// ============================================
// THEME SWITCHING WITH ACCESSIBILITY
// ============================================

function initTheme() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const html = document.documentElement;
    
    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    setTheme(savedTheme);
    
    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        
        // Update active button
        themeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
            btn.setAttribute('aria-pressed', btn.dataset.theme === theme);
        });
        
        // Announce theme change to screen readers
        announceThemeChange(theme);
    }
    
    function announceThemeChange(theme) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.classList.add('sr-only');
        announcement.textContent = `${theme.charAt(0).toUpperCase() + theme.slice(1)} theme activated`;
        document.body.appendChild(announcement);
        
        setTimeout(() => announcement.remove(), 1000);
    }
    
    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setTheme(btn.dataset.theme);
        });
    });
}

// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (!mobileMenuBtn || !navLinks) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = navLinks.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        mobileMenuBtn.textContent = isExpanded ? '✕' : '☰';
    });
    
    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.textContent = '☰';
        });
    });
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================

function initToast(message = "", id = "my_toast") {
    const toast = document.querySelector(`#${id}`);
    if (!toast) return;
    
    toast.style.display = 'block';
    toast.style.zIndex = '10000';
    
    if (message) {
        const messageElement = toast.querySelector('#message');
        if (messageElement) {
            messageElement.innerText = message;
        }
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.style.display = 'none';
        }, 300);
    }, 3000);
}

// ============================================
// FORM HANDLING
// ============================================

function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        initToast("Message sent successfully! I'll get back to you soon.", "my_toast");
        
        // Reset form
        contactForm.reset();
    });
}

// ============================================
// ONLINE/OFFLINE DETECTION
// ============================================

function initNetworkDetection() {
    window.addEventListener("offline", () => {
        initToast("Oops! You are Offline now.", "my_toast_offline");
    });
    
    window.addEventListener("online", () => {
        initToast("Yeah! You're back Online.", "my_toast_offline");
    });
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in-up').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// ============================================
// BACK TO TOP BUTTON
// ============================================

function initBackToTop() {
    const backToTopBtn = document.getElementById('toparrow');
    if (!backToTopBtn) return;
    
    document.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            backToTopBtn.style.opacity = '100%';
            backToTopBtn.style.right = '0.5rem';
        } else {
            backToTopBtn.style.opacity = '0%';
            backToTopBtn.style.right = '-3rem';
        }
    });
}

// ============================================
// SMOOTH SCROLL ENHANCEMENT
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    target.focus();
                }
            }
        });
    });
}

// ============================================
// KEYBOARD NAVIGATION SHORTCUTS
// ============================================

function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.altKey) {
            switch(e.key) {
                case '1':
                    document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case '2':
                    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case '3':
                    document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case '4':
                    document.querySelector('#education')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case '5':
                    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case '6':
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    break;
            }
        }
    });
}

// ============================================
// INITIALIZATION
// ============================================

portfolio_loader(true);

document.addEventListener("DOMContentLoaded", () => {
    // Hide loader
    portfolio_loader(false);
    
    // Render dynamic content
    renderSkills();
    renderEducation();
    renderProjects();
    
    // Initialize features
    initTheme();
    initMobileMenu();
    initFormHandling();
    initNetworkDetection();
    initScrollAnimations();
    initBackToTop();
    initSmoothScroll();
    initKeyboardShortcuts();
    
    console.log("🚀 Portfolio loaded successfully!");
});
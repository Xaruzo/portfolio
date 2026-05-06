export class PortfolioController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.currentProjectIndex = 0;
    }

    init() {
        this.view.render(this.model);
        this.initTheme();
        this.initMobileNav();
        this.initScrollReveal();
        this.initSkillBars();
        this.initLightbox();
        this.initActiveNav();
        this.handleIntro();
        this.preloadProjectImages();
    }

    preloadProjectImages() {
        this.model.projects.forEach(project => {
            const img = new Image();
            img.src = project.image;
        });
    }

    initMobileNav() {
        const hamburger = document.getElementById('hamburger');
        const navLinksContainer = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-link');

        if (hamburger) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinksContainer.classList.toggle('active');
                document.body.classList.toggle('no-scroll');
            });
        }

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinksContainer.classList.contains('active') && 
                !navLinksContainer.contains(e.target) && 
                !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    handleIntro() {
        const overlay = document.getElementById('intro-overlay');
        const status = overlay.querySelector('.intro-status');
        const nameEl = document.getElementById('intro-name');
        const sparksContainer = document.getElementById('sparks-container');
        const fullName = "Xaruzo";
        
        // 1. Single Lightning Strike from top-left to center
        
        // 2. Cumulative Name Reveal + Spark Impact
        setTimeout(() => {
            this.triggerExplosion(sparksContainer);
            
            let currentText = "";
            fullName.split("").forEach((char, i) => {
                setTimeout(() => {
                    currentText += char;
                    nameEl.textContent = currentText;
                    nameEl.setAttribute('data-text', currentText);
                }, i * 150);
            });
        }, 350); // Timing synchronized with lightning strike

        // 3. System Status Steps
        const steps = [
            { ms: 1200, text: 'Initializing Portfolio...' },
            { ms: 2000, text: 'Loading Assets...' },
            { ms: 2800, text: 'Xaruzo Ready.' }
        ];

        steps.forEach(step => {
            setTimeout(() => {
                status.textContent = step.text;
            }, step.ms);
        });

        // 4. Final Hide
        setTimeout(() => {
            overlay.classList.add('hidden');
            // Remove from DOM or set display:none after transition
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 1000);
        }, 3500);
    }

    triggerExplosion(container) {
        for (let i = 0; i < 20; i++) {
            const spark = document.createElement('div');
            spark.className = 'spark';
            
            // Random direction and distance
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 100;
            const tx = Math.cos(angle) * distance + 'px';
            const ty = Math.sin(angle) * distance + 'px';
            
            spark.style.setProperty('--tx', tx);
            spark.style.setProperty('--ty', ty);
            
            // Randomize size and duration
            const size = 2 + Math.random() * 3 + 'px';
            spark.style.width = size;
            spark.style.height = size;
            
            spark.style.animation = `explode ${0.4 + Math.random() * 0.4}s ease-out forwards`;
            
            container.appendChild(spark);
            
            // Cleanup
            setTimeout(() => spark.remove(), 1000);
        }
    }

    initTheme() {
        const toggle = document.getElementById('theme-toggle');
        const sun = toggle.querySelector('.sun-icon');
        const moon = toggle.querySelector('.moon-icon');
        
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        this.updateThemeIcons(currentTheme, sun, moon);
        
        toggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            this.updateThemeIcons(theme, sun, moon);
        });
    }

    updateThemeIcons(theme, sun, moon) {
        if (theme === 'dark') {
            sun.style.display = 'none';
            moon.style.display = 'inline';
        } else {
            sun.style.display = 'inline';
            moon.style.display = 'none';
        }
    }

    initActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });
    }

    initScrollReveal() {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                } else {
                    // Return animation: reset when completely out of view
                    const rect = e.target.getBoundingClientRect();
                    const isAbove = rect.bottom < 0;
                    const isBelow = rect.top > window.innerHeight;
                    
                    if (isAbove || isBelow) {
                        e.target.classList.remove('visible');
                    }
                }
            });
        }, { 
            threshold: 0.05 // Trigger as soon as 5% is visible
        });

        const animatedElements = document.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right');
        animatedElements.forEach(el => obs.observe(el));
    }

    initSkillBars() {
        const barObs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                const bars = e.target.querySelectorAll('.skill-bar');
                if (e.isIntersecting) {
                    bars.forEach(b => {
                        const w = b.getAttribute('data-width');
                        setTimeout(() => {
                            b.style.transition = 'width 1.2s cubic-bezier(0.2, 0, 0.2, 1)';
                            b.style.width = w;
                        }, 100);
                    });
                } else {
                    // Reset bars when out of view for return animation
                    bars.forEach(b => {
                        b.style.transition = 'none';
                        b.style.width = '0';
                    });
                }
            });
        }, { threshold: 0.2 });
        document.querySelectorAll('.skills-grid').forEach(el => barObs.observe(el));
    }

    initLightbox() {
        const items = Array.from(document.querySelectorAll('.gallery-item'));
        const overlay = document.getElementById('lightbox');
        const lbClose = document.getElementById('lb-close');
        const lbPrev = document.getElementById('lb-prev');
        const lbNext = document.getElementById('lb-next');

        items.forEach((item, i) => {
            const screen = item.querySelector('.gallery-screen');
            if (screen) {
                screen.addEventListener('click', () => this.openLightbox(i));
            }
        });

        if (lbClose) lbClose.addEventListener('click', () => this.closeLightbox());
        if (overlay) {
            overlay.addEventListener('click', e => {
                if (e.target === overlay) this.closeLightbox();
            });
        }

        if (lbPrev) {
            lbPrev.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.currentProjectIndex > 0) this.openLightbox(this.currentProjectIndex - 1);
            });
        }

        if (lbNext) {
            lbNext.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.currentProjectIndex < items.length - 1) this.openLightbox(this.currentProjectIndex + 1);
            });
        }

        document.addEventListener('keydown', e => {
            if (!overlay || !overlay.classList.contains('active')) return;
            if (e.key === 'Escape') this.closeLightbox();
            if (e.key === 'ArrowLeft') {
                if (this.currentProjectIndex > 0) this.openLightbox(this.currentProjectIndex - 1);
            }
            if (e.key === 'ArrowRight') {
                if (this.currentProjectIndex < items.length - 1) this.openLightbox(this.currentProjectIndex + 1);
            }
        });
    }

    openLightbox(idx) {
        this.currentProjectIndex = idx;
        const project = this.model.projects[idx];
        const overlay = document.getElementById('lightbox');
        const lbImg = document.getElementById('lb-img');
        const lbTitle = document.getElementById('lb-title');
        const lbNum = document.getElementById('lb-num');
        const lbPrev = document.getElementById('lb-prev');
        const lbNext = document.getElementById('lb-next');

        if (lbImg) {
            lbImg.src = project.image;
            lbImg.alt = project.title;
        }
        if (lbTitle) lbTitle.textContent = project.title;
        if (lbNum) lbNum.textContent = project.num;
        if (lbPrev) lbPrev.disabled = idx === 0;
        if (lbNext) lbNext.disabled = idx === this.model.projects.length - 1;

        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        const closeBtn = document.getElementById('lb-close');
        if (closeBtn) closeBtn.focus();
    }

    closeLightbox() {
        const overlay = document.getElementById('lightbox');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

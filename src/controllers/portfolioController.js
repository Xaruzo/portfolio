export class PortfolioController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.currentProjectIndex = 0;
    }

    init() {
        this.view.render(this.model);
        if (window.lucide) {
            lucide.createIcons();
        }
        this.initTheme();
        this.initMobileNav();
        this.initScrollReveal();
        this.initSkillBars();
        this.initLightbox();
        this.initActiveNav();
        this.initCopyEmail();
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

        const closeMenu = () => {
            if (!hamburger) return;
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
            document.body.classList.remove('no-scroll');
        };

        if (hamburger) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinksContainer.classList.toggle('active');
                document.body.classList.toggle('no-scroll');
            });
        }

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger) return;
            if (navLinksContainer.classList.contains('active') &&
                !navLinksContainer.contains(e.target) &&
                !hamburger.contains(e.target)) {
                closeMenu();
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinksContainer.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    initTheme() {
        const toggle = document.getElementById('theme-toggle');
        const sun = toggle.querySelector('.sun-icon');
        const moon = toggle.querySelector('.moon-icon');
        
        const currentTheme = localStorage.getItem('theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
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
                if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
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

    initCopyEmail() {
        const emailWrappers = document.querySelectorAll('.email-copy-wrapper');
        emailWrappers.forEach(wrapper => {
            wrapper.addEventListener('click', () => {
                const email = wrapper.getAttribute('data-email');
                navigator.clipboard.writeText(email).then(() => {
                    this.showToast('Email address copied!');
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            });
        });
    }

    showToast(message) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        container.appendChild(toast);
        
        // Trigger reflow for animation
        toast.offsetHeight;
        toast.classList.add('visible');
        
        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    initScrollReveal() {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.style.willChange = 'opacity, transform';
                    e.target.classList.add('visible');
                    e.target.addEventListener('transitionend', () => {
                        e.target.style.willChange = 'auto';
                    }, { once: true });
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

        // Swipe support for mobile
        let touchStartX = 0;
        if (overlay) {
            overlay.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            overlay.addEventListener('touchend', e => {
                if (!overlay.classList.contains('active')) return;
                const delta = e.changedTouches[0].screenX - touchStartX;
                if (Math.abs(delta) < 40) return; // ignore short taps
                if (delta < 0 && this.currentProjectIndex < items.length - 1) {
                    this.openLightbox(this.currentProjectIndex + 1); // swipe left = next
                } else if (delta > 0 && this.currentProjectIndex > 0) {
                    this.openLightbox(this.currentProjectIndex - 1); // swipe right = prev
                }
            }, { passive: true });
        }
    }

    openLightbox(idx) {
        this.currentProjectIndex = idx;
        const project = this.model.projects[idx];
        const overlay = document.getElementById('lightbox');
        const lbTitle = document.getElementById('lb-title');
        const lbNum = document.getElementById('lb-num');
        const lbDemo = document.getElementById('lb-demo');
        const lbPrev = document.getElementById('lb-prev');
        const lbNext = document.getElementById('lb-next');
        const lbImages = document.querySelectorAll('.lb-img-item');

        // Toggle active image
        lbImages.forEach(img => {
            if (parseInt(img.getAttribute('data-index')) === idx) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });

        if (lbTitle) lbTitle.textContent = project.title;
        if (lbNum) lbNum.textContent = project.num;
        if (lbDemo) lbDemo.href = project.url;
        if (lbPrev) lbPrev.disabled = idx === 0;
        if (lbNext) lbNext.disabled = idx === this.model.projects.length - 1;

        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        const overlay = document.getElementById('lightbox');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

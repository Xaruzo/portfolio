export class PortfolioView {
    constructor() {
        this.app = document.getElementById('app');
    }

    renderNav() {
        return `
            <nav>
                <a href="#home" class="logo">Xaru<span>zo</span></a>
                
                <div class="nav-right">
                    <ul class="nav-links">
                        <li><a href="#home" class="nav-link">Home</a></li>
                        <li><a href="#about" class="nav-link">About</a></li>
                        <li><a href="#skills" class="nav-link">Skills</a></li>
                        <li><a href="#work" class="nav-link">Work</a></li>
                        <li><a href="#contact" class="nav-link">Contact</a></li>
                    </ul>
                    
                    <div class="nav-actions">
                        <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
                            <span class="sun-icon">☀️</span>
                            <span class="moon-icon" style="display:none;">🌙</span>
                        </button>
                        
                        <button class="hamburger" id="hamburger" aria-label="Menu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </nav>
        `;
    }

    renderHero(personalInfo, socialLinks) {
        const socialLinksHtml = socialLinks.map(link => `
            <a href="${link.url}" class="hero-social-link fade-up" target="_blank" aria-label="${link.name}">
                ${this.getSocialIcon(link.icon)}
            </a>
        `).join('');

        return `
            <section id="home">
                <div class="hero-text">
                    <span class="hero-tag fade-up">Available for Collaboration</span>
                    <h1 class="hero-name fade-up delay-1">Hi, I'm <em>${personalInfo.name.split(' ')[0]}</em><br>${personalInfo.name.split(' ').slice(1).join(' ')}</h1>
                    <p class="hero-role fade-up delay-2">${personalInfo.role}</p>
                    <p class="hero-desc fade-up delay-3">${personalInfo.description}</p>
                    <div class="hero-actions">
                        <a href="#contact" class="btn fade-up delay-4">Contact Me &rarr;</a>
                        <div class="hero-socials">
                            ${socialLinksHtml}
                        </div>
                    </div>
                </div>

                <div class="hero-visual fade-up delay-5">
                    <div class="hero-circle-wrap">
                        <div class="hero-circle-bg"></div>
                        <div class="hero-circle-glow"></div>
                        <div class="hero-circle-fill"></div>
                        <div class="hero-circle-ring"></div>
                        <div class="hero-photo">
                            <img src="${personalInfo.heroImage}" alt="${personalInfo.name}">
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderAbout(personalInfo) {
        const aboutParagraphs = personalInfo.about.map((p, index) => `<p class="fade-up delay-${index + 1}">${p}</p>`).join('');
        const focusAreasHtml = personalInfo.focusAreas.join(' &bull; ');

        return `
            <section id="about">
                <div class="section-header fade-up">
                    <span class="section-num">01 — About</span>
                    <h2 class="section-title">The Architect<br>Behind the Code</h2>
                    <div class="section-line"></div>
                </div>
                <div class="about-grid">
                    <div class="about-body">
                        ${aboutParagraphs}
                    </div>
                    <div>
                        <div class="edu-block fade-up delay-2">
                            <h4>${personalInfo.role.split(' & ')[1]}</h4>
                            <span>${personalInfo.year} &nbsp;|&nbsp; ${personalInfo.school} &nbsp;|&nbsp; ${personalInfo.location.split(', ')[1]}, ${personalInfo.location.split(', ')[0]}</span>
                        </div>
                        <div class="fade-up delay-3" style="margin-top:24px;padding:20px 0;border-top:1px solid var(--gray);border-bottom:1px solid var(--gray);">
                            <p style="font-size:0.8rem;color:var(--mid);line-height:1.9;">
                                Focus Areas: ${focusAreasHtml}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderSkills(skills) {
        const skillsHtml = skills.map((skill, index) => `
            <div class="skill-card fade-up delay-${(index % 6) + 1}">
                <div class="skill-icon">${skill.icon}</div>
                <h4>${skill.name}</h4>
                <p>${skill.description}</p>
                <div class="skill-bar-wrap">
                    <div class="skill-bar" data-width="${skill.level}%" style="width: 0;"></div>
                </div>
            </div>
        `).join('');

        return `
            <section id="skills">
                <div class="section-header fade-up">
                    <span class="section-num">02 — Skills</span>
                    <h2 class="section-title">Technical<br>Stack</h2>
                    <div class="section-line"></div>
                </div>
                <div class="skills-grid">
                    ${skillsHtml}
                </div>
            </section>
        `;
    }

    renderWork(projects) {
        const projectsHtml = projects.map((project, index) => `
            <div class="gallery-item fade-up delay-${(index % 3) + 1}" data-index="${project.id}">
                <div class="gallery-chrome">
                    <div class="gallery-dot gdot-r"></div>
                    <div class="gallery-dot gdot-y"></div>
                    <div class="gallery-dot gdot-g"></div>
                    <div class="gallery-url">${project.url}</div>
                </div>
                <div class="gallery-screen">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="gallery-overlay">
                        <span class="gallery-overlay-num">${project.num}</span>
                        <span class="gallery-overlay-title">${project.title}</span>
                        <div class="gallery-overlay-tags">
                            ${project.tags.map(tag => `<span class="gallery-overlay-tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="gallery-label">
                    <span class="gallery-label-num">${project.num}</span>
                    <span class="gallery-label-title">${project.title}</span>
                </div>
            </div>
        `).join('');

        return `
            <section id="work">
                <div class="section-header fade-up">
                    <span class="section-num">03 — Work</span>
                    <h2 class="section-title">Featured<br>Activities</h2>
                    <div class="section-line"></div>
                </div>
                <div class="work-gallery">
                    ${projectsHtml}
                </div>
            </section>
        `;
    }

    renderContact(personalInfo, socialLinks) {
        const socialLinksHtml = socialLinks.map((link, index) => `
            <a href="${link.url}" class="contact-link fade-up delay-${index + 1}" target="_blank">
                <span class="contact-icon">${this.getSocialIcon(link.icon)}</span>
                <span>${link.url.replace('https://', '')}</span>
            </a>
        `).join('');

        return `
            <section id="contact">
                <div class="section-header fade-up">
                    <span class="section-num">04 — Contact</span>
                    <h2 class="section-title">Let's Build<br>Something Logical</h2>
                    <div class="section-line"></div>
                </div>
                <div class="contact-grid">
                    <div>
                        <p class="contact-desc fade-up delay-1">Open to collaborations, project discussions, and connecting with fellow system thinkers. Reach out through any channel below.</p>
                        ${socialLinksHtml}
                        <a href="#" class="dl-btn fade-up delay-4">&#8595; Download Resume (PDF)</a>
                    </div>
                    <div class="fade-up delay-5" style="display:flex;align-items:flex-start;padding-top:8px;">
                        <div style="border:1px solid rgba(255,255,255,0.1);padding:36px;border-radius:4px;width:100%;">
                            <p class="fade-up" style="font-family:'Syne',sans-serif;font-size:0.8rem;letter-spacing:2px;text-transform:uppercase;color:var(--maroon-glow);margin-bottom:20px;">Quick Note</p>
                            <p class="fade-up delay-1" style="font-size:0.85rem;line-height:2;color:rgba(255,255,255,0.55);">
                                I'm currently focused on deepening my expertise in <strong style="color:rgba(255,255,255,0.8);">JavaFX architecture</strong> and <strong style="color:rgba(255,255,255,0.8);">Python Flet</strong> reactive systems. If you're working on something that demands precision and logical thinking, I'd love to hear about it.
                            </p>
                            <div class="fade-up delay-2" style="margin-top:24px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.06);">
                                <p style="font-size:0.75rem;color:rgba(255,255,255,0.25);letter-spacing:1px;">${personalInfo.school} — ${personalInfo.location.split(', ')[1]}, PH</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderFooter(personalInfo) {
        return `
            <footer>
                <p>&copy; 2025 ${personalInfo.name} &mdash; ${personalInfo.nickname} &nbsp;|&nbsp; ${personalInfo.role.split(' & ')[1]} &middot; System Architect &nbsp;|&nbsp; ${personalInfo.school}</p>
            </footer>
        `;
    }

    renderLightbox() {
        return `
            <div class="lightbox-overlay" id="lightbox" role="dialog" aria-modal="true">
                <div class="lightbox-box">
                    <div class="lightbox-chrome">
                        <div class="gallery-dot gdot-r"></div>
                        <div class="gallery-dot gdot-y"></div>
                        <div class="gallery-dot gdot-g"></div>
                        <span class="lightbox-title" id="lb-title"></span>
                        <button class="lightbox-close" id="lb-close" aria-label="Close">&times;</button>
                    </div>
                    <div class="lightbox-img-wrap">
                        <img id="lb-img" src="" alt="">
                    </div>
                    <div class="lightbox-footer">
                        <span class="lightbox-num" id="lb-num"></span>
                        <div class="lightbox-nav">
                            <button id="lb-prev">&#8592; Prev</button>
                            <button id="lb-next">Next &#8594;</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getSocialIcon(icon) {
        if (icon === 'github') {
            return `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`;
        } else if (icon === 'linkedin') {
            return `<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;
        } else if (icon === 'x') {
            return `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`;
        }
        return '';
    }

    render(data) {
        this.app.innerHTML = `
            ${this.renderNav()}
            ${this.renderHero(data.personalInfo, data.socialLinks)}
            ${this.renderAbout(data.personalInfo)}
            ${this.renderSkills(data.skills)}
            ${this.renderWork(data.projects)}
            ${this.renderContact(data.personalInfo, data.socialLinks)}
            ${this.renderFooter(data.personalInfo)}
            ${this.renderLightbox()}
        `;
    }
}

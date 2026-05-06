export class PortfolioView {
    constructor() {
        this.app = document.getElementById('app');
    }

    renderNav() {
        return `
            <nav>
                <a href="#home" class="logo"><img src="images/logo.png" alt="Xaruzo Logo" class="nav-logo-img">Xaru<span>zo</span></a>
                
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
            <a href="${link.url}" class="hero-social-link fade-up" target="_blank" rel="noopener noreferrer" aria-label="${link.name}">
                ${this.getSocialIcon(link.icon)}
            </a>
        `).join('');

        return `
            <section id="home">
                <div class="hero-text">
                    <span class="hero-tag fade-up">Open to Opportunities</span>
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
                            <img src="${personalInfo.heroImage}" alt="${personalInfo.name}" onerror="this.style.display='none'">
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
                        <div class="about-focus-wrap fade-up delay-3">
                            <p class="about-focus-text">
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
                <div class="skill-icon">
                    <i data-lucide="${skill.icon}"></i>
                </div>
                <h4>${skill.name}</h4>
                <p>${skill.description}</p>
                <div class="skill-tags">
                    ${skill.tags.map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
                </div>
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
            <div class="gallery-item fade-up delay-${(index % 3) + 1}" data-index="${index}">
                <div class="gallery-chrome">
                    <div class="gallery-dot gdot-r"></div>
                    <div class="gallery-dot gdot-y"></div>
                    <div class="gallery-dot gdot-g"></div>
                    <div class="gallery-url">${project.url.replace('https://', '')}</div>
                </div>
                <div class="gallery-screen">
                    <img src="${project.image}" alt="${project.title}" onerror="this.style.visibility='hidden'">
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
                    <h2 class="section-title">Selected<br>Work</h2>
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
            <a href="${link.url}" class="contact-link fade-up delay-${index + 1}" target="_blank" rel="noopener noreferrer" aria-label="${link.name}">
                <span class="contact-icon">${this.getSocialIcon(link.icon)}</span>
                <span>${link.name === 'Email' ? link.url.replace('mailto:', '') : link.url.replace('https://', '')}</span>
            </a>
        `).join('');

        return `
            <section id="contact">
                <div class="section-header fade-up">
                    <span class="section-num">04 — Contact</span>
                    <h2 class="section-title">Let's Work<br>Together</h2>
                    <div class="section-line"></div>
                </div>
                <div class="contact-grid">
                    <div>
                        <p class="contact-desc fade-up delay-1">I'm open to internship opportunities, project collaborations, and conversations with engineers building things that matter. If you're looking for someone who takes code quality seriously — let's connect.</p>
                        ${socialLinksHtml}
                        <!-- Unhide and update href once resume PDF is ready -->
                        <!-- <a href="resume.pdf" class="dl-btn fade-up delay-4" download>&#8595; Download Resume (PDF)</a> -->
                    </div>
                    <div class="contact-note-wrap fade-up delay-5">
                        <div class="contact-note-box">
                            <p class="contact-note-label fade-up">Quick Note</p>
                            <p class="contact-note-body fade-up delay-1">
                                    Currently deepening my expertise in <strong class="contact-note-strong">JavaFX architecture</strong> and <strong class="contact-note-strong">Python Flet</strong> reactive systems while completing my CS degree. If you're building something that demands clean logic and precise engineering, I'd genuinely love to hear about it.
                                </p>
                            <div class="contact-note-footer fade-up delay-2">
                                <p class="contact-note-school">${personalInfo.school} — ${personalInfo.location.split(', ')[1]}, PH</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderFooter(personalInfo) {
        const year = new Date().getFullYear();
        return `
            <footer>
                <p>&copy; ${year} ${personalInfo.name} &mdash; ${personalInfo.nickname} &nbsp;|&nbsp; ${personalInfo.role.split(' & ')[1]} &middot; System Architect &nbsp;|&nbsp; ${personalInfo.school}</p>
            </footer>
        `;
    }

    renderLightbox(projects) {
        const imagesHtml = projects.map((project, index) => `
            <img class="lb-img-item" data-index="${index}" src="${project.image}" alt="${project.title}">
        `).join('');

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
                        ${imagesHtml}
                    </div>
                    <div class="lightbox-footer">
                        <div class="lightbox-info">
                            <span class="lightbox-num" id="lb-num"></span>
                            <a href="#" id="lb-demo" class="lb-demo-btn" target="_blank">Open Activity &rarr;</a>
                        </div>
                        <div class="lightbox-nav">
                            <button id="lb-prev" aria-label="Previous project">&#8592; Prev</button>
                            <button id="lb-next" aria-label="Next project">Next &#8594;</button>
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
        } else if (icon === 'mail') {
            return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;
        } else if (icon === 'phone') {
            return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
        }
        return '';
    }

    render(data) {
        this.app.innerHTML = `
            ${this.renderNav()}
            <main>
                ${this.renderHero(data.personalInfo, data.socialLinks)}
                ${this.renderAbout(data.personalInfo)}
                ${this.renderSkills(data.skills)}
                ${this.renderWork(data.projects)}
                ${this.renderContact(data.personalInfo, data.socialLinks)}
            </main>
            ${this.renderFooter(data.personalInfo)}
            ${this.renderLightbox(data.projects)}
        `;
    }
}

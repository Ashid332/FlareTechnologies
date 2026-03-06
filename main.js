document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       Navigation & Mobile Menu
       ========================================================= */
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    // Toggle Mobile Menu
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close menu on link click
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Scroll Effects for Transparent-to-Solid Header
    let lastScroll = 0;

    // Check initial scroll position on load
    if (window.pageYOffset > 50) {
        header.classList.add('scrolled');
    }

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add blurred background when scrolling down past top
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide nav logic (optional, keeping for UX)
        if (currentScroll <= 0) {
            header.classList.remove('hide-nav');
        } else if (currentScroll > lastScroll && currentScroll > 150) {
            // scrolling down
            header.classList.add('hide-nav');
            // close mobile menu if scrolling
            if (mobileNav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        } else {
            // scrolling up
            header.classList.remove('hide-nav');
        }
        lastScroll = currentScroll;
    });


    /* =========================================================
       Elegant Scroll Animations (Intersection Observer)
       ========================================================= */
    const scrollObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Triggers when 10% visible to allow early natural fade
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Run animation only once
                observer.unobserve(entry.target);
            }
        });
    }, scrollObserverOptions);

    const animElements = document.querySelectorAll('.scroll-anim');
    animElements.forEach(el => {
        scrollObserver.observe(el);
    });

    /* =========================================================
       Hero 3D Parallax Effect
       ========================================================= */
    const scene = document.getElementById('scene');
    const parallaxLayer = document.querySelector('.parallax-layer');

    if (scene && parallaxLayer) {
        // Only run on desktop where hover makes sense
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            scene.addEventListener('mousemove', (e) => {
                const rect = scene.getBoundingClientRect();

                // Calculate mouse position relative to center of the container (-1 to 1)
                const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
                const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

                // Subtle rotation and translation multipliers
                const depth = parseFloat(parallaxLayer.getAttribute('data-depth')) || 0.15;
                const rotateX = -y * depth * 15; // Max degrees of rotation
                const rotateY = x * depth * 15;
                const translateX = x * depth * 30; // Max px of movement
                const translateY = y * depth * 30;

                // Apply spatial transformation
                parallaxLayer.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            // Smoothly snap back to origin on mouse exit
            scene.addEventListener('mouseleave', () => {
                parallaxLayer.style.transform = `translate3d(0, 0, 0) rotateX(0) rotateY(0)`;
            });
        }
    }

    /* =========================================================
       Flare Technologies AI Sales Assistant Chatbot
       ========================================================= */
    class FlareChatbot {
        constructor() {
            this.launcher = document.getElementById('chatLauncher');
            this.window = document.getElementById('chatWindow');
            this.body = document.getElementById('chatBody');
            this.optionsContainer = document.getElementById('chatOptions');
            this.form = document.getElementById('chatForm');
            this.input = document.getElementById('chatInput');
            this.launcherIcon = this.launcher.querySelector('.launcher-icon');
            this.closeIcon = this.launcher.querySelector('.close-icon');

            this.isOpen = false;
            this.init();
        }

        init() {
            // Event Listeners
            this.launcher.addEventListener('click', () => this.toggleChat());
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));

            // Setup Initial State
            this.postBotMessage(`Hello! I'm the Flare assistant.<br>I can help you explore our AI automation, marketing systems, and development solutions.<br><br>What would you like to do today?`);
            this.renderOptions([
                { text: 'Explore Services', action: 'explore' },
                { text: 'Learn About AI Automation', action: 'ai_auto' },
                { text: 'Ask a Question', action: 'ask' },
                { text: 'Book Consultation', action: 'book', style: 'action-btn' },
                { text: 'Request Strategy Audit', action: 'audit', style: 'action-btn' }
            ]);
        }

        toggleChat() {
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                this.window.classList.remove('hidden');
                this.launcherIcon.classList.add('hidden');
                this.closeIcon.classList.remove('hidden');
                setTimeout(() => this.input.focus(), 300);
            } else {
                this.window.classList.add('hidden');
                this.launcherIcon.classList.remove('hidden');
                this.closeIcon.classList.add('hidden');
            }
        }

        postBotMessage(htmlContent) {
            const msgDiv = document.createElement('div');
            msgDiv.className = 'chat-msg bot';
            msgDiv.innerHTML = htmlContent;
            this.body.appendChild(msgDiv);
            this.scrollToBottom();
        }

        postUserMessage(text) {
            const msgDiv = document.createElement('div');
            msgDiv.className = 'chat-msg user';
            msgDiv.textContent = text;
            this.body.appendChild(msgDiv);
            this.scrollToBottom();
        }

        renderOptions(options) {
            this.optionsContainer.innerHTML = '';
            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = `chat-chip ${opt.style || ''}`;
                btn.textContent = opt.text;
                btn.onclick = () => this.handleOptionClick(opt);
                this.optionsContainer.appendChild(btn);
            });
        }

        scrollToBottom() {
            this.body.scrollTop = this.body.scrollHeight;
        }

        handleSubmit(e) {
            e.preventDefault();
            const text = this.input.value.trim();
            if (!text) return;

            this.input.value = '';
            this.postUserMessage(text);
            this.processRouting(text);
        }

        handleOptionClick(opt) {
            this.postUserMessage(opt.text);
            if (opt.action === 'book' || opt.action === 'audit') {
                this.triggerConversion(opt.action);
                return;
            }
            this.processRouting(opt.text);
        }

        triggerConversion(type) {
            this.optionsContainer.innerHTML = '';
            setTimeout(() => {
                if (type === 'book') {
                    this.postBotMessage(`Excellent. You can schedule a consultation with our team to discuss your project in detail.<br><br><a href="#contact" class="chat-chip action-btn" style="display:inline-block; margin-top:10px; text-decoration:none;">Go to Contact Form</a>`);
                } else {
                    this.postBotMessage(`Great choice. We can run a strategy audit where we review your current systems and recommend improvements.<br><br><a href="#contact" class="chat-chip action-btn" style="display:inline-block; margin-top:10px; text-decoration:none;">Go to Contact Form</a>`);
                }
            }, 600);
        }

        processRouting(input) {
            this.optionsContainer.innerHTML = ''; // Clear chips while 'thinking'
            const lowerInput = input.toLowerCase();

            setTimeout(() => {
                let response = "";

                if (lowerInput.includes('website') || lowerInput.includes('build') || lowerInput.includes('development')) {
                    response = "Flare can help with that. We design and build modern websites and digital platforms while also supporting marketing and automation systems if needed.<br><br>Would you like to book a consultation to discuss your project, or request a strategy audit to evaluate your current digital setup?";
                } else if (lowerInput.includes('marketing') || lowerInput.includes('seo') || lowerInput.includes('launch')) {
                    response = "We specialize in Growth & Marketing Systems, including digital marketing strategies, influencer-led product launches, and e-commerce growth acceleration.<br><br>Would you like to book a consultation to discuss your project, or request a strategy audit?";
                } else if (lowerInput.includes('ai') || lowerInput.includes('automation') || lowerInput.includes('operations')) {
                    response = "Our AI & Automation Systems cover automation workflows, cloud infrastructure and migration, and custom operational logistics.<br><br>Would you like to book a consultation to discuss your project, or request a strategy audit to evaluate your current digital setup?";
                } else if (lowerInput.includes('what do you do') || lowerInput.includes('services') || lowerInput.includes('explore') || lowerInput.includes('what does flare do')) {
                    response = "Yes. Flare provides AI automation, marketing systems, development services, and cloud infrastructure. Our goal is to provide businesses with a complete ecosystem of solutions rather than isolated services.<br><br>How can we help you scale today?";
                } else if (lowerInput.includes('book') || lowerInput.includes('consultation')) {
                    this.triggerConversion('book');
                    return;
                } else if (lowerInput.includes('audit') || lowerInput.includes('strategy')) {
                    this.triggerConversion('audit');
                    return;
                } else {
                    response = "I may not have all the details on that, but our team would be happy to help. You can book a consultation to speak directly with a specialist.";
                }

                this.postBotMessage(response);
                this.renderOptions([
                    { text: 'Book Consultation', action: 'book', style: 'action-btn' },
                    { text: 'Request Strategy Audit', action: 'audit', style: 'action-btn' },
                    { text: 'Ask another question', action: 'ask' }
                ]);

            }, 800); // Simulated delay
        }
    }

    // Initialize Chatbot when DOM loads
    if (document.getElementById('flareChatbot')) {
        new FlareChatbot();
    }

});

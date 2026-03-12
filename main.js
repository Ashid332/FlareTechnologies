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
            this.body = document.querySelector('.chatbot-body');
            this.input = document.querySelector('.chat-input');
            this.sendBtn = document.querySelector('.chat-send');

            this.captureState = 'IDLE';
            this.leadData = {};
            this.init();
        }

        init() {
            if (!this.body || !this.input || !this.sendBtn) return;

            // Event Listeners for sending messages
            this.sendBtn.addEventListener('click', () => this.handleSubmit());
            this.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleSubmit();
                }
            });
        }

        postBotMessage(htmlContent) {
            const msgDiv = document.createElement('div');
            msgDiv.className = 'chat-message bot-message';
            msgDiv.innerHTML = htmlContent;
            this.body.appendChild(msgDiv);
            this.scrollToBottom();
        }

        postUserMessage(text) {
            const msgDiv = document.createElement('div');
            // Reusing existing text string for user bubble, inline styles to differentiate from bot
            msgDiv.className = 'chat-message user-message';
            msgDiv.style.alignSelf = 'flex-end';
            msgDiv.style.background = 'var(--infinity-gradient)';
            msgDiv.style.color = '#fff';
            msgDiv.style.borderRadius = '20px 20px 4px 20px';
            msgDiv.style.border = 'none';
            msgDiv.textContent = text;
            this.body.appendChild(msgDiv);
            this.scrollToBottom();
        }

        scrollToBottom() {
            this.body.scrollTop = this.body.scrollHeight;
        }

        handleSubmit() {
            const text = this.input.value.trim();
            if (!text) return;

            this.input.value = '';
            this.postUserMessage(text);
            this.processRouting(text);
        }

        startLeadCapture() {
            this.captureState = 'NAME';
            this.leadData = {};
            setTimeout(() => {
                this.postBotMessage("Would you like us to review your project and suggest the best approach?<br><br>First, what is your name?");
            }, 600);
        }

        showTypingIndicator() {
            if (this.typingIndicator) return;
            this.typingIndicator = document.createElement('div');
            this.typingIndicator.className = 'typing-indicator';
            this.typingIndicator.innerHTML = `
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            `;
            this.body.appendChild(this.typingIndicator);
            this.scrollToBottom();
        }

        removeTypingIndicator() {
            if (this.typingIndicator) {
                this.typingIndicator.remove();
                this.typingIndicator = null;
            }
        }

        async processRouting(input) {
            const lowerInput = input.toLowerCase();

            // --- Stateful Lead Capture Routing ---
            if (this.captureState === 'NAME') {
                this.leadData.name = input;
                this.captureState = 'EMAIL';
                this.postBotMessage(`Thanks, ${this.leadData.name}. What is your best email address?`);
                return;
            }

            if (this.captureState === 'EMAIL') {
                this.leadData.email = input;
                this.captureState = 'PROJECT';
                this.postBotMessage(`Perfect. What type of project or business are you running?`);
                return;
            }

            if (this.captureState === 'PROJECT') {
                this.leadData.project = input;
                this.captureState = 'GOAL';
                this.postBotMessage(`Got it. Finally, what is the main goal or challenge you want us to solve?`);
                return;
            }

            if (this.captureState === 'GOAL') {
                this.leadData.goal = input;
                this.captureState = 'IDLE'; // Reset state
                this.postBotMessage(`Thank you for sharing that context. Our team is ready to help!<br><br>Please select a time on our calendar to discuss your approach:<br><br><a href="#contact" style="display:inline-block; margin-top:10px; padding: 0.5rem 1rem; border-radius: 20px; text-decoration:none; background: var(--infinity-gradient); color: white; font-weight: bold;">Book Consultation</a>`);
                return;
            }

            // --- Smart Lead Interception for specific keywords ---
            if (lowerInput.includes('pricing') || lowerInput.includes('project') || lowerInput.includes('build website') || lowerInput.includes('automation') || lowerInput.includes('marketing help')) {
                this.postBotMessage(`Would you like to schedule a consultation with our team?<br><br><a href="#contact" style="display:inline-block; margin-top:10px; padding: 0.5rem 1rem; border-radius: 20px; text-decoration:none; background: var(--infinity-gradient); color: white; font-weight: bold; margin-right: 10px;">Book Consultation</a> <a href="#contact" style="display:inline-block; margin-top:10px; padding: 0.5rem 1rem; border-radius: 20px; text-decoration:none; border: 1px solid var(--border-subtle); color: white; font-weight: bold;">Request Strategy Audit</a>`);
                return;
            }

            // --- Real OpenAI API Request ---
            this.showTypingIndicator();

            try {
                const response = await fetch("/api/chat", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ message: input })
                });

                const data = await response.json();

                this.removeTypingIndicator();

                if (data.reply) {
                    // Injecting raw HTML returned from OpenAI (which has basic elegant formatting permitted)
                    this.postBotMessage(data.reply);
                } else {
                    this.postBotMessage("I'm currently unable to reach my AI servers, but we would love to connect with you. Please visit our <a href='#contact' style='color: #00D4FF;'>Contact page</a>.");
                }
            } catch (error) {
                console.error("Chatbot API Error:", error);
                this.removeTypingIndicator();
                this.postBotMessage("Sorry, I'm experiencing technical difficulties. Our team would still love to help you!");
            }
        }
    }

    // Initialize Chatbot when DOM loads
    if (document.querySelector('.chatbot-wrapper')) {
        new FlareChatbot();
    }

    /* =========================================================
       Chatbot Floating Trigger Logic
       ========================================================= */
    const chatbotTrigger = document.querySelector('.chatbot-trigger');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotClose = document.querySelector('.chatbot-close');

    if (chatbotTrigger && chatbotWindow && chatbotClose) {
        chatbotTrigger.addEventListener('click', () => {
            chatbotWindow.classList.add('active');
            // Optional: focus input when opened
            const chatInput = chatbotWindow.querySelector('.chat-input');
            if (chatInput) chatInput.focus();
        });

        chatbotClose.addEventListener('click', () => {
            chatbotWindow.classList.remove('active');
        });
    }

    /* =========================================================
       Consultation Modal Logic
       ========================================================= */
    const consultationModal = document.getElementById('consultation-modal');
    const modalCloseBtn = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalFormView = document.getElementById('modal-form-view');
    const modalSuccessView = document.getElementById('modal-success-view');
    const consultationForm = document.getElementById('consultation-form');
    const formErrorMsg = document.querySelector('.form-error-msg');
    const submitBtnLoader = document.querySelector('.btn-loader');
    const submitBtnText = document.querySelector('.btn-text');
    const btnCloseSuccess = document.querySelector('.btn-close-success');
    const successMessageText = document.getElementById('success-message-text');

    // Find all active CTA links
    const ctaLinks = document.querySelectorAll('a[href="#contact"]');

    function openModal(e) {
        if (e) e.preventDefault();
        consultationModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        consultationModal.classList.add('hidden');
        document.body.style.overflow = 'auto';

        // Reset state after closing animation
        setTimeout(() => {
            modalFormView.classList.remove('hidden');
            modalSuccessView.classList.add('hidden');
            consultationForm.reset();
            formErrorMsg.classList.add('hidden');
        }, 400);
    }

    // Bind Opens
    ctaLinks.forEach(link => link.addEventListener('click', openModal));

    // Bind Closes
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    if (btnCloseSuccess) btnCloseSuccess.addEventListener('click', closeModal);

    // Handle Form Submission
    if (consultationForm) {
        consultationForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validate basic required fields are not empty strings
            const formData = new FormData(consultationForm);
            const data = Object.fromEntries(formData.entries());

            if (!data.name || !data.email || !data.service || !data.goal) {
                formErrorMsg.textContent = "Please fill in all required fields.";
                formErrorMsg.classList.remove('hidden');
                return;
            }

            formErrorMsg.classList.add('hidden');
            submitBtnText.textContent = "Sending...";
            submitBtnLoader.classList.remove('hidden');

            try {
                const response = await fetch('/api/book-consultation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error('Server encountered an issue.');
                }

                // Success!
                submitBtnText.textContent = "Submit Request";
                submitBtnLoader.classList.add('hidden');

                // Swap purely the views
                modalFormView.classList.add('hidden');
                modalSuccessView.classList.remove('hidden');

                // Update specific name placeholder logic
                const firstName = data.name.split(' ')[0] || data.name;
                successMessageText.textContent = `Thanks ${firstName}! Our team will review your request and contact you within 24 hours.`;

            } catch (err) {
                console.error('Submission failed:', err);
                submitBtnText.textContent = "Submit Request";
                submitBtnLoader.classList.add('hidden');
                formErrorMsg.textContent = "Oops! Something went wrong on our end. Please try again or email us directly at consult@flaretechnologies.in.";
                formErrorMsg.classList.remove('hidden');
            }
        });
    }

});

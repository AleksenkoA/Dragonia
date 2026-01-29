// Mobile menu toggle
(function() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    
    if (burger && nav) {
        burger.addEventListener('click', function() {
            burger.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                burger.classList.remove('active');
                nav.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!burger.contains(event.target) && !nav.contains(event.target)) {
                burger.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    }
})();

// Sidebar toggle (for mobile)
(function() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebar-close');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    
    // Only for mobile - sidebar is always visible on desktop
    function toggleSidebar() {
        if (sidebar && sidebar.classList.contains('sidebar--always-visible')) {
            if (window.innerWidth <= 992) {
                const isActive = sidebar.classList.contains('active');
                if (isActive) {
                    sidebar.classList.remove('active');
                    if (sidebarOverlay) sidebarOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                } else {
                    sidebar.classList.add('active');
                    if (sidebarOverlay) sidebarOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }
        } else if (sidebar && sidebarOverlay) {
            // Old sidebar behavior
            const isActive = sidebar.classList.contains('active');
            if (isActive) {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                sidebar.classList.add('active');
                sidebarOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
    }
    
    function closeSidebar() {
        if (sidebar) {
            sidebar.classList.remove('active');
            if (sidebarOverlay) sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    if (sidebarClose && sidebar) {
        sidebarClose.addEventListener('click', closeSidebar);
    }
    
    if (sidebarOverlay && sidebar) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }
    
    // Close sidebar when clicking on links (mobile only)
    if (sidebar) {
        const sidebarLinks = sidebar.querySelectorAll('.sidebar__link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 992) {
                    setTimeout(closeSidebar, 300);
                }
            });
        });
    }
    
    // Close sidebar on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
})();

// FAQ Accordion
(function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-item__question');
        
        if (question) {
            question.addEventListener('click', function() {
                const isExpanded = item.getAttribute('aria-expanded') === 'true';
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle current item
                item.setAttribute('aria-expanded', !isExpanded);
            });
        }
    });
})();

// Smooth scroll for anchor links
(function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
})();

// Sidebar active link on scroll
(function() {
    const sidebarLinks = document.querySelectorAll('.sidebar__link');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveLink() {
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                sidebarLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
})();

// Header scroll effect
(function() {
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    if (header) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            }
            
            lastScroll = currentScroll;
        });
    }
})();

// Search Modal
(function() {
    const searchButton = document.getElementById('header-search');
    const searchModal = document.getElementById('search-modal');
    const searchModalOverlay = document.getElementById('search-modal-overlay');
    const searchModalClose = document.getElementById('search-modal-close');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    function openSearchModal() {
        if (searchModalOverlay) {
            searchModalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            // Focus on search input after animation
            setTimeout(() => {
                if (searchInput) {
                    searchInput.focus();
                }
            }, 300);
        }
    }

    function closeSearchModal() {
        if (searchModalOverlay) {
            searchModalOverlay.classList.remove('active');
            document.body.style.overflow = '';
            if (searchInput) {
                searchInput.value = '';
                if (searchResults) {
                    searchResults.innerHTML = '<p class="search-placeholder">Enter your search query...</p>';
                }
            }
        }
    }

    // Open modal on search button click
    if (searchButton) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            openSearchModal();
        });
    }

    // Close modal
    if (searchModalClose) {
        searchModalClose.addEventListener('click', closeSearchModal);
    }

    if (searchModalOverlay) {
        searchModalOverlay.addEventListener('click', function(e) {
            if (e.target === searchModalOverlay) {
                closeSearchModal();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchModalOverlay && searchModalOverlay.classList.contains('active')) {
            closeSearchModal();
        }
    });

    // Search functionality (demo)
    if (searchInput && searchResults) {
        const searchItems = [
            { title: 'Registrierung bei Dragonia', text: 'Lerne, wie du dich registrierst und dein Konto erstellst', href: '#registration' },
            { title: 'Wichtige Daten', text: 'Entdecke alle wichtigen technischen und rechtlichen Eckdaten', href: '#key-facts' },
            { title: 'Spielangebot', text: 'Durchstöbere unsere Sammlung von über 3.000 Spielen', href: '#games' },
            { title: 'Boni und Aktionen', text: 'Sieh dir alle Bonusangebote und Promotions an', href: '#bonuses' },
            { title: 'Gamification', text: 'Lerne mehr über das einzigartige Gamification-System', href: '#gamification' },
            { title: 'Banking & Auszahlungen', text: 'Informationen zu Ein- und Auszahlungsmethoden', href: '#banking' },
            { title: 'Service & Sicherheit', text: 'Erfahre mehr über Kundenservice und Sicherheit', href: '#advantages' },
            { title: 'FAQ', text: 'Finde Antworten auf häufig gestellte Fragen', href: '#faq' },
        ];

        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            if (query.length === 0) {
                searchResults.innerHTML = '<p class="search-placeholder">Gib deine Suchanfrage ein...</p>';
                return;
            }

            const filtered = searchItems.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.text.toLowerCase().includes(query)
            );

            if (filtered.length === 0) {
                searchResults.innerHTML = '<p class="search-placeholder">Keine Ergebnisse gefunden. Versuche eine andere Suche.</p>';
                return;
            }

            const resultsHTML = '<ul class="search-results__list">' +
                filtered.map(item => `
                    <li class="search-results__item" data-href="${item.href}">
                        <div class="search-results__title">${item.title}</div>
                        <div class="search-results__text">${item.text}</div>
                    </li>
                `).join('') +
                '</ul>';

            searchResults.innerHTML = resultsHTML;

            // Add click handlers to results
            const resultItems = searchResults.querySelectorAll('.search-results__item');
            resultItems.forEach(item => {
                item.addEventListener('click', function() {
                    const href = this.getAttribute('data-href');
                    if (href) {
                        closeSearchModal();
                        setTimeout(() => {
                            const target = document.querySelector(href);
                            if (target) {
                                const headerHeight = document.querySelector('.header').offsetHeight;
                                const targetPosition = target.offsetTop - headerHeight;
                                window.scrollTo({
                                    top: targetPosition,
                                    behavior: 'smooth'
                                });
                            }
                        }, 300);
                    }
                });
            });
        });
    }
})();

// Registration Modal
(function() {
    const profileButton = document.getElementById('header-profile');
    const registrationModal = document.getElementById('registration-modal');
    const registrationModalOverlay = document.getElementById('registration-modal-overlay');
    const registrationModalClose = document.getElementById('registration-modal-close');
    const registrationForm = document.getElementById('registration-form');
    const passwordToggle = document.getElementById('password-toggle');
    const passwordInput = document.getElementById('password');
    const formTabs = document.querySelectorAll('.form-tab');

    function openRegistrationModal() {
        if (registrationModalOverlay) {
            registrationModalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeRegistrationModal() {
        if (registrationModalOverlay) {
            registrationModalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Open modal on profile button click
    if (profileButton) {
        profileButton.addEventListener('click', function(e) {
            e.preventDefault();
            openRegistrationModal();
        });
    }

    // Open modal on LOG IN button click
    const headerLogin = document.getElementById('header-login');
    if (headerLogin) {
        headerLogin.addEventListener('click', function(e) {
            e.preventDefault();
            openRegistrationModal();
        });
    }

    // Open modal on REGISTER button click
    const headerRegister = document.getElementById('header-register');
    if (headerRegister) {
        headerRegister.addEventListener('click', function(e) {
            e.preventDefault();
            openRegistrationModal();
        });
    }

    // Open modal on "Create Account & Play Now" button click
    const bigCtaRegisterButton = document.getElementById('big-cta-register');
    if (bigCtaRegisterButton) {
        bigCtaRegisterButton.addEventListener('click', function(e) {
            e.preventDefault();
            openRegistrationModal();
        });
    }

    // Close modal
    if (registrationModalClose) {
        registrationModalClose.addEventListener('click', closeRegistrationModal);
    }

    if (registrationModalOverlay) {
        registrationModalOverlay.addEventListener('click', function(e) {
            if (e.target === registrationModalOverlay) {
                closeRegistrationModal();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && registrationModalOverlay && registrationModalOverlay.classList.contains('active')) {
            closeRegistrationModal();
        }
    });

    // Password toggle
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
        });
    }

    // Form tabs
    if (formTabs.length > 0) {
        formTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                formTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Form submission
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Здесь можно добавить логику отправки формы
            alert('Registrierungsformular übermittelt! (Dies ist eine Demo)');
            closeRegistrationModal();
        });
    }

    // Open modal on "Log in" link click (for demo purposes)
    const loginLink = document.getElementById('login-link');
    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            closeRegistrationModal();
            // Здесь можно открыть форму входа
        });
    }
})();
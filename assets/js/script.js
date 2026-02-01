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

// Sidebar toggle and close functionality - ПРОСТАЯ И НАДЕЖНАЯ ЛОГИКА
(function() {
    'use strict';
    
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    
    // Проверка, мобильное ли устройство
    function isMobile() {
        return window.innerWidth <= 992;
    }
    
    // ПРОСТАЯ функция закрытия сайдбара - работает везде
    function closeSidebar() {
        console.log('closeSidebar called, isMobile:', isMobile()); // Для отладки
        
        if (sidebar) {
            console.log('Before remove:', sidebar.classList.contains('active')); // Для отладки
            sidebar.classList.remove('active');
            console.log('After remove:', sidebar.classList.contains('active')); // Для отладки
            
            // Принудительно убираем left на мобильных
            if (isMobile()) {
                sidebar.style.left = '-100%';
                sidebar.style.setProperty('left', '-100%', 'important');
                console.log('Set left to -100%, computed:', window.getComputedStyle(sidebar).left); // Для отладки
            } else {
                // На десктопе скрываем сайдбар через left: -100%
                sidebar.style.left = '-100%';
                sidebar.style.setProperty('left', '-100%', 'important');
                sidebar.style.width = '0';
                sidebar.style.setProperty('width', '0', 'important');
                sidebar.style.minWidth = '0';
                sidebar.style.setProperty('min-width', '0', 'important');
                console.log('Desktop: Set left to -100%, width to 0'); // Для отладки
            }
        }
        if (sidebarOverlay) {
            sidebarOverlay.classList.remove('active');
            sidebarOverlay.style.display = 'none';
            sidebarOverlay.style.opacity = '0';
            sidebarOverlay.style.visibility = 'hidden';
        }
        document.body.style.overflow = '';
        
        // Обновляем margin-left у main-wrapper на десктопе
        if (!isMobile()) {
            const mainWrapper = document.querySelector('.main-wrapper');
            if (mainWrapper) {
                mainWrapper.style.marginLeft = '0';
                console.log('Desktop: Set main-wrapper margin-left to 0'); // Для отладки
            }
        }
    }
    
    // Функция открытия сайдбара
    function openSidebar() {
        if (sidebar) {
            if (isMobile()) {
                sidebar.classList.add('active');
            } else {
                // На десктопе восстанавливаем сайдбар
                sidebar.style.left = '';
                sidebar.style.removeProperty('left');
                sidebar.style.width = '';
                sidebar.style.removeProperty('width');
                sidebar.style.minWidth = '';
                sidebar.style.removeProperty('min-width');
                console.log('Desktop: Restored sidebar'); // Для отладки
            }
        }
        if (sidebarOverlay && isMobile()) {
            sidebarOverlay.classList.add('active');
        }
        if (isMobile()) {
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Функция переключения сайдбара - работает везде
    function toggleSidebar() {
        if (sidebar) {
            const isHidden = isMobile() 
                ? !sidebar.classList.contains('active')
                : sidebar.style.left === '-100%' || sidebar.style.width === '0';
            
            if (isHidden) {
                openSidebar();
            } else {
                closeSidebar();
            }
        }
    }
    
    // Обработчик для кнопки открытия сайдбара
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleSidebar();
        });
    }
    
    // ПРЯМОЙ обработчик для кнопки закрытия - САМЫЙ ПРОСТОЙ ВАРИАНТ
    // Ждем полной загрузки DOM
    function initCloseButton() {
        const closeBtn = document.getElementById('sidebar-close');
        if (closeBtn) {
            console.log('Close button found'); // Для отладки
            
            // Удаляем все старые обработчики
            const newBtn = closeBtn.cloneNode(true);
            closeBtn.parentNode.replaceChild(newBtn, closeBtn);
            
            // ПРОСТОЙ обработчик клика
            newBtn.addEventListener('click', function(e) {
                console.log('Close button clicked'); // Для отладки
                e.preventDefault();
                e.stopPropagation();
                closeSidebar();
            });
            
            // Дополнительно через onclick
            newBtn.onclick = function(e) {
                console.log('Close button onclick'); // Для отладки
                e.preventDefault();
                e.stopPropagation();
                closeSidebar();
                return false;
            };
        } else {
            console.error('Close button not found!');
        }
    }
    
    // Инициализация
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCloseButton);
    } else {
        // Если DOM уже загружен, ждем немного для гарантии
        setTimeout(initCloseButton, 100);
    }
    
    // Делегирование на document - РЕЗЕРВНЫЙ ВАРИАНТ
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'sidebar-close') {
            console.log('Document click handler'); // Для отладки
            e.preventDefault();
            e.stopPropagation();
            closeSidebar();
        }
    }, true);
    
    // Закрытие при клике на overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', function(e) {
            if (e.target === sidebarOverlay && isMobile()) {
                closeSidebar();
            }
        });
    }
    
    // Закрытие при клике на ссылки (только мобильные)
    if (sidebar) {
        const sidebarLinks = sidebar.querySelectorAll('.sidebar__link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (isMobile()) {
                    setTimeout(closeSidebar, 300);
                }
            });
        });
    }
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMobile() && sidebar && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
    
    // При изменении размера окна
    window.addEventListener('resize', function() {
        if (!isMobile()) {
            if (sidebarOverlay) sidebarOverlay.classList.remove('active');
            if (sidebar) sidebar.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            // На мобильных убеждаемся, что сайдбар скрыт, если нет active
            if (sidebar && !sidebar.classList.contains('active')) {
                sidebar.style.left = '-100%';
                sidebar.style.setProperty('left', '-100%', 'important');
            }
        }
    });
    
    // Инициализация при загрузке - убеждаемся, что на мобильных сайдбар скрыт
    function initSidebarState() {
        if (isMobile() && sidebar) {
            if (!sidebar.classList.contains('active')) {
                sidebar.style.left = '-100%';
                sidebar.style.setProperty('left', '-100%', 'important');
                console.log('Initialized: sidebar hidden on mobile');
            }
        }
    }
    
    // Запускаем инициализацию
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSidebarState);
    } else {
        setTimeout(initSidebarState, 100);
    }
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
            if (href === '#' || href === '#login' || href === '#register' || href === '#go') {
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                
                // Get target position relative to viewport
                const targetRect = target.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const targetPosition = targetRect.top + scrollTop - headerHeight - 20; // 20px extra spacing
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
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

// Game Categories Tabs Functionality
(function() {
    const categoryTabs = document.querySelectorAll('.game-category-tab');
    
    if (categoryTabs.length > 0) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                categoryTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                console.log('Selected category:', category);
                // Here you can add logic to filter games by category
                // For now, just update the active state
            });
        });
    }
})();

// Spin Rally Countdown Timer
(function() {
    const countdownElements = document.querySelectorAll('.countdown');
    
    function updateCountdown(element, minutes, seconds) {
        const mins = String(minutes).padStart(2, '0');
        const secs = String(seconds).padStart(2, '0');
        element.textContent = `${mins}:${secs}`;
    }
    
    function startCountdown(element, initialMinutes = 20) {
        let totalSeconds = initialMinutes * 60;
        
        const interval = setInterval(() => {
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            
            updateCountdown(element, minutes, seconds);
            
            if (totalSeconds <= 0) {
                clearInterval(interval);
                // Reset to 20 minutes when countdown reaches 0
                totalSeconds = 20 * 60;
                setTimeout(() => startCountdown(element, 20), 1000);
            } else {
                totalSeconds--;
            }
        }, 1000);
    }
    
    countdownElements.forEach(element => {
        // Parse initial time from element text (format: "MM:SS")
        const initialText = element.textContent.trim();
        const [mins, secs] = initialText.split(':').map(Number);
        const initialMinutes = (mins || 20) + (secs || 0) / 60;
        
        startCountdown(element, Math.ceil(initialMinutes));
    });
})();

// Spin Rally Alert Bar Functionality
(function() {
    const spinRallyAlert = document.getElementById('spin-rally-alert');
    const spinRallyAlertClose = document.getElementById('spin-rally-alert-close');
    const spinRallyAlertTimer = document.getElementById('spin-rally-alert-timer');
    
    // Close alert bar
    if (spinRallyAlertClose && spinRallyAlert) {
        spinRallyAlertClose.addEventListener('click', function() {
            spinRallyAlert.classList.add('hidden');
            // Save state to localStorage
            localStorage.setItem('spinRallyAlertClosed', 'true');
        });
    }
    
    // Check if alert was previously closed
    if (spinRallyAlert && localStorage.getItem('spinRallyAlertClosed') === 'true') {
        spinRallyAlert.classList.add('hidden');
    }
    
    // Update timer - use countdown from game cards
    function updateAlertTimer() {
        if (spinRallyAlertTimer) {
            // Find active game card countdown
            const activeCard = document.querySelector('.spin-rally-game-card--active .spin-rally-game-card__time-value');
            if (activeCard) {
                spinRallyAlertTimer.textContent = activeCard.textContent;
            }
        }
    }
    
    // Update timer every second
    if (spinRallyAlertTimer) {
        setInterval(updateAlertTimer, 1000);
        updateAlertTimer(); // Initial update
    }
})();

// Sidebar Search Input Functionality
(function() {
    const sidebarSearchInput = document.getElementById('sidebar-search-input');
    const searchModal = document.getElementById('search-modal');
    const searchModalOverlay = document.getElementById('search-modal-overlay');
    const searchInput = document.getElementById('search-input');
    
    function openSearchModal(sourceInput) {
        if (searchModalOverlay) {
            searchModalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            // Focus on search input in modal after animation
            setTimeout(() => {
                if (searchInput) {
                    searchInput.focus();
                    // Copy text from source input to modal input
                    if (sourceInput && sourceInput.value) {
                        searchInput.value = sourceInput.value;
                        // Trigger search
                        searchInput.dispatchEvent(new Event('input'));
                    }
                }
            }, 300);
        }
    }
    
    // Sidebar search input functionality
    if (sidebarSearchInput && searchModalOverlay) {
        sidebarSearchInput.addEventListener('focus', function() {
            openSearchModal(sidebarSearchInput);
        });
        
        sidebarSearchInput.addEventListener('click', function() {
            this.focus();
        });
    }
})();

// Sidebar Language and Help Center
(function() {
    const sidebarLang = document.querySelector('.sidebar__lang');
    const sidebarHelp = document.querySelector('.sidebar__help');
    
    // Определяем текущий язык по тексту кнопки
    function getCurrentLang() {
        if (!sidebarLang) return 'de';
        const buttonText = sidebarLang.textContent.trim();
        if (buttonText.includes('ENGLISH') || buttonText.includes('🇬🇧')) {
            return 'en';
        }
        return 'de';
    }
    
    // Переключение языка
    function switchLanguage() {
        if (!sidebarLang) return;
        
        const currentLang = getCurrentLang();
        const newLang = currentLang === 'de' ? 'en' : 'de';
        
        // Сохраняем язык в localStorage
        localStorage.setItem('preferredLanguage', newLang);
        
        // Меняем атрибут lang у html
        document.documentElement.setAttribute('lang', newLang);
        
        // Меняем текст и флаг кнопки
        if (newLang === 'en') {
            sidebarLang.textContent = '🇬🇧 ENGLISH';
        } else {
            sidebarLang.textContent = '🇩🇪 DEUTSCH';
        }
        
        console.log('Language switched to:', newLang);
        
        // Если есть отдельная английская версия сайта, можно использовать:
        // if (newLang === 'en') {
        //     window.location.href = window.location.origin + '/en' + window.location.pathname;
        // } else {
        //     window.location.href = window.location.origin + window.location.pathname.replace('/en', '');
        // }
    }
    
    // Восстанавливаем язык при загрузке
    function restoreLanguage() {
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && sidebarLang) {
            document.documentElement.setAttribute('lang', savedLang);
            if (savedLang === 'en') {
                sidebarLang.textContent = '🇬🇧 ENGLISH';
            } else {
                sidebarLang.textContent = '🇩🇪 DEUTSCH';
            }
        }
    }
    
    // Language switcher
    if (sidebarLang) {
        sidebarLang.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            switchLanguage();
        });
        
        // Восстанавливаем язык при загрузке
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', restoreLanguage);
        } else {
            restoreLanguage();
        }
    }
    
    // Help Center link - smooth scroll to FAQ
    if (sidebarHelp) {
        sidebarHelp.addEventListener('click', function(e) {
            e.preventDefault();
            const faqSection = document.getElementById('faq');
            if (faqSection) {
                faqSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                // Закрываем сайдбар на мобильных
                if (window.innerWidth <= 992) {
                    const sidebar = document.getElementById('sidebar');
                    if (sidebar) {
                        setTimeout(() => {
                            sidebar.classList.remove('active');
                            const overlay = document.getElementById('sidebar-overlay');
                            if (overlay) overlay.classList.remove('active');
                            document.body.style.overflow = '';
                        }, 300);
                    }
                }
            }
        });
    }
})();
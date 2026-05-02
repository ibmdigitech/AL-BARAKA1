document.addEventListener('DOMContentLoaded', () => {
    // Remove no-js class from HTML/body for CSS fallback
    document.body.classList.remove('no-js');
    document.documentElement.classList.remove('no-js');

    // Preloader - only if present
    const loader = document.getElementById('loader');
    if (loader) {
        const hideLoader = () => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        };
        if (document.readyState === 'complete') {
            // Load already fired
            hideLoader();
        } else {
            window.addEventListener('load', () => {
                setTimeout(hideLoader, 1000);
            });
        }
    }

    // Custom Cursor - only if both elements present and browser supports animate()
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const supportsAnimate = typeof Element !== 'undefined' && typeof Element.prototype.animate === 'function';
    if (cursor && follower && supportsAnimate) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;

            try {
                cursor.animate({
                    left: `${clientX}px`,
                    top: `${clientY}px`
                }, { duration: 100, fill: "forwards" });

                follower.animate({
                    left: `${clientX}px`,
                    top: `${clientY}px`
                }, { duration: 500, fill: "forwards" });
            } catch (err) {
                // Fallback: direct style update
                cursor.style.left = clientX + 'px';
                cursor.style.top = clientY + 'px';
                follower.style.left = clientX + 'px';
                follower.style.top = clientY + 'px';
            }
        });

        // Magnetic Buttons & Hover Effects
        const links = document.querySelectorAll('a, button, .premium-card, .glass-card');
        links.forEach(link => {
            link.addEventListener('mousemove', (e) => {
                if (link.classList.contains('btn-primary') || link.classList.contains('btn-outline')) {
                    const rect = link.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;

                    link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
                }
            });

            link.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursor.style.background = 'rgba(197, 160, 89, 0.1)';
                cursor.style.borderColor = 'var(--accent-gold)';
                follower.style.transform = 'translate(-50%, -50%) scale(0)';
            });

            link.addEventListener('mouseleave', () => {
                link.style.transform = '';
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = 'transparent';
                cursor.style.borderColor = 'var(--accent-gold)';
                follower.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    } else {
        // Fallback: simple cursor follow without animate()
        if (cursor && follower) {
            document.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                cursor.style.left = clientX + 'px';
                cursor.style.top = clientY + 'px';
                follower.style.left = clientX + 'px';
                follower.style.top = clientY + 'px';
            });
        }
    }

    // Navbar Scroll & Progress bar
    const nav = document.querySelector('nav');
    const progressBar = document.getElementById('scroll-progress');
    if (nav && progressBar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }

            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });
    }

    // Intersection Observer for Reveal Animations & Counters (only if supported)
    if (typeof IntersectionObserver !== 'undefined') {
        const isMobile = window.innerWidth <= 768;

        // Reveal Observer - trigger when just 1% visible for smoother early reveal
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.01, rootMargin: '0px' });

        document.querySelectorAll('.reveal-up').forEach(el => {
            // If already partially visible, trigger immediately
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible) {
                el.classList.add('active');
            } else {
                revealObserver.observe(el);
            }
        });

        // Counter Observer - stricter threshold
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    let current = 0;
                    const increment = target / 100;
                    const update = () => {
                        if (current < target) {
                            current += increment;
                            entry.target.innerText = Math.floor(current) + '+';
                            requestAnimationFrame(update);
                        } else {
                            entry.target.innerText = target + '+';
                        }
                    };
                    update();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.counter').forEach(counter => counterObserver.observe(counter));
    } else {
        // Fallback: show all reveal-up elements immediately
        document.querySelectorAll('.reveal-up').forEach(el => el.classList.add('active'));
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Gallery Slider Functionality
    const galleryTrack = document.querySelector('.gallery-track');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const prevButton = document.querySelector('.gallery-arrow.prev');
    const nextButton = document.querySelector('.gallery-arrow.next');
    
    if (galleryTrack && galleryItems.length > 0 && prevButton && nextButton) {
        let currentIndex = 0;
        let itemWidth = 0;
        let visibleItems = 0;
        let maxIndex = 0;
        
        // Update dimensions
        const updateDimensions = () => {
            itemWidth = galleryItems[0].offsetWidth + 20; // item width + margin
            visibleItems = Math.floor(window.innerWidth / itemWidth);
            maxIndex = galleryItems.length - visibleItems;
            
            // Ensure maxIndex is not negative
            if (maxIndex < 0) {
                maxIndex = 0;
            }
        };
        
        // Update position
        const updateGalleryPosition = () => {
            galleryTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        };
        
        // Initialize
        const initGallery = () => {
            updateDimensions();
            updateGalleryPosition();
        };
        
        // Next button
        nextButton.addEventListener('click', () => {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateGalleryPosition();
            } else {
                // Loop to beginning
                currentIndex = 0;
                updateGalleryPosition();
            }
        });
        
        // Previous button
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateGalleryPosition();
            } else {
                // Loop to end
                currentIndex = maxIndex;
                updateGalleryPosition();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                if (currentIndex < maxIndex) {
                    currentIndex++;
                    updateGalleryPosition();
                } else {
                    // Loop to beginning
                    currentIndex = 0;
                    updateGalleryPosition();
                }
            } else if (e.key === 'ArrowLeft') {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateGalleryPosition();
                } else {
                    // Loop to end
                    currentIndex = maxIndex;
                    updateGalleryPosition();
                }
            }
        });
        
        // Resize handling
        window.addEventListener('resize', () => {
            updateDimensions();
            
            // Adjust current index if needed
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            
            updateGalleryPosition();
        });
        
        // Initialize
        initGallery();
    }

    // Form Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredElements = form.querySelectorAll('[required]');
            
            requiredElements.forEach(el => {
                if (!el.value.trim()) {
                    isValid = false;
                    el.style.borderColor = 'red';
                } else if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
                    isValid = false;
                    el.style.borderColor = 'red';
                } else {
                    el.style.borderColor = 'var(--glass-border)';
                }
            });

            if (isValid) {
                const btn = form.querySelector('button[type="submit"]');
                if (!btn) return; // No submit button found, abort
                const originalText = btn.innerHTML;
                btn.innerHTML = 'SENDING... <i class="fas fa-spinner fa-spin"></i>';
                btn.disabled = true;

                // Collect form data
                const formData = {
                    fullName: document.getElementById('full-name').value,
                    email: document.getElementById('contact-email').value,
                    mobile: document.getElementById('mobile-num').value,
                    service: document.getElementById('service-type').value,
                    location: document.getElementById('project-location').value,
                    duration: document.getElementById('project-duration').value,
                    message: document.getElementById('inquiry-msg').value
                };

                // Create success message element if it doesn't exist
                let msgDiv = form.querySelector('.submit-msg');
                if (!msgDiv) {
                    msgDiv = document.createElement('div');
                    msgDiv.className = 'submit-msg';
                    msgDiv.style.marginTop = '1rem';
                    msgDiv.style.padding = '1rem';
                    msgDiv.style.borderRadius = '8px';
                    msgDiv.style.fontWeight = '600';
                    msgDiv.style.textAlign = 'center';
                    form.appendChild(msgDiv);
                }
                msgDiv.style.display = 'none';

                // Real API Call to Backend
                fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    btn.innerHTML = 'SENT <i class="fas fa-check"></i>';
                    
                    msgDiv.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your request has been received. Our team will contact you shortly.';
                    msgDiv.style.background = 'rgba(37, 211, 102, 0.1)';
                    msgDiv.style.color = '#25D366';
                    msgDiv.style.border = '1px solid #25D366';
                    msgDiv.style.display = 'block';

                    form.reset();
                    
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                        msgDiv.style.display = 'none';
                    }, 5000);
                })
                .catch(error => {
                    console.error('Error:', error);
                    btn.innerHTML = 'ERROR <i class="fas fa-times"></i>';
                    msgDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send request. Please try again.';
                    msgDiv.style.background = 'rgba(255, 77, 77, 0.1)';
                    msgDiv.style.color = '#ff4d4d';
                    msgDiv.style.border = '1px solid #ff4d4d';
                    msgDiv.style.display = 'block';
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                        msgDiv.style.display = 'none';
                    }, 5000);
                });
            }
        });

        // Remove red border on input
        form.querySelectorAll('input, textarea, select').forEach(el => {
            el.addEventListener('input', () => {
                el.style.borderColor = 'var(--glass-border)';
            });
            el.addEventListener('change', () => {
                el.style.borderColor = 'var(--glass-border)';
            });
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNavLinks = document.querySelector('.nav-links');
    if (menuToggle && mobileNavLinks) {
        menuToggle.addEventListener('click', () => {
            mobileNavLinks.classList.toggle('nav-active');
            const icon = menuToggle.querySelector('i');
            if (mobileNavLinks.classList.contains('nav-active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when a nav link is clicked
        mobileNavLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNavLinks.classList.remove('nav-active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            });
        });
    }

});

